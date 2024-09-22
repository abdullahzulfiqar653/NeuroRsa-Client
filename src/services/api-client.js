import axios from "axios";
import { getTokenIncludedConfig } from "./Authentication";
const apiUrl = import.meta.env.VITE_API_URL;
export const axiosInstance = axios.create({
    baseURL: apiUrl
})

class APIClient{

    constructor(endpoint) {
        this.endpoint = endpoint;
      }

    createAll=(data)=>{
        const body = JSON.stringify(data)
        console.log(data)
        return axiosInstance
        .post(this.endpoint, body , getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
            console.error("API error:", error.response ? error.response.data : error.message);
            throw error;
          });
    }

    createToken=(pass_phrase)=>{
        return axiosInstance
        .post("/user/generate-token/", { pass_phrase })
        .then((res) => res.data)
        .catch((error) => {
          console.error("API error:", error.response ? error.response.data : error.message);
          throw error;
        });
    };

    delete=(id)=>{
        return axiosInstance
        .delete(`${this.endpoint}/${id}`, getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
            console.error("API error:", error.response ? error.response.data : error.message);
            throw error;
          });
    }

    getAll = ({ method = 'GET', data = null, queryParams={}}) => {
        let url = this.endpoint;

        if (Object.keys(queryParams).length) {
          const queryString = new URLSearchParams(queryParams).toString();
          url += `?${queryString}`;
        }

      if (method === 'POST') {
        return axiosInstance
        .post(url)
        .then(res=>res.data)
        .catch((error) => {
            console.error("API error:", error.response ? error.response.data : error.message);
            throw error;
          });
      } else {
        return axiosInstance
        .get(url, getTokenIncludedConfig())
        .then(res=>res.data)
        .catch((error) => {
            console.error("API error:", error.response ? error.response.data : error.message);
            throw error;
          });
      }
    }

}

export default APIClient;
