import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
