import { useContentFeed, formatContentDate } from "../content";
import { contentConfig } from "../data/config";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "../router";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import SourceBadge from "./ui/SourceBadge";
import Terminal from "./ui/Terminal";
import Highlight from "./ui/Highlight";

export default function NotesSection() {
  const { items } = useContentFeed();
  const visible = items.slice(0, contentConfig.notesPreviewCount);
  const showAll = items.length > visible.length;

  return (
    <section id="notes" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionLabel index="06" color="sky">Notes</SectionLabel>
        </Reveal>

        <Reveal>
          <Terminal title="notes" right={`${items.length} entries`}>
            <div className="px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
                <span className="text-sky-400/80">➜</span>
                <span className="text-sky-300/80">~/notes</span>
                <span>$</span>
                <span className="text-slate-400">ls -la</span>
              </div>

              {items.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-white/10 p-10 text-center">
                  <p className="font-mono text-sm text-slate-500">
                    No notes published yet.
                  </p>
                </div>
              ) : (
                <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/[0.08]">
                  {visible.map((item, i) => (
                    <li key={item.slug}>
                      <Link
                        to={`/notes/${item.slug}`}
                        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                      >
                        <span className="font-mono text-xs text-slate-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.image && (
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="hidden h-14 w-20 shrink-0 rounded-lg border border-white/[0.08] object-cover sm:block"
                          />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <SourceBadge source={item.source} />
                            <span className="truncate font-medium text-white">
                              {item.title}
                            </span>
                          </span>
                          {item.description && (
                            <span className="mt-1 block truncate text-sm text-slate-400">
                              <Highlight text={item.description} />
                            </span>
                          )}
                          <span className="mt-0.5 block font-mono text-[11px] text-slate-500">
                            {formatContentDate(item.publishedAt)}
                            {item.tags.length > 0 && ` · ${item.tags.join(" · ")}`}
                          </span>
                        </span>
                        <span className="text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-sky-300">
                          <FiArrowRight />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Terminal>
        </Reveal>

        {showAll && (
          <Reveal>
            <div className="mt-6 text-center">
              <Link
                to="/notes"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/25 hover:bg-white/[0.05] active:scale-[0.98]"
              >
                View all notes
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
