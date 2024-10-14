/* eslint-disable no-unused-vars */
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Button } from '../ui/button';
import MobileNav from './MobileNav';
import Nav from './Nav';
import { getUserProfile, isAdmin as checkAdmin, isAuthenticated as checkAuth, isUser as checkUser, logout } from '../utils/ApiFunction';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger,
} from '../ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { FaCalendar, FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const socials = [
    { icon: <FaYoutube />, href: '#'},
    { icon: <FaFacebook />, href: '#'},
    { icon: <FaInstagram />, href: '#'},
    { icon: <FaTwitter />, href: '#'},
];

export default function Header() {

    const isAuthenticated = checkAuth();   
    const isAdmin = checkAdmin();
    const isUser = checkUser();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState(''); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getUserProfile();
                setUser(userProfile.user);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
    
        if (isAuthenticated) {
            fetchData();
        } else {
            setUser('');  // Reset user state if not authenticated
        }
    }, [isAuthenticated]);
    


    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            logout();
            navigate('/');
        }
    };     

  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* logo & social icons */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            {/* logo */}
            <NavLink to="/">
              <img src="/logo.svg" width={160} height={160} alt="" />
            </NavLink>
            {/* separator */}
            <div className="w-[1px] h-[40px] bg-gray-300"></div>
            {/* social icons */}
            <div className="flex gap-2">
              {socials.map((item, index) => {
                return (
                  <a
                    href="{item.href}"
                    key={index}
                    className="bg-accent text-white hover:bg-accent-hover text-sm 
                                w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all"
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>
          {/* sign in & sign up btns */}
          <div className="flex items-center justify-center gap-8 xl:w-max">
            <div className="flex items-center gap-8 xl:order-2">
              {/* desktop nav */}
              <div className="hidden xl:flex">
                <Nav />
              </div>
              {/* <Dropdown /> */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex items-center gap-2 cursor-pointer">
                      {/* avatar */}
                      <Avatar>
                        {/* <AvatarImage src='https://yt3.ggpht.com/yti/ANjgQV-u3OK_Y7oNKjH-Qr2HF1reWje_5IGMZJ_EQlh5HWk=s88-c-k-c0x00ffffff-no-rj'/> */}
                        <AvatarFallback className="bg-accent text-white">
                          {user?.lastName?.[0]?.toUpperCase() || ""}{" "}
                          {user?.firstName?.[0]?.toUpperCase() || ""}
                        </AvatarFallback>
                      </Avatar>
                      {/* name & email */}
                      <div>
                        <div className="flex gap-1 font-bold">
                          <p>{user.lastName}</p>
                          <p>{user.firstName}</p>
                        </div>
                        <p className="text-sm font-semibold">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-72 mt-4 p-4 flex flex-col gap-2"
                    align="start"
                  >
                    <DropdownMenuLabel className="text-base">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="flex flex-col gap-2">
                      <NavLink to="/">
                        <DropdownMenuItem>
                          Homepage
                          <DropdownMenuShortcut className="text-lg text-accent">
                            <FaHome />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </NavLink>
                      <NavLink to="/my-booking">
                        <DropdownMenuItem>
                          My Bookings
                          <DropdownMenuShortcut className="text-lg text-accent">
                            <FaCalendarCheck />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </NavLink>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <NavLink onClick={handleLogout}>
                      <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut className="text-lg text-accent">
                          <FaSignOutAlt />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </NavLink>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button variant="primary">
                    <NavLink to="/login">Sign in</NavLink>
                  </Button>
                  <Button>
                    <NavLink to="/register">Register</NavLink>
                  </Button>
                </div>
              )}
              {/* mobile nav */}
              <div className="xl:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
