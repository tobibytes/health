"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AppointmentBookingFormProps {
  newAppointment: {
    patientId: number;
    professionalId: number;
    date: string;
    notes: string;
    reason: string 
  };
  setNewAppointment: (appointment: {
    patientId: number;
    professionalId: number;
    date: string;
    notes: string;
    reason: string
  }) => void;
  onBook: () => void;
  onCancel: () => void;
}

export function AppointmentBookingForm({
  newAppointment,
  setNewAppointment,
  onBook,
  onCancel,
}: AppointmentBookingFormProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Book New Appointment</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date and Time</label>
          <Input
            type="datetime-local"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Doctor</label>
          <Input
            type="number"
            value={newAppointment.professionalId}
            onChange={(e) => setNewAppointment({ ...newAppointment, professionalId: Number(e.target.value) })}
            className="mt-1"
            placeholder="Dr. Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <Input
            type="text"
            value={newAppointment.reason}
            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            className="mt-1"
            placeholder="e.g., General Checkup"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <Input
            type="text"
            value={newAppointment.notes}
            onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
            className="mt-1"
            placeholder="Optional notes"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onBook}>Book</Button>
      </div>
    </div>
  );
}
