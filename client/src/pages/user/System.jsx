import React from "react";

const System = () => {
  return (
    <div className="px-6 py-8 mx-auto">
      <div className="flex">
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">
            ตั้งค่าระบบ
          </h1>
          <p className="text-gray-600 mb-6">
            จัดการการตั้งค่าและดูประวัติการแจ้งเตือน
          </p>

          <div className="bg-white rounded-xl  mb-8">
            <h2 className="text-xl font-medium mb-4">เสียงแจ้งเตือน</h2>
            <p className="text-gray-700 mb-2">
              เสียงแจ้งเตือนปัจจุบัน :{" "}
              <span className="font-semibold text-[#1296BF]">Ring Ring</span>
            </p>
            <div className="flex gap-4 mt-4">
              <button className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg shadow transition duration-200">
                ▶️ เล่นตัวอย่าง
              </button>
              <button className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg shadow transition duration-200">
                🔄 เปลี่ยนเสียง
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/sound.jpg" className="w-full h-[250px] object-contain" />
        </div>
      </div>

      <div className="rounded-xl">
        <h2 className="text-xl font-medium mb-4">ประวัติการแจ้งเตือน</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 border-b text-gray-700 font-semibold">
                  วันที่
                </th>
                <th className="text-left px-4 py-2 border-b text-gray-700 font-semibold">
                  เวลา
                </th>
                <th className="text-left px-4 py-2 border-b text-gray-700 font-semibold">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">20 ม.ค. 2025</td>
                <td className="px-4 py-2 border-b">14:30</td>
                <td className="px-4 py-2 border-b text-[#D97706] font-medium">
                  แจ้งเตือน
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">19 ม.ค. 2025</td>
                <td className="px-4 py-2 border-b">18:45</td>
                <td className="px-4 py-2 border-b text-[#D97706] font-medium">
                  แจ้งเตือน
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default System;
