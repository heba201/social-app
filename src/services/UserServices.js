import axios from "axios";

const BaseUrl=import.meta.env.VITE_BASE_URL;

export async function getUserProfile() {
      const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/users/profile-data`, {
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}  

export async function changePassword(editData) {
      const token = localStorage.getItem("token");
    let data = await axios.patch(`${BaseUrl}/users/change-password`, editData , {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}  

export async function UploadUserPhoto(formData) {
      const token = localStorage.getItem("token");
    let data = await axios.put(`${BaseUrl}/users/upload-photo`, formData , {
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}


export async function followUser(userId) {
      const token = localStorage.getItem("token");
    let data = await axios.put(`${BaseUrl}/users/${userId}/follow` ,null, {
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}


export async function getUserProfileById(userId) {
      const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/users/${userId}/profile`, {
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}

export async function getFollowSuggestions() {
      const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/users/suggestions`, {
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}