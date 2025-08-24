import { queryClient } from "@/services/api";
import type { Status } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getTicketHistory,
  getTicketsByStatus,
  patchApproveTicket,
  patchChangeSeverity,
  patchUpdateInReview,
  postCreateTicket,
  softDeleteTicket,
} from "./api";
import type { IChangeSeverity, ICreateTicket, IUpdateInReview } from "./types";

export function useTickets(status: Status) {
  return useQuery(
    {
      queryKey: ["tickets", status],
      queryFn: () => getTicketsByStatus(status),
    },
    queryClient,
  );
}

export function useCreateTicket() {
  return useMutation(
    {
      mutationFn: (data: ICreateTicket) => postCreateTicket(data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    },
    queryClient,
  );
}

export function useApproveTicket() {
  return useMutation(
    {
      mutationFn: (id: string) => patchApproveTicket(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    },
    queryClient,
  );
}

export function useChangeSeverity() {
  return useMutation(
    {
      mutationFn: (payload: IChangeSeverity) => patchChangeSeverity(payload),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    },
    queryClient,
  );
}

export function useUpdateInReview() {
  return useMutation(
    {
      mutationFn: (payload: IUpdateInReview) => patchUpdateInReview(payload),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    },
    queryClient,
  );
}

export function useSoftDeleteTicket() {
  return useMutation(
    {
      mutationFn: (id: string) => softDeleteTicket(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
    },
    queryClient,
  );
}

export function useGetTicketHistory(ticketId: string) {
  return useQuery(
    {
      queryKey: [`ticket-history-${ticketId}`],
      queryFn: () => getTicketHistory(ticketId),
    },
    queryClient,
  );
}
