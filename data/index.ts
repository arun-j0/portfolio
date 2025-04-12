import { Github, Linkedin } from "lucide-react";

// You'll need to update these image imports with your own project images
import project1 from "@/public/projects-imgs/proj1.png";
import project2 from "@/public/projects-imgs/proj2.png";
import project3 from "@/public/projects-imgs/proj3.png";
import project4 from "@/public/projects-imgs/retrocech.webp";

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
        title: "Chat2Data: Conversational Database Assistant",
        description:
          "Built an AI-powered interface to interact with databases like MongoDB and Supabase using natural language. The system translates user queries into database operations and returns clean, readable responses.\n\nTechnologies Used: Next.js, React.js, Tailwind CSS, Hugging Face (Qwen), smolagents.",

        image: project1,
        previewLink: "#",
      },
      {
        id: 2,
        title: "VisionQuery: Multimodal Image Search",
        description:
          "Built a multimodal search engine that allows users to find visually similar images using either text input or an image upload. Leverages CLIP embeddings to enable cross-modal retrieval and stores vector representations in Pinecone for fast and scalable similarity search.\n\nTechnologies Used: React.js, FastAPI, CLIP (Huggingface), Pinecone, Tailwind CSS.",
        image: project2,
        previewLink: "#",
      },
      {
        id: 3,
        title: "FormForge: Multistep Form Code Generator",
        description:
          "Built a dynamic multistep form builder that generates copy-paste-ready React code using shadcn/ui components and React Hook Form. Users can visually design form steps, set field validation, and instantly preview or export the final code.\n\nTechnologies Used: Next.js, shadcn/ui, React Hook Form, Tailwind CSS, TypeScript.",
        image: project3,
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
        name: "tanstack",
        src: "/skills/tanstack.png",
        link: "https://tanstack.com/",
      },
      {
        id: 10,
        name: "zustand",
        src: "/skills/zustand.svg",
        link: "https://github.com/pmndrs/zustand",
      },
      {
        id: 11,
        name: "shadcn",
        src: "/skills/shadcn.png",
        link: "https://ui.shadcn.com/",
      },
      {
        id: 12,
        name: "fastapi",
        src: "/skills/fastapi.svg",
        link: "https://fastapi.tiangolo.com/",
      },
      {
        id: 13,
        name: "flask",
        src: "/skills/flask.svg",
        link: "https://flask.palletsprojects.com/",
      },
      {
        id: 14,
        name: "mongoDB",
        src: "/skills/mongoDB.svg",
        link: "https://en.wikipedia.org/wiki/MongoDB",
      },
      {
        id: 15,
        name: "supabase",
        src: "/skills/supabase.svg",
        link: "https://supabase.com/",
      },
      {
        id: 16,
        name: "firebase",
        src: "/skills/firebase.svg",
        link: "https://en.wikipedia.org/wiki/Firebase",
      },
      {
        id: 17,
        name: "gcp",
        src: "/skills/google-cloud.svg",
        link: "https://cloud.google.com/",
      },
      {
        id: 18,
        name: "docker",
        src: "/skills/docker.svg",
        link: "https://en.wikipedia.org/wiki/Docker_(software)",
      },
      {
        id: 19,
        name: "githubActions",
        src: "/skills/githubActions.svg",
        link: "https://github.com/features/actions",
      },
      {
        id: 20,
        name: "openai",
        src: "/skills/openai.svg",
        link: "https://openai.com/",
      },
    ],
  },
  contact: {
    email: "arun2310kumar2002.com", // Remember to update with your actual email
    name: "Arun Kumar",
  },
};

export default data;
