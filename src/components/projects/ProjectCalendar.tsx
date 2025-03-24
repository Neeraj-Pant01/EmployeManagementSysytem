import React, { useState } from "react";
import DayInfoPopup from "./DayInfoPopup.tsx";

interface ProjectCalendarProps {
  startDate: string;
  endDate: string;
}

export default function ProjectCalendar({ startDate, endDate }: ProjectCalendarProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  const days = [];

  let currentDate = new Date(start);
  while (currentDate <= end) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  return (
    <div className="mt-6 bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 text-center border rounded cursor-pointer ${
              day.toDateString() === today.toDateString() ? "bg-blue-200" : 
              day.toDateString() === end.toDateString() ? "bg-red-300" : 
              "bg-gray-100"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        ))}
      </div>

      {selectedDay && (
        <DayInfoPopup selectedDay={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
}



