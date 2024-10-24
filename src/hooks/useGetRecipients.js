import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";

const useGetRecipients = (search = "", page) =>
    useQuery({
        queryKey: ["recipients", search, page],
        queryFn: async () => {
            let url = `/recipients/?search=${search}`;

            if (page) {
                url += `&page=${page}&page_size=${10}`;
            }

            console.log("Fetching from:", url);

            const response = await apiClient.get(url, getTokenIncludedConfig());

            if (response && response.data) {
                return response.data;
            } else {
                throw new Error("No data returned from the server");
            }
        }
    });


export default useGetRecipients;