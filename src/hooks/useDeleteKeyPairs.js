import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useDeleteKeyPairs = () =>{
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(id) => {
      return apiClient
        .delete(`/keypairs/${id}`, getTokenIncludedConfig())
        .then((res) => res.data)
          .catch((error) => {
            throw error;
          });
    },
    onSuccess: () => {
        // console.log(queryClient.invalidateQueries("keys"));
      },
  })};


export default useDeleteKeyPairs;