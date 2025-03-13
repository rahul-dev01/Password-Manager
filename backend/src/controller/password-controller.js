const Password = require("../models/Password");
const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const SECRET_KEY = crypto.scryptSync(process.env.SECRET_KEY, "salt", 32);
const IV = Buffer.alloc(16, 0);

const encryptPassword = (password) => {
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptPassword = (encryptedPassword) => {
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
    let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error.message);
    return "Decryption Error";
  }
};

const addPassword = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const { site, username, password } = req.body;
    if (!site || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const encryptedPassword = encryptPassword(password);

    const newPassword = new Password({
      userId: req.user.userId,
      site,
      username,
      encryptedPassword
    });

    await newPassword.save();
    res.status(201).json({ message: "Password saved successfully!" });
  } catch (error) {
    console.error("Add Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPassword = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const passwords = await Password.find({ userId: req.user.userId });

    const decryptedPasswords = passwords.map((p) => ({
      ...p._doc,
      encryptedPassword: decryptPassword(p.encryptedPassword),
    }));

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.error("Get Passwords Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const encryptedPassword = encryptPassword(password);
    const passwordEntry = await Password.findById(req.params.id);

    if (!passwordEntry) {
      return res.status(404).json({ error: "Password entry not found" });
    }

    await Password.findByIdAndUpdate(req.params.id, {
      site,
      username,
      encryptedPassword
    });

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePassword = async (req, res) => {
  try {
    const passwordEntry = await Password.findById(req.params.id);
    if (!passwordEntry) {
      return res.status(404).json({ error: "Password entry not found" });
    }

    await Password.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Password deleted successfully!" });
  } catch (error) {
    console.error("Delete Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addPassword, getPassword, updatePassword, deletePassword };
