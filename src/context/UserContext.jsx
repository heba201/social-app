import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const[profileData, setProfileData] = useState(null);
    const[profilePhoto,setProfilePhoto] = useState(profileData?.photo);
    const token = localStorage.getItem("token");
  async function getUserProfile() {
    let data = await axios.get(`${BaseUrl}/users/profile-data`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setProfileData(data.data.data.user);
    setProfilePhoto(data.data.data.user.photo);
  }
  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);
  return (
    <UserContext.Provider value={{profileData,profilePhoto,setProfilePhoto,getUserProfile}}>
      {children}
    </UserContext.Provider>
  );
}
