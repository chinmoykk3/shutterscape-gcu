import Image from "next/image";
import { connectDB } from "@/lib/db";
import { Member } from "@/models/Member";
import { optimizedImageUrl } from "@/lib/utils";
import FilmStripDivider from "@/components/ui/FilmStripDivider";

export const metadata = {
  title: "About",
  description: "Learn about Shutterscape Photography Club — our story, faculty, core team, and alumni.",
};

interface MemberDoc {
  _id: string;
  name: string;
  role: string;
  category: "faculty" | "core" | "alumni";
  imageUrl: string;
  order: number;
}

export default async function AboutPage() {
  await connectDB();
  const members: MemberDoc[] = JSON.parse(
    JSON.stringify(await Member.find().sort({ order: 1 }).lean())
  );

  const faculty = members.filter((m) => m.category === "faculty");
  const core = members.filter((m) => m.category === "core");
  const alumni = members.filter((m) => m.category === "alumni");

  const MemberCard = ({ member }: { member: MemberDoc }) => (
    <div className="glass-card p-4 text-center">
      {member.imageUrl ? (
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
          <Image
            src={optimizedImageUrl(member.imageUrl, { width: 200 })}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-24 h-24 mx-auto rounded-full bg-dark-300 flex items-center justify-center">
          <span className="text-2xl text-gray-500">📷</span>
        </div>
      )}
      <h3 className="mt-3 text-white font-semibold">{member.name}</h3>
      <p className="text-sm text-primary-400">{member.role}</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Story */}
        <section className="text-center">
          <h1 className="section-heading">Our Story</h1>
          <p className="section-subheading mt-4">
            Shutterscape was born from a shared passion for photography at Graphic
            Era Christian University. What started as a small group of friends with
            cameras has grown into a vibrant community of visual storytellers — capturing
            the beauty of campus life, the city, and the world beyond.
          </p>
        </section>

        <FilmStripDivider />

        {/* Faculty */}
        {faculty.length > 0 && (
          <section>
            <h2 className="section-heading text-2xl">Faculty Advisors</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {faculty.map((m) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          </section>
        )}

        <FilmStripDivider />

        {/* Core Team */}
        {core.length > 0 && (
          <section>
            <h2 className="section-heading text-2xl">Core Team</h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {core.map((m) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          </section>
        )}

        <FilmStripDivider />

        {/* Alumni */}
        {alumni.length > 0 && (
          <section>
            <h2 className="section-heading text-2xl">Alumni</h2>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {alumni.map((m) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          </section>
        )}

        <FilmStripDivider />

        {/* Codénix credit */}
        <section className="text-center py-8">
          <p className="text-sm text-gray-500">
            Designed &amp; developed by{" "}
            <span className="text-primary-400 font-medium">Codénix</span>
          </p>
        </section>
      </div>
    </div>
  );
}
