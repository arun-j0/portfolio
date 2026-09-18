# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the portfolio fully up to date — copy reflects "AI Software Engineer" and the five current projects, broken config (email, metadata, Resend build crash) is fixed, and the stack is on Next 16 / React 19 / `@google/genai`.

**Architecture:** All site copy lives in `data/index.ts`, `data/experience.ts`, and a handful of section components under `components/sections/`. The chat API (`app/api/chat/route.ts`) builds its system context from those same data modules so it never drifts from the visible site. Dependency upgrade is done last, as one task, and verified by a clean `pnpm build` with no env vars set.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, framer-motion 12, `@google/genai` (`gemini-2.5-flash`), Resend, pnpm.

## Global Constraints

- Package manager is **pnpm** only. `pnpm-lock.yaml` is the single lockfile; `bun.lockb` and `package-lock.json` are deleted.
- Role string is exactly **"AI Software Engineer"** wherever a role is named.
- Contact email is exactly `arun2310kumar2002@gmail.com`.
- Site URL comes from `process.env.NEXT_PUBLIC_SITE_URL` with fallback `"https://arunkumar.dev"`.
- Tailwind stays on **v3**. zod stays on **v3**.
- Experience dates in the working copy are the source of truth: `Aug 2024 - Present` (engineer), `Jun 2024 - Jul 2024` (intern).
- `pnpm build` must pass **with no `.env` present** after Task 1 and after every later task.
- No test framework exists in this repo; every task's verification is `pnpm build` (type-check + compile) plus the manual check listed in the task.
- Commit after every task with the trailer `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

---

### Task 1: Build fix, env example, contact email, lockfile cleanup

**Files:**
- Modify: `app/api/send/route.ts`
- Modify: `data/index.ts` (contact block, ~line 235)
- Create: `.env.example`
- Delete: `bun.lockb`, `package-lock.json`

**Interfaces:**
- Produces: `data.contact.email === "arun2310kumar2002@gmail.com"` (read by Task 6's chat context and by the send route).

- [ ] **Step 1: Confirm the build currently fails without env**

Run (PowerShell): `Remove-Item -ErrorAction SilentlyContinue .env,.env.local; pnpm build`
Expected: fails with `Error: Missing API key. Pass it to the constructor \`new Resend("re_123")\`` during "Collecting page data".

- [ ] **Step 2: Move Resend instantiation into the handler**

Replace the whole of `app/api/send/route.ts` with:

```ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import data from "@/data";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);

    const body = await request.json();
    const { from_name, from_email, message } = body;

    const emailData = await resend.emails.send({
      from: `${data.contact.name} <onboarding@resend.dev>`,
      to: [data.contact.email],
      subject: `New Contact Form Message from ${from_name}`,
      text: `
Name: ${from_name}
Email: ${from_email}
Message: ${message}
      `,
    });

    return NextResponse.json(emailData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Fix the contact email**

In `data/index.ts`, replace:

```ts
  contact: {
    email: "arun2310kumar2002.com", // Remember to update with your actual email
    name: "Arun Kumar",
  },
```

with:

```ts
  contact: {
    email: "arun2310kumar2002@gmail.com",
    name: "Arun Kumar",
  },
```

- [ ] **Step 4: Add `.env.example`**

Create `.env.example`:

```bash
# Google Gemini — https://aistudio.google.com/apikey
GEMINI_API_KEY=

# Resend — https://resend.com/api-keys
RESEND_API_KEY=

# Public URL of the deployed site (used for SEO metadata / OpenGraph)
NEXT_PUBLIC_SITE_URL=https://arunkumar.dev
```

- [ ] **Step 5: Remove stray lockfiles**

Run: `git rm -q bun.lockb package-lock.json`
Expected: both files gone; `git status` shows them as deleted.

- [ ] **Step 6: Verify build passes without env**

Run: `pnpm build`
Expected: ends with the route table (`○ /`, `ƒ /api/chat`, `ƒ /api/send`) and exit code 0. No "Missing API key" error.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "fix: lazy Resend init so build passes without env; fix contact email; pnpm-only lockfile

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

(This commit also picks up the already-edited projects/tech-stack data, new skill SVGs, `pnpm-workspace.yaml`, and the project-card height change from earlier — that's intended.)

---

### Task 2: Home hero + code-typing snippet

**Files:**
- Modify: `data/index.ts` (home block, lines 10–15)
- Modify: `components/sections/home/code-typing.tsx` (the `codeSnippet` constant, lines 10–29)

- [ ] **Step 1: Update hero description**

In `data/index.ts`, replace:

```ts
  home: {
    name: "Arun Kumar",
    description:
      "I Build & Optimize #Next_js & #React Apps - Creating #AI Powered Solutions", // # -> for css style, _ -> create space, __ -> creates dash
    cvLink: "#contact",
  },
