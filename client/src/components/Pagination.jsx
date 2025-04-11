import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex shadow-sm rounded-md overflow-hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium border ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
          }`}
        >
          ก่อนหน้า
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-sm font-medium border border-l-0 ${
              currentPage === page
                ? "bg-[#1296BF] text-white"
                : "text-[#1296BF] hover:bg-[#e6f7fd] border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium border border-l-0 ${
            currentPage === totalPages
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