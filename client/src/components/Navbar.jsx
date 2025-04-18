import React from "react";
import { logout } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utils/sweetProp";
import Swal from "sweetalert2";
import { PROFILE_URL } from "../confidential";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await logout();

        if (data.status === 200 || data.message === "Logged out successfully") {
          showAlert("Logged out!", "You have been logged out.", "success").then(
            () => {
              navigate("/login");
            }
          );
        } else {
          showAlert("Error", "Something went wrong while logging out", "error");
        }
      } catch (err) {
        showAlert("Error", "Failed to logout", "error");
      }
    }
  };

  return (
    <nav className="w-full py-2 px-8 sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl mr-12 cursor-default font-semibold text-[#1296BF]">
            Detection Drowsiness
          </h1>
        </div>
        <div className="flex items-center gap-4 text-gray-700 font-medium">
          <div className="flex items-center gap-2 bg-[#f0f9ff] p-2 rounded-lg shadow-sm">
            <p className="text-gray-700 text-lg font-semibold">
              ยินดีต้อนรับ ,
            </p>
            <span className="text-[#1296BF] text-lg font-bold">
              {user?.firstname} {user?.lastname}
            </span>
          </div>
          <img
            src={`${user?.profile_image !== null
                ? `${PROFILE_URL}/${user?.profile_image}`
                : `https://placehold.co/50x50`
              }`}
            className="rounded-full w-[50px] h-[50px]"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-lg hover:bg-red-600 transition text-white px-4 py-2 rounded-md shadow-sm"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
