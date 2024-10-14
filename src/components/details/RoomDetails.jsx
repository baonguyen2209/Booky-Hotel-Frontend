/* eslint-disable no-unused-vars */
import { TbArrowsMaximize, TbUsers } from "react-icons/tb";
import { useEffect, useState } from "react";
import { bookRoom, getRoomById, getUserProfile } from "../utils/ApiFunction";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Alert, AlertTitle } from "../ui/alert";
import { FaInfoCircle } from "react-icons/fa";

export default function RoomDetails() {
  const [room, setRoom] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
    roomTitle: "",
    capacity: "",
    roomSize: "",
    description: "",
  });

  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const navigate = useNavigate(); // Access the navigate function to navigate
  const [error, setError] = useState(null); // Track any errors
  const [totalPrice, setTotalPrice] = useState(); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(""); // State variable for total number of guests
  const [userId, setUserId] = useState(""); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const [loading, setLoading] = useState(true); // Loading state for skeleton

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await getRoomById(roomId);
        setRoom(response.room);
        const userProfile = await getUserProfile();
        setUserId(userProfile.user.userId);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const acceptBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Check if number of guests are valid
    if (isNaN(totalGuests) || totalGuests < 1) {
      setErrorMessage("Please enter valid numbers for guests.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calculate total price
    const roomPricePerNight = room.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);

    try {
      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // Create booking object
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        totalNumOfGuest: totalGuests,
      };

      // Make booking
      const response = await bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        setShowMessage(true); // Show message
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
    }
  };

  if (loading) {
    // Loading skeleton component
    return (
      <section className="min-h-[80vh] animate-pulse">
        <div className="container mx-auto py-8">
          <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
            <div className="flex-1">
              <div className="relative h-[360px] lg:h-[420px] mb-8 bg-gray-300"></div>
              <div className="mb-8">
                <div className="h-6 w-1/2 bg-gray-300 mb-4"></div>
                <div className="h-6 w-1/4 bg-gray-300 mb-4"></div>
                <div className="h-6 w-full bg-gray-300 mb-4"></div>
                <div className="h-6 w-full bg-gray-300 mb-4"></div>
                <div className="h-6 w-full bg-gray-300 mb-4"></div>
              </div>
            </div>
            <div className="w-full lg:max-w-[360px] h-max">
              <div className="bg-tertiary h-[360px] mb-4 p-8">
                <div className="bg-gray-300 h-10 mb-4"></div>
                <div className="bg-gray-300 h-10 mb-4"></div>
                <div className="bg-gray-300 h-10 mb-4"></div>
                <div className="bg-gray-300 h-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
          {/* img & text */}
          <div className="flex-1">
            {/* image */}
            <div className="relative h-[360px] lg:h-[420px] mb-8">
              <img
                src={`data:image/jpeg;base64, ${room.photo}`}
                alt=""
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-1 flex-col mb-8">
              {/* title & price */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="h3">{room.roomTitle}</h3>
                <p className="h3 font-secondary font-medium text-accent">
                  ${room.roomPrice}
                  <span className="text-base text-secondary">/ night</span>
                </p>
              </div>
              {/* info */}
              <div className="flex items-center gap-8 mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-accent">
                    <TbArrowsMaximize />
                  </div>
                  <p>
                    {room.roomSize}m <sup>2</sup>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl text-accent">
                    <TbUsers />
                  </div>
                  <p>{room.capacity} Guests</p>
                </div>
              </div>

              <p>{room.description}</p>
            </div>
          </div>
          {/* reservation */}
          <div className="w-full lg:max-w-[360px] h-max">
            <div>
              <div className="bg-tertiary h-[360px] mb-4">
                {/* top */}
                <div className="bg-accent py-4 text-center relative mb-2">
                  <h4 className="text-xl text-white">Book your room</h4>
                  {/* triangle */}
                  <div
                    className="absolute -bottom-[8px] 
                left-[calc(50%_-_10px)] w-0 h-0
                border-l-[10px] border-l-transparent border-t-[8px]
                border-t-accent border-r-[10px] border-r-transparent"
                  ></div>
                </div>
                <div className="flex flex-col gap-4 w-full py-6 px-8">
                  {/* check in */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="default"
                        size="md"
                        className={cn(
                          "w-full flex justify-start text-left font-semibold",
                          !checkInDate && "text-secondary"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? (
                          format(checkInDate, "PPP")
                        ) : (
                          <span>Check in</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        initialFocus
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* check out */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="default"
                        size="md"
                        className={cn(
                          "w-full flex justify-start text-left font-semibold",
                          !checkOutDate && "text-secondary"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOutDate ? (
                          format(checkOutDate, "PPP")
                        ) : (
                          <span>Check out</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Number of guests */}

                  <div
                    className="bg-white rounded-none"
                    data-hs-input-number=""
                  >
                    <div className="w-full flex justify-between items-center gap-x-1">
                      <div className="grow py-2 px-3">
                        <input
                          className="w-full h-8 p-0 bg-transparent border-0 text-gray-800 placeholder:text-xs
                          placeholder:pl-3 placeholder:font-semibold placeholder:text-secondary focus:outline-none"
                          type="number"
                          min="1"
                          placeholder="TOTAL OF GUESTS"
                          value={totalGuests}
                          onChange={(e) => {
                            const value = e.target.value; // Get the raw value from the input
                            // Update the state only if the value is a valid number or empty
                            setTotalGuests(value === "" || !isNaN(value) ? value : totalGuests);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button size="md" onClick={acceptBooking}>Book now</Button>
                </div>
              </div>
              {showMessage && (
                <Alert className="rounded-none bg-green-500 text-white">
                  <div className="flex items-center gap-2">
                    <div className="text-xl w-[44px] h-[44px] flex justify-center items-center">
                      <FaInfoCircle />
                    </div>
                    <AlertTitle className="text-white">
                      Booking successful! Confirmation code: {confirmationCode} and Total Price: ${totalPrice}.
                       An SMS and email of your booking details have been sent to
                      you.
                    </AlertTitle>
                  </div>
                </Alert>
              )}
              {errorMessage && (
                <Alert className="rounded-none bg-red-500 text-white">
                  <div className="flex items-center gap-2">
                    <div className="text-xl w-[44px] h-[44px] flex justify-center items-center">
                      <FaInfoCircle />
                    </div>
                    <AlertTitle className="text-white">
                      {errorMessage}
                    </AlertTitle>
                  </div>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
