import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import FilmStripDivider from "@/components/ui/FilmStripDivider";

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-primary-950/30" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-primary-400 font-medium text-sm uppercase tracking-widest mb-4">
            GCU Photography Club
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
            See the World
            <br />
            Through Our <span className="text-primary-400">Lens</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Capturing moments, crafting stories, and building a community of
            passionate photographers at Graphic Era Christian University.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery" className="btn-primary">
              Explore Gallery <HiArrowRight />
            </Link>
            <Link href="/about" className="btn-secondary">
              About Us
            </Link>
          </div>
        </div>
      </section>

      <FilmStripDivider />

      {/* Quick info section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="section-heading">What We Do</h2>
          <p className="section-subheading">
            From photo walks and workshops to exhibitions and competitions — we
            live and breathe photography.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Photo Walks",
                desc: "Weekly explorations across the city, capturing street life and landscapes.",
                emoji: "🚶",
              },
              {
                title: "Workshops",
                desc: "Hands-on sessions on lighting, composition, editing, and more.",
                emoji: "🎓",
              },
              {
                title: "Exhibitions",
                desc: "Showcasing our best work in campus galleries and online showcases.",
                emoji: "🖼️",
              },
            ].map(({ title, desc, emoji }) => (
              <div key={title} className="glass-card p-6 text-left">
                <span className="text-3xl">{emoji}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
