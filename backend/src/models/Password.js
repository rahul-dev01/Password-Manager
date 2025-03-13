const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    site: { type: String, required: true },
    username: { type: String, required: true },
    encryptedPassword: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Password", passwordSchema);
