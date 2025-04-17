import React, { useEffect, useRef, useState } from "react";
import { changeSoundAPI } from "../../apis/userApi";
import { verify } from "../../apis/authApi";

const System = () => {
  const sounds = [
    { name: "Alert Detect", file: "/sounds/alert-detect_02.mp3", file_path: "alert-detect_02.mp3" },
    { name: "High Hat", file: "/sounds/high_hat.wav", file_path: "high_hat.wav" },
    { name: "Eas Endtone", file: "/sounds/eas-endtone_04.mp3", file_path: "eas-endtone_04.mp3" },
    { name: "Warning Alerm", file: "/sounds/severe-warningalarm_03.mp3", file_path: "severe-warningalarm_03.mp3" },
  ];

  const audioRef = useRef(null);
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [user, setUser] = useState([])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.src = sounds[currentSoundIndex].file;
      audioRef.current.play();
    }
  };

  const changeSound = async () => {
    const newIndex = (currentSoundIndex + 1) % sounds.length;
    const selectedSound = sounds[newIndex];

    setCurrentSoundIndex(newIndex);

    try {
      await changeSoundAPI({ sound: selectedSound.file_path }, user?.user_id);

      setUser(prev => ({
        ...prev,
        sound: selectedSound.file_path,
      }));
    } catch (err) {
      console.error("Failed to update sound:", err.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await verify();
      const userData = data?.user;

      setUser(userData);

      if (userData?.sound) {
        const foundIndex = sounds.findIndex(sound => sound.file_path === userData.sound);
        if (foundIndex !== -1) {
          setCurrentSoundIndex(foundIndex);
        }
      }
    };

    fetchUser();
  }, []);


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

          <div className="bg-white rounded-xl mb-8 p-4 px-0">
            <h2 className="text-xl font-medium">เสียงแจ้งเตือน</h2>
            <p className="text-gray-700 mb-2">
              เสียงแจ้งเตือนปัจจุบัน :{" "}
              <span className="font-semibold text-[#1296BF]">
                {user?.sound}
              </span>
            </p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={playSound}
                className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg shadow transition duration-200"
              >
                ▶️ เล่นตัวอย่าง
              </button>
              <button
                onClick={changeSound}
                className="bg-[#1296BF] hover:bg-[#0f7fa3] text-white px-4 py-2 rounded-lg shadow transition duration-200"
              >
                🔄 เปลี่ยนเสียง
              </button>
            </div>
            <audio ref={audioRef} hidden />
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
