import speakeasy from "speakeasy";
import QRCode from "qrcode";
import User from "../models/User.js";

/**
 * SETUP 2FA
 * POST /api/2fa/setup
 */
export const setup2FA = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({
      name: "AccessControlProject"
    });

    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      qrCode,               // base64 image
      secret: secret.base32 // manual entry key
    });

  } catch (err) {
    res.status(500).json({ message: "2FA setup failed" });
  }
};

/**
 * VERIFY 2FA
 * POST /api/2fa/verify
 */
export const verify2FA = async (req, res) => {
  const { userId, token } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1
    });

    if (!verified) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isTwoFactorEnabled = true;
    await user.save();

    res.json({ message: "2FA enabled successfully" });

  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};
