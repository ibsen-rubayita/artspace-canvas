import { createFileRoute } from "@tanstack/react-router";
import heroArtwork from "@/assets/hero-artwork.jpg";
import workMonolith from "@/assets/work-monolith.jpg";
import workPlains from "@/assets/work-plains.jpg";
import workQuietude from "@/assets/work-quietude.jpg";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArtSpace — Where vision meets vocation" },
      {
        name: "description",
        content:
          "A curated ecosystem for contemporary creators, private collectors, and the studios that house them.",
      },
      { property: "og:title", content: "ArtSpace — Where vision meets vocation" },
      {
        property: "og:description",
        content:
          "A curated ecosystem for contemporary creators, private collectors, and the studios that house them.",
      },
      { property: "og:image", content: heroArtwork },
      { property: "twitter:image", content: heroArtwork },
    ],
  }),
  component: Index,
});

type Work = {
  title: string;
  medium: string;
  artist: string;
  image: string;
  alt: string;
};

const works: Work[] = [
  {
    title: "Monolith IV",
    medium: "Sculpture",
    artist: "Arlo Studio",
    image: workMonolith,
    alt: "Brutalist ceramic monolith sculpture on white pedestal",
  },
  {
    title: "Ethereal Plains",
    medium: "Painting",
    artist: "Sarah K. Jenkins",
    image: workPlains,
    alt: "Expressionist landscape watercolor in sage, rose and umber",
  },
  {
    title: "Quietude",
    medium: "Photography",
    artist: "Marcus Thorne",
    image: workQuietude,
    alt: "Architectural photograph of a concrete stairwell",
  },
];

function Index() {
  return (
    <div className="bg-canvas text-ink">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-ink/5">
        <a href="/" className="text-2xl font-serif font-bold tracking-tight">
          ArtSpace
        </a>
        <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest">
          <a href="#gallery" className="hover:text-accent transition-colors">
            Gallery
          </a>
          <a href="#artists" className="hover:text-accent transition-colors">
            Artists
          </a>
          <a href="#studios" className="hover:text-accent transition-colors">
            Studios
          </a>
          <a href="#hire" className="hover:text-accent transition-colors">
            Hire
          </a>
        </div>
        <button
          type="button"
          className="px-6 py-2 bg-ink text-canvas text-xs font-medium uppercase tracking-widest hover:bg-accent transition-colors"
        >
          Join Community
        </button>
      </nav>

      {/* Hero */}
      <header className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Issue 04 · Contemporary Index
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] mb-8 text-balance">
              Where vision <br />
              meets <span className="italic font-normal">vocation.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
              A curated ecosystem for contemporary creators, private collectors,
              and the studios that house them.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                className="px-8 py-4 bg-ink text-canvas text-xs font-medium uppercase tracking-widest hover:bg-accent transition-colors"
              >
                Explore Gallery
              </button>
              <button
                type="button"
                className="px-8 py-4 border border-ink text-ink text-xs font-medium uppercase tracking-widest hover:bg-ink hover:text-canvas transition-colors"
              >
                Join as Artist
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure className="w-full aspect-[3/4] overflow-hidden bg-surface outline outline-1 -outline-offset-1 outline-ink/5">
              <img
                src={heroArtwork}
                alt="Abstract oil painting with textured brushstrokes in ochre and charcoal"
                width={1200}
                height={1600}
                className="w-full h-full object-cover"
              />
            </figure>
            <figcaption className="mt-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Featured Artist · Elena Vance
            </figcaption>
          </div>
        </div>
      </header>

      {/* Weekly Curation */}
      <section id="gallery" className="px-8 py-24 bg-surface/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-serif">
              The Weekly Curation
            </h2>
            <a
              href="#"
              className="text-xs uppercase tracking-widest border-b border-ink/20 pb-1 hover:border-accent transition-colors"
            >
              View All Works
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {works.map((work) => (
              <article key={work.title} className="group cursor-pointer">
                <div className="w-full aspect-[4/5] overflow-hidden bg-surface-deep outline outline-1 -outline-offset-1 outline-ink/5">
                  <img
                    src={work.image}
                    alt={work.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="font-serif text-xl">{work.title}</h3>
                  <p className="mt-1 text-[11px] text-muted-foreground uppercase tracking-wider">
                    {work.medium} · {work.artist}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Studios */}
      <section id="studios" className="px-8 py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <figure className="w-full aspect-[3/2] overflow-hidden bg-surface outline outline-1 -outline-offset-1 outline-ink/5">
            <img
              src={studio}
              alt="Sunlit airy artist studio with plants, large windows and blank canvases"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="space-y-8">
            <span className="block text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Find Your Space
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Creative hubs for focused production.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Browse verified studio listings across 40 cities. From shared
              ceramic kilns to private industrial lofts, find the environment
              your work deserves.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="border border-ink px-10 py-4 text-xs font-medium uppercase tracking-widest hover:bg-ink hover:text-canvas transition-colors"
              >
                Explore Studios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hire / Community band */}
      <section id="hire" className="px-8 py-24 border-t border-ink/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div>
            <span className="block text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-6">
              For Clients & Hires
            </span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Commission work, on your terms.
            </h2>
          </div>
          {[
            {
              k: "Browse",
              t: "Discover vetted artists",
              d: "Filter by medium, city, and availability. Every profile is reviewed by our editors.",
            },
            {
              k: "Brief",
              t: "Send a private brief",
              d: "Describe the work, budget, and timeline. Artists respond directly within 48 hours.",
            },
            {
              k: "Commit",
              t: "Contract and create",
              d: "Standard milestones, escrow, and delivery — handled. You focus on the work.",
            },
          ].map((item, i) => (
            <article key={item.k} className="border-t border-ink/10 pt-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent">
                0{i + 1} · {item.k}
              </p>
              <h3 className="mt-4 font-serif text-2xl">{item.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.d}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-8 py-24 bg-ink text-canvas">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            The monthly dispatch.
          </h2>
          <p className="mt-4 text-canvas/60 max-w-lg mx-auto">
            New artists, studio openings, and editorial pieces — once a month,
            never more.
          </p>
          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Email address"
              className="flex-1 bg-transparent border border-canvas/20 px-4 py-3 text-sm text-canvas placeholder:text-canvas/40 outline-none focus:border-canvas transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-canvas text-ink text-xs font-medium uppercase tracking-widest hover:bg-accent hover:text-canvas transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/5 px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-serif font-bold">ArtSpace</div>
          <nav className="flex gap-8 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-ink transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Contact
            </a>
          </nav>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 ArtSpace Collective
          </p>
        </div>
      </footer>
    </div>
  );
}
