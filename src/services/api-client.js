import axios from "axios";


const baseUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: baseUrl
})

export default apiClient;
