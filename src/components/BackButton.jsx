import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowUp } from "react-icons/fi";
import { useRouter } from "../use-router";

export default function BackButton() {
  const { path, navigate } = useRouter();
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const goBack = () => {
    if (path !== "/") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate("/");
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isHome = path === "/";

  return (
    <AnimatePresence>
      {visible && !footerVisible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={goBack}
          aria-label={isHome ? "Back to top" : "Go back"}
          title={isHome ? "Back to top" : "Go back"}
          className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-600 shadow-lg shadow-black/[0.08] backdrop-blur transition-colors hover:border-sky-500/50 hover:text-sky-600 active:scale-95 dark:border-white/10 dark:bg-[#09090b]/90 dark:text-slate-300 dark:hover:border-sky-400/40 dark:hover:text-sky-400"
        >
          {isHome ? <FiArrowUp /> : <FiArrowLeft />}
        </motion.button>
      )}
    </AnimatePresence>
  );
}