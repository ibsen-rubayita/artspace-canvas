import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTWORKS, CATEGORIES, type Category } from "@/data/catalog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { useAuth } from "@/hooks/use-auth";
import galleryFigure from "@/assets/gallery-figure.jpg";
import hireStudio from "@/assets/hire-studio.jpg";
import jobsTeam from "@/assets/jobs-team.jpg";
import learnStudio from "@/assets/learn-studio.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ArtSpace" },
      {
        name: "description",
        content:
          "Browse a curated index of contemporary works — drawings, paintings, photography, anime, motion picture, 3D, 2D, sculpture and digital art.",
      },
      { property: "og:title", content: "Gallery — ArtSpace" },
      {
        property: "og:description",
        content:
          "Browse a curated index of contemporary works across nine mediums from the ArtSpace community.",
      },
      { property: "og:image", content: galleryFigure },
      { property: "twitter:image", content: galleryFigure },
    ],
  }),
  component: GalleryPage,
});

type View = "gallery" | "artists" | "studios";
type CatFilter = "All" | Category;
const FILTERS: CatFilter[] = ["All", ...CATEGORIES];

const STUDIOS = [
  { name: "Lighthouse Studios", meta: "Games · 40 artists · Lisbon", img: hireStudio },
  { name: "Foundry Animation", meta: "TV · 65 artists · Paris", img: jobsTeam },
  { name: "Northlight VFX", meta: "Film · 80 artists · London", img: learnStudio },
  { name: "Atelier Mech", meta: "3D · 22 artists · Berlin", img: art5 },
  { name: "Quietworld", meta: "Concept · 12 artists · Remote", img: art2 },
  { name: "Casa Bronze", meta: "Sculpture · 9 artists · Lisbon", img: gBronze },
];

