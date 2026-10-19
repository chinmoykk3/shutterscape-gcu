"use client";

import { motion } from "framer-motion";

export default function ShutterLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark">
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        {/* Shutter blades */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{ rotate: `${i * 60}deg` }}
          >
            <motion.div
              className="w-3 h-10 bg-primary-400 rounded-full mx-auto origin-bottom"
              animate={{ scaleY: [1, 0.6, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
