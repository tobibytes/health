import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Appointment, AppointmentPayload, AppointmentPayloadResponse, AppointmentSlice } from './store/appointmentSlice'
import { getPatientAppointments as getPatientAppointmentsApi, createAppointment as createAppointmentApi } from './appointmentApi'


interface UserState {
  user: {
    id: string | null
    name: string | null
    email: string | null
  } | null
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}



interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  setTheme: (theme: UIState['theme']) => void
  toggleSidebar: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)


export const useAppointmentStore = create<AppointmentSlice>((set) => ({
  appointments: [],
  createdAppointment: null,
  error: null,
  getPatientAppointments: async (patient_id: number, token: string, skip: number = 0, limit: number = 10,) => {
    try {
      const response = await getPatientAppointmentsApi(patient_id, token || '', skip, limit, )
      if ('error' in response ) {
        set({ error: response.error });
        return [];
      } 
      else if ('detail' in response) {
        set({ error: response.detail})
        return [];
      }
      else {
        set((state) => ({
          appointments: [...state.appointments, ...response],
        }));
        return response;
      }
    } catch (error) {
      set({ error: (error as Error).message });
      return [];
    }
  },
  createAppointment: async (payload: AppointmentPayload, token: string): Promise<AppointmentPayloadResponse> => {
    try {
      const response = await createAppointmentApi(payload, token);
      if ('error' in response) {
        set({ error: response.error });
        throw new Error(response.error);
      } else {
        set({ createdAppointment: response });
        return response;
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },
}))

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-storage',
    }
  )
) 