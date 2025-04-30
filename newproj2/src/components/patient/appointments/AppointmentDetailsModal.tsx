"use client";

import { Appointment } from "./types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppointmentDetailsModalProps {
  selectedAppointment: Appointment | null;
  onClose: () => void;
}

export function AppointmentDetailsModal({
  selectedAppointment,
  onClose,
}: AppointmentDetailsModalProps) {
  if (!selectedAppointment) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-md p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Appointment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Doctor:</span>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
              {selectedAppointment.doctor}
            </span>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Type:</span>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
              {selectedAppointment.type}
            </span>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Date:</span>
            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-900">
              {new Date(selectedAppointment.date).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-gray-500">Status:</span>
            <span
              className={cn(
                "ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                selectedAppointment.status === "scheduled"
                  ? "bg-green-100 text-green-800"
                  : selectedAppointment.status === "completed"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {selectedAppointment.status}
            </span>
          </div>
          {selectedAppointment.notes && (
            <div>
              <span className="text-xs sm:text-sm text-gray-500">Notes:</span>
              <span className="ml-2 text-xs sm:text-sm text-gray-900">
                {selectedAppointment.notes}
              </span>
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:space-x-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
