"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing React state from localStorage/matchMedia on mount is the standard theme-init pattern
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    setMounted(true);
  }, []);

  const applyTheme = (dark: boolean) => {
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-full shadow-md border border-slate-200 dark:border-gray-700 flex items-center px-1 py-1 gap-1 transition-opacity",
        !mounted && "opacity-0"
      )}
      aria-hidden={!mounted}
    >
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={!isDark}
        onClick={() => applyTheme(false)}
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors",
          !isDark ? "text-orange-600" : "text-slate-400 dark:text-slate-500"
        )}
      >
        {!isDark && <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />}
        <Sun size={16} />
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={isDark}
        onClick={() => applyTheme(true)}
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium transition-colors",
          isDark ? "text-orange-600" : "text-slate-400 dark:text-slate-500"
        )}
      >
        <Moon size={16} />
        {isDark && <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />}
      </button>
    </div>
  );
}
