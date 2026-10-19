import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes without conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build an optimized Cloudinary URL with transformations.
 * e.g., auto format, auto quality, and width resizing.
 */
export function optimizedImageUrl(
  url: string,
  options: { width?: number; quality?: string } = {}
): string {
  const { width = 800, quality = "auto" } = options;

  if (!url.includes("res.cloudinary.com")) return url;

  // Insert transformations before /upload/
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_${quality},w_${width}/`
  );
}
