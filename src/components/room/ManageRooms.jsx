/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import RoomPaginator from '../common/RoomPaginator'
import RoomFilter from '../common/RoomFilter'
import { deleteRoom, getAllRooms } from '../utils/ApiFunction'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const ManageRooms = () => {

    const navigate = useNavigate();
    const[rooms, setRooms] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType, setSetectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchRooms = async() => {
        setIsLoading(true)
        try {
            const result = await getAllRooms()
            const allRooms = result.roomList;
            setRooms(allRooms)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms)
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async(roomId) => {
      if (window.confirm('Do you want to delete this room?')) {
        try {
            const result = await deleteRoom(roomId);
            if (result.statusCode === 200) {
                setSuccessMessage('Room Deleted successfully.');
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(''), 5000);
        }
    }
    }

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)

    return (
      <>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container mx-auto">
            <div>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                {isLoading ? (
                  <p>Loading Manage Rooms</p>
                ) : (
                  <section className="mt-5 mb-5 container mx-auto">
                    <div className="flex justify-center justify-between mb-3 mt-5">
                      <h2 className="text-2xl font-bold">Manage Rooms</h2>
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

                    <div className='flex justify-center justify-between'>
                      <div className="mb-3 md:mb-0 md:w-1/2">
                        <RoomFilter
                          data={rooms}
                          setFilteredData={setFilteredRooms}
                        />
                      </div>

                      <Link to={"/admin/add-room"} className="flex items-center space-x-2 text-blue-800">
                        <FaPlus/> Add Room 
                      </Link>
                    </div>  

                    <table className="min-w-full border border-gray-300">
                      <thead>
                        <tr className="bg-gray-200 text-center">
                          <th className="border border-gray-300 px-4 py-2">
                            ID
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Room Title
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Room Type
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Room Price
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Capacity
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Room Size
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Description
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentRooms.map((room) => (
                          <tr key={room.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                              {room.id}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.roomTitle}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.roomType}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.roomPrice}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.capacity}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.roomSize}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {room.description}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex gap-2 px-4 py-2">
                                <Link
                                  to={`/admin/edit-room/${room.id}`}
                                  className="flex items-center gap-2"
                                >
                                  <span className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                                    <FaEye />
                                  </span>
                                  <span className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
                                    <FaEdit />
                                  </span>
                                </Link>
                                <button
                                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                  onClick={() => handleDelete(room.id)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <RoomPaginator
                      currentPage={currentPage}
                      totalPages={calculateTotalPages(
                        filteredRooms,
                        roomsPerPage,
                        rooms
                      )}
                      onPageChange={handlePaginationClick}
                    />
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ManageRooms