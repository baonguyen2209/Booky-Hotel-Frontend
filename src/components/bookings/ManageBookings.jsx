/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunction";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BookingPaginator from "../common/BookingPaginator";

const ManageBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoomType, setSetectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const result = await getAllBookings();
      const allBookings = result.bookingList;
      setBookings(allBookings);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    filterBookings(searchTerm);
  }, [searchTerm, bookings]);

  const filterBookings = (term) => {
    if (term === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) =>
          booking.bookingConfirmationCode &&
          booking.bookingConfirmationCode
            .toLowerCase()
            .includes(term.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const indexOfLastBookings = currentPage * bookingsPerPage;
  const indexOfFirstBookings = indexOfLastBookings - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBookings,
    indexOfLastBookings
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return; // Do nothing if the user cancels
    }
    try {
      const response = await cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was successfully canceled");
        const result = await getAllBookings();
        const allBookings = result.bookingList;
        setBookings(allBookings);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              {isLoading ? (
                <p>Loading Manage Bookings</p>
              ) : (
                <section className="mt-5 mb-5 container mx-auto">
                  <div className="flex justify-center justify-between mb-3 mt-5">
                    <h2 className="text-2xl font-bold">Manage Bookings</h2>
                  </div>

                  <div className="container mx-auto md:w-2/3 lg:w-1/2">
                    {successMessage && (
                      <p className="bg-green-100 text-green-800 rounded p-4 mt-5 mb-3">
                        {successMessage}
                      </p>
                    )}

                    {errorMessage && (
                      <p className="bg-red-100 text-red-800 rounded p-4 mt-5 mb-3">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center justify-between">
                    <div className="space-y-2 mb-4">
                      <label className="text-base font-bold text-gray-700 mr-3 text-bold-700">
                        Filter by Booking Number:
                      </label>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Enter booking number"
                        className="px-4 py-1 border border-gray-300 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200 text-center">
                        <th className="border border-gray-300 px-4 py-2">
                          Booking Code
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Check In Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Check Out Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Total Guests
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking.id} className="text-center">
                          <td className="border border-gray-300 px-4 py-2">
                            {booking.bookingConfirmationCode}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {booking.checkInDate}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {booking.checkOutDate}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {booking.totalNumOfGuest}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <BookingPaginator
                    roomsPerPage={bookingsPerPage}
                    totalRooms={filteredBookings.length}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBookings;
