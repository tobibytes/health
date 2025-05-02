import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

type Patient = {
  id: number;
  name: string;
  age: number;
  gender?: string;
  condition: string;
};

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <Avatar>
        <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">{patient.name}</h2>
          <span className="inline-block px-2 py-0.5 text-xs rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            {patient.condition}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Age: {patient.age}
          {patient.gender && <> · {patient.gender}</>}
        </div>
      </div>
      <Button size="sm" variant="outline" className="ml-auto" asChild>
        <a href={`/professional/patients/${patient.id}`}>View</a>
      </Button>
    </Card>
  );
}
