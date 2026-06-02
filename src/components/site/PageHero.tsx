import type { LucideIcon } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  cta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  icon?: LucideIcon;
  cta?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 pt-12 lg:pt-16 pb-10 lg:pb-14 animate-fade-up">
        <div
          className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border"
          style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]" />}
          <span className="text-[var(--color-muted-foreground)]">{eyebrow}</span>
        </div>

        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          {title}
        </h1>

        <p className="mt-5 text-[15px] lg:text-base text-[var(--color-muted-foreground)] max-w-2xl leading-relaxed">
          {description}
        </p>

        {cta && (
          <div className="mt-6">
            {cta.onClick ? (
              <button onClick={cta.onClick} className="btn btn-cta px-5 py-2.5 text-sm">
                {cta.label}
              </button>
            ) : (
              <a href={cta.href ?? "#"} className="btn btn-cta px-5 py-2.5 text-sm">
                {cta.label}
              </a>
            )}
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 60%)" }}
      />
    </section>
  );
}
