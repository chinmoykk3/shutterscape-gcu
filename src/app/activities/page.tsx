import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Activity } from '@/models/Activity';
import { ViewfinderCard } from '@/components/ui/ViewfinderCard';
import { BLUR_DATA_URL, optimizeImageUrl } from '@/lib/utils';
import { sanitizeRichText } from '@/lib/sanitize';

export const metadata: Metadata = {
  title: 'Activities & Photowalks',
  description:
    'Explore upcoming and past workshops, exhibitions, and photowalks hosted by ShutterScape GCU.',
};

export const revalidate = 60;

export default async function ActivitiesPage() {
  await connectDB();
  const allActivities = await Activity.find().sort({ date: -1 }).lean();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Pin upcoming events at top (sorted descending or closest), followed by past events descending
  const upcoming = allActivities.filter((a) => new Date(a.date) >= startOfToday);
  const past = allActivities.filter((a) => new Date(a.date) < startOfToday);
  const orderedActivities = [...upcoming, ...past];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
          Chronicle of Frames
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-bold text-white">
          Club Activities
        </h1>
        <p className="mt-3 text-sm sm:text-base text-zinc-400">
          From Brahmaputra ghat photowalks to studio lighting bootcamps and annual exhibitions.
        </p>
      </div>

      {orderedActivities.length === 0 ? (
        <ViewfinderCard className="text-center py-12">
          <p className="text-zinc-400">No activities published yet. Check back soon!</p>
        </ViewfinderCard>
      ) : (
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/30 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {orderedActivities.map((activity, idx) => {
              const isUpcoming = new Date(activity.date) >= startOfToday;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={String(activity._id)}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-4 -translate-x-1/2 mt-6 flex h-4 w-4 items-center justify-center rounded-full border-2 md:left-1/2 ${isUpcoming
                        ? 'border-amber-400 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.9)]'
                        : 'border-amber-500/60 bg-darkroom-950'
                      }`}
                  />

                  <div
                    className={`w-full pl-10 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:ml-auto md:pl-10'
                      }`}
                  >
                    <ViewfinderCard highlighted={isUpcoming}>
                      {isUpcoming && (
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-darkroom-950 shadow-[0_0_16px_rgba(245,158,11,0.6)]">
                          <span className="h-2 w-2 rounded-full bg-darkroom-950 animate-ping" />
                          <span>UPCOMING</span>
                        </div>
                      )}

                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4">
                        <Image
                          src={optimizeImageUrl(activity.image.url, 800)}
                          alt={activity.title}
                          fill
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <time dateTime={new Date(activity.date).toISOString()}>
                          {new Date(activity.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </time>
                      </div>

                      <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                        {activity.title}
                      </h2>

                      <div
                        className="rich-text-content mt-3 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeRichText(activity.descriptionHtml),
                        }}
                      />
                    </ViewfinderCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}