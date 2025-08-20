import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../components/Login";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
