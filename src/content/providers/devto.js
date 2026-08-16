import { contentConfig } from "../../data/config";

export default {
  id: "devto",
  fetch: async () => {
    const { username, perPage } = contentConfig.content.devto;
    if (!username) return [];

    const res = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(username)}&per_page=${perPage}`
    );
    if (!res.ok) throw new Error(`dev.to responded ${res.status}`);

    const articles = await res.json();
    if (!Array.isArray(articles)) return [];

    return articles.map((article) => ({
      source: "devto",
      slug: article.slug || "",
      title: article.title || "",
      description: article.description || "",
      image: article.cover_image || "",
      publishedAt: article.published_at || "",
      url: article.url || "",
      content: article.body_markdown || "",
      tags: Array.isArray(article.tags) ? article.tags : [],
    }));
  },
};