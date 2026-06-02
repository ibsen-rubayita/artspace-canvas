import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Trophy, School, PlayCircle, Clock, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { toast } from "sonner";

import learnStudio from "@/assets/learn-studio.jpg";
import learnCourse from "@/assets/learn-course.jpg";
import learnSchool from "@/assets/learn-school.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — ArtSpace" },
      { name: "description", content: "Courses, challenges, and schools for artists at every level." },
      { property: "og:title", content: "Learn — ArtSpace" },
      { property: "og:description", content: "Courses, challenges, and schools for artists at every level." },
    ],
  }),
  component: LearnPage,
});

const COURSES: RailItem[] = [
  { img: learnCourse, title: "Digital Painting · Fundamentals", meta: "12 lessons · 4h 20m", tag: "Beginner" },
  { img: art2, title: "Worldbuilding for Concept Artists", meta: "9 lessons · 6h 10m", tag: "Intermediate" },
  { img: art5, title: "Hard-Surface Sculpting in ZBrush", meta: "14 lessons · 8h", tag: "Advanced" },
  { img: art6, title: "Botanical Watercolor", meta: "8 lessons · 3h", tag: "Beginner" },
  { img: art7, title: "Editorial Illustration", meta: "10 lessons · 5h", tag: "Intermediate" },
  { img: art8, title: "Classical Oil Portrait", meta: "16 lessons · 11h", tag: "Advanced" },
];

const CHALLENGES: RailItem[] = [
  { img: gDoorway, title: "Doorways · 30 photos in 30 days", meta: "Ends in 12 days", tag: "Photo" },
  { img: art6, title: "One Leaf a Day", meta: "Open · weekly prizes", tag: "Sketch" },
  { img: art5, title: "Robot of the Week", meta: "Round 7 live", tag: "3D" },
  { img: art2, title: "Skies of Another World", meta: "Ends in 4 days", tag: "Concept" },
  { img: art7, title: "Pop Portraits", meta: "Voting open", tag: "Illustration" },
  { img: gBronze, title: "Cast in Bronze", meta: "Submissions open", tag: "Sculpture" },
];

const SCHOOLS: RailItem[] = [
  { img: learnSchool, title: "Atelier Lumen", meta: "Paris · Classical + Digital", tag: "School" },
  { img: learnStudio, title: "Northlight Academy", meta: "Stockholm · Illustration", tag: "School" },
  { img: art5, title: "Studio Foundry", meta: "Berlin · 3D + Animation", tag: "Training" },
  { img: gBronze, title: "Casa Bronze", meta: "Lisbon · Sculpture", tag: "Workshop" },
  { img: art8, title: "The Painters' Hall", meta: "London · Oil & Figure", tag: "School" },
  { img: art6, title: "Hana Atelier", meta: "Kyoto · Watercolor", tag: "Workshop" },
];

function LearnPage() {
  const requireAuth = useRequireAuth();
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Learn on ArtSpace"
        icon={GraduationCap}
        title={<>Build your craft, <span className="text-[var(--color-accent)]">one lesson</span> at a time.</>}
        description="Self-paced courses taught by working artists, monthly challenges that sharpen your eye, and a directory of schools and training centers worldwide."
        cta={{
          label: "Start a free lesson",
          onClick: () => requireAuth(() => {
            toast.success("Lesson unlocked — heading to your first class.");
            document.getElementById("learning")?.scrollIntoView({ behavior: "smooth" });
          }, "start a lesson"),
        }}
      />

      {/* Feature row */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { icon: PlayCircle, k: "240+", v: "Courses across mediums" },
            { icon: Trophy, k: "12", v: "Live monthly challenges" },
            { icon: School, k: "180", v: "Partner schools & studios" },
          ].map((s) => (
            <div key={s.v} className="card-surface p-5 flex items-center gap-4">
              <span
                className="h-10 w-10 rounded-lg grid place-items-center"
                style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}
              >
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

      <div id="learning">
        <HorizontalRail title="Featured Courses" subtitle="Taught by working professionals." items={COURSES} />
      </div>

      {/* Spotlight */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div
          className="card-surface overflow-hidden grid md:grid-cols-2"
        >
          <img src={learnStudio} alt="Inside a learning studio" loading="lazy" className="h-64 md:h-full w-full object-cover" />
          <div className="p-6 lg:p-8 flex flex-col justify-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted-foreground)]">Spotlight</span>
            <h3 className="text-2xl font-semibold tracking-tight">A studio of your own.</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Every Learning subscription includes a private workspace, peer reviews, and live office hours with mentors.
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

      <div id="challenges">
        <HorizontalRail title="Open Challenges" subtitle="Weekly prompts judged by guest artists." items={CHALLENGES} />
      </div>

      <div id="schools">
        <HorizontalRail title="Schools & Training Centers" subtitle="Find a program near you." items={SCHOOLS} />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
