import { useState } from "react";
import { ShieldCheck, ShieldOff, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard2FA() {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-surface-card rounded-2xl shadow-lg p-8 space-y-6 border border-border-subtle">

        {/* Header */}
        <div className="flex items-center gap-3">
          {enabled ? (
            <ShieldCheck className="text-success" size={32} />
          ) : (
            <ShieldOff className="text-error" size={32} />
          )}
          <h1 className="text-2xl font-semibold text-text-primary">
            Two-Factor Authentication
          </h1>
        </div>

        <p className="text-text-secondary">
          Protect your account with an extra layer of security using an authenticator.
        </p>

        <div className="border border-border-subtle rounded-xl p-6 space-y-4 bg-surface-base">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium text-text-primary">
                Authenticator App
              </h2>
              <p className="text-sm text-text-secondary">
                Time-based one-time password (TOTP)
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                enabled
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }`}
            >
              {enabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          {enabled ? (
            <button
              onClick={() => setEnabled(false)}
              className="w-full py-2 rounded-lg bg-error text-white"
            >
              Disable 2FA
            </button>
          ) : (
            <button
              onClick={() => navigate("/2fa/setup")}
              className="w-full py-2 rounded-lg bg-primary text-white"
            >
              Enable 2FA
            </button>
          )}
        </div>

        {enabled && (
          <div className="border border-border-subtle rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <KeyRound className="text-primary" />
              <h2 className="font-medium text-text-primary">
                Backup Codes
              </h2>
            </div>
            <p className="text-sm text-text-secondary">
              Use these codes if you lose access to your authenticator app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
