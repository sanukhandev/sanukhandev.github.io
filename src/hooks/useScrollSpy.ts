import { useEffect, useState } from "react";

export interface SectionThreshold {
  id: string;
  href: string;
}

interface UseScrollSpyOptions {
  isHomePage: boolean;
  pathname: string;
  thresholds: SectionThreshold[];
  targetOffset?: number;
}

/**
 * useScrollSpy — Hook following Single Responsibility Principle (SRP).
 * Responsible solely for tracking window scroll state and active section
 * with requestAnimationFrame throttling to prevent forced synchronous reflows.
 */
export function useScrollSpy({
  isHomePage,
  pathname,
  thresholds,
  targetOffset = 180,
}: UseScrollSpyOptions) {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");

  // Track scrolled state (e.g. for header blur/border)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section based on route or scroll position
  useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith("/blog")) {
        setActiveHref("#writing");
      } else if (pathname === "/about") {
        setActiveHref("#about");
      } else if (pathname.startsWith("/projects")) {
        setActiveHref("#work");
      } else if (pathname === "/contact") {
        setActiveHref("#contact");
      } else {
        setActiveHref("");
      }
      return;
    }

    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      if (scrollY < 80) {
        setActiveHref("#home");
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveHref("#contact");
        return;
      }

      for (const section of thresholds) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetOffset) {
          setActiveHref(section.href);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname, thresholds, targetOffset]);

  return { scrolled, activeHref, setActiveHref };
}
