import React, { useState } from "react";

interface ReimbursementRequest {
  id: number;
  employee: string;
  amount: number;
  category: "Travel" | "Food" | "Medical" | "Other";
  date: string;
  status: "Pending" | "Approved" | "Declined";
  description: string;
  attachment?: string;
}

const initialRequests: ReimbursementRequest[] = [
  { id: 1, employee: "John Doe", amount: 120, category: "Travel", date: "March 12, 2025", status: "Pending", description: "Taxi fare for client meeting.", attachment: "/docs/taxi-receipt.pdf" },
  { id: 2, employee: "Jane Smith", amount: 50, category: "Food", date: "March 10, 2025", status: "Approved", description: "Business lunch with clients." },
  { id: 3, employee: "David Wilson", amount: 200, category: "Medical", date: "March 5, 2025", status: "Declined", description: "Emergency hospital visit." },
];

const AdminReimbursements: React.FC = () => {
  const [requests, setRequests] = useState<ReimbursementRequest[]>(initialRequests);
  const [selectedStatus, setSelectedStatus] = useState<"All" | "Pending" | "Approved" | "Declined">("All");
  const [selectedRequest, setSelectedRequest] = useState<ReimbursementRequest | null>(null);

  const filteredRequests = selectedStatus === "All" ? requests : requests.filter(req => req.status === selectedStatus);

  // Approve or Decline a request
  const updateRequestStatus = (id: number, status: "Approved" | "Declined") => {
    setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    setSelectedRequest(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">💰 Manage Reimbursements</h2>

      {/* Status Filters */}
      <div className="flex gap-4 mb-4">
        {["All", "Pending", "Approved", "Declined"].map(status => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as any)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${selectedStatus === status ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Reimbursement Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <div key={request.id} className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition" onClick={() => setSelectedRequest(request)}>
            <h3 className="font-semibold">{request.employee} - ${request.amount}</h3>
            <p className="text-gray-600 text-sm">{request.date} • <span className={`font-medium ${request.status === "Pending" ? "text-yellow-500" : request.status === "Approved" ? "text-green-500" : "text-red-500"}`}>{request.status}</span></p>
          </div>
        ))}
      </div>

      {/* Request Details Popup */}
      {selectedRequest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="font-semibold">{selectedRequest.employee} - ${selectedRequest.amount}</h3>
            <p className="text-gray-500 text-sm">{selectedRequest.date} • <span className="font-medium">{selectedRequest.category}</span></p>
            <p className="mt-4">{selectedRequest.description}</p>

            {selectedRequest.attachment && (
              <a href={selectedRequest.attachment} download className="block mt-3 text-blue-600 underline">📎 View Attachment</a>
            )}

            {selectedRequest.status === "Pending" && (
              <div className="mt-4 flex justify-between">
                <button onClick={() => updateRequestStatus(selectedRequest.id, "Approved")} className="px-4 py-2 bg-green-500 text-white rounded-md">✔ Approve</button>
                <button onClick={() => updateRequestStatus(selectedRequest.id, "Declined")} className="px-4 py-2 bg-red-500 text-white rounded-md">✖ Decline</button>
              </div>
            )}

            <button onClick={() => setSelectedRequest(null)} className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReimbursements;
