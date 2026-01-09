import { motion } from "framer-motion";

export default function ResumeViewer() {
  return (
    <section id="resume" className="py-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-8">
          Resume
        </h2>

        {/* PDF Viewer */}
        <div className="w-full h-[70vh] border border-white/10 rounded-xl overflow-hidden bg-white">
          <iframe
            src="/Pratik_Bothra_Resume.pdf"
            title="Resume"
            className="w-full h-full"
          />
        </div>

        {/* Download Button */}
        <div className="text-center mt-6">
          <a
            href="/Pratik_Bothra_Resume.pdf"
            download
            className="inline-block px-6 py-3 rounded-xl
                       bg-blue-600 hover:bg-blue-700
                       hover:scale-[1.03] active:scale-[0.97]
                       transition-all duration-200"
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
}
