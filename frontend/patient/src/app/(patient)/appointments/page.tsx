"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { CalendarFilterPanel } from "@/components/patient/appointments/CalendarFilterPanel";
import { AppointmentList } from "@/components/patient/appointments/AppointmentList";
import { AppointmentBookingForm } from "@/components/patient/appointments/AppointmentBookingForm";
import { PricingModal } from "@/components/patient/appointments/PricingModal";
import { AppointmentDetailsModal } from "@/components/patient/appointments/AppointmentDetailsModal";
import { Appointment, mockAppointments } from "@/components/patient/appointments/types";
import { useAppointmentStore } from "@/lib/store/appointmentSlice";

export default function AppointmentsPage() {
  const {
    appointments,
    setAppointments,
    selectedAppointment,
    setSelectedAppointment,
  } = useAppointmentStore();

  // Local state for UI controls
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: "", doctor: "", type: "", notes: "" });
  const [filter, setFilter] = useState("all");
  const [isPremium, setIsPremium] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  // Initialize store with mockAppointments on first load
  useEffect(() => {
    if (appointments.length === 0) {
      setAppointments(mockAppointments);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    const matchesDate = selectedDate ? apptDate.toDateString() === selectedDate.toDateString() : true;
    const matchesFilter = filter === "all" ? true : appt.status === filter;
    return matchesDate && matchesFilter;
  });

  const handleBookAppointment = () => {
    if (!newAppointment.date || !newAppointment.doctor || !newAppointment.type) return;
    const appointment: Appointment = {
      id: Date.now().toString(),
      date: newAppointment.date,
      doctor: newAppointment.doctor,
      type: newAppointment.type,
      status: "scheduled",
      notes: newAppointment.notes,
    };
    setAppointments([...appointments, appointment]);
    setShowBookingForm(false);
    setNewAppointment({ date: "", doctor: "", type: "", notes: "" });
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
            <AppointmentList
              appointments={filteredAppointments}
              isPremium={isPremium}
              setShowPricing={setShowPricing}
            />
          </div>
        </div>
        <AppointmentDetailsModal
          selectedAppointment={isPremium ? selectedAppointment : null}
          onClose={() => setSelectedAppointment(null)}
        />
      </div>
    </MainLayout>
  );
}
