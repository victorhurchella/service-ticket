import type { Severity } from "@/types";

export interface ICreateTicket {
  title: string;
  description: string;
  dueDate: string;
  severity: Severity;
  aiSuggestedSeverity?: Severity;
}

export interface IUpdateInReview {
  id: string;
  title?: string;
  description?: string;
}

export interface IChangeSeverity {
  id: string;
  newSeverity: Severity;
  severityChangeReason: string;
}
