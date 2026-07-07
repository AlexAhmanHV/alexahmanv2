"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether a ref'd element is currently intersecting the viewport
 * (threshold configurable, defaults to 0.5) and re-triggers each time the
 * element enters/leaves — used to replay scroll-driven entrance animations
 * whenever a snapped section becomes active again.
 */
export function useInView<T extends HTMLElement>(threshold = 0.5) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
}
