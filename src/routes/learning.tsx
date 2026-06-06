import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GraduationCap,
  School as SchoolIcon,
  PlayCircle,
  Users,
  Sparkles,
  ArrowRight,
  Brush,
  Camera as CameraIcon,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import heroLearning from "@/assets/hero-learning.jpg";
import learnSchool from "@/assets/learn-school.jpg";

export const Route = createFileRoute("/learning")({
  head: () => ({
    meta: [
      { title: "Learning — ArtSpace" },
      { name: "description", content: "Learn on ArtSpace — self-paced online courses in digital art, or in-person schools and training centres for painting, drawing, sculpture and photography." },
      { property: "og:title", content: "Learning — ArtSpace" },
      { property: "og:description", content: "Online courses and in-person schools — pick the way you want to learn." },
      { property: "og:image", content: heroLearning },
    ],
  }),
  component: LearningHub,
});

function LearningHub() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="ArtSpace Learning"
        icon={GraduationCap}
        title={<>Two ways to <span className="text-[var(--color-accent)]">grow your craft</span>.</>}
        description="Self-paced online courses taught by working digital artists, or in-person schools and training centres where you can paint, draw, sculpt and shoot under a mentor's eye."
      />

      {/* Two-card hub */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12 grid lg:grid-cols-2 gap-6">
        <Link
          to="/learn"
          className="card-surface overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300 flex flex-col animate-fade-up"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={heroLearning}
              alt="Online digital art course"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-4 left-4 badge bg-[var(--color-surface)]/85 backdrop-blur-md border" style={{ borderColor: "var(--color-border)" }}>
              Online
            </span>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest opacity-90">
                <PlayCircle className="h-3.5 w-3.5" /> Self-paced
              </div>
              <h2 className="mt-1 text-2xl font-semibold drop-shadow">Online Courses</h2>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-3">
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Cartoon & anime character design, game characters and the professional digital tools that ship them — Photoshop, Procreate, Blender, ZBrush and more.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Cartoon", "Anime", "Game Characters", "Photoshop", "Blender"].map((t) => (
                <span key={t} className="badge border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>{t}</span>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Browse online courses <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>

        <Link
          to="/schools"
          className="card-surface overflow-hidden group hover:border-[var(--color-accent)] transition-all duration-300 flex flex-col animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={learnSchool}
              alt="Art school studio"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-4 left-4 badge bg-[var(--color-surface)]/85 backdrop-blur-md border" style={{ borderColor: "var(--color-border)" }}>
              In Person
            </span>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest opacity-90">
                <SchoolIcon className="h-3.5 w-3.5" /> Hands-on
              </div>
              <h2 className="mt-1 text-2xl font-semibold drop-shadow">Schools & Training</h2>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-3">
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Ateliers, art academies and training centres for skills that need a room and a mentor — painting, life drawing, sculpture, ceramics and photography.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Painting", "Drawing", "Sculpture", "Photography", "Residencies"].map((t) => (
                <span key={t} className="badge border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>{t}</span>
              ))}
            </div>
            <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
              Find a school near you <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: PlayCircle, k: "320+", v: "Online courses" },
            { icon: Users, k: "65k", v: "Learners this month" },
            { icon: Sparkles, k: "140+", v: "Schools & ateliers" },
          ].map((s, i) => (
            <div
              key={s.v}
              className="card-surface p-5 flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
                <s.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </span>
              <div>
                <div className="text-xl font-semibold">{s.k}</div>
                <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pathways */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">Popular pathways</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">A starting point if you're not sure where to begin.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Brush, title: "Digital Painter", desc: "Photoshop or Procreate from blank canvas to finished piece.", to: "/learn" },
            { icon: Sparkles, title: "Character Designer", desc: "Anime, cartoon and game characters end-to-end.", to: "/learn" },
            { icon: SchoolIcon, title: "Studio Painter", desc: "Oil and acrylic in an in-person atelier.", to: "/schools" },
            { icon: CameraIcon, title: "Photographer", desc: "Camera fundamentals, studio lighting and editing.", to: "/schools" },
          ].map((p, i) => (
            <Link
              key={p.title}
              to={p.to}
              className="card-surface p-5 group hover:border-[var(--color-accent)] transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="h-9 w-9 rounded-lg grid place-items-center mb-3" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
                <p.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </span>
              <h3 className="text-sm font-semibold">{p.title}</h3>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)] leading-relaxed">{p.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] group-hover:gap-2 transition-all">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
