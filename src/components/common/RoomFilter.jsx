/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => {
    const[filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        const filteredRooms = data.filter((room) => 
            room.roomType.toLowerCase()
            .includes(selectedRoomType.toLowerCase()))
        setFilteredData(filteredRooms)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))]
    
    return (
      <div className="mb-4 flex items-center">
        <span className="mr-2 text-gray-700" id="room-type-filter">
          Filter rooms by type
        </span>
        <select
          className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="room type filter"
          value={filter}
          onChange={handleSelectChange}
        >
          <option value="">Select a room type to filter...</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={String(type)}>
              {String(type)}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="button"
          onClick={clearFilter}
        >
          Clear Filter
        </button>
      </div>
    )
}

export default RoomFilter