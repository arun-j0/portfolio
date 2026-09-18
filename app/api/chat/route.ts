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
