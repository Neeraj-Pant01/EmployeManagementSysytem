import React, { useState } from "react";

interface DayInfoPopupProps {
  selectedDay: Date;
  onClose: () => void;
}

export default function DayInfoPopup({ selectedDay, onClose }: DayInfoPopupProps) {
  const today = new Date();
  const isCurrentDay = selectedDay.toDateString() === today.toDateString();

  const [timeSpent, setTimeSpent] = useState("Not recorded");
  const [workDone, setWorkDone] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Work Log - {selectedDay.toDateString()}</h3>

        {editing ? (
          <div>
            <input
              type="text"
              placeholder="Time Spent (e.g. 3 hrs)"
              className="border p-2 rounded w-full mt-2"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
            />
            <textarea
              className="border p-2 rounded w-full mt-2"
              placeholder="Enter work done..."
              onChange={(e) => setWorkDone(e.target.value.split("\n"))}
            />
            <button 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setEditing(false)}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p className="mt-2">Time Spent: <b>{timeSpent}</b></p>
            <ul className="mt-2 list-disc pl-5">
              {workDone.length > 0 ? workDone.map((work, index) => <li key={index}>{work}</li>) : <li>No work logged</li>}
            </ul>
            {isCurrentDay && (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setEditing(true)}
              >
                Edit Today's Work
              </button>
            )}
          </div>
        )}

        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
