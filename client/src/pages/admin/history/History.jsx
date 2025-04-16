import React from "react";
import { Link, useParams } from "react-router-dom";

const History = () => {
  const { id } = useParams();
  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">
        ประวัติการใช้งาน / รายละเอียด / {id}
      </h1>
      <p className="text-gray-600">
        ดูประวัติการใช้งานของผู้ใช้งานระบบตรวจจับการหลับใน
      </p>
      <div className="flex">
        <div className="w-full md:w-1/2 bg-white overflow-hidden">
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 w-1/2">รายละเอียด</th>
                <th className="text-left px-4 py-3 w-1/2">ข้อมูล</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">ชื่อผู้ใช้งาน</td>
                <td className="px-4 py-3">sirapat wongphatsawek</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">อีเมล</td>
                <td className="px-4 py-3">sirapat@email.com</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">ชื่อ - นามสกุล</td>
                <td className="px-4 py-3">สิรภัทร วงศ์พัฒน์เสวก</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">สถานะผลการตรวจจับ </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium cursor-default
                  ${
                    status === "ไม่ง่วง"
                      ? `text-green-700 bg-green-100`
                      : `text-red-700 bg-red-100`
                  } rounded-full`}
                  >
                    ง่วง
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">ชื่อโมเดลที่ใช้</td>
                <td className="px-4 py-3"> ดีจ้า</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium"> เวลาในการใช้งาน</td>
                <td className="px-4 py-3"> 2025-04-11 08:15</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <Link
              to={"/admin/history"}
              className="bg-gray-400 hover:bg-gray-500 transition px-5
                py-1 rounded-lg text-white text-lg"
            >
              ย้อนกลับ
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-1/2">
          <img
            src={`https://cdn.proboxtv.com/uploads/gennadiy_golovkin_09f01015cc.jpg`}
            alt="preview"
            className="max-w-xs h-[320px] w-[320px] object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default History;