```

with:

```ts
  home: {
    name: "Arun Kumar",
    description:
      "I Build #AI_Agents & #Full__Stack Apps with #Next_js, #Supabase & #FastAPI", // # -> for css style, _ -> create space, __ -> creates dash
    cvLink: "#contact",
  },
```

- [ ] **Step 2: Update the typing snippet**

In `components/sections/home/code-typing.tsx`, replace the `codeSnippet` constant with:

```ts
const codeSnippet = `// Welcome to my Portfolio! 🚀
import { AISoftwareEngineer } from 'arun-kumar';
import { NextJS, FastAPI, LangGraph } from '@/skills';

function buildIntelligentSystems() {
  const mySkills = {
    frontend: ["Next.js", "React Native", "TypeScript"],
    backend: ["FastAPI", "Supabase", "MongoDB"],
    ai: ["LangGraph", "LangChain", "OpenAI", "Gemini"],
    cloud: ["GCP", "Vercel", "Trigger.dev"],
    passion: "Shipping AI agents that do real work"
  };

  return {
    message: "Let's collaborate on your next project!",
    services: ["AI Agent Systems", "Full-Stack Apps", "Mobile Apps"],
    contact: "Scroll down to connect with me →"
  };
};`;
```

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: exit 0.

Run: `pnpm dev`, open http://localhost:3000. Hero subtitle reads `// I Build {AI Agents} & {Full-Stack} Apps with {Next js}, {Supabase} & {FastAPI}` with the braced words in the secondary colour; the typing animation shows the new snippet. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add data/index.ts components/sections/home/code-typing.tsx
git commit -m "content: update hero tagline and code snippet for AI engineer positioning

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: About section copy

**Files:**
- Modify: `components/sections/about/index.tsx` (the `<motion.p>` body, lines 59–119)

- [ ] **Step 1: Replace the paragraph body**

In `components/sections/about/index.tsx`, replace everything between `className="text-muted-foreground"\n          >` and `</motion.p>` with:

```tsx
            <strong>
              I&apos;m Arun Kumar — an AI Software Engineer who builds agent
              systems and production AI pipelines end-to-end.
            </strong>
            <br />
            <br />
            At Yuvabe I design and ship AI products from the canvas UI down to
            the background job runner: node-based content pipelines, multi-agent
            platforms, and HR automation — all backed by{" "}
            <strong>Next.js, Supabase, FastAPI, LangGraph</strong> and a
            multi-provider LLM layer. <br />
            <br />
            On the side I&apos;ve shipped a travel app to both app stores and
            rebuilt a manufacturing ERP that cut manual ops work by 60%. <br />
            <br />
            <span className="font-semibold">📌 What I Do Best:</span>
            <br />✅ <strong>AI agents & pipelines</strong> – LangGraph /
            LangChain multi-agent orchestration, async job systems (Trigger.dev,
            Supabase Realtime), and multi-provider LLM integration (OpenAI,
            Gemini, Groq).
            <br />✅ <strong>Full-stack Next.js</strong> – TypeScript, App
            Router, TanStack Query, Tailwind CSS and shadcn/ui.
            <br />✅ <strong>Mobile</strong> – React Native / Expo apps shipped
            to the App Store and Google Play.
            <br />✅ <strong>Backend</strong> – FastAPI, Supabase (Postgres,
            Auth, Storage, Edge Functions), MongoDB, and containerized
            microservices.
            <br />✅ <strong>Cloud & DevOps</strong> – GCP Cloud Run, Vercel,
            Docker and GitHub Actions for CI/CD.
            <br />
            <br />
            <span className="font-semibold">📌 Why Work With Me?</span>
            <br />
            🔹 I own the whole stack — UI, API, agents, infra — so nothing gets
            lost between teams.
            <br />
            🔹 I build for production: realtime status, retries, audit trails
            and error handling are part of the design, not an afterthought.
            <br />
            🔹 I keep up with the AI tooling landscape and pick what actually
            ships, not what&apos;s trending.
            <br />
            <br />
            <span className="font-semibold">📌 Let&apos;s Connect</span>
            <br />
            If you need someone who can take an AI product from idea to
            deployed, I&apos;d love to chat.
            <br />
            <a href="#contact" className="text-primary hover:underline">
              ✅ Get in Touch
            </a>
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: exit 0 (watch for unescaped `'` — every apostrophe in JSX text above uses `&apos;`).

