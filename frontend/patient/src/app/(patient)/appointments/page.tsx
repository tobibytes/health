"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { CalendarFilterPanel } from "@/components/patient/appointments/CalendarFilterPanel";
import { AppointmentList } from "@/components/patient/appointments/AppointmentList";
import { AppointmentBookingForm } from "@/components/patient/appointments/AppointmentBookingForm";
import { PricingModal } from "@/components/patient/appointments/PricingModal";
import { AppointmentDetailsModal } from "@/components/patient/appointments/AppointmentDetailsModal";
import { useAppointmentStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store/authSlice";
import { AppointmentPayload } from "@/lib/store/appointmentSlice";


export default function AppointmentsPage() {
  const { appointments, createAppointment, createdAppointment, getPatientAppointments, error, } = useAppointmentStore()
  const { token } = useAuthStore()
  const [showCreatedAppointment, setShowCreatedAppointment] = useState(false);


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<AppointmentPayload>({patientId: 1, professionalId: 1, date: '', notes: '', reason: ''});
  const [filter, setFilter] = useState("all");
  const [isPremium, setIsPremium] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  // Initialize store with mockAppointments on first load
  useEffect(() => {
    getPatientAppointments(1, token || '', 0, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    const matchesDate = selectedDate ? apptDate.toDateString() === selectedDate.toDateString() : true;
    const matchesFilter = filter === "all" ? true : appt.status === filter;
    return matchesDate && matchesFilter;
  });

  const handleBookAppointment = () => {
    if (!newAppointment) return;
    const appointmentData = {
      patientId: 1,
      professionalId: 1,
      date: newAppointment.date,
      notes: newAppointment.notes,
      reason: newAppointment.reason,
    }; 
    createAppointment(appointmentData, token || '')
      .then((response) => {
        if (response) {
          setShowBookingForm(false);
          setShowCreatedAppointment(true);
          
        } else {
          console.error("Error creating appointment:", error);
        }
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
      })

  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/3">
            <CalendarFilterPanel
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
          <div className="w-full md:w-2/3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments</h1>
              {isPremium ? (
                <button className="w-full sm:w-auto" onClick={() => setShowBookingForm(true)}>
                  Book Appointment
                </button>
              ) : (
                <button className="w-full sm:w-auto" onClick={() => setShowPricing(true)}>
                  Book Appointment
                </button>
              )}
            </div>
            <PricingModal
              isPremium={isPremium}
              setIsPremium={setIsPremium}
              showPricing={showPricing}
              setShowPricing={setShowPricing}
            />
            {showBookingForm && isPremium && (
              <AppointmentBookingForm
                newAppointment={newAppointment}
                setNewAppointment={setNewAppointment}
                onBook={handleBookAppointment}
                onCancel={() => setShowBookingForm(false)}
              />
            )}
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
                <p className="text-sm">{error}</p>
                </div>)}
            <AppointmentList
              appointments={filteredAppointments}
              isPremium={isPremium}
              setShowPricing={setShowPricing}
            />
          </div>
        </div>
        { (createdAppointment && showCreatedAppointment) && (
          <AppointmentDetailsModal
            selectedAppointment={ createdAppointment ? createdAppointment  : null}
            onClose={() => setShowCreatedAppointment(false)}
          />

        )}
      </div>
    </MainLayout>
  );
}
