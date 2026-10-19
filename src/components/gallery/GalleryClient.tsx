"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { optimizedImageUrl } from "@/lib/utils";

interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  photographer: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(images.map((img) => img.category));
    return ["All", ...Array.from(cats).sort()];
  }, [images]);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? images
        : images.filter((img) => img.category === activeCategory),
    [images, activeCategory]
  );

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: -1 | 1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex + dir + filtered.length) % filtered.length
    );
  };

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                : "bg-dark-200 text-gray-400 hover:bg-dark-300 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, idx) => (
            <motion.div
              key={img._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <div className="relative overflow-hidden rounded-xl bg-dark-200">
                <Image
                  src={optimizedImageUrl(img.imageUrl, { width: 600 })}
                  alt={img.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{img.title}</p>
                  {img.photographer && (
                    <p className="text-gray-300 text-xs">📷 {img.photographer}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              aria-label="Close lightbox"
            >
              <HiX size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 text-white/70 hover:text-white z-10"
              aria-label="Previous image"
            >
              <HiChevronLeft size={36} />
            </button>

            <motion.div
              key={filtered[lightboxIndex]._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full mx-8"
            >
              <Image
                src={optimizedImageUrl(filtered[lightboxIndex].imageUrl, { width: 1200 })}
                alt={filtered[lightboxIndex].title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{filtered[lightboxIndex].title}</p>
                {filtered[lightboxIndex].photographer && (
                  <p className="text-gray-400 text-sm">
                    📷 {filtered[lightboxIndex].photographer}
                  </p>
                )}
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 text-white/70 hover:text-white z-10"
              aria-label="Next image"
            >
              <HiChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
