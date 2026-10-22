import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "orange";
  hoverEffect?: boolean;
}

/**
 * Reusable GlassCard adhering to the 2026 "Calm Precision" Design System.
 * - light: Warm Alabaster translucent surface with 1px hairline border & specular highlight
 * - dark: Obsidian/Carbon translucent surface with 1px hairline border & top light reflection
 * - orange: Translucent white surface on vivid brand orange (hero)
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "light", hoverEffect = true, children, ...props }, ref) => {
    const variantStyles = {
      light:
        "bg-[#F2EFE9]/80 dark:bg-[#121215]/85 border border-[#E6E4DD] dark:border-white/[0.08] backdrop-blur-md shadow-sm shadow-black/[0.02] dark:shadow-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] text-[#141413] dark:text-[#FAFAFA]",
      dark:
        "bg-[#121215]/85 border border-white/[0.08] backdrop-blur-xl shadow-xl shadow-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] text-[#FAFAFA]",
      orange:
        "bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] text-white",
    };

    const hoverStyles = hoverEffect
      ? "transition-all duration-300 hover:-translate-y-1 hover:border-[#D5360C]/40 hover:shadow-lg dark:hover:border-white/20"
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
      "bg-black/[0.03] dark:bg-white/[0.06] border border-[#E6E4DD] dark:border-white/[0.08] text-[#141413] dark:text-[#FAFAFA] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
    dark:
      "bg-white/[0.05] border border-white/[0.08] text-[#FAFAFA] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
    orange:
      "bg-white/15 border border-white/25 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]",
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
