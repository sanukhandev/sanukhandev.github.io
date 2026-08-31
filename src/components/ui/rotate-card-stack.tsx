import React, { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export interface RotateCardItem {
  title: string;
  scope: string;
  tags?: string[];
  category?: string;
  outcome?: string;
}

interface RotateCardStackProps {
  items: RotateCardItem[];
  autoRotateInterval?: number;
  className?: string;
}

export function RotateCardStack({
  items,
  autoRotateInterval = 3800,
  className,
}: RotateCardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();

  const handleNext = useCallback(() => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isHovered || reduceMotion || items.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [handleNext, isHovered, reduceMotion, autoRotateInterval, items.length]);

  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn("group relative flex flex-col items-center select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card stack stage */}
      <div
        tabIndex={0}
        role="button"
        aria-label="Click to rotate card stack"
        onClick={handleNext}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNext();
          }
        }}
        className="relative h-44 w-full max-w-[17.5rem] cursor-pointer outline-none sm:h-48 sm:max-w-[19.5rem] md:h-52 md:w-[21rem]"
      >
        {items.map((item, index) => {
          const total = items.length;
          const offset = (index - activeIndex + total) % total;
          const isTop = offset === 0;

          // Flip X offset direction in RTL
          const xDir = isArabic ? -1 : 1;

          const getCardMotion = () => {
            if (reduceMotion) {
              return {
                zIndex: isTop ? 30 : 10 - offset,
                x: isTop ? 0 : offset * 12 * xDir,
                y: isTop ? 0 : -offset * 12,
                scale: isTop ? 1 : 0.95 - offset * 0.04,
                rotate: 0,
                opacity: isTop ? 1 : Math.max(0.4, 0.85 - offset * 0.2),
              };
            }

            switch (offset) {
              case 0:
                return {
                  zIndex: 30,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                };
              case 1:
                return {
                  zIndex: 20,
                  x: 16 * xDir,
                  y: -14,
                  scale: 0.95,
                  rotate: isArabic ? 3.5 : -3.5,
                  opacity: 0.88,
                };
              case 2:
                return {
                  zIndex: 10,
                  x: 32 * xDir,
                  y: -28,
                  scale: 0.90,
                  rotate: isArabic ? 7 : -7,
                  opacity: 0.75,
                };
              default:
                return {
                  zIndex: 0,
                  x: 48 * xDir,
                  y: -42,
                  scale: 0.84,
                  rotate: isArabic ? 10 : -10,
                  opacity: 0,
                };
            }
          };

          const motionState = getCardMotion();

          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={false}
              animate={motionState}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.85,
              }}
              className={cn(
                "absolute inset-0 flex flex-col justify-between rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-colors duration-300 sm:p-5",
                isTop
                  ? "border-accent/50 bg-secondary/95 text-primary shadow-accent/10 shadow-xl ring-1 ring-accent/20 hover:border-accent"
                  : "border-border/80 bg-secondary/80 text-muted-foreground shadow-md hover:bg-secondary/90"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
                    {item.scope}
                  </span>
                  {isTop && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-body text-[10px] font-medium text-accent transition-transform duration-300 group-hover:scale-105">
                      <RotateCw className="size-2.5" />
                      {isArabic ? "تدوير" : "Rotate"}
                    </span>
                  )}
                </div>

                <h3 className="font-body mt-2.5 text-sm font-bold leading-snug text-primary sm:text-base md:text-lg">
                  {item.title}
                </h3>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/40 pt-2.5">
                {item.tags && item.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {item.category ?? "Architecture"}
                  </span>
                )}

                <span className="font-mono text-[10px] font-semibold text-accent/80">
                  {index + 1} / {total}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Dot Navigation & Controls */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(idx);
              }}
              aria-label={`Go to card ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === idx
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="ml-2 flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-accent"
          aria-label="Rotate next card"
        >
          <RotateCw className="size-3 transition-transform duration-300 group-hover:rotate-45" />
          <span>{isArabic ? "التالي" : "Next"}</span>
        </button>
      </div>
    </div>
  );
}
