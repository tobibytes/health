import { SignUpPayload } from "./store/authSlice";

// Replace with your actual API base URL
const API_BASE = "http://localhost:8000";

export async function register(payload: SignUpPayload): Promise<{ token: string } | { error: string }> {
  // Example POST to /api/auth/register
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();

  // Mocked response for now
  return {

    token: "mock-token",
  };
}

export async function login(email: string, password: string): Promise<{ token: string } | { error: string }> {
  // Example POST to /api/auth/login
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role: "patient" }), // Assuming role is needed for login
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();

  // Mocked response for now
  return {
    token: "mock-token",
  };
}
