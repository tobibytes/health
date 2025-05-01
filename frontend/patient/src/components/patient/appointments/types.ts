export interface Appointment {
  id: number
  patientId: number
  date: string
  professionalId: number
  reason: string
  type: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}


export const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    date: "2023-10-01T10:00:00Z",
    professionalId: 101,
    reason: "General Checkup",
    type: "In-Person",
    status: "scheduled",
    notes: "Patient is feeling well.",
  },
  {
    id: 2,
    patientId: 1,
    date: "2023-10-02T14:00:00Z",
    professionalId: 102,
    reason: "Follow-up",
    type: "Telehealth",
    status: "completed",
    notes: "Follow-up on previous appointment.",
  },
]