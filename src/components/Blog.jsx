import { motion } from "framer-motion";
import { blogs } from "../data/blogs";
import { useState } from "react";

export default function Blog() {
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <section id="blog" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-14">
          Blog & Notes
        </h2>

        <div className="grid gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
              onClick={() => setActiveBlog(blog)}
            >
              <h3 className="text-xl font-semibold mb-2">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-400 mb-3">
                {blog.date}
              </p>

              <p className="text-gray-400">
                {blog.summary}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Blog Modal */}
        {activeBlog && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-slate-900 max-w-3xl w-full mx-4 rounded-2xl p-6 md:p-8 relative">
              <button
                onClick={() => setActiveBlog(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>

              <h3 className="text-2xl font-semibold mb-2">
                {activeBlog.title}
              </h3>

              <p className="text-sm text-gray-400 mb-6">
                {activeBlog.date}
              </p>

              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {activeBlog.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
