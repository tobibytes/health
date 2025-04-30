'use client'

import { useState } from 'react'
import { useUserStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { user, setUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    insurance: 'Blue Cross Blue Shield',
  })

  const handleSave = () => {
    setUser({
      id: user?.id || '1',
      name: formData.name,
      email: formData.email,
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <Button
          variant={isEditing ? 'secondary' : 'outline'}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-medium">Personal Information</h2>
              <p className="text-sm text-gray-500">
                Update your personal details and contact information
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span>{formData.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{formData.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{formData.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{formData.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Insurance Provider
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.insurance}
                  onChange={(e) =>
                    setFormData({ ...formData, insurance: e.target.value })
                  }
                  className="w-full rounded-md border p-2"
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span>{formData.insurance}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 