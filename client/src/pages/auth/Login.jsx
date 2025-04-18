import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, verify } from "../../apis/authApi";
import Swal from "sweetalert2";
import { showAlert } from "../../utils/sweetProp";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(credentials);
    if (data.status === 200) {
      if (data.data.token) {
        showAlert(
          "Success!",
          "Login verified. Redirecting to home...",
          "success"
        ).then(() => {
          navigate("/");
        });
      } else {
        showAlert(
          "Verification Failed!",
          `${data?.data?.message}`,
          "error"
        ).then(() => {
          navigate("/login");
        });
      }
    }
  };

  return (
    <div className="flex w-full">
      <div className="p-20 px-14 w-1/2">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#1296BF]">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-gray-500">เพื่อตรวจจับอาการง่วงนอนขณะขับรถ</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="mt-2">
            <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
            />
          </div>

          <div className="mt-2">
            <label className="text-gray-500 text-md">รหัสผู้ใช้งาน</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
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
        <img src="/login.jpg" className="w-full object-contain" alt="login" />
      </div>
    </div>
  );
};

export default Login;
