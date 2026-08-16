import { useEffect, useState } from "react";
import { marked } from "marked";
import notesProvider, { localNotes } from "./providers/notes";
import devtoProvider from "./providers/devto";
import mediumProvider from "./providers/medium";
import linkedinProvider from "./providers/linkedin";
import xProvider from "./providers/x";

const providers = [
  notesProvider,
  devtoProvider,
  mediumProvider,
  linkedinProvider,
  xProvider,
];

export const sourceMeta = {
  note: {
    label: "Notes",
    badge: "bg-slate-500/10 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  },
  devto: {
    label: "DEV.to",
    badge: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300",
  },
  medium: {
    label: "Medium",
    badge: "bg-slate-800/10 text-slate-700 dark:bg-white/10 dark:text-slate-200",
  },
  linkedin: {
    label: "LinkedIn",
    badge: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300",
  },
  x: {
    label: "X",
    badge: "bg-slate-900/10 text-slate-800 dark:bg-white/10 dark:text-white",
  },
};

const slugify = (title) =>
  String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "post";

export const sortFeed = (items) =>
  [...items].sort((a, b) =>
    String(a.publishedAt) === String(b.publishedAt)
      ? a.title.localeCompare(b.title)
      : String(b.publishedAt).localeCompare(String(a.publishedAt))
  );

const dedupeSlugs = (items) => {
  const used = new Set();
  return items.map((item) => {
    let slug = item.slug || slugify(item.title);
    let base = slug;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    return { ...item, slug };
  });
};

let cache = null;

export function loadContentFeed() {
  if (!cache) {
    cache = Promise.allSettled(providers.map((provider) => provider.fetch()))
      .then((results) => {
        results.forEach((result, i) => {
          if (result.status === "rejected") {
            console.warn(
              `[content] provider "${providers[i].id}" failed`,
              result.reason
            );
          }
        });
        const items = results.flatMap((result) =>
          result.status === "fulfilled" ? result.value : []
        );
        return dedupeSlugs(sortFeed(items));
      })
      .catch((error) => {
        console.warn("[content] feed load failed", error);
        return localNotes;
      });
  }
  return cache;
}

export function useContentFeed() {
  const [items, setItems] = useState(() => sortFeed(localNotes));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadContentFeed().then((feed) => {
      if (!mounted) return;
      setItems(feed);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { items, loading };
}

export function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatContentDate(value) {
  if (!value) return "";
  const str = String(value);
  const m = str.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = m[3] ? Number(m[3]) : 0;
    if (year && month >= 1 && month <= 12) {
      const label = `${months[month - 1]} ${year}`;
      return day ? `${day} ${label}` : label;
    }
  }
  const parsed = new Date(str);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getUTCDate()} ${months[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
  }
  return str;
}