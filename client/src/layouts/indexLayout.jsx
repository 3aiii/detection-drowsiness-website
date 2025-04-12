import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { verify } from "../apis/authApi";

const IndexLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const { data } = await verify();
      
      if (data?.message === "Can't find your token") {
        navigate("/login");
      } else {
        setUser(data?.user);
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center w-full">
        <Navbar user={user} />
      </div>
      <div className="flex gap-4 w-full px-8">
        <div className="bg-white h-fit rounded-lg w-2/12">
          <Sidebar role={user?.role} />
        </div>
        <div className="bg-white rounded-lg  w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IndexLayout;
