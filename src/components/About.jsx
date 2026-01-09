import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div>
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-2xl p-10 border border-slate-200 dark:border-white/10">
        <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">About Me</h2>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          I’m a final-year Computer Science student with a strong interest in Python, Machine Learning, and Full-Stack Web Development. I build data-driven web applications using Django, Django REST Framework, React, and PostgreSQL, and enjoy transforming ideas into reliable, scalable software.
I’m open to full-time roles, internships, and freelancing opportunities.
        </p>
      </div>
    </section>
    </motion.div>
  );
}
