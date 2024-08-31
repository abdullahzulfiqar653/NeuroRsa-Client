import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";


const useGenerateSeeds = ()=> useQuery({
    queryKey:["password"],
    queryFn: () => apiClient  
    .post('/user/generate-pass-phrase/')
    .then(res=> res.data)
    .catch(er => er.error)

})

export default useGenerateSeeds;