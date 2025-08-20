import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./services/api";
import { AuthProvider } from "./services/context/useAuth/provider";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

const router = createRouter({ routeTree });

// biome-ignore lint/style/noNonNullAssertion: root exists
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
