import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-3xl font-bold">Admin Dashboard</h2> */}
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-200 rounded-full">🔔</button>
          <img src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" alt="Admin" className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Total Employees", value: "250", color: "bg-blue-500" },
          { title: "Present Today", value: "230", color: "bg-green-500" },
          { title: "Pending Leave Requests", value: "5", color: "bg-yellow-500" },
          { title: "Pending Reimbursements", value: "8", color: "bg-red-500" },
          { title: "Upcoming Payrolls", value: "₹12,00,000", color: "bg-purple-500" },
        ].map((card, index) => (
          <div key={index} className={`${card.color} text-white p-4 rounded-lg`}>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-2 space-y-6">
          {/* Attendance & Work Logs */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Attendance & Work Logs</h3>
            <p>230 employees are present today.</p>
            <p>Weekly Work Log Summary: 1200+ hours logged.</p>
          </div>

          {/* Payroll & Reimbursement Status */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recent Payroll & Reimbursements</h3>
            <p>Next Payroll Processing: April 30, 2025</p>
            <p>Pending Reimbursements: 8 requests</p>
          </div>

          {/* Projects Overview */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Ongoing Projects</h3>
            <p>5 projects in progress</p>
            <p>Next deadline: May 10, 2025</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          {/* Latest Announcements */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Latest Announcements</h3>
            <ul className="list-disc pl-4">
              <li>Office Closure on April 15th</li>
              <li>Company Annual Meetup on May 5th</li>
            </ul>
          </div>

          {/* Pending Leave Requests */}
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Pending Leave Requests</h3>
            <p>5 requests pending approval.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



