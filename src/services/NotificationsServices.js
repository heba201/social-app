import axios from "axios";

const BaseUrl=import.meta.env.VITE_BASE_URL;
export async function getNotifications() {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/notifications`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}

export async function markNotificationAsRead(notificationId) {
    const token = localStorage.getItem("token");
    let data = await axios.patch(`${BaseUrl}/notifications/${notificationId}/read`,null, {
        headers: {
          Authorization:`Bearer ${token}`
        },
      });
      return data;
}

export async function markAllAsRead() {
    const token = localStorage.getItem("token");
    let data = await axios.patch(`${BaseUrl}/notifications/read-all`,null, {
        headers: {
          Authorization:`Bearer ${token}`
        },
      });
      return data;
}