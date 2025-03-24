import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import BookDetail from "./Payslipdetails.tsx";
import AttendanceDashboard from "./Attendence.tsx";
import WorkLogsPage from "./Worklogs.tsx";
import LeaveRequestsPage from "./LeaveRequest.tsx";
import ProjectDashboard from "./Projects.tsx";
import SingleProject from "./SingleProject.tsx";
import OverviewCards from "../components/OverviewCards.tsx";
import TasksPage from "./Taskpage.tsx";
import PayrollDashboard from "./Payrols.tsx";
import ReimbursementRequests from "./Reimbursement.tsx";
import PayslipDetails from "./Payslipdetails.tsx";
import AnnouncementsPage from "./Announcements.tsx";
import AdminAttendancePage from "./ViewAttendence.tsx";
import AdminWorkLogsPage from "./Employelogs.tsx";
import AdminLeaveRequestsPage from "./AdminLeaveRequest.tsx";
import NewProjectPage from "./AddNewProject.tsx";
import TaskManagement from "./AdminTask.tsx";
import AdminAnnouncements from "./AdminAnnouncements.tsx";
import AdminReimbursements from "./AdminReimbursment.tsx";
import PayrollManagement from "./PayroleManagement.tsx";
import AdminDashboard from "./AdminDashboard.tsx";

// Dashboard Components
const DashboardHome = () => (
  <div className="space-y-6">
    <OverviewCards />
  </div>
);

const UserManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">User Management</h2>
    <p>User management content goes here</p>
  </div>
);

const Settings = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Settings</h2>
    <p>Settings content goes here</p>
  </div>
);

const UsersList = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">All Users</h2>
    {/* Add users list component */}
  </div>
);

// const AddUser = () => (
//   <div class="bg-white rounded-lg shadow p-6">
//     <h2 class="text-xl font-semibold mb-4">Add New User</h2>
//     {/* Add user form component */}
//   </div>
// );

const UserRoles = () => (
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">User Roles</h2>
    {/* Add roles management component */}
  </div>
);
const currentUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
const isAdmin = currentUser.isAdmin
const isUser = !currentUser?.isAdmin

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={isUser ? <DashboardHome /> : <AdminDashboard />} />
        {/* <Route path="/users/all" element={<UsersList />} /> */}
        <Route path="/users/attendence" element={isUser ? <AttendanceDashboard /> : <AdminAttendancePage />} />
        {/* <Route path="/users/add" element={<AddUser />} /> */}
        <Route path="/users/worklogs" element={isUser ?<WorkLogsPage /> : <AdminWorkLogsPage />} />
        <Route path="/users/Leave-Request" element={isUser ?<LeaveRequestsPage /> : <AdminLeaveRequestsPage />} />
        <Route path="/projects/all" element={<ProjectDashboard />} />
        <Route path="/projects/new" element={isAdmin ?<NewProjectPage /> : <Navigate to={'/projects/all'} />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="/payroll" element={isUser ? <PayrollDashboard /> : <PayrollManagement /> } />
        <Route path="/payroll/PayslipDetails/:month" element={<PayslipDetails />} />
        <Route path="/payroll/ReimbursementRequests" element={isUser ? <ReimbursementRequests />:<AdminReimbursements />} />
        <Route path="/Announcements" element={isUser ? <AnnouncementsPage />: <AdminAnnouncements />} />
        <Route path="/tasks" element={isUser ? <TasksPage /> : <TaskManagement />} />
        <Route path="/details" element={<BookDetail />} />
        {/* Add more routes as needed */}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
