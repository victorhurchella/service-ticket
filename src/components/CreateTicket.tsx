import { useAiSuggest } from "@/services/hooks/ai";
import { useCreateTicket } from "@/services/hooks/tickets";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Grid,
  Input,
  Select,
  TextArea,
} from "../styles/ui";
import type { Severity } from "../types";

const severities: Severity[] = ["EASY", "LOW", "MEDIUM", "HIGH", "VERY_HIGH"];

export function CreateTicketPage() {
  const { mutateAsync: createTicket } = useCreateTicket();
  const { mutateAsync: postAiSuggest } = useAiSuggest();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(() =>
    new Date(Date.now() + 86400000).toISOString().slice(0, 16),
  );
  const [severity, setSeverity] = useState<Severity>("MEDIUM");
  const [suggestedSeverity, setSuggestedSeverity] = useState<Severity | null>();

  async function onSuggest() {
    const res = await postAiSuggest({ title, description });
    setSuggestedSeverity(res.severity);
  }

  return (
    <Card style={{ maxWidth: 720 }}>
      <h2>Create Ticket</h2>
      <Grid cols={2}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Grid>

      <TextArea
        placeholder="Description"
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ resize: "none" }}
      />

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity)}
        >
          {severities.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <Button
          variant="secondary"
          onClick={onSuggest}
          disabled={!title || !description}
        >
          AI Suggest
        </Button>

        {suggestedSeverity && (
          <Badge>Suggested Severity: {suggestedSeverity}</Badge>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <Button
          onClick={async () => {
            await createTicket({
              title,
              description,
              dueDate: new Date(dueDate).toISOString(),
              severity,
            });
            navigate({ to: "/tickets/DRAFT" });
          }}
          disabled={!title || !description}
        >
          Create
        </Button>
      </div>
    </Card>
  );
}
