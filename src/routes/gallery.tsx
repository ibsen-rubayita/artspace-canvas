import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroArtwork from "@/assets/hero-artwork.jpg";
import workMonolith from "@/assets/work-monolith.jpg";
import workPlains from "@/assets/work-plains.jpg";
import workQuietude from "@/assets/work-quietude.jpg";
import galleryFigure from "@/assets/gallery-figure.jpg";
import galleryCollage from "@/assets/gallery-collage.jpg";
import galleryBronze from "@/assets/gallery-bronze.jpg";
import galleryDoorway from "@/assets/gallery-doorway.jpg";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ArtSpace" },
      {
        name: "description",
        content:
          "Browse a curated index of contemporary works — painting, sculpture, photography and mixed media from the ArtSpace community.",
      },
      { property: "og:title", content: "Gallery — ArtSpace" },
      {
        property: "og:description",
        content:
          "Browse a curated index of contemporary works — painting, sculpture, photography and mixed media from the ArtSpace community.",
      },
      { property: "og:image", content: galleryFigure },
      { property: "twitter:image", content: galleryFigure },
    ],
  }),
  component: GalleryPage,
});

type Medium = "All" | "Painting" | "Sculpture" | "Photography" | "Mixed Media";

type Piece = {
  title: string;
  artist: string;
  city: string;
  year: string;
  medium: Exclude<Medium, "All">;
  price: string;
  image: string;
  alt: string;
  ratio: "portrait" | "square" | "tall";
  span?: boolean;
};

const pieces: Piece[] = [
  {
    title: "Figure in Ochre",
    artist: "Elena Vance",
    city: "Lisbon",
    year: "2025",
    medium: "Painting",
    price: "€ 4,200",
    image: galleryFigure,
    alt: "Minimal figurative painting in ochre and bone",
    ratio: "portrait",
    span: true,
  },
  {
    title: "Quietude",
    artist: "Marcus Thorne",
    city: "Berlin",
    year: "2025",
    medium: "Photography",
    price: "€ 1,800",
    image: workQuietude,
    alt: "Architectural photograph of a concrete stairwell",
    ratio: "portrait",
  },
  {
    title: "Monolith IV",
    artist: "Arlo Studio",
    city: "Porto",
    year: "2025",
    medium: "Sculpture",
    price: "€ 6,500",
    image: workMonolith,
    alt: "Brutalist ceramic monolith on white pedestal",
    ratio: "square",
  },
  {
    title: "Secondary Sources",
    artist: "Iris Halden",
    city: "Antwerp",
    year: "2024",
    medium: "Mixed Media",
    price: "€ 2,950",
    image: galleryCollage,
    alt: "Mixed media paper, ink and gold leaf collage",
    ratio: "portrait",
  },
  {
    title: "Ethereal Plains",
    artist: "Sarah K. Jenkins",
    city: "Reykjavík",
    year: "2024",
    medium: "Painting",
    price: "€ 3,400",
    image: workPlains,
    alt: "Expressionist watercolor landscape in sage and umber",
    ratio: "portrait",
  },
  {
    title: "Cast No. 9",
    artist: "Theo Marin",
    city: "Marseille",
    year: "2025",
    medium: "Sculpture",
    price: "€ 8,100",
    image: galleryBronze,
    alt: "Bronze cast sculpture on marble plinth",
    ratio: "square",
  },
  {
    title: "Threshold",
    artist: "Hana Okabe",
    city: "Kyoto",
    year: "2024",
    medium: "Photography",
    price: "€ 1,500",
    image: galleryDoorway,
    alt: "Black and white photograph of a doorway and morning light",
    ratio: "tall",
    span: true,
  },
  {
    title: "Untitled Hours",
    artist: "Elena Vance",
    city: "Lisbon",
    year: "2026",
    medium: "Painting",
    price: "€ 5,100",
    image: heroArtwork,
    alt: "Abstract oil painting with textured ochre brushstrokes",
    ratio: "portrait",
  },
];

const mediums: Medium[] = ["All", "Painting", "Sculpture", "Photography", "Mixed Media"];

const ratioClass: Record<Piece["ratio"], string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  tall: "aspect-[3/4] md:aspect-[5/6]",
};

