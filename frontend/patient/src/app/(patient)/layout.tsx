'use client'

import { ReactNode } from 'react'
import { useUIStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Navigation } from '@/components/patient/navigation'

interface PatientLayoutProps {
  children: ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="ml-4 flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Patient Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Add user menu or notifications here */}
          </div>
        </div>
      </header>

      <div className="container flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white p-4 transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Navigation />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
} 