import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        darkroom: {
          950: '#09090b', // Near-black primary background
          900: '#121215', // Elevated card surface
          800: '#1e1e24', // Border / subtle surface
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b', // Primary warm darkroom accent
          600: '#d97706',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;