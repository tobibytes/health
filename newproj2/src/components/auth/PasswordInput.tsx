import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          {...props}
          className={`pr-10 ${error ? "border-red-500" : ""} ${props.className || ""}`}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
