import { AppLayout } from "@/pages/App";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AppLayout />
      {import.meta.env.VITE_NODE_ENV === "development" && (
        <TanStackRouterDevtools />
      )}
    </>
  ),
});
