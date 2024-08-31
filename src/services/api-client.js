import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://206.189.50.219:3001/rsa/api" ,
})

export default apiClient;


export function getTokenIncludedConfig() {
    return {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    };
  }
  