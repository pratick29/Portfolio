import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { Link } from "../router";
import TechChip from "./ui/TechChip";
import Highlight from "./ui/Highlight";

function useTypewriter(lines, speed = 14) {
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const [counts, setCounts] = useState(() =>
    reducedMotion ? lines.map((l) => l.length) : lines.map(() => 0)
  );

  useEffect(() => {
    if (reducedMotion) return;
    let li = 0;
    let ci = 0;
    let timer;
    const tick = () => {
      if (li >= lines.length) return;
      if (ci < lines[li].length) {
        ci += 1;
        setCounts((c) => c.map((v, i) => (i === li ? ci : v)));
        timer = setTimeout(tick, speed);
      } else {
        li += 1;
        ci = 0;
        if (li < lines.length) timer = setTimeout(tick, 280);
      }
    };
    timer = setTimeout(tick, 350);
    return () => clearTimeout(timer);
  }, [lines, speed, reducedMotion]);

  return counts;
}

function Cursor() {
  return <span className="caret-blink text-emerald-400">▌</span>;
}

const GH_USER = "pratick29";
const LC_USER = "pratick29";
const LC_CACHED_SOLVED = 151;

function useLiveStats() {
  const [stats, setStats] = useState({
    ghRepos: null,
    ghFollowers: null,
    lcSolved: LC_CACHED_SOLVED,
  });

  useEffect(() => {
    let alive = true;
    const timeout = (ms, promise) =>
      Promise.race([
        promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), ms)
        ),
      ]);

    timeout(5000, fetch(`https://api.github.com/users/${GH_USER}`))
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setStats((s) => ({
          ...s,
          ghRepos: typeof d.public_repos === "number" ? d.public_repos : null,
          ghFollowers: typeof d.followers === "number" ? d.followers : null,
        }));
      })
      .catch(() => {});

    timeout(5000, fetch(`https://leetcode-stats-api.herokuapp.com/${LC_USER}`))
      .then((r) => r.json())
      .then((d) => {
        if (!alive || d?.status === "error") return;
        setStats((s) => ({
          ...s,
          lcSolved: typeof d.totalSolved === "number" ? d.totalSolved : s.lcSolved,
        }));
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  return stats;
}

export default function Hero() {
  const { systemPanel } = profile;
  const live = useLiveStats();
  const lines = useMemo(
    () => [profile.heroDescription, profile.heroSecondParagraph],
    []
  );
  const counts = useTypewriter(lines);
  const typing = counts[0] < lines[0].length || counts[1] < lines[1].length;
  const rowColors = {
    Backend: "text-sky-400",
    Database: "text-violet-400",
    API: "text-sky-400",
    Projects: "text-amber-400",
    "Pratick Labs": "text-rose-400",
    "Github Repos": "text-slate-300",
    "Github Followers": "text-slate-300",
    "LeetCode Solved": "text-amber-400",
  };
  const dotColors = {
    Backend: "bg-sky-500",
    Database: "bg-violet-500",
    API: "bg-sky-500",
    Projects: "bg-amber-500",
    "Pratick Labs": "bg-rose-500",
    "Github Repos": "bg-slate-500",
    "Github Followers": "bg-slate-500",
    "LeetCode Solved": "bg-amber-500",
  };
  const systemRows = [
    ...systemPanel.rows,
    { label: "Projects", value: projects.length },
    {
      label: "Pratick Labs",
      value: projects.filter((p) => p.organization === "pratick-labs").length,
    },
    { label: "Github Repos", value: live.ghRepos ?? "—" },
    { label: "Github Followers", value: live.ghFollowers ?? "—" },
    {
      label: "LeetCode Solved",
      value: live.lcSolved ?? "—",
      cached: true,
      hint: "cached value — leetcode API unavailable",
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center px-4 pt-20 pb-28 sm:px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -top-48 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-sky-500/[0.06] blur-[120px] dark:bg-sky-500/10" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="px-2 font-mono sm:px-3">
            <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
              <span className="text-sky-400/80">➜</span>
              <span className="text-violet-300/80">~</span>
              <span>$</span>
              <span className="text-slate-400">cat ./intro.md</span>
              {counts[0] === 0 && <Cursor />}
            </div>

              <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
                {profile.headline.text}
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {profile.headline.accent}
                </span>
              </h1>

              <p className="mt-5 min-h-[4.5rem] max-w-xl leading-relaxed text-slate-300">
                {counts[0] > 0 && <Highlight text={profile.heroDescription.slice(0, counts[0])} />}
                {counts[0] > 0 && counts[0] < lines[0].length && <Cursor />}
              </p>

              <p className="mt-3 min-h-[3.25rem] max-w-xl leading-relaxed text-slate-400">
                {counts[1] > 0 && <Highlight text={profile.heroSecondParagraph.slice(0, counts[1])} />}
                {counts[1] > 0 && counts[1] < lines[1].length && <Cursor />}
                {!typing && counts[1] === lines[1].length && <Cursor />}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-lg bg-sky-500/15 px-5 py-2.5 font-mono text-sm font-medium tracking-widest text-sky-300 transition-all hover:bg-sky-500/25 active:scale-[0.98]"
                >
                  <span className="text-slate-600">[</span>
                  view projects
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  <span className="text-slate-600">]</span>
                </Link>
                <a
                  href={profile.socials.find((s) => s.id === "github").href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 font-mono text-sm font-medium tracking-widest text-slate-300 transition-all hover:border-white/25 hover:bg-white/[0.05] active:scale-[0.98]"
                >
                  <FaGithub />
                  github
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-violet-400/30 bg-violet-400/[0.06] px-5 py-2.5 font-mono text-sm font-medium tracking-widest text-violet-300 transition-all hover:border-violet-400/60 hover:bg-violet-400/15 active:scale-[0.98]"
                >
                  <FiDownload />
                  resume
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <Link
                  to="/pratick-labs"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 transition-colors hover:text-violet-300"
                >
                  independent work · <span className="font-medium text-violet-300">Pratick Labs</span>
                </Link>
              </div>
            </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0e] font-mono shadow-xl shadow-black/20"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              {systemPanel.title}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {systemPanel.indicator}
            </span>
          </div>

          <div className="space-y-3 px-4 py-4">
            {systemRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between font-mono text-xs"
                title={row.hint}
              >
                <span className="text-slate-500">
                  {row.label}
                  {row.cached && (
                    <span className="ml-1.5 text-[9px] text-slate-600">*</span>
                  )}
                </span>
                <span className={`flex items-center gap-1.5 ${rowColors[row.label] ?? "text-emerald-400"}`}>
                  <span className={`h-1 w-1 rounded-full ${dotColors[row.label] ?? "bg-emerald-500"}`} />
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] px-4 pt-3">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {systemPanel.stackTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {systemPanel.stack.map((tech) => (
                <TechChip key={tech}>{tech}</TechChip>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-white/[0.06] px-4 py-3">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-400">
              <span className="h-1 w-1 rounded-full bg-amber-500" />
              {systemPanel.availability.status}
            </span>
            <p className="mt-1.5 font-mono text-[10px] text-slate-500">
              {systemPanel.availability.items.join(" · ")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
