import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye } from "lucide-react";

export type RailItem = {
  img: string;
  title: string;
  artist?: string;
  meta?: string;
  tag?: string;
  likes?: string;
  views?: string;
};

export function HorizontalRail({
  title,
  subtitle,
  items,
  step = 660,
}: {
  title: string;
  subtitle?: string;
  items: RailItem[];
  /** Pixels to scroll per chevron click. */
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="btn btn-ghost h-9 w-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="btn btn-ghost h-9 w-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="rail flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 lg:-mx-6 lg:px-6 snap-x snap-mandatory scroll-smooth"
      >
        {items.map((a, i) => (
          <article key={`${title}-${i}`} className="rail-card group snap-start shrink-0">
            <div className="rail-card-media">
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
              />
              {a.tag && (
                <span className="absolute top-3 left-3 badge bg-[var(--color-surface)]/85 backdrop-blur-md text-[var(--color-foreground)] border border-[var(--color-border)]">
                  {a.tag}
                </span>
              )}
              {(a.likes || a.views) && (
                <div className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-3 text-[11px] text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/70 to-transparent">
                  {a.likes && (
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {a.likes}
                    </span>
                  )}
                  {a.views && (
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {a.views}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="px-1 pt-3 pb-1">
              <h3 className="text-sm font-semibold truncate">{a.title}</h3>
              {(a.artist || a.meta) && (
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5 truncate">
                  {a.artist ? `by ${a.artist}` : a.meta}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
