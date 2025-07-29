import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const API = axios.create({
  baseURL: "http://localhost:5600/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Attached Authorization Header:", config.headers.Authorization);
  }
  return config;
});

export default API;
