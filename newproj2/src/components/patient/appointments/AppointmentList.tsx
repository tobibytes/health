"use client";

import { useAppointmentStore } from "@/lib/store/appointmentSlice";
import { Appointment } from "./types";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AppointmentListProps {
  appointments?: Appointment[]; // Optional, for filtered lists
  isPremium: boolean;
  setShowPricing: (show: boolean) => void;
}

export function AppointmentList({
  appointments,
  isPremium,
  setShowPricing,
}: AppointmentListProps) {
  const { appointments: storeAppointments, setSelectedAppointment } = useAppointmentStore();
  const list = appointments ?? storeAppointments;

  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <ul className="divide-y divide-gray-200">
        {list.length === 0 && (
          <li className="p-4 sm:p-6 text-center text-gray-500">
            No appointments found.
          </li>
        )}
        {list.map((appointment) => (
          <li
            key={appointment.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() =>
              isPremium
                ? setSelectedAppointment(appointment)
                : setShowPricing(true)
            }
          >
            <Tooltip
              content={
                isPremium
                  ? undefined
                  : "Upgrade to Premium to view appointment details!"
              }
            >
              <div className="px-2 py-3 sm:px-4 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="text-sm font-medium text-teal-600 truncate">
                    {appointment.doctor}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.type}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      appointment.status === "scheduled"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "completed"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {appointment.status}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(appointment.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}
