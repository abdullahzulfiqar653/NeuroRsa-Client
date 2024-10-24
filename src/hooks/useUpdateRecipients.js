import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { getTokenIncludedConfig } from "../services/Authentication";


const useUpdateRecipients = () => {
    return useMutation({
        mutationFn: (data) => {
            console.log(data)
            const body = JSON.stringify(data);
            return apiClient
                .patch(`/recipients/${data?.id}/`, body, getTokenIncludedConfig())
                .then((res) => {
                    return {
                        data: res.data,
                        status: res.status, // Attach status to response object
                    };
                })
                .catch((error) => {
                    console.error(
                        "API error:",
                        error.response ? error.response.data : error.message
                    );
                    throw error;
                });
        }
    })
};


export default useUpdateRecipients;