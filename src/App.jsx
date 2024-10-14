import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import RoomDetails from "./components/details/RoomDetails"
import MyBooking from "./components/bookings/MyBooking"
import AddRoom from "./components/room/AddRoom"
import ManageRooms from "./components/room/ManageRooms"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import EditRoom from "./components/room/EditRoom"
import Home from "./components/home/Home"
import LoginUser from "./components/auth/LoginUser"
import RegisterUser from "./components/auth/RegisterUser"
import { AdminRoute, ProtectedRoute } from "./components/utils/guard"
import Rooms from "./components/room/Rooms"
import AdminPage from "./components/admin/AdminPage"
import ManageBookings from "./components/bookings/ManageBookings"


function App() {

  return (
    <main>

      <BrowserRouter>
        <Header/>
          <Routes>
            {/* Public Routes */}
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<LoginUser/>}/>
            <Route path="/register" element={<RegisterUser/>}/>    
            <Route path="/rooms" element={<Rooms/>}/>

            {/* Protected Routes */}
            <Route path="/room-details-book/:roomId"
              element={<ProtectedRoute element={<RoomDetails />} />}
            />
            <Route path="/my-booking"
              element={<ProtectedRoute element={<MyBooking />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin"
              element={<AdminRoute element={<AdminPage />} />}
            />
            <Route path="/admin/edit-room/:roomId"
              element={<AdminRoute element={<EditRoom />} />}
            />
            <Route path="/admin/manage-rooms"
              element={<AdminRoute element={<ManageRooms />} />}
            />
            <Route path="/admin/add-room"
              element={<AdminRoute element={<AddRoom />} />}
            />
            <Route path="/admin/manage-bookings"
              element={<AdminRoute element={<ManageBookings />} />}
            />

             {/* Fallback Route */}
             <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer/>
      </BrowserRouter>

    </main>
  )
}

export default App
