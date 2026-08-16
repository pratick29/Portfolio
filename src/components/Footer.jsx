import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { profile } from "../data/profile";

const icons = {
  email: FiMail,
  linkedin: FaLinkedin,
  github: FaGithub,
  leetcode: SiLeetcode,
  x: FaXTwitter,
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-4 py-10 sm:px-6 dark:border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5">
        <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <div className="flex items-center justify-center gap-5 text-lg text-slate-500 dark:text-slate-400">
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
    </footer>
  );
}