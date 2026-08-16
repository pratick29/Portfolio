import { contentConfig } from "../../data/config";

const stripHtml = (html) =>
  String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const textOf = (node, selector) =>
  node.querySelector(selector)?.textContent?.trim() || "";

export default {
  id: "medium",
  fetch: async () => {
    const { username } = contentConfig.content.medium;
    if (!username) return [];

    const rssPath = `/feed/@${encodeURIComponent(username)}`;
    const endpoints = [
      // Same-origin route: Vite dev proxy (vite.config.js) / Vercel rewrite (vercel.json)
      `/api/medium${rssPath}`,
      // Public CORS proxy fallback for other static hosts
      `https://api.allorigins.win/raw?url=${encodeURIComponent(
        `https://medium.com${rssPath}`
      )}`,
    ];

    let xml = "";
    let lastError = null;
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`${endpoint} responded ${res.status}`);
        xml = await res.text();
        if (xml.trim()) break;
      } catch (error) {
        lastError = error;
      }
    }
    if (!xml.trim()) throw lastError ?? new Error("medium feed empty");

    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const items = [...doc.querySelectorAll("item")];
    if (items.length === 0) return [];

    return items.map((item) => {
      const thumb = item.getElementsByTagNameNS("*", "thumbnail")[0];
      return {
        source: "medium",
        slug: "",
        title: textOf(item, "title"),
        description: stripHtml(textOf(item, "description")).slice(0, 280),
        image: thumb?.getAttribute("url") || "",
        publishedAt: textOf(item, "pubDate")
          ? new Date(textOf(item, "pubDate")).toISOString()
          : "",
        url: textOf(item, "link"),
        content: "",
        tags: [...item.querySelectorAll("category")].map((c) => c.textContent.trim()),
      };
    });
  },
};