import React from "react";
import { useAuthStore } from "../../lib/store/authSlice";
import { register as registerApi } from "../../lib/authApi";
import { AnimatePresence, motion } from "framer-motion";
import { useSignUpForm } from "./signup/useSignUpForm";
import Stepper from "./signup/Stepper";
import PersonalInfoStep from "./signup/PersonalInfoStep";
import MedicalInfoStep from "./signup/MedicalInfoStep";
import AccountSetupStep from "./signup/AccountSetupStep";

let useToast: any;
try {
  // @ts-ignore
  useToast = require("../ui/use-toast").useToast;
} catch {
  useToast = () => ({
    toast: ({ title, description }: { title: string; description: string }) =>
      alert(`${title}\n${description}`),
  });
}

const steps = [
  { label: "Personal Info" },
  { label: "Medical Info" },
  { label: "Account Setup" },
];

const variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const SignUpForm: React.FC = () => {
  const { register } = useAuthStore();
  const formHook = useSignUpForm({
    registerApi,
    register,
    useToast,
  });

  const { form, errors, loading, step, handleChange, handleNext, handleBack, handleSubmit } = formHook;

  return (
    <form className="space-y-4 relative overflow-hidden" onSubmit={handleSubmit} autoComplete="on">
      <Stepper steps={steps} currentStep={step} />
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <PersonalInfoStep form={form} errors={errors} onChange={handleChange} />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <MedicalInfoStep form={form} onChange={handleChange} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <AccountSetupStep form={form} errors={errors} onChange={handleChange} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between mt-4">
        {step > 0 && (
          <button type="button" className="btn btn-outline" onClick={handleBack} disabled={loading}>
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button type="button" className="ml-auto btn" onClick={handleNext} disabled={loading}>
            Next
          </button>
        )}
        {step === steps.length - 1 && (
          <button type="submit" className="ml-auto w-full btn" disabled={loading}>
            {loading ? <span className="animate-spin mr-2">⏳</span> : "Sign Up"}
          </button>
        )}
      </div>
      {errors.email && step === 2 && <p className="text-xs text-red-500">{errors.email}</p>}
    </form>
  );
};

export default SignUpForm;
