"use client";
import React from 'react';
import { AppointmentTable } from '../../../components/professional/AppointmentTable';

export default function AppointmentsPage() {
  return (
    <div className="p-6 space-y-6 md:p-8">
      <h1 className="text-2xl font-semibold text-center md:text-left">Appointments</h1>
      <AppointmentTable />
    </div>
  );
}