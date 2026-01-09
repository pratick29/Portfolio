import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";



export default function Projects() {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="projects" className="py-24 px-6">
      <h2 className="text-center text-3xl font-semibold mb-14">
        Projects
      </h2>

      <div className="max-w-6xl mx-auto grid gap-12">
        {projects.map((project) => (
          <motion.div
          whileHover={{ y: -6 }}
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
              p-6 md:p-10
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onClick={() => {
  setActiveProject(project);
  setCurrentImage(0);
}}

cursor-pointer

            className="
  group relative overflow-hidden
  grid md:grid-cols-2 gap-8
  bg-white/80 dark:bg-white/5
  border border-slate-200 dark:border-white/10
  backdrop-blur-xl
  rounded-2xl p-10
  shadow-lg shadow-black/5
  dark:shadow-black/10
  hover:shadow-xl
  transition-all duration-300
"

          >
            <div
  className="absolute inset-0 opacity-0 group-hover:opacity-100
             transition-opacity duration-300
             bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent"
/>

            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-[1.03]"

            />

            <div>
              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex flex-wrap gap-2 mb-4">
  {project.tags.map((tag, i) => (
    <span
      key={i}
      className="px-3 py-1 text-xs rounded-full
                 bg-blue-100 text-blue-700 border border-blue-200
                 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20"
    >
      {tag}
    </span>
  ))}
</div>

                {project.description}
              </p>

              <ul className="space-y-2 mb-6">
  {project.points.map((point, i) => (
    <motion.li
      key={i}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className="list-disc list-inside text-slate-600 dark:text-slate-400"
    >
      {point}
    </motion.li>
  ))}
</ul>


              <div className="flex gap-4 mt-6">
  <a
    href={project.github}
    target="_blank"
    className="flex items-center gap-2 px-5 py-2 rounded-lg
               bg-slate-800 hover:bg-slate-700
               hover:scale-[1.05] active:scale-[0.95]
               transition-all"
  >
    <FaGithub />
    GitHub
  </a>

  <a
    href={project.demo}
    target="_blank"
    className="flex items-center gap-2 px-5 py-2 rounded-lg
               bg-blue-600 hover:bg-blue-700
               hover:scale-[1.05] active:scale-[0.95]
               transition-all
               shadow-sm hover:shadow-md"
  >
    <FaExternalLinkAlt />
    Live Demo
  </a>
</div>


              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Tech: {project.tech}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {activeProject && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-slate-900 text-white max-w-3xl w-full mx-4 rounded-2xl p-6 relative"
    >
      {/* Close Button */}
      <button
        onClick={() => setActiveProject(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h3 className="text-2xl font-semibold mb-4">
        {activeProject.title}
      </h3>

      <p className="text-gray-400 mb-6">
        {activeProject.description}
      </p>

     <div className="relative">
  <img
    src={activeProject.images[currentImage]}
    alt="Project screenshot"
    className="rounded-xl mb-4"
  />

  {/* Controls */}
  <div className="flex justify-between">
    <button
      onClick={() =>
        setCurrentImage((prev) =>
          prev === 0 ? activeProject.images.length - 1 : prev - 1
        )
      }
    >
      ◀
    </button>

    <button
      onClick={() =>
        setCurrentImage((prev) =>
          prev === activeProject.images.length - 1 ? 0 : prev + 1
        )
      }
    >
      ▶
    </button>
  </div>
</div>

    </motion.div>
  </div>
)}

    </section>
  );
}
