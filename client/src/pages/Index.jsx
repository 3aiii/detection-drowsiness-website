import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

const Index = () => {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("ยังไม่เริ่ม");

  const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user",
  };

  const captureAndSend = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      try {
        setStatus("กำลังวิเคราะห์...");

        // const response = await axios.post("http://localhost:5000/predict", {
        //   image: imageSrc,
        // });

        // setStatus(response.data.result); // หรือ result อื่นๆ ตาม response จาก Flask
      } catch (error) {
        console.error("Error sending image:", error);
        setStatus("เกิดข้อผิดพลาด");
      }
    }
  };

  return (
    <div className="px-6 py-8 mx-auto">
      <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">หน้าหลัก</h1>
      <p className="text-gray-600 mb-6">
        ระบบตรวจจับอาการง่วงนอนผ่านกล้องและ AI
        แจ้งเตือนเมื่อผู้ขับขี่มีความเสี่ยง
      </p>

      <h2 className="text-xl font-semibold text-[#1296BF] mb-2">
        กล้องตรวจจับใบหน้า
      </h2>

      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
        className="rounded-xl mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={captureAndSend}
          className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg transition"
        >
          ส่งภาพไปวิเคราะห์
        </button>

        <Link
          to={"/system"}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          เปลี่ยนเสียงแจ้งเตือน
        </Link>
      </div>

      <p className="mt-4 text-gray-800 text-lg">
        สถานะ: <span className="font-semibold">{status}</span>
      </p>
    </div>
  );
};

export default Index;
