import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, ImageIcon, Compass, Hash } from "lucide-react";
import { ARTWORKS, PAGES, type Artwork } from "@/data/catalog";

const ARTISTS = Array.from(new Set(ARTWORKS.map((a) => a.artist))).map((name) => ({ name }));

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return { artworks: [] as Artwork[], artists: [] as { name: string }[], pages: PAGES };
    return {
      artworks: ARTWORKS.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.artist.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term) ||
          a.city.toLowerCase().includes(term),
      ).slice(0, 8),
      artists: ARTISTS.filter((x) => x.name.toLowerCase().includes(term)).slice(0, 6),
      pages: PAGES.filter((p) => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)),
    };
  }, [term]);

  if (!open) return null;

  const total = results.artworks.length + results.artists.length + results.pages.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl card-surface shadow-2xl overflow-hidden" style={{ borderRadius: 14 }}>
        <div className="flex items-center gap-3 px-4 h-14 border-b" style={{ borderColor: "var(--color-border)" }}>
          <Search className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search artworks, artists, pages..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--color-muted-foreground)]"
          />
          <button onClick={onClose} className="h-7 w-7 grid place-items-center rounded-md hover:bg-[var(--color-surface-2)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {term && total === 0 && (
            <div className="text-sm text-[var(--color-muted-foreground)] px-4 py-10 text-center">
              No results for "{q}"
            </div>
          )}

          {results.pages.length > 0 && (
            <Group label="Pages" icon={<Compass className="h-3.5 w-3.5" />}>
              {results.pages.map((p) => (
                <Link
                  key={p.to}
                  to={p.to}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-[var(--color-surface-2)]"
                >
                  <div>
                    <div className="text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)]">{p.desc}</div>
                  </div>
                  <span className="text-xs text-[var(--color-muted-foreground)]">{p.to}</span>
                </Link>
              ))}
            </Group>
          )}

          {results.artists.length > 0 && (
            <Group label="Artists" icon={<Hash className="h-3.5 w-3.5" />}>
              {results.artists.map((a) => (
                <button
                  key={a.name}
                  onClick={() => { navigate({ to: "/gallery" }); onClose(); }}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--color-surface-2)]"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-500" />
                  <span className="text-sm">{a.name}</span>
                </button>
              ))}
            </Group>
          )}

          {results.artworks.length > 0 && (
            <Group label="Artworks" icon={<ImageIcon className="h-3.5 w-3.5" />}>
              {results.artworks.map((a) => (
                <button
                  key={a.id}
                  onClick={() => { navigate({ to: "/gallery" }); onClose(); }}
                  className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--color-surface-2)]"
                >
                  <img src={a.image} alt="" className="h-10 w-10 rounded-md object-cover border" style={{ borderColor: "var(--color-border)" }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{a.title}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)] truncate">{a.artist} · {a.category}</div>
                  </div>
                  <div className="text-xs text-[var(--color-muted-foreground)]">{a.price}</div>
                </button>
              ))}
            </Group>
          )}
        </div>

        <div className="border-t px-4 py-2 text-[11px] text-[var(--color-muted-foreground)] flex items-center justify-between" style={{ borderColor: "var(--color-border)" }}>
          <span>Search across the entire website</span>
          <kbd className="px-1.5 py-0.5 rounded border text-[10px]" style={{ borderColor: "var(--color-border)" }}>Esc</kbd>
        </div>
      </div>
    </div>
  );
}

function Group({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="px-1 py-2">
      <div className="flex items-center gap-1.5 px-3 mb-1 text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
        {icon}{label}
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
