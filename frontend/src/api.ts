import axios from "axios";

export const api = axios.create({
  baseURL: "", // mismo origen (Nginx en Docker).
  headers: { "Content-Type": "application/json" },
});
