# Service Ticket Web (React + TS + TanStack Router + Query)

A minimal, test-friendly UI that showcases the backend capabilities.

## Stack

- **React 18 + TypeScript**
- **TanStack Router** (code-driven routes)
- **TanStack Query** (fetching & caching)
- **styled-components** (scoped styling)
- **Vite** (dev/build)
- **Biome** (format/lint)

## Environment

Create `.env.local`:

```
VITE_API_URL=http://localhost:8080
```

Ensure the backend enables CORS for Front-end URL.

## Install & Run

```bash
yarn
yarn dev
```

## Demo Credentials

- **Associate** — `associate@example.com` / `Password123!`
- **Manager** — `manager@example.com` / `Password123!`

## Features (mapped to assessment)

- **Role-based UI** (Associate vs Manager) — buttons and links change by role.
- **Create Ticket** with **AI Suggest** (OpenAI when configured on backend; deterministic heuristic otherwise).
- **Review flow**:
  - Manager approves **DRAFT** → **PENDING**
  - Manager increases severity → **REVIEW**
  - Editing a ticket in **REVIEW** returns it to **DRAFT**
- **Soft delete** allowed only before **PENDING**.
- **CSV** page:
  - Export **PENDING** → Auto-Process (~33/33/34) → Import Processed
  - Import updates **only** `status`
- **Automation** page:
  - “Run Now” → triggers export→process→import on the backend.

## Routes

- `/login`
- `/` (Home — instructions & quick links)
- `/create`
- `/tickets/:status` — `DRAFT | REVIEW | PENDING | OPEN | CLOSED`
- `/csv` (Manager)
- `/automation` (Manager)

## Build & Preview

```bash
yarn build
yarn preview
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, S3+CloudFront). Make sure `VITE_API_URL` points to the deployed API and CORS is configured accordingly.

## Notes & Trade-offs

- UI intentionally simple, but the **architecture is clean** and easy to extend.
- TanStack Query centralizes data fetching/cache and keeps UI in sync with API.
- styled-components provides localized styling without global CSS leakage.
- Home page includes a suggested testing flow to streamline reviewer experience.

---

**Thank you for reviewing this solution!**
