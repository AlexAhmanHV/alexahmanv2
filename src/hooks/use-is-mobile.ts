"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Detects whether the viewport is below the mobile breakpoint (768px),
 * matching shadcn's standard `useIsMobile` convention. Relies on JS
 * (matchMedia + resize) rather than a CSS media query, since the header's
 * mobile drawer swap is controlled entirely in JS.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    onChange();

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
