import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";


const useRegisterSeeds = () =>
  useMutation({
    mutationFn: (payload) => {
      return apiClient
        .post('/user/generate-pass-phrase/', payload)
        .then((res) => res.data)
        .catch((error) => {
          console.error("API error:", error.response ? error.response.data : error.message);
          throw error;
        });
    },
  });

export default useRegisterSeeds;