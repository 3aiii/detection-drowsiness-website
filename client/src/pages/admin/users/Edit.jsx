import React, { useEffect, useState } from "react";
import { FaFolderTree } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="flex items-center gap-4 text-3xl font-semibold text-[#1296BF] mb-1">
        <FaFolderTree size={25} />
        ผู้ใช้งาน / แก้ไขข้อมูล / {id}
      </h1>
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Form Fields */}
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-500 text-md">รหัสผู้ใช้งาน</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-500 text-md">อีเมล</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="text-gray-500 text-md">ชื่อ</label>
              <input
                type="text"
                placeholder="FirstName"
                name="firstname"
                className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-500 text-md">นามสกุล</label>
              <input
                type="text"
                placeholder="LastName"
                name="lastname"
                className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition text-lg">
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition text-lg"
            >
              อัปเดตข้อมูล
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {imagePreview ? (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-2">รูปภาพผู้ใช้งาน:</p>
              <img
                src={imagePreview}
                alt="User preview"
                className="w-[320px] h-[320px] object-cover rounded-lg border shadow"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="mt-4 px-4 py-1 bg-[#1296BF] text-white rounded-lg text-lg hover:bg-[#0f7fa4] transition"
              >
                ลบรูปภาพ
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center w-[320px] h-[320px] border-2 border-dashed border-[#1296BF] rounded-lg text-[#1296BF] hover:bg-gray-100 cursor-pointer transition"
            >
              เลือกรูปภาพผู้ใช้งาน
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
