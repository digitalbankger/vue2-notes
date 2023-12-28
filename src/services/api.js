import axios from "axios";

const instance = axios.create({
  baseURL: "https://dist.nd.ru/api/",
  headers: {
    "Content-Type": "application/json",
  },
});


export default instance;
