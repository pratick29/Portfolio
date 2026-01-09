import { motion } from "framer-motion";

export default function Education() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto
                   bg-white/80 dark:bg-white/5
                   border border-slate-200 dark:border-white/10
                   rounded-2xl p-6 md:p-8"
      >
        <h3 className="text-xl font-semibold mb-4">
          Education
        </h3>

        <div className="space-y-6">
  {/* Jain University */}
  <div className="flex justify-between items-start gap-6">
    <div>
      <p className="font-semibold text-slate-900 dark:text-white">
        Jain University
      </p>
      <p className="italic text-slate-700 dark:text-slate-300">
        B.Tech in Computer Science and Business Systems
      </p>
    </div>

    <div className="text-right text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
      <p>2022 – 2026</p>
      <p>CGPA: 8.5</p>
    </div>
  </div>

  {/* Lady Anusuya Singhania Academy */}
  <div className="flex justify-between items-start gap-6">
    <div>
      <p className="font-semibold text-slate-900 dark:text-white">
        Lady Anusuya Singhania Academy
      </p>
      <p className="italic text-slate-700 dark:text-slate-300">
        Senior Secondary (CBSE)
      </p>
    </div>

    <div className="text-right text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
      <p>2021 – 2022</p>
      <p>Percentage: 80%</p>
    </div>
  </div>

  {/* Shri Jain Public School */}
  <div className="flex justify-between items-start gap-6">
    <div>
      <p className="font-semibold text-slate-900 dark:text-white">
        Shri Jain Public School
      </p>
      <p className="italic text-slate-700 dark:text-slate-300">
        Secondary (CBSE)
      </p>
    </div>

    <div className="text-right text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
      <p>2019 – 2020</p>
      <p>Percentage: 95%</p>
    </div>
  </div>
</div>

      </motion.div>
    </section>
  );
}
