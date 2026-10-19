import Image from "next/image";
import { connectDB } from "@/lib/db";
import { Activity } from "@/models/Activity";
import { optimizedImageUrl } from "@/lib/utils";

export const metadata = {
  title: "Activities",
  description: "Browse all past and upcoming events by Shutterscape Photography Club.",
};

interface ActivityDoc {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default async function ActivitiesPage() {
  await connectDB();
  const activities: ActivityDoc[] = JSON.parse(
    JSON.stringify(await Activity.find().sort({ date: -1 }).lean())
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="section-heading">Our Activities</h1>
        <p className="section-subheading">
          A timeline of events, workshops, and photo walks.
        </p>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {activities.map((activity, idx) => (
              <div
                key={activity._id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark hidden md:block z-10" />

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src={optimizedImageUrl(activity.imageUrl)}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 glass-card p-6">
                  <time className="text-sm text-primary-400 font-medium">
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {activity.title}
                  </h2>
                  <div
                    className="mt-3 text-sm text-gray-400 prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: activity.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {activities.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No activities yet — check back soon!
          </p>
        )}
      </div>
    </div>
  );
}
