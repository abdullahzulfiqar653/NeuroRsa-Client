import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";


const useGenerateSeeds = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["password"],
        queryFn: () => apiClient
            .post('/user/generate-pass-phrase/')
            .then(res => res.data)
            .catch(er => console.log("erer", er.error))
    });

    return { data, isLoading, error };
}

export default useGenerateSeeds;