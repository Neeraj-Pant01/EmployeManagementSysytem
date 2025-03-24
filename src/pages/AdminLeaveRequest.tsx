import React, { useState, useEffect } from "react";

interface LeaveRequest {
  id: number;
  employee: string;
  date: string;
  type: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialLeaveRequests: LeaveRequest[] = [
  { id: 1, employee: "John Doe", date: "2025-03-20", type: "Sick Leave", reason: "Flu", status: "Pending" },
  { id: 2, employee: "Jane Smith", date: "2025-03-20", type: "Casual Leave", reason: "Family event", status: "Approved" },
  { id: 3, employee: "Alice Johnson", date: "2025-03-19", type: "Vacation", reason: "Traveling abroad", status: "Rejected" },
  { id: 4, employee: "Bob Brown", date: "2025-03-18", type: "Sick Leave", reason: "Medical checkup", status: "Pending" },
];

export default function AdminLeaveRequestsPage() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
  const [dateFilter, setDateFilter] = useState(today);
  const [employeeFilter, setEmployeeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  useEffect(() => {
    setDateFilter(today); // Auto-set today's date
  }, []);

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesDate = dateFilter ? request.date === dateFilter : true;
    const matchesEmployee = employeeFilter ? request.employee.toLowerCase().includes(employeeFilter.toLowerCase()) : true;
    const matchesStatus = statusFilter ? request.status === statusFilter : true;
    return matchesDate && matchesEmployee && matchesStatus;
  });

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleStatusChange = (id: number, newStatus: "Approved" | "Rejected") => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      {/* Heading with Day & Date */}
      <h2 className="text-2xl font-semibold mb-2">Leave Requests & Approvals <span className='text-[green]'>⛱</span></h2>
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
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Employee</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Leave Type</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border p-2">{request.employee}</td>
                  <td className="border p-2">{request.date}</td>
                  <td className="border p-2">{request.type}</td>
                  <td className="border p-2">{request.reason}</td>
                  <td
                    className={`border p-2 ${
                      request.status === "Approved"
                        ? "text-green-600"
                        : request.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {request.status}
                  </td>
                  <td className="border p-2">
                    {request.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded"
                          onClick={() => handleStatusChange(request.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleStatusChange(request.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">Processed</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
