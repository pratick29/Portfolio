import { motion } from "framer-motion";

export default function Resume() {
  return (
    <section id="resume" className="py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-6">Resume</h2>

        <a
          href="/Pratik_Bothra_Resume.pdf"
          download
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-violet-400 hover:opacity-90 transition"
        >
          Download Resume
        </a>
      </motion.div>
    </section>
  );
}
