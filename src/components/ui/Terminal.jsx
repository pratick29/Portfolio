export default function Terminal({ title, right, children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0e] shadow-xl shadow-black/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(56,189,248,0.05), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-16 top-0 h-64 w-64 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-14 bottom-0 h-64 w-64 rounded-full opacity-[0.09] blur-3xl"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent 70%)" }}
      />

      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            {title} — zsh
          </p>
        </div>
        {right && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
            {right}
          </p>
        )}
      </div>

      <div className="relative font-mono">{children}</div>

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
