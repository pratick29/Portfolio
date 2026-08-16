export default {
  id: "x",
  fetch: async () => {
    // X has no open posts API for individuals without paid access.
    // Wire this provider to an official API later, e.g.:
    //   const res = await fetch("https://api.x.com/2/users/:id/tweets", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    // Return items in the unified shape:
    //   { source: "x", slug, title, description, image,
    //     publishedAt, url, content, tags }
    return [];
  },
};