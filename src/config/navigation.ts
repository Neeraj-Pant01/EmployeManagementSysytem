import { FaBuilding, FaRProject } from "react-icons/fa";
import {
  MdDashboard,
  MdPeople,
  MdSettings,
  MdBarChart,
  MdPerson,
  MdShoppingCart,
  MdGroup,
  MdWork,
  MdAnalytics,
  MdKeyboardArrowDown,
  MdSecurity,
  MdEmail,
  MdNotifications,
  MdBook,
  MdBookmark,
  MdDetails,
} from "react-icons/md/index.js";

export type NavItem = {
  title: string;
  path: string;
  icon: React.ComponentType;
  children?: NavItem[];
};

export const navigationConfig: Record<string, NavItem[]> = {
  admin: [
    { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
    {
      title: "Attendance",
      path: "/dashboard/users",
      icon: MdPeople,
      children: [
        { title: "View Attendance", path: "/dashboard/users/attendence", icon: MdGroup },
        { title: "Work logs", path: "/dashboard/users/worklogs", icon: MdPerson },
        { title: "Leave Requests", path: "/dashboard/users/Leave-Request", icon: MdSecurity },
      ],
    },
    { title: "Project", path: "/dashboard/projetcs", icon: MdPerson ,
      children:[
        {title:"Projects", path:'/dashboard/projects/all', icon:FaBuilding},
        {title:"New Project", path:'/dashboard/projects/new', icon:FaRProject}
      ]

    },
    {title:"Tasks", path:"/dashboard/tasks", icon:MdBook},
    {
      title: "payrolls",
      path:"/dashboard/",
      icon: MdBook,
      children:[
        {title: "payroll", path: "/dashboard/payroll", icon: MdBook},
        // {title: "PayslipDetails", path: "/dashboard/payroll/PayslipDetails", icon: MdBook},
        {title: "Reimbursement", path: "/dashboard/payroll/ReimbursementRequests", icon: MdBook}
      ]
    },
    { title: "Announcements", path: "/dashboard/announcements", icon: MdShoppingCart },
  ],
  user: [
    { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
    {
      title: "Attendance",
      path: "/dashboard/users",
      icon: MdPeople,
      children: [
        { title: "Attendance", path: "/dashboard/users/attendence", icon: MdGroup },
        { title: "Work logs", path: "/dashboard/users/worklogs", icon: MdPerson },
        { title: "Leave Requests", path: "/dashboard/users/Leave-Request", icon: MdSecurity },
      ],
    },
    { title: "Project", path: "/dashboard/projetcs", icon: MdPerson ,
      children:[
        {title:"Projects", path:'/dashboard/projects/all', icon:FaBuilding}
      ]

    },
    {title:"Tasks", path:"/dashboard/tasks", icon:MdBook},
    {
      title: "payrolls",
      path:"/dashboard/",
      icon: MdBook,
      children:[
        {title: "payroll", path: "/dashboard/payroll", icon: MdBook},
        // {title: "PayslipDetails", path: "/dashboard/payroll/PayslipDetails", icon: MdBook},
        {title: "Reimbursement", path: "/dashboard/payroll/ReimbursementRequests", icon: MdBook}
      ]
    },
    { title: "Announcements", path: "/dashboard/announcements", icon: MdShoppingCart },
    // {
    //   title: "Bookings",
    //   path:"/dashboard/booking",
    //   icon: MdBookmark,
    //   children:[
    //     {title: "Bookings Details", path: "/dashboard/bookings/all", icon: MdDetails},
    //     {title: "New Booking", path: "/dashboard/bookings/new", icon: MdBook}
    //   ]
    // },
  ],
  manager: [
    { title: "Dashboard", path: "/dashboard", icon: MdDashboard },
    { title: "Team", path: "/dashboard/team", icon: MdGroup },
    { title: "Projects", path: "/dashboard/projects", icon: MdWork },
    { title: "Analytics", path: "/dashboard/analytics", icon: MdAnalytics },
  ],
};
