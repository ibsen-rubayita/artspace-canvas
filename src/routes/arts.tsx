import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Palette, Filter, Heart, ChevronDown, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import wMonolith from "@/assets/work-monolith.jpg";
import wPlains from "@/assets/work-plains.jpg";
import wQuietude from "@/assets/work-quietude.jpg";
import hero from "@/assets/hero-artwork.jpg";
import a1 from "@/assets/art-1.jpg";
import a2 from "@/assets/art-2.jpg";
import a3 from "@/assets/art-3.jpg";
import a4 from "@/assets/art-4.jpg";
import a5 from "@/assets/art-5.jpg";
import a6 from "@/assets/art-6.jpg";
import a7 from "@/assets/art-7.jpg";
import a8 from "@/assets/art-8.jpg";
import a9 from "@/assets/art-9.jpg";
import a10 from "@/assets/art-10.jpg";
import a11 from "@/assets/art-11.jpg";
import a12 from "@/assets/art-12.jpg";
import a13 from "@/assets/art-13.jpg";
import a14 from "@/assets/art-14.jpg";
import a15 from "@/assets/art-15.jpg";
import a16 from "@/assets/art-16.jpg";
import a17 from "@/assets/art-17.jpg";
import a18 from "@/assets/art-18.jpg";

export const Route = createFileRoute("/arts")({
  head: () => ({
    meta: [
      { title: "Arts Sales — ArtSpace Shop" },
      { name: "description", content: "Buy original paintings, drawings, photographs, sculptures and signed limited prints — direct from the artists on ArtSpace." },
      { property: "og:title", content: "Arts Sales — ArtSpace Shop" },
      { property: "og:description", content: "Original paintings, drawings, photographs and sculptures from the artists themselves." },
      { property: "og:image", content: hero },
    ],
  }),
  component: ArtsPage,
});

type ArtCategory =
  | "All"
  | "Painting"
  | "Drawing"
  | "Photography"
  | "Sculpture"
  | "Digital"
  | "Mixed Media"
  | "Print";

type Art = {
  id: string;
  img: string;
  title: string;
  artist: string;
  city: string;
  year: number;
  price: number;
  category: Exclude<ArtCategory, "All">;
  size: string;
  edition?: string;
};

const ARTS: Art[] = [
  { id: "ar1", img: gFigure, title: "Figure in Ochre", artist: "L. Marin", city: "Paris", year: 2025, price: 3200, category: "Painting", size: "60×80 cm" },
  { id: "ar2", img: wMonolith, title: "Monolith", artist: "S. Vance", city: "Berlin", year: 2025, price: 6500, category: "Painting", size: "90×120 cm" },
  { id: "ar3", img: wPlains, title: "Plains at Dusk", artist: "E. Lindqvist", city: "Reykjavík", year: 2024, price: 3400, category: "Painting", size: "70×90 cm" },
  { id: "ar4", img: a1, title: "Atlantic Blue", artist: "S. Vance", city: "Porto", year: 2025, price: 3800, category: "Painting", size: "70×90 cm" },
  { id: "ar5", img: a8, title: "The Fisherman", artist: "A. Petrov", city: "Prague", year: 2025, price: 4300, category: "Painting", size: "80×100 cm" },
  { id: "ar6", img: a9, title: "Crimson Field", artist: "M. Okafor", city: "Lagos", year: 2026, price: 5400, category: "Painting", size: "90×120 cm" },
  { id: "ar7", img: hero, title: "Inner Light", artist: "A. Petrov", city: "Prague", year: 2026, price: 5100, category: "Painting", size: "100×120 cm" },

  { id: "ar8", img: a10, title: "Study in Graphite", artist: "L. Marin", city: "Paris", year: 2025, price: 900, category: "Drawing", size: "40×50 cm" },
  { id: "ar9", img: a18, title: "Wildflower Study", artist: "I. Halden", city: "Antwerp", year: 2025, price: 750, category: "Drawing", size: "30×42 cm" },
  { id: "ar10", img: a6, title: "Botanical Sheet IV", artist: "I. Halden", city: "Antwerp", year: 2024, price: 680, category: "Drawing", size: "30×42 cm" },

  { id: "ar11", img: gDoorway, title: "Doorway, Lisbon", artist: "M. Costa", city: "Lisbon", year: 2024, price: 340, category: "Photography", size: "A2 print", edition: "/250" },
  { id: "ar12", img: a4, title: "Alley, 3am", artist: "H. Adams", city: "Denver", year: 2024, price: 240, category: "Photography", size: "A2 print", edition: "/150" },
  { id: "ar13", img: a13, title: "Sierra Silence", artist: "H. Adams", city: "Denver", year: 2025, price: 320, category: "Photography", size: "A2 print", edition: "/120" },
  { id: "ar14", img: a15, title: "Chapel at Dawn", artist: "F. Reichardt", city: "Munich", year: 2024, price: 280, category: "Photography", size: "A3 print", edition: "/200" },

  { id: "ar15", img: gBronze, title: "Bronze 04", artist: "R. Okafor", city: "Lagos", year: 2025, price: 8100, category: "Sculpture", size: "45 cm" },
  { id: "ar16", img: a14, title: "The Thinker", artist: "R. Okafor", city: "Lagos", year: 2025, price: 9200, category: "Sculpture", size: "60 cm" },

  { id: "ar17", img: gCollage, title: "Paper Memory", artist: "K. Aoki", city: "Tokyo", year: 2024, price: 1150, category: "Mixed Media", size: "40×50 cm" },
  { id: "ar18", img: a7, title: "Halftone Bloom", artist: "J. Disingana", city: "Kinshasa", year: 2025, price: 850, category: "Mixed Media", size: "50×70 cm" },
  { id: "ar19", img: a16, title: "Skyline 02", artist: "J. Reyes", city: "Mexico City", year: 2025, price: 1100, category: "Mixed Media", size: "60×80 cm" },

  { id: "ar20", img: wQuietude, title: "Quietude", artist: "J. Disingana", city: "Kinshasa", year: 2025, price: 2100, category: "Digital", size: "Open edition" },
  { id: "ar21", img: a2, title: "Floating Quiet", artist: "S. Vance", city: "Berlin", year: 2025, price: 2400, category: "Digital", size: "Open edition" },
  { id: "ar22", img: a5, title: "Mech 07", artist: "K. Mori", city: "Osaka", year: 2025, price: 1900, category: "Digital", size: "Open edition" },
  { id: "ar23", img: a11, title: "Blossom Reverie", artist: "Y. Tanaka", city: "Tokyo", year: 2026, price: 1200, category: "Digital", size: "Open edition" },
  { id: "ar24", img: a12, title: "Sentinel Mk. III", artist: "K. Mori", city: "Osaka", year: 2026, price: 2800, category: "Digital", size: "Limited /50" },
  { id: "ar25", img: a17, title: "Elven Queen", artist: "S. Petrova", city: "Prague", year: 2026, price: 2200, category: "Digital", size: "Limited /80" },

  { id: "ar26", img: a3, title: "Quiet Tree · Limited Print", artist: "S. Vance", city: "Berlin", year: 2025, price: 95, category: "Print", size: "50×70 cm", edition: "/200" },
];

