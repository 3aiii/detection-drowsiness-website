import React, { useEffect, useState } from "react";
import { FaFolderTree } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { fetch, profile, update } from "../../../apis/userApi";
import { showAlert } from "../../../utils/sweetProp";
import { PROFILE_URL } from "../../../confidential";

const Edit = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const fetchUser = async () => {
    try {
      const { data } = await fetch(id);

      setFormData({
        username: data?.data?.username || "",
        email: data?.data?.email || "",
        firstname: data?.data?.firstname || "",
        lastname: data?.data?.lastname || "",
        profile_image: data?.data?.profile_image || null,
      });
      if (data?.profile_image) {
        setImagePreview(data.profile_image);
      }
    } catch (error) {
      showAlert("Error", `${error.message}`, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await update(formData, id);
      if (data) {
        if (formData.profile_image instanceof File) {
          await profile(formData.profile_image, id);
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

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="flex items-center gap-4 text-3xl font-semibold text-[#1296BF] mb-1">
        <FaFolderTree size={25} />
        ผู้ใช้งาน / แก้ไขข้อมูล / {id}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Form Fields */}
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <label className="text-gray-500 text-md">ชื่อผู้ใช้งาน</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-500 text-md">รหัสผู้ใช้งาน</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-500 text-md">อีเมล</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                  value={formData.firstname}
                  onChange={handleChange}
                  className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
                />
              </div>
              <div className="w-1/2">
                <label className="text-gray-500 text-md">นามสกุล</label>
                <input
                  type="text"
                  placeholder="LastName"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="p-3 mt-1 w-full rounded-lg bg-[#edf0f5] focus:outline-none focus:ring-2 focus:ring-[#1296BF]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => fetchUser()}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500 transition text-lg"
              >
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
            {imagePreview || formData?.profile_image ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-600 mb-2">รูปภาพผู้ใช้งาน</p>
                <img
                  src={
                    imagePreview ||
                    `${
                      formData?.profile_image
                        ? `${PROFILE_URL}/${formData?.profile_image}`
                        : `https://placehold.co/128x128`
                    }`
                  }
                  alt="User preview"
                  className="w-[320px] h-[320px] object-cover rounded-lg border shadow"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData((prev) => ({ ...prev, profile_image: null }));
                  }}
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
      </form>
    </div>
  );
};

export default Edit;
