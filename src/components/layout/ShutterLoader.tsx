'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture } from 'lucide-react';

export function ShutterLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('shutterscape_loaded');
    if (!alreadySeen) {
      setVisible(true);
      sessionStorage.setItem('shutterscape_loaded', '1');
      const timer = setTimeout(() => {
        setVisible(false);
      }, 950);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-darkroom-950"
          aria-label="Loading ShutterScape"
        >
          <motion.div
            initial={{ scale: 0.7, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute h-24 w-24 rounded-full border border-amber-500/30 animate-ping" />
            <Aperture className="h-16 w-16 text-amber-500" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-5 font-serif text-lg tracking-widest uppercase text-zinc-200"
          >
            Shutter<span className="text-amber-500">Scape</span>
          </motion.p>
          <span className="mt-1 text-xs font-mono text-zinc-500">ISO 400 • 1/1000s • f/1.4</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}