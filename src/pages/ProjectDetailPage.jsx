import { projects } from "../data/projects";
import { getStatus, getOrganization } from "../data/project-meta";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { Link } from "../router";
import NotFoundPage from "./NotFoundPage";
import SectionLabel from "../components/ui/SectionLabel";
import Reveal from "../components/ui/Reveal";
import TechChip from "../components/ui/TechChip";
import Highlight from "../components/ui/Highlight";

export default function ProjectDetailPage({ slug }) {
  const project = projects.find((item) => item.slug === slug) ?? null;

  if (!project) return <NotFoundPage />;

  const status = getStatus(project.status);
  const organization = getOrganization(project.organization);

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            <FiArrowLeft />
            Back to projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <SectionLabel index="detail" color="amber">Project</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
            {project.category || "project"}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {status && (
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${status.badge} ${status.text}`}>
                <span className={`h-1 w-1 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-slate-300/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10 dark:text-slate-400">
              {organization.label}
            </span>
            {project.technologies?.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>

          {project.description && (
            <Highlight
              text={project.description}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            />
          )}

          {project.points?.length > 0 && (
            <ul className="mt-6 space-y-2">
              {project.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mt-0.5 font-mono text-[10px] text-amber-500">▸</span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          {project.images?.length > 0 && (
            <div className="mt-8 grid gap-4">
              {project.images.map((image, i) => (
                <img
                  key={image}
                  src={image}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10"
                />
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
              >
                <FaGithub />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-sky-500 hover:shadow-md active:scale-[0.98]"
              >
                <FiExternalLink />
                Live Demo
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
              >
                <FaYoutube />
                Watch Demo
              </a>
            )}
          </div>

          {project.tags?.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechChip key={tag}>{tag}</TechChip>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}