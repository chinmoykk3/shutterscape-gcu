import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShutterLoader } from '@/components/layout/ShutterLoader';
import { ToastProvider } from '@/components/ui/ToastProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'ShutterScape | GCU University Photography Club',
    template: '%s | ShutterScape GCU',
  },
  description:
    'ShutterScape is the official student photography and visual storytelling club of Girijananda Chowdhury University (GCU).',
  openGraph: {
    title: 'ShutterScape | GCU University Photography Club',
    description:
      'Framing moments, crafting stories. Explore photowalks, exhibitions, and visual art from Girijananda Chowdhury University.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="font-sans antialiased bg-darkroom-950 text-zinc-100 flex min-h-screen flex-col selection:bg-amber-500 selection:text-darkroom-950">
        <ToastProvider>
          <ShutterLoader />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}