function GalleryPage() {
  const [filter, setFilter] = useState<Medium>("All");
  const filtered = filter === "All" ? pieces : pieces.filter((p) => p.medium === filter);

  return (
    <div className="bg-canvas text-ink overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 border-b border-ink/10 bg-canvas/85 backdrop-blur-md">
        <Link to="/" className="text-[1.35rem] font-serif font-semibold tracking-tight">
          Art<span className="italic text-accent">Space</span>
        </Link>
        <div className="hidden md:flex gap-9 text-[11px] font-medium uppercase tracking-[0.22em]">
          <Link to="/gallery" className="link-underline text-accent">Gallery</Link>
          <Link to="/" hash="artists" className="link-underline hover:text-accent transition-colors">Artists</Link>
          <Link to="/" hash="studios" className="link-underline hover:text-accent transition-colors">Studios</Link>
          <Link to="/" hash="hire" className="link-underline hover:text-accent transition-colors">Hire</Link>
        </div>
        <button
          type="button"
          className="btn-ink border border-ink px-5 py-2.5 bg-ink text-canvas text-[10.5px] font-medium uppercase tracking-[0.22em]"
        >
          Join Community
        </button>
      </nav>

      {/* Hero */}
      <header className="px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16 max-w-7xl mx-auto">
        <p className="animate-fade-up text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground mb-7 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-accent" />
          Index 02 · The Gallery
        </p>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <h1 className="animate-fade-up delay-100 lg:col-span-8 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-medium leading-[0.92] tracking-[-0.02em] text-balance">
            A living index of <span className="italic font-normal text-accent">contemporary</span> work.
          </h1>
          <p className="animate-fade-up delay-200 lg:col-span-4 text-base md:text-lg text-muted-foreground leading-[1.7] max-w-md">
            Each piece is selected by our editors and the artists themselves —
            painting, sculpture, photography and the spaces in between.
          </p>
        </div>
      </header>

      <div className="hairline max-w-7xl mx-auto" />

      {/* Filter bar */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="flex flex-wrap gap-2">
          {mediums.map((m) => {
            const active = filter === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setFilter(m)}
                className={[
                  "px-4 py-2 border text-[10.5px] uppercase tracking-[0.22em] font-medium transition-all duration-300",
                  active
                    ? "bg-ink text-canvas border-ink"
                    : "border-ink/15 text-ink/80 hover:border-ink hover:text-ink",
                ].join(" ")}
              >
                {m}
              </button>
            );
          })}
        </div>
        <p className="text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
          Showing <span className="text-ink">{filtered.length.toString().padStart(2, "0")}</span> / {pieces.length.toString().padStart(2, "0")} works
        </p>
      </section>

      <div className="hairline max-w-7xl mx-auto" />

      {/* Masonry-style editorial grid */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className={[
                "group cursor-pointer animate-fade-up",
                p.span ? "lg:col-span-2" : "",
              ].join(" ")}
              style={{ animationDelay: `${Math.min(i, 6) * 80}ms` }}
            >
              <div className={`frame relative w-full ${ratioClass[p.ratio]}`}>
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* hover veil + reveal */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="inline-flex items-center gap-2 bg-canvas text-ink px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium">
                    View Work <span aria-hidden>→</span>
                  </span>
                </div>
                <span className="absolute top-4 left-4 bg-canvas/90 backdrop-blur px-2.5 py-1 text-[9.5px] uppercase tracking-[0.2em] text-ink/70">
                  N° {(i + 1).toString().padStart(2, "0")}
                </span>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-[1.65rem] leading-tight tracking-[-0.01em]">
                    <span className="link-underline">{p.title}</span>
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {p.artist} · {p.city}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif text-base text-ink">{p.price}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {p.medium} · {p.year}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-muted-foreground text-sm">
            No works in this medium yet — check back soon.
          </p>
        )}
      </section>

      {/* Editor's note */}
      <section className="bg-ink text-canvas px-6 md:px-10 py-24 md:py-32 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent mb-6">
            Editor's Note
          </p>
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em] text-balance">
            "A gallery is not a wall — it is a <span className="italic text-accent">conversation</span> between the work, the room, and the eye that meets it."
          </p>
          <p className="mt-10 text-[10.5px] uppercase tracking-[0.28em] text-canvas/60">
            — The ArtSpace Curators
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <div className="hairline mb-10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-serif text-xl">
            Art<span className="italic text-accent">Space</span>
          </p>
          <p className="text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
            © 2026 ArtSpace · A curated community
          </p>
          <Link to="/" className="link-underline text-[10.5px] uppercase tracking-[0.25em]">
            ← Back to Home
          </Link>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
