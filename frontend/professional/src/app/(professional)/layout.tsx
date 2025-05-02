import "../globals.css";
import ProfessionalLayout from "@/components/professional/ProfessionalLayout";

export default function ProfessionalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfessionalLayout>{children}</ProfessionalLayout>;
}
