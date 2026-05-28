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
          "A curated community connecting contemporary artists, studios, collectors and anyone who loves art.",
      },
      { property: "og:title", content: "ArtSpace — Where vision meets vocation" },
      {
        property: "og:description",
        content:
          "A curated community connecting contemporary artists, studios, collectors and anyone who loves art.",
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
  year: string;
  image: string;
  alt: string;
};

const works: Work[] = [
  {
    title: "Monolith IV",
    medium: "Sculpture",
    artist: "Arlo Studio",
    year: "2025",
    image: workMonolith,
    alt: "Brutalist ceramic monolith sculpture on white pedestal",
  },
  {
    title: "Ethereal Plains",
    medium: "Painting",
    artist: "Sarah K. Jenkins",
    year: "2024",
    image: workPlains,
    alt: "Expressionist landscape watercolor in sage, rose and umber",
  },
  {
    title: "Quietude",
    medium: "Photography",
    artist: "Marcus Thorne",
    year: "2025",
    image: workQuietude,
    alt: "Architectural photograph of a concrete stairwell",
  },
];

const tickerItems = [
  "12 New Artists This Week",
  "Open Studios · Lisbon",
  "Commission Window · April",
  "Featured · Elena Vance",
  "Now Hiring · Curators",
  "Print Editions Live",
];

