const CATEGORY_CLASSES = {
  backend: {
    border: "border-sky-500/25",
    bg: "bg-sky-500/[0.08]",
    text: "text-sky-600 dark:text-sky-400",
  },
  frontend: {
    border: "border-amber-500/25",
    bg: "bg-amber-500/[0.08]",
    text: "text-amber-600 dark:text-amber-400",
  },
  aiml: {
    border: "border-rose-500/25",
    bg: "bg-rose-500/[0.08]",
    text: "text-rose-600 dark:text-rose-400",
  },
  database: {
    border: "border-violet-500/25",
    bg: "bg-violet-500/[0.08]",
    text: "text-violet-600 dark:text-violet-400",
  },
  neutral: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    text: "text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300",
  },
};

const TECH_CATEGORY = {
  python: "backend",
  fastapi: "backend",
  django: "backend",
  "django-rest-framework": "backend",
  flask: "backend",
  php: "backend",
  pytest: "backend",
  celery: "backend",
  jwt: "backend",
  "node.js": "backend",
  express: "backend",
  backend: "backend",
  api: "backend",
  apis: "backend",
  rest: "backend",
  react: "frontend",
  javascript: "frontend",
  typescript: "frontend",
  html: "frontend",
  css: "frontend",
  tailwind: "frontend",
  "tailwind css": "frontend",
  "framer-motion": "frontend",
  recharts: "frontend",
  web: "frontend",
  frontend: "frontend",
  "full-stack": "frontend",
  fullstack: "frontend",
  postgresql: "database",
  mysql: "database",
  mongodb: "database",
  supabase: "database",
  redis: "database",
  sqlalchemy: "database",
  sql: "database",
  database: "database",
  databases: "database",
  pandas: "aiml",
  numpy: "aiml",
  matplotlib: "aiml",
  "scikit-learn": "aiml",
  nltk: "aiml",
  streamlit: "aiml",
  tensorflow: "aiml",
  pytorch: "aiml",
  openai: "aiml",
  llm: "aiml",
  "machine-learning": "aiml",
  "machine learning": "aiml",
  "data-science": "aiml",
  "data science": "aiml",
  "ai/ml": "aiml",
  ai: "aiml",
  ml: "aiml",
  intelligent: "aiml",
  "data-driven": "aiml",
  "ai-powered": "aiml",
  infra: "neutral",
  infrastructure: "neutral",
  "ci/cd": "neutral",
  git: "neutral",
  github: "neutral",
  "github actions": "neutral",
  docker: "neutral",
  kubernetes: "neutral",
  aws: "neutral",
  websockets: "neutral",
  "web sockets": "neutral",
  "chrome-extension-mv3": "neutral",
  "chrome extension mv3": "neutral",
  "chrome-storage-api": "neutral",
  c: "neutral",
  "c++": "neutral",
};

export function categoryFor(label) {
  const key = String(label).toLowerCase().trim();
  const direct = TECH_CATEGORY[key];
  if (direct) return direct;
  const contains = [
    ["tailwind", "frontend"],
    ["django", "backend"],
    ["chrome", "neutral"],
    ["github", "neutral"],
    ["scikit", "aiml"],
    ["machine learning", "aiml"],
    ["data science", "aiml"],
    ["tensor", "aiml"],
    [" torch", "aiml"],
  ];
  for (const [needle, category] of contains) {
    if (key.includes(needle)) return category;
  }
  return null;
}

export function chipClasses(label) {
  const category = categoryFor(label) ?? "neutral";
  const { border, bg, text } = CATEGORY_CLASSES[category];
  return `${border} ${bg} ${text}`;
}

export function textColor(label) {
  const category = categoryFor(label) ?? "neutral";
  return CATEGORY_CLASSES[category].text;
}

export const TECH_KEYWORDS = Object.keys(TECH_CATEGORY);
