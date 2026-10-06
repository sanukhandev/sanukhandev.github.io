import { memo } from "react";
import { useLocale } from "@/hooks/use-locale";

export function CrossTapeMarquee() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const englishTokens = [
    "Solution",
    "Architect",
    "Platform",
    "Engineering",
    "Design",
    "Systems",
  ];

  const arabicTokens = [
    "حلول",
    "معماري",
    "منصات",
    "هندسة",
    "تصميم",
    "أنظمة",
  ];

  const tokens = isArabic ? arabicTokens : englishTokens;

  // Repeat sequence 8 times to ensure an unbroken infinite ticker
  const repeatGroup = Array.from({ length: 8 });

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden py-10 sm:py-14 my-3 select-none pointer-events-auto"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none" />

      {/* Relative wrapper holding both crossing tape ribbons */}
      <div className="relative w-full h-24 sm:h-28 flex items-center justify-center">
        {/* ============================================================
            TAPE 1: Primary Tape (Tilted -2deg, Scrolling Left)
            ============================================================ */}
        <div className="absolute w-[120vw] -left-[10vw] transform -rotate-2 origin-center py-2.5 sm:py-3 bg-surface border-y border-dashed border-border/90 text-primary shadow-xs z-10">
          <div className="animate-marquee-left flex items-center gap-6 font-mono text-[12.5px] sm:text-[14px] uppercase tracking-[0.14em] font-semibold text-primary">
            {repeatGroup.map((_, groupIdx) => (
              <div key={`tape1-${groupIdx}`} className="flex items-center gap-6 shrink-0">
                {tokens.map((token, tIdx) => (
                  <span key={`t1-${groupIdx}-${tIdx}`} className="inline-flex items-center gap-6">
                    <span className="hover:text-accent transition-colors">{token}</span>
                    <span className="text-accent/60 font-bold select-none">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            TAPE 2: Crossing Tape (Tilted +2.5deg, Scrolling Right)
            ============================================================ */}
        <div className="absolute w-[120vw] -left-[10vw] transform rotate-2 origin-center py-2.5 sm:py-3 bg-accent/10 dark:bg-accent/15 border-y border-dashed border-accent/50 text-accent font-semibold shadow-xs z-20 backdrop-blur-2xs">
          <div className="animate-marquee-right flex items-center gap-6 font-mono text-[12px] sm:text-[13.5px] uppercase tracking-[0.16em] font-bold text-accent">
            {repeatGroup.map((_, groupIdx) => (
              <div key={`tape2-${groupIdx}`} className="flex items-center gap-6 shrink-0">
                {tokens.map((token, tIdx) => (
                  <span key={`t2-${groupIdx}-${tIdx}`} className="inline-flex items-center gap-6">
                    <span>{token}</span>
                    <span className="text-primary/40 font-bold select-none">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CrossTapeMarquee);
