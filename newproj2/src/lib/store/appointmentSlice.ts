import { create } from 'zustand'

interface Appointment {
  id: string
  date: string
  doctor: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface AppointmentState {
  appointments: Appointment[]
  selectedAppointment: Appointment | null
  setAppointments: (appointments: Appointment[]) => void
  setSelectedAppointment: (appointment: Appointment | null) => void
  updateAppointment: (id: string, data: Partial<Appointment>) => void
}

export const createAppointmentSlice = (set: any) => ({
  appointments: [],
  selectedAppointment: null,
  setAppointments: (appointments: Appointment[]) => set({ appointments }),
  setSelectedAppointment: (appointment: Appointment | null) => set({ selectedAppointment: appointment }),
  updateAppointment: (id: string, data: Partial<Appointment>) =>
    set((state: AppointmentState) => ({
      appointments: state.appointments.map((appt) =>
        appt.id === id ? { ...appt, ...data } : appt
      ),
    })),
})

export const useAppointmentStore = create<AppointmentState>()((set) => ({
  ...createAppointmentSlice(set),
})) 