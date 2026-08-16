export const statusMeta = {
  completed: {
    label: "Completed",
    symbol: "✓",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    badge: "border-emerald-500/30 bg-emerald-500/10",
  },
  "in-development": {
    label: "In Development",
    symbol: "◐",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    badge: "border-amber-500/30 bg-amber-500/10",
  },
  concept: {
    label: "Concept",
    symbol: "○",
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
    badge: "border-sky-500/30 bg-sky-500/10",
  },
  archived: {
    label: "Archived",
    symbol: "✕",
    text: "text-slate-500 dark:text-slate-400",
    dot: "bg-slate-400",
    badge: "border-slate-400/30 bg-slate-400/10",
  },
};

export const orgMeta = {
  personal: { label: "Personal" },
  "pratick-labs": { label: "Pratick Labs" },
};

export function getStatus(status) {
  return statusMeta[status] ?? null;
}

export function getOrganization(organization) {
  return orgMeta[organization] ?? orgMeta.personal;
}