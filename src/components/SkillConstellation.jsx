import { useEffect, useMemo, useState } from "react";
import { buildConstellation } from "../data/constellation";
import { Link } from "../router";
import { FiGrid, FiTerminal, FiX } from "react-icons/fi";
import Highlight from "./ui/Highlight";

function buildRows(areas, byArea) {
  const rows = [];
  const groups = [];
  for (const area of areas) {
    const areaNodes = byArea.get(area.id) ?? [];
    if (areaNodes.length === 0) continue;
    const indexes = [];
    indexes.push(rows.length);
    rows.push({ type: "header", id: `h-${area.id}`, color: area.color, label: area.label });
    for (const node of areaNodes) {
      indexes.push(rows.length);
      rows.push({
        type: "skill",
        id: node.id,
        color: node.color,
        label: node.label,
        what: node.what,
        projects: node.projects.length,
      });
    }
    groups.push({ id: area.id, color: area.color, label: area.label, indexes });
  }
  return { rows, groups };
}

export default function SkillConstellation() {
  const { nodes, edges: coedges, areas } = useMemo(() => buildConstellation(), []);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const byArea = useMemo(() => {
    const map = new Map();
    for (const node of nodes) {
      if (!map.has(node.area)) map.set(node.area, []);
      map.get(node.area).push(node);
    }
    return map;
  }, [nodes]);
  const { rows, groups } = useMemo(() => buildRows(areas, byArea), [areas, byArea]);
  const connectedOf = useMemo(() => {
    const map = new Map(nodes.map((n) => [n.id, []]));
    for (const edge of coedges) {
      if (edge.a === edge.b) continue;
      map.get(edge.a).push(edge.b);
      map.get(edge.b).push(edge.a);
    }
    return map;
  }, [nodes, coedges]);

  const [view, setView] = useState("log");
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [typedRow, setTypedRow] = useState(reducedMotion ? rows.length : 0);
  const [typedCol, setTypedCol] = useState(0);
  const [done, setDone] = useState(reducedMotion);

  const selectedNode = selected ? nodeById.get(selected) : null;

  useEffect(() => {
    if (reducedMotion || view !== "log") return undefined;
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
  }, [rows, reducedMotion, view]);

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
            skills — zsh
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-white/10 bg-[#0c0c10]/80 p-1 backdrop-blur">
          <button
            onClick={() => setView("log")}
            aria-pressed={view === "log"}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              view === "log"
                ? "bg-sky-500/15 text-sky-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FiTerminal className="h-3 w-3" />
            log
          </button>
          <button
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              view === "grid"
                ? "bg-sky-500/15 text-sky-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FiGrid className="h-3 w-3" />
            grid
          </button>
        </div>
      </div>

      {view === "log" ? (
        <div className="scroll-area relative max-h-[400px] overflow-y-auto px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-600">
            <span className="text-sky-400/80">➜</span>
            <span className="text-sky-300/80">~/skills</span>
            <span>$</span>
            <span className="text-slate-400">cat ./stack.log</span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-1 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <div key={group.id} className="min-w-0">
                {group.indexes.map((i) => {
                  const row = rows[i];
                  const text = typedText(i);
                  const isDone =
                    i < typedRow ||
                    (i === typedRow && done && typedCol >= row.label.length);
                  const isActive = selected === row.id || hovered === row.id;
                  const isHeader = row.type === "header";
                  return (
                    <div
                      key={row.id}
                      onPointerEnter={() => !isHeader && setHovered(row.id)}
                      onPointerLeave={() => setHovered(null)}
                      onClick={() =>
                        !isHeader && setSelected((cur) => (cur === row.id ? null : row.id))
                      }
                      className={`group flex min-h-[24px] items-center gap-2 rounded-md px-2 font-mono text-[11px] transition-colors ${
                        isHeader
                          ? "mt-2.5 first:mt-0"
                          : isActive
                            ? "bg-white/[0.04]"
                            : "hover:bg-white/[0.03]"
                      }`}
                      style={
                        !isHeader && isActive ? { boxShadow: `inset 2px 0 0 ${row.color}` } : undefined
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
                            className="shrink-0 font-semibold text-slate-200 transition-colors"
                            style={
                              isActive
                                ? { color: "#f8fafc", textShadow: `0 0 10px ${row.color}` }
                                : undefined
                            }
                          >
                            {text}
                          </span>
                          {isDone && (
                            <span
                              className="min-w-0 flex-1 border-b border-dotted border-white/[0.12] transition-colors"
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
                            {row.projects}p
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
              {selected ? (
                <>
                  <span className="text-sky-400/80">➜</span>
                  <span className="text-sky-300/80">~/skills</span>
                  <span>$</span>
                  <span className="text-slate-300">
                    inspect{" "}
                    <span className="text-sky-300">{selectedNode.label}</span>
                  </span>
                </>
              ) : (
                <span className="text-slate-500">
                  {done ? "click a skill to inspect" : "loading stack…"}
                </span>
              )}
              <span className="cn-cursor -ml-1 inline-block h-3 w-[6px] bg-sky-400/80" />
            </div>
        </div>
      ) : (
        <div className="scroll-area relative max-h-[440px] overflow-y-auto px-4 py-5 sm:px-6">
          {areas.map((area) => {
            const areaNodes = byArea.get(area.id) ?? [];
            if (areaNodes.length === 0) return null;
            return (
              <div key={area.id} className="mb-6 last:mb-0">
                <div className="mb-2.5 flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: area.color, boxShadow: `0 0 6px ${area.color}` }}
                  />
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: area.color }}
                  >
                    {area.label}
                  </p>
                  <span className="font-mono text-[10px] text-slate-500">
                    {String(areaNodes.length).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {areaNodes.map((node) => {
                    const isActive = selected === node.id || hovered === node.id;
                    return (
                      <button
                        key={node.id}
                        onPointerEnter={() => setHovered(node.id)}
                        onPointerLeave={() => setHovered(null)}
                        onClick={() => setSelected((cur) => (cur === node.id ? null : node.id))}
                        className="group flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left transition-all hover:-translate-y-px"
                        style={
                          isActive
                            ? { borderColor: node.color, boxShadow: `0 0 14px ${node.color}33` }
                            : undefined
                        }
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: node.color,
                            boxShadow: `0 0 6px ${node.color}`,
                            opacity: isActive ? 1 : 0.7,
                          }}
                        />
                        <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-200">
                          {node.label}
                        </span>
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-widest text-slate-600">
                          {node.projects.length}p
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "overlay",
        }}
      />

      {selectedNode && (
        <div className="absolute right-3 top-14 z-20 max-h-[calc(100%-72px)] w-[300px] overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0c10]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="font-mono text-sm font-semibold"
                style={{
                  color: selectedNode.color,
                  textShadow: `0 0 12px ${selectedNode.color}`,
                }}
              >
                {selectedNode.label}
              </p>
              <span
                className="mt-1 inline-block rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: selectedNode.color }}
              >
                {selectedNode.areaLabel}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close skill details"
              className="rounded-md border border-white/10 p-1.5 text-slate-400 transition-colors hover:border-white/25 hover:text-slate-100"
            >
              <FiX className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            <Highlight text={selectedNode.what} />
          </p>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            related
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {connectedOf.get(selected).length > 0 ? (
              connectedOf.get(selected).map((id) => {
                const cNode = nodeById.get(id);
                if (!cNode) return null;
                return (
                  <button
                    key={id}
                    onClick={() => setSelected(id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-slate-300 transition-colors hover:border-white/30"
                    title="linked through a shared project"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cNode.color, boxShadow: `0 0 5px ${cNode.color}` }}
                    />
                    {cNode.label}
                  </button>
                );
              })
            ) : (
              <p className="text-[11px] text-slate-500">no shared-project links yet</p>
            )}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            used in
          </p>
          <div className="mt-2 space-y-1.5">
            {selectedNode.projects.length > 0 ? (
              selectedNode.projects.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="block rounded-lg border border-white/[0.06] px-3 py-2 transition-colors hover:border-white/[0.18]"
                >
                  <span className="block truncate text-xs text-slate-200">{p.title}</span>
                  <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-slate-500">
                    {p.status === "completed" ? "completed" : "in development"}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-[11px] text-slate-500">
                not yet in a recorded project
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}