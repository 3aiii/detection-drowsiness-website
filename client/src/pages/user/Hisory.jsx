import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetch } from '../../apis/systemApi'
import { formatDate } from '../../utils/sweetProp'
import { IMAGE_URL } from '../../confidential'

const HisoryUser = () => {
    const { id } = useParams()
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await fetch(id)
            setHistory(data?.data)
        }

        fetchHistory()
    }, [])

    return (
        <div className="px-6 py-8 mx-auto">
            <h1 className="text-3xl font-semibold text-[#1296BF] mb-1">
                ประวัติการใช้งาน / รายละเอียด / {history?.firstname} {history?.lastname}
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
                                <td className="px-4 py-3 font-medium">จำนวนการกระพิบตา</td>
                                <td className="px-4 py-3">{history?.blinks}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 font-medium">จำนวนการหาว</td>
                                <td className="px-4 py-3"> {history?.yawns}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 font-medium">สถานะผลการตรวจจับ </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full
                  ${history?.status === "Alert"
                                                ? "text-red-700 bg-red-100"
                                                : "text-green-700 bg-green-100"
                                            }`}
                                    >
                                        {history?.status === "Alert" ? `แจ้งเตือน` : `ไม่มีการแจ้งเตือน`}
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 font-medium">ระยะเวลาในการหลับตา</td>
                                <td className="px-4 py-3">{history?.microsleeps}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 font-medium">ระยะเวลาในการหาว</td>
                                <td className="px-4 py-3"> {history?.yawn_duration}</td>
                            </tr>
                            <tr className="border-t">
                                <td className="px-4 py-3 font-medium">ตรวจจับเวลา</td>
                                <td className="px-4 py-3"> {formatDate(history?.detection_time)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <Link
                            to={"/system"}
                            className="bg-gray-400 hover:bg-gray-500 transition px-5
                  py-1 rounded-lg text-white text-lg"
                        >
                            ย้อนกลับ
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-1/2">
                    {
                        history?.image !== null ? (
                            <img
                                src={`${IMAGE_URL}/${history?.image}`}
                                alt="preview"
                                className="max-w-xs h-[320px] w-[320px] object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex items-center justify-center px-4 py-2 text-[#1296BF] 
                            rounded-lg border-dashed border-2 border-[#1296BF] transition duration-200 w-[320px] h-[320px]"
                            >
                                ไม่มีรูปภาพ
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default HisoryUser