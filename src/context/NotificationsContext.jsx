import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;
export const NotificationsContext = createContext();

export default function NotificationsContextProvider({ children }) {
    const[unreadCount, setUnreadCount] = useState(0);
    const token = localStorage.getItem("token");
  async function getUnreadCount() {
    let data = await axios.get(`${BaseUrl}/notifications/unread-count`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUnreadCount(data.data.data.unreadCount);
  }
  useEffect(() => {
    if (token) {
      getUnreadCount();
    }
  }, [token]);
  return (
    <NotificationsContext.Provider value={{unreadCount,setUnreadCount}}>
      {children}
    </NotificationsContext.Provider>
  );
}
