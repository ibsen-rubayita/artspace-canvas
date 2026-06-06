import { createFileRoute, Link } from "@tanstack/react-router";
import { Network, Briefcase, UserPlus, ArrowRight, Building2, Palette } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";

import hireStudio from "@/assets/hire-studio.jpg";
import hireArtist from "@/assets/hire-artist.jpg";
import jobsTeam from "@/assets/jobs-team.jpg";
import learnStudio from "@/assets/learn-studio.jpg";
import heroNetwork from "@/assets/hero-network.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gFigure from "@/assets/gallery-figure.jpg";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "Network — ArtSpace" },
      { name: "description", content: "The ArtSpace network — apply for roles at top studios on the Jobs board, or post a brief and commission vetted artists from the Hiring page." },
      { property: "og:title", content: "Network — ArtSpace" },
      { property: "og:description", content: "Jobs and hiring in one place — for artists looking for work, and for teams hiring them." },
    ],
  }),
  component: NetworkPage,
});

const HIGHLIGHT_JOBS: RailItem[] = [
  { img: hireStudio, title: "Senior Concept Artist · Lighthouse", meta: "Remote · EU · Full-time", tag: "New" },
  { img: jobsTeam, title: "Character Designer · Foundry Animation", meta: "Paris · Full-time", tag: "New" },
  { img: learnStudio, title: "Matte Painter · Northlight VFX", meta: "London · Contract", tag: "Hot" },
  { img: art5, title: "Junior 3D Generalist · Atelier Mech", meta: "Berlin · Hybrid", tag: "New" },
  { img: art7, title: "Editorial Illustrator · Paper Magazine", meta: "Remote · Freelance", tag: "Open" },
  { img: gBronze, title: "Sculptor · Casa Bronze", meta: "Lisbon · Contract", tag: "Open" },
];

const HIGHLIGHT_ARTISTS: RailItem[] = [
  { img: hireArtist, title: "Lena Costa", meta: "Concept · Lisbon · ★ 4.9", tag: "Available" },
  { img: art7, title: "J. Disingana", meta: "Illustration · Remote · ★ 5.0", tag: "Available" },
  { img: art8, title: "Anders Petrov", meta: "Portrait · Oslo · ★ 4.8", tag: "Booking Q3" },
  { img: art5, title: "K. Mori", meta: "3D · Tokyo · ★ 4.9", tag: "Available" },
  { img: gFigure, title: "Lucía Marin", meta: "Painting · Madrid · ★ 4.7", tag: "Booking Q4" },
  { img: art2, title: "S. Vance", meta: "Concept · Remote · ★ 4.8", tag: "Available" },
];

function NetworkPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="The ArtSpace Network"
        icon={Network}
        title={<>Where artists and studios <span className="text-[var(--color-accent)]">find each other</span>.</>}
        description="Two sides of the same room. Browse open roles on the Jobs board, or post a brief and commission vetted artists from the Hiring page."
      />

      {/* Network hero image */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-10">
        <div className="card-surface overflow-hidden relative aspect-[21/9] group">
          <img src={heroNetwork} alt="ArtSpace network — artists and studios collaborating" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white max-w-md">
            <div className="text-[11px] uppercase tracking-widest opacity-80">Inside the Network</div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold">48,000 artists, 1,200 studios, one room.</h3>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/jobs" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-10 w-10 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Briefcase className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-lg font-semibold">Jobs</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              For artists. Apply to open roles at the studios you admire — concept, 3D, illustration, animation and more.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Browse jobs <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link to="/hire" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-10 w-10 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <UserPlus className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-lg font-semibold">Hiring</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              For studios and clients. Post a brief, get matched with vetted artists and studios in under 48 hours.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Post a brief <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      <div id="jobs">
        <HorizontalRail title="Featured Jobs" subtitle="Hand-picked roles from the studios hiring this week." items={HIGHLIGHT_JOBS} />
      </div>

      <div id="hire">
        <HorizontalRail title="Available Artists" subtitle="Vetted talent ready to start." items={HIGHLIGHT_ARTISTS} />
      </div>

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/jobs" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Palette className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Looking for work?</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">See every open role, save favourites and apply in one click.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Go to Jobs <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link to="/hire" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Hiring instead?</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Post a brief and reach 48,000+ artists this month.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Go to Hiring <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
