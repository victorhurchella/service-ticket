import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root { font-family: system-ui, Arial, sans-serif; }
  body { margin: 0; background: ${"${theme.colors.bg}"}; color: ${"${theme.colors.text}"}; }
  * { box-sizing: border-box; }
`;
