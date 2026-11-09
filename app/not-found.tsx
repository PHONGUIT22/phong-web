import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-24 text-center">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 sm:p-14 shadow-sm space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <FileQuestion className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700">
            Error 404 • Not Found
          </span>
          <h1 className="font-serif text-3xl font-semibold text-slate-900">
            Page Does Not Exist
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The requested technical transmission or project sector could not be located in the current repository registry.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
