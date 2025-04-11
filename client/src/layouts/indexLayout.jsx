import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const IndexLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center w-full">
        <Navbar />
      </div>
      <div className="flex gap-4 w-full px-8">
        <div className="bg-white h-fit rounded-lg w-2/12">
          <Sidebar />
        </div>
        <div className="bg-white rounded-lg  w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;
