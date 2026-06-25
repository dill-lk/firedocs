# Firedocs — Project Brief \& Build Prompt

## What is Firedocs?

Firedocs is an AI-powered developer documentation workspace. Developers type a
prompt or paste a code snippet, and Firedocs generates structured documentation —
API references, architecture diagrams, technical specs, README files — instantly.
Everything lives in an organized workspace they can share publicly or keep private.

**One-liner:** "Generate developer docs in seconds, not hours."

\---

## Core value proposition

* Developers hate writing docs. Firedocs makes it instant.
* AI generates Markdown + Mermaid diagrams from a single prompt.
* Clean workspace to organize, version, and share docs publicly.
* Designed for solo devs and small teams — not enterprise bloat.

\---

## Target users

* Solo developers building side projects and OSS
* Small startup engineering teams (2–10 devs)
* Freelancers documenting client projects
* Technical writers needing a faster first draft

\---

## Tech stack

|Layer|Choice|Why|
|-|-|-|
|Framework|Next.js 15 (App Router)|SSR, API routes, file-based routing|
|Styling|Tailwind CSS v4|Fast, consistent, dark mode native|
|Auth|Supabase Auth (GitHub OAuth)|Devs already have GitHub|
|Database|Supabase Postgres|Workspaces, docs, users, versions|
|AI|Anthropic Claude API (claude-sonnet-4-6)|Best for structured doc generation|
|Editor|CodeMirror 6|Lightweight, extensible Markdown editor|
|Diagrams|Mermaid.js|Flowcharts, ERDs, sequence diagrams|
|Payments|Stripe|Subscriptions + usage billing|
|Hosting|Vercel|Zero-config Next.js deploy|

\---

## Design system

check design.md and skill.md

\---

## Pricing tiers

|Tier|Price|Limits|
|-|-|-|
|Free|$0|3 workspaces, 20 AI generates/month|
|Pro|$19/month|Unlimited workspaces + generates, custom domain, private docs|
|Team|$49/month|5 seats, shared workspaces, priority support|

\---

## Database schema (Supabase)

```sql
-- Users (extended from Supabase auth.users)
profiles (id uuid PK, username text, plan text default 'free', ai\_credits int default 20, created\_at timestamptz)

-- Workspaces
workspaces (id uuid PK, owner\_id uuid FK, name text, slug text unique, is\_public bool default false, created\_at timestamptz)

-- Docs
docs (id uuid PK, workspace\_id uuid FK, title text, content text, doc\_type text, is\_published bool default false, published\_slug text unique, created\_at timestamptz, updated\_at timestamptz)

-- Versions
doc\_versions (id uuid PK, doc\_id uuid FK, content text, created\_at timestamptz)

-- Workspace members (for Team plan)
workspace\_members (workspace\_id uuid FK, user\_id uuid FK, role text, joined\_at timestamptz)
```

\---

## MVP feature list (Phase 1 — ship in 3 weeks)

### Must have

* \[ ] GitHub OAuth login via Supabase
* \[ ] Create / rename / delete workspaces
* \[ ] Create / edit docs with CodeMirror Markdown editor
* \[ ] Mermaid diagram live preview panel
* \[ ] AI generate via slash commands: `/api-doc`, `/diagram`, `/readme`, `/spec`
* \[ ] Claude API integration with per-user rate limiting
* \[ ] Sidebar file tree — organize docs within workspace
* \[ ] Auto-save every 30 seconds

### Phase 2 (week 4–6)

* \[ ] Public shareable link — firedocs.dev/p/\[slug]
* \[ ] GitHub repo sync
* \[ ] Export to PDF / MDX / HTML
* \[ ] Stripe billing — Free / Pro / Team
* \[ ] Version history

### Phase 3 (week 7–9)

* \[ ] Templates library
* \[ ] Custom domain (Pro)
* \[ ] Keyboard shortcuts
* \[ ] Landing page + Product Hunt launch

\---

## AI prompt templates (Claude API)

### /api-doc

```
You are a technical documentation writer. Given the following API endpoint or code,
generate a complete API reference document in Markdown format. Include:
- Overview section
- Endpoint URL and method (if applicable)
- Request parameters table (name, type, required, description)
- Response schema with example JSON
- Code examples in curl, JavaScript, and Python
- Error responses table

Input: {user\_input}
```

### /diagram

```
You are a software architect. Given the following description, generate a Mermaid.js
diagram. Choose the most appropriate diagram type (flowchart, sequenceDiagram, erDiagram,
or graph). Return ONLY the raw Mermaid code block, no explanation.

Input: {user\_input}
```

### /readme

