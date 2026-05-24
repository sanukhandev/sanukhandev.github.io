export const containerClass =
  "mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12";

export const sectionClass = "py-16 md:py-24 lg:py-32";

export const sectionGapClass = "gap-8 md:gap-12 lg:gap-20";

export const cardClass =
  "rounded-3xl border border-zinc-200/50 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/60 dark:bg-zinc-900/60";

export const heroTitleClass =
  "text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-[0.88] tracking-[-0.08em] font-semibold";

export const sectionHeadingClass =
  "text-3xl md:text-5xl tracking-[-0.05em] font-semibold";

export const labelClass = "text-xs font-medium uppercase tracking-[0.2em]";

export const paragraphClass =
  "text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300";

export const revealInView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};
