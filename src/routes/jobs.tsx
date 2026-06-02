import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, MapPin, Building2, Bookmark, BookOpen, Search } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

import jobsTeam from "@/assets/jobs-team.jpg";
import hireStudio from "@/assets/hire-studio.jpg";
import hireArtist from "@/assets/hire-artist.jpg";
import learnStudio from "@/assets/learn-studio.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Find a Job — ArtSpace" },
      { name: "description", content: "Open roles at the studios you admire — concept art, 3D, illustration, animation and production." },
      { property: "og:title", content: "Find a Job — ArtSpace" },
      { property: "og:description", content: "Open roles at the studios you admire — concept art, 3D, illustration, animation and production." },
    ],
  }),
  component: JobsPage,
});

type Job = {
  title: string;
  studio: string;
  location: string;
  type: "Full-time" | "Contract" | "Freelance";
  tags: string[];
  posted: string;
};

const JOBS: Job[] = [
  { title: "Senior Concept Artist", studio: "Lighthouse Studios", location: "Remote · EU", type: "Full-time", tags: ["Concept", "Games"], posted: "2d ago" },
  { title: "Junior 3D Generalist", studio: "Atelier Mech", location: "Berlin · Hybrid", type: "Full-time", tags: ["3D", "Animation"], posted: "1d ago" },
  { title: "Matte Painter", studio: "Northlight VFX", location: "London", type: "Contract", tags: ["Matte", "Film"], posted: "5h ago" },
  { title: "Editorial Illustrator", studio: "Paper Magazine", location: "Remote · Worldwide", type: "Freelance", tags: ["Editorial"], posted: "3d ago" },
  { title: "Character Designer", studio: "Foundry Animation", location: "Paris", type: "Full-time", tags: ["Character", "TV"], posted: "Just now" },
  { title: "Sculptor — Maquettes", studio: "Casa Bronze", location: "Lisbon · On-site", type: "Contract", tags: ["Sculpture"], posted: "4d ago" },
];

const STUDIOS: RailItem[] = [
  { img: hireStudio, title: "Lighthouse Studios", meta: "12 open roles · Games", tag: "Hiring" },
  { img: jobsTeam, title: "Foundry Animation", meta: "8 open roles · TV", tag: "Hiring" },
  { img: learnStudio, title: "Northlight VFX", meta: "5 open roles · Film", tag: "Hiring" },
  { img: art5, title: "Atelier Mech", meta: "9 open roles · 3D", tag: "Hiring" },
  { img: art2, title: "Quietworld", meta: "3 open roles · Concept", tag: "Hiring" },
  { img: gBronze, title: "Casa Bronze", meta: "2 open roles · Sculpture", tag: "Hiring" },
];

const SAVED: RailItem[] = [
  { img: art7, title: "Editorial Illustrator · Paper Magazine", meta: "Saved 2d ago", tag: "Saved" },
  { img: art8, title: "Portrait Painter · Atelier Lumen", meta: "Saved 4d ago", tag: "Saved" },
  { img: gDoorway, title: "Staff Photographer · Field Quarterly", meta: "Saved 1w ago", tag: "Saved" },
  { img: art5, title: "Junior 3D Generalist · Atelier Mech", meta: "Saved 1d ago", tag: "Saved" },
];

const RESOURCES: RailItem[] = [
  { img: jobsTeam, title: "Portfolio Reviews That Land Interviews", meta: "Guide · 8 min", tag: "Guide" },
  { img: hireArtist, title: "Negotiating Your First Studio Offer", meta: "Guide · 12 min", tag: "Guide" },
  { img: art2, title: "Building a Concept Art Reel in 2026", meta: "Guide · 10 min", tag: "Reel" },
  { img: learnStudio, title: "Working Remotely Across Time Zones", meta: "Guide · 6 min", tag: "Remote" },
];

