import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://artshopback.up.railway.app"
});

export default axiosInstance;
