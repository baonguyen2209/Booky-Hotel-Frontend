/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunction';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditRoom = () => {

  const navigate = useNavigate();
    const [room, setRoom] = useState({
      photo: "",
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

    const {roomId} = useParams()

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0]
      setRoom({ ...room, photo: selectedImage })
      setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setRoom({ ...room, [name]: value })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const formData = new FormData()
        formData.append('photo', room.photo)
        formData.append('roomType', room.roomType)
        formData.append('roomPrice', room.roomPrice)
        formData.append('roomTitle', room.roomTitle)
        formData.append('capacity', room.capacity)
        formData.append('roomSize', room.roomSize)
        formData.append('description', room.description)
        const response = await updateRoom(roomId, formData)
        if (response.status === 200 ) {
            setSuccessMessage("Room updated successfully!")
            const updatedRoomData = await getRoomById(roomId)
            setRoom(updatedRoomData)
            setImagePreview(updatedRoomData.photo)
            setErrorMessage("")
            setTimeout(() => {
              setSuccessMessage('');
              navigate('/admin/manage-rooms');
          }, 3000);
        } else {
            setErrorMessage("Error updating room")
        }
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <h3 className="font-medium text-lg">Edit Room</h3>
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
                        value={room.roomTitle}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="roomType">Room Type</label>
                      <input
                        type="text"
                        name="roomType"
                        id="roomType"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={room.roomType}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="roomPrice">Room Price</label>
                      <input
                        type="number"
                        name="roomPrice"
                        id="roomPrice"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={room.roomPrice}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="capacity">Capacity</label>
                      <input
                        type="number"
                        name="capacity"
                        id="capacity"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={room.capacity}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="roomSize">Room Size</label>
                      <input
                        type="number"
                        name="roomSize"
                        id="roomSize"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={room.roomSize}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        rows="4"
                        className="border mt-1 rounded px-4 w-full bg-gray-50"
                        value={room.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="photo">Photo</label>
                      <input
                        required
                        type="file"
                        name="photo"
                        id="photo"
                        className="border mt-1 rounded w-full bg-gray-50 mb-2"
                        onChange={handleImageChange}
                      />
                      {imagePreview && (
                        <img
                          src={`data:image/jpeg;base64,${imagePreview}`}
                          alt="Preview Room Photo"
                          style={{ maxWidth: "400px", maxHeight: "400px" }}
                          className="mb-3"
                        />
                      )}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end gap-2">
                        <Link to={"/admin/manage-rooms"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            back
                        </Link>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit room
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
    )
}

export default EditRoom