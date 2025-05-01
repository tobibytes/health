'use client'

import { Calendar, Stethoscope, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppointmentsStore } from '@/lib/store'

export default function Dashboard() {
  const { appointments } = useAppointmentsStore()
  const nextAppointment = appointments.find(
    (appt) => appt.status === 'scheduled'
  )

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="rounded-lg bg-primary p-6 text-white">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        <p className="mt-2 text-primary-light">
          Here's what's happening with your health today.
        </p>
      </section>

      {/* Quick Actions */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button
          variant="secondary"
          className="flex h-24 flex-col items-center justify-center gap-2 p-4"
        >
          <Calendar className="h-8 w-8" />
          <span>Schedule Appointment</span>
        </Button>
        <Button
          variant="accent"
          className="flex h-24 flex-col items-center justify-center gap-2 p-4"
        >
          <Stethoscope className="h-8 w-8" />
          <span>View Results</span>
        </Button>
        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center gap-2 p-4"
        >
          <Bell className="h-8 w-8" />
          <span>Notifications</span>
        </Button>
      </section>

      {/* Next Appointment */}
      {nextAppointment && (
        <section className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-semibold">Next Appointment</h3>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Date:</span>{' '}
              {new Date(nextAppointment.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Doctor:</span> {nextAppointment.doctor}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Type:</span> {nextAppointment.type}
            </p>
            <Button className="mt-4">View Details</Button>
          </div>
        </section>
      )}
    </div>
  )
} 