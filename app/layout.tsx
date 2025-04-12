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

export const metadata: Metadata = {
  metadataBase: new URL("https://arunkumar.portfolio.com"),
  title: {
    default: "Arun Kumar | Software Engineer | Full Stack Developer",
    template: "%s | Arun Kumar",
  },
  description:
    "Full Stack Product Engineer specializing in Next.js, React, and AI Integration. Expert in building high-performance web applications with modern technologies.",
  keywords: [
    "Next.js Developer",
    "React Developer",
    "AI Integration",
    "Full Stack Developer",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "Frontend Developer",
    "Software Engineer",
    "Web Applications",
    "Performance Optimization",
    "Arun Kumar",
  ],
  authors: [{ name: "Arun Kumar" }],
  creator: "Arun Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agakadela.com",
    siteName: "Arun Kumar Portfolio",
    title: "Arun Kumar | Full Stack Product Engineer",
    description:
      "Full Stack Product Engineer specializing in Next.js, React, and AI Integration. Building high-performance web applications.",
    images: [
      {
        url: "/imgs/website.webp",
        width: 1200,
        height: 630,
        alt: "Arun Kumar - Full Stack Product Engineer",
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
