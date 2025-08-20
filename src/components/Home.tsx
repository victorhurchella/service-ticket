import * as S from "@/styles/ui";
import { Link } from "@tanstack/react-router";

export function Home() {
  return (
    <div>
      <S.Card style={{ marginBottom: 16 }}>
        <h1 style={{ marginTop: 0 }}>
          Service Ticket — Thanks for the opportunity! 🎯
        </h1>
        <p>
          This app demonstrates an end-to-end ticket workflow with a{" "}
          <strong>NestJS + Prisma + PostgreSQL</strong> backend and a{" "}
          <strong>React + TypeScript + TanStack Router + TanStack Query</strong>{" "}
          frontend, using <strong>styled-components</strong> for styling.
        </p>
        <p>
          The project is <em>backend-first</em> as requested: solid business
          rules, a CSV export/import loop, and an AI severity suggestion with
          deterministic fallback to guarantee a valid <code>Severity</code>{" "}
          every time.
        </p>
      </S.Card>

      <S.Card>
        <h2 style={{ marginTop: 0 }}>What’s included</h2>
        <ul>
          <li>
            Role-based UI: actions differ for <em>Associate</em> vs{" "}
            <em>Manager</em>.
          </li>
          <li>
            AI Suggest (<code>/ai/severity-suggestion</code>): OpenAI when
            configured; deterministic heuristic fallback otherwise.
          </li>
          <li>
            Human-readable numbering: <code>TKT-YYYY-XXXXXX</code> (sequential
            per year).
          </li>
          <li>
            CSV loop: export <strong>Pending</strong>, auto-process (~33/33/34),
            and import updating <em>only</em> the ticket status.
          </li>
          <li>
            Automation: “Run Now” button and nightly endpoint protected by a
            secret.
          </li>
          <li>
            Soft delete allowed only before <strong>PENDING</strong>.
          </li>
        </ul>
      </S.Card>

      <S.Card style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Suggested test flow</h2>
        <ol>
          <li>
            As <strong>Associate</strong>, create a ticket at{" "}
            <Link to="/create">Create</Link> and (optionally) click{" "}
            <em>AI Suggest</em>.
          </li>
          <li>
            As <strong>Manager</strong>, open{" "}
            <Link to="/tickets/$status" params={{ status: "DRAFT" }}>
              Draft
            </Link>{" "}
            and either:
            <ul>
              <li>
                <em>Approve</em> → status becomes <strong>Pending</strong>.
              </li>
              <li>
                <em>Change Severity</em> (with reason): if increased, status
                becomes
                <strong> Review</strong> for the Associate to revisit.
              </li>
            </ul>
          </li>
          <li>
            In <strong>Review</strong>, editing title/description returns the
            ticket to
            <strong> Draft</strong>.
          </li>
          <li>
            In <Link to="/csv">CSV</Link>: <em>Export Pending</em> →{" "}
            <em>Auto-Process</em> → <em>Import Processed</em>. The system only
            changes <code>status</code> and keeps history.
          </li>
          <li>
            In <Link to="/automation">Automation</Link>: use <em>Run Now</em> to
            simulate the nightly job (export → process → import).
          </li>
        </ol>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to="/create">
            <S.Button>Create Ticket (Associate)</S.Button>
          </Link>
          <Link to="/tickets/$status" params={{ status: "DRAFT" }}>
            <S.Button variant="secondary">Review Draft (Manager)</S.Button>
          </Link>
          <Link to="/csv">
            <S.Button>CSV</S.Button>
          </Link>
          <Link to="/automation">
            <S.Button variant="secondary">Automation</S.Button>
          </Link>
        </div>
      </S.Card>

      <S.Card style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Technical notes & trade-offs</h2>
        <ul>
          <li>
            Frontend intentionally simple (per assessment), but with clean,
            scalable structure.
          </li>
          <li>
            TanStack Query centralizes fetching/caching and keeps UI in sync
            with API.
          </li>
          <li>
            Styled-components for localized styling without global CSS leakage.
          </li>
          <li>
            AI path guarantees a valid severity even when the LLM is
            unavailable.
          </li>
          <li>
            CSV auto-processing uses a stable partition (~33/33/34) to mirror
            the spec’s example.
          </li>
          <li>
            Backend ready for serverless containers (e.g., AWS Fargate) with
            scale-to-zero principles.
          </li>
        </ul>
        <p style={{ color: "#6b7280" }}>
          I’m happy to answer questions or extend any part of this solution.
          Thanks again for your time! 🙌
        </p>
      </S.Card>
    </div>
  );
}
