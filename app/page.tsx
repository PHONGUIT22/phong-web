import Link from "next/link";
import { ArrowRight, Layers, FileText } from "lucide-react";
import HeroBio from "@/components/HeroBio";
import ProjectCard from "@/components/ProjectCard";
import BlogTimeline from "@/components/BlogTimeline";
import NostrCard from "@/components/NostrCard";
import JsonLd from "@/components/JsonLd";
import { getProfile, getFeaturedProjects, getAllPosts } from "@/lib/markdown";

export default function HomePage() {
  const profile = getProfile();
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getAllPosts().slice(0, 3);

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://hacphong.com/#website",
        "url": "https://hacphong.com",
        "name": "Nguyễn Hạc Phong Engineering Portfolio",
        "description": "Architecting autonomous AI infrastructure & high-performance web systems.",
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://hacphong.com/#webpage",
        "url": "https://hacphong.com",
        "name": "Nguyễn Hạc Phong • Full-Stack Systems & AI Infrastructure Engineer",
        "isPartOf": {
          "@id": "https://hacphong.com/#website",
        },
        "mainEntity": {
          "@type": "Person",
          "@id": "https://hacphong.com/#author",
          "name": "Nguyễn Hạc Phong",
          "alternateName": [
            "Nguyen Hạc Phong",
            "Hạc Phong",
            "Nguyen Phong"
          ],
          "jobTitle": "Full-Stack Systems & AI Infrastructure Engineer",
          "url": "https://hacphong.com",
          "image": "https://hacphong.com/icon.svg",
          "email": "mailto:phong@hacphong.com",
          "sameAs": [
            "https://github.com/PHONGUIT22",
            "https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/",
            "https://www.facebook.com/phong.nguyen.916206/",
            "https://layers.to/np798573l7ecnk8fcs",
            "https://nostrpulse.vercel.app/",
            "https://checkdamp.co.uk/",
            "https://www.uit.edu.vn",
          ],
          "affiliation": {
            "@type": "EducationalOrganization",
            "name": "University of Information Technology - VNU-HCM",
            "alternateName": "UIT",
            "url": "https://www.uit.edu.vn",
          },
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University of Information Technology - VNU-HCM",
            "alternateName": "UIT",
            "url": "https://www.uit.edu.vn",
          },
          "knowsAbout": [
            "AI Infrastructure",
            "Model Context Protocol",
            "AST Context Paging",
            "Z3 Theorem Prover",
            "Cashu Chaumian eCash",
            "Nostr Protocol",
            "Programmatic SEO",
            "Next.js",
            "TypeScript",
            "Python",
          ],
          "description": profile.bio,
        },
      },
      {
        "@type": "ItemList",
        "name": "Featured Production Systems",
        "itemListElement": featuredProjects.map((p, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": p.github ? "SoftwareSourceCode" : "WebApplication",
            "name": p.name,
            "description": p.description,
            "url": p.demo || p.github || "https://hacphong.com/projects",
            ...(p.github && { "codeRepository": p.github }),
            "programmingLanguage": p.tech,
            "author": {
              "@id": "https://hacphong.com/#author",
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={homeJsonLd} />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 space-y-16 sm:space-y-20">
        {/* 1. Hero Bio Status Card */}
        <HeroBio
          headline={profile.headline}
          subtitle={profile.subtitle}
          status={profile.status}
          location={profile.location}
        />

        {/* 2. Pinned Projects Grid */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <Layers className="h-4 w-4" />
                <span>Selected Work</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                Featured Engineering
              </h2>
            </div>
            <Link
              href="/projects"
              className="group flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-brand-700 transition-colors"
            >
              <span>View all systems</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* 3. Recent Transmission Logs */}
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
                <FileText className="h-4 w-4" />
                <span>Dispatches & Case Studies</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                Recent Transmission Logs
              </h2>
            </div>
            <Link
              href="/blog"
              className="group flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-brand-700 transition-colors"
            >
              <span>Browse archive</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <BlogTimeline posts={recentPosts} />
        </section>

        {/* 4. Nostr & Lightning Protocol Dispatch Card */}
        <NostrCard />
      </div>
    </>
  );
}
