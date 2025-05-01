
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


export interface AppointmentPayload {
  patientId: number;
  professionalId: number;
  date: string;
  notes: string;
  reason: string
}
export interface AppointmentPayloadResponse {
  id: string;
  patientId: number;
  professionalId: number;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string | null;
  reason?: string | null;
}

export interface AppointmentSlice {
  appointments: Appointment[]
  error: string | null;
  createdAppointment: AppointmentPayloadResponse | null
  getPatientAppointments: (patient_id: number, token: string, skip?: number, limit?: number) => Promise<Array<Appointment | { error: string } | { detail: string }>>
  createAppointment: (payload: AppointmentPayload, token: string) => Promise<AppointmentPayloadResponse | { error: string } | { detail: string }>
}
