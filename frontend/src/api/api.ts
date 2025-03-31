import axios from "axios";

export const baseURL = "http://localhost:3000/api";

export const client = axios.create({
  baseURL,
});
