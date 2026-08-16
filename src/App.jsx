import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import QuickContact from "./components/QuickContact";
import CommandPalette from "./components/CommandPalette";
import BackButton from "./components/BackButton";
import { Router } from "./router";
import { useRouter } from "./use-router";
import NotFoundPage from "./pages/NotFoundPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const NoteDetailPage = lazy(() => import("./pages/NoteDetailPage"));
const PratickLabsPage = lazy(() => import("./pages/PratickLabsPage"));

function AppRoutes() {
  const { path } = useRouter();

  let page;

  if (path === "/") {
    page = <HomePage />;
  } else if (path === "/pratick-labs") {
    page = <PratickLabsPage />;
  } else if (path.startsWith("/projects")) {
    const rest = path.slice("/projects".length);
    page =
      rest === "" || rest === "/" ? (
        <ProjectsPage />
      ) : (
        <ProjectDetailPage slug={decodeURIComponent(rest.slice(1))} />
      );
  } else if (path.startsWith("/notes")) {
    const rest = path.slice("/notes".length);
    page =
      rest === "" || rest === "/" ? (
        <NotesPage />
      ) : (
        <NoteDetailPage slug={decodeURIComponent(rest.slice(1))} />
      );
  } else {
    page = <NotFoundPage />;
  }

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Suspense fallback={null}>{page}</Suspense>
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#09090b] dark:text-slate-200">
        <ScrollProgress />
        <Navbar />
        <CommandPalette />
        <main>
          <AppRoutes />
        </main>
        <Footer />
        <QuickContact />
        <BackButton />
      </div>
    </Router>
  );
}