- [ ] **Step 3: Commit**

```bash
git add components/sections/about/index.tsx
git commit -m "content: rewrite About section for AI engineer positioning

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Experience data

**Files:**
- Modify: `data/experience.ts`

**Interfaces:**
- Produces: `experience.jobs: { company, role, period, description, technologies: string[], link }[]` — unchanged shape, consumed by `components/sections/experience.tsx` and Task 8's chat context.

- [ ] **Step 1: Replace the file**

Replace the whole of `data/experience.ts` with:

```ts
export const experience = {
  jobs: [
    {
      company: "Yuvabe",
      role: "AI Software Engineer",
      period: "Aug 2024 - Present",
      description:
        "Build and ship AI products end-to-end. Designed CreativeOS, an agentic content pipeline (Script → Brand KB → Shots → Image → Video → Approval) with a node-based canvas UI, an async 3-phase Knowledge Base builder on Supabase Realtime, and Trigger.dev background jobs for image/video generation. Architected KittyKat, a multi-agent content platform on LangGraph/LangChain with a FastAPI orchestration backend and containerized microservices (ONNX/CLIP embeddings, thumbnailing, watermarking). Built Yuvabe ATS, an HR automation platform with resume parsing, AI match scoring and interview workflows on Supabase.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Supabase",
        "FastAPI",
        "LangGraph",
        "LangChain",
        "OpenAI",
        "Google GenAI",
        "MongoDB",
        "Trigger.dev",
        "GCP",
        "Docker",
      ],
      link: "https://www.yuvabestudios.com",
    },
    {
      company: "Yuvabe",
      role: "Software Engineering Intern",
      period: "Jun 2024 - Jul 2024",
      description:
        "Worked on AI-powered web application development. Gained hands-on experience with modern full stack technologies and cloud deployment.",
      technologies: ["Next.js", "React", "FastAPI", "MongoDB"],
      link: "https://www.yuvabestudios.com",
    },
  ],
};

export default experience;
```

- [ ] **Step 2: Fix the duplicate React key**

`components/sections/experience.tsx` uses `key={job.company}` — both entries are now exactly `"Yuvabe"` (the old one had a trailing space). Change line 31:

```tsx
            key={job.company}
```

to:

```tsx
            key={`${job.company}-${job.role}`}
