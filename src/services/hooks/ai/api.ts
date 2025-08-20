import { api } from "@/services/api";
import type { IAiSuggest, IAiSuggestReturn } from "./types";

export async function postAiSuggestion(payload: IAiSuggest) {
  const { data } = await api.post<IAiSuggestReturn>(
    "/ai/severity-suggestion",
    payload,
  );

  return data;
}
