// "use client";
import React, { Suspense, lazy } from "react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { Bell, Users, Calendar, Mail } from "lucide-react";
import { useProfessionalStore } from "../../stores/professionalSlice";

// Lazy load the chart for better SSR/CSR handling
const RechartsBarChart = lazy(() => import("./RechartsBarChart"));

export default function DashboardOverview() {
  // Zustand store selectors
  const currentUser = useProfessionalStore((s) => s.currentUser);
  const patients = useProfessionalStore((s) => s.patients);
  const appointments = useProfessionalStore((s) => s.appointments);
  const messages = useProfessionalStore((s) => s.messages);

  // Stat cards config
  const stats = [
    {
      label: "Patients Today",
      value: patients.length,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      accent: "focus:ring-blue-300",
    },
    {
      label: "New Messages",
      value: messages.length,
      icon: <Mail className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-50 border-emerald-200",
      accent: "focus:ring-emerald-300",
    },
    {
      label: "Appointments",
      value: appointments.length,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      accent: "focus:ring-blue-300",
    },
  ];

  // Example notifications (replace with dynamic data as needed)
  const notifications = [
    { id: 1, message: "New lab result for John Doe", type: "lab" },
    { id: 2, message: `${messages.length} unread messages`, type: "message" },
  ];

  // Improved greeting logic
  let displayName = "Doctor";
  if (currentUser) {
    // Try to extract last name, fallback to first
    const parts = currentUser.trim().split(/\s+/);
    if (parts.length > 1) {
      displayName = `Dr. ${parts[parts.length - 1]}`;
    } else {
      displayName = `Dr. ${parts[0]}`;
    }
  }

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <h1 className="text-2xl font-semibold text-center md:text-left">
        Good morning, {displayName}
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Card
              className={`flex items-center space-x-4 p-4 border ${stat.color} shadow-sm transition hover:shadow-md focus-within:shadow-lg outline-none cursor-pointer`}
              tabIndex={0}
              aria-label={stat.label}
              role="region"
              onClick={() => {}} // Placeholder for future click action
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // Placeholder for keyboard action
                }
              }}
            >
              <div>{stat.icon}</div>
              <div>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-lg font-medium mb-2">Appointments This Week</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Suspense
            fallback={
              <div className="h-48 flex items-center justify-center text-gray-400">
                Loading chart...
              </div>
            }
          >
            <RechartsBarChart />
          </Suspense>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Notifications
        </h2>
        <ul className="space-y-2">
          {notifications.length === 0 ? (
            <li className="text-gray-400 text-sm">No new notifications.</li>
          ) : (
            notifications.map((n) => (
              <li
                key={n.id}
                className={`flex items-center gap-2 px-4 py-2 rounded border border-gray-200 bg-white shadow-sm transition hover:bg-blue-50 focus:bg-blue-50 outline-none`}
                tabIndex={0}
                aria-label={n.message}
                role="alert"
              >
                {n.type === "lab" ? (
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full" />
                ) : (
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                )}
                {n.message}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
