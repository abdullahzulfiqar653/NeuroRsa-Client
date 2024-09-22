import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient(`/keypairs`);

const useDeleteKeyPairs = () =>{
  return useMutation({
    mutationFn:(id) => apiClient.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries("keypairs"); 
       },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  })};


export default useDeleteKeyPairs;