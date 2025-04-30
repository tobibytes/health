import React from "react";
import PasswordInput from "../PasswordInput";

interface AccountSetupStepProps {
  form: {
    password: string;
    confirmPassword: string;
    agree: boolean;
  };
  errors: { [k: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountSetupStep: React.FC<AccountSetupStepProps> = ({ form, errors, onChange }) => (
  <div className="space-y-4">
    <PasswordInput
      label="Password *"
      name="password"
      value={form.password}
      onChange={onChange}
      error={errors.password}
      required
    />
    <PasswordInput
      label="Confirm Password *"
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={onChange}
      error={errors.confirmPassword}
      required
    />
    <div className="flex items-center">
      <input
        id="agree"
        name="agree"
        type="checkbox"
        checked={form.agree}
        onChange={onChange}
        className="mr-2"
      />
      <label htmlFor="agree" className="text-sm">
        I agree to the Terms & Conditions *
      </label>
    </div>
    {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}
  </div>
);

export default AccountSetupStep;
