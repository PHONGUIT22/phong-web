import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/markdown";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import NostrCard from "@/components/NostrCard";
import JsonLd from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Transmission Not Found • Hac Phong",
    };
  }

  const canonicalUrl = `https://hacphong.com/blog/${post.slug}`;

  return {
    title: `${post.title} • Hac Phong`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Nguyen Phong (Hac Phong)"],
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@PHONGUIT22",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://hacphong.com/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${postUrl}/#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": postUrl,
          "url": postUrl,
          "name": post.title,
        },
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.date,
        "inLanguage": "en-US",
        "mainEntityOfPage": postUrl,
        "author": {
          "@type": "Person",
          "name": "Nguyen Phong (Hac Phong)",
          "url": "https://hacphong.com",
        },
        "publisher": {
          "@type": "Person",
          "name": "Nguyen Phong (Hac Phong)",
          "url": "https://hacphong.com",
        },
        "keywords": post.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hacphong.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://hacphong.com/blog",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": postUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        {/* Back button */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Transmission Logs</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <header className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                {post.readingTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-4">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
            <span>Author: Nguyen Phong (Hac Phong)</span>
            <span className="font-mono">Format: Technical Case Study</span>
          </div>
        </header>

        {/* Markdown Content */}
        <article className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm">
          <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-pre:bg-slate-900"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        {/* Post Navigation & Identity */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Dispatches</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <span>Explore Projects</span>
          </Link>
        </div>

        {/* Protocol Card for Tipping author */}
        <NostrCard />
      </div>
    </>
  );
}
