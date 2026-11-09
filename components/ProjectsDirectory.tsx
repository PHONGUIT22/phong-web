"use client";

import { useState, useMemo } from "react";
import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";

interface ProjectsDirectoryProps {
  initialProjects: Project[];
}

export default function ProjectsDirectory({
  initialProjects,
}: ProjectsDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: initialProjects.length };
    initialProjects.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return initialProjects;
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          counts={counts}
        />
        <div className="text-xs font-mono text-slate-400">
          Showing {filteredProjects.length} of {initialProjects.length} systems
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
          No engineering projects match the selected category.
        </div>
      )}
    </div>
  );
}
