import { SignUpPayload, User } from "./store/authSlice";

// Replace with your actual API base URL
const API_BASE = "/api/auth";

export async function register(payload: SignUpPayload): Promise<{ user: User; token: string }> {
  // Example POST to /api/auth/register
  // const res = await fetch(`${API_BASE}/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error(await res.text());
  // return await res.json();

  // Mocked response for now
  return {
    user: {
      id: "1",
      ...payload,
    },
    token: "mock-token",
  };
}

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  // Example POST to /api/auth/login
  // const res = await fetch(`${API_BASE}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!res.ok) throw new Error(await res.text());
  // return await res.json();

  // Mocked response for now
  return {
    user: {
      id: "1",
      fullName: "Test User",
      email,
    },
    token: "mock-token",
  };
}
