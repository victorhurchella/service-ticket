import { createFileRoute } from "@tanstack/react-router";
import { AutomationPage } from "../components/Automation";

export const Route = createFileRoute("/automation")({
  component: AutomationPage,
});
