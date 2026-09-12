import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

// Optimize font loading by specifying only the subsets and display type needed
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap", // Use swap to prevent layout shifts
  preload: true,
  weight: ["400", "500", "600"],
  variable: "--font-fira-code",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <head />
      <body className={`${firaCode.className} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
