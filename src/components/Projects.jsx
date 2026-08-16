import { projects } from "../data/projects";
import { contentConfig } from "../data/config";
import { getStatus, getOrganization } from "../data/project-meta";
import { FaGithub } from "react-icons/fa";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { useRouter } from "../use-router";
import { Link } from "../router";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import TechChip from "./ui/TechChip";
import Highlight from "./ui/Highlight";

export default function Projects() {
  const { navigate } = useRouter();

  const personal = projects.filter(
    (project) => (project.organization ?? "personal") === "personal"
  );
  const featured = personal.filter((project) => project.featured);
  const visible =
    featured.length > 0
      ? featured
      : personal.slice(0, contentConfig.projectsPreviewCount);
  const showAll = personal.length > visible.length;

  if (personal.length === 0) {
    return (
      <section id="projects" className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel index="04" color="sky">Projects</SectionLabel>
          </Reveal>
          <Reveal>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                No projects available yet.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  const handleCardClick = (e, slug) => {
    if (e.target.closest("a")) return;
    navigate(`/projects/${slug}`);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="04" color="sky">Projects</SectionLabel>
        </Reveal>

        <div className="space-y-8">
          {visible.map((project, i) => {
            const status = getStatus(project.status);
            const organization = getOrganization(project.organization);
            return (
              <Reveal key={project.slug}>
                <article
                  onClick={(e) => handleCardClick(e, project.slug)}
                  className="group relative grid cursor-pointer gap-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-sky-500/40 md:p-10 lg:grid-cols-2 dark:border-white/[0.08] dark:bg-white/[0.02]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-sky-500/10"
                  />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400">
                        Project / 0{i + 1}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
                        · {organization.label}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                      {project.title}
                    </h3>

                    {project.description && (
                      <Highlight
                        text={project.description}
                        className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400"
                      />
                    )}

                    {project.points?.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {project.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <span className="mt-0.5 font-mono text-[10px] text-sky-500">
                              ▸
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {project.technologies?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <TechChip key={tech}>{tech}</TechChip>
                        ))}
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
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
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-sky-500 hover:shadow-md active:scale-[0.98]"
                        >
                          <FiExternalLink />
                          Live Demo
                        </a>
                      )}
                      <Link
                        to={`/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="group/btn inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-sky-600 transition-colors hover:text-sky-500 dark:text-sky-400"
                      >
                        View details
                        <FiArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-[#0c0c10]">
                      <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3 dark:border-white/[0.06]">
                        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/10" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/10" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/10" />
                        <span className="ml-2 truncate font-mono text-[11px] text-slate-500 dark:text-slate-500">
                          {project.slug} / dashboard
                        </span>
                      </div>
                      <div className="p-4">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full rounded-lg border border-slate-200 object-cover transition-transform duration-300 group-hover:scale-[1.02] dark:border-white/[0.06]"
                          />
                        ) : (
                          <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
                            <span className="font-mono text-xs text-slate-400 dark:text-slate-600">
                              no preview
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 font-mono text-[11px] dark:border-white/[0.06]">
                        {status ? (
                          <span
                            className={`flex items-center gap-1.5 ${status.text}`}
                          >
                            <span className={`h-1 w-1 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-500">
                            project
                          </span>
                        )}
                        {project.metrics && (
                          <span className="truncate text-slate-500 dark:text-slate-500">
                            {project.metrics}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {showAll && (
          <Reveal>
            <div className="mt-10 text-center">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
              >
                View all projects
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}