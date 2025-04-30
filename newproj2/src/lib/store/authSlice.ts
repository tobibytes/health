import { create } from 'zustand';

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
  login: (email: string, password: string) => Promise<void>;
  register: (userData: SignUpPayload) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthSlice>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async (email, password) => {
    // Placeholder: Replace with real API call
    // Example: const { user, token } = await loginApi(email, password);
    set({ user: { id: '1', fullName: 'Test User', email }, token: 'mock-token', isAuthenticated: true });
  },
  register: async (userData) => {
    // Placeholder: Replace with real API call
    // Example: const { user, token } = await registerApi(userData);
    set({ user: { ...userData, id: '1' }, token: 'mock-token', isAuthenticated: true });
  },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
