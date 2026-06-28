import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono } from "next/font/google";
import RevealEffects from "@/components/RevealEffects";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://sajidh.dev"; // update to your deployed domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sajidh Ahamed — Full-stack & AI Developer",
  description:
    "Sajidh Ahamed — full-stack developer and AI-engineering undergraduate in Colombo, Sri Lanka. Building web, mobile, and AI systems end to end.",
  keywords: [
    "Sajidh Ahamed",
    "full-stack developer",
    "AI engineer",
    "Colombo",
    "Sri Lanka",
    "React",
    "Flutter",
    "MERN",
  ],
  authors: [{ name: "Sajidh Ahamed" }],
  openGraph: {
    title: "Sajidh Ahamed — Full-stack & AI Developer",
    description:
      "Full-stack developer and AI-engineering undergraduate in Colombo, Sri Lanka. Building web, mobile, and AI systems end to end.",
    url: SITE_URL,
    siteName: "Sajidh Ahamed",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajidh Ahamed — Full-stack & AI Developer",
    description:
      "Full-stack developer and AI-engineering undergraduate in Colombo, Sri Lanka.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <RevealEffects />
      </body>
    </html>
  );
}