function Index() {
  return (
    <div className="bg-canvas text-ink overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 border-b border-ink/10 bg-canvas/85 backdrop-blur-md">
        <a href="/" className="text-[1.35rem] font-serif font-semibold tracking-tight">
          Art<span className="italic text-accent">Space</span>
        </a>
        <div className="hidden md:flex gap-9 text-[11px] font-medium uppercase tracking-[0.22em]">
          {["Gallery", "Artists", "Studios", "Hire"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="link-underline hover:text-accent transition-colors">
              {l}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="btn-ink border border-ink px-5 py-2.5 bg-ink text-canvas text-[10.5px] font-medium uppercase tracking-[0.22em]"
        >
          Join Community
        </button>
      </nav>

      {/* Ticker */}
      <div className="border-b border-ink/10 bg-surface/50 py-2.5 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span aria-hidden className="text-accent">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <header className="relative px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="animate-fade-up text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground mb-7 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-accent" />
              Issue 04 · Contemporary Index
            </p>
            <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-medium leading-[0.92] mb-8 text-balance tracking-[-0.02em]">
              Where vision <br />
              meets <span className="italic font-normal text-accent">vocation.</span>
            </h1>
            <p className="animate-fade-up delay-200 text-lg md:text-xl text-muted-foreground max-w-xl leading-[1.65]">
              ArtSpace is the curated community connecting contemporary artists,
              studios, collectors — and anyone who simply loves looking at art.
            </p>
            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-ink border border-ink px-8 py-4 bg-ink text-canvas text-[10.5px] font-medium uppercase tracking-[0.22em]"
              >
                Explore Gallery
              </button>
              <button
                type="button"
                className="btn-outline border border-ink px-8 py-4 text-ink text-[10.5px] font-medium uppercase tracking-[0.22em]"
              >
                Join as Artist
              </button>
            </div>

            <dl className="animate-fade-up delay-500 mt-16 grid grid-cols-3 gap-6 max-w-lg border-t border-ink/10 pt-6">
              {[
                ["1,240+", "Artists"],
                ["320", "Studios"],
                ["40", "Cities"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-serif text-3xl md:text-4xl">{k}</dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <figure className="frame animate-reveal delay-200 w-full aspect-[3/4]">
              <img
                src={heroArtwork}
                alt="Abstract oil painting with textured brushstrokes in ochre and charcoal"
                width={1200}
                height={1600}
                className="w-full h-full object-cover"
              />
            </figure>
            <figcaption className="animate-fade-in delay-500 mt-3 flex justify-between items-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>Featured · Elena Vance</span>
              <span className="text-accent">N° 04 / 2026</span>
            </figcaption>
          </div>
        </div>
      </header>

      {/* Weekly Curation */}
      <section id="gallery" className="px-6 md:px-10 py-24 md:py-32 bg-surface/60 border-y border-ink/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14 md:mb-20">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent mb-4">
                01 — Curation
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.95] tracking-[-0.01em]">
                The Weekly Curation
              </h2>
            </div>
            <a href="#" className="link-underline self-start md:self-end text-[11px] uppercase tracking-[0.25em] hover:text-accent transition-colors">
              View All Works →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {works.map((work, i) => (
              <article key={work.title} className="group cursor-pointer">
                <div className="frame w-full aspect-[4/5]">
                  <img
                    src={work.image}
                    alt={work.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-canvas/90 backdrop-blur-sm text-[9px] font-medium uppercase tracking-[0.22em]">
                    N° 0{i + 1}
                  </span>
                </div>
                <div className="mt-5 flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-2xl leading-tight group-hover:text-accent transition-colors duration-500">
                      {work.title}
                    </h3>
                    <p className="mt-1.5 text-[10.5px] text-muted-foreground uppercase tracking-[0.22em]">
                      {work.artist} · {work.medium}
                    </p>
                  </div>
                  <span className="text-[10.5px] text-muted-foreground tracking-wider mt-1">{work.year}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Artists strip */}
      <section id="artists" className="px-6 md:px-10 py-24 md:py-28 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent mb-4">02 — Community</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-[0.95] tracking-[-0.01em]">
              A living community of <span className="italic">makers</span>.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-3">
            <p className="text-lg text-muted-foreground leading-[1.75] max-w-2xl">
              From mid-career painters to emerging ceramicists, ArtSpace gives every
              artist a verified profile, a portfolio that breathes, and a direct line
              to collectors, galleries and clients who are actively looking.
            </p>
            <div className="mt-10 grid sm:grid-cols-2 gap-x-10">
              {[
                ["Verified profiles", "Editor-reviewed portfolios. No noise."],
                ["Direct messaging", "Talk to clients without middlemen or fees."],
                ["Studio matching", "Find shared space, kilns and residencies."],
                ["Print & editions", "Optional fulfilment when you're ready."],
              ].map(([t, d]) => (
                <div key={t} className="py-5 border-t border-ink/10 first:sm:border-t [&:nth-child(2)]:sm:border-t">
                  <h3 className="font-serif text-xl">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studios */}
      <section id="studios" className="px-6 md:px-10 py-24 md:py-32 bg-ink text-canvas">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <figure className="frame animate-reveal w-full aspect-[3/2] outline-canvas/10">
            <img
              src={studio}
              alt="Sunlit airy artist studio with plants, large windows and blank canvases"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="space-y-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent">
              03 — Find Your Space
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.95] tracking-[-0.01em]">
              Studios built for <span className="italic">focused</span> production.
            </h2>
            <p className="text-lg text-canvas/70 leading-[1.7] max-w-md">
              Browse verified studio listings across 40 cities. From shared
              ceramic kilns to private industrial lofts — find the environment
              your work deserves.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-[10px] uppercase tracking-[0.25em] text-canvas/50">
              <span>40 Cities</span>
              <span className="text-accent">·</span>
              <span>320 Studios</span>
              <span className="text-accent">·</span>
              <span>Verified Monthly</span>
            </div>
            <div className="pt-4">
              <button
                type="button"
                className="btn-outline border border-canvas/30 px-10 py-4 text-[10.5px] font-medium uppercase tracking-[0.22em] text-canvas"
              >
                Explore Studios
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hire / Community band */}
      <section id="hire" className="px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent mb-4">
                04 — For Clients & Hires
              </p>
              <h2 className="text-4xl md:text-5xl font-serif leading-[0.95] tracking-[-0.01em]">
                Commission work, <br />
                <span className="italic">on your terms.</span>
              </h2>
            </div>
            <p className="lg:col-span-2 lg:pt-2 text-lg text-muted-foreground leading-[1.7] max-w-2xl">
              Whether you're an art lover hunting your next piece, a designer
              sourcing originals, or a brand commissioning a campaign — ArtSpace
              gives you a vetted shortlist and a clean workflow from brief to delivery.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
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
              <article key={item.k} className="group bg-canvas p-8 md:p-10 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-serif text-5xl text-accent">0{i + 1}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {item.k}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-[1.6rem] leading-tight">{item.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-[1.7]">
                  {item.d}
                </p>
                <span className="mt-8 inline-block text-[10.5px] uppercase tracking-[0.25em] link-underline text-ink group-hover:text-accent transition-colors">
                  Learn more →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 md:px-10 py-24 md:py-32 bg-ink text-canvas relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.555 0.181 41) 0, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.555 0.181 41) 0, transparent 50%)" }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent mb-6">
            The Dispatch
          </p>
          <h2 className="text-4xl md:text-6xl font-serif leading-[0.95] tracking-[-0.01em]">
            A monthly letter, <br />
            <span className="italic">never more.</span>
          </h2>
          <p className="mt-6 text-canvas/60 max-w-lg mx-auto leading-relaxed">
            New artists, studio openings, and editorial pieces — once a month.
            No promotions, no algorithms.
          </p>
          <form
            className="mt-10 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-canvas/20 px-4 py-3.5 text-sm text-canvas placeholder:text-canvas/40 outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="btn-ink border border-canvas bg-canvas text-ink px-6 py-3.5 text-[10.5px] font-medium uppercase tracking-[0.22em]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 px-6 md:px-10 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="text-2xl font-serif font-semibold">
                Art<span className="italic text-accent">Space</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
                A curated community for artists, studios and anyone who loves art.
              </p>
            </div>
            {[
              ["Explore", ["Gallery", "Artists", "Studios", "Hire"]],
              ["Company", ["About", "Editorial", "Contact", "Press"]],
            ].map(([h, items]) => (
              <div key={h as string}>
                <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                  {h as string}
                </h4>
                <ul className="space-y-3">
                  {(items as string[]).map((i) => (
                    <li key={i}>
                      <a href="#" className="text-sm link-underline hover:text-accent transition-colors">{i}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="hairline" />
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
              © 2026 ArtSpace Collective · Lisbon · Berlin · New York
            </p>
            <nav className="flex gap-6 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              <a href="#" className="hover:text-ink transition-colors">Terms</a>
              <a href="#" className="hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-ink transition-colors">Instagram</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
