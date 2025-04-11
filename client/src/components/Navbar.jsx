import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full py-2 px-8 sticky top-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl mr-12 cursor-default font-semibold text-[#1296BF]">
            Detection Drowsiness
          </h1>
        </div>
        <div className="flex items-center gap-4 text-gray-700 font-medium">
          <div className="flex items-center gap-2 bg-[#f0f9ff] p-2 rounded-lg shadow-sm">
            <p className="text-gray-700 text-lg font-semibold">
              ยินดีต้อนรับ ,
            </p>
            <span className="text-[#1296BF] text-lg font-bold">
              Sirapat Wongphatsawek
            </span>
          </div>
          <img
            src="https://placehold.co/50x50"
            className="rounded-full w-[50px] h-[50px]"
          />
          <button className="bg-red-500 text-lg hover:bg-red-600 transition text-white px-4 py-2 rounded-md shadow-sm">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
