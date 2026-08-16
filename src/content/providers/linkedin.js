export default {
  id: "linkedin",
  fetch: async () => {
    // LinkedIn has no public article/posts API for individuals.
    // Wire this provider to an official API later, e.g.:
    //   const res = await fetch("https://api.linkedin.com/v2/...", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    // Return items in the unified shape:
    //   { source: "linkedin", slug, title, description, image,
    //     publishedAt, url, content, tags }
    return [];
  },
};