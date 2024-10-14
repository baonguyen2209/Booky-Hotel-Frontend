/* eslint-disable no-unused-vars */
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192"
})

export function getHeader() {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}


/**AUTH */

/*This function register a new user */
export async function registerUser(registration) {
    const response = await api.post("/auth/register", registration)
    return response.data
}

/*This function login a registered user */
export async function loginUser(loginDetails) {
    const response = await api.post("/auth/login", loginDetails)
    return response.data
}



/**USERS */


/*  This is  to get the user profile */
export async function getAllUsers() {
    const response = await api.get("/users/all", {
        headers: getHeader()
    })
    return response.data
}

export async function getUserProfile() {
    const response = await api.get("/users/get-logged-in-profile-info", {
        headers: getHeader()
    })
    return response.data
}

/* This is the  to get a single user */
export async function getUser(userId) {
    const response = await api.get(`/users/get-by-id/${userId}`, {
        headers: getHeader()
    })
    return response.data
}

/* This is the  to get user bookings by the user id */
export async function getUserBookings(userId) {
    const response = await api.get(`/users/get-user-bookings/${userId}`, {
        headers: getHeader()
    })
    return response.data
}


/* This is to delete a user */
export async function deleteUser(userId) {
    const response = await api.delete(`/users/delete/${userId}`, {
        headers: getHeader()
    })
    return response.data
}


/**ROOM */


/* This function adds a new room to the database */
export async function addRoom(formData) {
    const response = await api.post("/rooms/add", formData, {
        headers: {
            ...getHeader(),
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

/* This function gets all room types from database */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types")
    }
    
}

/* This function gets all rooms from database */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

/* This  gets all availavle rooms */
export async function getAllAvailableRooms() {
    const result = await api.get("/rooms/all-available-rooms")
    return result.data
}

/* This  gets all availavle by dates rooms from the database with a given date and a room type */
export async function getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
    &checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result.data
}

/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
    const result = await api.get(`/rooms/room-by-id/${roomId}`)
    return result.data
}

/* This function deletes a room by the id */
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/${roomId}`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room & ${error.message}`)     
    }
}

/* This function updates a room by the id */
export async function updateRoom(roomId, formData) {
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers: {
            ...getHeader(),
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}




/**BOOKING */


/* This function saves a new booking to the database */
export async function bookRoom(roomId, userId, booking) {
    console.log("USER ID IS: " + userId)

    const response = await api.post(`/bookings/book-room/${roomId}/${userId}`, booking, {
        headers: getHeader()
    })
    return response.data
}


/* This function gets all bookings from the database */
export async function getAllBookings() {
    const result = await api.get("/bookings/all", {
        headers: getHeader()
    })
    return result.data
}

/* This function gets booking by the confirmation code */
export async function getBookingByConfirmationCode(bookingCode) {
    const result = await api.get(`/bookings/get-by-confirmation-code/${bookingCode}`)
    return result.data
}

/* This function cancels booking */
export async function cancelBooking(bookingId) {
    const result = await api.delete(`/bookings/cancel/${bookingId}`, {
        headers: getHeader()
    })
    return result.data
}


/**AUTHENTICATION CHECKER */
export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
}

export function isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
}

export function isAdmin() {
    const role = localStorage.getItem('role')
    return role === 'ADMIN'
}

export function isUser() {
    const role = localStorage.getItem('role')
    return role === 'USER'
}