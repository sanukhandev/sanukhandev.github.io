import type { Variants } from "framer-motion";

// ─── Easing curves ───────────────────────────────────────
export const ease = {
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],
  snappy: [0.22, 1, 0.36, 1] as [number, number, number, number],
  gentle: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

// ─── Shared transition configs ───────────────────────────
export const spring = {
  stiff: { type: "spring", stiffness: 400, damping: 40 },
  soft: { type: "spring", stiffness: 150, damping: 22 },
  floaty: { type: "spring", stiffness: 80, damping: 16 },
} as const;

// ─── Reveal variants ─────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: ease.smooth },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.gentle },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

// ─── Stagger containers ──────────────────────────────────
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
};

// ─── Card hover ──────────────────────────────────────────
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -5,
    scale: 1.01,
    transition: { duration: 0.25, ease: ease.snappy },
  },
};

// ─── Float animation for badges ──────────────────────────
export const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
