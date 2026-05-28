import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles, Briefcase, Palette, Building2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import heroImg from "@/assets/hero-showcase.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 pt-10 lg:pt-16 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span className="text-[var(--color-muted-foreground)]">New on ArtSpace — Studio listings 2026</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              Hire the <span className="text-[var(--color-accent)]">Top Studios</span>
              <br /> behind the work you love.
            </h1>

            <p className="mt-5 text-[15px] lg:text-base text-[var(--color-muted-foreground)] max-w-xl leading-relaxed">
              Find qualified outsource studios, full-time artists and dedicated teams for your next
              production — concept art, 3D, animation, illustration and post.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="btn btn-cta px-5 py-2.5 text-sm">
                Hire a studio <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn btn-ghost px-5 py-2.5 text-sm">List your studio</button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "1.2K+", v: "Studios" },
                { k: "48K", v: "Artists" },
                { k: "6.3K", v: "Open jobs" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-semibold">{s.k}</div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-6 animate-fade-up delay-200">
            <div
              className="relative rounded-xl overflow-hidden border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <img
                src={heroImg}
                alt="Featured concept artwork showcase"
                width={1280}
                height={1280}
                className="w-full h-[420px] lg:h-[520px] object-cover"
              />
              {/* play overlay */}
              <button
                aria-label="Play showcase reel"
                className="absolute inset-0 grid place-items-center group"
              >
                <span className="h-14 w-14 rounded-full grid place-items-center bg-white/15 backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-white fill-white" />
                </span>
              </button>
              {/* attribution badge */}
              <div className="absolute left-4 bottom-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15">
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500" />
                <span className="text-xs text-white/90">Artwork by <span className="font-medium">Jorce Disingana</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* subtle accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
        />
      </section>

      {/* QUICK ACCESS CARDS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Palette, title: "Explore the Gallery", desc: "Hand-picked work from artists worldwide.", cta: "Browse gallery" },
            { icon: Briefcase, title: "Find a Job", desc: "Roles at the studios you admire.", cta: "View listings" },
            { icon: Building2, title: "Hire a Studio", desc: "Vetted teams ready for production.", cta: "Post a brief" },
          ].map((c, i) => (
            <div
              key={c.title}
              className="card-surface p-5 group hover:border-[var(--color-accent)] transition-colors animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
                <c.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{c.desc}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
                {c.cta} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: "var(--color-border)" }}>
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted-foreground)]">
          <div>© {new Date().getFullYear()} ArtSpace. A community for artists, studios & collectors.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[var(--color-foreground)]">Terms</a>
            <a href="#" className="hover:text-[var(--color-foreground)]">Privacy</a>
            <a href="#" className="hover:text-[var(--color-foreground)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
