import { useMutation } from "@tanstack/react-query";

import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";

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
