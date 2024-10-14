import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Alert, AlertTitle } from "../ui/alert";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  cancelBooking,
  getUserBookings,
  getUserProfile,
} from "../utils/ApiFunction";
import { format } from "date-fns";
import { FaInfoCircle } from "react-icons/fa";

export default function MyBooking() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null); // Track any errors

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        // Fetch user bookings using the fetched user ID
        const userPlusBookings = await getUserBookings(response.user.userId);
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId);
      if (response.statusCode === 200) {
        setSuccessMessage("The booking was successfully canceled");

        const userPlusBookings = await getUserBookings(user.userId);
        setUser(userPlusBookings.user);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          My bookings
        </h3>
        <div className="flex flex-col gap-8 h-full">
          {/* error message */}
          {error && (
            <Alert className="rounded-none bg-red-500 text-white w-1/2 mx-auto flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="text-xl w-[44px] h-[44px] flex justify-center items-center">
                  <FaInfoCircle />
                </div>
                <AlertTitle className="text-white">{error}</AlertTitle>
              </div>
            </Alert>
          )}

          {/* success message */}
          {success && (
            <Alert className="rounded-none bg-green-500 text-white w-1/2 mx-auto flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="text-xl w-[44px] h-[44px] flex justify-center items-center">
                  <FaInfoCircle />
                </div>
                <AlertTitle className="text-white">{success}</AlertTitle>
              </div>
            </Alert>
          )}

          {/* have bookings */}
          {user && user.bookedRooms.length > 0 ? (
            user.bookedRooms.map((booking) => (
              <div key={booking.id} className="bg-tertiary py-8 px-12">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                    {booking.room.roomTitle}
                  </h3>
                  {/* check in & check out text */}
                  <div className="flex flex-col lg:flex-row gap-2 lg:w-[380px]">
                    {/* check in */}
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-accent font-bold uppercase tracking-[2px]">
                        from:
                      </span>
                      <span className="text-secondary font-semibold">
                        {format(booking.checkInDate, "MMM do, yyyy")}
                      </span>
                    </div>

                    {/* check out */}
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-accent font-bold uppercase tracking-[2px]">
                        to:
                      </span>
                      <span className="text-secondary font-semibold">
                        {format(booking.checkOutDate, "MMM do, yyyy")}
                      </span>
                    </div>
                  </div>
                  {/* cancel reservation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="md">Cancel Reservation</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      {/* dialog header */}
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      {/* dialog footer */}
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            /* don't have any bookings */
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-xl text-center text-secondary/70 mb-4">
                You don&apos;t have any reservation.
              </p>

              <Link to="/">
                <Button size="md">Go to homepage</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
