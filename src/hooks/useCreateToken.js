import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";


const useCreateToken = () => useMutation({

    mutationFn:(pass_phrase) => {
      return apiClient
        .post('/user/generate-token/', { pass_phrase })
        .then((res) => res.data)
        .catch((error) => {
          console.error("API error:", error.response ? error.response.data : error.message);
          throw error;
        });
    },
    onSuccess: (res) => {
      localStorage.setItem('access_token', res.access);
    },
    onError: (error) => {
      console.error('Error occurred:', error);
    }
  });


export default useCreateToken;