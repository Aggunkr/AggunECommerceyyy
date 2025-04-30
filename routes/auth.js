const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// 🔹 Kayıt Ol (Register)
router.post("/register", [
  check("username", "Kullanıcı adı gereklidir").not().isEmpty(),
  check("password", "Şifre en az 6 karakter olmalıdır").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Bu kullanıcı adı zaten alınmış" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

// 🔹 Kullanıcı Girişi (Login)
router.post("/login", [
  check("username", "Kullanıcı adı gereklidir").not().isEmpty(),
  check("password", "Şifre gereklidir").not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Geçersiz şifre" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Sunucu hatası" });
  }
});

module.exports = router;
