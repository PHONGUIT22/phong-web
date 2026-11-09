"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedinIcon } from "./icons/LinkedinIcon";
import { LayersIcon } from "./icons/LayersIcon";
import ZapModal from "./ZapModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [zapModalOpen, setZapModalOpen] = useState(false);

  const navItems = [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Writing", href: "/blog" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-600 to-cyanAccent-500 text-white font-serif italic font-bold shadow-sm">
              HP
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
                Hac Phong
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Systems & AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={() => setZapModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100 transition-colors shadow-sm"
              title="Tip with Lightning / eCash"
            >
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Zap Sats</span>
            </button>

            <a
              href="https://github.com/PHONGUIT22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://layers.to/np798573l7ecnk8fcs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Layers Profile"
            >
              <LayersIcon className="h-3.5 w-3.5" />
            </a>

            <a
              href="mailto:phong@hacphong.com"
              className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setZapModalOpen(true)}
              className="p-1.5 text-amber-600 bg-amber-50 rounded-lg border border-amber-200"
              aria-label="Send Zap"
            >
              <Zap className="h-4 w-4 fill-amber-500" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-slate-100 text-slate-900 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/PHONGUIT22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://layers.to/np798573l7ecnk8fcs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900"
                  aria-label="Layers Profile"
                >
                  <LayersIcon className="h-4 w-4" />
                </a>
              </div>
              <a
                href="mailto:phong@hacphong.com"
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Zap Modal */}
      <ZapModal
        isOpen={zapModalOpen}
        onClose={() => setZapModalOpen(false)}
      />
    </>
  );
}
