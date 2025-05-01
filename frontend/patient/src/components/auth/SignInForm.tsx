import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PasswordInput from "./PasswordInput";
import { useAuthStore } from "../../lib/store/authSlice";
import { Toaster } from "../ui/sonner";
import { toast as toastSonner } from "sonner";
// If using ShadCN UI's useToast:
let useToast = () => ({
  toast: ({ title, description }: { title: string; description: string }) =>
    toastSonner(`${title}\n${description}`),
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignInForm: React.FC = () => {
  const { login } = useAuthStore();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.email) errs.email = "Email is required";
    else if (!emailRegex.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      toast({ title: "Signed in!", description: "Welcome back.",});
      // Redirect logic here (e.g., router.push("/dashboard"))
    } catch (err: any) {
      toast({ title: "Sign in failed", description: err.message || "Invalid credentials", });
      setErrors({ password: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
      <div className="w-full">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          name="email"
          type="email"
          placeholder="you@email.com"
          value={form.email}
          onChange={handleChange}
          required
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500 animate-fade-in">{errors.email}</p>
        )}
      </div>
      <PasswordInput
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={form.remember}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="remember" className="text-sm">
          Remember Me
        </label>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <span className="animate-spin mr-2">⏳</span> : "Sign In"}
      </Button>
      <Toaster position="top-center" richColors />
    </form>
  );
};

export default SignInForm;
