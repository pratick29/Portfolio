import { useContentFeed, formatContentDate } from "../content";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "../router";
import NotFoundPage from "./NotFoundPage";
import Markdown from "../components/Markdown";
import SectionLabel from "../components/ui/SectionLabel";
import Reveal from "../components/ui/Reveal";
import TechChip from "../components/ui/TechChip";
import SourceBadge from "../components/ui/SourceBadge";
import Highlight from "../components/ui/Highlight";

export default function NoteDetailPage({ slug }) {
  const { items, loading } = useContentFeed();
  const item = items.find((entry) => entry.slug === slug);

  if (!item) {
    if (loading) {
      return (
        <section className="py-24 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-white/[0.08] dark:bg-white/[0.02]">
              <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
                loading…
              </p>
            </div>
          </div>
        </section>
      );
    }
    return <NotFoundPage />;
  }

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            <FiArrowLeft />
            Back to notes
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <SectionLabel index="detail" color="rose">Note</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2">
            <SourceBadge source={item.source} />
            <span className="font-mono text-xs text-slate-500 dark:text-slate-500">
              {formatContentDate(item.publishedAt)}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            {item.title}
          </h1>

          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <TechChip key={tag}>{tag}</TechChip>
              ))}
            </div>
          )}

          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="mt-6 aspect-video w-full rounded-2xl border border-slate-200 object-cover dark:border-white/[0.08]"
            />
          )}

          {item.description && (
            <Highlight
              text={item.description}
              className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            />
          )}

          {item.content ? (
            <div className="mt-6">
              <Markdown content={item.content} />
            </div>
          ) : (
            item.description && <div className="mt-8" />
          )}

          {item.url && (
            <div className="mt-8">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[0.05]"
              >
                Read Original
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}