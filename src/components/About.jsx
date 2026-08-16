import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { education } from "../data/education";
import { skillGroups } from "../data/skills";
import { projects } from "../data/projects";
import SectionLabel from "./ui/SectionLabel";
import Reveal from "./ui/Reveal";
import Highlight from "./ui/Highlight";

const PROMPT = "pratikbothra:~$";

const commandDefs = {
  whoami: {
    desc: "who am i",
    run: () => ["Pratik Bothra — Backend Engineer · AI/ML · Builder"],
  },
  about: {
    desc: "a short intro",
    run: () => [profile.about.statement, "", profile.about.closing],
  },
  skills: {
    desc: "tech stack",
    run: () =>
      skillGroups.map(
        (g) => `${g.title.toLowerCase()} → ${g.items.join(", ")}`
      ),
  },
  projects: {
    desc: "featured work",
    run: () =>
      projects.map(
        (p) => `${p.title} — ${p.status.replace("-", " ")}`
      ),
  },
  labs: {
    desc: "pratick labs",
    run: () => [
      `${profile.labs.name} — ${profile.labs.tagline}`,
      "",
      profile.labs.description,
    ],
  },
  now: {
    desc: "current state",
    run: () => {
      const current = education.find((e) => e.current);
      return [
        `${current.degree} · ${current.institution} (${current.startDate}–${current.endDate}) · ${current.grade}`,
        "",
        "building data-driven web apps with python · django · react · postgresql",
        "",
        `open to: ${profile.availability}`,
      ];
    },
  },
  contact: {
    desc: "reach out",
    run: () =>
      profile.socials.map(
        (s) =>
          `${s.label.toLowerCase().padEnd(10)}${s.href.replace(/^https?:\/\//, "")}`
      ),
  },
  help: {
    desc: "list commands",
    run: () => [
      "available commands:",
      "",
      ...Object.keys(commandDefs).map(
        (key) => `${key.padEnd(10)}${commandDefs[key].desc}`
      ),
    ],
  },
  search: {
    desc: "search projects & skills",
    run: (args) => {
      const q = (args || []).join(" ").toLowerCase();
      if (!q) {
        return [
          "usage: search <query>",
          "",
          "searches project titles, descriptions, stack & skill groups",
          "try: search python · search react · search ai",
        ];
      }
      const hits = [
        ...projects
          .filter((p) =>
            [p.title, p.description, ...(p.stack || [])]
              .join(" ")
              .toLowerCase()
              .includes(q)
          )
          .map((p) => `project: ${p.title} — ${p.status.replace("-", " ")}`),
        ...skillGroups
          .filter(
            (g) =>
              g.title.toLowerCase().includes(q) ||
              g.items.some((i) => i.toLowerCase().includes(q))
          )
          .map((g) => `skills:  ${g.title} → ${g.items.join(", ")}`),
      ];
      return hits.length
        ? hits
        : [`no results for "${q}"`, "", "try: search python · search react · search ai"];
    },
  },
  sudo: {
    desc: "elevated privileges",
    run: () => [
      "permission denied: this terminal doesn't grant root access",
      "",
      "…but run [projects] to see what gets built anyway",
    ],
  },
  matrix: {
    desc: "follow the white rabbit",
    run: () =>
      Array.from(
        { length: 8 },
        () =>
          Array.from(
            { length: 46 },
            () =>
              Math.random() > 0.45
                ? String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
                : " "
          ).join("")
      ),
  },
  history: {
    desc: "recent commands",
    run: (_args, hist) =>
      hist.length
        ? hist.map((c, i) => `${String(i + 1).padStart(3)}  ${c}`)
        : ["no history yet — run something first"],
  },
  clear: {
    desc: "clear the terminal",
    run: () => null,
  },
};

