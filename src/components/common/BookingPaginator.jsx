/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const BookingPaginator = ({roomsPerPage, totalRooms, currentPage, paginate}) => {
    const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="Page navigation">
      <ul className="flex justify-center space-x-1 mt-4">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BookingPaginator