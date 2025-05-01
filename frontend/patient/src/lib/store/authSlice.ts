import { create } from 'zustand';
import { login as loginApi, register as registerApi } from '../authApi';
export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  existingConditions?: string[];
  insuranceProvider?: string;
  allergies?: string;
  address?: string;
  role?: 'patient' | 'professional';
}

export interface SignUpPayload {
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth: string;
  gender?: string;
  existingConditions?: string[];
  insuranceProvider?: string;
  allergies?: string;
  address?: string;
  password: string;
  role?: 'patient' | 'professional';
}

export interface AuthSlice {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: SignUpPayload) => Promise<void>;
  logout: () => void;
  // setUser: (user: User) => void;
}

export const useAuthStore = create<AuthSlice>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Placeholder: Replace with real API call
    const response = await loginApi(email, password);
    if ('token' in response) {
      set({ token: response.token, isAuthenticated: true });
    } else if ('error' in response) {
      console.error(response.error);
      set({ error: response.error, isAuthenticated: false });
    }
  },
  register: async (userData: SignUpPayload) => {
    // Placeholder: Replace with real API call
    const response = await registerApi(userData);
    if ('token' in response) {
      set({ token: response.token, isAuthenticated: true });
    } else if ('error' in response) {
      console.error(response.error);
      set({ error: response.error, isAuthenticated: false });
    }
  },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  // setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
