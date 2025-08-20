import { queryClient } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { postAutomation } from "./api";

export function useAutomation() {
  return useMutation(
    {
      mutationFn: () => postAutomation(),
    },
    queryClient,
  );
}
