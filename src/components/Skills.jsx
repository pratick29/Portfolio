import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import SkillConstellation from "./SkillConstellation";
import EducationTerminal from "./EducationTerminal";

const tabs = ["skills", "education"];

export default function Skills() {
  const [tab, setTab] = useState("skills");

  useEffect(() => {
    const onSwitch = (e) => {
      const next = e.detail?.tab;
      if (next === "education" || next === "skills") setTab(next);
    };
    window.addEventListener("switch-tab", onSwitch);
    return () => window.removeEventListener("switch-tab", onSwitch);
  }, []);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="03" color="sky">Skills / Education</SectionLabel>
        </Reveal>

        <Reveal>
          <div
            id="education"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-white/[0.08] dark:bg-white/[0.02]"
          >
            {tabs.map((name) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                aria-pressed={tab === name}
                className={`rounded-md px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  tab === name
                    ? "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {tab === "skills" ? (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SkillConstellation />
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <EducationTerminal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}