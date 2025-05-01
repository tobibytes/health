import React from "react";
import { PricingTier } from "../../lib/pricing/pricingData";
import { FeatureList } from "./FeatureList";

type PricingCardProps = {
  tier: PricingTier;
};

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <div
      className={`border rounded-lg p-6 shadow-sm flex flex-col items-center ${
        tier.highlight ? "border-blue-600 bg-blue-50 shadow-lg scale-105" : "border-gray-200 bg-white"
      } transition-transform`}
    >
      <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
      <div className="text-3xl font-extrabold mb-4">{tier.price}</div>
      <FeatureList includedFeatureIds={tier.features} />
      <button
        className={`mt-6 px-6 py-2 rounded text-white font-semibold ${
          tier.highlight ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-600"
        } transition-colors`}
      >
        Choose {tier.name}
      </button>
    </div>
  );
}

export default PricingCard;
