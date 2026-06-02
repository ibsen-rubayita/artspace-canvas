import { useEffect, useState } from "react";

type Slide = { src: string; title?: string };

export function HeroMontage({ slides, interval = 3500 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="relative rounded-xl overflow-hidden border h-[420px] lg:h-[520px]" style={{ borderColor: "var(--color-border)" }}>
      {slides.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt={s.title ?? ""}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out will-change-transform"
          style={{
            opacity: i === idx ? 1 : 0,
            animation: i === idx ? "kenburns 6s ease-in-out both" : undefined,
          }}
        />
      ))}


      {/* progress bars */}
      <div className="absolute top-3 left-3 right-3 flex gap-1">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className="h-0.5 flex-1 rounded-full bg-white/25 overflow-hidden"
          >
            <span
              className="block h-full bg-white"
              style={{ width: i === idx ? "100%" : i > idx ? "100%" : "0%", transition: i === idx ? `width ${interval}ms linear` : "none" }}
            />
          </span>
        ))}
      </div>

      <div className="absolute left-4 bottom-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15">
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500" />
        <span className="text-xs text-white/90">Featured · <span className="font-medium">Highlights from the community</span></span>
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.02) translate(0,0); }
          100% { transform: scale(1.12) translate(-1%, -1%); }
        }
      `}</style>
    </div>
  );
}
