import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verify } from "../apis/authApi";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verfifyUser = async () => {
      const { data } = await verify();

      if (data?.user?.role) {
        navigate("/");
      } else {
        navigate("/login");
      }
    };

    verfifyUser();
  }, []);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className={`flex w-[980px] bg-white border rounded-3xl shadow-md`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
