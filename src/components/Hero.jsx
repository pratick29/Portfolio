import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 sm:px-6"
    >
      <div className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold
                     text-slate-900 dark:text-white mb-6"
        >
          Hi, I’m{" "}
          <span
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600
                       dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400
                       bg-clip-text text-transparent"
          >
            Pratik Bothra
          </span>
          .
        </motion.h1>
        <div className="inline-flex items-center gap-2 mt-3
                px-4 py-1.5 rounded-full
                bg-green-100 text-green-700
                dark:bg-green-500/10 dark:text-green-400
                text-sm font-medium">
  <span className="w-2 h-2 rounded-full bg-green-500"></span>
  Open to Work · Freelance · Internships
</div>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed"
        >
          I’m a Python Full-Stack Developer who builds data-driven and intelligent web applications using Python, Django, React, PostgreSQL, and Machine Learning.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
        >
         I enjoy solving real-world problems and turning ideas into reliable, scalable, and production-ready software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white
                       hover:bg-blue-700 hover:scale-[1.03]
                       active:scale-[0.97]
                       transition-all text-center"
          >
            See My Work
          </a>

          {/* <a
            href="#contact"
            className="px-6 py-3 rounded-xl
                       bg-slate-200 text-slate-800
                       hover:bg-slate-300
                       dark:bg-slate-800 dark:text-slate-200
                       dark:hover:bg-slate-700
                       transition-all text-center"
          >
            Let’s Talk
          </a> */}
        </motion.div>
      </div>
    </section>
  );
}
