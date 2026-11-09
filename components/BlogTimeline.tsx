import Link from "next/link";
import { PostMeta } from "@/types";
import { ArrowRight, Clock, Calendar } from "lucide-react";

interface BlogTimelineProps {
  posts: PostMeta[];
}

export default function BlogTimeline({ posts }: BlogTimelineProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        No transmission logs published yet.
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group relative p-6 sm:p-7 hover:bg-slate-50/70 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-slate-500">
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
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {post.title}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:translate-x-0.5 transition-transform">
            <span>Read full transmission</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </div>
        </article>
      ))}
    </div>
  );
}
