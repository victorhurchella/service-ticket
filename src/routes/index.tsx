import { Home } from "@/components/Home";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (
      !window.localStorage.getItem("token") &&
      location.pathname !== "/login"
    ) {
      throw redirect({ to: "/login" });
    }
  },
  component: Home,
});
