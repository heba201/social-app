import axios from "axios";

const BaseUrl=import.meta.env.VITE_BASE_URL;
export async function registerUser(body) {
    try {
    let data = await axios.post(`${BaseUrl}/users/signup`,body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }catch (error) {
    
    throw error; 
  }
}  

export async function loginUser(body) {
    try {
    let data = await axios.post(`${BaseUrl}/users/signin`,body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    }catch (error) {
    
    throw error; 
  }
} 