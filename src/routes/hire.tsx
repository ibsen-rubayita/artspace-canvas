import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, Building2, Palette, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

import hireArtist from "@/assets/hire-artist.jpg";
import hireStudio from "@/assets/hire-studio.jpg";
import jobsTeam from "@/assets/jobs-team.jpg";
import learnStudio from "@/assets/learn-studio.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire — ArtSpace" },
      { name: "description", content: "Post a brief and hire vetted artists and studios for your next production." },
      { property: "og:title", content: "Hire — ArtSpace" },
      { property: "og:description", content: "Post a brief and hire vetted artists and studios for your next production." },
    ],
  }),
  component: HirePage,
});

const ARTISTS: RailItem[] = [
  { img: hireArtist, title: "Lena Costa", meta: "Concept · Lisbon · ★ 4.9", tag: "Available" },
  { img: art7, title: "J. Disingana", meta: "Illustration · Remote · ★ 5.0", tag: "Available" },
  { img: art8, title: "Anders Petrov", meta: "Portrait · Oslo · ★ 4.8", tag: "Booking Q3" },
  { img: art5, title: "K. Mori", meta: "3D · Tokyo · ★ 4.9", tag: "Available" },
  { img: art6, title: "Hana Sato", meta: "Watercolor · Kyoto · ★ 5.0", tag: "Available" },
  { img: gFigure, title: "Lucía Marin", meta: "Painting · Madrid · ★ 4.7", tag: "Booking Q4" },
  { img: gDoorway, title: "Maria Costa", meta: "Photo · Lisbon · ★ 4.9", tag: "Available" },
  { img: art2, title: "S. Vance", meta: "Concept · Remote · ★ 4.8", tag: "Available" },
];

const STUDIOS: RailItem[] = [
  { img: hireStudio, title: "Lighthouse Studios", meta: "Games · 40 artists · ★ 4.9", tag: "Vetted" },
  { img: jobsTeam, title: "Foundry Animation", meta: "TV · 65 artists · ★ 4.8", tag: "Vetted" },
  { img: learnStudio, title: "Northlight VFX", meta: "Film · 80 artists · ★ 4.9", tag: "Vetted" },
  { img: art5, title: "Atelier Mech", meta: "3D · 22 artists · ★ 4.7", tag: "Vetted" },
  { img: art2, title: "Quietworld", meta: "Concept · 12 artists · ★ 5.0", tag: "Vetted" },
  { img: gBronze, title: "Casa Bronze", meta: "Sculpture · 9 artists · ★ 4.9", tag: "Vetted" },
];

function HirePage() {
  const requireAuth = useRequireAuth();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", discipline: "Concept Art", budget: "", deadline: "", message: "" });
  const [busy, setBusy] = useState(false);

  const submit = () => requireAuth(async () => {
    if (!form.title.trim() || !form.message.trim()) return toast.error("Please fill in title and description.");
    setBusy(true);
    const { error } = await supabase.from("submissions").insert({
      kind: "hire_brief",
      name: user?.user_metadata?.first_name ?? user?.email ?? null,
      email: user?.email ?? null,
      subject: `Hire brief: ${form.title}`,
      message: form.message,
      payload: { ...form, recipient: "ibsenrubayita@gmail.com" },
      user_id: user?.id ?? null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    fetch("/api/public/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "hire_brief",
        name: user?.user_metadata?.first_name ?? user?.email ?? undefined,
        email: user?.email ?? undefined,
        subject: `Hire brief: ${form.title}`,
        message: form.message,
        meta: { ...form },
      }),
    }).catch(() => {});
    toast.success("Brief submitted — we'll be in touch within 48h.");
    setForm({ title: "", discipline: "Concept Art", budget: "", deadline: "", message: "" });
  }, "post a brief");

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Hire on ArtSpace"
        icon={UserPlus}
        title={<>Celebrate the craft — <span className="text-[var(--color-accent)]">commission the artists</span> who move you.</>}
        description="Art appreciation begins with the makers. Post a brief, get matched with vetted artists and studios in under 48 hours, and bring your vision to life."
        cta={{
          label: "Post a brief",
          onClick: () => requireAuth(() => {
            document.getElementById("post")?.scrollIntoView({ behavior: "smooth" });
          }, "post a brief"),
        }}
      />

      {/* How it works */}
      <section id="post" className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: "01", t: "Post a brief", d: "Scope, budget, references — five minutes." },
            { n: "02", t: "Get matched", d: "Three vetted shortlists, hand-picked." },
            { n: "03", t: "Hire & ship", d: "Built-in contracts, milestones, payouts." },
          ].map((s, i) => (
            <div
              key={s.n}
              className="card-surface p-5 animate-fade-up"
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              <div className="text-xs text-[var(--color-muted-foreground)] tracking-widest">{s.n}</div>
              <h3 className="mt-2 text-base font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post a brief form */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="card-surface p-6 lg:p-8 grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Tell us about the project</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">We'll review and send shortlists in 24–48h.</p>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10 rounded-lg border px-3 text-sm bg-[var(--color-background)]" placeholder="Project title" style={{ borderColor: "var(--color-border)" }} />
              <select value={form.discipline} onChange={(e) => setForm({ ...form, discipline: e.target.value })} className="h-10 rounded-lg border px-3 text-sm bg-[var(--color-background)]" style={{ borderColor: "var(--color-border)" }}>
                <option>Concept Art</option>
                <option>3D / Animation</option>
                <option>Illustration</option>
                <option>Photography</option>
                <option>Sculpture</option>
              </select>
              <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="h-10 rounded-lg border px-3 text-sm bg-[var(--color-background)]" placeholder="Budget (USD)" style={{ borderColor: "var(--color-border)" }} />
              <input value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="h-10 rounded-lg border px-3 text-sm bg-[var(--color-background)]" placeholder="Deadline" style={{ borderColor: "var(--color-border)" }} />
            </div>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Describe the brief, references and deliverables…"
              className="mt-3 w-full rounded-lg border p-3 text-sm bg-[var(--color-background)]"
              style={{ borderColor: "var(--color-border)" }}
            />
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={submit} disabled={busy} className="btn btn-cta px-5 py-2.5 text-sm">
                {busy ? "Submitting..." : "Submit brief"} <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn btn-ghost px-5 py-2.5 text-sm">Save draft</button>
            </div>
          </div>

          <aside className="rounded-lg border p-5 bg-[var(--color-surface-2)]" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 text-[var(--color-accent)]" /> Why ArtSpace
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted-foreground)]">
              <li>· Vetted artists & studios only</li>
              <li>· Built-in contracts and milestones</li>
              <li>· Escrow payments, refunds protected</li>
              <li>· Dedicated production support</li>
            </ul>
          </aside>
        </div>
      </section>

      <div id="artists">
        <HorizontalRail title="Find an Artist" subtitle="Independent talent, ready to start." items={ARTISTS} />
      </div>

      <div id="studios">
        <HorizontalRail title="Find a Studio" subtitle="Teams that ship at scale." items={STUDIOS} />
      </div>

      {/* Twin CTAs */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-4">
          <a href="#artists" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Palette className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Find an Artist</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Browse 48k+ portfolios across every medium.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Open <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
          <a href="#studios" className="card-surface p-6 group hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Find a Studio</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">1.2k+ vetted studios ready for production.</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Open <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
