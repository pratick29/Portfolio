import { profile } from "../data/profile";

const githubUser = profile.socials
  .find((social) => social.id === "github")
  ?.href.split("/")
  .pop();

function pushMessage(commits, branch) {
  const first = commits[0]?.message?.split("\n")[0]?.trim();
  if (first) return first;
  if (commits.length > 0) {
    return `Pushed ${commits.length} commit${
      commits.length === 1 ? "" : "s"
    } to ${branch}`;
  }
  return `Pushed to ${branch}`;
}

export const githubSource = {
  id: "github",
  label: "GitHub",
  async fetch({ signal } = {}) {
    const res = await fetch(
      `https://api.github.com/users/${githubUser}/events/public`,
      { signal, headers: { Accept: "application/vnd.github+json" } }
    );
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const events = await res.json();
    const items = [];

    for (const event of events) {
      let item = null;

      if (event.type === "PushEvent") {
        const commits = event.payload?.commits ?? [];
        const branch = (event.payload?.ref ?? "refs/heads/main").replace(
          "refs/heads/",
          ""
        );
        item = {
          id: event.id,
          source: "GitHub",
          repo: event.repo.name,
          message: pushMessage(commits, branch),
          date: new Date(event.created_at),
        };
      } else if (event.type === "ReleaseEvent") {
        item = {
          id: event.id,
          source: "GitHub",
          repo: event.repo.name,
          message: `Released ${
            event.payload?.release?.tag_name ?? "a new version"
          }`,
          date: new Date(event.created_at),
        };
      } else if (event.type === "CreateEvent") {
        const refType = event.payload?.ref_type ?? "ref";
        const ref = event.payload?.ref;
        item = {
          id: event.id,
          source: "GitHub",
          repo: event.repo.name,
          message: ref
            ? `Created ${refType} ${ref}`
            : `Created ${refType}`,
          date: new Date(event.created_at),
        };
      } else if (
        event.type === "IssuesEvent" &&
        event.payload?.action === "opened"
      ) {
        const issue = event.payload?.issue;
        item = {
          id: event.id,
          source: "GitHub",
          repo: event.repo.name,
          message: `Opened issue #${issue?.number ?? "?"}: ${
            issue?.title ?? "Untitled"
          }`,
          date: new Date(event.created_at),
        };
      }

      if (item) items.push(item);
    }

    return items;
  },
};