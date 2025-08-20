import { queryClient } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { postAiSuggestion } from "./api";
import type { IAiSuggest } from "./types";

export function useAiSuggest() {
  return useMutation(
    {
      mutationFn: (payload: IAiSuggest) => postAiSuggestion(payload),
    },
    queryClient,
  );
}
