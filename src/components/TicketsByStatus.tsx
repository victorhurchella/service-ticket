import { useAuth } from "@/services/context/useAuth";
import {
  useApproveTicket,
  useChangeSeverity,
  useSoftDeleteTicket,
  useTickets,
  useUpdateInReview,
} from "@/services/hooks/tickets";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Table } from "../styles/ui";
import type { Severity, Status, TAxiosMessageError, Ticket } from "../types";
import { TicketView } from "./TicketView";

export function TicketsByStatus() {
  const [viewTicket, setViewTicket] = useState<Ticket | null>();

  const { status } = useParams({ from: "/tickets/$status" }) as {
    status: Status;
  };

  const navigate = useNavigate();

  const { user } = useAuth();
  const { data: tickets } = useTickets(status);
  const { mutate: approveTicket } = useApproveTicket();
  const { mutateAsync: changeSeverity } = useChangeSeverity();
  const { mutateAsync: editTicket } = useUpdateInReview();
  const { mutate: softDeleteTicket } = useSoftDeleteTicket();

  async function onChangeSeverity(ticketId: string, currentSeverity: Severity) {
    const options = ["EASY", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];

    const newSeverity = prompt(
      `New Severity: ${options.join(", ")}`,
      currentSeverity,
    );

    if (!newSeverity) return;

    const validNewSeverity = options.includes(newSeverity.toUpperCase());

    const severityChangeReason = prompt("Reason to change severity:");

    if (!validNewSeverity || !severityChangeReason) return;

    try {
      const ticket = await changeSeverity({
        id: ticketId,
        newSeverity: newSeverity.toUpperCase() as Severity,
        severityChangeReason,
      });

      navigate({ to: `/tickets/${ticket.status}` });
    } catch (e) {
      const error = e as TAxiosMessageError;
      alert(error.response.data.message);
    }
  }

  async function onEdit(ticket: Ticket) {
    const title = prompt("New ticket title", ticket.title) || ticket.title;

    const description =
      prompt("New ticket description", ticket.description) ||
      ticket.description;

    try {
      const editedTicket = await editTicket({
        id: ticket.id,
        title,
        description,
      });

      navigate({ to: `/tickets/${editedTicket.status}` });
    } catch (e) {
      const error = e as TAxiosMessageError;
      alert(error.response.data.message);
    }
  }

  return (
    <div>
      <h2>Tickets: {status}</h2>
      <Card>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              tickets?.items.map((ticket: Ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.title}</td>
                  <td>
                    <Badge>{ticket.severity}</Badge>
                  </td>
                  <td>{new Date(ticket.dueDate).toLocaleString()}</td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Button onClick={() => setViewTicket(ticket)}>
                        View
                      </Button>

                      {user.role === "MANAGER" && status === "DRAFT" && (
                        <>
                          <Button
                            onClick={() => {
                              approveTicket(ticket.id);
                              navigate({ to: "/tickets/PENDING" });
                            }}
                          >
                            Approve → Pending
                          </Button>

                          <Button
                            variant="secondary"
                            onClick={() =>
                              onChangeSeverity(ticket.id, ticket.severity)
                            }
                          >
                            Raise Severity
                          </Button>
                        </>
                      )}

                      {status === "REVIEW" && (
                        <Button onClick={() => onEdit(ticket)}>Edit</Button>
                      )}

                      {(status === "DRAFT" || status === "REVIEW") && (
                        <Button
                          variant="secondary"
                          onClick={() => softDeleteTicket(ticket.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>

      {viewTicket && (
        <TicketView ticket={viewTicket} close={() => setViewTicket(null)} />
      )}
    </div>
  );
}
