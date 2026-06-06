import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Palette, GraduationCap, Wrench, Newspaper, Network as NetworkIcon } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";
import { HeroMontage } from "@/components/site/HeroMontage";

import artFigure from "@/assets/gallery-figure.jpg";
import artCollage from "@/assets/gallery-collage.jpg";
import artBronze from "@/assets/gallery-bronze.jpg";
import artDoorway from "@/assets/gallery-doorway.jpg";
import artMonolith from "@/assets/work-monolith.jpg";
import artPlains from "@/assets/work-plains.jpg";
import artQuietude from "@/assets/work-quietude.jpg";
import artHero from "@/assets/hero-artwork.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import art11 from "@/assets/art-11.jpg";
import art14 from "@/assets/art-14.jpg";
import art17 from "@/assets/art-17.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const RECENT_ARTWORKS: RailItem[] = [
  { img: artFigure, title: "Figure in Ochre", artist: "L. Marin", likes: "2.4k", views: "18.2k", tag: "Painting" },
  { img: artCollage, title: "Paper Memory", artist: "K. Aoki", likes: "1.8k", views: "12.6k", tag: "Mixed Media" },
  { img: artBronze, title: "Untitled (Bronze 04)", artist: "R. Okafor", likes: "3.1k", views: "22.9k", tag: "Sculpture" },
  { img: artDoorway, title: "Doorway, Lisbon", artist: "M. Costa", likes: "1.2k", views: "9.4k", tag: "Photography" },
  { img: artMonolith, title: "Monolith", artist: "S. Vance", likes: "4.6k", views: "31.7k", tag: "Painting" },
  { img: artPlains, title: "Plains at Dusk", artist: "E. Lindqvist", likes: "2.0k", views: "15.1k", tag: "Painting" },
  { img: artQuietude, title: "Quietude", artist: "J. Disingana", likes: "5.8k", views: "44.3k", tag: "Digital" },
  { img: artHero, title: "Inner Light", artist: "A. Petrov", likes: "3.4k", views: "27.0k", tag: "Concept" },
];

const TRENDING: RailItem[] = [
  { img: art2, title: "Floating Quiet", artist: "S. Vance", likes: "6.2k", views: "48.1k", tag: "Concept" },
  { img: art7, title: "Halftone Bloom", artist: "J. Disingana", likes: "5.1k", views: "39.0k", tag: "Illustration" },
  { img: art5, title: "Mech 07", artist: "K. Mori", likes: "4.8k", views: "33.4k", tag: "3D" },
  { img: art1, title: "Atlantic Blue", artist: "S. Vance", likes: "3.6k", views: "27.7k", tag: "Painting" },
  { img: art8, title: "The Fisherman", artist: "A. Petrov", likes: "3.4k", views: "27.0k", tag: "Portrait" },
  { img: artCollage, title: "Paper Memory", artist: "K. Aoki", likes: "2.9k", views: "21.2k", tag: "Mixed" },
  { img: artBronze, title: "Bronze 04", artist: "R. Okafor", likes: "2.4k", views: "18.9k", tag: "Sculpture" },
  { img: artDoorway, title: "Doorway, Lisbon", artist: "M. Costa", likes: "1.9k", views: "14.5k", tag: "Photo" },
];

