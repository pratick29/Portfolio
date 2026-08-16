import { useEffect, useMemo, useState } from "react";
import { education } from "../data/education";

function buildRows(items) {
  const rows = [];
  const groups = [];
  for (const item of items) {
    const color = "#38bdf8";
    const indexes = [];
    indexes.push(rows.length);
    rows.push({
      type: "header",
      id: `h-${item.id}`,
      color,
      label: item.institution,
    });
    indexes.push(rows.length);
    rows.push({
      type: "record",
      id: item.id,
      color,
      label: item.degree,
      value: item.grade,
      period: `${item.startDate}–${item.endDate}`,
    });
    groups.push({ id: item.id, color, label: item.institution, indexes });
  }
  return { rows, groups };
}

export default function EducationTerminal() {
  const { rows, groups } = useMemo(() => buildRows(education), []);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typedRow, setTypedRow] = useState(reducedMotion ? rows.length : 0);
  const [typedCol, setTypedCol] = useState(0);
  const [done, setDone] = useState(reducedMotion);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let alive = true;
    let row = 0;
    let col = 0;
    const timer = setInterval(() => {
      if (!alive) return;
      const text = rows[row] ? rows[row].label : "";
      if (col < text.length) {
        col += 1;
        setTypedRow(row);
        setTypedCol(col);
      } else {
        row += 1;
        col = 0;
        if (row >= rows.length) {
          clearInterval(timer);
          setTypedRow(row);
          setTypedCol(0);
          setDone(true);
          return;
        }
        setTypedRow(row);
        setTypedCol(0);
      }
    }, 14);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [rows, reducedMotion]);

  const typedText = (row) => {
    const r = rows[row];
    if (!r) return "";
    if (row < typedRow) return r.label;
    if (row === typedRow) return r.label.slice(0, typedCol);
    return "";
  };

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0e]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(16,185,129,0.05), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #34d399, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-14 bottom-0 h-64 w-64 rounded-full opacity-[0.09] blur-3xl"
        style={{ background: "radial-gradient(circle, #2dd4bf, transparent 70%)" }}
      />

      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500/70" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            education — zsh
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          {education.length} records
        </p>
      </div>

      <div className="scroll-area relative max-h-[400px] overflow-y-auto px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
          <span className="text-sky-400/80">➜</span>
          <span className="text-sky-300/80">~/education</span>
          <span>$</span>
          <span className="text-slate-400">cat ./history.log</span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-y-1">
          {groups.map((group) => (
            <div key={group.id} className="min-w-0">
              {group.indexes.map((i) => {
                const row = rows[i];
                const text = typedText(i);
                const isDone =
                  i < typedRow ||
                  (i === typedRow && done && typedCol >= row.label.length);
                const isActive = hovered === row.id;
                const isHeader = row.type === "header";
                return (
                  <div
                    key={row.id}
                    onPointerEnter={() => !isHeader && setHovered(row.id)}
                    onPointerLeave={() => setHovered(null)}
                    className={`group flex min-h-[24px] items-center gap-2 rounded-md px-2 font-mono text-[11px] transition-colors ${
                      isHeader
                        ? "mt-2.5 first:mt-0"
                        : isActive
                          ? "bg-white/[0.04]"
                          : "hover:bg-white/[0.03]"
                    }`}
                    style={
                      !isHeader && isActive
                        ? { boxShadow: `inset 2px 0 0 ${row.color}` }
                        : undefined
                    }
                  >
                    {isHeader ? (
                      <>
                        <span className="shrink-0 text-slate-600">[</span>
                        <span
                          className="shrink-0 text-[9px] uppercase tracking-[0.3em]"
                          style={{ color: row.color }}
                        >
                          {text}
                        </span>
                        <span className="shrink-0 text-slate-600">]</span>
                        <span className="h-px flex-1 bg-white/[0.05]" />
                      </>
                    ) : (
                      <>
                        <span
                          className="shrink-0 text-[10px] transition-colors"
                          style={{ color: isActive ? row.color : "transparent" }}
                        >
                          ❯
                        </span>
                        <span
                          className="min-w-0 flex-1 truncate font-semibold text-slate-200 transition-colors"
                          style={
                            isActive
                              ? { textShadow: `0 0 10px ${row.color}` }
                              : undefined
                          }
                          title={`${row.label} · ${row.period}`}
                        >
                          {text}
                          <span className="text-slate-500"> · {row.period}</span>
                        </span>
                        {isDone && (
                          <span
                            className="w-8 shrink-0 border-b border-dotted border-white/[0.12] transition-colors"
                            style={isActive ? { borderColor: `${row.color}55` } : undefined}
                          />
                        )}
                        <span
                          className="shrink-0 font-mono text-[10px] uppercase tracking-widest transition-colors"
                          style={{
                            color: isActive ? row.color : "#64748b",
                            opacity: isDone ? 1 : 0,
                          }}
                        >
                          {row.value}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 px-2 font-mono text-[11px]">
          <span className="text-sky-400/80">➜</span>
          <span className="text-sky-300/80">~/education</span>
          <span>$</span>
          <span className="text-slate-500">
            {done ? "history complete" : "loading history…"}
          </span>
          <span className="cn-cursor -ml-1 inline-block h-3 w-[6px] bg-sky-400/80" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
