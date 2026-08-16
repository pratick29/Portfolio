import { projects } from "../data/projects";
import { FiArrowLeft } from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import SectionLabel from "../components/ui/SectionLabel";
import Reveal from "../components/ui/Reveal";
import { Link } from "../router";

const groups = [
  {
    id: "personal",
    title: "Personal Work",
    subtitle: "Technical projects, experiments and independent work.",
    filter: (p) => (p.organization ?? "personal") === "personal",
  },
  {
    id: "pratick-labs",
    title: "Pratick Labs",
    subtitle: "Independent Software & AI Studio — products I'm building.",
    filter: (p) => (p.organization ?? "personal") === "pratick-labs",
  },
];

export default function ProjectsPage() {
  const hasProjects = projects.length > 0;

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            <FiArrowLeft />
            Back home
          </Link>
        </Reveal>

        <Reveal>
          <SectionLabel index="all" color="sky">Projects</SectionLabel>
        </Reveal>

        {!hasProjects ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                No projects available yet.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => {
              const items = projects.filter(group.filter);
              if (items.length === 0) return null;

              return (
                <div key={group.id}>
                  <Reveal>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                        {group.title}
                      </span>
                      <span className="font-mono text-xs text-slate-400 dark:text-slate-600">
                        {String(items.length).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-slate-200 dark:bg-white/[0.08]" />
                    </div>
                    <p className="mb-6 text-sm text-slate-500 dark:text-slate-500">
                      {group.subtitle}
                    </p>
                  </Reveal>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((project, i) => (
                      <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.2)}>
                        <ProjectCard project={project} index={i + 1} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}