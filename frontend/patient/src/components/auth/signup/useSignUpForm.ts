import { useState } from "react";
import { SignUpFormState, SignUpFormErrors } from "./signupTypes";
import { validateSignUpStep } from "./signupValidation";

export interface UseSignUpFormDeps {
  registerApi: (data: any) => Promise<any>;
  register: (data: any) => Promise<any>;
  useToast: () => { toast: (args: any) => void };
}

const initial: SignUpFormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  existingConditions: "",
  insuranceProvider: "",
  allergies: "",
  address: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

export function useSignUpForm(deps: UseSignUpFormDeps) {
  const { registerApi, register, useToast } = deps;
  const [form, setForm] = useState<SignUpFormState>(initial);
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const toast = useToast().toast;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    const e2 = validateSignUpStep(form, step);
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validateSignUpStep(form, 2);
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setLoading(true);
    try {
      await registerApi({
        ...form,
        existingConditions: form.existingConditions
          ? form.existingConditions.split(",").map((s) => s.trim())
          : [],
        role: "patient",
      });
      await register({
        ...form,
        existingConditions: form.existingConditions
          ? form.existingConditions.split(",").map((s) => s.trim())
          : [],
        role: "patient",
      });
      toast({ title: "Account created!", description: "You can now sign in.", variant: "success" });
      // Redirect or auto-login logic here
    } catch (err: any) {
      toast({ title: "Sign up failed", description: err.message || "Error", variant: "destructive" });
      setErrors({ email: "Email already exists" });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    loading,
    step,
    setStep,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
