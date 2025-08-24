import { useGetTicketHistory } from "@/services/hooks/tickets";
import type { Ticket } from "@/types";
import { colorBySeverity } from "@/utils";
import * as S from "./styles";

interface IModalProps {
  ticket: Ticket;
  close: VoidFunction;
}

export function TicketView({ ticket, close }: IModalProps) {
  const { data: ticketHistory } = useGetTicketHistory(ticket.id);

  return (
    <S.Container onClick={close}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <S.Title>
          #{ticket.ticketNumber} - {ticket.title}
        </S.Title>

        <S.InlineSection>
          <S.SectionLabel>Status:</S.SectionLabel>
          <S.InlineText>{ticket.status}</S.InlineText>
        </S.InlineSection>

        <S.InlineSection>
          <S.SectionLabel>Severity:</S.SectionLabel>
          <S.InlineText style={{ color: colorBySeverity(ticket.severity) }}>
            {ticket.severity}
          </S.InlineText>
        </S.InlineSection>

        <S.InlineSection>
          <S.SectionLabel>Due Date:</S.SectionLabel>
          <S.InlineText>
            {new Date(ticket.dueDate).toLocaleString()}
          </S.InlineText>
        </S.InlineSection>

        <S.SectionLabel>Description:</S.SectionLabel>
        <S.Text>{ticket.description}</S.Text>

        <S.SectionLabel style={{ marginTop: 24 }}>
          Ticket History:
        </S.SectionLabel>

        <S.HistoryContainer>
          <table>
            <thead>
              <tr>
                <th>From Status</th>
                <th>To Status</th>
                <th>From Severity</th>
                <th>To Severity</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {ticketHistory
                ?.sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
                )
                .map((history) => (
                  <tr key={history.id}>
                    <td>{history.fromStatus ?? "-"}</td>
                    <td>{history.toStatus ?? "-"}</td>
                    <td
                      style={{
                        color: history.fromSeverity
                          ? colorBySeverity(history.fromSeverity)
                          : "#eee",
                      }}
                    >
                      {history.fromSeverity ?? "-"}
                    </td>
                    <td
                      style={{
                        color: history.toSeverity
                          ? colorBySeverity(history.toSeverity)
                          : "#eee",
                      }}
                    >
                      {history.toSeverity ?? "-"}
                    </td>
                    <td>{history.reason}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </S.HistoryContainer>
      </S.Content>
    </S.Container>
  );
}
