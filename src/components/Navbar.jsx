import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { FiMail, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import { useRouter } from "../use-router";
import useTypewriter from "../use-typewriter";

const icons = {
  email: FiMail,
  linkedin: FaLinkedin,
  github: FaGithub,
  leetcode: SiLeetcode,
  x: FaXTwitter,
};

const isMac =
  typeof navigator !== "undefined" &&
  navigator.platform?.toLowerCase().includes("mac");
const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

const placeholder = "where you want to go";

export default function Navbar() {
  const { path, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const typed = useTypewriter(placeholder, true, { loopDelay: 3500 });

  const terminalPlaceholder = (
    <span className="flex-1 truncate text-left font-mono text-sm font-normal text-slate-400 dark:text-slate-500">
      <span className="text-sky-600 dark:text-sky-400">&gt;</span>{" "}
      {typed}
      <span className="caret-blink text-sky-600 dark:text-sky-400">
        ▍
      </span>
    </span>
  );

  const goHome = () => {
    if (path === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-palette"));
    setOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090b]/80">
      <div className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
          >
            {profile.logo}
          </a>

          <div className="hidden items-center gap-3 text-base text-slate-500 dark:text-slate-400 md:flex">
            {profile.socials.map((social) => {
              const Icon = icons[social.id];
              if (!Icon) return null;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`transition-colors ${social.hover}`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            title="Open command palette (Ctrl/⌘ + K)"
            className="hidden w-full max-w-md shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-transparent px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-sky-500/50 hover:text-sky-600 dark:border-white/10 dark:bg-transparent dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:text-sky-400 md:flex"
          >
            {terminalPlaceholder}
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
              {shortcutLabel}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5 md:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090b]/95 md:hidden">
          <div className="flex flex-col gap-3">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="flex w-full items-center gap-2 rounded-md border border-slate-200 bg-transparent px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-sky-500/50 hover:text-sky-600 dark:border-white/10 dark:bg-transparent dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:text-sky-400"
          >
            {terminalPlaceholder}
            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
              {shortcutLabel}
            </span>
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-base text-slate-500 dark:text-slate-400">
              {profile.socials.map((social) => {
                const Icon = icons[social.id];
                if (!Icon) return null;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`transition-colors ${social.hover}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
        </div>
      )}
    </nav>
  );
}