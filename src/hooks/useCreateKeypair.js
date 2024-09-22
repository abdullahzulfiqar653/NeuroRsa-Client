import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient("/keypairs/");

const useCreateKeypair = () =>
   useMutation({ mutationFn: (data) => apiClient.createAll(data) });

export default useCreateKeypair;
