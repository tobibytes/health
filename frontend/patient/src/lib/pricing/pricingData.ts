export type Feature = {
  id: string;
  name: string;
  description?: string;
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  features: string[]; // feature ids
  highlight?: boolean;
};

export const features: Feature[] = [
  { id: "appointments", name: "Book Appointments", description: "Schedule and manage your appointments easily." },
  { id: "chat", name: "24/7 Chat", description: "Access to chat with healthcare professionals anytime." },
  { id: "results", name: "Lab Results", description: "View your lab results securely online." },
  { id: "profile", name: "Profile Management", description: "Manage your personal and health information." },
  { id: "support", name: "Priority Support", description: "Get priority customer support." },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$0/mo",
    features: ["appointments", "profile"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19/mo",
    features: ["appointments", "profile", "chat", "results"],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49/mo",
    features: ["appointments", "profile", "chat", "results", "support"],
  },
];
