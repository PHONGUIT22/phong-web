"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Zap, MapPin, GraduationCap } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { LayersIcon } from "./icons/LayersIcon";
import ZapModal from "./ZapModal";

interface HeroBioProps {
  headline?: string;
  subtitle?: string;
  status?: string;
  location?: string;
}

export default function HeroBio({
  headline = "Architecting autonomous AI infrastructure & high-performance web systems.",
  subtitle = "Nguyen Phong (Hac Phong) • Systems Engineer specializing in Context MMU Gateways, Model Context Protocol (MCP), Chaumian eCash & Programmatic SEO.",
  status = "Available for engineering & research collaborations",
  location = "Ho Chi Minh City, Vietnam",
}: HeroBioProps) {
  const [zapOpen, setZapOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-12 shadow-sm">
        {/* Subtle decorative background gradient */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-brand-100/50 via-cyanAccent-100/30 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-amber-50/50 to-transparent blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-1.5 text-xs font-medium text-emerald-800 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>{status}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-[1.15]">
            {headline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
            {subtitle}
          </p>

          {/* Metadata pill row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-xs text-slate-500 font-mono">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {location}
            </span>
            <span className="text-slate-300">•</span>
            <a
              href="https://www.uit.edu.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-700 transition-colors"
            >
              <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
              <span>UIT • VNU-HCM (University of Information Technology)</span>
            </a>
            <span className="text-slate-300">•</span>
            <span>Focus: MCP • Nostr / Cashu • Programmatic SEO</span>
          </div>

          {/* CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800 hover:shadow-md transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <BookOpen className="h-4 w-4 text-slate-500" />
              <span>Read Logs</span>
            </Link>

            <div className="flex items-center gap-2 pl-1">
              <a
                href="https://github.com/PHONGUIT22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              <a
                href="https://layers.to/np798573l7ecnk8fcs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all"
                aria-label="Layers Profile"
              >
                <LayersIcon className="h-4 w-4" />
              </a>

              <button
                onClick={() => setZapOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100 hover:border-amber-300 transition-all"
                title="Lightning Zap"
                aria-label="Lightning Zap"
              >
                <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Zap Modal */}
      <ZapModal isOpen={zapOpen} onClose={() => setZapOpen(false)} />
    </>
  );
}
