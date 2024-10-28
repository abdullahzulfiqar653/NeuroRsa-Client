import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useDeleteRecipients = () => {

  return useMutation({
    mutationFn: (id) => {
      return apiClient
        .delete(`/recipients/${id}`, getTokenIncludedConfig())
        .then((res) => res.data)
        .catch((error) => {
          throw error;
        });
    },
  })
};


export default useDeleteRecipients;