export default function About() {
  const [history, setHistory] = useState([
    {
      cmd: "whoami",
      out: ["Pratik Bothra — Backend Engineer · AI/ML · Builder", ""],
    },
    { cmd: "", out: [] },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [contactStep, setContactStep] = useState(null);
  const [sending, setSending] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const copyText = (text, index) => {
    const done = () => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex((i) => (i === index ? null : i)), 1500);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const parts = raw.trim().toLowerCase().split(/\s+/);
    const cmd = parts[0] || "";
    const args = parts.slice(1);

    if (cmd === "clear") {
      setContactStep(null);
      setHistory([]);
      setInput("");
      setHistoryIndex(commandHistory.length);
      return;
    }

    if (contactStep) {
      const field = contactStep.field;
      const value = raw.trim();
      const invalid =
        field === "email" ? !value.includes("@") : value === "";
      if (invalid) {
        setHistory((h) => [
          ...h,
          {
            prompt: `${field}:`,
            cmd: raw,
            out: [
              field === "email"
                ? "that doesn't look like an email — try again"
                : `${field} cannot be empty — try again`,
            ],
          },
        ]);
        setInput("");
        return;
      }

      const values = { ...contactStep.values, [field]: value };
      setHistory((h) => [...h, { prompt: `${field}:`, cmd: raw, out: [] }]);
      setInput("");

      if (field === "message") {
        setSending(true);
        setHistory((h) => [...h, { cmd: "", out: ["sending…"] }]);
        fetch(profile.contact.formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            setHistory((h) => [
              ...h,
              {
                cmd: "",
                out: [
                  res.ok
                    ? "✓ message sent — I'll get back to you soon"
                    : "✗ failed to send — try again, or email me directly: pratick.work@gmail.com",
                ],
              },
            ]);
          })
          .catch(() => {
            setHistory((h) => [
              ...h,
              {
                cmd: "",
                out: [
                  "✗ network error — try again, or email me directly: pratick.work@gmail.com",
                ],
              },
            ]);
          })
          .finally(() => {
            setSending(false);
            setContactStep(null);
          });
      } else {
        setContactStep({
          field: field === "name" ? "email" : "message",
          values,
        });
      }
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(commandHistory.length);
      return;
    }

    if (cmd === "contact") {
      setHistory((h) => [
        ...h,
        { cmd: raw.trim(), out: ["let's get in touch — fill in the details:"] },
      ]);
      setContactStep({ field: "name", values: {} });
      setInput("");
      return;
    }

    setHistory((h) => [
      ...h,
      { cmd: raw.trim(), out: cmd ? (commandDefs[cmd] ? commandDefs[cmd].run(args, commandHistory) : [`command not found: ${cmd} — type help for available commands`]) : [] },
    ]);
    if (cmd) setCommandHistory((ch) => [...ch, raw.trim()]);
    setInput("");
    setHistoryIndex(commandHistory.length + 1);
  };

  const onKeyDown = (e) => {
    if (contactStep) {
      if (e.key === "Escape") {
        e.preventDefault();
        setContactStep(null);
        setInput("");
        setHistory((h) => [...h, { cmd: "", out: ["contact cancelled"] }]);
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(input);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.max(historyIndex - 1, 0);
      if (commandHistory[idx]) setInput(commandHistory[idx]);
      setHistoryIndex(idx);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.min(historyIndex + 1, commandHistory.length);
      setInput(idx === commandHistory.length ? "" : commandHistory[idx]);
      setHistoryIndex(idx);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="01" color="emerald">About</SectionLabel>
        </Reveal>

        <Reveal>
          <div className="terminal-about overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] shadow-xl shadow-black/20">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-slate-500">
                pratikbothra — terminal
              </span>
            </div>

            <div
              className="p-5 sm:p-7"
              onMouseDown={focusInput}
            >
              <div
                ref={scrollRef}
                className="scroll-area max-h-72 overflow-y-auto pr-1"
              >
                {history.map((entry, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-sm">
                          <span className="text-emerald-500 dark:text-emerald-400">
                            {entry.prompt ?? PROMPT}
                          </span>
                          {entry.cmd && (
                            <span className="ml-2 text-slate-100">
                              {entry.cmd}
                            </span>
                          )}
                        </div>
                        {entry.out.map((line, j) => (
                          <div
                            key={j}
                            className={`font-mono text-sm ${
                              line
                                ? "whitespace-pre-wrap text-slate-300"
                                : "h-4"
                            }`}
                          >
                            {line ? (
                              <Highlight text={line} />
                            ) : null}
                          </div>
                        ))}
                      </div>
                      {entry.out.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            copyText(
                              entry.out.filter(Boolean).join("\n"),
                              i
                            )
                          }
                          aria-label="Copy output"
                          title="Copy output"
                          className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-emerald-400 focus:opacity-100"
                        >
                          {copiedIndex === i ? "✓" : "⧉"}
                        </button>
                      )}
                    </div>
                    <div className="h-4" />
                  </div>
                ))}
              </div>

              <div className="mt-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Available commands
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["whoami", "about", "skills", "projects", "labs", "now", "contact", "search", "sudo", "matrix", "history", "help", "clear"].map(
                    (cmd) => (
                      <button
                        key={cmd}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          run(cmd);
                          focusInput();
                        }}
                        className="rounded border border-white/10 px-2.5 py-1 font-mono text-xs text-emerald-400 transition-colors hover:border-emerald-400/50 hover:bg-emerald-400/10"
                      >
                        <span className="text-emerald-400/60">[</span>
                        {cmd}
                        <span className="text-emerald-400/60">]</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                <span className="shrink-0 font-mono text-sm text-emerald-500 dark:text-emerald-400">
                  {contactStep ? `${contactStep.field}:` : PROMPT}
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    contactStep
                      ? sending
                        ? "sending…"
                        : `type your ${contactStep.field}`
                      : "type a command"
                  }
                  disabled={sending}
                  aria-label="Terminal command input"
                  className="w-full bg-transparent font-mono text-sm text-slate-100 caret-emerald-500 outline-none placeholder:text-slate-600 disabled:opacity-50"
                />
                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    run(input);
                    focusInput();
                  }}
                  disabled={sending}
                  aria-label="Send"
                  title="Send (Enter)"
                  className="shrink-0 rounded border border-emerald-400/40 px-2.5 py-1 font-mono text-sm text-emerald-400 transition-colors hover:border-emerald-400/70 hover:bg-emerald-400/10 disabled:opacity-40"
                >
                  -&gt;
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}