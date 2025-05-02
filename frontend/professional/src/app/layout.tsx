import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medical Professional Portal",
  description: "Portal for doctors, nurses, and clinical staff to manage patient interactions, schedules, and health trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* Authentication logic removed for now */}
        {children}
      </body>
    </html>
  );
}
