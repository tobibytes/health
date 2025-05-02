import React, { useState } from "react";
import { PatientCard } from "./PatientCard";
import { Input } from "../ui/input";
import { Card } from "../ui/card";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender?: string;
  condition: string;
};

const allPatients: Patient[] = [
  { id: 1, name: "John Doe", age: 45, gender: "Male", condition: "Diabetes" },
  { id: 2, name: "Jane Smith", age: 30, gender: "Female", condition: "Hypertension" },
  { id: 3, name: "Alex Kim", age: 52, gender: "Male", condition: "Asthma" },
  { id: 4, name: "Maria Garcia", age: 28, gender: "Female", condition: "Diabetes" },
];

const uniqueConditions = Array.from(new Set(allPatients.map((p) => p.condition)));
const uniqueGenders = Array.from(new Set(allPatients.map((p) => p.gender))).filter(Boolean);

export function PatientList() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");

  const filtered = allPatients.filter((p) => {
    return (
      (age === "" || p.age === Number(age)) &&
      (gender === "" || p.gender === gender) &&
      (condition === "" || p.condition === condition)
    );
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <Input
          type="number"
          min={0}
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-24"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">All Genders</option>
          {uniqueGenders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">All Conditions</option>
          {uniqueConditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Card>
      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <Card className="p-4 text-center text-gray-500">No patients found.</Card>
        ) : (
          filtered.map((patient) => <PatientCard key={patient.id} patient={patient} />)
        )}
      </div>
    </div>
  );
}
