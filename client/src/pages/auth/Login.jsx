import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex w-full">
      <div className="p-20 px-14 w-1/2 ">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#1296BF]">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-gray-500">เพื่อตรวจจับอาการง่วงนอนขณะขับรถ</p>
        </div>
        <form className="flex flex-col w-full">
          <div className="mt-2">
            <label className="text-gray-500 text-md font-l">
              ชื่อผู้ใช้งาน
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
            />
          </div>
          <div className="mt-2">
            <label className="text-gray-500 text-md font-l">
              รหัสผู้ใช้งาน
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1296BF] hover:bg-[#377c91] transition
             text-white rounded-lg py-2 mt-4 text-xl"
          >
            เข้าสู่ระบบ
          </button>
          <p className="mt-12 text-center text-sm text-gray-600">
            ยังไม่มีบัญชีผู้ใช้งาน?{" "}
            <Link
              to={"/register"}
              className="text-[#1296BF] hover:underline transition"
            >
              สมัครสมาชิกเลย
            </Link>
          </p>
        </form>
      </div>
      <div className="flex items-center w-1/2">
        <img src="/login.jpg" className="w-full object-contain" />
      </div>
    </div>
  );
};

export default Login;
