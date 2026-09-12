"use client";
import useCurSection from "@/hooks/use-cur-section";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import profileImage from "@/public/imgs/arun.png"; // Update with your image path

export default function AboutSection() {
  const ref = useRef(null);
  useCurSection(ref, 0.1);
  return (
    <div
      ref={ref}
      id="about"
      className="w-full py-12 my-32 bg-muted text-sm md:text-base"
    >
      <h1 className="text-center text-3xl md:text-5xl mb-12">
        <span className="text-gradient-primary">{"{ "}</span>
        About Me
        <span className="text-gradient-primary">{" }"}</span>
      </h1>

      <div className="flex gap-9 items-center flex-col w-10/12 mx-auto p-5 rounded-lg container">
        <div className="relative flex-shrink-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeIn" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-primary opacity-50 size-[120px] rounded-full blur-3xl"
          />
          <motion.div
            initial={{ x: "-200%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-full size-[200px] bg-gradient-primary p-0.5"
          >
            <Image
              className="size-full rounded-full grayscale-0 object-cover"
              width={600}
              height={600}
              alt="about profile image"
              src={profileImage}
            />
          </motion.div>
        </div>

        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-xl md:text-3xl font-bold">
            <span className="text-secondary">{"< "}</span>
            <span className="text-gradient-secondary">Who am I</span>
            <span className="text-secondary">{" />"}</span>
          </h2>
          <motion.p
            initial={{ y: "-20%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, ease: "easeIn", duration: 0.5 }}
            className="text-muted-foreground"
          >
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
          </motion.p>
        </div>
      </div>
    </div>
  );
}
