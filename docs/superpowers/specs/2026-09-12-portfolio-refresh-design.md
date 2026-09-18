# Portfolio Refresh — Design

**Date:** 2026-09-12
**Goal:** Bring the whole portfolio up to date — content reflects current work (AI Software Engineer at Yuvabe, five recent projects), broken config is fixed, and the dependency stack is on current majors.

Already done before this spec (kept as-is): `data/index.ts` projects list (CreativeOS, KittyKat, Yuvabe ATS, TripKnot, Auromix) and the technologies marquee; `pnpm-workspace.yaml` `allowBuilds: sharp: true`.

## 1. Content & config

### Positioning
Role is **AI Software Engineer** wherever the site names one: hero, `<title>` / OpenGraph metadata, chat-assistant context, README.

### Home (`data/index.ts` `home`, `components/sections/home/code-typing.tsx`)
- `home.description` → `"I Build #AI_Agents & #Full__Stack Apps with #Next_js, #Supabase & #FastAPI"` (existing `#`/`_`/`__` styling convention).
- Code-typing snippet `mySkills`:
  - `frontend: ["Next.js", "React Native", "TypeScript"]`
  - `backend: ["FastAPI", "Supabase", "MongoDB"]`
  - `ai: ["LangGraph", "LangChain", "OpenAI", "Gemini"]`
  - `cloud: ["GCP", "Vercel", "Trigger.dev"]`
  - `services: ["AI Agent Systems", "Full-Stack Apps", "Mobile Apps"]`
  - Import line → `import { AISoftwareEngineer } from 'arun-kumar';`

### About (`components/sections/about/index.tsx`)
Rewrite the copy; keep the existing structure (intro paragraph → "What I Do Best" ✅ list → "Why Work With Me" 🔹 list → "Let's Connect").
- Intro: AI Software Engineer building agent systems and production AI pipelines end-to-end.
- What I Do Best:
  1. **AI agents & pipelines** — LangGraph/LangChain multi-agent orchestration, async job systems (Trigger.dev, Supabase Realtime), multi-provider LLM integration.
  2. **Full-stack Next.js** — TypeScript, TanStack Query, Tailwind, shadcn/ui.
  3. **Mobile** — React Native/Expo, shipped to App Store and Play Store.
  4. **Backend** — FastAPI, Supabase (Postgres/Auth/Storage/Edge Functions), MongoDB, containerized microservices.
  5. **Cloud & DevOps** — GCP Cloud Run, Vercel, Docker, GitHub Actions.
- Remove Flask and Material UI mentions.

### Experience (`data/experience.ts`)
Exactly two entries:
1. **AI Software Engineer · Yuvabe · Sep 2024 – Present** — description summarising CreativeOS (agentic content pipeline, Supabase + Trigger.dev async systems), KittyKat (multi-agent platform, LangGraph, containerized FastAPI microservices), Yuvabe ATS (HR automation, AI match scoring). `technologies`: Next.js, TypeScript, Supabase, FastAPI, LangGraph, LangChain, OpenAI, Google GenAI, MongoDB, Trigger.dev, GCP, Docker.
2. **Software Engineering Intern · Yuvabe · Jun 2024 – Aug 2024** — unchanged.

TripKnot and Auromix are personal/freelance **projects**, not job entries.

### Projects (`components/sections/projects/project-card.tsx`, `data/index.ts`)
- Extend the card's project type with optional `appStoreLink?: string` and `playStoreLink?: string`.
- Render an "App Store" and a "Play Store" button (lucide `Apple` / `Play` icons, same `ghost` style as the GitHub button) when present.
- TripKnot entry:
  - `previewLink: "https://www.tripknot.in"`
  - `appStoreLink: "https://apps.apple.com/in/app/tripknot/id6781707127"`
  - `playStoreLink: "https://play.google.com/store/apps/details?id=com.tripknot.app"`
  - Description mentions the live product: tagline "Travel smarter. Experience more.", AI day-by-day itineraries, curated packages, "Strangers Trip" group matching.
- Project images: keep cycling `proj1–3.png` (user to replace later).

### Chat assistant (`app/api/chat/route.ts`)
- Build the context string from data, not hand-written prose:
  - Bio + role line, contact email.
  - Skills: `data.technologies.skills` names.
  - Experience: loop over `experience.jobs` → `role @ company (period): description`.
  - Projects: loop over `data.projects.projects` → `title: description` (+ links when present).
- Remove "1 year of experience"; state "since Jun 2024" derived from the earliest experience period.
- Migrate SDK (see §2).

### Contact / SEO / env
- `data.contact.email` → `arun2310kumar2002@gmail.com`.
- `app/layout.tsx`: `metadataBase` and `openGraph.url` → `process.env.NEXT_PUBLIC_SITE_URL ?? "https://arunkumar.dev"`; title/description → AI Software Engineer.
- Add `.env.example` with `GEMINI_API_KEY=`, `RESEND_API_KEY=`, `NEXT_PUBLIC_SITE_URL=`.

### Build fix (`app/api/send/route.ts`)
`new Resend(process.env.RESEND_API_KEY)` currently runs at module load and crashes `next build` when the key is absent. Instantiate inside the `POST` handler.

### README
Rewrite for this repo: name, AI Software Engineer positioning, accurate stack (after upgrades), pnpm-first setup, env var table, remove the template author's repo URL and screenshot reference if stale. Keep the license section.

### Lockfiles
Delete `bun.lockb` and `package-lock.json`; `pnpm-lock.yaml` is the only lockfile.

## 2. Dependency upgrades

**Path chosen:** Next 16 + React 19; Tailwind stays on v3.

### Targets
| Package | From | To |
|---|---|---|
| next | 14.2.3 | 16 (latest) |
| react / react-dom | 18 | 19 |
| @types/react / @types/react-dom | 18 | 19 |
| eslint-config-next | 14.2.3 | 16 |
| eslint | 8 | 9 (flat config) |
| @google/generative-ai | 0.2 | **replaced by** `@google/genai` (latest) |
| framer-motion | 11 | 12 (imports unchanged) |
| openai, resend, lucide-react, sharp, lottie-react, react-fast-marquee, react-resizable-panels, react-markdown, react-hook-form, @hookform/resolvers, @radix-ui/* | — | latest |
| zod | 3 | stay on 3 |
| tailwindcss, postcss, tailwindcss-animate, @tailwindcss/typography | — | latest **v3-compatible** |

### Migration steps
1. `npx @next/codemod@canary upgrade latest` (async request APIs; expected minimal here — no dynamic routes).
2. `next lint` removed in Next 16 → `lint` script becomes `eslint .`; replace `.eslintrc.json` with `eslint.config.mjs` using `eslint-config-next` flat presets.
3. Review `next.config.mjs` for removed options.
4. React 19 typing: `useRef(null)` → `useRef<HTMLDivElement>(null)` where passed to `useCurSection`; fix any `forwardRef` type complaints in `components/ui/*`.
5. Gemini: `new GoogleGenAI({ apiKey })`, `ai.chats.create({ model: "gemini-2.5-flash", history, config })`, `chat.sendMessage({ message })`. Same request/response shape to the client as today.

### Verification
- `pnpm install` clean (no ignored-build warnings).
- `pnpm build` passes with no env vars set (proves the Resend fix).
- `pnpm lint` clean.
- `pnpm dev` manual check: hero typing animation, technologies marquee, five project cards (TripKnot shows Store buttons), experience section, about copy, chat assistant returns an answer that mentions a project when asked, contact form validates.

## Out of scope
Tailwind 4, zod 4, new project screenshots, custom domain purchase.
