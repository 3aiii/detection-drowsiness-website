import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="rounded-2xl flex max-w-5xl overflow-hidden">
        <div className="p-12 w-1/2 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1296BF]">สมัครสมาชิก</h1>
            <p className="mt-1 text-gray-500">
              เพื่อเริ่มต้นการใช้งานระบบตรวจจับอาการง่วงนอน
            </p>
          </div>
          <form className="flex flex-col w-full mt-6 space-y-4">
            <div className="mt-2">
              <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="text-gray-500 text-md">รหัสผ่าน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="text-gray-500 text-md">ยืนยันรหัสผ่าน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1296BF] hover:bg-[#0e7fa0] transition 
                duration-200 text-white rounded-lg py-2 mt-2 text-xl"
            >
              สมัครสมาชิก
            </button>
            <p className="mt-12 text-center text-sm text-gray-600">
              มีบัญชีผู้ใช้งานแล้วใช่ไหม?{" "}
              <Link
                to={"/login"}
                className="text-[#1296BF] text-md hover:underline transition"
              >
                เข้าสู่ระบบที่นี่
              </Link>
            </p>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src="/register.jpg"
            className="w-full h-full object-cover"
            alt="register"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
