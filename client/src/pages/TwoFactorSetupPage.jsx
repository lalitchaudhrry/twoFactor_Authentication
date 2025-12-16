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
    async function init2FA() {
      try {
        // OPTIONAL (recommended): fetch user profile
        const isEnabled = localStorage.getItem("is2FAEnabled");
  
        if (isEnabled === "true") {
          navigate("/dashboard");
          return;
        }
  
        const data = await setup2FA(userId);
        setQrCode(data.qrCode);
        setSecret(data.secret);
      } catch (err) {
        console.error("2FA setup failed", err);
      }
    }
  
    init2FA();
  }, [userId, navigate]);
  

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-card rounded-2xl shadow-lg p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-primary" size={28} />
          <h1 className="text-2xl font-semibold text-text-primary">
            Enable Two-Factor Authentication
          </h1>
        </div>

        <p className="text-text-secondary text-sm">
          Scan the QR code below using an authenticator app.
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-48 h-48 bg-white border border-border-subtle rounded-xl flex items-center justify-center">
            {qrCode ? (
              <img src={qrCode} alt="QR Code" />
            ) : (
              <QrCode size={96} className="text-text-secondary" />
            )}
          </div>

          <code className="bg-surface-base px-3 py-1 rounded-md text-sm tracking-widest text-text-primary">
            {secret || "Loading..."}
          </code>
        </div>

        {/* OTP Input */}
        <div className="space-y-2">
          <label className="text-sm text-text-primary font-medium">
            Enter 6-digit code
          </label>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="w-full px-4 py-2 rounded-lg border border-border-subtle focus:outline-none focus:ring-2 focus:ring-primary text-center tracking-widest text-lg"
          />
        </div>

        {/* Action Button */}
        <button
  onClick={async () => {
    try {
      const data = await verify2FASetup(userId, otp);


      // ✅ Save JWT if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Redirect to success page
      navigate("/2fa/success");
    } catch (err) {
      alert("Invalid code");
    }
  }}
  className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
>
  Verify & Enable
</button>


        {/* Footer */}
        <p className="text-xs text-text-secondary text-center">
          You will need this code every time you log in.
        </p>
      </div>
    </div>
  );
}
