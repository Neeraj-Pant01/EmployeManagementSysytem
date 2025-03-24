import React, { useState } from "react";

interface Payroll {
  id: number;
  employee: string;
  department: string;
  salary: number;
  status: "Pending" | "Processed" | "Failed";
  lastProcessed: string;
}

const initialPayrolls: Payroll[] = [
  { id: 1, employee: "John Doe", department: "Engineering", salary: 5000, status: "Processed", lastProcessed: "March 5, 2025" },
  { id: 2, employee: "Jane Smith", department: "Marketing", salary: 4500, status: "Pending", lastProcessed: "March 10, 2025" },
  { id: 3, employee: "Michael Lee", department: "HR", salary: 4000, status: "Failed", lastProcessed: "March 2, 2025" },
];

const PayrollManagement: React.FC = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>(initialPayrolls);
  const [filters, setFilters] = useState({ month: "", year: "", department: "", status: "" });
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [actionType, setActionType] = useState<"Approve" | "Reject" | "Retry" | null>(null);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Update payroll status
  const updatePayrollStatus = () => {
    if (!selectedPayroll || !actionType) return;

    setPayrolls((prev) =>
      prev.map((p) =>
        p.id === selectedPayroll.id
          ? {
              ...p,
              status: actionType === "Approve" ? "Processed" : "Failed",
              lastProcessed: new Date().toLocaleDateString(),
            }
          : p
      )
    );

    setSelectedPayroll(null);
    setActionType(null);
  };

  // Apply filters to payroll list
  const filteredPayrolls = payrolls.filter((payroll) => {
    return (
      (filters.month === "" || payroll.lastProcessed.includes(filters.month)) &&
      (filters.year === "" || payroll.lastProcessed.includes(filters.year)) &&
      (filters.department === "" || payroll.department === filters.department) &&
      (filters.status === "" || payroll.status === filters.status)
    );
  });

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">💰 Payroll Management</h2>

      {/* Filters Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg">
        <select name="month" value={filters.month} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
        </select>

        <select name="year" value={filters.year} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select name="department" value={filters.department} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
        </select>

        <select name="status" value={filters.status} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">Select Status</option>
          <option value="Processed">Processed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payroll List Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Employee</th>
              <th className="p-3">Department</th>
              <th className="p-3">Salary (Rs)</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Processed</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length > 0 ? (
              filteredPayrolls.map((payroll) => (
                <tr key={payroll.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{payroll.employee}</td>
                  <td className="p-3">{payroll.department}</td>
                  <td className="p-3">Rs {payroll.salary.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        payroll.status === "Processed" ? "bg-green-500" :
                        payroll.status === "Pending" ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}
                    >
                      {payroll.status}
                    </span>
                  </td>
                  <td className="p-3">{payroll.lastProcessed}</td>
                  <td className="p-3 space-x-2">
                    {payroll.status === "Pending" && (
                      <>
                        <button
                          onClick={() => { setSelectedPayroll(payroll); setActionType("Approve"); }}
                          className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => { setSelectedPayroll(payroll); setActionType("Reject"); }}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {payroll.status === "Failed" && (
                      <button
                        onClick={() => { setSelectedPayroll(payroll); setActionType("Retry"); }}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        🔄 Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">No payrolls found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Popup */}
      {selectedPayroll && actionType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold">Confirm {actionType}</h3>
            <p className="mt-2">Are you sure you want to {actionType.toLowerCase()} payroll for <b>{selectedPayroll.employee}</b>?</p>
            <div className="mt-4 flex gap-4">
              <button onClick={updatePayrollStatus} className="px-4 py-2 bg-blue-600 text-white rounded-md">Confirm</button>
              <button onClick={() => setSelectedPayroll(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;
