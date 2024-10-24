import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useGetKeyPairs = (search, page, limit) => useQuery({
    queryKey: ["keypairs", page, limit],
    queryFn: async () => {
        let url = `/keypairs/?search=${search}`;
        if (page && limit) {
            url += `&page=${page}&page_size=${limit}`;
        }
        const response = await apiClient.get(url, getTokenIncludedConfig());
        if (response && response.data) {
            return response.data;
        } else {
            return [];
        }
    },
    refetchOnWindowFocus: true, // Refetches data when the window regains focus
    refetchOnMount: true,       // Refetches data whenever the component remounts
    refetchOnReconnect: true,   // Refetches data if the connection is re-established
    staleTime: 0,
});



export default useGetKeyPairs;