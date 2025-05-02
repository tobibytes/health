import React from 'react';

export function AppointmentTable() {
  const appointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, patient: 'Jane Smith', time: '2:00 PM', status: 'Completed' },
  ];

  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Patient</th>
          <th className="border border-gray-300 px-4 py-2">Time</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id}>
            <td className="border border-gray-300 px-4 py-2">{appointment.patient}</td>
            <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
            <td className="border border-gray-300 px-4 py-2">{appointment.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}