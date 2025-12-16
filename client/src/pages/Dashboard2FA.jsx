import { ShieldCheck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Enable2FA from "./Enable2FA";

export default function Dashboard2FA() {
  const navigate = useNavigate();
  const is2FAEnabled = localStorage.getItem("is2FAEnabled") === "true";

  return (
    <div className="min-h-screen bg-surface-base p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Welcome 👋</h1>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogOut />
          </button>
        </div>

        {!is2FAEnabled ? (
          <Enable2FA />
        ) : (
          <div className="bg-surface-card p-6 rounded-xl">
            <ShieldCheck className="text-success" size={32} />
            <h2 className="text-xl font-semibold mt-2">
              2FA Enabled
            </h2>
            <p className="text-text-secondary">
              Your account is protected with Google Authenticator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
