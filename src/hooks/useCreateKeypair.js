import { useMutation } from "@tanstack/react-query";
import apiClient, { getTokenIncludedConfig } from "../services/api-client";

const useCreateKeypair = () =>
  useMutation({
    mutationFn: (data) => {
      const body = JSON.stringify(data);
      return apiClient
        .post("/keypairs/", body, getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    }
  });

export default useCreateKeypair;
