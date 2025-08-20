import type { Severity } from "@/types";

export interface IAiSuggest {
  title: string;
  description: string;
}

export interface IAiSuggestReturn {
  severity: Severity;
  source: "LLM" | "HEURISTIC";
  model?: string | null;
  reasons?: string[];
}
