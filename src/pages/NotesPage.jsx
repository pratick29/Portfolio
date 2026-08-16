import { useState } from "react";
import { useContentFeed, formatContentDate, sourceMeta } from "../content";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "../router";
import SectionLabel from "../components/ui/SectionLabel";
import Reveal from "../components/ui/Reveal";
import SourceBadge from "../components/ui/SourceBadge";
import Highlight from "../components/ui/Highlight";

export default function NotesPage() {
  const { items } = useContentFeed();
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    [
      item.title,
      item.description,
      item.tags.join(" "),
      sourceMeta[item.source]?.label,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
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
          <SectionLabel index="all" color="violet">Notes</SectionLabel>
        </Reveal>

        {items.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                No notes published yet.
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes…"
                aria-label="Search notes"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200"
              />
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-6 font-mono text-xs text-slate-500 dark:text-slate-500">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              {filtered.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-white/[0.02]">
                  <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                    no results for "{query}"
                  </p>
                </div>
              ) : (
                <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-white/[0.06] dark:border-white/[0.08]">
                  {filtered.map((item, i) => (
                    <li key={item.slug}>
                      <Link
                        to={`/notes/${item.slug}`}
                        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                      >
                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="hidden h-14 w-20 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-white/[0.08] sm:block"
                          />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <SourceBadge source={item.source} />
                            <span className="truncate font-medium text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                          </span>
                          {item.description && (
                            <Highlight
                              text={item.description}
                              className="mt-1 block truncate text-sm text-slate-500 dark:text-slate-400"
                            />
                          )}
                          <span className="mt-0.5 block font-mono text-[11px] text-slate-500 dark:text-slate-500">
                            {formatContentDate(item.publishedAt)}
                            {item.tags.length > 0 &&
                              ` · ${item.tags.join(" · ")}`}
                          </span>
                        </span>
                        <span className="text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-sky-400">
                          <FiArrowRight />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}