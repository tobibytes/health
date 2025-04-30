export interface Appointment {
  id: string;
  date: string; // ISO string
  doctor: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '2024-06-10T10:00:00',
    doctor: 'Dr. Adebayo',
    type: 'General Checkup',
    status: 'scheduled',
    notes: 'Bring previous reports.',
  },
  {
    id: '2',
    date: '2024-06-12T14:30:00',
    doctor: 'Dr. Okonkwo',
    type: 'Dental',
    status: 'completed',
    notes: 'Routine cleaning.',
  },
  {
    id: '3',
    date: '2024-06-15T09:00:00',
    doctor: 'Dr. Musa',
    type: 'Eye Check',
    status: 'cancelled',
    notes: 'Patient cancelled.',
  },
  // ...add more for demo
];
