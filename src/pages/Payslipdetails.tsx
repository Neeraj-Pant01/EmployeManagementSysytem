// import React from "react";
// import { useParams } from "react-router-dom";

// interface Payslip {
//   month: string;
//   baseSalary: number;
//   bonus: number;
//   deductions: number;
//   netSalary: number;
//   taxBreakdown: { type: string; amount: number }[];
//   payslipUrl: string;
// }

// const payslipData: Payslip[] = [
//   {
//     month: "March 2025",
//     baseSalary: 5000,
//     bonus: 500,
//     deductions: 300,
//     netSalary: 5200,
//     taxBreakdown: [
//       { type: "Income Tax", amount: 200 },
//       { type: "Provident Fund", amount: 50 },
//       { type: "Insurance", amount: 50 },
//     ],
//     payslipUrl: "/payslips/march-2025.pdf",
//   },
//   {
//     month: "February 2025",
//     baseSalary: 5100,
//     bonus: 300,
//     deductions: 200,
//     netSalary: 5200,
//     taxBreakdown: [
//       { type: "Income Tax", amount: 150 },
//       { type: "Provident Fund", amount: 50 },
//       { type: "Insurance", amount: 50 },
//     ],
//     payslipUrl: "/payslips/february-2025.pdf",
//   },
// ];

// const PayslipDetails: React.FC = () => {
//   const { month } = useParams<{ month: string }>();

//   const payslip = payslipData.find((p) => p.month === month);

//   if (!payslip) {
//     return <p className="text-red-500 text-center mt-6">Payslip not found.</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">{payslip.month} Payslip</h2>

//       {/* Salary Breakdown */}
//       <div className="grid grid-cols-2 gap-6 bg-gray-100 p-4 rounded-lg">
//         <div>
//           <p className="font-semibold">Base Salary:</p>
//           <p>Rs {payslip.baseSalary}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Bonus:</p>
//           <p className="text-green-600">Rs {payslip.bonus}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Deductions:</p>
//           <p className="text-red-500">-Rs {payslip.deductions}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Net Salary:</p>
//           <p className="text-purple-600">Rs {payslip.netSalary}</p>
//         </div>
//       </div>

//       {/* Tax & Contributions */}
//       <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
//         <h3 className="text-lg font-semibold mb-3">Tax & Contributions</h3>
//         <ul className="divide-y">
//           {payslip.taxBreakdown.map((tax, index) => (
//             <li key={index} className="py-2 flex justify-between">
//               <span>{tax.type}</span>
//               <span className="font-semibold text-red-500">-Rs {tax.amount}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Download Button */}
//       <div className="mt-6">
//         <a
//           href={payslip.payslipUrl}
//           download
//           className="px-4 py-2 bg-blue-600 text-white rounded shadow-md"
//         >
//           Download Payslip
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PayslipDetails;





import React from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PayslipPdf from "../components/PayslipPdf.tsx";

const payslipData = [
  {
    month: "March 2025",
    baseSalary: 5000,
    bonus: 500,
    deductions: 300,
    netSalary: 5200,
    taxBreakdown: [
      { type: "Income Tax", amount: 200 },
      { type: "Provident Fund", amount: 50 },
      { type: "Insurance", amount: 50 },
    ],
  },
  {
    month: "February 2025",
    baseSalary: 5100,
    bonus: 300,
    deductions: 200,
    netSalary: 5200,
    taxBreakdown: [
      { type: "Income Tax", amount: 150 },
      { type: "Provident Fund", amount: 50 },
      { type: "Insurance", amount: 50 },
    ],
  },
];

const PayslipDetails: React.FC = () => {
  const { month } = useParams<{ month: string }>();

  const payslip = payslipData.find((p) => p.month === month);

  if (!payslip) {
    return <p className="text-red-500 text-center mt-6">Payslip not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{payslip.month} Payslip</h2>

      {/* Salary Breakdown */}
      <div className="grid grid-cols-2 gap-6 bg-gray-100 p-4 rounded-lg">
        <div>
          <p className="font-semibold">Base Salary:</p>
          <p>Rs {payslip.baseSalary}</p>
        </div>
        <div>
          <p className="font-semibold">Bonus:</p>
          <p className="text-green-600">Rs {payslip.bonus}</p>
        </div>
        <div>
          <p className="font-semibold">Deductions:</p>
          <p className="text-red-500">-Rs {payslip.deductions}</p>
        </div>
        <div>
          <p className="font-semibold">Net Salary:</p>
          <p className="text-purple-600">Rs {payslip.netSalary}</p>
        </div>
      </div>

      {/* Tax & Contributions */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Tax & Contributions</h3>
        <ul className="divide-y">
          {payslip.taxBreakdown.map((tax, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{tax.type}</span>
              <span className="font-semibold text-red-500">-Rs {tax.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Generate & Download Payslip PDF */}
      <div className="mt-6">
        <PDFDownloadLink
          document={<PayslipPdf payslip={payslip} />}
          fileName={`Payslip-${payslip.month}.pdf`}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow-md"
        >
          {({ loading }) => (loading ? "Generating..." : "Download Payslip")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PayslipDetails;

