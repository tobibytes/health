"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", appointments: 2 },
  { day: "Tue", appointments: 3 },
  { day: "Wed", appointments: 1 },
  { day: "Thu", appointments: 4 },
  { day: "Fri", appointments: 2 },
  { day: "Sat", appointments: 0 },
  { day: "Sun", appointments: 1 },
];

export default function RechartsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="appointments" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
