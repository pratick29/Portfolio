import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "../use-router";
import { goToSection } from "../navigation";

export default function QuickContact() {
  const { navigate } = useRouter();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (footerVisible) return null;

  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        goToSection(navigate, "contact");
      }}
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-lg shadow-black/[0.06] transition-all hover:border-sky-500/50 hover:text-sky-600 dark:border-white/10 dark:bg-[#0c0c10]/90 dark:text-slate-200 dark:hover:text-sky-400"
    >
      Let's Talk
      <FiArrowRight className="h-4 w-4" />
    </a>
  );
}