import type { Metadata } from "next";
import { getAllPosts } from "@/lib/markdown";
import BlogArchive from "@/components/BlogArchive";
import JsonLd from "@/components/JsonLd";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Transmission Logs & Tech Writing • Hac Phong",
  description:
    "Engineering essays and architectural blueprints on Model Context Protocol (MCP), Chaumian eCash (Cashu/Nostr), Programmatic SEO, and embedded AI agents.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Transmission Logs & Tech Writing • Hac Phong",
    description:
      "Engineering essays and architectural blueprints on Model Context Protocol (MCP), Chaumian eCash (Cashu/Nostr), Programmatic SEO, and embedded AI agents.",
    url: "https://hacphong.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://hacphong.com/blog/#blog",
    "url": "https://hacphong.com/blog",
    "name": "Hac Phong Transmission Logs",
    "description":
      "Deep dives into protocol engineering, distributed systems, machine-to-machine payments, and scaling modern web software.",
    "publisher": {
      "@type": "Person",
      "name": "Nguyen Phong (Hac Phong)",
      "url": "https://hacphong.com",
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://hacphong.com/blog/${post.slug}`,
      "author": {
        "@type": "Person",
        "name": "Nguyen Phong (Hac Phong)",
      },
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Editorial Header */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <BookOpen className="h-3.5 w-3.5 text-brand-600" />
            <span>Technical Dispatches</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Transmission Logs & Architectural Essays
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Deep dives into protocol engineering, distributed systems, machine-to-machine payments, and scaling modern web software.
          </p>
        </div>

        {/* Archive with Filter */}
        <BlogArchive initialPosts={posts} />
      </div>
    </>
  );
}
