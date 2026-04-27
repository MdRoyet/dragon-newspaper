"use client"; // Required for the framer-motion animations

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F3] px-6 font-serif text-[#2C2C2C]">
      {/* Background Decorative "404" */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 className="text-[20rem] md:text-[40rem] font-black opacity-[0.03] select-none">
          404
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Newspaper Header Style */}
        <header className="mb-8">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
            The Dragon News
          </h2>
          <div className="h-1 w-full bg-black"></div>
          <div className="h-[2px] w-full bg-black mt-1"></div>
        </header>

        {/* Animated Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold italic mb-4">
            "Article Missing: Editorial Error or Secret Redaction?"
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
            We searched the archives from top to bottom, but the page you are
            looking for has vanished like yesterday's headlines.
          </p>
        </motion.div>

        {/* The Next.js Link Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-colors inline-block"
          >
            Return to Front Page
          </Link>
        </motion.div>
      </div>

      {/* Subtle Footer Decoration */}
      <footer className="fixed bottom-8 w-full px-10 hidden md:flex justify-between opacity-40 text-[10px] uppercase tracking-[0.3em] border-t border-black pt-4">
        <span>Edition No. 404</span>
        <span>The Dragon News Network</span>
        <span>Lost in the Press</span>
      </footer>
    </div>
  );
}
