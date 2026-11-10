import type { Metadata } from "next";
import { getAllProjects } from "@/lib/markdown";
import ProjectsDirectory from "@/components/ProjectsDirectory";
import JsonLd from "@/components/JsonLd";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Systems Catalog • Nguyễn Hạc Phong",
  description:
    "Open-source software, AST context paging gateways (Phonix v2.1), Model Context Protocol implementations (NostrPulse MCP), and high-traffic programmatic web engines (CheckDamp UK).",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Systems Catalog • Nguyễn Hạc Phong",
    description:
      "Open-source software, AST context paging gateways, Model Context Protocol implementations, and programmatic web engines.",
    url: "https://hacphong.com/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://hacphong.com/projects/#webpage",
    "url": "https://hacphong.com/projects",
    "name": "Projects & Systems Catalog • Nguyễn Hạc Phong",
    "description":
      "Comprehensive directory of open-source architectures, autonomous AI agents, Model Context Protocol servers, and organic traffic micro-SaaS engines.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          ...(p.github
            ? {
                "@type": "SoftwareSourceCode",
                "codeRepository": p.github,
                "programmingLanguage": p.tech,
              }
            : {
                "@type": "WebApplication",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                },
              }),
          "name": p.name,
          "description": p.description,
          "url": p.demo || p.github || "https://hacphong.com/projects",
          "author": {
            "@type": "Person",
            "name": "Nguyễn Hạc Phong",
            "alternateName": "Hạc Phong",
            "url": "https://hacphong.com",
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={projectsJsonLd} />
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        {/* Editorial Header */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <Layers className="h-3.5 w-3.5 text-brand-600" />
            <span>System Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Projects & Engineering Systems
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Comprehensive directory of open-source architectures, autonomous AI agents, Model Context Protocol servers, and organic traffic micro-SaaS engines.
          </p>
        </div>

        {/* Directory with Interactive Filter */}
        <ProjectsDirectory initialProjects={projects} />
      </div>
    </>
  );
}
