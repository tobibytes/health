import React from "react";
import { Input } from "../../ui/input";

interface MedicalInfoStepProps {
  form: {
    existingConditions: string;
    insuranceProvider: string;
    allergies: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MedicalInfoStep: React.FC<MedicalInfoStepProps> = ({ form, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium">Existing Conditions</label>
      <Input name="existingConditions" value={form.existingConditions} onChange={onChange} placeholder="Asthma, Diabetes" />
    </div>
    <div>
      <label className="block text-sm font-medium">Insurance Provider</label>
      <Input name="insuranceProvider" value={form.insuranceProvider} onChange={onChange} />
    </div>
    <div>
      <label className="block text-sm font-medium">Allergies</label>
      <Input name="allergies" value={form.allergies} onChange={onChange} />
    </div>
    <div>
      <label className="block text-sm font-medium">Address (City, State)</label>
      <Input name="address" value={form.address} onChange={onChange} />
    </div>
  </div>
);

export default MedicalInfoStep;
