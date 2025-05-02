"use client";
import React from 'react';
import { PatientList } from '../../../components/professional/PatientList';

export default function PatientsPage() {
  return (
    <div className="p-6 space-y-6 md:p-8">
      <h1 className="text-2xl font-semibold text-center md:text-left">Patients</h1>
      <PatientList />
    </div>
  );
}