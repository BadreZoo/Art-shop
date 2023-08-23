import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "postgres://szyepgtm:zY5fmfOAY6F3s3XpEkZBHtsCZNK2316P@trumpet.db.elephantsql.com/szyepgtm"
});

export default axiosInstance;
