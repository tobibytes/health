import React from "react";
import { usePricing } from "../../lib/pricing/PricingProvider";

type FeatureListProps = {
  includedFeatureIds: string[];
};

export function FeatureList({ includedFeatureIds }: FeatureListProps) {
  const { features } = usePricing();

  return (
    <ul className="space-y-2">
      {features.map((feature) => {
        const included = includedFeatureIds.includes(feature.id);
        return (
          <li
            key={feature.id}
            className={`flex items-center gap-2 ${included ? "text-green-700 font-semibold" : "text-gray-400 line-through"}`}
          >
            <span>
              {included ? "✔️" : "❌"}
            </span>
            <span>{feature.name}</span>
            {feature.description && (
              <span className="ml-2 text-xs text-gray-500">{feature.description}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default FeatureList;
