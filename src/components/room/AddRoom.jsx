/* eslint-disable no-unused-vars */

import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunction"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link, useNavigate } from "react-router-dom"


const AddRoom = () => {
  const navigate = useNavigate();
	const [newRoom, setNewRoom] = useState({
		photo: null,
		roomType: "",
		roomPrice: "",
    roomTitle: "",
    capacity: "",
    roomSize: "",
    description: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleRoomInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "roomPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewRoom({ ...newRoom, [name]: value })
	}
  const handleRoomDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom({ ...newRoom, [name]: value });
  };

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const formData = new FormData()
      formData.append('photo', newRoom.photo)
      formData.append('roomType', newRoom.roomType)
      formData.append('roomPrice', newRoom.roomPrice)
      formData.append('roomTitle', newRoom.roomTitle)
      formData.append('capacity', newRoom.capacity)
      formData.append('roomSize', newRoom.roomSize)
      formData.append('description', newRoom.description)
      const result = await addRoom(formData)
			if (result.statusCode === 200) {
				setSuccessMessage("A new room was added successfully !")
				setImagePreview("")
				setErrorMessage("")
        setTimeout(() => {
          setSuccessMessage("");
          navigate('/admin/manage-rooms');
      }, 3000)
			} else {
				setErrorMessage("Error adding new room")
			}
		} catch (error) {
			setErrorMessage(error.response?.data?.message || error.message)
      setTimeout(() => setErrorMessage(""), 5000);
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <h3 className="font-medium text-lg">Add a New Room</h3>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  {successMessage && (
                    <div
                      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <span className="font-medium"> {successMessage} </span>
                    </div>
                  )}

                  {errorMessage && (
                    <div
                      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <span className="font-medium"> {errorMessage} </span>
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
                  >
                    <div className="md:col-span-5">
                      <label htmlFor="roomTitle">Room Title</label>
                      <input
                        type="text"
                        name="roomTitle"
                        id="roomTitle"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={newRoom.roomTitle}
                        onChange={handleRoomDetailsInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="roomType">Room Type</label>
                      <div>
                        <RoomTypeSelector
                          handleRoomInputChange={handleRoomInputChange}
                          newRoom={newRoom}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="roomPrice">Room Price</label>
                      <input
                        type="number"
                        name="roomPrice"
                        id="roomPrice"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={newRoom.roomPrice}
                        onChange={handleRoomInputChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="capacity">Capacity</label>
                      <input
                        type="number"
                        name="capacity"
                        id="capacity"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={newRoom.capacity}
                        onChange={handleRoomInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="roomSize">Room Size</label>
                      <input
                        type="number"
                        name="roomSize"
                        id="roomSize"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={newRoom.roomSize}
                        onChange={handleRoomInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="4"
                        className="border mt-1 rounded px-4 w-full bg-gray-50"
                        value={newRoom.description}
                        onChange={handleRoomDetailsInputChange}
                      ></textarea>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="photo">Photo</label>
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        className="border mt-1 rounded w-full bg-gray-50"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview Room Photo"
                          style={{ maxWidth: "400px", maxHeight: "400px" }}
                          className="mb-3"
                        />
                      )}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end gap-2">
                        <Link to={"/admin/manage-rooms"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Back
                        </Link>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Save room
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRoom
