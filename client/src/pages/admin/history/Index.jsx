import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { FaEye } from "react-icons/fa6";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const mockHistory = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      model: "ตรวจจับอาการง่วง",
      status: "ง่วง",
      timestamp: "2025-04-11 08:15",
    },
    {
      id: 2,
      name: "สุภาพร น่ารัก",
      model: "ตรวจจับการหาว",
      status: "ไม่ง่วง",
      timestamp: "2025-04-11 09:40",
    },
    {
      id: 3,
      name: "กิตติชัย ทองดี",
      model: "ตรวจจับการหลับตา",
      status: "ง่วง",
      timestamp: "2025-04-10 18:30",
    },
    {
      id: 4,
      name: "ณัฐวุฒิ แสนดี",
      model: "ประเมินความเหนื่อย",
      status: "ไม่ง่วง",
      timestamp: "2025-04-09 11:20",
    },
    {
      id: 5,
      name: "สายฝน เย็นใจ",
      model: "ระบบแจ้งเตือน",
      status: "ง่วง",
      timestamp: "2025-04-08 22:45",
    },
    {
      id: 6,
      name: "ปิ่นมณี รุ่งเรือง",
      model: "วิเคราะห์สีหน้า",
      status: "ไม่ง่วง",
      timestamp: "2025-04-07 16:10",
    },
  ];

  return (
    <div className="px-6 py-8 mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">
          ประวัติการใช้งาน
        </h1>
        <p className="text-gray-600">
          ดูประวัติการใช้งานของผู้ใช้งานระบบตรวจจับการหลับใน
        </p>
      </div>
      <div>
        <div className="mt-6 bg-white rounded-xl border overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-[#1296BF] text-white text-left">
              <tr className="text-base">
                <th className="w-12 font-semibold text-center">#</th>
                <th className="px-6 py-4 font-semibold">ชื่อผู้ใช้งาน</th>
                <th className="px-6 py-4 font-semibold">ชื่อโมเดลที่ใช้</th>
                <th className="px-6 py-4 font-semibold">สถานะผลการตรวจจับ</th>
                <th className="px-6 py-4 font-semibold">เวลาในการใช้งาน</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockHistory?.map((his, index) => (
                <tr
                  key={his.id}
                  className="hover:bg-gray-50 transition duration-150 h-16"
                >
                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                    {his.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {his.model}
                  </td>
                  <td className="px-6 py-4 ">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium cursor-default
                  ${
                    his.status === "ไม่ง่วง"
                      ? `text-green-700 bg-green-100`
                      : `text-red-700 bg-red-100`
                  } rounded-full`}
                    >
                      {his.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                    {his.timestamp}
                  </td>
                  <td className="flex px-6 py-4">
                    <Link
                      to={`/admin/view/history/${his.id}`}
                      className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition"
                    >
                      <FaEye size={25} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(mockHistory.length / itemsPerPage)}
        // onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Index;
