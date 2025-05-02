import React from 'react';
import { useRouter } from 'next/router';
import { PatientDetail } from '../../../../components/professional/PatientDetail';

export default function PatientDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Patient Details</h1>
      {id && <PatientDetail patientId={id} />}
    </div>
  );
}