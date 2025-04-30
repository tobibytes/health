import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Input } from '@/components/ui/input'

interface UserState {
  user: {
    id: string | null
    name: string | null
    email: string | null
  } | null
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

interface AppointmentsState {
  appointments: Array<{
    id: string
    date: string
    doctor: string
    type: string
    status: 'scheduled' | 'completed' | 'cancelled'
  }>
  selectedAppointment: string | null
  setAppointments: (appointments: AppointmentsState['appointments']) => void
  setSelectedAppointment: (id: string | null) => void
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

export const useAppointmentsStore = create<AppointmentsState>()((set) => ({
  appointments: [],
  selectedAppointment: null,
  setAppointments: (appointments) => set({ appointments }),
  setSelectedAppointment: (id) => set({ selectedAppointment: id }),
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