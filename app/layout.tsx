import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const serifFont = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hacphong.com"),
  alternates: {
    canonical: "./",
  },
  title: "Hạc Phong (Nguyễn Hạc Phong) • Systems Engineer & AI Infrastructure",
  description:
    "Hạc Phong (Nguyễn Hạc Phong) - Systems & AI Infrastructure Engineer chuyên sâu về Context MMU Gateways (Phonix), Model Context Protocol (NostrPulse MCP), Chaumian eCash và Programmatic Web Systems.",
  keywords: [
    "Hạc Phong",
    "Nguyễn Hạc Phong",
    "Nguyen Hạc Phong",
    "Phong Hạc",
    "PHONGUIT22",
    "Nguyen Phong",
    "Phonix v2.1",
    "G-MMU",
    "Model Context Protocol",
    "MCP",
    "NostrPulse",
    "Cashu eCash",
    "Nostr NIP-61",
    "AI Agents",
    "CheckDamp UK",
    "Programmatic SEO",
    "Systems Engineer",
  ],
  authors: [{ name: "Hạc Phong (Nguyễn Hạc Phong)", url: "https://hacphong.com" }],
  creator: "Hạc Phong (Nguyễn Hạc Phong)",
  openGraph: {
    title: "Hạc Phong (Nguyễn Hạc Phong) • Systems Engineer & AI Infrastructure",
    description:
      "Trang cá nhân của Hạc Phong (Nguyễn Hạc Phong): Nghiên cứu kiến trúc hạ tầng AI tự chủ, AST context paging gateways, Model Context Protocol servers và hệ thống web hiệu năng cao.",
    url: "https://hacphong.com",
    siteName: "Hạc Phong Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hạc Phong (Nguyễn Hạc Phong) • Systems & AI Infrastructure Engineer",
    description:
      "Trang cá nhân của Hạc Phong (Nguyễn Hạc Phong): Nghiên cứu kiến trúc hạ tầng AI tự chủ, AST context paging gateways, Model Context Protocol servers và hệ thống web hiệu năng cao.",
    creator: "@PHONGUIT22",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230f172a'/><text x='50%' y='55%' font-family='serif' font-style='italic' font-size='55' font-weight='bold' fill='%2314b8a6' dominant-baseline='middle' text-anchor='middle'>HP</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-700 font-sans selection:bg-brand-100 selection:text-brand-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
