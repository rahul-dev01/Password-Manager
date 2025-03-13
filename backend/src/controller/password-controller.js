const Password = require("../models/Password");
const crypto = require("crypto");


const encryptPassword = (password) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.SECRET_KEY);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};


const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};


const addPassword = async (req, res) => {
  try {
    const { siteName, siteUrl, username, password } = req.body;
    const encryptedPassword = encryptPassword(password);

    const newPassword = new Password({
      userId: req.user.id,
      siteName,
      siteUrl,
      username,
      encryptedPassword
    });

    await newPassword.save();
    res.status(201).json({ message: "Password saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    const decryptedPasswords = passwords.map(p => ({
      ...p._doc,
      password: decryptPassword(p.encryptedPassword)
    }));
    res.status(200).json(decryptedPasswords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updatePassword = async (req, res) => {
  try {
    const { siteName, siteUrl, username, password } = req.body;
    const encryptedPassword = encryptPassword(password);

    await Password.findByIdAndUpdate(req.params.id, {
      siteName,
      siteUrl,
      username,
      encryptedPassword
    });

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Password deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPassword, getPasswords, updatePassword, deletePassword };
