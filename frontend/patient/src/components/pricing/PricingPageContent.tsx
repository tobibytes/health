"use client";
import React from "react";
import { usePricing } from "../../lib/pricing/PricingProvider";
import { PricingCard } from "./PricingCard";

export default function PricingPageContent() {
  const { pricingTiers } = usePricing();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Pricing Plans</h1>
      <p className="text-center text-gray-600 mb-10">
        Choose the plan that fits your needs. Upgrade, downgrade, or cancel anytime.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </div>
  );
}
