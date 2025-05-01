"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@/components/ui/button";

interface CalendarFilterPanelProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export function CalendarFilterPanel({
  selectedDate,
  setSelectedDate,
  filter,
  setFilter,
}: CalendarFilterPanelProps) {
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Filter by Date</h2>
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          className="w-full"
        />
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={() => setSelectedDate(null)}
        >
          Clear Date Filter
        </Button>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Status</h2>
        <div className="flex flex-wrap gap-2">
          {["all", "scheduled", "completed", "cancelled"].map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              onClick={() => setFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
