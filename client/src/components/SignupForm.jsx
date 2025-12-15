import { useState } from "react";
import GoogleButton from "./GoogleButton";
import { signupUser } from "../services/api";

export default function SignupForm({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signupUser(email, password);
      alert("Account created. Please login.");
      switchToLogin();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="bg-surface-card p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold text-text-primary mb-6">
        Sign up
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:opacity-90"
        >
          Create Account
        </button>
      </form>

      <div className="my-4 text-center text-text-secondary">OR</div>

      <GoogleButton />

      <p className="text-sm text-text-secondary mt-4 text-center">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-primary font-medium">
          Log in
        </button>
      </p>
    </div>
  );
}
