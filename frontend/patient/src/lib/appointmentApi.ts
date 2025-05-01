import { Appointment, AppointmentPayload, AppointmentPayloadResponse } from "./store/appointmentSlice";
import { SignUpPayload } from "./store/authSlice";

// Replace with your actual API base URL
const API_BASE = "http://localhost:8000/appointment";

export async function createAppointment(payload: AppointmentPayload, token: string): Promise<AppointmentPayloadResponse | { error: string }> {
  // Example POST to /api/auth/register
  const res = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();

}

export async function getPatientAppointments(patient_id : number,token: string, skip: number = 0, limit: number = 10, ): Promise<Appointment[] | { error: string } | { detail: string }> {
  // Example POST to /api/auth/login
  const res = await fetch(`${API_BASE}/patient/${patient_id}?skip=${0}&limit=${10}`, {
    method: "GET",
    headers: {
       "Content-Type": "application/json",
       'Authorization': `Bearer ${token}`,

    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();

}
