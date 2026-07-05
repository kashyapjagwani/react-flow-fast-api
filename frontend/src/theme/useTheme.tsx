// useTheme.tsx
// Attribute-driven theme state (light/dark) + the circular reveal animation.
//
// The active theme is stored on <html data-theme="…">, which drives every CSS token
// in index.css (and, via the `dark:` custom variant, all Tailwind `dark:` utilities).
// toggleTheme animates the switch: the incoming theme is revealed by an expanding
// clip-path circle centered on the click, so it visually radiates from the toggle
// button. Uses the View Transitions API where available; otherwise swaps instantly.

import { createContext, useContext, useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (event?: MouseEvent<HTMLElement>) => void;
}

const STORAGE_KEY = "theme";

const getSystemTheme = (): Theme =>
  window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : getSystemTheme();
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

// Apply the persisted/system theme at module load, before first paint, to avoid a
// flash of the default (light) theme.
applyTheme(getInitialTheme());

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = (event?: MouseEvent<HTMLElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    // No View Transitions support (or reduced motion / no event) -> instant swap.
    if (!document.startViewTransition || prefersReducedMotion || !event) {
      setTheme(next);
      return;
    }

    // Origin = the click point on the toggle button; radius = farthest screen corner.
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => setTheme(next));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};
