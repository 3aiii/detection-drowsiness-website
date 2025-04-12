import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Pagination from "../../../components/Pagination";
import { fetchs, remove } from "../../../apis/userApi";
import { showAlert } from "../../../utils/sweetProp";
import Swal from "sweetalert2";

const Index = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchUsers = async () => {
    const { data } = await fetchs(currentPage, itemsPerPage);

    setUsers(data);
  };

  const handleRemove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const { data } = await remove(id);
        if (data) {
          showAlert(
            "Deleted",
            "User has been removed successfully.",
            "success"
          ).then(() => {
            fetchUsers();
          });
        }
      } catch (error) {
        showAlert("Error", `${error.message}`, "error");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="px-6 py-8 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">
            ผู้ใช้งาน
          </h1>
          <p className="text-gray-600">
            เพิ่ม ลบ หรือแก้ไขข้อมูลผู้ใช้งานในระบบของคุณ
          </p>
        </div>
        <div>
          <Link
            to={"/admin/create/user"}
            className="flex  items-center gap-2 bg-green-500 hover:bg-green-600 transition
              text-lg text-white px-3 py-2 rounded-md"
          >
            <FaRegPlusSquare size={20} />
            สร้างผู้ใช้งาน
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-6 bg-white rounded-xl border overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#1296BF] text-white text-left">
              <tr className="text-base">
                <th className="w-12 font-semibold text-center">#</th>
                <th className="px-6 py-4 font-semibold">ชื่อผู้ใช้งาน</th>
                <th className="px-6 py-4 font-semibold">อีเมล</th>
                <th className="px-6 py-4 font-semibold">บทบาท</th>
                <th className="px-6 py-4 font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.data?.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 h-16"
                >
                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium cursor-default
                    ${
                      user.role === "user"
                        ? `text-green-700 bg-green-100`
                        : `text-red-700 bg-red-100`
                    } rounded-full`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/edit/user/${user.user_id}`}
                        className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                      >
                        <MdEdit size={25} />
                      </Link>
                      <button
                        onClick={() => handleRemove(user.user_id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        <MdDeleteForever size={25} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={users?.totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Index;
