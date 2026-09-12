import { Github, Linkedin } from "lucide-react";

// You'll need to update these image imports with your own project images
import project1 from "@/public/projects-imgs/proj1.png";
import project2 from "@/public/projects-imgs/proj2.png";
import project3 from "@/public/projects-imgs/proj3.png";

const data = {
  home: {
    name: "Arun Kumar",
    description:
      "I Build & Optimize #Next_js & #React Apps - Creating #AI Powered Solutions", // # -> for css style, _ -> create space, __ -> creates dash
    cvLink: "#contact",
  },
  sidebar: {
    links: [
      {
        name: "github",
        link: "https://github.com/arun-j0",
        icon: Github,
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/arunakj",
        icon: Linkedin,
      },
    ],
  },

  projects: {
    projects: [
      {
        id: 1,
        title: "CreativeOS: AI-Driven Content Creation Pipeline",
        description:
          "Built an end-to-end AI content pipeline (Script → Brand KB → Shots → Image → Video → Approval) with a node-based canvas UI. Designed a 3-phase async Knowledge Base build system (research, parallelized extraction, finalize) with Supabase Realtime for live status and webhook-based error handling, using Trigger.dev as the background job runner for image/video generation.\n\nTechnologies Used: Next.js, Supabase (Postgres, Auth, Storage, Realtime, Edge Functions), Trigger.dev, Vercel.",
        image: project1,
        previewLink: "#",
      },
      {
        id: 2,
        title: "KittyKat: Multi-Agent Content & Asset Platform",
        description:
          "Architected an agent-first platform: Next.js frontend with CopilotKit agent UI, FastAPI backend for orchestration, and LangGraph/LangChain agent runtimes. Built containerized microservices for image/text embedding (ONNX/CLIP), thumbnailing, watermarking and brand-info extraction, with multi-provider GenAI and vector search.\n\nTechnologies Used: Next.js, FastAPI, LangGraph, LangChain, OpenAI, Google GenAI, ONNX, MongoDB, GCS, Firebase.",
        image: project2,
        previewLink: "#",
      },
      {
        id: 3,
        title: "Yuvabe ATS: Applicant Tracking System",
        description:
          "Built an HR automation platform covering the full candidate lifecycle: resume ingestion and parsing, AI-powered match scoring, shortlisting, and interview scheduling with automatic status transitions. Designed a paginated, filterable Supabase data layer with per-status counts and efficient queries that stay responsive on large candidate pools.\n\nTechnologies Used: Next.js 16, TypeScript, Supabase, OpenAI, Resend, pdf-lib, mammoth, TanStack Query, Zod.",
        image: project3,
        previewLink: "#",
      },
      {
        id: 4,
        title: "TripKnot: Travel Planning & Group Trip Platform",
        description:
          "Solo full-stack build of a multi-platform travel app: React Native/Expo mobile app, Next.js admin and business portals, and an async FastAPI backend powering 25+ API modules. Implemented geospatial nearby-search and map clustering across 200+ destinations, AI-generated itineraries, group trip coordination with Aadhaar KYC, and real-time push notifications.\n\nTechnologies Used: React Native, Expo, Next.js, FastAPI, MongoDB (Beanie), Firebase, GCP Cloud Run, Vercel, Sentry, OpenAI, Groq.",
        image: project1,
        previewLink: "#",
      },
      {
        id: 5,
        title: "Auromix: Manufacturing Production & Payroll ERP",
        description:
          "Rebuilt a legacy Firebase system into a Next.js + MongoDB ERP for garment manufacturing, cutting manual ops work by 60%. Designed a piece-rate payroll engine with batch payments and bank letter generation, a 3-tier RBAC system, a multi-step order approval state machine, and centralized audit logging with before/after diffs on every mutation.\n\nTechnologies Used: Next.js 16, TypeScript, MongoDB (Mongoose), NextAuth, TanStack Query, Recharts.",
        image: project2,
        previewLink: "#",
      },
    ],
  },
  technologies: {
    skills: [
      {
        id: 1,
        name: "html",
        src: "/skills/html.svg",
        link: "https://en.wikipedia.org/wiki/HTML",
      },
      {
        id: 2,
        name: "css",
        src: "/skills/css.svg",
        link: "https://en.wikipedia.org/wiki/CSS",
      },
      {
        id: 3,
        name: "javascript",
        src: "/skills/javascript.svg",
        link: "https://en.wikipedia.org/wiki/JavaScript",
      },
      {
        id: 4,
        name: "typescript",
        src: "/skills/typescript.svg",
        link: "https://en.wikipedia.org/wiki/TypeScript",
      },
      {
        id: 5,
        name: "react",
        src: "/skills/react.svg",
        link: "https://en.wikipedia.org/wiki/React_(JavaScript_library)",
      },
      {
        id: 6,
        name: "tailwind",
        src: "/skills/tailwind.svg",
        link: "https://en.wikipedia.org/wiki/Tailwind_CSS",
      },
      {
        id: 7,
        name: "nextJS",
        src: "/skills/nextJS.svg",
        link: "https://en.wikipedia.org/wiki/Next.js",
      },
      {
        id: 8,
        name: "reactNative",
        src: "/skills/reactNative.svg",
        link: "https://en.wikipedia.org/wiki/React_Native",
      },
      {
        id: 9,
        name: "expo",
        src: "/skills/expo.svg",
        link: "https://expo.dev/",
      },
      {
        id: 10,
        name: "tanstack",
        src: "/skills/tanstack.png",
        link: "https://tanstack.com/",
      },
      {
        id: 11,
        name: "zustand",
        src: "/skills/zustand.svg",
        link: "https://github.com/pmndrs/zustand",
      },
      {
        id: 12,
        name: "shadcn",
        src: "/skills/shadcn.png",
        link: "https://ui.shadcn.com/",
      },
      {
        id: 13,
        name: "python",
        src: "/skills/python.svg",
        link: "https://www.python.org/",
      },
      {
        id: 14,
        name: "fastapi",
        src: "/skills/fastapi.svg",
        link: "https://fastapi.tiangolo.com/",
      },
      {
        id: 15,
        name: "langchain",
        src: "/skills/langchain.svg",
        link: "https://www.langchain.com/",
      },
      {
        id: 16,
        name: "langgraph",
        src: "/skills/langgraph.svg",
        link: "https://www.langchain.com/langgraph",
      },
      {
        id: 17,
        name: "openai",
        src: "/skills/openai.svg",
        link: "https://openai.com/",
      },
      {
        id: 18,
        name: "postgresql",
        src: "/skills/postgresql.svg",
        link: "https://www.postgresql.org/",
      },
      {
        id: 19,
        name: "mongoDB",
        src: "/skills/mongoDB.svg",
        link: "https://en.wikipedia.org/wiki/MongoDB",
      },
      {
        id: 20,
        name: "supabase",
        src: "/skills/supabase.svg",
        link: "https://supabase.com/",
      },
      {
        id: 21,
        name: "firebase",
        src: "/skills/firebase.svg",
        link: "https://en.wikipedia.org/wiki/Firebase",
      },
      {
        id: 22,
        name: "gcp",
        src: "/skills/google-cloud.svg",
        link: "https://cloud.google.com/",
      },
      {
        id: 23,
        name: "vercel",
        src: "/skills/vercel.svg",
        link: "https://vercel.com/",
      },
      {
        id: 24,
        name: "docker",
        src: "/skills/docker.svg",
        link: "https://en.wikipedia.org/wiki/Docker_(software)",
      },
      {
        id: 25,
        name: "githubActions",
        src: "/skills/githubActions.svg",
        link: "https://github.com/features/actions",
      },
      {
        id: 26,
        name: "sentry",
        src: "/skills/sentry.svg",
        link: "https://sentry.io/",
      },
    ],
  },
  contact: {
    email: "arun2310kumar2002@gmail.com",
    name: "Arun Kumar",
  },
};

export default data;
