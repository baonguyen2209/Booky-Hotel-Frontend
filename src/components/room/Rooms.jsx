/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { useEffect, useState } from 'react';
import { getAllRooms, getRoomTypes } from '../utils/ApiFunction';
import { Link } from 'react-router-dom';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState('all');
    const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            try {
                const result = await getAllRooms();
                setRooms(result.roomList);
                setFilteredRooms(result.roomList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setIsLoading(false);
            }
        };
        fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomType === 'all') {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
    }, [selectedRoomType, rooms]);

    useEffect(() => {
        const fetchRoomTypes = async () => {
            setIsLoadingRoomTypes(true);
            try {
                const types = await getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error("Error fetching room types:", error);
            } finally {
                setIsLoadingRoomTypes(false);
            }
        };
        fetchRoomTypes();
    }, []);

    const Card = ({ roomId, image, capacity, title, price }) => {
        return (
            <div className="animate-fadeIn">
                <Link to={`/room-details-book/${roomId}`}>
                    <div className="relative w-full h-[300px] overflow-hidden mb-6">
                        <img src={image} alt="" className="object-cover h-full w-full" />
                    </div>
                </Link>
                <div className="h-[134px]">
                    <div className="flex items-center justify-between mb-6">
                        <div>Capacity - {capacity} person</div>
                        <div className='flex gap-1 text-accent'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                        </div>
                    </div>
                    <Link to={`/room-details/${roomId}`}>
                        <h3 className="h3">{title}</h3>
                    </Link>
                    <p className='h3 font-secondary font-medium text-accent mb-4'>
                        ${price} <span className='text-base text-secondary'>/ night</span>
                    </p>
                </div>
            </div>
        );
    };

    const SkeletonCard = () => {
        return (
            <div className="animate-pulse">
                <div className="relative w-full h-[300px] overflow-hidden mb-6 bg-gray-300" />
                <div className="h-[134px] space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        );
    };

    return (
        <section>
            <div className="container mx-auto">
                <section className='py-16 min-h-[90vh]'>
                    {/* image & title */}
                    <div className='flex flex-col items-center'>
                        <div className='relative w-[82px] h-[20px]'>
                            <img src="/heading-icon.svg" alt="" className='object-cover' />
                        </div>
                        <h2 className='h2 mb-8'>Our Rooms</h2>
                    </div>

                    {/* Tabs for Room Types */}
                    
                    <Tabs defaultValue='all' className='w-[240px] lg:w-[540px] h-[200px] lg:h-auto mb-8 mx-auto' onValueChange={(value) => setSelectedRoomType(value)}>
                        <TabsList className="w-full h-full lg:h-[46px] flex flex-col lg:flex-row">
                            <TabsTrigger className="w-full h-full" value='all'>All</TabsTrigger>
                            {roomTypes.map((type) => (
                                <TabsTrigger key={type} className="w-full h-full" value={type}>{type}</TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    

                    {/* room list */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array(8).fill().map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredRooms.map((room) => (
                                <Card key={room.id} roomId={room.id} image={`data:image/jpeg;base64, ${room.photo}`} capacity={room.capacity} title={room.roomTitle} price={room.roomPrice} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </section>
    );
}
