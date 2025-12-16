import speakeasy from "speakeasy";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * SETUP 2FA (QR generation)
 */
export const setup2FA = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // ❗ Prevent regenerating secret
  if (user.isTwoFactorEnabled) {
    return res.status(400).json({ message: "2FA already enabled" });
  }

  const secret = speakeasy.generateSecret({
    name: `AccessControl (${user.email})`,
  });

  user.twoFactorSecret = secret.base32;
  await user.save();

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  res.json({
    qrCode,
    secret: secret.base32,
  });
};

/**
 * VERIFY 2FA DURING SETUP
 */
export const verify2FASetup = async (req, res) => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.isTwoFactorEnabled = true;
  await user.save();

  res.json({ message: "2FA enabled successfully" });
};

/**
 * VERIFY 2FA DURING LOGIN
 */
export const verify2FALogin = async (req, res) => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user || !user.isTwoFactorEnabled) {
    return res.status(400).json({ message: "2FA not enabled" });
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (!verified) {
    return res.status(401).json({ message: "Invalid authentication code" });
  }

  const jwtToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token: jwtToken });
};
