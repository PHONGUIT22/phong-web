import { Project } from "@/types";
import { Globe, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryLink = project.demo || project.github;

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
      <div className="space-y-4">
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {project.category}
          </span>
          <span className="text-[11px] font-mono font-medium text-slate-400">
            {project.status}
          </span>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-slate-900 group-hover:text-brand-700 transition-colors flex items-center gap-1.5">
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <span>{project.name}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
              </a>
            ) : (
              <span>{project.name}</span>
            )}
          </h3>
          <p className="mt-1 text-xs font-medium text-brand-700 font-mono">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>Source</span>
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800 transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Live Demo</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
