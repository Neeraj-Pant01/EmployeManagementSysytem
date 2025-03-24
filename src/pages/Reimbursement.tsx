import React, { useState } from "react";

interface Reimbursement {
  id: number;
  type: string;
  amount: number;
  description: string;
  status: "Pending" | "Approved";
  date: string; // Added date field
}

const initialReimbursements: Reimbursement[] = [
  { id: 1, type: "Travel Expense", amount: 150, description: "Flight ticket refund", status: "Approved", date: "2025-03-12" },
  { id: 2, type: "Work Equipment", amount: 300, description: "Purchased a new mouse", status: "Pending", date: "2025-03-14" },
  { id: 3, type: "Office Supplies", amount: 50, description: "Bought notebooks", status: "Approved", date: "2025-02-28" },
];

const ReimbursementRequests: React.FC = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>(initialReimbursements);
  const [newRequest, setNewRequest] = useState({ type: "", amount: "", description: "", date: "" });
  const [showModal, setShowModal] = useState(false);
  const [filterDate, setFilterDate] = useState({ day: "", month: "", year: "" });

  // Handle Form Inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  // Handle New Reimbursement Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.type || !newRequest.amount || !newRequest.description || !newRequest.date) return;

    const newReimbursement: Reimbursement = {
      id: reimbursements.length + 1,
      type: newRequest.type,
      amount: parseFloat(newRequest.amount),
      description: newRequest.description,
      status: "Pending",
      date: newRequest.date,
    };

    setReimbursements([...reimbursements, newReimbursement]);
    setNewRequest({ type: "", amount: "", description: "", date: "" });
    setShowModal(false);
  };

  // Filter Logic
  const filteredReimbursements = reimbursements.filter((r) => {
    const [year, month, day] = r.date.split("-");
    const matchesDay = filterDate.day ? filterDate.day === day : true;
    const matchesMonth = filterDate.month ? filterDate.month === month : true;
    const matchesYear = filterDate.year ? filterDate.year === year : true;
    return matchesDay && matchesMonth && matchesYear;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Reimbursement Requests</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-md" onClick={() => setShowModal(true)}>
          Submit New Reimbursement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-4 flex gap-3">
        <input
          type="number"
          placeholder="Year"
          min="2000"
          max="2100"
          value={filterDate.year}
          onChange={(e) => setFilterDate({ ...filterDate, year: e.target.value })}
          className="p-2 border rounded w-1/3"
        />
        <select
          value={filterDate.month}
          onChange={(e) => setFilterDate({ ...filterDate, month: e.target.value })}
          className="p-2 border rounded w-1/3"
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Day"
          min="1"
          max="31"
          value={filterDate.day}
          onChange={(e) => setFilterDate({ ...filterDate, day: e.target.value.padStart(2, "0") })}
          className="p-2 border rounded w-1/3"
        />
      </div>

      {/* Reimbursement List */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Past Reimbursements</h3>
        {filteredReimbursements.length > 0 ? (
          <ul className="divide-y">
            {filteredReimbursements.map((reimbursement) => (
              <li key={reimbursement.id} className="py-2 flex justify-between">
                <span>
                  {reimbursement.type} - <strong>Rs {reimbursement.amount}</strong> ({reimbursement.date})
                </span>
                <span className={reimbursement.status === "Approved" ? "text-green-600 font-semibold" : "text-yellow-500 font-semibold"}>
                  {reimbursement.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reimbursements found.</p>
        )}
      </div>

      {/* Popup Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-2">Submit New Reimbursement</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <select name="type" value={newRequest.type} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                <option value="">Select Type</option>
                <option value="Travel Expense">Travel Expense</option>
                <option value="Work Equipment">Work Equipment</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Training & Education">Training & Education</option>
              </select>
              <input type="number" name="amount" value={newRequest.amount} onChange={handleInputChange} placeholder="Amount" className="w-full p-2 border rounded" required />
              <textarea name="description" value={newRequest.description} onChange={handleInputChange} placeholder="Description" className="w-full p-2 border rounded" required></textarea>
              <input type="date" name="date" value={newRequest.date} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReimbursementRequests;



// import React from 'react'

// const Reimbursement = () => {
//   const FILEID = "1_lZggiZ1ZY6c7IMotUFx3eoIHJXPVM4U"; // Image file ID
//   https://drive.google.com/file/d/1_lZggiZ1ZY6c7IMotUFx3eoIHJXPVM4U/view?usp=drive_link
//   return (
//     <div>
//       {/* <iframe
//         src={`https://drive.google.com/file/d/${FILEID}/preview`}
//         width="400"
//         height="400"
//         allow="autoplay"
//         title="Reimbursement Image"
//         sandbox="allow-scripts allow-same-origin allow-popups"
//       ></iframe> */}
//       <img
//         src={`https://drive.google.com/file/d/1_lZggiZ1ZY6c7IMotUFx3eoIHJXPVM4U/view`}
//         alt="Reimbursement Image"
//         className="w-[400px] h-[400px]"
//       />
//     </div>
//   );
// }

// export default Reimbursement;


