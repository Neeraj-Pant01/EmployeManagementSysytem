import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationConfig, NavItem } from "../config/navigation.ts";
import {
  MdMenu,
  MdChevronLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const currentUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  // In real app, get this from auth context/state
  const userType = currentUser.isAdmin ? "admin" : "user";
  const navigation = navigationConfig[userType];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleSubmenu = (path: string) => {
    setExpandedMenus((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const NavLink = ({ item, level = 0 }: { item: NavItem; level?: number }) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.path);
    const isActive = location.pathname === item.path;
    const isChildActive = item.children?.some(
      (child) => location.pathname === child.path
    );

    return (
      <>
        <button
          onClick={() =>
            hasChildren ? toggleSubmenu(item.path) : handleNavigation(item.path)
          }
          className={`w-full flex items-center py-2 rounded-lg mb-1 transition-all duration-200
            ${level > 0 ? "pl-2" : ""}
            ${
              isActive || isChildActive
                ? "bg-blue-500 text-[white] border-2 border-blue-500"
                : "text-gray-600 border-2 hover:bg-blue-50"
            }
          `}
          title={isSidebarOpen ? "" : item.title}
        >
          <div className="flex items-center w-full">
            <Icon
              className={`text-xl ${isSidebarOpen ? "mr-2 ml-2" : "mx-auto"}`}
            />
            {isSidebarOpen && (
              <>
                <span className="ml-2">{item.title}</span>
                {hasChildren && (
                  <MdKeyboardArrowDown
                    className={`transition-transform duration-200 mr-2 font-bold ${
                      isExpanded ? "rotate-180" : "rotate-0"
                    } ml-auto`}
                  />
                )}
              </>
            )}
          </div>
        </button>

        {hasChildren && isExpanded && isSidebarOpen && (
          <div className="ml-4 border-gray-200">
            {item?.children?.map((child) => (
              <div key={child?.path}>
                <NavLink item={child} level={level + 1} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {isSidebarOpen && (
              <h2 className="text-xl font-bold">{currentUser?.isAdmin ? "Admin Panel" : currentUser?.displayName }</h2>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 ml-auto"
            >
              {isSidebarOpen ? (
                <MdChevronLeft size={24} />
              ) : (
                <MdMenu size={24} />
              )}
            </button>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {navigation.find((item) => item.path === location.pathname)
                ?.title || "Dashboard"}
            </h1>
            {/* <div className='float-right'>
            <FaBell />
            </div> */}
            <button
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                navigate("/login");
              }}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
