import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useDeleteKeyPairs = () =>{
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn:(id) => {
        console.log(id)
      return apiClient
        .delete(`/keypairs/${id}`, getTokenIncludedConfig())
        .then((res) => {
            console.log('Deletion successful:', res.data);
            return res.data;
          })
          .catch((error) => {
            console.error("API error:", error.response ? error.response.data : error.message);
            throw error;
          });
    },
    onSuccess: () => {
        queryClient.invalidateQueries("keys");
      },
  })};


export default useDeleteKeyPairs;