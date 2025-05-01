import React from "react";
import { Input } from "../../ui/input";

interface PersonalInfoStepProps {
  form: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
  };
  errors: { [k: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Full Name *</label>
      <Input name="fullName" value={form.fullName} onChange={onChange} required className={errors.fullName ? "border-red-500" : ""} />
      {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Email Address *</label>
      <Input name="email" type="email" value={form.email} onChange={onChange} required className={errors.email ? "border-red-500" : ""} />
      {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Phone Number</label>
      <Input name="phoneNumber" value={form.phoneNumber} onChange={onChange} placeholder="+234..." />
    </div>
    <div>
      <label className="block text-sm font-medium">Date of Birth *</label>
      <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={onChange} required className={errors.dateOfBirth ? "border-red-500" : ""} />
      {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth}</p>}
    </div>
    <div>
      <label className="block text-sm font-medium">Gender</label>
      <select name="gender" value={form.gender} onChange={onChange} className="w-full border rounded px-2 py-1">
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
  </div>
);

export default PersonalInfoStep;
