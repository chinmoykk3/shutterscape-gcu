import React from 'react';
import Link from 'next/link';
import { Aperture, Mail, MapPin, ExternalLink, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-darkroom-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Column 1: Brand + GCU Logo Badge */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-500">
                <Aperture className="h-6 w-6" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold text-white">
                  Shutter<span className="text-amber-500">Scape</span>
                </span>
                <span className="block text-xs text-zinc-400">Official Photography Club of GCU</span>
              </div>
            </Link>

            {/* GCU University Emblem / Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-darkroom-900 p-3.5 max-w-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 font-serif text-lg font-bold text-amber-400">
                GCU
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Girijananda Chowdhury University</p>
                <p className="text-zinc-400">Guwahati, Assam, India</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                <span>
                  Girijananda Chowdhury University (GCU), Hathkhowapara, Azara, Guwahati, Assam 781017
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <a
                  href="mailto:shutterscape@gcuniversity.ac.in"
                  className="hover:text-amber-400 transition-colors"
                >
                  shutterscape@gcuniversity.ac.in
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links & JOIN US Socials */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
                Navigation
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-amber-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="hover:text-amber-400 transition-colors">
                    Activities & Timeline
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-amber-400 transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition-colors">
                    About & Team
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-amber-500">
                JOIN US
              </h3>
              <div className="mt-3 flex flex-col gap-2.5">
                <a
                  href="https://www.instagram.com/shutterscape_gcu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-darkroom-900 px-3.5 py-2 text-sm text-zinc-200 hover:border-amber-500/50 hover:text-amber-400 transition-all"
                >
                  <Instagram className="h-4 w-4 text-amber-500" />
                  <span>@shutterscape_gcu</span>
                </a>
                <a
                  href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-darkroom-900 px-3.5 py-2 text-sm text-zinc-200 hover:border-amber-500/50 hover:text-amber-400 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-amber-500" />
                  <span>WhatsApp Community</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Embedded Google Map of GCU */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">
                Locate Us at GCU Campus
              </h3>
              <a
                href="https://maps.app.goo.gl/NhdHs1u76Bjxo2J87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Replace the iframe src below with your custom Google Maps Embed URL if needed */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-darkroom-900 h-48">
              <iframe
                title="GCU University Location Map"
                src="https://www.google.com/maps?q=Girijananda+Chowdhury+University,Azara,Guwahati,Assam&output=embed"
                className="h-full w-full border-0 grayscale contrast-125 opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} ShutterScape — GCU Photography Club. All rights reserved.</p>
          <p>
            Website Maintained by{' '}
            <a
              href="https://codingclub.gcuniversity.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline font-medium"
            >
              Codénix (GCU Coding Club)
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}