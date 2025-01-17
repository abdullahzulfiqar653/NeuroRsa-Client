import axios from "axios";


const baseUrl = import.meta.env.VITE_BASEURL;

const apiClient = axios.create({
    baseURL: baseUrl
})

export default apiClient;
