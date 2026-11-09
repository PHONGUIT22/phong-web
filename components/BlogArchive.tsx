"use client";

import { useState, useMemo } from "react";
import { PostMeta } from "@/types";
import BlogTimeline from "./BlogTimeline";

interface BlogArchiveProps {
  initialPosts: PostMeta[];
}

export default function BlogArchive({ initialPosts }: BlogArchiveProps) {
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((tag) => set.add(tag));
    });
    return ["All", ...Array.from(set)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return initialPosts;
    return initialPosts.filter((post) => post.tags.includes(activeTag));
  }, [initialPosts, activeTag]);

  return (
    <div className="space-y-8">
      {/* Tag Filtering Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">
            Filter:
          </span>
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm font-semibold"
                    : "border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-mono text-slate-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </div>
      </div>

      {/* Post Timeline */}
      <BlogTimeline posts={filteredPosts} />
    </div>
  );
}
