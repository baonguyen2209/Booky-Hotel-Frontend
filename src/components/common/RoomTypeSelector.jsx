/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunction"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypeInput, setShowNewRoomTypesInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data)
    })
  }, [])

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType])
      setNewRoomType("")
      setShowNewRoomTypesInput(false)
    }
  }

  return (
    <>
      
        {roomTypes.length > 0 && (
            <div>
                <select
                    name="roomType"
                    id="roomType"
                    className="h-10 border mt-1 mb-2 rounded px-4 w-full bg-gray-50"
                    value={newRoom.roomType}
                    onChange={(e) => {
                    if (e.target.value === "Add New") {
                        setShowNewRoomTypesInput(true)
                    } else {
                        handleRoomInputChange(e)
                    }
                    }}
                >
                    <option value={""}>Select a room type</option>
                    <option value={"Add New"}>Add New</option>
                    {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                    ))}
                </select>
                {showNewRoomTypeInput && (
                    <div>
                        <input 
                          className="h-10 border mt-1 mb-2 rounded px-4 w-full bg-gray-50"
                          type="text" 
                          placeholder="Enter a new room type"
                          onChange={handleNewRoomTypeInputChange}
                        />

                        <button 
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                          type="button"
                          onClick={handleAddNewRoomType}>
                            Add
                        </button>
                    </div>
                )}
          </div>
        )}
      
    </>
  )
}

export default RoomTypeSelector;