const CATEGORIES: ArtCategory[] = ["All", "Painting", "Drawing", "Photography", "Sculpture", "Digital", "Mixed Media", "Print"];
type SortKey = "popular" | "price-asc" | "price-desc" | "year";

function ArtsPage() {
  const [cat, setCat] = useState<ArtCategory>("All");
  const [sort, setSort] = useState<SortKey>("popular");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    let list = cat === "All" ? ARTS : ARTS.filter((a) => a.category === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "year") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [cat, sort]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Shop · Arts Sales"
        icon={Palette}
        title={<>Original art, <span className="text-[var(--color-accent)]">direct from the studio</span>.</>}
        description="Paintings, drawings, photographs, sculptures and signed limited prints — every piece shipped from the artist who made it."
      />

      {/* Trust strip */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-6">
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          {[
            { icon: ShieldCheck, t: "Certificate of authenticity" },
            { icon: Truck, t: "Insured worldwide shipping" },
            { icon: Palette, t: "Ships from the artist's studio" },
          ].map((b, i) => (
            <div key={b.t} className="card-surface px-4 py-3 flex items-center gap-3 animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <b.icon className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="text-[var(--color-muted-foreground)]">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter bar */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-6 sticky top-14 z-30 bg-[color-mix(in_oklab,var(--color-background)_92%,transparent)] backdrop-blur-md">
        <div className="card-surface p-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] px-2">
            <Filter className="h-4 w-4" /> Filter
          </div>
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <label className="relative inline-flex items-center">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value as ArtCategory)}
                className="appearance-none h-9 pl-3 pr-9 rounded-lg border bg-[var(--color-surface)] text-sm hover:border-[var(--color-accent)] transition-colors"
                style={{ borderColor: "var(--color-border)" }}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="h-3.5 w-3.5 absolute right-2.5 pointer-events-none text-[var(--color-muted-foreground)]" />
            </label>
            <label className="relative inline-flex items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none h-9 pl-3 pr-9 rounded-lg border bg-[var(--color-surface)] text-sm hover:border-[var(--color-accent)] transition-colors"
                style={{ borderColor: "var(--color-border)" }}
              >
                <option value="popular">Most popular</option>
                <option value="price-asc">Price · low to high</option>
                <option value="price-desc">Price · high to low</option>
                <option value="year">Most recent</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 absolute right-2.5 pointer-events-none text-[var(--color-muted-foreground)]" />
            </label>
          </div>
          <div className="text-xs text-[var(--color-muted-foreground)] px-2">
            {filtered.length} works
          </div>
        </div>
      </section>

      {/* Vertical grid */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((a, i) => {
            const isLiked = !!liked[a.id];
            return (
              <article
                key={a.id}
                className="card-surface overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up flex flex-col"
                style={{ animationDelay: `${(i % 8) * 0.04}s` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-2)]">
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 badge bg-[var(--color-surface)]/85 backdrop-blur-md border" style={{ borderColor: "var(--color-border)" }}>
                    {a.category}
                  </span>
                  <button
                    onClick={() => setLiked((v) => ({ ...v, [a.id]: !v[a.id] }))}
                    aria-label={isLiked ? "Unlike" : "Like"}
                    className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full bg-[var(--color-surface)]/85 backdrop-blur-md border hover:scale-110 transition-transform"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <Heart className={`h-4 w-4 transition-colors ${isLiked ? "fill-[var(--color-accent)] text-[var(--color-accent)]" : "text-[var(--color-foreground)]"}`} />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-sm font-semibold leading-snug truncate">{a.title}</h3>
                  <p className="text-xs text-[var(--color-muted-foreground)]">by {a.artist} · {a.city} · {a.year}</p>
                  <p className="text-[11px] text-[var(--color-muted-foreground)]">{a.size}{a.edition ? ` · ${a.edition}` : ""}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-base font-semibold">${a.price.toLocaleString()}</span>
                    <button className="btn btn-cta px-3 py-1.5 text-xs">Buy</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="card-surface p-10 text-center text-sm text-[var(--color-muted-foreground)]">
            No works match this filter yet.
          </div>
        )}
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
