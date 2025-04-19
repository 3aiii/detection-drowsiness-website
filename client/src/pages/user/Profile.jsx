import React, { useEffect, useState } from "react";
import { verify } from "../../apis/authApi";
import { fetch, profile, update } from "../../apis/userApi";
import { PROFILE_URL } from "../../confidential";
import { showAlert } from "../../utils/sweetProp";

const Profile = () => {
  const [preview, setPreview] = useState(null);
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    profile_image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, profile_image: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUser = async () => {
    try {
      const { data } = await verify();
      setUserId(data?.user?.user_id);
      if (data) {
        const { data: user } = await fetch(data?.user?.user_id);

        setFormData({
          username: user?.data?.username || "",
          email: user?.data?.email || "",
          firstname: user?.data?.firstname || "",
          lastname: user?.data?.lastname || "",
          profile_image: user?.data?.profile_image || null,
        });
      }
    } catch (error) {
      showAlert("Error", `${error.message}`, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await update(formData, userId);
      if (data) {
        if (formData.profile_image instanceof File) {
          await profile(formData.profile_image, userId);
        }

        if (data?.message === 'Your username or email already has in database') {
          showAlert("Warning", `${data?.message}`, 'warning')
        } else {
          showAlert("Success", "Data updated successfully.", "success").then(
            () => {
              window.location.reload();
            }
          );
        }
      }
    } catch (error) {
      showAlert("Error", `${error.message}`, "error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="text-3xl font-semibold text-[#1296BF]">แก้ไขข้อมูล</h1>
      <p className="text-gray-600 mb-6">
        ปรับแต่งข้อมูลผู้ใช้งาน และตรวจสอบประวัติการแจ้งเตือน
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
            <img
              src={
                preview ||
                `${formData?.profile_image
                  ? `${PROFILE_URL}/${formData?.profile_image}`
                  : `https://placehold.co/128x128`
                }`
              }
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
        </div>

        {/* Username */}
        <div className="mt-2">
          <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
            className="p-3 py-2 mt-1 focus:ring-[#1296BF] focus:ring-2 bg-[#edf0f5] rounded-lg font-light focus:outline-none w-full"
          />
        </div>

        {/* Email */}
        <div className="mt-2">
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

        <div className="flex gap-2 w-full">
          <div className="mt-2 w-full">
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
          <div className="mt-2 w-full">
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

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="w-fit px-4 bg-gray-400 hover:bg-gray-500 transition
             text-white rounded-lg py-2 mt-4 text-lg"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="w-fit px-4 bg-[#1296BF] hover:bg-[#377c91] transition
             text-white rounded-lg py-2 mt-4 text-lg"
          >
            แก้ไขข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
