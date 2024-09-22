import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient('/user/generate-pass-phrase/');

const useGenerateSeeds = ()=> useQuery({
    queryKey:["password"],
    queryFn: () => apiClient.getAll({method:'POST'})

})

export default useGenerateSeeds;