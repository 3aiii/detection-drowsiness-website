import React, { useState } from "react";

const Profile = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="text-3xl font-semibold text-[#1296BF]">แก้ไขข้อมูล</h1>
      <p className="text-gray-600 mb-6">
        ปรับแต่งข้อมูลผู้ใช้งาน และตรวจสอบประวัติการแจ้งเตือน
      </p>

      {/* Profile Picture Upload */}
      <form className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
          <img
            src={preview || "/default-profile.jpg"}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="mt-4 bg-[#1296BF] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0f7fa3] transition">
          เลือกรูปภาพ
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </form>

      {/* Username */}
      <div className="mt-2">
        <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
        />
      </div>

      {/* Password */}
      <div className="mt-4">
        <label className="text-gray-500 text-md">รหัสผู้ใช้งาน</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
        />
      </div>

      <div className="mt-2">
        <label className="text-gray-500 text-md">อีเมล</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
        />
      </div>

      <div className="flex gap-2 w-full">
        <div className="mt-2 w-full">
          <label className="text-gray-500 text-md">ชื่อ</label>
          <input
            type="text"
            placeholder="FirstName"
            name="firstname"
            className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
          />
        </div>
        <div className="mt-2 w-full">
          <label className="text-gray-500 text-md">นามสกุล</label>
          <input
            type="text"
            placeholder="LastName"
            name="lastname"
            className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="w-fit px-4 bg-gray-400 hover:bg-gray-500 transition
             text-white rounded-lg py-2 mt-4 text-สเ"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="w-fit px-4 bg-[#1296BF] hover:bg-[#377c91] transition
             text-white rounded-lg py-2 mt-4 text-สเ"
        >
          แก้ไขข้อมูล
        </button>
      </div>
    </div>
  );
};

export default Profile;
