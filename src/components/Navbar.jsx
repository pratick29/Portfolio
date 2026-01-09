import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b border-slate-200 dark:border-white/10">
<div className="max-w-6xl mx-auto px-3 py-4 flex justify-between items-center">
<div className="flex items-center gap-4">

  {/* Name */}
  <span className="font-semibold text-slate-900 dark:text-white">
    Pratik
  </span>

  {/* Social Icons */}
  <div className="flex items-center gap-3 text-lg text-slate-600 dark:text-gray-400">
    <a
      href="https://www.linkedin.com/in/pratik-bothra-0b98b538a/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-600 transition-colors"
      aria-label="LinkedIn"
    >
      <FaLinkedin />
    </a>

    <a
      href="https://github.com/pratick29"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-slate-900 dark:hover:text-white transition-colors"
      aria-label="GitHub"
    >
      <FaGithub />
    </a>

    <a
      href="https://leetcode.com/u/pratick29/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-yellow-500 transition-colors"
      aria-label="LeetCode"
    >
      <SiLeetcode />
    </a>

    <a
      href="https://x.com/pratickbothra"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-sky-500 transition-colors"
      aria-label="X"
    >
      <FaXTwitter />
    </a>
  </div>
</div>


        <div className="hidden sm:flex items-center gap-3 text-lg">
  {/* Section links */}
  {sections.map((section) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      className={`transition-colors ${
        active === section.id
          ? "text-blue-500 font-medium"
          : "text-slate-600 dark:text-gray-300 hover:text-blue-500"
      }`}
    >
      {section.label}
    </a>
  ))}

  {/* Resume (new tab) */}
  <a
    href="/Pratik_Bothra_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-600 dark:text-gray-300
               hover:text-blue-500
               transition-colors font-medium"
  >
    Resume
  </a>

  {/* Theme Toggle — RIGHT MOST */}
  <ThemeToggle />
</div>

      </div>
    </nav>
  );
}
