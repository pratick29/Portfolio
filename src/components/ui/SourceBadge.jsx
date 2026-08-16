import { sourceMeta } from "../../content";

export default function SourceBadge({ source }) {
  const meta = sourceMeta[source];
  if (!meta) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${meta.badge}`}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-60" />
      {meta.label}
    </span>
  );
}