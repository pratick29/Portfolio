import { githubSource } from "./github";

export const activitySources = [githubSource];

export async function fetchActivityFeed({ limit = 10, signal } = {}) {
  const results = await Promise.allSettled(
    activitySources.map((source) => source.fetch({ signal }))
  );

  const items = [];
  let failures = 0;

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      failures += 1;
      console.warn(`[activity] ${activitySources[i].id} failed:`, result.reason);
    }
  });

  return {
    items: items
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit),
    failures,
  };
}