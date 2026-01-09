import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
  });

  // 1️⃣ Apply theme to DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // 2️⃣ Toggle manually
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
  onClick={toggleTheme}
  className="ml-2 px-3 py-1.5 rounded-full text-sm
             bg-slate-200 text-slate-800
             hover:bg-slate-300
             dark:bg-slate-800 dark:text-slate-200
             dark:hover:bg-slate-700
             transition-all"
  aria-label="Toggle theme"
>
  {theme === "dark" ? "☀️" : "🌙"}
</button>

  );
}
