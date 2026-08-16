const COLORS = {
  sky: "text-sky-600 dark:text-sky-400",
  violet: "text-violet-600 dark:text-violet-400",
  amber: "text-amber-600 dark:text-amber-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  rose: "text-rose-600 dark:text-rose-400",
};

export default function SectionLabel({ index, color = "sky", children }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className={`font-mono text-xs ${COLORS[color]}`}>
        {index}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        {children}
      </span>
      <span className="h-px flex-1 bg-slate-200 dark:bg-white/[0.08]" />
    </div>
  );
}
