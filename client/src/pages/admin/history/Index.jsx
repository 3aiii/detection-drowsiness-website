import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import { FaEye } from "react-icons/fa6";
import { fetchs } from "../../../apis/systemApi";
import { formatDate } from "../../../utils/sweetProp";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [history, setHistory] = useState([])
  const startIndex = (currentPage - 1) * itemsPerPage;
  console.log(history)
  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await fetchs(currentPage, itemsPerPage)

      setHistory(data)
    }

    fetchHistory()
  }, [currentPage])

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
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#1296BF] text-white">
              <tr className="text-left">
                <th className="w-12 text-center py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold min-w-[150px]">ชื่อผู้ใช้งาน</th>
                <th className="px-4 py-3 font-semibold min-w-[120px]">สถานะ</th>
                <th className="px-4 py-3 font-semibold text-center">กระพริบตา</th>
                <th className="px-4 py-3 font-semibold text-center">การหาว</th>
                <th className="px-4 py-3 font-semibold text-center">Microsleeps</th>
                <th className="px-4 py-3 font-semibold text-center">Yawn Duration</th>
                <th className="px-4 py-3 font-semibold min-w-[140px]">เวลาตรวจจับ</th>
                <th className="px-4 py-3 font-semibold text-center"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {history?.message === "Can't find history" ? (
                <tr>
                  <td colSpan={9} className="py-6 text-center bg-white">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-xl text-gray-600 font-medium">ไม่มีการใช้งานระบบ</p>
                      <p className="text-gray-400 mt-1">ยังไม่มีข้อมูลการตรวจจับที่บันทึกไว้</p>
                    </div>
                  </td>
                </tr>) : (
                history?.data?.map((his, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-150">
                    <td className="text-center py-4">{startIndex + index + 1}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{his.fname} {his.lname}</td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full
                ${his.status === "Alert"
                            ? "text-red-700 bg-red-100"
                            : "text-green-700 bg-green-100"
                          }`}
                      >
                        {his.status === "Alert" ? `แจ้งเตือน` : `ไม่มีการแจ้งเตือน`}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">{his.blinks}</td>
                    <td className="px-4 py-4 text-center">{his.yawns}</td>
                    <td className="px-4 py-4 text-center">{his.microsleeps}</td>
                    <td className="px-4 py-4 text-center">{his.yawn_duration}</td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      {formatDate(his.detection_time)}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Link
                        to={`/admin/view/history/${his.detection_id}`}
                        className="inline-block p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition"
                      >
                        <FaEye size={18} />
                      </Link>
                    </td>
                  </tr>
                )
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={history?.currentPage}
        totalPages={history?.totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Index;
