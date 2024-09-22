import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient('/recipients/');

const useGetRecipients = ()=> useQuery({
    queryKey:["recipients"],
    queryFn: () => apiClient.getAll({method:'GET'}),
    refetchOnWindowFocus: true, // Refetches data when the window regains focus
    refetchOnMount: true,       // Refetches data whenever the component remounts
    refetchOnReconnect: true,   // Refetches data if the connection is re-established
    staleTime: 0,
})


export default useGetRecipients;