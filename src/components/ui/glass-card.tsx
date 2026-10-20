import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "orange";
  hoverEffect?: boolean;
}

/**
 * Reusable GlassCard adhering to the Portfolio Glassmorphism System.
 * - light: Warm-white / ivory translucent surface (for editorial sections)
 * - dark: Charcoal translucent surface (for capability grids & Zaakiy)
 * - orange: Translucent white surface on vivid orange backgrounds (hero)
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "light", hoverEffect = true, children, ...props }, ref) => {
    const variantStyles = {
      light:
        "bg-white/70 dark:bg-[#151515]/75 border border-black/[0.08] dark:border-white/10 backdrop-blur-md shadow-lg shadow-black/[0.03] dark:shadow-black/25 text-[#101010] dark:text-[#f7f7f5]",
      dark:
        "bg-white/[0.04] border border-white/[0.12] backdrop-blur-xl shadow-xl shadow-black/40 text-[#f7f7f5]",
      orange:
        "bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl text-white",
    };

    const hoverStyles = hoverEffect
      ? "transition-all duration-300 hover:-translate-y-1 hover:border-[#D5360C]/40 hover:shadow-xl"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl overflow-hidden p-6 sm:p-8",
          variantStyles[variant],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export const GlassBadge = ({
  className,
  children,
  variant = "light",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "light" | "dark" | "orange";
}) => {
  const badgeStyles = {
    light:
      "bg-black/[0.04] dark:bg-white/[0.08] border border-black/10 dark:border-white/15 text-[#101010] dark:text-[#f7f7f5]",
    dark:
      "bg-white/[0.06] border border-white/15 text-[#f7f7f5]",
    orange:
      "bg-white/15 border border-white/25 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm",
        badgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
