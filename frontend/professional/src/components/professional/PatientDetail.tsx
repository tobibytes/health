import React from 'react';

interface PatientDetailProps {
  patientId: string | string[];
}

export function PatientDetail({ patientId }: PatientDetailProps) {
  // Mock patient data
  const patient = {
    id: patientId,
    name: 'John Doe',
    age: 45,
    condition: 'Diabetes',
    history: 'Patient has a history of diabetes for 10 years.',
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">{patient.name}</h2>
      <p>Age: {patient.age}</p>
      <p>Condition: {patient.condition}</p>
      <p>History: {patient.history}</p>
    </div>
  );
}