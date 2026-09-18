# Makoy AI — Phase 1 scaffold

This is the Phase 1 foundation from the Makoy AI build plan: project setup,
authentication, database, and the dashboard shell. It's real, runnable code —
not a mockup — but it's only the first of 7 phases. See
`makoy-ai-build-prompts.md` (from the earlier conversation) for Phases 2–7.

## What's here

- Next.js 14 (App Router) + TypeScript + Tailwind, dark enterprise UI
- Prisma schema: `User`, `Organization`, `OrganizationMember` (with roles),
  `UserPreference`, plus the tables Auth.js needs
- Auth.js (NextAuth) with email/password credentials, sessions carrying the
  user's org memberships and roles
- Landing page, sign in / sign up, and an authenticated dashboard shell with
  the sidebar nav (Dashboard, Projects, AI Workspace, GitHub, Deployments,
  Settings) — the non-Dashboard pages are just nav links for now; Phase 2
  builds their content

## Run it locally

1. Install dependencies:
   ```
   npm install
   ```

2. Get a Postgres database. Easiest options: [Vercel Postgres](https://vercel.com/storage/postgres),
   [Neon](https://neon.tech), or [Supabase](https://supabase.com) all have
   free tiers and give you a `DATABASE_URL` in under a minute.

3. Copy the env file and fill it in:
   ```
   cp .env.example .env
   ```
   - `DATABASE_URL` — from step 2
   - `NEXTAUTH_SECRET` — run `openssl rand -base64 32` and paste the output
   - `NEXTAUTH_URL` — leave as `http://localhost:3000` for local dev

4. Push the schema to your database:
   ```
   npx prisma migrate dev --name init
   ```

5. Run it:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000`, create a workspace, and you should land
   on the dashboard.

## Deploy to Vercel

1. Push this folder to a **private** GitHub repo.
2. Import the repo in Vercel.
3. Add the same three environment variables from `.env` in the Vercel
   project settings (use your production `DATABASE_URL`, and set
   `NEXTAUTH_URL` to your actual Vercel domain).
4. Deploy. Vercel runs `npm run build` automatically.
5. Run the migration against your production database once:
   ```
   DATABASE_URL="<production url>" npx prisma migrate deploy
   ```

## Continuing with Claude Code

Open this folder in Claude Code and paste the "SHARED CONTEXT" block from
`makoy-ai-build-prompts.md`, then Phase 2 (Projects, files, AI chat). Claude
Code will be working against a real running app instead of starting from
nothing.

## Known limitations (Phase 1 only)

- No GitHub integration yet (Phase 4)
- No AI chat or agent yet (Phases 2–3)
- No deployment pipeline UI yet (Phase 5)
- No audit log / admin dashboard yet (Phase 6)
- No automated tests yet (Phase 7)
- Credentials auth only — add an OAuth provider later if you want
  Google/Microsoft sign-in for employees
