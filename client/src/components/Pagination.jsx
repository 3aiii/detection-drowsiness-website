import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxShownPages = 5;
    const half = Math.floor(maxShownPages / 2);

    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 2) {
      start = 2;
      end = Math.min(totalPages - 1, maxShownPages);
    }

    if (currentPage >= totalPages - half - 1) {
      start = Math.max(2, totalPages - maxShownPages + 1);
      end = totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const middlePages = generatePageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex shadow-sm rounded-md overflow-hidden">
        {/* ก่อนหน้า */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium border ${currentPage === 1
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
            }`}
        >
          ก่อนหน้า
        </button>

        {/* หน้าแรก */}
        <button
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 text-sm font-medium border border-l-0 ${currentPage === 1
            ? "bg-[#1296BF] text-white"
            : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
            }`}
        >
          1
        </button>

        {/* จุดไข่ปลา ด้านซ้าย */}
        {middlePages[0] > 2 && (
          <span className="px-2 py-2 text-sm font-medium border border-l-0 text-gray-400 bg-white select-none">
            ...
          </span>
        )}

        {/* หน้าอื่น ๆ ตรงกลาง */}
        {middlePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-sm font-medium border border-l-0 ${currentPage === page
              ? "bg-[#1296BF] text-white"
              : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
              }`}
          >
            {page}
          </button>
        ))}

        {/* จุดไข่ปลา ด้านขวา */}
        {middlePages[middlePages.length - 1] < totalPages - 1 && (
          <span className="px-2 py-2 text-sm font-medium border border-l-0 text-gray-400 bg-white select-none">
            ...
          </span>
        )}

        {/* หน้าสุดท้าย */}
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-4 py-2 text-sm font-medium border border-l-0 ${currentPage === totalPages
              ? "bg-[#1296BF] text-white"
              : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
              }`}
          >
            {totalPages}
          </button>
        )}

        {/* ถัดไป */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium border border-l-0 ${currentPage === totalPages
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
            }`}
        >
          ถัดไป
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
