import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("/user");

const useCreateToken = () => 
  useMutation({
    mutationFn: (pass_phrase) => apiClient.createToken(pass_phrase),
    onSuccess: (res) => localStorage.setItem("access_token", res.access),
  });

export default useCreateToken;
