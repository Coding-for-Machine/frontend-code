import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API bazaviy URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Har bir so'rovdan oldin tokenni yuborish uchun interceptor qo'shing
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Tokenni localStorage'dan oling
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
