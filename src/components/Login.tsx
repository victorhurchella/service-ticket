import { useAuth } from "@/services/context/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Button, Card, Grid, Input } from "../styles/ui";

export function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("associate@example.com");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate({ to: "/" });
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <Card style={{ maxWidth: 420, margin: "48px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <Grid cols={1}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Badge style={{ color: "crimson", background: "#fde2e2" }}>
              {error}
            </Badge>
          )}

          <Button type="submit">Login</Button>

          <Badge>
            Try with: "associate@example.com" or "manager@example.com"
          </Badge>
        </Grid>
      </form>
    </Card>
  );
}
