import { api } from "@/services/api";
import type { Paginated, Status, Ticket } from "@/types";
import type { IChangeSeverity, ICreateTicket, IUpdateInReview } from "./types";

export async function getTicketsByStatus(status: Status) {
  const { data } = await api.get<Paginated<Ticket>>(
    `/tickets?status=${status}`,
  );
  return data;
}

export async function postCreateTicket(payload: ICreateTicket) {
  const { data } = await api.post<Ticket>("/tickets", payload);
  return data;
}

export async function patchApproveTicket(id: string) {
  const { data } = await api.patch<Ticket>(`/tickets/${id}/review`, {
    action: "APPROVE",
  });
  return data;
}

export async function patchChangeSeverity(payload: IChangeSeverity) {
  const { data } = await api.patch<Ticket>(`/tickets/${payload.id}/review`, {
    action: "CHANGE_SEVERITY",
    newSeverity: payload.newSeverity,
    severityChangeReason: payload.severityChangeReason,
  });
  return data;
}

export async function patchUpdateInReview(payload: IUpdateInReview) {
  const { data } = await api.patch<Ticket>(`/tickets/${payload.id}`, {
    title: payload.title,
    description: payload.description,
  });

  return data;
}

export async function softDeleteTicket(id: string) {
  const { data } = await api.delete<Ticket>(`/tickets/${id}`);
  return data;
}
