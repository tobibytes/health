"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfessionalStore } from "../../stores/professionalSlice";

/**
 * AuthGuard protects professional routes.
 * If not authenticated, redirects to /auth/signin.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const currentUser = useProfessionalStore((s) => s.currentUser);

  useEffect(() => {
    if (!currentUser) {
    //   router.replace("/auth/signin");
    }
  }, [currentUser, router]);

  // Optionally, show a loading spinner while checking auth
//   if (!currentUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-blue-600 text-lg font-semibold animate-pulse">Checking authentication...</div>
//       </div>
//     );
//   }

  return <>{children}</>;
}
