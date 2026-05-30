import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 left-6 z-50 h-11 w-11 rounded-full grid place-items-center",
        "border bg-[var(--color-surface)] text-[var(--color-foreground)]",
        "shadow-lg shadow-black/20 hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
      style={{ borderColor: "var(--color-border)" }}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
