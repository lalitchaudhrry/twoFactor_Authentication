import { useState, useEffect } from "react";
import { ShieldCheck, QrCode } from "lucide-react";
import { setup2FA, verify2FASetup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TwoFactorSetupPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (localStorage.getItem("is2FAEnabled") === "true") {
      navigate("/dashboard");
      return;
    }

    async function init2FA() {
      const data = await setup2FA(userId);
      setQrCode(data.qrCode);
      setSecret(data.secret);
    }

    init2FA();
  }, [userId, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await verify2FASetup(userId, otp);

      // mark 2FA enabled locally
      localStorage.setItem("is2FAEnabled", "true");

      navigate("/2fa/success");
    } catch {
      alert("Invalid code");
    }
  }

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-card rounded-2xl shadow-lg p-8 space-y-6">

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary" size={28} />
          <h1 className="text-2xl font-semibold text-text-primary">
            Enable Two-Factor Authentication
          </h1>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-48 bg-white border rounded-xl flex items-center justify-center">
            {qrCode ? <img src={qrCode} alt="QR" /> : <QrCode size={96} />}
          </div>

          <code className="bg-surface-base px-3 py-1 rounded-md">
            {secret}
          </code>
        </div>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-lg tracking-widest border rounded-lg"
            placeholder="123456"
            autoFocus
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
          >
            Verify & Enable
          </button>
        </form>
        {/* ✅ FORM END */}

      </div>
    </div>
  );
}
