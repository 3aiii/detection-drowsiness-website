import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserEdit,
  FaEdit,
  FaUserAlt,
  FaHistory,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const role = "admin";

  const isActivated = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full h-fit p-4 flex flex-col gap-2">
      <Link
        to="/"
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
          ${
            isActivated("/")
              ? "bg-[#1296BF] text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
          }`}
      >
        <FaHome />
        หน้าหลัก
      </Link>

      <Link
        to="/profile"
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
          ${
            isActivated("/profile")
              ? "bg-[#1296BF] text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
          }`}
      >
        <FaUserEdit />
        แก้ไขข้อมูล
      </Link>

      <Link
        to="/system"
        className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
          ${
            isActivated("/system")
              ? "bg-[#1296BF] text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
          }`}
      >
        <FaEdit />
        ตั้งค่าระบบ
      </Link>

      {role === "admin" && (
        <>
          <Link
            to="/admin/user"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
              ${
                isActivated("/admin/user") ||
                isActivated("/admin/create/user") ||
                matchPath("/admin/edit/user/:id", location.pathname)
                  ? "bg-[#1296BF] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
              }`}
          >
            <FaUserAlt />
            ผู้ใช้งาน
          </Link>

          <Link
            to="/admin/history"
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-lg font-medium transition-all duration-200
              ${
                isActivated("/admin/history") ||
                matchPath("admin/view/history/:id", location.pathname)
                  ? "bg-[#1296BF] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[#1296BF]"
              }`}
          >
            <FaHistory />
            ประวัติการใช้งาน
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
