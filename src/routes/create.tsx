import { createFileRoute } from "@tanstack/react-router";
import { CreateTicketPage } from "../components/CreateTicket";

export const Route = createFileRoute("/create")({
  component: CreateTicketPage,
});
