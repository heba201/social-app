import React, { useContext } from 'react'
 import { Link as HeroLink, Button, Input, Avatar, Badge , Skeleton } from "@heroui/react";
import { useState } from "react";
import imgLogo from "../../assets/auth/social-logo.jpg";
import { RiMessageFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { Link as RouterLink } from "react-router-dom";
import { NotificationsContext } from '../../context/NotificationsContext';
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function NavbarComponent() {
  const{token,setToken} = useContext(AuthContext);
  const {profileData,profilePhoto}   = useContext(UserContext);
  const {unreadCount,setUnreadCount}   = useContext(NotificationsContext);
  function handleLogout(){
    localStorage.removeItem("token");
    setToken(null);
    console.log("logged out");
  }
    const [open, setOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);
  return (
    <>
     <nav className="flex justify-between items-center p-4 bg-white text-gray-900 relative max-w-6xl mx-auto">
      <div className='flex items-center gap-3'>
      <img src={imgLogo} alt="logo" className="w-10 h-10 rounded-full object-cover" />
      <h1 className="font-bold">Social App</h1>
      </div>
      
              <div className='hidden md:block'>
                <Input fullWidth={true} className='rounded-full w-full' placeholder='Search'/>
              </div>
         <div className="hidden md:flex gap-4">
         <RouterLink to="/" >Home</RouterLink>   
        <a href="#">About</a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 relative">
        <div  className='flex items-center justify-center w-10 h-10 text-3xl rounded-full bg-gray-200 text-black cursor-pointer'>
            <Badge.Anchor>
          <RiMessageFill />
        <Badge color="accent" size="sm">
          5
        </Badge>
      </Badge.Anchor> 
             
        </div>

        <div  className='flex items-center justify-center w-10 h-10 text-3xl rounded-full bg-gray-200 text-black cursor-pointer'>
            <Badge.Anchor>
          <RouterLink to="/notifications" ><FaBell /></RouterLink> 
        <Badge color="accent" size="sm">
          {unreadCount}
        </Badge>
      </Badge.Anchor> 
               
        </div>
         
        {/* Avatar */}
        {profileData?.photo ?  <img
          src={profilePhoto}
          alt="profile"
          className="hidden md:block w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
          onClick={() => setOpen(!open)}
        />:<Skeleton className="hidden md:block rounded-full w-12 h-12" />}
       

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 bg-white text-black shadow-lg rounded-md w-60 overflow-hidden z-50">
           <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Signed in as {profileData?.email}
            </a>
             
            <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Profile</RouterLink>
           
            <RouterLink to="/user-profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpen(false)}>Settings</RouterLink>

            <button  className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left" onClick={()=>handleLogout()}>
              Logout
            </button>
          </div>
        )}
      </div>
       

       {/* Mobile Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpenMobile(!openMobile)}
        >
          {open ? <HiX /> : <HiOutlineMenu />}
        </button>
 
{openMobile && (
  <div className="absolute top-full right-0 bg-white border-t shadow-md z-50 md:hidden">
 <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Signed in as {profileData?.email}
            </a>
            <RouterLink to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenMobile(false)}>Profile</RouterLink>
                <RouterLink to="/user-profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setOpenMobile(false)}>Settings</RouterLink>
             <button  className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left" onClick={()=>handleLogout()}>
              Logout
            </button>
    
    </div>
)}
    </nav>
    
    </>
     
  )
}
