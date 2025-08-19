import axios from "axios";

const Extra = axios.create({
  baseURL: "https://ecommerce-backend-sf4n.onrender.com/api/v1",
  withCredentials: true,   //  cookies (JWT) bhejne ke liye
});

// request interceptor -> dev case me token bhej dega
Extra.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");   // agar token store hai
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Extra;
