import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_API_URL
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : BACKEND_URI;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
