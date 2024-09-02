import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useGetKeyPairs = ()=> useQuery({
    queryKey:["keypairs"],
    queryFn: () => apiClient  
    .get('/keypairs/', getTokenIncludedConfig())
    .then(res=> res.data)
    .catch(er => er.error),
    refetchOnWindowFocus: true, // Refetches data when the window regains focus
    refetchOnMount: true,       // Refetches data whenever the component remounts
    refetchOnReconnect: true,   // Refetches data if the connection is re-established
    staleTime: 0,
})


export default useGetKeyPairs;