const POPULAR: RailItem[] = [
  { img: artQuietude, title: "Quietude", artist: "J. Disingana", likes: "7.3k", views: "61.0k", tag: "Digital" },
  { img: artMonolith, title: "Monolith", artist: "S. Vance", likes: "5.9k", views: "44.1k", tag: "Painting" },
  { img: art7, title: "Halftone Bloom", artist: "J. Disingana", likes: "5.1k", views: "39.0k", tag: "Illustration" },
  { img: artFigure, title: "Figure in Ochre", artist: "L. Marin", likes: "4.7k", views: "32.8k", tag: "Painting" },
  { img: art8, title: "The Fisherman", artist: "A. Petrov", likes: "4.5k", views: "31.0k", tag: "Portrait" },
  { img: art2, title: "Floating Quiet", artist: "S. Vance", likes: "4.0k", views: "29.2k", tag: "Concept" },
  { img: artPlains, title: "Plains at Dusk", artist: "E. Lindqvist", likes: "3.2k", views: "23.4k", tag: "Painting" },
  { img: art5, title: "Mech 07", artist: "K. Mori", likes: "2.7k", views: "20.5k", tag: "3D" },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 pt-10 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span className="text-[var(--color-muted-foreground)]">New on ArtSpace — Studio listings 2026</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Where every <span className="text-[var(--color-accent)]">brushstroke</span>
              <br /> finds its admirer.
            </h1>

            <p className="mt-5 text-[15px] lg:text-base text-[var(--color-muted-foreground)] max-w-xl leading-relaxed">
              A home for art lovers, makers and collectors — discover, learn, hire and
              shop curated contemporary work from artists and studios worldwide.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="/explore" className="btn btn-cta px-5 py-2.5 text-sm">
                Start exploring <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/hire" className="btn btn-ghost px-5 py-2.5 text-sm">Hire a studio</a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "1.2K+", v: "Studios" },
                { k: "48K", v: "Artists" },
                { k: "6.3K", v: "Open jobs" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-semibold">{s.k}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 animate-fade-up delay-200">
            <HeroMontage
              slides={[
                { src: artHero, title: "Inner Light" },
                { src: artQuietude, title: "Quietude" },
                { src: art17, title: "Elven Queen" },
                { src: art14, title: "The Thinker" },
                { src: artMonolith, title: "Monolith" },
                { src: art11, title: "Blossom Reverie" },
              ]}
            />
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
        />
      </section>

      {/* HIGHLIGHTS — image-led, with small bottom-left caption */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">Highlights</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Six ways to start using ArtSpace today.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Palette,       title: "Explore the Gallery", desc: "Hand-picked work from artists worldwide.", href: "/explore",  img: artFigure },
            { icon: GraduationCap, title: "Learn your craft",    desc: "Online courses & in-person schools.",     href: "/learning", img: art11 },
            { icon: Wrench,        title: "Shop the Tools",      desc: "Cameras, brushes, paints, tablets.",      href: "/tools",    img: art5 },
            { icon: Palette,       title: "Arts Sales",          desc: "Original works, direct from the studio.", href: "/arts",     img: artMonolith },
            { icon: Newspaper,     title: "Blogs & Magazine",    desc: "Stories, essays and studio visits.",      href: "/blogs",    img: artCollage },
            { icon: NetworkIcon,   title: "Network",             desc: "Find a job · hire a studio.",             href: "/network",  img: artHero },
          ].map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="card-surface relative overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up aspect-[5/4]"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <img
                src={c.img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Top-right icon chip */}
              <div className="absolute top-3 right-3 h-9 w-9 rounded-lg grid place-items-center backdrop-blur-md border" style={{ background: "color-mix(in oklab, var(--color-background) 60%, transparent)", borderColor: "color-mix(in oklab, var(--color-foreground) 20%, transparent)" }}>
                <c.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </div>

              {/* Bottom-left small caption */}
              <div className="absolute bottom-3 left-3 right-12 text-white">
                <h3 className="text-base font-semibold leading-tight drop-shadow-sm">{c.title}</h3>
                <p className="mt-0.5 text-[11px] leading-snug text-white/75 line-clamp-1">{c.desc}</p>
              </div>

              {/* Hover arrow */}
              <span className="absolute bottom-3 right-3 h-7 w-7 rounded-full grid place-items-center bg-[var(--color-accent)] text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <HorizontalRail title="Recent Artworks" subtitle="Freshly uploaded from artists across the community." items={RECENT_ARTWORKS} />
      <HorizontalRail title="Trending Portfolios" subtitle="Most viewed portfolio posts this week." items={TRENDING} />
      <HorizontalRail title="Popular on ArtSpace" subtitle="Loved by collectors and studios." items={POPULAR} />

      <Footer />
      <ScrollToTop />
    </div>
  );
}
