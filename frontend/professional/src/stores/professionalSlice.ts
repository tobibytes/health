import {create} from 'zustand';

interface ProfessionalState {
  currentUser: string | null;
  patients: any[];
  appointments: any[];
  notes: any[];
  messages: any[];
  fetchPatients: () => void;
  createNote: (note: any) => void;
  sendMessage: (message: any) => void;
}

export const useProfessionalStore = create<ProfessionalState>((set) => ({
  currentUser: null,
  patients: [],
  appointments: [],
  notes: [],
  messages: [],
  fetchPatients: () => {
    // Fetch patients logic
  },
  createNote: (note) => {
    // Create note logic
  },
  sendMessage: (message) => {
    // Send message logic
  },
}));