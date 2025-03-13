const express = require("express");
const { addPassword, getPasswords, updatePassword, deletePassword } = require("../../controller/password-controller.js");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addPassword);
router.get("/all", authMiddleware, getPasswords);
router.put("/update/:id", authMiddleware, updatePassword);
router.delete("/delete/:id", authMiddleware, deletePassword);

module.exports = router;
