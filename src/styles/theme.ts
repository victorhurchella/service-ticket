export const theme = {
  colors: {
    bg: "#ffffff",
    text: "#111827",
    muted: "#6b7280",
    primary: "#111827",
    border: "#e5e7eb",
    badge: "#e5e7eb",
    nav: "#111827",
    navText: "#cbd5e1",
  },
  radius: "8px",
} as const;

export type AppTheme = typeof theme;
