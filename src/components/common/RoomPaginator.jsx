/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i + 1)
  return (
    <nav aria-label="Page navigation">
      <ul className="flex justify-center space-x-1 mt-4">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`px-4 py-2 border rounded ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default RoomPaginator