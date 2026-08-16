import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBookOpen,
  FiCpu,
  FiFile,
  FiFolder,
  FiGithub,
  FiHome,
  FiLinkedin,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { FaCoffee } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "../data/profile";
import { useRouter } from "../use-router";
import { goToSection } from "../navigation";
import useTypewriter from "../use-typewriter";

const iconMap = {
  email: FiMail,
  linkedin: FiLinkedin,
  github: FiGithub,
  leetcode: SiLeetcode,
  x: FaXTwitter,
};

const placeholder = "Where you want to go !";

export default function CommandPalette() {
  const { path, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const typed = useTypewriter(placeholder, open && query === "", {
    delay: 300,
  });

  const commands = useMemo(
    () => [
      {
        group: "Navigate",
        items: [
          {
            id: "home",
            label: "Home",
            group: "Navigate",
            icon: FiHome,
            action: () => (path === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : navigate("/")),
          },
          { id: "about", label: "About", group: "Navigate", icon: FiUser, action: () => goToSection(navigate, "about") },
          { id: "education", label: "Education", group: "Navigate", icon: FiBookOpen, action: () => { goToSection(navigate, "education"); window.setTimeout(() => window.dispatchEvent(new CustomEvent("switch-tab", { detail: { tab: "education" } })), 150); } },
          { id: "skills", label: "Skills", group: "Navigate", icon: FiCpu, action: () => { goToSection(navigate, "skills"); window.setTimeout(() => window.dispatchEvent(new CustomEvent("switch-tab", { detail: { tab: "skills" } })), 150); } },
          { id: "projects", label: "All Projects", group: "Navigate", icon: FiFolder, action: () => navigate("/projects") },
          { id: "labs", label: "Pratick Labs", group: "Navigate", icon: FiCpu, action: () => navigate("/pratick-labs") },
          { id: "notes", label: "All Notes", group: "Navigate", icon: FiBookOpen, action: () => navigate("/notes") },
          { id: "contact", label: "Contact", group: "Navigate", icon: FiMail, action: () => goToSection(navigate, "contact") },
        ],
      },
      {
        group: "Links",
        items: [
          ...profile.socials.map((social) => ({
            label: social.label,
            group: "Links",
            icon: iconMap[social.id] || FiGithub,
            href: social.href,
          })),
          { label: "Resume (PDF)", group: "Links", icon: FiFile, href: profile.resume },
          { label: "Support on Ko-fi", group: "Links", icon: FaCoffee, href: profile.koFi },
        ],
      },
    ],
    [path, navigate]
  );

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-palette", onOpen);
    return () => window.removeEventListener("open-palette", onOpen);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.flatMap((g) => g.items);
    return commands.flatMap((g) =>
      g.items.filter((item) => item.label.toLowerCase().includes(q))
    );
  }, [query, commands]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          setOpen(false);
        } else {
          setQuery("");
          setIndex(0);
          setOpen(true);
        }
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "/" && !open) {
        const target = e.target;
        const isTyping =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.isContentEditable);
        if (!isTyping) {
          e.preventDefault();
          setQuery("");
          setIndex(0);
          setOpen(true);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const run = (command) => {
    setOpen(false);
    if (command.action) command.action();
    if (command.href) window.open(command.href, "_blank", "noopener,noreferrer");
  };

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && filtered[index]) {
      e.preventDefault();
      run(filtered[index]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="command-palette w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0c0c10]"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-white/[0.06]">
              <span className="font-mono text-sm font-bold text-sky-500 dark:text-sky-400">
                &gt;
              </span>
              <div className="relative flex-1">
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder=""
                  aria-label="Type a command"
                  autoFocus
                  className="w-full bg-transparent py-3.5 font-mono text-sm text-slate-900 caret-sky-500 outline-none dark:text-slate-200"
                />
                {query === "" && (
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center font-mono text-sm text-sky-600/70 dark:text-sky-400/70">
                    {typed}
                    <span className="caret-blink text-sky-600 dark:text-sky-400">
                      ▍
                    </span>
                  </span>
                )}
              </div>
              <kbd className="rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 dark:border-white/10">
                esc
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center font-mono text-xs text-slate-500">
                  no results for "{query}"
                </p>
              )}

              {filtered.map((command, i) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id ?? command.label}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(command)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === index
                        ? "bg-sky-500/10 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{command.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600">
                      {command.group}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2.5 font-mono text-[10px] text-slate-400 dark:border-white/[0.06] dark:text-slate-600">
              <span>↑↓ navigate · ↵ select</span>
              <span>ctrl k to toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}