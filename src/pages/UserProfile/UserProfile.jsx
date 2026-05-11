import React, { useContext, useEffect, useState } from 'react'
import { getUserProfile } from '../../services/UserServices'
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { useDisclosure } from "@heroui/use-disclosure";
import UploadProfilePhoto from '../../components/userProfile/UploadProfilePhoto';
import ChangePassword from '../../components/userProfile/ChangePassword';

export default function UserProfile() {
   const {profileData,profilePhoto,setProfilePhoto}   = useContext(UserContext);  
   const {
    isOpen: isOpenOne,
    onOpen: onOpenOne,
    onOpenChange: onOpenChangeOne,
    } = useDisclosure();
      
    const {
   isOpen: isOpenTwo,
   onOpen: onOpenTwo,
   onOpenChange: onOpenChangeTwo,
   } = useDisclosure()


  return (
    <div className="bg-gray-200 pt-5 pb-5 mb-10 ">
<div className="container max-w-5xl p-4 border border-gray-200 rounded-lg mt-14 bg-white text-center">
        {/* Cover */}
        <div className="h-40 w-full mb-3">
          <img
            src={profileData?.cover ? profileData?.cover : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
            alt="cover"
            className="w-full h-full object-cover border rounded-lg"
          />
        </div>

       
        <div className="flex justify-center">
          <img 
            src={profilePhoto}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>

        
        <h1 className="mt-4 text-xl font-bold text-gray-800">
           {profileData?.name}
        </h1>

        <p className="text-gray-500 text-sm">
          {profileData?.email}
        </p>

          <div className="mt-5 space-y-3 text-sm text-gray-700 w-3/4 text-center mx-auto">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Username</span>
              <span>{profileData?.username}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Gender</span>
              <span>{profileData?.gender}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Date of Birth</span>
              <span>{profileData?.dateOfBirth?.split("T")[0]}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email</span>
              <span>{profileData?.email}</span>
            </div>
          </div>

        <div className="flex justify-around mt-6 border-t pt-4">
          <div>
            <p className="font-bold text-lg">{profileData?.followersCount}</p>
            <span className="text-gray-500 text-sm">Followers Count</span>
          </div>

          <div>
            <p className="font-bold text-lg">{profileData?.followingCount}</p>
            <span className="text-gray-500 text-sm">Following Count</span>
          </div>

          <div>
            <p className="font-bold text-lg">{profileData?.bookmarksCount}</p>
            <span className="text-gray-500 text-sm">Bookmarks Count</span>
          </div>
        </div>
          
          <div className="flex items-center gap-3 justify-center">
        <button onClick={onOpenTwo}  className="mt-6   bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-xl transition cursor-pointer">
          Change Password
        </button>

        <button onClick={onOpenOne} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-xl transition cursor-pointer">
          Upload Profile Photo
        </button>
          </div>

      </div>

      <UploadProfilePhoto isOpen={isOpenOne} onOpenChange={onOpenChangeOne} setProfilePhoto={setProfilePhoto}/>

      <ChangePassword isOpen={isOpenTwo} onOpenChange={onOpenChangeTwo} />

  
    </div>
  )
}
