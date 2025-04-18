import React, { useEffect, useRef, useState } from "react";
import { changeSoundAPI } from "../../apis/userApi";
import { verify } from "../../apis/authApi";
import { findById } from "../../apis/systemApi";
import Pagination from "../../components/Pagination";

const System = () => {
  const sounds = [
    { name: "Alert Detect", file: "/sounds/alert-detect_02.mp3", file_path: "alert-detect_02.mp3" },
    { name: "High Hat", file: "/sounds/high_hat.wav", file_path: "high_hat.wav" },
    { name: "Eas Endtone", file: "/sounds/eas-endtone_04.mp3", file_path: "eas-endtone_04.mp3" },
    { name: "Warning Alerm", file: "/sounds/severe-warningalarm_03.mp3", file_path: "severe-warningalarm_03.mp3" },
  ];

  const audioRef = useRef(null);
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [userHistory, setUserHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const startIndex = (currentPage - 1) * itemsPerPage;

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
    const fetchAll = async () => {
      try {
        const { data } = await verify();
        const userData = data?.user;
        setUser(userData);

        if (userData?.sound) {
          const foundIndex = sounds.findIndex(sound => sound.file_path === userData.sound);
          if (foundIndex !== -1) {
            setCurrentSoundIndex(foundIndex);
          }
        }

        if (userData?.user_id) {
          const { data: historyData } = await findById(userData?.user_id, currentPage, itemsPerPage);
          setUserHistory(historyData);
        }
      } catch (error) {
        console.error("Error loading user or history:", error);
      }
    };

    fetchAll();
  }, [currentPage]);


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
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b">ลำดับ</th>
                <th className="px-4 py-2 border-b">วันที่</th>
                <th className="px-4 py-2 border-b">เวลา</th>
                <th className="px-4 py-2 border-b">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {userHistory?.message === "Can't find your history used"
                ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      ไม่พบประวัติการใช้งาน
                    </td>
                  </tr>
                ) : (
                  userHistory?.result?.map((userHis, index) => {
                    const detectionDate = new Date(userHis.detection_time);
                    const dateStr = detectionDate.toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });

                    const timeStr = detectionDate.toLocaleTimeString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    const statusColor =
                      userHis.status === "Non-Alert" ? "text-green-600" : "text-red-500";

                    return (
                      <tr className="hover:bg-gray-50" key={index}>
                        <td className="text-center py-4 border-b">{startIndex + index + 1}</td>
                        <td className="px-4 py-2 border-b text-center">{dateStr}</td>
                        <td className="px-4 py-2 border-b text-center">{timeStr}</td>
                        <td className={`px-4 py-2 text-center border-b font-medium ${statusColor}`}>
                          {userHis.status === "Non-Alert" ? "ไม่แจ้งเตือน" : "แจ้งเตือน"}
                        </td>
                      </tr>
                    );
                  })
                )}
            </tbody>
          </table>

          <Pagination
            currentPage={userHistory?.currentPage}
            totalPages={userHistory?.totalPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default System;
