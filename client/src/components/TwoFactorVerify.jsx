import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import { verify2FALogin } from "../services/api";

export default function TwoFactorVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleVerify = async () => {
    try {
      const data = await verify2FALogin(userId, otp.join(""));
      localStorage.setItem("token", data.token);
      localStorage.setItem("is2FAEnabled", "true");
      navigate("/dashboard");
    } catch {
      setError("Invalid authentication code");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-surface-card items-center justify-center p-12">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Two-Factor Authentication
          </h1>
          <p className="text-text-secondary">
            Enter the 6-digit code from your authenticator app.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-md p-8">
          <OtpInput otp={otp} setOtp={setOtp} />

          {error && (
            <p className="text-error text-sm text-center mt-4">{error}</p>
          )}

          <button
            onClick={handleVerify}
            className="w-full mt-6 py-3 rounded-lg bg-primary text-white font-semibold"
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
}
