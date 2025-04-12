import React, { useState } from "react";
import { FaFolderTree } from "react-icons/fa6";
import { create, profile } from "../../../apis/userApi";
import { showAlert } from "../../../utils/sweetProp";

const Create = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    profile_image: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profile_image: file }));
    } else {
      setImagePreview(null);
      setFormData((prev) => ({ ...prev, profile_image: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await create(formData);
      if (data) {
        if (formData.profile_image instanceof File) {
          await profile(formData.profile_image, data?.data);
        }

        showAlert("Success", "Data updated successfully.", "success").then(
          () => {
            window.location.reload();
          }
        );
      }
    } catch (error) {
      showAlert("Error", `${error.message}`, "error");
    }
  };

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="flex items-center gap-4 text-3xl font-semibold text-[#1296BF] mb-1">
        <FaFolderTree size={25} />
        ผู้ใช้งาน / สร้างผู้ใช้งาน
      </h1>

      <form onSubmit={handleSubmit} className="flex">
        <div className="w-1/2">
          <div className="mt-6">
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
              onClick={() => {
                setFormData({
                  username: "",
                  password: "",
                  email: "",
                  firstname: "",
                  lastname: "",
                  image: null,
                });
                setImagePreview(null);
              }}
              className="w-fit px-4 bg-gray-400 hover:bg-gray-500 transition text-white rounded-lg py-2 mt-4 text-lg"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="w-fit px-4 bg-green-400 hover:bg-green-500 transition text-white rounded-lg py-2 mt-4 text-lg"
            >
              เพิ่มผู้ใช้งาน
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 mt-4">
          {imagePreview === null ? (
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center px-4 py-2 text-[#1296BF] hover:bg-gray-200 rounded-lg border-dashed border-2 border-[#1296BF] cursor-pointer transition duration-200 w-[320px] h-[320px]"
            >
              เลือกไฟล์
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex items-center flex-col mt-4">
              <p className="text-gray-600 mb-2">ตัวอย่างภาพ:</p>
              <img
                src={imagePreview}
                alt="preview"
                className="max-w-xs h-[320px] w-[320px] object-cover rounded-lg border"
              />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, profile_image: null }));
                }}
                type="button"
                className="w-fit px-4 bg-[#1296BF] hover:bg-[#377c91] transition text-white rounded-lg py-1 mt-4 text-lg"
              >
                ยกเลิก
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
