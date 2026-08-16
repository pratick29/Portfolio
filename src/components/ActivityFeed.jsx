import { useEffect, useState } from "react";
import { fetchActivityFeed, activitySources } from "../activity";
import { profile } from "../data/profile";

const githubUser = profile.socials
  .find((social) => social.id === "github")
  ?.href.split("/")
  .pop();

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function ActivityFeed() {
  const [items, setItems] = useState(null);
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchActivityFeed({ limit: 10, signal: controller.signal })
      .then(({ items: feed, failures }) => {
        setItems(feed);
        setAllFailed(failures > 0 && failures === activitySources.length);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setAllFailed(true);
      });
    return () => controller.abort();
  }, []);

  if (items === null) {
    return (
      <p className="py-8 text-center font-mono text-xs text-slate-400 dark:text-slate-500">
        fetching activity…
      </p>
    );
  }

  if (allFailed) {
    return (
      <>
        <p className="py-8 text-center font-mono text-xs text-slate-400 dark:text-slate-500">
          unable to load activity right now
        </p>
        <a
          href={`https://github.com/${githubUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block font-mono text-[10px] text-slate-400 transition-colors hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-400"
        >
          github.com/{githubUser}
        </a>
      </>
    );
  }

  return (
    <>
      {items.length === 0 ? (
        <p className="py-8 text-center font-mono text-xs text-slate-400 dark:text-slate-500">
          no recent public activity
        </p>
      ) : (
        <div className="scroll-area max-h-80 overflow-y-auto overscroll-contain rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 dark:border-white/[0.06] dark:bg-[#0c0c10]">
          <div className="divide-y divide-slate-200/70 dark:divide-white/[0.04]">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-[11px]">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ● {item.source}
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">
                      {" "}
                      /{" "}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {item.repo}
                    </span>
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-600 dark:text-slate-400">
                    {item.message || "Update"}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                  {timeAgo(item.date)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <a
        href={`https://github.com/${githubUser}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block font-mono text-[10px] text-slate-400 transition-colors hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-400"
      >
        github.com/{githubUser}
      </a>
    </>
  );
}