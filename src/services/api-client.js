import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://206.189.50.219:3001/rsa/api" ,
})

export default apiClient;
