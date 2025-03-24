import React, { useState, useEffect } from "react";

interface AttendanceRecord {
  id: number;
  name: string;
  date: string;
  status: "Present" | "Absent" | "Late";
}

const attendanceData: AttendanceRecord[] = [
  { id: 1, name: "John Doe", date: "2025-03-20", status: "Present" },
  { id: 2, name: "Jane Smith", date: "2025-03-20", status: "Late" },
  { id: 3, name: "Alice Johnson", date: "2025-03-19", status: "Absent" },
  { id: 4, name: "Bob Brown", date: "2025-03-18", status: "Present" },
  { id: 4, name: "Bob Brown", date: "2025-03-19", status: "Present" },
  { id: 4, name: "Bob Brown", date: "2025-03-19", status: "Present" },
];

export default function AdminAttendancePage() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
  const [dateFilter, setDateFilter] = useState(today);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setDateFilter(today); // Automatically set today's date
  }, []);

  const filteredRecords = attendanceData.filter((record) => {
    const matchesDate = dateFilter ? record.date === dateFilter : true;
    const matchesStatus = statusFilter ? record.status === statusFilter : true;
    const matchesSearch = searchTerm
      ? record.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesDate && matchesStatus && matchesSearch;
  });

  // Get day name (e.g., Monday, Tuesday)
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      {/* Heading with Day & Date */}
      <h2 className="text-2xl font-semibold mb-2">Employee Attendance <span className=''>🙋‍♀️</span></h2>
      <p className="text-lg text-gray-500 mb-4">📅
        {getDayName(dateFilter)}, {dateFilter}
      </p>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-lg flex flex-wrap gap-4 mb-4">
        <input
          type="date"
          className="p-2 border rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search Employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Employee</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td className="border p-2">{record.name}</td>
                  <td className="border p-2">{record.date}</td>
                  <td
                    className={`border p-2 ${
                      record.status === "Present"
                        ? "text-green-600"
                        : record.status === "Late"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
