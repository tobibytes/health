'use client';
import React, { createContext, useContext, ReactNode } from "react";
import { features as defaultFeatures, pricingTiers as defaultPricingTiers, Feature, PricingTier } from "./pricingData";

type PricingContextType = {
  features: Feature[];
  pricingTiers: PricingTier[];
};

const PricingContext = createContext<PricingContextType>({
  features: defaultFeatures,
  pricingTiers: defaultPricingTiers,
});

type PricingProviderProps = {
  children: ReactNode;
  features?: Feature[];
  pricingTiers?: PricingTier[];
};

export function PricingProvider({
  children,
  features = defaultFeatures,
  pricingTiers = defaultPricingTiers,
}: PricingProviderProps) {
  return (
    <PricingContext.Provider value={{ features, pricingTiers }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  return useContext(PricingContext);
}
