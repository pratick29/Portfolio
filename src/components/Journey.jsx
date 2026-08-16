import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import PratikLog from "./PratikLog";
import ActivityFeed from "./ActivityFeed";

export default function Journey() {
  return (
    <section id="activity" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="02" color="violet">activity</SectionLabel>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-black/[0.03] transition-colors hover:border-violet-500/30 dark:border-white/[0.08] dark:bg-white/[0.02] dark:shadow-black/20">
            <div className="flex items-center gap-1.5 border-b border-slate-200 px-5 py-3.5 dark:border-white/[0.06]">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/10" />
              <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-500">
                activity / logs
              </span>
            </div>

            <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-2 lg:gap-0">
              <div className="lg:border-r lg:border-slate-200 lg:pr-7 dark:lg:border-white/[0.06]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Updates
                  </p>
                </div>

                <PratikLog />
              </div>

              <div className="lg:pl-7">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Logs
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                    latest 10
                  </span>
                </div>

                <ActivityFeed />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}