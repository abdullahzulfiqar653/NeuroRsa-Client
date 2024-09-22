import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient('/keypairs/');

const useGetKeyPairs = (page = 1, limit = 10) => {
  
    return useQuery({
      queryKey: ["keypairs", page, limit],
      queryFn: () => apiClient.getAll({ method: 'GET', queryParams: { page, page_size: limit }}), 
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 0,
    });
  };



export default useGetKeyPairs;