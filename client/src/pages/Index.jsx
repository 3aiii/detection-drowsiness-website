import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">หน้าหลัก</h1>
      <p className="text-gray-600 mb-6">
        ระบบตรวจจับอาการง่วงนอนผ่านกล้องและ AI
        แจ้งเตือนเมื่อผู้ขับขี่มีความเสี่ยง
      </p>

      <div>
        <h2 className="text-xl font-semibold text-[#1296BF] mb-2">
          กล้องตรวจจับใบหน้า
        </h2>
        <p className="text-gray-700 mb-4">
          ระบบจะทำงานโดยใช้กล้องตรวจจับลักษณะใบหน้า เช่น การหาว การหลับตา
          เพื่อประเมินความง่วงของผู้ขับขี่
        </p>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-700">เสียงแจ้งเตือนปัจจุบัน:</span>
          <span className="font-semibold text-[#1296BF]">Ring Ring</span>
        </div>

        <div className="flex gap-4">
          <button className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg transition">
            เริ่มตรวจจับ
          </button>
          <Link to={"/system"} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition">
            เปลี่ยนเสียงแจ้งเตือน
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
