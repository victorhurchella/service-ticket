import type { Severity, Status } from "@/types";

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

export interface ITicketHistory {
  id: string;
  createdAt: string;
  ticketId: string;
  userId: string;
  fromStatus: Status | null;
  toStatus: Status | null;
  fromSeverity: Severity | null;
  toSeverity: Severity | null;
  reason: string;
}
