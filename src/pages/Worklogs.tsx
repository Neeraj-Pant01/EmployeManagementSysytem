import React, { useState } from "react";

const workLogsData = [
  { date: "2025-03-15", month: "March", week: "Week 2", day: "15", hours: 8, overtime: 2, status: "Present" },
  { date: "2025-03-14", month: "March", week: "Week 2", day: "14", hours: 6, overtime: 1, status: "Late" },
  { date: "2025-03-10", month: "March", week: "Week 1", day: "10", hours: 9, overtime: 3, status: "Present" },
  { date: "2025-04-05", month: "April", week: "Week 1", day: "5", hours: 7, overtime: 1, status: "Present" },
];


export default function WorkLogsPage() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // Filtering Work Logs
  const filteredLogs = workLogsData.filter((log) => {
    const matchesMonth = selectedMonth ? log.month === selectedMonth : true;
    const matchesWeek = selectedWeek ? log.week === selectedWeek : true;
    const matchesDay = selectedDay ? log.day === selectedDay : true;
    return matchesMonth && matchesWeek && matchesDay;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Work Logs</h2>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-wrap gap-4">
        <select
          className="p-2 border rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          <option value="March">March</option>
          <option value="April">April</option>
        </select>

        <select
          className="p-2 border rounded"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          disabled={!selectedMonth}
        >
          <option value="">Select Week</option>
          <option value="Week 1">Week 1</option>
          <option value="Week 2">Week 2</option>
        </select>

        <select
          className="p-2 border rounded"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          disabled={!selectedWeek}
        >
          <option value="">Select Day</option>
          <option value="15">15</option>
          <option value="16">16</option>
        </select>
      </div>

      {/* Work Logs Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Hours Worked</th>
              <th className="border p-2">Overtime</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td className="border p-2">{log.date}</td>
                  <td className="border p-2">{log.hours} hrs</td>
                  <td className="border p-2">{log.overtime} hrs</td>
                  <td
                    className={`border p-2 ${
                      log.status === "Present"
                        ? "text-green-600"
                        : log.status === "Late"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {log.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
