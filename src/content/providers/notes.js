import fm from "front-matter";

const modules = import.meta.glob("../../content/notes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const parseNote = ([path, raw]) => {
  let data = {};
  let content = raw;

  try {
    const parsed = fm(raw);
    data = parsed.attributes || {};
    content = parsed.body || "";
  } catch (error) {
    console.warn(`[content/notes] malformed frontmatter in "${path}"`, error);
  }

  const slug = data.slug || path.split("/").pop().replace(/\.md$/, "");

  return {
    source: "note",
    slug,
    title: data.title || "",
    description: data.description || "",
    image: data.image || "",
    publishedAt: String(data.date ?? ""),
    url: data.url || "",
    content,
    tags: Array.isArray(data.tags) ? data.tags : [],
  };
};

export const localNotes = Object.entries(modules)
  .map(parseNote)
  .sort((a, b) =>
    a.publishedAt === b.publishedAt
      ? a.title.localeCompare(b.title)
      : String(b.publishedAt).localeCompare(String(a.publishedAt))
  );

if (import.meta.env.DEV) {
  const slugs = new Set();
  for (const note of localNotes) {
    if (!note.slug || !note.title) {
      console.warn("[content/notes] every note needs a slug and title", note);
    }
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(note.publishedAt)) {
      console.warn(
        `[content/notes] invalid date "${note.publishedAt}" on "${note.slug}"`
      );
    }
    if (slugs.has(note.slug)) {
      console.warn(`[content/notes] duplicate slug: "${note.slug}"`);
    }
    slugs.add(note.slug);
  }
}

export default {
  id: "note",
  fetch: () => Promise.resolve(localNotes),
};