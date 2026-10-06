import { memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ZaakiyCatProps {
  isOpen: boolean;
  onClick: () => void;
  isArabic?: boolean;
}

export function ZaakiyCat({ isOpen, onClick, isArabic = false }: ZaakiyCatProps) {
  // Cat states: "walking" -> "sitting"
  const [catState, setCatState] = useState<"walking" | "sitting">("walking");
  const [isHovered, setIsHovered] = useState(false);

  // Walk across the button top edge for 2.6s, then transition to sitting
  useEffect(() => {
    // Respect reduced motion: jump straight to sitting
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCatState("sitting");
      return;
    }

    const timer = setTimeout(() => {
      setCatState("sitting");
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  // When chat modal is open, cat can rest atop the chat modal or launcher button
  return (
    <div
      className={cn(
        "absolute z-20 pointer-events-auto cursor-pointer select-none transition-all duration-300",
        isOpen
          ? "-top-7 right-8 sm:right-10" // Perched on top of the open chat header
          : "bottom-[calc(100%-2px)] left-3 sm:left-4" // Sitting directly on the floating button rim
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={isArabic ? "قطة Zaakiy الأليفة - انقر لفتح المساعد" : "Zaakiy cat companion - click to open assistant"}
      title={isArabic ? "مياو! انقر للتحدث مع Zaakiy" : "Meow! Click to chat with Zaakiy"}
    >
      {/* Floating Purr / Speech Bubble on Hover */}
      <div
        className={cn(
          "absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/95 px-2 py-0.5 text-[10px] font-mono font-semibold text-accent shadow-sm border border-accent/30 pointer-events-none transition-all duration-200",
          isHovered ? "opacity-100 -translate-y-1 scale-100" : "opacity-0 translate-y-1 scale-90"
        )}
      >
        <span>{isArabic ? "مياو~ 🐾" : "purr~ 🐾"}</span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-background rotate-45 border-r border-b border-accent/30" />
      </div>

      {/* Cat Animation Container */}
      <div
        className={cn(
          "relative transition-transform duration-[2400ms] ease-out",
          // Slide from left start position to resting perch position if not open
          !isOpen && (catState === "walking" ? "translate-x-0" : "translate-x-7 sm:translate-x-9")
        )}
      >
        {catState === "walking" && !isOpen ? (
          /* ============================================================
             WALKING CAT SVG (Paws stepping, body gentle walking bob)
             ============================================================ */
          <div className="animate-cat-walk-bob flex items-center">
            <svg
              width="38"
              height="26"
              viewBox="0 0 42 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#242D27] dark:text-[#E2E8F0] drop-shadow-xs overflow-visible"
              aria-hidden="true"
            >
              {/* Animated Swaying Upright Tail */}
              <path
                d="M 8 18 C 3 14 3 7 7 4 C 8 3 10 5 9 7 C 7 10 8 13 11 16"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                className="animate-cat-tail-walk origin-bottom-left"
              />

              {/* Legs (Alternating stride cycle) */}
              <g className="animate-cat-leg-1 origin-top">
                <line x1="11" y1="18" x2="9" y2="27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <g className="animate-cat-leg-2 origin-top">
                <line x1="15" y1="18" x2="17" y2="27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <g className="animate-cat-leg-2 origin-top">
                <line x1="22" y1="18" x2="20" y2="27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </g>
              <g className="animate-cat-leg-1 origin-top">
                <line x1="26" y1="18" x2="28" y2="27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </g>

              {/* Cat Torso */}
              <ellipse cx="19" cy="16" rx="10.5" ry="6.2" fill="currentColor" />

              {/* Head */}
              <circle cx="30" cy="11" r="6" fill="currentColor" />

              {/* Ears */}
              <polygon points="26,7 28,1.5 31,5" fill="currentColor" />
              <polygon points="31,5 34,1.5 35.5,7" fill="currentColor" />
              {/* Inner ears pink */}
              <polygon points="27,6.5 28.5,3 30.5,5" fill="#F472B6" />
              <polygon points="31.5,5 33.5,3 34.5,6.5" fill="#F472B6" />

              {/* Accent Collar & Signal Gem */}
              <path d="M 27 15.5 C 29 16.5 32 16.5 34 15.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="30.5" cy="17" r="1.1" fill="var(--accent)" />

              {/* Eyes & Nose */}
              <circle cx="29" cy="10" r="0.9" fill="var(--bg)" />
              <circle cx="33" cy="10" r="0.9" fill="var(--bg)" />
              <polygon points="30.5,12 31.5,12 31,12.8" fill="#F472B6" />
            </svg>
          </div>
        ) : (
          /* ============================================================
             SITTING CAT SVG (Perched atop the button rim, tail swaying,
             blinking softly, gentle breathing bob)
             ============================================================ */
          <div className="animate-cat-breathe flex items-center">
            <svg
              width="34"
              height="28"
              viewBox="0 0 36 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                "text-[#242D27] dark:text-[#E2E8F0] drop-shadow-xs overflow-visible transition-transform duration-200",
                isHovered && "scale-105 -translate-y-0.5"
              )}
              aria-hidden="true"
            >
              {/* Tail Swaying Smoothly */}
              <path
                d="M 8 24 C 3 22 1 15 2 10 C 2.5 7.5 4.5 7.5 5 10 C 4 14 6 18 10 22"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                className="animate-cat-tail-sway"
                style={{ transformOrigin: "8px 24px" }}
              />

              {/* Seated Hindquarters & Body */}
              <path
                d="M 8 27 C 6 23 6 17 10 13 C 14 10 19 10 22 13 C 25 16 26 22 25 27 Z"
                fill="currentColor"
              />

              {/* Front Paws Rested on Button Rim */}
              <rect x="18" y="24.5" width="3.5" height="4.5" rx="1.5" fill="currentColor" />
              <rect x="22" y="24.5" width="3.5" height="4.5" rx="1.5" fill="currentColor" />
              {/* Tiny white paw toes */}
              <circle cx="19.7" cy="28.5" r="0.6" fill="var(--bg)" />
              <circle cx="23.7" cy="28.5" r="0.6" fill="var(--bg)" />

              {/* Head with Subtle Tilt */}
              <g className="animate-cat-head-bob" style={{ transformOrigin: "22px 10px" }}>
                <circle cx="22" cy="10" r="6.2" fill="currentColor" />

                {/* Ears */}
                <polygon points="17.5,6 19,0.8 22.5,4.5" fill="currentColor" />
                <polygon points="23,4.5 26.5,0.8 27.5,6" fill="currentColor" />

                {/* Inner Ears Pink */}
                <polygon points="18.5,5.2 19.5,2 22,4.5" fill="#F472B6" />
                <polygon points="23.5,4.5 25.8,2 26.5,5.2" fill="#F472B6" />

                {/* Accent Collar & Signal Gem */}
                <path d="M 18.5 14.8 C 21.5 16.2 24 15.8 26 14.5" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="22" cy="16.5" r="1.1" fill="var(--accent)" />

                {/* Happy Blinking Smiling Eyes */}
                <path
                  d="M 19 9.8 Q 20.5 11.2 22 9.8"
                  stroke="var(--bg)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="animate-cat-blink"
                  style={{ transformOrigin: "20.5px 10.5px" }}
                />
                <path
                  d="M 23 9.8 Q 24.5 11.2 26 9.8"
                  stroke="var(--bg)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="animate-cat-blink"
                  style={{ transformOrigin: "24.5px 10.5px" }}
                />

                {/* Cute Pink Nose */}
                <polygon points="22,12 23,12 22.5,12.8" fill="#F472B6" />

                {/* Whiskers */}
                <path
                  d="M 16 11 L 12 10.2 M 16 12.5 L 12 13 M 28 11 L 32 10.2 M 28 12.5 L 32 13"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ZaakiyCat);
