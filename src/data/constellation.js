import { projects } from "./projects";

export const constellationConfig = {
  viewBox: { width: 900, height: 430 },
  areas: [
    { id: "backend", label: "Backend", color: "#38bdf8", anchor: { x: 205, y: 150 }, radius: 100 },
    { id: "frontend", label: "Frontend", color: "#fbbf24", anchor: { x: 695, y: 150 }, radius: 100 },
    { id: "aiml", label: "AI/ML", color: "#fb7185", anchor: { x: 205, y: 330 }, radius: 85 },
    { id: "database", label: "Database", color: "#a78bfa", anchor: { x: 695, y: 330 }, radius: 70 },
    { id: "infrastructure", label: "Infrastructure", color: "#94a3b8", anchor: { x: 450, y: 66 }, radius: 66 },
    { id: "core", label: "Core", color: "#94a3b8", anchor: { x: 450, y: 370 }, radius: 46 },
  ],
  skills: [
    { id: "python", label: "Python", area: "backend", what: "High-level language — my primary tool for backend systems and data work." },
    { id: "django", label: "Django", area: "backend", what: "Batteries-included Python web framework for secure, structured applications." },
    { id: "django-rest-framework", label: "Django REST Framework", area: "backend", what: "Toolkit for building clean, typed REST APIs on top of Django." },
    { id: "php", label: "PHP", area: "backend", what: "Server-side scripting language for classic dynamic web apps." },
    { id: "fastapi", label: "FastAPI", area: "backend", what: "Modern Python API framework — powers the ProfSkor scoring backend." },
    { id: "pytest", label: "Pytest", area: "backend", what: "Testing framework for writing reliable Python test suites." },
    { id: "celery", label: "Celery", area: "backend", what: "Distributed task queue for async, scalable background work." },
    { id: "jwt", label: "JWT", area: "backend", what: "Token-based authentication used for secure API access." },
    { id: "javascript", label: "JavaScript", area: "frontend", what: "The language of the interactive web — powers my client-side logic." },
    { id: "react", label: "React", area: "frontend", what: "Component-based UI library for building fast, declarative interfaces." },
    { id: "html", label: "HTML", area: "frontend", what: "The semantic structure of every page I build." },
    { id: "css", label: "CSS", area: "frontend", what: "Layout, spacing, and visual styling across my interfaces." },
    { id: "tailwind-css", label: "Tailwind CSS", area: "frontend", what: "Utility-first CSS framework for consistent, rapid styling." },
    { id: "framer-motion", label: "Framer Motion", area: "frontend", what: "Animation library for fluid, declarative UI transitions." },
    { id: "recharts", label: "Recharts", area: "frontend", what: "Composable charting library for analytics dashboards." },
    { id: "pandas", label: "Pandas", area: "aiml", what: "Data manipulation and analysis workhorse for Python." },
    { id: "matplotlib", label: "Matplotlib", area: "aiml", what: "Plotting library used to visualize data and model results." },
    { id: "scikit-learn", label: "Scikit-learn", area: "aiml", what: "Machine learning library with simple, powerful estimators." },
    { id: "numpy", label: "NumPy", area: "aiml", what: "Fast numerical computation — the foundation of my data pipelines." },
    { id: "nltk", label: "NLTK", area: "aiml", what: "Natural language toolkit for tokenization and sentiment analysis." },
    { id: "streamlit", label: "Streamlit", area: "aiml", what: "Python framework for turning data experiments into interactive apps." },
    { id: "postgresql", label: "PostgreSQL", area: "database", what: "Open-source relational database — my default for production data." },
    { id: "mysql", label: "MySQL", area: "database", what: "Popular relational database used across full-stack work." },
    { id: "git", label: "Git", area: "infrastructure", what: "Distributed version control for tracking and collaborating on code." },
    { id: "github", label: "GitHub", area: "infrastructure", what: "Hosting platform for repositories, reviews, and automation." },
    { id: "chrome-extension-mv3", label: "Chrome Extension Manifest V3", area: "infrastructure", what: "Browser extension platform — my Klippy ships on Manifest V3." },
    { id: "github-actions", label: "GitHub Actions", area: "infrastructure", what: "CI/CD automation for linting, testing, and building on push." },
    { id: "docker", label: "Docker", area: "infrastructure", what: "Containerization for consistent environments and deployments." },
    { id: "web-sockets", label: "WebSockets", area: "infrastructure", what: "Full-duplex protocol for real-time push communication." },
    { id: "chrome-storage-api", label: "Chrome Storage API", area: "database", what: "On-device key-value storage that keeps extension data local-only." },
    { id: "supabase", label: "Supabase", area: "database", what: "Postgres-backed BaaS providing auth and row-level security." },
    { id: "redis", label: "Redis", area: "database", what: "In-memory data store for caching, queues, and real-time state." },
    { id: "sqlalchemy", label: "SQLAlchemy", area: "database", what: "Python ORM for clean, safe database interactions." },
    { id: "c", label: "C", area: "core", what: "Low-level systems language that sharpens fundamentals." },
    { id: "cpp", label: "C++", area: "core", what: "Object-oriented systems language used across CS coursework." },
  ],
};

export function buildConstellation() {
  const { areas, skills, viewBox } = constellationConfig;

  const byLabel = new Map(skills.map((s) => [s.label.toLowerCase(), s.id]));
  const usage = new Map(skills.map((s) => [s.id, []]));

  for (const project of projects) {
    for (const tech of project.technologies ?? []) {
      const id = byLabel.get(String(tech).toLowerCase());
      if (!id) {
        if (import.meta.env.DEV) {
          console.warn(
            `[constellation] no skill for technology "${tech}" (project "${project.slug}")`
          );
        }
        continue;
      }
      usage.get(id).push(project);
    }
  }

  const edgeMap = new Map();
  for (const project of projects) {
    const ids = [
      ...new Set(
        (project.technologies ?? [])
          .map((t) => byLabel.get(String(t).toLowerCase()))
          .filter(Boolean)
      ),
    ];
    for (let i = 0; i < ids.length; i += 1) {
      for (let j = i + 1; j < ids.length; j += 1) {
        const key = [ids[i], ids[j]].sort().join("|");
        edgeMap.set(key, (edgeMap.get(key) ?? 0) + 1);
      }
    }
  }
  const edges = [...edgeMap.entries()].map(([key, weight]) => {
    const [a, b] = key.split("|");
    return { a, b, weight };
  });

  const areaById = new Map(areas.map((a) => [a.id, a]));
  const nodes = skills.map((skill) => {
    const area = areaById.get(skill.area);
    const siblings = skills.filter((s) => s.area === skill.area);
    const idx = siblings.findIndex((s) => s.id === skill.id);
    const angle = -Math.PI / 2 + (idx / Math.max(siblings.length, 1)) * Math.PI * 2;
    return {
      ...skill,
      color: area.color,
      areaLabel: area.label,
      x: area.anchor.x + area.radius * Math.cos(angle),
      y: area.anchor.y + area.radius * Math.sin(angle),
      projects: usage.get(skill.id) ?? [],
    };
  });

  return { nodes, edges, areas, viewBox };
}