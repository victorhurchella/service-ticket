import { queryClient } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { login } from "./api";
import type { ILogin } from "./types";

export function useLogin() {
  return useMutation(
    {
      mutationKey: ["user"],
      mutationFn: (data: ILogin) => login(data),
    },
    queryClient,
  );
}
