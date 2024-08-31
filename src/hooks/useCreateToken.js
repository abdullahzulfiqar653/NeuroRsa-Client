import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";

const useCreateToken = () => useMutation({

    mutationFn:(pass_phrase) => {
      return apiClient
        .post('/user/generate-token/', { pass_phrase })
        .then((res) => {
          console.log("Mutation successful:", res.data);
          localStorage.setItem('access_token', res.data.access);
        })
        .catch((error) => {
          console.error("API error:", error.response ? error.response.data : error.message);
          throw error;
        });
    },
  });


export default useCreateToken;