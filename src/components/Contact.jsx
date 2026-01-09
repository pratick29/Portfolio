import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-white">
          Contact Me
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mb-10">
          Let’s work together — freelancing or job opportunities.
        </p>

        <form
          action="https://formspree.io/f/mbdlvnzd"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-lg bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-lg bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm hover:shadow-md"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
