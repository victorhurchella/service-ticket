import { createFileRoute } from "@tanstack/react-router";
import { TicketsByStatus } from "../components/TicketsByStatus";

export const Route = createFileRoute("/tickets/$status")({
  component: TicketsByStatus,
});
