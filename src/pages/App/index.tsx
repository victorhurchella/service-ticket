import { useAuth } from "@/services/context/useAuth";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import * as S from "../../styles/ui";

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <div>
      <S.HeaderBar>
        <S.Container>
          <S.HeaderInner>
            <strong>Service Ticket</strong>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {user && (
                <S.Badge>
                  <span style={{ color: "#000" }}>
                    {user.email} • {user.role}
                  </span>
                </S.Badge>
              )}

              {user && (
                <S.Button variant="secondary" onClick={handleLogout}>
                  Logout
                </S.Button>
              )}
            </div>
          </S.HeaderInner>
        </S.Container>
      </S.HeaderBar>

      {user && (
        <S.NavBar>
          <S.Container>
            <div style={{ display: "flex", gap: 8 }}>
              <Link to="/" search={{}} activeOptions={{ exact: true }}>
                Home
              </Link>

              <Link to="/create">Create</Link>

              <Link to="/tickets/$status" params={{ status: "DRAFT" }}>
                Draft
              </Link>

              <Link to="/tickets/$status" params={{ status: "REVIEW" }}>
                Review
              </Link>

              <Link to="/tickets/$status" params={{ status: "PENDING" }}>
                Pending
              </Link>

              <Link to="/tickets/$status" params={{ status: "OPEN" }}>
                Open
              </Link>

              <Link to="/tickets/$status" params={{ status: "CLOSED" }}>
                Closed
              </Link>

              {user.role === "MANAGER" && (
                <>
                  <Link to="/csv">CSV</Link>
                  <Link to="/automation">Automation</Link>
                </>
              )}
            </div>
          </S.Container>
        </S.NavBar>
      )}

      <main>
        <S.OutletContainer>
          <Outlet />
        </S.OutletContainer>
      </main>
    </div>
  );
}
