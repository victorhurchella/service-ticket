import styled from "styled-components";

export const Container = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const HeaderBar = styled.header`
  background: ${({ theme }) => theme.colors.nav};
  color: white;
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
`;

export const NavBar = styled.nav`
  margin-bottom: 32px;
  background: ${({ theme }) => theme.colors.nav};

  a {
    color: ${({ theme }) => theme.colors.navText};
    text-decoration: none;
    padding: 10px 12px;
    display: inline-block;
  }
  a[aria-current="page"],
  a:hover {
    color: white;
    border-bottom: 4px solid white;
  }
`;

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 12px;
  background: white;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 6px;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ variant, theme }) =>
    variant === "secondary" ? "white" : theme.colors.primary};
  color: ${({ variant, theme }) =>
    variant === "secondary" ? theme.colors.primary : "white"};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  height: 36px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 6px 8px;
    font-size: 14px;
  }
`;

export const Badge = styled.span`
  margin: 8px 0;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.badge};
  font-size: 12px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(${({ cols = 1 }) => cols}, minmax(0, 1fr));
`;

export const OutletContainer = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

export const RowData = styled.div`
  display: flex;
  gap: 8px;
`;
