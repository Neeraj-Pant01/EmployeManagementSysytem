import React, { useState, useEffect } from "react";

interface WorkLog {
  id: number;
  employee: string;
  date: string;
  project: string;
  hours: number;
  workDone: string;
}

const workLogsData: WorkLog[] = [
  { id: 1, employee: "John Doe", date: "2025-03-20", project: "Project Alpha", hours: 5, workDone: "Fixed UI bugs" },
  { id: 2, employee: "Jane Smith", date: "2025-03-20", project: "Project Beta", hours: 6, workDone: "Developed API endpoints" },
  { id: 3, employee: "Alice Johnson", date: "2025-03-19", project: "Project Alpha", hours: 4, workDone: "Designed dashboard" },
  { id: 4, employee: "Bob Brown", date: "2025-03-18", project: "Project Gamma", hours: 7, workDone: "Integrated database" },
];

export default function AdminWorkLogsPage() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
  const [dateFilter, setDateFilter] = useState(today);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");

  useEffect(() => {
    setDateFilter(today); // Auto-set today's date
  }, []);

  const filteredLogs = workLogsData.filter((log) => {
    const matchesDate = dateFilter ? log.date === dateFilter : true;
    const matchesEmployee = employeeFilter ? log.employee.toLowerCase().includes(employeeFilter.toLowerCase()) : true;
    const matchesProject = projectFilter ? log.project.toLowerCase().includes(projectFilter.toLowerCase()) : true;
    return matchesDate && matchesEmployee && matchesProject;
  });

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      {/* Heading with Day & Date */}
      <h2 className="text-2xl font-semibold mb-2">Employee Work Logs <span>👷‍♀️👷‍♂️</span></h2>
      <p className="text-lg text-gray-600 mb-4">
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
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search Employee"
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
        />
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search Project"
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
        />
      </div>

      {/* Work Logs Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Employee</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Project</th>
              <th className="border p-2">Hours Worked</th>
              <th className="border p-2">Work Done</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="border p-2">{log.employee}</td>
                  <td className="border p-2">{log.date}</td>
                  <td className="border p-2">{log.project}</td>
                  <td className="border p-2">{log.hours}</td>
                  <td className="border p-2">{log.workDone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No work logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
