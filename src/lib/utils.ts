import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Injects f_auto,q_auto into Cloudinary URLs for optimal delivery
 */
export function optimizeImageUrl(url: string, width?: number): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    const params = ['f_auto', 'q_auto'];
    if (width) params.push(`w_${width}`);
    return url.replace('/upload/', `/upload/${params.join(',')}/`);
  }
  return url;
}

/**
 * Tiny dark-amber blurred SVG data URI placeholder for next/image
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDQwIDMwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIGZpbGw9IiMxMjEyMTUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE1IiByPSIxMCIgZmlsbD0iI2Y1OWUwYiIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+PC9zdmc+';