function GalleryPage() {
  const navigate = useNavigate();
  const { user, openAuth } = useAuth();
  const [view, setView] = useState<View>("gallery");
  const [cat, setCat] = useState<CatFilter>("All");
  const [focusArtist, setFocusArtist] = useState<string | null>(null);

  const artists = useMemo(() => {
    const map = new Map<string, typeof ARTWORKS>();
    for (const a of ARTWORKS) {
      const list = map.get(a.artist) ?? [];
      list.push(a);
      map.set(a.artist, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, []);

  const filtered = useMemo(() => {
    let list = ARTWORKS;
    if (focusArtist) list = list.filter((a) => a.artist === focusArtist);
    if (cat !== "All") list = list.filter((a) => a.category === cat);
    return list;
  }, [cat, focusArtist]);

  const handleNav = (v: View | "hire") => {
    if (v === "hire") {
      navigate({ to: "/hire" });
      return;
    }
    setView(v);
    setFocusArtist(null);
    setCat("All");
  };

  const navItem = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      onClick={onClick}
      className="relative text-[12px] font-medium uppercase tracking-[0.22em] py-1 transition-colors"
      style={{ color: active ? "var(--color-accent)" : "var(--color-muted-foreground)" }}
    >
      {label}
      {active && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-px"
          style={{ background: "var(--color-accent)" }}
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      {/* Attached sub-nav — no top border, sits flush under Header */}
      <div
        className="sticky top-14 z-40 backdrop-blur-md"
        style={{
          background: "color-mix(in oklab, var(--color-background) 88%, transparent)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-7 overflow-x-auto">
            {navItem("Gallery", view === "gallery" && !focusArtist, () => handleNav("gallery"))}
            {navItem("Artists", view === "artists", () => handleNav("artists"))}
            {navItem("Studios", view === "studios", () => handleNav("studios"))}
            {navItem("Hire", false, () => handleNav("hire"))}
          </div>
          {!user && (
            <button
              onClick={() => openAuth("signup")}
              className="hidden sm:inline-flex items-center px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] border"
              style={{
                background: "var(--color-foreground)",
                color: "var(--color-background)",
                borderColor: "var(--color-foreground)",
              }}
            >
              Join Community
            </button>
          )}
        </div>
      </div>

      {/* Hero */}
      <header className="px-6 md:px-10 pt-14 md:pt-20 pb-10 md:pb-14 max-w-7xl mx-auto">
        <p className="animate-fade-up text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--color-muted-foreground)] mb-6 flex items-center gap-3">
          <span className="inline-block w-8 h-px" style={{ background: "var(--color-accent)" }} />
          Index 02 · The Gallery
        </p>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <h1 className="animate-fade-up delay-100 lg:col-span-8 text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium leading-[0.95] tracking-[-0.02em]">
            {view === "artists" && !focusArtist ? (
              <>The <span className="italic text-[var(--color-accent)]">artists</span> behind the work.</>
            ) : view === "studios" ? (
              <>Inside the <span className="italic text-[var(--color-accent)]">studios</span> shaping today.</>
            ) : focusArtist ? (
              <>More from <span className="italic text-[var(--color-accent)]">{focusArtist}</span>.</>
            ) : (
              <>A living index of <span className="italic text-[var(--color-accent)]">contemporary</span> work.</>
            )}
          </h1>
          <p className="animate-fade-up delay-200 lg:col-span-4 text-base md:text-lg text-[var(--color-muted-foreground)] leading-[1.7] max-w-md">
            {view === "artists" && !focusArtist
              ? "Pick an artist to see every piece they've shown on ArtSpace."
              : view === "studios"
                ? "Vetted teams ready for production across games, film and TV."
                : focusArtist
                  ? `Selected works by ${focusArtist} from the ArtSpace community.`
                  : "Each piece is selected by our editors and the artists themselves — painting, sculpture, photography and the spaces in between."}
          </p>
        </div>
        {focusArtist && (
          <button
            onClick={() => setFocusArtist(null)}
            className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)] hover:underline"
          >
            ← Back to all works
          </button>
        )}
      </header>

      <div className="max-w-7xl mx-auto h-px" style={{ background: "var(--color-border)" }} />

      {/* ============ GALLERY VIEW ============ */}
      {view === "gallery" && (
        <>
          <section className="px-6 md:px-10 max-w-7xl mx-auto py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((m) => {
                const active = cat === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setCat(m)}
                    className="px-4 py-2 border text-[10.5px] uppercase tracking-[0.22em] font-medium transition-all duration-300"
                    style={{
                      background: active ? "var(--color-foreground)" : "transparent",
                      color: active ? "var(--color-background)" : "var(--color-foreground)",
                      borderColor: active ? "var(--color-foreground)" : "var(--color-border)",
                    }}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
            <p className="text-[10.5px] uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
              Showing <span className="text-[var(--color-foreground)]">{filtered.length.toString().padStart(2, "0")}</span> / {ARTWORKS.length.toString().padStart(2, "0")} works
            </p>
          </section>

          <div className="max-w-7xl mx-auto h-px" style={{ background: "var(--color-border)" }} />

          <section className="px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((p, i) => (
                <article
                  key={p.id}
                  className="group cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${Math.min(i, 6) * 80}ms` }}
                  onClick={() => setFocusArtist(p.artist)}
                >
                  <div
                    className="relative w-full aspect-[4/5] overflow-hidden border"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <img
                      src={p.image}
                      alt={`${p.title} by ${p.artist}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <span
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium"
                        style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}
                      >
                        View more from {p.artist.split(" ").slice(-1)[0]} <span aria-hidden>→</span>
                      </span>
                    </div>
                    <span
                      className="absolute top-4 left-4 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.2em]"
                      style={{ background: "color-mix(in oklab, var(--color-background) 88%, transparent)", color: "var(--color-muted-foreground)" }}
                    >
                      N° {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-2xl leading-tight tracking-[-0.01em]">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                        {p.artist} · {p.city}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-base">{p.price}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                        {p.category} · {p.year}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center py-24 text-[var(--color-muted-foreground)] text-sm">
                No works in this medium yet — check back soon.
              </p>
            )}
          </section>
        </>
      )}

      {/* ============ ARTISTS VIEW ============ */}
      {view === "artists" && !focusArtist && (
        <section className="px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map(([name, works]) => (
              <button
                key={name}
                onClick={() => setFocusArtist(name)}
                className="group text-left animate-fade-up"
              >
                <div className="grid grid-cols-3 gap-1.5">
                  {works.slice(0, 3).map((w, i) => (
                    <div
                      key={w.id}
                      className="aspect-square overflow-hidden border"
                      style={{
                        borderColor: "var(--color-border)",
                        gridColumn: i === 0 ? "span 2 / span 2" : undefined,
                        gridRow: i === 0 ? "span 2 / span 2" : undefined,
                      }}
                    >
                      <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl">{name}</h3>
                  <span className="text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">
                    {works.length} work{works.length === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  View works →
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ============ STUDIOS VIEW ============ */}
      {view === "studios" && (
        <section className="px-6 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STUDIOS.map((s) => (
              <Link
                key={s.name}
                to="/hire"
                hash="studios"
                className="group block animate-fade-up"
              >
                <div className="aspect-[4/5] overflow-hidden border" style={{ borderColor: "var(--color-border)" }}>
                  <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <h3 className="mt-4 font-serif text-xl">{s.name}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted-foreground)]">{s.meta}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Editor's note */}
      <section
        className="px-6 md:px-10 py-24 md:py-32 mt-12"
        style={{ background: "var(--color-foreground)", color: "var(--color-background)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] mb-6" style={{ color: "var(--color-accent)" }}>
            Editor's Note
          </p>
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em]">
            "A gallery is not a wall — it is a <span className="italic" style={{ color: "var(--color-accent)" }}>conversation</span> between the work, the room, and the eye that meets it."
          </p>
          <p className="mt-10 text-[10.5px] uppercase tracking-[0.28em] opacity-60">
            — The ArtSpace Curators
          </p>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
