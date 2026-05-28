import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "artspace-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as Theme | null)) || null;
    const initial: Theme = saved ?? "dark";
    apply(initial);
    setTheme(initial);
  }, []);

  const apply = (t: Theme) => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    if (t === "light") root.classList.add("light");
    else root.classList.remove("light");
    window.setTimeout(() => root.classList.remove("theme-transition"), 400);
  };

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  return { theme, toggle };
}
