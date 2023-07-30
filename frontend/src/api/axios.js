import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://task-app-production.up.railway.app/",
});

export default instance;
