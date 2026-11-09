import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 text-sm text-slate-500">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          {/* Brand Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-semibold text-slate-900">
                Hac Phong
              </span>
              <span className="text-xs text-slate-400 font-mono">
                / hacphong.com
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              Engineering autonomous AI agent workflows, Model Context Protocol servers,
              and programmatic SEO architectures. Based in Ho Chi Minh City, Vietnam.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
              <a
                href="https://www.uit.edu.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-700 hover:text-brand-700 transition-colors"
              >
                UIT (VNU-HCM)
              </a>
              <span>•</span>
              <span>University of Information Technology</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Built with Next.js 16 & Tailwind CSS • 0 Cookies</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-slate-900 transition-colors"
                >
                  Projects Directory
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-slate-900 transition-colors">
                  Transmission Logs
                </Link>
              </li>
              <li>
                <Link
                  href="/.well-known/nostr.json"
                  target="_blank"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>Nostr NIP-05</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Connect
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="mailto:phong@hacphong.com"
                  className="hover:text-slate-900 transition-colors font-medium text-slate-700"
                >
                  phong@hacphong.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PHONGUIT22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>GitHub @PHONGUIT22</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nguy%E1%BB%85n-phong-a673681b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/phong.nguyen.916206/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://layers.to/np798573l7ecnk8fcs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <span>Layers</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li className="font-mono text-[11px] text-slate-400 pt-1">
                NIP-05: <span className="text-slate-700">phong@hacphong.com</span>
              </li>
              <li className="font-mono text-[11px] text-slate-400">
                LN: <span className="text-slate-700">hacphong@getalby.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {currentYear} Nguyen Phong. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-mono text-[11px]">
            <span>ENGINEERED FOR SPEED & PRIVACY</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
