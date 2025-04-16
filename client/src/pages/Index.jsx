import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";
import { detection } from "../apis/systemApi";
import { FLASK_APP } from "../confidential";
import { verify } from "../apis/authApi";

const Index = () => {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("ยังไม่เริ่ม");
  const [cameraOn, setCameraOn] = useState(false);
  const [user, setUser] = useState()

  const [result, setResult] = useState({
    yawn: '-',
    face_detected: false,
    blinks: 0,
    microsleeps: 0,
    yawns: 0,
    yawn_duration: 0,
    alert_text: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (cameraOn) {
        captureAndSendFrame();
      }
    }, 300);
    return () => clearInterval(interval);
  }, [cameraOn]);
  useEffect(() => {
    if (
      result.alert_text?.toLowerCase().includes("prolonged") ||
      result.alert_text?.toLowerCase().includes("microsleep")
    ) {
      const alertAudio = new Audio(`/sounds/${user?.sound}`);
      alertAudio.play().catch((err) => {
        console.warn("ไม่สามารถเล่นเสียงได้:", err);
      });
    }
  }, [result.alert_text]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await verify()
      setUser(data?.user)
    }

    fetchUser()
  }, [])

  const captureAndSendFrame = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const response = await detection(imageSrc, user?.user_id);
        setResult(response.data);
        setStatus(response.data.alert_text || "กำลังตรวจจับ...");
      } catch (error) {
        console.error("Error calling detection API:", error);
      }
    }
  };

  const toggleCamera = async () => {
    if (cameraOn) {
      try {
        await fetch(`${FLASK_APP}/reset`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        setResult({
          yawn: '-',
          face_detected: false,
          blinks: 0,
          microsleeps: 0,
          yawns: 0,
          yawn_duration: 0,
          alert_text: '',
        });
        setStatus("ยังไม่เริ่ม");
      } catch (error) {
        console.error("Reset error:", error);
      }
    } else {
      setStatus("กำลังตรวจจับ...");
    }
    setCameraOn((prev) => !prev);
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1296BF] mb-2">หน้าหลัก</h1>
      <p className="text-gray-600 mb-8">
        ระบบตรวจจับอาการง่วงนอนผ่านกล้องและ AI แจ้งเตือนเมื่อผู้ขับขี่มีความเสี่ยง
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* กล้อง */}
        <div className="bg-white p-4">
          {cameraOn ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              className={`rounded-xl w-full h-auto border-[4px] ${result?.alert_text?.toLowerCase().includes("prolonged") ||
                result?.alert_text?.toLowerCase().includes("microsleep")
                ? "border-red-600 animate-pulse"
                : result?.face_detected
                  ? "border-[#4CAF50]"
                  : "border-red-500"
                }`}
              videoConstraints={{ facingMode: "user" }}
            />
          ) : (
            <div className="w-full h-[360px] bg-gray-200 flex items-center justify-center rounded-xl border-4 border-gray-400">
              <p className="text-gray-600 text-lg">กล้องถูกปิด</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={toggleCamera}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              {cameraOn ? "ปิดกล้อง" : "เปิดกล้อง"}
            </button>

            <Link
              to={"/system"}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-lg font-semibold transition"
            >
              เปลี่ยนเสียงแจ้งเตือน
            </Link>
          </div>
        </div>

        {/* ผลลัพธ์ */}
        <div className="bg-white p-6">
          <p className="text-xl font-semibold text-[#1296BF] mb-4">ผลการตรวจจับ</p>
          <ul className="space-y-2 text-gray-700 text-base leading-relaxed">
            <li>😮 <strong>หาว:</strong> {result.yawn}</li>
            <li>🧍 <strong>ตรวจพบใบหน้า:</strong> {result.face_detected ? "✅ ใช่" : "❌ ไม่พบ"}</li>
            <li>👁‍🗨 <strong>จำนวนครั้งกระพริบตา:</strong> {result.blinks}</li>
            <li>😴 <strong>Microsleeps:</strong> {result.microsleeps}</li>
            <li>😮‍💨 <strong>จำนวนครั้งหาว:</strong> {result.yawns}</li>
            <li>⏱ <strong>ระยะเวลาการหาว:</strong> {result.yawn_duration} วินาที</li>
          </ul>

          <p className="mt-6 text-lg text-red-600 font-semibold border-t pt-4">
            🔔 สถานะ: {status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
