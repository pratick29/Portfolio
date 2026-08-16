import { useEffect, useState } from "react";

export default function useTypewriter(
  text,
  active = true,
  { delay = 600, typeSpeed = 55, loopDelay = null } = {}
) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) return undefined;
    let timer;
    let count = 0;
    const raf = requestAnimationFrame(() => setTyped(""));

    const type = () => {
      count += 1;
      setTyped(text.slice(0, count));
      if (count < text.length) {
        timer = setTimeout(type, typeSpeed);
      } else if (loopDelay) {
        timer = setTimeout(() => {
          count = 0;
          setTyped("");
          timer = setTimeout(type, 400);
        }, loopDelay);
      }
    };

    timer = setTimeout(type, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, active, delay, typeSpeed, loopDelay]);

  return typed;
}