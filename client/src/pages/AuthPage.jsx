import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <AuthLayout>
      {mode === "login" ? (
        <LoginForm switchToSignup={() => setMode("signup")} />
      ) : (
        <SignupForm switchToLogin={() => setMode("login")} />
      )}
    </AuthLayout>
  );
}
