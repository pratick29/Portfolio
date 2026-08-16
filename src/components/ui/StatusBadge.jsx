export default function StatusBadge({ label, dot = "bg-emerald-500", pulse = true }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`}
          />
        )}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}