```
You are a developer advocate. Given the following project description or code, generate
a complete README.md. Include: project title, one-line description, features list,
installation steps, usage examples, and license section. Use clear, friendly language.

Input: {user\_input}
```

### /spec

```
You are a senior software engineer writing a technical specification. Given the following
feature description, generate a structured spec document with: overview, goals,
non-goals, technical approach, data model changes, API changes, open questions.

Input: {user\_input}
```

\---

## Folder structure

```
firedocs/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (app)/
│   │   ├── dashboard/page.tsx
│   │   ├── workspace/\[slug]/page.tsx
│   │   └── workspace/\[slug]/doc/\[id]/page.tsx
│   ├── api/
│   │   ├── generate/route.ts       ← Claude API calls
│   │   ├── docs/route.ts
│   │   └── workspaces/route.ts
│   └── p/\[slug]/page.tsx           ← Public doc viewer
├── components/
│   ├── editor/
│   │   ├── MarkdownEditor.tsx      ← CodeMirror wrapper
│   │   ├── DiagramPreview.tsx      ← Mermaid renderer
│   │   └── SlashMenu.tsx           ← /command palette
│   ├── workspace/
│   │   ├── Sidebar.tsx
│   │   ├── DocTree.tsx
│   │   └── WorkspaceHeader.tsx
│   └── ui/                         ← Shared UI primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── claude.ts                   ← Anthropic SDK wrapper
│   └── prompts.ts                  ← All AI prompt templates
├── hooks/
│   ├── useDoc.ts
│   ├── useWorkspace.ts
│   └── useAI.ts
└── types/
    └── index.ts
```

\---

## Master build prompt

Copy this into a new Claude Code session or chat to start building:

\---

```
I am building Firedocs — an AI-powered developer documentation workspace.
Solo developer project. Here is the full spec:

PRODUCT:
- Developers type a prompt or paste code → AI generates API docs, architecture diagrams, 
  README files, technical specs instantly
- Organized workspace (folders + docs) they can share publicly
- Slash command system: /api-doc, /diagram, /readme, /spec

TECH STACK:
- Next.js 15 App Router
- Tailwind CSS v4
- Supabase (Auth with GitHub OAuth + Postgres database)
- Anthropic Claude API (claude-sonnet-4-6) for AI generation
- CodeMirror 6 for the Markdown editor
- Mermaid.js for diagram rendering
- Stripe for billing
- Vercel for deployment

DESIGN:
- Dark-first, cinematic aesthetic
- Background: #06070d, Surface: #0e0f1a, Border: #1a1b2e
- Gold accent: #c9a84c (used sparingly — CTAs, active states only)
- Text: #f0ede6 primary, #6b6d7e muted
- Fonts: Syne (headings), Inter (body), JetBrains Mono (code/editor)
- No gradients on backgrounds. Flat, clean, editorial.

DATABASE (Supabase):
profiles (id, username, plan, ai\_credits, created\_at)
workspaces (id, owner\_id, name, slug, is\_public, created\_at)
docs (id, workspace\_id, title, content, doc\_type, is\_published, published\_slug, created\_at, updated\_at)
doc\_versions (id, doc\_id, content, created\_at)
workspace\_members (workspace\_id, user\_id, role, joined\_at)

PHASE 1 MVP (build this now):
1. GitHub OAuth login page — clean, minimal, just the Firedocs logo + "Continue with GitHub" button
2. Dashboard — list of user's workspaces, create new workspace button
3. Workspace view — sidebar with doc tree, main editor area
4. Editor — CodeMirror Markdown editor with split-pane Mermaid diagram preview
5. Slash command palette — /api-doc, /diagram, /readme, /spec triggers Claude API
6. Auto-save every 30 seconds to Supabase

CLAUDE API INTEGRATION:
- POST /api/generate — takes {command, input} → returns generated Markdown
- Rate limit: check profiles.ai\_credits before each call, decrement after
- Use claude-sonnet-4-6 model, max\_tokens 2000
- Prompt templates in lib/prompts.ts

START BY:
1. Scaffold Next.js 15 project with Tailwind v4
2. Set up Supabase client (lib/supabase/client.ts and server.ts)
3. Implement GitHub OAuth login page with the design system above
4. Create the SQL schema in Supabase
5. Build the dashboard page

Keep all components clean, typed with TypeScript. Use server components where possible,
client components only where interactivity is needed. Follow the folder structure:

app/(auth)/login, app/(app)/dashboard, app/(app)/workspace/\[slug], 
app/api/generate, components/editor, components/workspace, lib/claude.ts, lib/prompts.ts

Build Phase 1 completely before moving to Phase 2.
```

```

