import { Link } from "@tanstack/react-router";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Hexagon,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { GlobalSearch } from "@/components/site/GlobalSearch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SubLink = { label: string; to: string; hash?: string; badge?: "SALE" | "NEW" };
type NavItem = { label: string; to: string; items: SubLink[] };

const NAV: NavItem[] = [
  {
    label: "Explore",
    to: "/explore",
    items: [
      { label: "Gallery", to: "/gallery" },
      { label: "Blogs", to: "/explore", hash: "blogs" },
      { label: "Magazine", to: "/explore", hash: "magazine" },
    ],
  },
  {
    label: "Learn",
    to: "/learn",
    items: [
      { label: "Learning", to: "/learn", hash: "learning" },
      { label: "Challenges", to: "/learn", hash: "challenges" },
      { label: "Schools and Training Centers", to: "/learn", hash: "schools" },
    ],
  },
  {
    label: "Shop",
    to: "/shop",
    items: [
      { label: "Marketplace", to: "/shop", hash: "marketplace", badge: "SALE" },
      { label: "Prints", to: "/shop", hash: "prints", badge: "NEW" },
    ],
  },
  {
    label: "Find a Job",
    to: "/jobs",
    items: [
      { label: "Job Listings", to: "/jobs", hash: "listings" },
      { label: "Hiring Studios", to: "/jobs", hash: "studios" },
      { label: "Saved Jobs", to: "/jobs", hash: "saved" },
      { label: "Job Resources", to: "/jobs", hash: "resources" },
    ],
  },
  {
    label: "Hire",
    to: "/hire",
    items: [
      { label: "Post a Job", to: "/hire", hash: "post" },
      { label: "Find an Artist", to: "/hire", hash: "artists" },
      { label: "Find a Studio", to: "/hire", hash: "studios" },
    ],
  },
];

const SEARCH_FILTERS = [
  "Search Artworks",
  "Search Artists",
  "Search Studios",
  "Search Digital Products",
  "Search Prints",
  "Search Jobs",
];

const RECENT = ["concept art studios", "matte painting", "junior 3d artist", "sci-fi prints"];

function Badge({ kind }: { kind: "SALE" | "NEW" }) {
  return (
    <span
      className="badge ml-2"
      style={{
        background: kind === "SALE" ? "var(--color-badge-sale)" : "var(--color-badge-new)",
        color: "#fff",
      }}
    >
      {kind}
    </span>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 select-none"
      aria-label="ArtSpace — home"
    >
      <span
        className="grid place-items-center h-8 w-8 rounded-lg"
        style={{ background: "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 60%, #000))" }}
      >
        <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">ArtSpace</span>
    </Link>
  );
}

function SubItem({ s, onClick }: { s: SubLink; onClick?: () => void }) {
  return (
    <Link
      to={s.to}
      hash={s.hash}
      onClick={onClick}
      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-[var(--color-surface-2)] transition-colors"
    >
      <span>{s.label}</span>
      {s.badge && <Badge kind={s.badge} />}
    </Link>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const onEnter = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const onLeave = () => {
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        to={item.to}
        className="nav-link inline-flex items-center gap-1 text-sm px-2 py-2"
        data-open={open}
        activeProps={{ className: "nav-link inline-flex items-center gap-1 text-sm px-2 py-2 !text-[var(--color-accent)] !opacity-100" }}
      >
        {item.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </Link>
      {open && (
        <div className="dropdown-panel animate-dropdown absolute left-0 top-full mt-2 min-w-[240px] py-2 z-50">
          {item.items.map((s) => <SubItem key={s.label} s={s} />)}
        </div>
      )}
    </div>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="relative w-full max-w-[340px] flex items-center h-9 rounded-lg border px-3 bg-[var(--color-surface)] text-left hover:border-[var(--color-accent)] transition-colors"
      style={{ borderColor: "var(--color-border)" }}
      aria-label="Open search"
    >
      <Search className="h-4 w-4 text-[var(--color-muted-foreground)] shrink-0" />
      <span className="px-2 text-sm text-[var(--color-muted-foreground)] flex-1">Search ArtSpace</span>
      <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--color-border)" }}>⌘K</kbd>
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-9 w-9 grid place-items-center rounded-lg border hover:bg-[var(--color-surface)] transition-colors"
      style={{ borderColor: "var(--color-border)" }}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <aside
        className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-[var(--color-background)] border-r animate-drawer flex flex-col"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b" style={{ borderColor: "var(--color-border)" }}>
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="h-9 w-9 grid place-items-center rounded-lg hover:bg-[var(--color-surface)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4">
          <SearchBar />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 pb-4">
          {NAV.map((item) => {
            const isOpen = openItem === item.label;
            return (
              <div key={item.label} className="border-b last:border-b-0" style={{ borderColor: "var(--color-border)" }}>
                <div className="w-full flex items-center justify-between pr-2">
                  <Link to={item.to} onClick={onClose} className="flex-1 px-3 py-3 text-sm font-medium">
                    {item.label}
                  </Link>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : item.label)}
                    aria-label="Toggle submenu"
                    className="h-9 w-9 grid place-items-center"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                  </button>
                </div>
                {isOpen && (
                  <div className="pb-2 pl-3">
                    {item.items.map((s) => <SubItem key={s.label} s={s} onClick={onClose} />)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: "var(--color-border)" }}>
          <button className="btn btn-ghost w-full">Sign in</button>
          <button className="btn btn-cta w-full">Sign up</button>
        </div>
      </aside>
    </div>
  );
}

export function Header() {
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-colors",
        scrolled ? "bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)]" : "bg-[var(--color-background)]"
      )}
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-14 flex items-center gap-4">
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="lg:hidden h-9 w-9 grid place-items-center rounded-lg hover:bg-[var(--color-surface)] -ml-1"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex-1 flex justify-center lg:hidden">
          <Logo />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <Logo />
          <nav className="flex items-center gap-1">
            {NAV.map((item) => <NavDropdown key={item.label} item={item} />)}
          </nav>
        </div>

        <div className="hidden lg:block flex-1" />

        <div className="hidden lg:flex items-center gap-3">
          <SearchBar />
          <button className="btn btn-ghost">Sign in</button>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button className="btn btn-ghost h-9 px-3 text-xs">Sign in</button>
          <ThemeToggle />
        </div>
      </div>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}
