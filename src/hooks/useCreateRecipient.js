import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";

const useCreateRecipient = () =>
  useMutation({
    mutationFn: (data) => {
      return apiClient
        .post("/recipients/", JSON.stringify(data), getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  });

export default useCreateRecipient; 
