import { useEffect, useState, type RefObject } from "react";

/**
 * Lightweight, zero-dependency viewport visibility hook using native IntersectionObserver.
 * Replaces framer-motion's useInView (~122 kB saved).
 */
export function useInView(
  ref: RefObject<Element | null>,
  options?: { once?: boolean; margin?: string }
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once !== false) {
            observer.unobserve(el);
          }
        } else if (options?.once === false) {
          setInView(false);
        }
      },
      { rootMargin: options?.margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.margin]);

  return inView;
}

/**
 * Hook to detect prefers-reduced-motion preference using native matchMedia.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return reducedMotion;
}
