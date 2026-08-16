import { Fragment } from "react";
import { categoryFor, TECH_KEYWORDS } from "../../data/tech-colors";

const PHRASE_COLORS = {
  "intelligent": "text-rose-400",
  "data-driven": "text-rose-400",
  "ai-powered": "text-rose-400",
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isWordChar = (ch) => /[a-z0-9]/i.test(ch);

const toToken = (token) => {
  const escaped = escapeRegExp(token);
  return `${isWordChar(token[0]) ? "\\b" : ""}${escaped}${isWordChar(token[token.length - 1]) ? "\\b" : ""}`;
};

const TOKEN_RE = new RegExp(
  `(${[...Object.keys(PHRASE_COLORS), ...TECH_KEYWORDS]
    .sort((a, b) => b.length - a.length)
    .map(toToken)
    .join("|")})`,
  "gi"
);

const TEXT_CLASS = {
  backend: "text-sky-400",
  frontend: "text-amber-400",
  aiml: "text-rose-400",
  database: "text-violet-400",
};

export default function Highlight({ text, className }) {
  const parts = String(text).split(TOKEN_RE);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          const phraseColor = PHRASE_COLORS[part.toLowerCase()];
          const category = categoryFor(part);
          const color = phraseColor ?? TEXT_CLASS[category];
          if (color) {
            return (
              <span key={i} className={color}>
                {part}
              </span>
            );
          }
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </span>
  );
}
