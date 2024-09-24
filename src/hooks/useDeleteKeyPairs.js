import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient(`/keypairs`);

const useDeleteKeyPairs = () =>{
  const queryClient = useQueryClient(); 
  return useMutation({
    mutationFn:(id) => apiClient.delete(id),
    onSuccess: () => { queryClient.invalidateQueries("keypairs"); },
  })};

export default useDeleteKeyPairs;