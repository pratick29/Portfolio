import { FiArrowRight } from "react-icons/fi";
import { Link } from "../router";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="font-mono text-5xl font-semibold text-slate-300 dark:text-slate-700">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-500 hover:shadow-md active:scale-[0.98]"
        >
          Back home
          <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}