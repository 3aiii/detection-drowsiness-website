import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserEdit, FaEdit } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { to: "/", label: "หน้าหลัก", icon: <FaHome /> },
    { to: "/profile", label: "แก้ไขข้อมูล", icon: <FaUserEdit /> },
    { to: "/system", label: "ตั้งค่าระบบ", icon: <FaEdit /> },
  ];

  return (
    <div className="w-full h-fit p-4 flex flex-col gap-2">
      {menuItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
            ${
              location.pathname === item.to
                ? "bg-[#1296BF] text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
            }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
