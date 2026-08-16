import { profile } from "../data/profile";
import { FaCoffee } from "react-icons/fa";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Terminal from "./ui/Terminal";

export default function Support() {
  const { labs } = profile;

  return (
    <section id="support" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionLabel index="08" color="amber">Support</SectionLabel>
        </Reveal>

        <Reveal>
          <Terminal title="support" right="[ ko-fi ]">
            <div className="px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
                <span className="text-amber-400/80">➜</span>
                <span className="text-amber-300/80">~/support</span>
                <span>$</span>
                <span className="text-slate-400">brew install coffee</span>
              </div>

              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center md:p-10">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Support my work
                </h2>

                <p className="mx-auto mt-4 max-w-md leading-relaxed text-slate-400">
                  {labs.koFiHint}
                </p>

                <a
                  href={profile.koFi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2.5 rounded-lg bg-amber-500/15 px-6 py-3 font-mono text-sm font-medium tracking-widest text-amber-300 transition-all hover:bg-amber-500/25 active:scale-[0.98]"
                >
                  <FaCoffee className="transition-transform group-hover:-translate-y-0.5 group-hover:text-amber-300" />
                  {labs.koFiLabel} on Ko-fi
                </a>
              </div>
            </div>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}
