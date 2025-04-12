import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showAlert } from "../../utils/sweetProp";
import { create } from "../../apis/userApi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return showAlert(
        "Password mismatch",
        "Your password and confirm password do not match.",
        "warning"
      );
    }

    delete formData.confirmPassword;

    const data = await create(formData);

    if (data?.status === 201) {
      showAlert("Success", "User created successfully!", "success").then(() => {
        navigate("/login");
      });
    } else {
      showAlert("Error", data?.data?.message, "error");
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="rounded-2xl flex max-w-5xl overflow-hidden">
        <div className="w-1/2">
          <img
            src="/register.jpg"
            className="w-full h-full object-cover"
            alt="register"
          />
        </div>
        <div className="p-12 w-1/2 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1296BF]">สมัครสมาชิก</h1>
            <p className="mt-1 text-gray-500">
              เพื่อเริ่มต้นการใช้งานระบบตรวจจับอาการง่วงนอน
            </p>
          </div>
          <form
            className="flex flex-col w-full mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-md">รหัสผ่าน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-md">ยืนยันรหัสผ่าน</label>
              <div className="flex items-center bg-[#edf0f5] rounded-lg">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="p-3 py-2 bg-transparent focus:ring-[#1296BF] focus:ring-2 rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <div className="w-full">
                <label className="text-gray-500 text-md">ชื่อ</label>
                <input
                  type="text"
                  placeholder="FirstName"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
                />
              </div>
              <div className="w-full">
                <label className="text-gray-500 text-md">นามสกุล</label>
                <input
                  type="text"
                  placeholder="LastName"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-md">อีเมล</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
              />
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
      </div>
    </div>
  );
};

export default Register;