```

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: exit 0.

Run: `pnpm dev`, scroll to Experience. Two cards; first reads "AI Software Engineer / Yuvabe / Aug 2024 - Present" with 12 badges. No React duplicate-key warning in the browser console. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add data/experience.ts components/sections/experience.tsx
git commit -m "content: update experience to AI Software Engineer with current project work

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Project card store links + TripKnot entry

**Files:**
- Modify: `components/sections/projects/project-card.tsx`
- Modify: `data/index.ts` (TripKnot project, id 4)

**Interfaces:**
- Produces: project type gains `appStoreLink?: string; playStoreLink?: string;` — Task 8's chat context reads these.

- [ ] **Step 1: Extend the card type and render store buttons**

Replace the whole of `components/sections/projects/project-card.tsx` with:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Play, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
type props = {
  project: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    githubLink?: string;
    previewLink: string;
    appStoreLink?: string;
    playStoreLink?: string;
  };
};

export default function ProjectCard({ project }: props) {
  return (
    <div className="w-full max-w-[650px] rounded-2xl bg-muted border sticky top-8">
      <div className="flex justify-between flex-shrink-0 px-4 pt-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe size={18} />
          <span>Web-Page</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block rounded-full size-3 bg-green-500 ml-auto" />
          <span className="block rounded-full size-3 bg-yellow-500" />
          <span className="block rounded-full size-3 bg-red-500 " />
        </div>
      </div>
      <div className="group relative h-[200px] overflow-hidden cursor-pointer rounded-lg m-2 border">
        <Image
          className="size-full object-cover object-top"
          src={project.image}
          alt={project.title}
          width={400}
          height={400}
        />
        <Link
          href={project.previewLink}
          target="_blank"
          className="size-full bg-black/50 absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
        <ExternalLink
          size={24}
          className="absolute top-4 right-4 opacity-90 hidden group-hover:block"
        />
      </div>
      <div className="px-4 py-2 w-full">
        <h2 className="text-xl capitalize font-bold my-3">{project.title}</h2>
        <p className="text-muted-foreground text-sm min-h-[150px] whitespace-pre-line">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 my-7">
          {project.githubLink && (
            <Button asChild variant="ghost" className="bg-muted-foreground/10">
              <Link href={project.githubLink} target="_blank">
                Git Hub
              </Link>
            </Button>
          )}
          {project.appStoreLink && (
            <Button asChild variant="ghost" className="bg-muted-foreground/10">
              <Link href={project.appStoreLink} target="_blank">
                <Smartphone size={16} className="mr-2" />
                App Store
              </Link>
            </Button>
          )}
          {project.playStoreLink && (
            <Button asChild variant="ghost" className="bg-muted-foreground/10">
              <Link href={project.playStoreLink} target="_blank">
                <Play size={16} className="mr-2" />
                Play Store
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update the TripKnot entry**

In `data/index.ts`, replace the `id: 4` project object with:

```ts
      {
        id: 4,
        title: "TripKnot: AI Travel Planning & Group Trips",
        description:
          "Travel smarter. Experience more. Live on the App Store and Google Play. Solo full-stack build: React Native/Expo app, Next.js admin and business portals, and an async FastAPI backend powering 25+ API modules. AI-generated day-by-day itineraries, curated trip packages, geospatial nearby-search and map clustering across 200+ destinations, \"Strangers Trip\" group matching with Aadhaar KYC, and real-time push notifications.\n\nTechnologies Used: React Native, Expo, Next.js, FastAPI, MongoDB (Beanie), Firebase, GCP Cloud Run, Vercel, Sentry, OpenAI, Groq.",
        image: project1,
        previewLink: "https://www.tripknot.in",
        appStoreLink: "https://apps.apple.com/in/app/tripknot/id6781707127",
        playStoreLink:
          "https://play.google.com/store/apps/details?id=com.tripknot.app",
      },
```

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: exit 0.

Run: `pnpm dev`, scroll to Projects. TripKnot card shows "App Store" and "Play Store" buttons; clicking each opens the store page in a new tab. Other cards show no buttons. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add components/sections/projects/project-card.tsx data/index.ts
git commit -m "feat: app/play store buttons on project cards; link TripKnot to live product

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: SEO metadata + chat greeting

**Files:**
- Modify: `app/layout.tsx` (the `metadata` export, lines 14–55)
- Modify: `components/sections/contact/chat-assistant.tsx` (lines 71 and 207 — two identical greeting strings)

- [ ] **Step 1: Replace the metadata export**

In `app/layout.tsx`, replace the `export const metadata: Metadata = { ... };` block with:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arunkumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arun Kumar | AI Software Engineer",
    template: "%s | Arun Kumar",
  },
  description:
    "AI Software Engineer building agent systems and production AI pipelines with Next.js, Supabase, FastAPI and LangGraph.",
  keywords: [
    "AI Software Engineer",
    "AI Agents",
    "LangGraph",
    "LangChain",
    "Next.js Developer",
    "Supabase",
    "FastAPI",
    "React Native",
    "Full Stack Developer",
    "TypeScript",
    "Arun Kumar",
  ],
  authors: [{ name: "Arun Kumar" }],
  creator: "Arun Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Arun Kumar Portfolio",
    title: "Arun Kumar | AI Software Engineer",
    description:
      "AI Software Engineer building agent systems and production AI pipelines with Next.js, Supabase, FastAPI and LangGraph.",
    images: [
      {
        url: "/imgs/website.webp",
        width: 1200,
        height: 630,
        alt: "Arun Kumar - AI Software Engineer",
      },
    ],
  },
};
```

- [ ] **Step 2: Update the chat greeting (both occurrences)**

In `components/sections/contact/chat-assistant.tsx`, replace **both** occurrences of:

```ts
        "Hi! I'm Arun's AI assistant. I can help you learn more about his expertise in Next.js, React, AI integration, and full-stack development. What would you like to know?",
```

with:

