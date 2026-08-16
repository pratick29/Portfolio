export const projects = [
  {
    slug: "chronic-kidney-disease-prediction",
    title: "Chronic Kidney Disease Prediction",
    shortDescription:
      "Machine learning model to predict Chronic Kidney Disease using healthcare data.",
    description:
      "Machine learning model to predict Chronic Kidney Disease using healthcare data.",
    points: [
      "Processed 400+ patient records",
      "Feature engineering & missing value handling",
      "Naïve Bayes model with 85% accuracy",
      "Visualization using Matplotlib",
    ],
    technologies: ["Python", "Pandas", "Scikit-learn"],
    category: "Machine Learning",
    organization: "personal",
    status: "completed",
    metrics: "naïve bayes · 85% acc",
    featured: true,
    image: "/projects/ckd.png",
    images: ["/projects/ckd.png"],
    github: "https://github.com/pratick29",
    live: "",
    tags: ["Machine Learning", "Healthcare", "Python", "Data Science"],
  },
  {
    slug: "klippy",
    title: "Klippy",
    description:
      "Klippy is a privacy-first Chrome extension built to eliminate the repetitive task of searching for and copying frequently used professional links and information. It lets users save links and usernames once and access them instantly when filling out job applications, recruitment forms, internship portals, and other repetitive workflows. The extension also grew into a local-first personal utility for securely storing passwords, API keys, tokens, notes, and snippets. It includes profile-page auto-detection and one-click copying while keeping user data entirely on the device without accounts, cloud storage, or synchronization.",
    shortDescription:
      "A privacy-first Chrome extension for instantly accessing professional links, credentials, API keys, notes, and snippets.",
    points: [
      "Built a Manifest V3 Chrome extension that centralizes frequently used professional links, credentials, API keys, notes, and snippets.",
      "Implemented local-only data storage using the Chrome Storage API, keeping user data on-device without accounts, cloud storage, or synchronization.",
      "Added master-password protection for sensitive passwords, API keys, and tokens.",
      "Implemented profile-page auto-detection to identify relevant professional profiles and quickly save them.",
      "Added one-click access and copying to reduce repetitive searching and manual copy-paste workflows.",
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Chrome Extension Manifest V3",
      "Chrome Storage API",
    ],
    category: "Developer Tools",
    organization: "pratick-labs",
    status: "completed",
    metrics: "local-first · privacy-focused · Manifest V3",
    featured: true,
    image: "/projects/klippy.png",
    images: ["/projects/klippy.png"],
    github: "https://github.com/pratick29/Klippy",
    live: "https://chromewebstore.google.com/detail/injhkmkocmkjleiepmpfkghlfkfgnedf?utm_source=item-share-cb",
    demo: "https://youtu.be/0baoLi5PJ8c?si=r8CjwMZh4CAXXJDB",
    tags: [
      "Productivity",
      "Chrome Extension",
      "Privacy",
      "Developer Tools",
      "Local-First",
    ],
  },
  {
    slug: "profskor",
    title: "ProfSkor",
    description:
      "ProfSkor is an AI-powered professional profile intelligence platform designed to help evaluate and understand candidate profiles through a unified scoring system. The platform combines a React frontend with a FastAPI backend and Supabase-powered authentication and PostgreSQL persistence. It includes profile scoring, saved profiles, resume reviews, analytics and history, protected routes, rate limiting, and administrative metrics. The project is currently being developed as a Pratick Labs product.",
    shortDescription:
      "An AI-powered profile intelligence platform for scoring, analyzing, and understanding professional candidate profiles.",
    points: [
      "Built a full-stack profile intelligence platform with React, FastAPI, and Supabase/PostgreSQL.",
      "Developed a scoring backend with protected APIs, rate limiting, and administrative metrics.",
      "Implemented authentication, protected routes, profile scoring, saved profiles, resume reviews, and analytics/history.",
      "Designed a persistent data layer with PostgreSQL, indexes, and row-level security policies through Supabase.",
      "Added automated backend testing, frontend linting, production builds, and CI workflows with GitHub Actions.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Supabase",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Pytest",
      "GitHub Actions",
    ],
    category: "AI / Developer Tools",
    organization: "pratick-labs",
    status: "in-development",
    metrics: "AI-powered · full-stack · profile intelligence",
    featured: true,
    image: "",
    images: [],
    github: "https://github.com/pratick29/ProfSkor",
    live: "",
    demo: "",
    tags: [
      "AI",
      "Profile Intelligence",
      "Backend",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Developer Tools",
    ],
  },
  {
    slug: "teamsync",
    title: "TeamSync",
    description:
      "TeamSync is a production-oriented project management and collaboration platform being developed through Pratick Labs. The goal is to bring project organization, task management, team collaboration, real-time communication, and workflow management into a unified SaaS platform. The backend is being designed with FastAPI and PostgreSQL, with Redis, Celery, WebSockets, Docker, and automated testing forming the foundation for a scalable architecture.",
    shortDescription:
      "A production-oriented project management and collaboration SaaS currently being built at Pratick Labs.",
    points: [
      "Designing a modular backend architecture using FastAPI, PostgreSQL, and SQLAlchemy.",
      "Building secure authentication and authorization using JWT.",
      "Designing real-time collaboration capabilities with WebSockets and Redis.",
      "Planning asynchronous background processing with Celery for scalable workloads.",
      "Containerizing the application with Docker and establishing automated testing and CI workflows.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "JWT",
      "Redis",
      "Celery",
      "WebSockets",
      "Docker",
      "Pytest",
      "GitHub Actions",
    ],
    category: "Project Management",
    organization: "pratick-labs",
    status: "in-development",
    metrics: "production-oriented · real-time · scalable architecture",
    featured: true,
    image: "",
    images: [],
    github: "https://github.com/pratick29/TeamSync",
    live: "",
    demo: "",
    tags: [
      "SaaS",
      "Backend",
      "Collaboration",
      "Project Management",
      "Real-Time",
      "Distributed Systems",
    ],
  },
  {
    slug: "amazon-product-intelligence",
    title: "Amazon Product Intelligence",
    description:
      "An interactive product intelligence platform that analyzes Amazon product and review data to uncover product quality, value, popularity, sentiment, and purchasing insights. The system combines exploratory data analysis, product scoring, K-Means segmentation, NLP-based sentiment analysis, risky-keyword detection, hidden-gem discovery, recommendations, product comparison, and simulation tools in an interactive Streamlit dashboard.",
    shortDescription:
      "An ML-powered product intelligence dashboard that turns Amazon product and review data into actionable purchasing insights.",
    points: [
      "Built an interactive Streamlit dashboard for exploring and analyzing Amazon product and review data.",
      "Developed product scoring models combining value, trust, popularity, and review-based signals.",
      "Implemented K-Means clustering to segment products into meaningful groups.",
      "Applied NLP and sentiment analysis to identify customer sentiment and risky review keywords.",
      "Built hidden-gem detection, recommendations, product comparison, and simulation features for deeper product analysis.",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "NLTK", "Streamlit"],
    category: "Data Science / AI & ML",
    organization: "personal",
    status: "completed",
    metrics: "ML · NLP · product intelligence",
    featured: true,
    image: "",
    images: [],
    github: "https://github.com/pratick29/Amazon-Product-Intelligence",
    live: "https://pratick29-amazon-product-intelligence-app-srtbbw.streamlit.app/",
    demo: "",
    tags: [
      "Machine Learning",
      "NLP",
      "Data Science",
      "Product Intelligence",
      "Sentiment Analysis",
      "Recommendation Systems",
    ],
  },
  {
    slug: "api-health-monitor",
    title: "API Health Monitor",
    description:
      "A lightweight backend monitoring service built to check the health and availability of API endpoints. It uses FastAPI to expose monitoring functionality and provides a foundation for tracking whether APIs are reachable and responding correctly.",
    shortDescription:
      "A FastAPI-based service for monitoring API endpoint health and availability.",
    points: [
      "Built a FastAPI-based service for monitoring API endpoint health.",
      "Implemented endpoint health checks to determine availability and response status.",
      "Designed the project as a lightweight foundation for API monitoring and reliability workflows.",
    ],
    technologies: ["Python", "FastAPI"],
    category: "Backend / Developer Tools",
    organization: "personal",
    status: "completed",
    metrics: "API monitoring · FastAPI · health checks",
    featured: true,
    image: "",
    images: [],
    github: "https://github.com/pratick29/api_health_monitor",
    live: "",
    demo: "",
    tags: ["Backend", "API", "Monitoring", "FastAPI", "Developer Tools"],
  },
  {
    slug: "xitan",
    title: "Xitan",
    description:
      "A new product taking shape at Pratick Labs. Xitan is being developed as an autonomous organization runtime designed around multi-agent collaboration, mission planning, specialist agent execution, review gates, observability, and human approval. The project is currently in its foundation stage, with the core architecture, API gateway, frontend shell, shared services, testing, CI, and observability infrastructure being established. More will be revealed as development progresses.",
    shortDescription:
      "A new autonomous AI product taking shape at Pratick Labs. More will be revealed soon.",
    points: [
      "Designing a multi-agent architecture around mission planning, specialist agents, review gates, and human approval.",
      "Built the initial foundation as a compile-and-run monorepo with a React frontend and FastAPI service architecture.",
      "Established shared configuration, logging, telemetry, metrics, testing, and CI foundations across services.",
      "Designed the infrastructure around PostgreSQL, pgvector, Redis, OpenTelemetry, Prometheus, and Grafana.",
      "Currently under active development at Pratick Labs — product details and capabilities will be revealed progressively.",
    ],
    technologies: [],
    category: "Agentic AI",
    organization: "pratick-labs",
    status: "in-development",
    metrics: "",
    featured: true,
    image: "",
    images: [],
    github: "https://github.com/pratick29/Xitan",
    live: "",
    demo: "",
    tags: [
      "Agentic AI",
      "Multi-Agent Systems",
      "AI Infrastructure",
      "Backend",
      "Distributed Systems",
    ],
  },
];

if (import.meta.env.DEV) {
  const slugs = new Set();
  const organizations = ["personal", "pratick-labs"];
  const statuses = ["completed", "in-development", "concept", "archived"];
  for (const project of projects) {
    if (!project.slug || !project.title) {
      console.warn("[projects] every project needs a slug and title", project);
    }
    if (project.slug && slugs.has(project.slug)) {
      console.warn(`[projects] duplicate slug: "${project.slug}"`);
    }
    if (project.organization && !organizations.includes(project.organization)) {
      console.warn(`[projects] invalid organization "${project.organization}" on "${project.slug}"`);
    }
    if (project.status && !statuses.includes(project.status)) {
      console.warn(`[projects] invalid status "${project.status}" on "${project.slug}"`);
    }
    slugs.add(project.slug);
  }
}
