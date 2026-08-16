import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaCoffee } from "react-icons/fa";
import { Link } from "../router";
import SectionLabel from "../components/ui/SectionLabel";
import Reveal from "../components/ui/Reveal";
import ProjectCard from "../components/ProjectCard";
import Highlight from "../components/ui/Highlight";

export default function PratickLabsPage() {
  const { labs } = profile;
  const products = projects.filter(
    (p) => (p.organization ?? "personal") === "pratick-labs"
  );

  const counts = {
    total: products.length,
    completed: products.filter((p) => p.status === "completed").length,
    inDevelopment: products.filter((p) => p.status === "in-development").length,
    other: products.filter(
      (p) => p.status !== "completed" && p.status !== "in-development"
    ).length,
  };

  const pad = (n) => String(n).padStart(2, "0");

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

        <Reveal delay={0.05}>
          <SectionLabel index="studio" color="rose">Pratick Labs</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            <img
              src={labs.logo}
              alt="Pratick Labs logo"
              className="h-20 w-auto shrink-0 self-start rounded-xl border border-slate-200 bg-white p-2 md:self-auto dark:border-white/[0.08] dark:bg-white/[0.02]"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
                {labs.name}
              </h1>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400">
                {labs.tagline}
              </p>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
                <Highlight text={labs.description} />
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Products", value: counts.total },
              { label: "Completed", value: counts.completed },
              { label: "In Development", value: counts.inDevelopment },
              { label: "Concept / Archived", value: counts.other },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/[0.06] dark:bg-white/[0.02]"
              >
                <p className="font-mono text-2xl font-semibold text-slate-900 dark:text-white">
                  {pad(item.value)}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Products
            </p>
          </Reveal>

          {products.length === 0 ? (
            <Reveal>
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
                <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                  Products coming soon.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                  <Reveal key={product.slug} delay={Math.min(i * 0.04, 0.2)}>
                    <ProjectCard project={product} index={i + 1} />
                  </Reveal>
                ))}
            </div>
          )}
        </div>

        <Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Building something useful?
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-500">
                {labs.koFiHint}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={profile.koFi}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
              >
                <FaCoffee className="text-slate-400 transition-colors group-hover:text-amber-500" />
                {labs.koFiLabel}
              </a>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:text-rose-500 dark:text-rose-400"
              >
                All projects
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}