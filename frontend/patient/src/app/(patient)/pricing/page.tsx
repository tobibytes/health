import React from "react";
import { PricingProvider } from "../../../lib/pricing/PricingProvider";
import PricingPageContent from "../../../components/pricing/PricingPageContent";

export default function PricingPage() {
  return (
    <PricingProvider>
      <PricingPageContent />
    </PricingProvider>
  );
}
