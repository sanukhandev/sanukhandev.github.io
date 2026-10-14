import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * A restrained, one-time viewport reveal that leaves content almost fully
 * visible before animation. Motion is progressive enhancement, not navigation.
 * All content remains in the DOM, with no layout-height changes or scroll hijack.
 */
export function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0.94, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -48px 0px" }}
      transition={{
        duration: 0.62,
        delay: Math.max(0, Math.min(delay, 0.16)),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
