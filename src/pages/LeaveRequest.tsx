import React, { useState } from "react";

const leaveRequestsData = [
  { date: "2025-03-20", type: "Sick Leave", reason: "Flu", status: "Approved" },
  { date: "2025-03-25", type: "Casual Leave", reason: "Personal Work", status: "Pending" },
  { date: "2025-04-10", type: "Vacation", reason: "Family Trip", status: "Rejected" },
];

export default function LeaveRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("");
  const [newLeave, setNewLeave] = useState({ type: "", date: "", reason: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Filtering Leave Requests
  const filteredRequests = leaveRequestsData.filter((request) => {
    const matchesStatus = statusFilter ? request.status === statusFilter : true;
    const matchesType = leaveTypeFilter ? request.type === leaveTypeFilter : true;
    return matchesStatus && matchesType;
  });

  // Handle New Leave Request Submission (Mock)
  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLeave.type && newLeave.date && newLeave.reason) {
      alert("Leave Request Submitted!");
      setNewLeave({ type: "", date: "", reason: "" });
      setIsPopupOpen(false); // Close popup after submission
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header with "Add Leave Request" Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Leave Requests</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md"
          onClick={() => setIsPopupOpen(true)}
        >
          + Add Leave Request
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-wrap gap-4">
        <select
          className="p-2 border rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Sort by Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="p-2 border rounded"
          value={leaveTypeFilter}
          onChange={(e) => setLeaveTypeFilter(e.target.value)}
        >
          <option value="">Filter by Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Vacation">Vacation</option>
        </select>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Leave Type</th>
              <th className="border p-2">Reason</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={index}>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup Modal for New Leave Request */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Add Leave Request</h3>
            <form onSubmit={handleLeaveSubmit} className="flex flex-col gap-3">
              <select
                className="p-2 border rounded"
                value={newLeave.type}
                onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Vacation">Vacation</option>
              </select>
              <input
                type="date"
                className="p-2 border rounded"
                value={newLeave.date}
                onChange={(e) => setNewLeave({ ...newLeave, date: e.target.value })}
                required
              />
              <textarea
                className="p-2 border rounded"
                placeholder="Reason for leave"
                value={newLeave.reason}
                onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setIsPopupOpen(false)}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
