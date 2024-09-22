import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient=new APIClient("/recipients/encrypt-message/");

const useCreateEncryptedMessage = () =>
  useMutation({ mutationFn: (data) => apiClient.createAll(data) });

export default useCreateEncryptedMessage;
