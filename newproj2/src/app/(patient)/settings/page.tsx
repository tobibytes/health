'use client'
import { useState } from 'react'
import { useUIStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Bell, Moon, Sun, Mail, Calendar, FileText } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useUIStore()
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointmentReminders: true,
    testResults: true,
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-medium">Theme</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose your preferred theme for the application
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <Button
              variant={theme === 'light' ? 'secondary' : 'outline'}
              onClick={() => setTheme('light')}
              className="flex items-center space-x-2"
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </Button>
            <Button
              variant={theme === 'dark' ? 'secondary' : 'outline'}
              onClick={() => setTheme('dark')}
              className="flex items-center space-x-2"
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-medium">Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your notification preferences
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Button
                variant={notifications.email ? 'secondary' : 'outline'}
                onClick={() =>
                  setNotifications({ ...notifications, email: !notifications.email })
                }
              >
                {notifications.email ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive notifications via text message
                  </p>
                </div>
              </div>
              <Button
                variant={notifications.sms ? 'secondary' : 'outline'}
                onClick={() =>
                  setNotifications({ ...notifications, sms: !notifications.sms })
                }
              >
                {notifications.sms ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Appointment Reminders</h3>
                  <p className="text-sm text-gray-500">
                    Get reminders for upcoming appointments
                  </p>
                </div>
              </div>
              <Button
                variant={notifications.appointmentReminders ? 'secondary' : 'outline'}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    appointmentReminders: !notifications.appointmentReminders,
                  })
                }
              >
                {notifications.appointmentReminders ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium">Test Results</h3>
                  <p className="text-sm text-gray-500">
                    Get notified when new test results are available
                  </p>
                </div>
              </div>
              <Button
                variant={notifications.testResults ? 'secondary' : 'outline'}
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    testResults: !notifications.testResults,
                  })
                }
              >
                {notifications.testResults ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 