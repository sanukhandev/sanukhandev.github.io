import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { MotionProps } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

// ─── useScrollReveal hook ─────────────────────────────────
// Returns a ref + whether it has entered viewport (once)
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -60px 0px",
    amount: threshold,
  });
  return { ref, isInView };
}

// ─── ScrollReveal wrapper component ──────────────────────
interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  as: Tag = "div",
  ...rest
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollReveal();

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.93, filter: "blur(5px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
      },
    },
  };

  const MotionTag = motion(Tag as "div");

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// ─── StaggerReveal wrapper ────────────────────────────────
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerRevealProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}