```ts
        "Hi! I'm Arun's AI assistant. Ask me about the AI agent systems, pipelines and full-stack apps Arun has built — CreativeOS, KittyKat, TripKnot and more. What would you like to know?",
```

Run: `grep -c "CreativeOS, KittyKat, TripKnot" components/sections/contact/chat-assistant.tsx`
Expected: `2`

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: exit 0.

Run: `pnpm dev`; view page source of http://localhost:3000. `<title>` is `Arun Kumar | AI Software Engineer`; `og:url` is `https://arunkumar.dev`. Stop dev.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/sections/contact/chat-assistant.tsx
git commit -m "content: AI Software Engineer SEO metadata, env-driven site URL, updated chat greeting

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Dependency upgrade — Next 16, React 19, ESLint 9

**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs`
- Delete: `.eslintrc.json`
- Create: `eslint.config.mjs`
- Modify: `hooks/use-cur-section.ts`
- Modify: every `useRef(null)` call site passed to `useCurSection` (`components/sections/home/index.tsx`, `about/index.tsx`, `projects/index.tsx`, `technologies/index.tsx`, `experience.tsx`, `contact/index.tsx` if present)

**Interfaces:**
- Produces: `useCurSection(ref: RefObject<Element | null>, amount?)` — same behaviour, wider ref type for React 19.

- [ ] **Step 1: Run the official codemod**

Run: `npx @next/codemod@canary upgrade latest`
Accept the prompts (Turbopack: yes; codemods: run all suggested). It rewrites `package.json` to Next 16 / React 19 and runs `pnpm install`.
Expected: finishes without error. `grep '"next"' package.json` shows a `16.x` version.

If the codemod is unavailable or fails, do it by hand:

```bash
pnpm add next@latest react@latest react-dom@latest
pnpm add -D eslint@latest eslint-config-next@latest @types/react@latest @types/react-dom@latest @types/node@latest typescript@latest
```

- [ ] **Step 2: Bump the remaining runtime deps**

```bash
pnpm add framer-motion@latest openai@latest resend@latest lucide-react@latest sharp@latest lottie-react@latest react-fast-marquee@latest react-resizable-panels@latest react-markdown@latest react-hook-form@latest @hookform/resolvers@latest @radix-ui/react-label@latest @radix-ui/react-separator@latest @radix-ui/react-slot@latest class-variance-authority@latest clsx@latest tailwind-merge@latest prism-react-renderer@latest prismjs@latest lodash@latest
pnpm add -D tailwindcss@3 postcss@latest tailwindcss-animate@latest @tailwindcss/typography@latest @types/lodash@latest @types/prismjs@latest
```

Expected: `pnpm install` output ends `Done`; no `ERR_PNPM_IGNORED_BUILDS`. Confirm `grep '"tailwindcss"' package.json` still shows `^3.`.

- [ ] **Step 3: Replace `next.config.mjs`**

`swcMinify`, `optimizeFonts` and `eslint` are no longer recognised in Next 16. Replace the file with:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  compress: true,
};

export default nextConfig;
```

- [ ] **Step 4: Move ESLint to flat config**

Run: `git rm -q .eslintrc.json`

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

In `package.json`, change the scripts block to:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
```

- [ ] **Step 5: Widen the section-ref hook for React 19 types**

Replace the whole of `hooks/use-cur-section.ts` with:

```ts
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { RefObject, useEffect } from "react";

