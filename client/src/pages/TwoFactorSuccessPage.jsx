import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TwoFactorSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-card rounded-2xl shadow-lg p-8 space-y-6 text-center">
        <ShieldCheck size={48} className="mx-auto text-success" />

        <h1 className="text-2xl font-semibold text-text-primary">
          Two-Factor Authentication Enabled
        </h1>

        <p className="text-text-secondary text-sm">
          Your account is now protected with Google Authenticator.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="w-full border border-border-subtle py-2 rounded-lg text-text-primary"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
