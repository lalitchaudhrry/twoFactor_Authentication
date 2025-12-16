import { ShieldCheck, ShieldOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Enable2FA() {
  const navigate = useNavigate();

  // TEMP: replace later with API call
  const is2FAEnabled = localStorage.getItem("is2FAEnabled") === "true";

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-surface-card rounded-2xl shadow-lg p-10 space-y-8 border border-border-subtle">

        {/* Header */}
        <div className="flex items-center gap-4">
          {is2FAEnabled ? (
            <ShieldCheck className="text-success" size={40} />
          ) : (
            <ShieldOff className="text-error" size={40} />
          )}

          <div>
            <h1 className="text-3xl font-semibold text-text-primary">
              Welcome to Secure Access
            </h1>
            <p className="text-text-secondary">
              Manage your Two-Factor Authentication settings
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="border border-border-subtle rounded-xl p-8 bg-surface-base flex flex-col gap-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-text-primary">
                Authenticator App (TOTP)
              </h2>
              <p className="text-text-secondary text-sm">
                Google Authenticator, Authy, Microsoft Authenticator
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                is2FAEnabled
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }`}
            >
              {is2FAEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {/* Action */}
          {!is2FAEnabled ? (
            <button
              onClick={() => navigate("/2fa/setup")}
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Enable Two-Factor Authentication
              <ArrowRight size={18} />
            </button>
          ) : (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <p className="text-success font-medium">
                ✅ Your account is protected with Two-Factor Authentication.
              </p>
              <p className="text-text-secondary text-sm mt-1">
                You’ll be asked for a one-time code during login.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-text-secondary text-center">
          Security tip: Keep your backup codes safe and never share OTPs.
        </p>
      </div>
    </div>
  );
}
