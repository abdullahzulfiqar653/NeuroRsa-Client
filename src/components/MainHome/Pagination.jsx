import React from "react";

const Pagination = ({
  data,
  currentPage,
  totalPages,
  setCurrentPage,
  itemPerPage,
  setItemPerPage,
}) => {
  return (
    <div className="flex justify-between bg-[#0f2e3f] items-center space-x-4 mt-[64px] mb-[64px]">
      <div className="flex items-center space-x-2">
        <button
          disabled={data?.previous === null}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-teal-500 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={data?.next === null}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-[#0B2837] text-white rounded-md hover:bg-[#1B3D4F]"
        >
          Next →
        </button>
      </div>

      <div className="flex items-center space-x-2 text-white">
        <label htmlFor="per-page" className="text-sm">
          Per page:
        </label>
        <select
          value={itemPerPage}
          onChange={(e) => setItemPerPage(e.target.value)}
          id="per-page"
          className="px-2 py-1  bg-[#0B2837] text-white rounded-md hover:bg-gray-600 border-none focus:ring focus:ring-teal-500 input-field"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
