export const containerClass =
  "mx-auto w-full max-w-[1280px] xl:max-w-[1360px] px-5 sm:px-6 md:px-8 lg:px-12";

export const sectionClass = "py-16 md:py-24 lg:py-32";

export const sectionGapClass = "gap-8 md:gap-12 lg:gap-16";

export const cardClass =
  "rounded-xl border border-border bg-card/60 transition-all duration-200 hover:border-accent/40 shadow-xs";

export const heroTitleClass =
  "text-[clamp(52px,5.5vw,88px)] leading-[0.98] tracking-[-0.04em] font-semibold text-primary";

export const sectionHeadingClass =
  "text-2xl sm:text-3xl lg:text-4xl tracking-[-0.035em] font-semibold text-primary leading-tight";

export const labelClass =
  "text-[11.5px] font-mono font-semibold uppercase tracking-[0.08em] text-accent";

export const paragraphClass =
  "text-[15.5px] sm:text-[16.5px] leading-[1.65] font-normal text-secondary";

export const revealInView = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
  viewport: { once: true },
};

