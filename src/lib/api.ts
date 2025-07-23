import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error(
    "VITE_BACKEND_URL is not defined. Please set it in your .env file."
  );
}

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
