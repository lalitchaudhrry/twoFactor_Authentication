import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import { verify2FA } from "../services/api";

export default function TwoFactorVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // set during login

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    try {
      const data = await verify2FA(userId, code);

      // ✅ Save JWT
      localStorage.setItem("token", data.token);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid authentication code.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-surface-card items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Two-Factor Authentication
          </h1>
          <p className="text-text-secondary mb-6">
            Open your authenticator app and enter the 6-digit code to continue.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-text-primary text-center mb-2">
            Verify your identity
          </h2>
          <p className="text-text-secondary text-center mb-6">
            Enter the 6-digit code from your authenticator app
          </p>

          <OtpInput otp={otp} setOtp={setOtp} />

          {error && (
            <p className="text-error text-sm text-center mt-4">
              {error}
            </p>
          )}

          <button
            onClick={handleVerify}
            className="
              w-full mt-6 py-3 rounded-lg
              bg-primary text-white font-semibold
              hover:opacity-90 transition
            "
          >
            Verify Code
          </button>

          <div className="text-center mt-4">
            <button className="text-primary text-sm hover:underline">
              Use a backup code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
