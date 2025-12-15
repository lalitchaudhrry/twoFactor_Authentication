import express from "express";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/User.js";

const router = express.Router();

/* ---------- GENERATE QR ---------- */
router.post("/setup", async (req, res) => {
  const { userId } = req.body;

  const secret = speakeasy.generateSecret({ length: 20 });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  await User.findByIdAndUpdate(userId, {
    twoFASecret: secret.base32
  });

  res.json({
    qrCode,
    secret: secret.base32
  });
});

/* ---------- VERIFY & ENABLE ---------- */
router.post("/verify", async (req, res) => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);

  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: "base32",
    token
  });

  if (!verified)
    return res.status(400).json({ message: "Invalid OTP" });

  user.is2FAEnabled = true;
  await user.save();

  res.json({ message: "2FA enabled successfully" });
});

export default router;
