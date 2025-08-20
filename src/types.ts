import type { AxiosError } from "axios";

export type Role = "ASSOCIATE" | "MANAGER";
export type Severity = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | "EASY";
export type Status = "DRAFT" | "REVIEW" | "PENDING" | "OPEN" | "CLOSED";

export type User = { id: string; email: string; role: Role };

export type Ticket = {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  dueDate: string;
  severity: Severity;
  aiSuggestedSeverity?: Severity | null;
  status: Status;
  createdById: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type TAxiosMessageError = AxiosError & {
  response: {
    data: {
      message: string;
    };
  };
};
