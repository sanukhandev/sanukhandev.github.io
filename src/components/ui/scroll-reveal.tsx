import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Motion is progressive enhancement: content is visible until the client
 * confirms it is below the fold. A single observer reveals it once.
 * No scroll listeners, motion dependency, or text hidden without JavaScript.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Content at or near the initial viewport stays visible (no flash or LCP delay).
    if (node.getBoundingClientRect().top <= window.innerHeight * 0.94) {
      return;
    }

    setIsVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.04, rootMargin: "0px 0px -7% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={
        { "--motion-delay": `${Math.max(0, Math.min(delay, 0.45)) * 1000}ms` } as CSSProperties
      }
      className={cn(
        "motion-reveal",
        isVisible ? "motion-reveal--visible" : "motion-reveal--pending",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
