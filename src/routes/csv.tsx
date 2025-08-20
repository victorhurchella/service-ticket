import { createFileRoute } from "@tanstack/react-router";
import { CsvPage } from "../components/CSV";

export const Route = createFileRoute("/csv")({
  component: CsvPage,
});
