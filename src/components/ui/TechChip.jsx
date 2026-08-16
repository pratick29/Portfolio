import { chipClasses } from "../../data/tech-colors";

export default function TechChip({ children }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] ${chipClasses(children)}`}
    >
      {children}
    </span>
  );
}
