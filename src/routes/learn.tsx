import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, PlayCircle, Clock, Users, Sparkles, School } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { toast } from "sonner";

import learnStudio from "@/assets/learn-studio.jpg";
import learnCourse from "@/assets/learn-course.jpg";
import heroLearning from "@/assets/hero-learning.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import art11 from "@/assets/art-11.jpg";
import art12 from "@/assets/art-12.jpg";
import art17 from "@/assets/art-17.jpg";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Courses — ArtSpace" },
      { name: "description", content: "Online courses by working digital artists — cartoon, anime, game character design and the professional tools that ship them: Photoshop, Procreate, Blender, ZBrush and more." },
      { property: "og:title", content: "Courses — ArtSpace" },
      { property: "og:description", content: "Online courses on digital art — cartoon, anime, game characters and pro tools." },
    ],
  }),
  component: CoursesPage,
});

const CARTOON: RailItem[] = [
  { img: learnCourse, title: "Cartoon Character Design · Fundamentals", meta: "By M. Reyes · 14 lessons · 5h 10m", tag: "Beginner" },
  { img: art7, title: "Expressive Faces for Cartoons", meta: "By J. Disingana · 9 lessons · 3h 40m", tag: "Beginner" },
  { img: art11, title: "Stylised Linework in Procreate", meta: "By Y. Tanaka · 11 lessons · 4h", tag: "Intermediate" },
  { img: art12, title: "Cartoon Color Theory", meta: "By S. Vance · 8 lessons · 2h 50m", tag: "Beginner" },
];

const ANIME: RailItem[] = [
  { img: art11, title: "Anime Character Design · Foundations", meta: "By Y. Tanaka · 16 lessons · 6h 20m", tag: "Beginner" },
  { img: art17, title: "Anime Portraits in Clip Studio Paint", meta: "By S. Petrova · 12 lessons · 5h", tag: "Intermediate" },
  { img: art12, title: "Dynamic Anime Poses & Anatomy", meta: "By K. Mori · 10 lessons · 4h 30m", tag: "Intermediate" },
  { img: art2, title: "Shading & Cel Lighting", meta: "By Studio North · 9 lessons · 3h 20m", tag: "Intermediate" },
];

const GAME: RailItem[] = [
  { img: art5, title: "Game Character Design · Concept to Sheet", meta: "By Atelier Mech · 18 lessons · 8h 30m", tag: "Advanced" },
  { img: art12, title: "Stylised 3D Characters in Blender", meta: "By K. Mori · 22 lessons · 11h", tag: "Advanced" },
  { img: art5, title: "Hard-Surface Sculpting in ZBrush", meta: "By Atelier Mech · 14 lessons · 8h", tag: "Advanced" },
  { img: art8, title: "Texturing for Games in Substance Painter", meta: "By Lighthouse Studios · 12 lessons · 6h", tag: "Intermediate" },
  { img: art17, title: "Rigging & Posing Game Characters", meta: "By Foundry Animation · 10 lessons · 5h 40m", tag: "Advanced" },
];

const TOOLS: RailItem[] = [
  { img: learnCourse, title: "Photoshop for Digital Painters", meta: "16 lessons · 7h", tag: "Photoshop" },
  { img: art11, title: "Procreate · Brushes & Workflow", meta: "12 lessons · 4h 30m", tag: "Procreate" },
  { img: art12, title: "Blender · Modelling for Artists", meta: "20 lessons · 9h", tag: "Blender" },
  { img: art5, title: "ZBrush · Sculpting Essentials", meta: "18 lessons · 8h 30m", tag: "ZBrush" },
  { img: art17, title: "Clip Studio Paint for Comics", meta: "14 lessons · 5h 40m", tag: "CSP" },
  { img: art8, title: "Substance Painter · PBR Texturing", meta: "10 lessons · 4h 20m", tag: "Substance" },
];

function CoursesPage() {
  const requireAuth = useRequireAuth();
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Online Courses"
        icon={GraduationCap}
        title={<>Learn digital art from <span className="text-[var(--color-accent)]">artists who ship</span>.</>}
        description="Self-paced online courses taught by working digital artists — cartoon and anime character design, game characters and pipelines, and the professional tools used to make them: Photoshop, Procreate, Blender, ZBrush, Clip Studio Paint and Substance Painter."
        cta={{
          label: "Start a free lesson",
          onClick: () => requireAuth(() => {
            toast.success("Lesson unlocked — heading to your first class.");
            document.getElementById("cartoon")?.scrollIntoView({ behavior: "smooth" });
          }, "start a lesson"),
        }}
      />

      {/* Courses hero image */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-10">
        <div className="card-surface overflow-hidden relative aspect-[21/9] group">
          <img src={heroLearning} alt="Online digital art class" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white max-w-md">
            <div className="text-[11px] uppercase tracking-widest opacity-80">Inside a class</div>
            <h3 className="mt-1 text-xl sm:text-2xl font-semibold">A studio, a mentor, your own pace.</h3>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { icon: PlayCircle, k: "320+", v: "Online courses across digital mediums" },
            { icon: Users, k: "65k", v: "Students learning this month" },
            { icon: Sparkles, k: "9", v: "Pro tools covered, from PS to ZBrush" },
          ].map((s) => (
            <div key={s.v} className="card-surface p-5 flex items-center gap-4">
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

      <div id="cartoon">
        <HorizontalRail title="Cartoon Character Making" subtitle="From thumbnail to finished cartoon character." items={CARTOON} />
      </div>

      <div id="anime">
        <HorizontalRail title="Anime Character Making" subtitle="Anime design, anatomy, linework and cel shading." items={ANIME} />
      </div>

      <div id="game">
        <HorizontalRail title="Game Character Making" subtitle="2D and 3D pipelines for production-ready characters." items={GAME} />
      </div>

      <div id="tools">
        <HorizontalRail title="Professional Digital Tools" subtitle="Master the software working artists actually use." items={TOOLS} />
      </div>

      {/* Spotlight */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="card-surface overflow-hidden grid md:grid-cols-2">
          <img src={learnStudio} alt="Inside an online studio" loading="lazy" className="h-64 md:h-full w-full object-cover" />
          <div className="p-6 lg:p-8 flex flex-col justify-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">Spotlight</span>
            <h3 className="text-2xl font-semibold tracking-tight">A studio of your own.</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Every Courses subscription includes a private online workspace, peer reviews, and live office hours with mentors.
            </p>
            <div className="flex items-center gap-5 text-xs text-[var(--color-muted-foreground)] mt-2">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Self-paced</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Cohort options</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#" className="btn btn-cta px-4 py-2 text-sm">View plans</a>
              <a href="#" className="btn btn-ghost px-4 py-2 text-sm">See syllabus</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pointer to physical schools */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <Link to="/schools" className="card-surface p-6 group flex items-center justify-between gap-4 hover:border-[var(--color-accent)] transition-colors">
          <div className="flex items-start gap-4">
            <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <School className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <div>
              <h3 className="text-base font-semibold">Looking for hands-on training?</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Browse in-person schools and workshops for painting, drawing, photography and sculpture.</p>
            </div>
          </div>
          <span className="text-sm text-[var(--color-accent)] group-hover:translate-x-1 transition-transform">Schools →</span>
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
