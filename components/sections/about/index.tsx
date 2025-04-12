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
              I&apos;m Arun Kumar — I develop modern, performant applications
              with a focus on AI integration.
            </strong>
            <br />
            <br />I build comprehensive full-stack solutions with{" "}
            <strong>
              Next.js, React, TypeScript, TanStack Query, Tailwind CSS
            </strong>
            , and integrate AI capabilities using the latest tools and
            frameworks. <br />
            <br />
            My expertise spans both frontend and backend development —{" "}
            <strong>
              creating intuitive UIs, optimizing performance, implementing AI
              features, and building scalable backend architectures
            </strong>{" "}
            that deliver real business value. <br />
            <br />
            I take pride in creating clean, maintainable code that stands the
            test of time.
            <br />
            <br />
            <span className="font-semibold">📌 What I Do Best:</span>
            <br />✅ <strong>Modern React applications</strong> – Building
            performant, responsive applications with Next.js, React, and
            TypeScript.
            <br />✅ <strong>UI/UX excellence</strong> – Creating intuitive
            interfaces with Tailwind CSS and various UI libraries like shadcn,
            Radix UI, and Material UI.
            <br />✅ <strong>Backend development</strong> – FastAPI, Flask,
            MongoDB, Supabase, and Firebase for scalable backend solutions.
            <br />✅ <strong>AI integration</strong> – Implementing LLMs, AI
            agents, and intelligent features that provide real value.
            <br />✅ <strong>DevOps & deployment</strong> – GCP, GitHub Actions,
            Docker for seamless deployment and CI/CD pipelines.
            <br />
            <br />
            <span className="font-semibold">📌 Why Work With Me?</span>
            <br />
            🔹 I combine deep technical expertise with a focus on business
            outcomes. Your application should not just work well, but deliver
            measurable value.
            <br />
            🔹 I stay at the cutting edge of technology, particularly in AI
            integration, ensuring your solutions leverage the latest
            advancements.
            <br />
            🔹 I build with scalability and maintainability in mind, creating
            solutions that can grow with your business and adapt to changing
            requirements.
            <br />
            <br />
            <span className="font-semibold">📌 Let&apos;s Connect</span>
            <br />
            If you're looking for a developer who can bring your ideas to life
            with modern tech and AI capabilities, I'd love to chat.
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
