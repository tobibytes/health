import React from "react";

interface StepperProps {
  steps: { label: string }[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center mb-4 gap-2">
    {steps.map((s, idx) => (
      <div key={s.label} className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300
            ${currentStep === idx ? "bg-blue-600" : "bg-gray-300"}
          `}
        >
          {idx + 1}
        </div>
        <span className={`text-xs mt-1 ${currentStep === idx ? "text-blue-600" : "text-gray-500"}`}>{s.label}</span>
      </div>
    ))}
  </div>
);

export default Stepper;
