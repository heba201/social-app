import axios from "axios";

const BaseUrl=import.meta.env.VITE_BASE_URL;
export async function getAllComments(postId) {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/posts/${postId}/comments?page=1&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data;
    
}  


export async function createComment(postId,formData) {
    const token = localStorage.getItem("token");
    let data = await axios.post(`${BaseUrl}/posts/${postId}/comments`,formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data; 
}  

export async function updateComment(postId,formData) {
    const token = localStorage.getItem("token");
    let data = await axios.put(`${BaseUrl}/posts/${postId}/comments`,formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data; 
}  


export async function likeComment(postId,commentId) {
    const token = localStorage.getItem("token");
    let data = await axios.put(`${BaseUrl}/posts/${postId}/comments/${commentId}/like`,null, {
        headers: {
          Authorization:`Bearer ${token}`
        },
      });
      return data; 
} 

export async function createCommentReply(postId,commentId,formData) {
    const token = localStorage.getItem("token");
    let data = await axios.post(`${BaseUrl}/posts/${postId}/comments/${commentId}/replies`,formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data; 
} 


export async function getCommentReplies(postId,commentId) {
    const token = localStorage.getItem("token");
    let data = await axios.get(`${BaseUrl}/posts/${postId}/comments/${commentId}/replies`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      });
      return data; 
} 
