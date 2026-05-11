import axios from "axios";

const BaseUrl=import.meta.env.VITE_BASE_URL;
export async function getAllPosts() {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/posts`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
    
}

export async function getPostById(id) {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;  
} 

export async function createPost(formData) {
    const token = localStorage.getItem("token");
    let data = await axios.post(`${BaseUrl}/posts`, formData,{
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
    
}

export async function bookmarkPost(id) {
const token = localStorage.getItem("token");
let data = await axios.put( `${BaseUrl}/posts/${id}/bookmark`,null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return data;
}

export async function getBookmarks() {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/users/bookmarks`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;  
} 


export async function likePost(id) {
const token = localStorage.getItem("token");
let data = await axios.put( `${BaseUrl}/posts/${id}/like`,null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
return data;
}


export async function getPostLikes(id) {
const token = localStorage.getItem("token");
let data = await axios.get( `${BaseUrl}/posts/${id}/likes`, {
    headers: {
      Authorization:`Bearer ${token}`,
    },
  });
return data;
}

export async function getProfilePosts() {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/posts/feed`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}


export async function getUserPosts(userId) {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/users/${userId}/posts`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}


export async function UpdatePost(id,formData) {
const token = localStorage.getItem("token");
    let data = await axios.put(`${BaseUrl}/posts/${id}`, formData,{
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}

export async function deletePost(id,formData) {
const token = localStorage.getItem("token");
    let data = await axios.delete(`${BaseUrl}/posts/${id}`,{
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}

export async function sharePost(id,formData) {
const token = localStorage.getItem("token");
    let data = await axios.post(`${BaseUrl}/posts/${id}/share`, formData,{
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
}