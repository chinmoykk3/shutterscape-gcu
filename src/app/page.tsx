import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, Camera, Users, Award, Image as ImageIcon } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Activity } from '@/models/Activity';
import { GalleryItem } from '@/models/GalleryItem';
import { ViewfinderCard } from '@/components/ui/ViewfinderCard';
import { FilmStripDivider } from '@/components/ui/FilmStripDivider';
import { BLUR_DATA_URL, optimizeImageUrl } from '@/lib/utils';
import { sanitizeRichText } from '@/lib/sanitize';

export const revalidate = 60;

export default async function HomePage() {
  await connectDB();

  const now = new Date();
  const nextActivity = await Activity.findOne({ date: { $gte: now } })
    .sort({ date: 1 })
    .lean();

  const featuredGallery = await GalleryItem.find().sort({ createdAt: -1 }).limit(6).lean();

  return (
    <div>
      {/* 1. Full-Screen Cinematic Darkroom Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80"
          alt="Vintage camera lens in darkroom light"
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkroom-950 via-darkroom-950/60 to-transparent" />

        {/* Viewfinder HUD Overlay */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Girijananda Chowdhury University</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Chasing Light, <br />
            <span className="text-amber-500">Immortalizing Frames.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
            Welcome to <strong className="text-white">ShutterScape</strong> — the official
            community of visual storytellers, street photographers, and filmmakers at GCU.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-darkroom-950 hover:bg-amber-400 transition-colors"
            >
              <span>Join Us</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:border-amber-500/60 hover:bg-white/10 transition-colors"
            >
              <span>View Gallery</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 font-mono text-xs text-zinc-400">
            <span>[ AF-C ]</span>
            <span>RAW 14-BIT</span>
            <span className="text-amber-400">● REC 00:24:19</span>
          </div>
        </div>
      </section>

      {/* 2. Stats Strip */}
      <section className="border-b border-white/10 bg-darkroom-900/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: '180+', label: 'Active Photographers' },
              { icon: Camera, value: '45+', label: 'Photowalks & Workshops' },
              { icon: ImageIcon, value: '2,500+', label: 'Curated Frames' },
              { icon: Award, value: '12+', label: 'Inter-University Awards' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-white/5 bg-darkroom-950/60"
              >
                <stat.icon className="h-6 w-6 text-amber-500 mb-2" />
                <span className="font-serif text-3xl font-bold text-white">{stat.value}</span>
                <span className="mt-1 text-xs text-zinc-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 3. Next Upcoming Activity Highlight */}
        {nextActivity && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Mark Your Calendar
                </span>
                <h2 className="font-serif text-3xl font-bold text-white">
                  Next Upcoming Activity
                </h2>
              </div>
              <Link
                href="/activities"
                className="text-sm font-medium text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <span>All Activities</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <ViewfinderCard highlighted className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="relative h-64 sm:h-80 lg:col-span-5 overflow-hidden rounded-2xl">
                <Image
                  src={optimizeImageUrl(nextActivity.image.url, 900)}
                  alt={nextActivity.title}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-darkroom-950 shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                  <span>● UPCOMING</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {nextActivity.title}
                </h3>
                <p className="inline-flex items-center gap-2 text-sm text-amber-400 font-medium">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(nextActivity.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                <div
                  className="rich-text-content text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeRichText(nextActivity.descriptionHtml),
                  }}
                />
                <div className="pt-2">
                  <Link
                    href="/activities"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-darkroom-950 hover:bg-amber-400 transition-colors"
                  >
                    <span>Explore Event Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ViewfinderCard>
          </section>
        )}

        <FilmStripDivider />

        {/* 4. Featured Gallery Grid */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                Darkroom Exhibition
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">Featured Frames</h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:underline"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGallery.map((item) => (
              <div
                key={String(item._id)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-darkroom-900 p-3 hover:border-amber-500/40 transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={optimizeImageUrl(item.image.url, 800)}
                    alt={item.caption}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-darkroom-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-amber-400 border border-white/10">
                    {item.category}
                  </span>
                </div>
                <p className="mt-3 px-1 text-sm text-zinc-200 line-clamp-1">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <FilmStripDivider />

        {/* 5. About Teaser & Final CTA */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              More Than Megapixels — We Craft Visual Narratives
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Whether you shoot on a flagship mirrorless rig, a vintage 35mm film SLR, or a
              smartphone, ShutterScape is your creative home at Girijananda Chowdhury University.
              We host heritage photowalks across Guwahati, studio lighting masterclasses, and annual
              campus exhibitions.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500 hover:text-darkroom-950 transition-colors"
              >
                <span>Meet the Committee</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <ViewfinderCard className="lg:col-span-5 text-center py-10 px-6">
            <h3 className="font-serif text-2xl font-bold text-white">Ready to Shoot With Us?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Join our official WhatsApp community and follow our Instagram for weekly photo
              challenges.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="https://chat.whatsapp.com/Hs71BicR1Xj3PmOyPJ5wdc?s=sw&p=a&mlu=4&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-darkroom-950 hover:bg-amber-400 transition-colors"
              >
                Join WhatsApp Group
              </a>
              <a
                href="https://www.instagram.com/shutterscape_gcu"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:border-amber-500/50 transition-colors"
              >
                Follow on Instagram
              </a>
            </div>
          </ViewfinderCard>
        </section>
      </div>
    </div>
  );
}