function JobCard({ job }: { job: Job }) {
  const requireAuth = useRequireAuth();
  const { user } = useAuth();
  const apply = () => requireAuth(async () => {
    const { error } = await supabase.from("submissions").insert({
      kind: "job_application",
      name: user?.user_metadata?.first_name ?? user?.email ?? null,
      email: user?.email ?? null,
      subject: `Application: ${job.title} at ${job.studio}`,
      message: `${user?.email ?? "An applicant"} applied to ${job.title} at ${job.studio}.`,
      payload: { job, recipient: "ibsenrubayita@gmail.com" },
      user_id: user?.id ?? null,
    });
    if (error) return toast.error(error.message);
    fetch("/api/public/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "job_application",
        name: user?.user_metadata?.first_name ?? user?.email ?? undefined,
        email: user?.email ?? undefined,
        subject: `Application: ${job.title} at ${job.studio}`,
        message: `${user?.email ?? "An applicant"} applied to ${job.title} at ${job.studio}.`,
        meta: { job },
      }),
    }).catch(() => {});
    toast.success(`Application sent to ${job.studio}`);
  }, "apply for jobs");

  return (
    <div className="card-surface p-5 hover:border-[var(--color-accent)] transition-colors flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{job.title}</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-0.5">{job.studio}</p>
        </div>
        <span
          className="badge"
          style={{
            background:
              job.type === "Full-time"
                ? "color-mix(in oklab, var(--color-cta) 30%, transparent)"
                : job.type === "Contract"
                  ? "color-mix(in oklab, var(--color-accent) 22%, transparent)"
                  : "color-mix(in oklab, var(--color-badge-sale) 22%, transparent)",
            color: "var(--color-foreground)",
          }}
        >
          {job.type}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
        <span>·</span>
        <span>{job.posted}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-0.5 rounded-full border"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface-2)" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <button onClick={apply} className="btn btn-cta px-4 py-2 text-sm">Apply</button>
        <button className="btn btn-ghost h-9 w-9 p-0" aria-label="Save job"><Bookmark className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function JobsPage() {
  const { user } = useAuth();
  const requireAuth = useRequireAuth();
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Find a Job"
        icon={Briefcase}
        title={<>Roles at the <span className="text-[var(--color-accent)]">studios you admire</span>.</>}
        description="Curated openings across concept, 3D, animation, illustration and production. Filter by medium, location, and contract type."
      />

      {/* Search row */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-10">
        <div
          className="card-surface p-3 flex flex-col md:flex-row gap-2 md:items-center"
        >
          <div className="flex-1 flex items-center h-10 rounded-lg border px-3" style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}>
            <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            <input
              placeholder="Job title or skill"
              className="bg-transparent outline-none border-0 px-2 text-sm w-full placeholder:text-[var(--color-muted-foreground)]"
            />
          </div>
          <div className="flex items-center h-10 rounded-lg border px-3 md:w-56" style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}>
            <MapPin className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            <input
              placeholder="Location"
              className="bg-transparent outline-none border-0 px-2 text-sm w-full placeholder:text-[var(--color-muted-foreground)]"
            />
          </div>
          <button className="btn btn-cta px-5 py-2.5 text-sm md:w-auto">Search</button>
        </div>
      </section>

      {/* Job grid */}
      <section id="listings" className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">Open roles</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Updated continuously.</p>
          </div>
          <a href="#studios" className="btn btn-ghost text-sm">Browse studios</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOBS.map((j) => <JobCard key={j.title} job={j} />)}
        </div>
      </section>

      <div id="studios">
        <HorizontalRail title="Hiring Studios" subtitle="Teams actively bringing on new artists." items={STUDIOS} />
      </div>

      {user && (
        <div id="saved">
          <HorizontalRail title="Your Saved Jobs" subtitle="Pick up where you left off." items={SAVED} />
        </div>
      )}

      {/* Resources */}
      <section id="resources" className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight inline-flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--color-accent)]" /> Job Resources
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Guides written by hiring leads.</p>
          </div>
        </div>
        <HorizontalRail title="" items={RESOURCES} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="card-surface p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-start gap-4">
            <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <div>
              <h3 className="text-lg font-semibold">Hiring instead?</h3>
              <p className="text-sm text-[var(--color-muted-foreground)]">Post a role and reach 48,000+ artists this month.</p>
            </div>
          </div>
          <button
            onClick={() => requireAuth(() => { window.location.href = "/hire"; }, "post a job")}
            className="btn btn-cta px-5 py-2.5 text-sm"
          >
            Post a job
          </button>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
