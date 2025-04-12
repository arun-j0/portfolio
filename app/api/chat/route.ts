import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import data from "@/data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Create a context string from your data
const createContextFromData = () => {
  const skills = data.technologies.skills.map((s) => s.name).join(", ");

  return `
    About Arun Kumar:
    - Full Stack Developer with a strong focus on Next.js, React, and AI integration
    - 1 year of experience building modern, performant web applications
    - Email: ${data.contact.email}

    Personal Mission:
    - I build and optimize #Next_js & #React Apps – creating #AI Powered Solutions
    - Passionate about developing intelligent applications that drive real business value

    Core Expertise:
    - Modern Web App Development: Next.js, React, TypeScript, TailwindCSS
    - Backend Engineering: FastAPI, Node.js, MongoDB, Supabase, Firebase
    - AI Integration: LLMs, AI agents, smart features that deliver value
    - Cloud & DevOps: GCP, Docker, GitHub Actions, CI/CD automation
    - UI/UX Excellence: ShadCN, Radix UI, Material UI

    AI Integration Capabilities:
    1. LLM Integration:
       - Custom AI-powered features for real-world applications
       - Intelligent assistant and automation systems
    2. Smart Backend Automation:
       - AI-enhanced workflows and data processing
    3. AI-Powered Interfaces:
       - Enhanced UX through contextual intelligence
       - Dynamic content rendering based on AI suggestions

    Notable Technical Stack:
    - Frontend: ${skills}
    - Backend: FastAPI, Flask, MongoDB, Supabase, Firebase
    - AI: OpenAI, custom AI agents, LLM integration
    - DevOps: GCP, Docker, GitHub Actions

    Services Offered:
    - Full-Stack Web Application Development
    - AI Feature Integration
    - Backend Architecture & APIs
    - Scalable & Maintainable Codebases
    - DevOps & Cloud Deployment Pipelines

    Why Work With Arun?
    - Combines deep technical expertise with practical business focus
    - Delivers scalable, maintainable, and intelligent solutions
    - Emphasizes modern design, performance, and real-world impact
    - Stays updated with the latest advancements in AI and web tech

    Portfolio Highlight:
    - Clean and maintainable code that stands the test of time
    - Built intelligent apps that leverage LLMs and cutting-edge AI tools
    - Built with performance, responsiveness, and user experience in mind
  `;
};

const MESSAGE_HISTORY_LIMIT = 5;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: `You are an AI assistant for Arun Kumar. Use the following information to help answer questions:
            ${createContextFromData()}
            
            Guidelines:
            - Be enthusiastic and professional
            - Provide specific, detailed examples from the context
            - Highlight relevant projects and technical capabilities
            - Be confident about AI integration abilities
            - Emphasize practical, real-world applications
            - Keep responses well-structured with clear sections
            - Use bullet points or numbered lists for better readability
            - Always mention relevant experience and past projects
            - For specific project inquiries, guide users to the contact form
            - Focus on Arun's expertise in Next.js, React, and advanced AI integration`,
        },
        {
          role: "model",
          parts:
            "I understand. I'll act as Arun's AI assistant, providing detailed, confident responses about her extensive experience in AI integration, Next.js development, and full-stack capabilities. I'll emphasize her practical approach and successful project implementations while maintaining professionalism and enthusiasm.",
        },
        ...messages.slice(-MESSAGE_HISTORY_LIMIT).map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: msg.content,
        })),
      ],
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
