import { projects } from "../data/projects";
import { getStatus } from "../data/project-meta";
import { FiArrowRight } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "../router";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Terminal from "./ui/Terminal";
import Highlight from "./ui/Highlight";

export default function PersonalWork() {
  const personal = projects.filter((p) => (p.organization ?? "personal") === "personal");

  const counts = {
    total: personal.length,
    completed: personal.filter((p) => p.status === "completed").length,
    inDevelopment: personal.filter((p) => p.status === "in-development").length,
    other: personal.filter(
      (p) => p.status !== "completed" && p.status !== "in-development"
    ).length,
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="personal-work" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="04" color="amber">Personal Projects</SectionLabel>
        </Reveal>

        <Reveal>
          <Terminal title="personal projects" right={`${personal.length} projects`}>
            <div className="px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
                <span className="text-amber-400/80">➜</span>
                <span className="text-amber-300/80">~/projects</span>
                <span>$</span>
                <span className="text-slate-400">ls ./personal</span>
              </div>

              <div className="mt-4 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="min-w-0">
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      <FiZap className="h-5 w-5 text-amber-300" />
                    </span>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                      Personal Projects
                    </h2>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
                      independent · experimental
                    </p>
                    <p className="mt-4 leading-relaxed text-slate-400">
                      Independent projects, experiments, research, and things I build to
                      learn, solve problems, and explore new ideas.
                    </p>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Projects
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                        { label: "Projects", value: counts.total },
                        { label: "Completed", value: counts.completed },
                        { label: "In Development", value: counts.inDevelopment },
                        { label: "Concept / Archived", value: counts.other },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/[0.06] p-3"
                        >
                          <p className="font-mono text-xl font-semibold text-white">
                            {pad(item.value)}
                          </p>
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {personal.length === 0 ? (
                      <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
                        <p className="font-mono text-sm text-slate-500">
                          Personal projects coming soon.
                        </p>
                      </div>
                    ) : (
                      <ul className="mt-6 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08]">
                        {personal.map((project) => {
                          const status = getStatus(project.status);
                          return (
                            <li key={project.slug}>
                              <Link
                                to={`/projects/${project.slug}`}
                                className="group flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate font-medium text-white">
                                    {project.title}
                                  </span>
                                  {project.shortDescription && (
                                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                                      <Highlight text={project.shortDescription} />
                                    </span>
                                  )}
                                </span>
                                {status && (
                                  <span
                                    className={`inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${status.text}`}
                                  >
                                    <span className={`h-1 w-1 rounded-full ${status.dot}`} />
                                    {status.label}
                                  </span>
                                )}
                                <span className="text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-amber-300">
                                  <FiArrowRight />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {(() => {
                      const liveProjects = personal.filter(
                        (p) => p.live || p.demo
                      );
                      if (liveProjects.length === 0) return null;
                      return (
                        <div className="mt-6">
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                            Try it live
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {liveProjects.map((p) => (
                              <a
                                key={p.slug}
                                href={p.live || p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/[0.04] px-3 py-2 font-mono text-xs text-amber-300 transition-colors hover:border-amber-400/50 hover:bg-amber-400/10"
                              >
                                <FiExternalLink className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{p.title}</span>
                                <FiArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                              </a>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="mt-auto pt-6">
                      <Link
                        to="/projects"
                        className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-amber-300 transition-colors hover:text-amber-300"
                      >
                        View all projects
                        <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}
