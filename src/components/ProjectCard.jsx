import { FiArrowRight } from "react-icons/fi";
import { Link } from "../router";
import { getStatus, getOrganization } from "../data/project-meta";
import TechChip from "./ui/TechChip";
import Highlight from "./ui/Highlight";

export default function ProjectCard({ project, index }) {
  const status = getStatus(project.status);
  const organization = getOrganization(project.organization);
  const description = project.shortDescription || project.description;

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-500/40 dark:border-white/[0.08] dark:bg-white/[0.02]"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="aspect-[16/10] w-full rounded-lg border border-slate-200 object-cover transition-transform duration-300 group-hover:scale-[1.02] dark:border-white/[0.06]"
        />
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
          <span className="px-4 text-center font-mono text-xs text-slate-400 dark:text-slate-600">
            no preview
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
          {project.category || "project"} / {String(index).padStart(2, "0")}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
          · {organization.label}
        </span>
      </div>

      <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        {project.title}
      </h3>

      {description && (
        <Highlight
          text={description}
          className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
        />
      )}

      {project.technologies?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechChip key={tech}>{tech}</TechChip>
          ))}
          {project.technologies.length > 4 && (
            <TechChip>+{project.technologies.length - 4}</TechChip>
          )}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-5">
        {status ? (
          <span className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest ${status.text}`}>
            <span className={`h-1 w-1 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 transition-colors group-hover:text-sky-500 dark:text-sky-400">
          View
          <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}