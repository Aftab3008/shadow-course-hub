
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
