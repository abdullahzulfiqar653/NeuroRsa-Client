import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useGetKeyPairs = (page,limit)=> useQuery({
    queryKey:["keypairs"],
    queryFn: () => apiClient  
    .get(`/keypairs/?page=${page}&page_size=${limit}`, getTokenIncludedConfig())
    .then(res=> res.data)
    .catch(er => er.error),
    refetchOnWindowFocus: true, // Refetches data when the window regains focus
    refetchOnMount: true,       // Refetches data whenever the component remounts
    refetchOnReconnect: true,   // Refetches data if the connection is re-established
    staleTime: 0,
})


export default useGetKeyPairs;