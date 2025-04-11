import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div
        className={`flex w-[980px] bg-white border rounded-3xl shadow-md`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
