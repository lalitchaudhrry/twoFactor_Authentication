import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TwoFactorSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface-card rounded-2xl shadow-lg p-8 text-center space-y-6 border border-border-subtle">
        
        <div className="flex justify-center">
          <ShieldCheck size={48} className="text-success" />
        </div>

        <h1 className="text-2xl font-semibold text-text-primary">
          Two-Factor Authentication Enabled
        </h1>

        <p className="text-text-secondary">
          Your account is now protected with an extra layer of security.
          You’ll need a one-time code from your authenticator app every time you log in.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition"
        >
          Go to Dashboard
        </button>

      </div>
    </div>
  );
}
