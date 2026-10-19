"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn, optimizedImageUrl } from "@/lib/utils";

interface ViewfinderCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export default function ViewfinderCard({
  imageUrl,
  title,
  subtitle,
  className,
  onClick,
}: ViewfinderCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-dark-200 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={optimizedImageUrl(imageUrl)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Viewfinder overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-4 border border-white/20 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-lg leading-tight">{title}</h3>
        {subtitle && (
          <p className="text-gray-300 text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