export default function useCurSection(
  curSectionRef: RefObject<Element | null>,
  amount: number | "all" | "some" = "all"
) {
  const isInView = useInView(curSectionRef, { amount });
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const sectionId = curSectionRef.current?.id;
      if (isInView && sectionId) router.push(`#${sectionId}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timeout);
  });

  return isInView;
}
```

- [ ] **Step 6: Type every call-site ref**

Run: `grep -rn "useRef(null)" components`
For each hit, change `useRef(null)` to `useRef<HTMLDivElement>(null)` — except `components/sections/home/index.tsx`, whose ref is on a `<section>`: use `useRef<HTMLElement>(null)`.

- [ ] **Step 7: Build and fix what the type-checker reports**

Run: `pnpm build`
Expected: exit 0. Known likely errors and their fixes:
- `Type 'RefObject<null>' is not assignable ...` → a `useRef(null)` was missed in Step 6.
- In `components/ui/*.tsx`, `React.ElementRef` deprecation warnings are warnings only; if any becomes an error, replace `React.ElementRef<typeof X>` with `React.ComponentRef<typeof X>`.
- `Property 'params' ... Promise` — only if a dynamic route exists (it does not).

Run: `pnpm lint`
Expected: exit 0 (fix any reported `react-hooks/exhaustive-deps` errors by adding the listed deps; do not disable rules).

- [ ] **Step 8: Manual smoke test**

Run: `pnpm dev`. Check: hero typing animation plays; technologies marquee scrolls; project cards render (TripKnot store buttons present); experience timeline animates in; contact form shows validation on empty submit. Stop dev.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: upgrade to Next 16, React 19, ESLint 9 flat config; bump deps

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Chat route — `@google/genai` + data-driven context

**Files:**
- Modify: `package.json` (swap SDK)
- Modify: `app/api/chat/route.ts` (whole file)

**Interfaces:**
- Consumes: `data.projects.projects[]` with `title, description, previewLink, appStoreLink?, playStoreLink?` (Task 5); `experience.jobs[]` (Task 4); `data.contact.email` (Task 1).
- Produces: same HTTP contract as before — `POST { messages: {role, content}[] }` → `{ content: string }`.

- [ ] **Step 1: Swap the SDK**

```bash
pnpm remove @google/generative-ai
pnpm add @google/genai@latest
```

Expected: `grep genai package.json` shows `"@google/genai"`; `@google/generative-ai` is gone.

- [ ] **Step 2: Rewrite the route**

Replace the whole of `app/api/chat/route.ts` with:

```ts
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import data from "@/data";
import experience from "@/data/experience";

const MESSAGE_HISTORY_LIMIT = 5;

type ChatMessage = { role: "user" | "assistant"; content: string };

// Build the assistant's knowledge from the same data the site renders,
// so the chat never drifts from what's on the page.
const createContextFromData = () => {
  const skills = data.technologies.skills.map((s) => s.name).join(", ");

  const jobs = experience.jobs
    .map(
      (j) =>
        `- ${j.role} @ ${j.company} (${j.period}): ${j.description} Tech: ${j.technologies.join(", ")}.`
    )
    .join("\n");

  const projects = data.projects.projects
    .map((p) => {
      const links = [
        p.previewLink && p.previewLink !== "#" ? `Site: ${p.previewLink}` : null,
        p.appStoreLink ? `App Store: ${p.appStoreLink}` : null,
        p.playStoreLink ? `Play Store: ${p.playStoreLink}` : null,
      ]
        .filter(Boolean)
        .join(" | ");
      return `- ${p.title}\n  ${p.description.replace(/\n+/g, " ")}${links ? `\n  ${links}` : ""}`;
    })
    .join("\n");

  const since = experience.jobs[experience.jobs.length - 1].period.split(" - ")[0];

  return `
About Arun Kumar:
- AI Software Engineer at Yuvabe, working professionally since ${since}
- Builds agent systems and production AI pipelines end-to-end: Next.js front-ends, FastAPI / Supabase back-ends, LangGraph / LangChain agents, async job systems
- Also ships mobile apps (React Native / Expo) and freelance full-stack products
- Email: ${data.contact.email}

Experience:
${jobs}

Projects:
${projects}

Technologies: ${skills}
`;
};

const SYSTEM_INSTRUCTION = `You are an AI assistant for Arun Kumar's portfolio site. Use only the information below to answer questions about Arun.

${createContextFromData()}

Guidelines:
- Be enthusiastic and professional
- Give specific examples from the projects and experience above
- Highlight AI agent / pipeline work and full-stack capabilities
- Keep responses well-structured; use bullet points for lists
- If asked something not covered above, say you don't have that detail and suggest using the contact form
- For hiring or project inquiries, guide users to the contact form`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is not configured" },
        { status: 503 }
      );
    }

    const { messages } = (await req.json()) as { messages: ChatMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const recent = messages.slice(-MESSAGE_HISTORY_LIMIT);
    const history = recent.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const result = await chat.sendMessage({
      message: recent[recent.length - 1].content,
    });

    return NextResponse.json({ content: result.text ?? "" });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Verify build without env**

Run: `pnpm build`
Expected: exit 0 (no Gemini key needed at build time because the client is created inside the handler).

- [ ] **Step 4: Verify the chat answers from data**

Create `.env.local` with a real `GEMINI_API_KEY=...`. Run: `pnpm dev`. Open the chat assistant in the Contact section and ask "What is TripKnot?".
Expected: reply mentions the travel app and at least one of: itineraries, App Store, Play Store. Ask "Where does Arun work?" → reply says Yuvabe, AI Software Engineer. Stop dev. Delete `.env.local` (or keep it — it is git-ignored; confirm with `git status`).

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml app/api/chat/route.ts
git commit -m "feat: migrate chat to @google/genai (gemini-2.5-flash) with data-driven context

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: README rewrite

**Files:**
- Modify: `README.md` (whole file)

- [ ] **Step 1: Replace the README**

Replace the whole of `README.md` with:

````markdown
# Arun Kumar — Portfolio

Personal portfolio of Arun Kumar, AI Software Engineer. Built with Next.js 16 and React 19, with an AI chat assistant (Gemini) that answers questions about my work from the same data that renders the site.

<img src="public/imgs/website.webp" alt="Website screenshot" />

## Features

- 🤖 **AI chat assistant** — Gemini 2.5 Flash, grounded in `data/` so answers match the page
- ⌨️ **Code-typing hero** — animated snippet with Prism syntax highlighting
- 🗂️ **Projects** — CreativeOS, KittyKat, Yuvabe ATS, TripKnot (App Store / Play Store links), Auromix
- 🧭 **Experience timeline**, technologies marquee, and a contact form (Resend)
- 🌙 Dark theme, responsive, framer-motion + Lottie animations

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, shadcn/ui, Lucide icons |
| Animation | framer-motion 12, lottie-react |
| Forms | react-hook-form + zod |
| AI | `@google/genai` (gemini-2.5-flash) |
| Email | Resend |
| Package manager | pnpm |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in the keys below
pnpm dev                     # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Chat assistant — https://aistudio.google.com/apikey |
| `RESEND_API_KEY` | Contact form — https://resend.com/api-keys |
| `NEXT_PUBLIC_SITE_URL` | Deployed URL, used for SEO / OpenGraph metadata |

The site builds and runs without any of these set; the chat and contact form return a 503 until their key is provided.

### Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config, `eslint-config-next`) |

## Where the content lives

| What | File |
|---|---|
| Hero tagline, social links, projects, technologies, contact | `data/index.ts` |
| Experience timeline | `data/experience.ts` |
| About copy | `components/sections/about/index.tsx` |
| Hero code snippet | `components/sections/home/code-typing.tsx` |
| SEO metadata | `app/layout.tsx` |
| Chat assistant context | `app/api/chat/route.ts` (generated from the files above) |

Hero tagline styling: words prefixed with `#` are highlighted; `_` becomes a space and `__` a dash.

Project screenshots go in `public/projects-imgs/`, skill icons in `public/skills/` (SVG, white or colour — the site is dark-themed).

## License

MIT — see [LICENSE](LICENSE).
````

- [ ] **Step 2: Verify**

Open `README.md` in the IDE preview; tables render, no leftover references to `agakadela` or `GOOGLE_API_KEY`.

Run: `grep -c "agakadela\|GOOGLE_API_KEY" README.md`
Expected: `0`

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for current stack and content layout

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Final verification

**Files:** none modified.

- [ ] **Step 1: Clean build with no env**

Run (PowerShell): `Remove-Item -ErrorAction SilentlyContinue .env.local; Remove-Item -Recurse -Force .next; pnpm build`
Expected: exit 0.

- [ ] **Step 2: Lint**

Run: `pnpm lint`
Expected: exit 0, no errors.

- [ ] **Step 3: Full manual pass**

Run: `pnpm start` (serves the production build). Walk the page top to bottom:
- Hero: new tagline + snippet
- About: new copy, no "Flask"/"Material UI"
- Experience: AI Software Engineer, Aug 2024 – Present
- Projects: 5 cards, TripKnot has store buttons that open the stores
- Technologies: marquee includes Python, LangChain, LangGraph, PostgreSQL, Expo, Vercel, Sentry
- Contact: form validates; chat greeting mentions CreativeOS/KittyKat/TripKnot

- [ ] **Step 4: Confirm working tree is clean**

Run: `git status --short`
Expected: empty output.

- [ ] **Step 5: Report**

List the commits (`git log --oneline 1897b6c..HEAD`) and note the two follow-ups left for the owner: real project screenshots in `public/projects-imgs/`, and setting `NEXT_PUBLIC_SITE_URL` to the real domain at deploy time.
