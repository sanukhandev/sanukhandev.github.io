import { type ReactNode, useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useInView";

type SectionRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * A restrained, one-time viewport reveal that leaves content visible before animation.
 * Uses native IntersectionObserver and CSS transitions instead of framer-motion.
 * All content remains in the DOM, with no layout-height changes or scroll hijack.
 */
export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -48px 0px" });
  const shouldReduceMotion = useReducedMotion();

  const isVisible = shouldReduceMotion || inView;
  const clampedDelay = Math.max(0, Math.min(delay, 0.16));

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0.94,
        transform: isVisible ? "none" : "translateY(18px)",
        transition: shouldReduceMotion
          ? "none"
          : `opacity 0.62s cubic-bezier(0.22, 1, 0.36, 1) ${clampedDelay}s, transform 0.62s cubic-bezier(0.22, 1, 0.36, 1) ${clampedDelay}s`,
      }}
    >
      {children}
    </div>
  );
}
