const API_URL = "http://localhost:5000/api";

/* ---------- AUTH ---------- */
export async function signupUser(email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Signup failed");
  }

  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
}

/* ---------- 2FA ---------- */
export async function setup2FA(userId) {
  const res = await fetch(`${API_URL}/2fa/setup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) throw new Error("Failed to setup 2FA");
  return res.json();
}

export async function verify2FASetup(userId, token) {
  const res = await fetch(`${API_URL}/2fa/verify-setup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, token }),
  });

  if (!res.ok) throw new Error("Invalid OTP");
  return res.json();
}

export async function verify2FALogin(userId, token) {
  const res = await fetch(`${API_URL}/2fa/verify-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, token }),
  });

  if (!res.ok) throw new Error("Invalid OTP");
  return res.json();
}
