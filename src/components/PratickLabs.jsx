import { projects } from "../data/projects";
import { getStatus } from "../data/project-meta";
import { profile } from "../data/profile";
import { FiArrowRight } from "react-icons/fi";
import { FaCoffee } from "react-icons/fa";
import { Link } from "../router";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Terminal from "./ui/Terminal";
import Highlight from "./ui/Highlight";

export default function PratickLabs() {
  const { labs } = profile;
  const products = projects.filter((p) => (p.organization ?? "personal") === "pratick-labs");

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
    <section id="labs" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="05" color="rose">Pratick Labs</SectionLabel>
        </Reveal>

        <Reveal>
          <Terminal title="pratick labs" right={`${products.length} products`}>
            <div className="px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
                <span className="text-rose-400/80">➜</span>
                <span className="text-rose-300/80">~/projects</span>
                <span>$</span>
                <span className="text-slate-400">ls ./pratick-labs</span>
              </div>

              <div className="mt-4 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="min-w-0">
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                    <img
                      src={labs.logo}
                      alt="Pratick Labs logo"
                      className="h-16 w-auto shrink-0 self-start"
                    />
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                      {labs.name}
                    </h2>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-rose-300">
                      {labs.tagline}
                    </p>
                    <p className="mt-4 leading-relaxed text-slate-400">
                      {labs.description}
                    </p>

                    <div className="mt-auto pt-6">
                      <a
                        href={profile.koFi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:border-white/25 hover:bg-white/[0.05] active:scale-[0.98]"
                      >
                        <FaCoffee className="text-slate-400 transition-colors group-hover:text-amber-400" />
                        {labs.koFiLabel}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Products
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                        { label: "Products", value: counts.total },
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

                    {products.length === 0 ? (
                      <div className="mt-6 rounded-xl border border-dashed border-white/10 p-8 text-center">
                        <p className="font-mono text-sm text-slate-500">
                          Products coming soon.
                        </p>
                      </div>
                    ) : (
                      <ul className="mt-6 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08]">
                        {products.map((product) => {
                          const status = getStatus(product.status);
                          return (
                            <li key={product.slug}>
                              <Link
                                to={`/projects/${product.slug}`}
                                className="group flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
                              >
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate font-medium text-white">
                                    {product.title}
                                  </span>
                                  {product.shortDescription && (
                                    <span className="mt-0.5 block truncate text-xs text-slate-500">
                                      <Highlight text={product.shortDescription} />
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
                                <span className="text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-rose-300">
                                  <FiArrowRight />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <div className="mt-auto pt-6">
                      <Link
                        to="/pratick-labs"
                        className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-rose-300 transition-colors hover:text-rose-300"
                      >
                        Visit Pratick Labs
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
