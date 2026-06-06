import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Wrench, Filter, Star, Truck, Shield, ChevronDown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import camera from "@/assets/tool-camera.jpg";
import mirrorless from "@/assets/tool-mirrorless.jpg";
import lens from "@/assets/tool-lens.jpg";
import tripod from "@/assets/tool-tripod.jpg";
import brushes from "@/assets/tool-brushes.jpg";
import paints from "@/assets/tool-paints.jpg";
import watercolor from "@/assets/tool-watercolor.jpg";
import canvas from "@/assets/tool-canvas.jpg";
import easel from "@/assets/tool-easel.jpg";
import tablet from "@/assets/tool-tablet.jpg";
import pencils from "@/assets/tool-pencils.jpg";
import sketchbook from "@/assets/tool-sketchbook.jpg";
import palette from "@/assets/tool-palette.jpg";
import charcoal from "@/assets/tool-charcoal.jpg";
import markers from "@/assets/tool-markers.jpg";
import ink from "@/assets/tool-ink.jpg";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — ArtSpace Shop" },
      { name: "description", content: "Buy the tools artists actually use — cameras, lenses, brushes, painting boards, paints, easels, tablets, sketchbooks, charcoal, markers and more." },
      { property: "og:title", content: "Tools — ArtSpace Shop" },
      { property: "og:description", content: "Cameras, lenses, brushes, paints, boards, easels, tablets — the kit working artists reach for." },
      { property: "og:image", content: brushes },
    ],
  }),
  component: ToolsPage,
});

type ToolCategory =
  | "All"
  | "Cameras"
  | "Lenses"
  | "Brushes"
  | "Paints"
  | "Boards"
  | "Drawing"
  | "Digital"
  | "Studio";

type Tool = {
  id: string;
  img: string;
  title: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  category: Exclude<ToolCategory, "All">;
  tag?: "Sale" | "New" | "Bestseller";
};

const TOOLS: Tool[] = [
  { id: "t1", img: camera, title: "Nion 405 DSLR Body · 24MP", brand: "Nion", price: 1290, rating: 4.8, reviews: 412, category: "Cameras", tag: "Bestseller" },
  { id: "t2", img: mirrorless, title: "Pantra A7 Mirrorless · 26MP", brand: "Pantra", price: 1490, rating: 4.9, reviews: 287, category: "Cameras", tag: "New" },
  { id: "t3", img: lens, title: "Prime 55mm f/1.8 Lens", brand: "Optix", price: 420, rating: 4.7, reviews: 198, category: "Lenses" },
  { id: "t4", img: tripod, title: "Carbon Tripod · Fluid Head", brand: "Vantix", price: 240, rating: 4.6, reviews: 154, category: "Studio", tag: "Sale" },
  { id: "t5", img: brushes, title: "Sable Brush Set · 14 pieces", brand: "Atelier", price: 72, rating: 4.9, reviews: 612, category: "Brushes", tag: "Bestseller" },
  { id: "t6", img: paints, title: "Acrylic Paint Pots · Set of 24", brand: "ChromaLab", price: 54, rating: 4.7, reviews: 421, category: "Paints" },
  { id: "t7", img: watercolor, title: "Watercolor Pan Set · 24 colors", brand: "Aquarelle", price: 48, rating: 4.8, reviews: 388, category: "Paints", tag: "New" },
  { id: "t8", img: canvas, title: "Stretched Cotton Canvas · A2", brand: "BlankCo", price: 38, rating: 4.5, reviews: 220, category: "Boards" },
  { id: "t9", img: easel, title: "Beechwood Studio Easel", brand: "Atelier", price: 210, rating: 4.8, reviews: 167, category: "Studio", tag: "Sale" },
  { id: "t10", img: tablet, title: "Pen Display Tablet · 13\"", brand: "DigiPen", price: 640, rating: 4.7, reviews: 305, category: "Digital", tag: "Bestseller" },
  { id: "t11", img: pencils, title: "Graphite Pencil Set · 12 grades", brand: "Studio Line", price: 28, rating: 4.9, reviews: 540, category: "Drawing" },
  { id: "t12", img: sketchbook, title: "Leather Sketchbook · A4 192pp", brand: "Foglio", price: 36, rating: 4.8, reviews: 219, category: "Drawing", tag: "New" },
  { id: "t13", img: palette, title: "Wooden Mixing Palette + Knife", brand: "Atelier", price: 22, rating: 4.6, reviews: 142, category: "Paints" },
  { id: "t14", img: charcoal, title: "Compressed Charcoal Set · 12", brand: "Studio Line", price: 18, rating: 4.7, reviews: 188, category: "Drawing" },
  { id: "t15", img: markers, title: "Alcohol Marker Set · 36 colors", brand: "ChromaLab", price: 64, rating: 4.6, reviews: 264, category: "Drawing", tag: "Sale" },
  { id: "t16", img: ink, title: "India Ink + Dip Pen Kit", brand: "Foglio", price: 24, rating: 4.8, reviews: 132, category: "Drawing" },
];

const CATEGORIES: ToolCategory[] = ["All", "Cameras", "Lenses", "Brushes", "Paints", "Boards", "Drawing", "Digital", "Studio"];
type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

function StarRow({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
      <Star className="h-3 w-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
      <span className="font-medium text-[var(--color-foreground)]">{value.toFixed(1)}</span>
    </span>
  );
}

function ToolsPage() {
  const [cat, setCat] = useState<ToolCategory>("All");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list = cat === "All" ? TOOLS : TOOLS.filter((t) => t.category === cat);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, sort]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Shop · Tools"
        icon={Wrench}
        title={<>Tools that <span className="text-[var(--color-accent)]">working artists</span> reach for.</>}
        description="Cameras, lenses, brushes, painting boards, paints, easels, drawing pencils, tablets and more — vetted by the studios on ArtSpace."
      />

      {/* Trust strip */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-6">
        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          {[
            { icon: Truck, t: "Free shipping over $250" },
            { icon: Shield, t: "30-day returns on all tools" },
            { icon: Star, t: "Reviewed by ArtSpace studios" },
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
                onChange={(e) => setCat(e.target.value as ToolCategory)}
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
                <option value="rating">Top rated</option>
              </select>
              <ChevronDown className="h-3.5 w-3.5 absolute right-2.5 pointer-events-none text-[var(--color-muted-foreground)]" />
            </label>
          </div>

          <div className="text-xs text-[var(--color-muted-foreground)] px-2">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((t, i) => (
            <article
              key={t.id}
              className="card-surface overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-up flex flex-col"
              style={{ animationDelay: `${(i % 8) * 0.04}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-2)]">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {t.tag && (
                  <span
                    className="absolute top-3 left-3 badge"
                    style={{
                      background:
                        t.tag === "Sale" ? "var(--color-badge-sale)" :
                        t.tag === "New" ? "var(--color-badge-new)" :
                        "color-mix(in oklab, var(--color-accent) 80%, #000)",
                      color: "#fff",
                    }}
                  >
                    {t.tag}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">{t.title}</h3>
                  <StarRow value={t.rating} />
                </div>
                <p className="text-xs text-[var(--color-muted-foreground)]">{t.brand} · {t.category}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <span className="text-base font-semibold">${t.price.toLocaleString()}</span>
                  <button className="btn btn-cta px-3 py-1.5 text-xs">Add to cart</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-surface p-10 text-center text-sm text-[var(--color-muted-foreground)]">
            No tools match this filter yet.
          </div>
        )}
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
