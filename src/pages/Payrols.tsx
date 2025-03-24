import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PayrollData {
    baseSalary: number;
    bonus: number;
    deductions: number;
    netSalary: number;
    payslipUrl: string;
    taxBreakdown: { type: string; amount: number }[];
    history: { month: string; year: number; salary: number; payslipUrl: string }[];
    reimbursements: { type: string; amount: number; status: "Pending" | "Approved" }[];
}

const payrollData: PayrollData = {
    baseSalary: 5000,
    bonus: 500,
    deductions: 300,
    netSalary: 5200,
    payslipUrl: "/payslips/march-2025",
    taxBreakdown: [
        { type: "Income Tax", amount: 200 },
        { type: "Provident Fund", amount: 50 },
        { type: "Insurance", amount: 50 },
    ],
    history: [
        { month: "March", year: 2025, salary: 5200, payslipUrl: "/payslips/march-2025.pdf" },
        { month: "February", year: 2025, salary: 5100, payslipUrl: "/payslips/february-2025.pdf" },
        { month: "January", year: 2025, salary: 5000, payslipUrl: "/payslips/january-2025.pdf" },
        { month: "December", year: 2024, salary: 4900, payslipUrl: "/payslips/december-2024.pdf" },
        { month: "November", year: 2024, salary: 4800, payslipUrl: "/payslips/november-2024.pdf" },
    ],
    reimbursements: [
        { type: "Travel Expense", amount: 150, status: "Approved" },
        { type: "Work Equipment", amount: 300, status: "Pending" },
    ],
};

const months = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = ["All", 2025, 2024];

const PayrollDashboard: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");

    const filteredHistory = payrollData.history.filter((entry) => {
        const monthMatch = selectedMonth === "All" || entry.month === selectedMonth;
        const yearMatch = selectedYear === "All" || entry.year === Number(selectedYear);
        return monthMatch && yearMatch;
    });

    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", { month: "long" }); // "March"
    const currentYear = currentDate.getFullYear(); // 2025

    const currentPayslipUrl = `/dashboard/payroll/PayslipDetails/${currentMonth} ${currentYear}`;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Payroll & Compensation</h2>
            <p className="text-gray-600">Current Month: March 2025</p>

            {/* Salary Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                {[
                    { title: "Base Salary", value: `Rs ${payrollData.baseSalary}`, color: "bg-blue-500" },
                    { title: "Bonus", value: `Rs ${payrollData.bonus}`, color: "bg-green-500" },
                    { title: "Deductions", value: `- Rs ${payrollData.deductions}`, color: "bg-red-500" },
                    { title: "Net Salary", value: `Rs ${payrollData.netSalary}`, color: "bg-purple-500" },
                ].map((item, index) => (
                    <div key={index} className={`p-4 ${item.color} text-white rounded-lg shadow-lg`}>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-2xl font-bold mt-2">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Payslip Section */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold">Latest Payslip</h3>
                <Link to={`${currentPayslipUrl}`} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Download PDF
                </Link>
            </div>

            {/* Tax & Deductions Breakdown */}
            <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Tax & Deductions Breakdown</h3>
                <ul className="divide-y">
                    {payrollData.taxBreakdown.map((tax, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span>{tax.type}</span>
                            <span className="font-semibold text-red-500">- Rs {tax.amount}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Payroll History with Filters */}
            <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Payroll History</h3>

                {/* Filter Section */}
                <div className="flex gap-4 mb-4">
                    <select className="p-2 border rounded-lg" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>

                    <select className="p-2 border rounded-lg" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Payroll History Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Month</th>
                            <th className="p-3">Year</th>
                            <th className="p-3">Salary</th>
                            <th className="p-3">Payslip</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((entry, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{entry.month}</td>
                                    <td className="p-3">{entry.year}</td>
                                    <td className="p-3">Rs {entry.salary}</td>
                                    <td className="p-3">
                                        <Link to={`/dashboard/payroll/PayslipDetails/${entry.month} ${entry.year}`}  className="text-blue-500 underline">
                                            Download
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center p-3 text-gray-500">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Reimbursement Requests */}
            <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Reimbursement Requests</h3>
                <ul className="divide-y">
                    {payrollData.reimbursements.map((reimbursement, index) => (
                        <li key={index} className="py-2 flex justify-between">
                            <span>{reimbursement.type}</span>
                            <span className={`font-semibold ${reimbursement.status === "Approved" ? "text-green-500" : "text-yellow-500"}`}>
                                {reimbursement.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PayrollDashboard;
