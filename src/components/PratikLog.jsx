import { logEntries, logTypes } from "../data/log";

export default function PratikLog() {
  if (logEntries.length === 0) {
    return (
      <p className="py-8 text-center font-mono text-xs text-slate-400 dark:text-slate-500">
        no log entries yet
      </p>
    );
  }

  return (
    <div className="scroll-area max-h-80 overflow-y-auto overscroll-contain rounded-xl border border-slate-200/80 bg-slate-50/60 px-4 dark:border-white/[0.06] dark:bg-[#0c0c10]">
      <div className="divide-y divide-slate-200/70 dark:divide-white/[0.04]">
        {logEntries.map((entry) => {
          const type = logTypes[entry.type];
          return (
            <div key={entry.id} className="flex items-start gap-3 py-3">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  type?.dot ?? "bg-slate-400"
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                    {entry.date}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${
                      type?.text ?? "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {type?.label ?? entry.type}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {entry.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}