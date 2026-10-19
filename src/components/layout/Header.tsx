'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Aperture, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/activities', label: 'Activities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-darkroom-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Club Logo - Always links to "/" */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-darkroom-950 text-amber-500 transition-colors">
            <Aperture className="h-6 w-6 transition-transform duration-500 group-hover:rotate-90" />
          </div>
          <div>
            <span className="block font-serif text-xl font-bold tracking-tight text-white">
              Shutter<span className="text-amber-500">Scape</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              GCU Photography Club
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
                  isActive ? 'text-amber-400' : 'text-zinc-300 hover:text-white'
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-x-2 -bottom-[17px] h-[2px] bg-amber-500"
                  />
                )}
              </Link>
            );
          })}
          <a
            href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-darkroom-950 hover:bg-amber-400 transition-colors"
          >
            Join Club
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden rounded-lg p-2 text-zinc-300 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/10 bg-darkroom-900 px-4 pt-2 pb-5 space-y-1"
            aria-label="Mobile Navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <a
                href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-darkroom-950 hover:bg-amber-400"
              >
                Join ShutterScape
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}