import { create } from 'zustand'
import { createAuthSlice, AuthState } from './authSlice'
import { createAppointmentSlice, AppointmentState } from './appointmentSlice'
import { createResultSlice, ResultState } from './resultSlice'
import { createChatSlice, ChatState } from './chatSlice'

export type AppState = AuthState & AppointmentState & ResultState & ChatState

export const useAppStore = create<AppState>()((set) => ({
  ...createAuthSlice(set),
  ...createAppointmentSlice(set),
  ...createResultSlice(set),
  ...createChatSlice(set),
})) 