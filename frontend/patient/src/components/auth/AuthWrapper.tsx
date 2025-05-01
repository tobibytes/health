import React from "react";

interface AuthWrapperProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">{title}</h1>
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
      {children}
    </div>
  </div>
);

export default AuthWrapper;
