"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LampContainerProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  colorVariant?: "cyan" | "orange";
}

export const LampContainer = memo(({
  children,
  className,
  contentClassName,
  colorVariant = "orange",
}: LampContainerProps) => {
  const isOrange = colorVariant === "orange";

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-start overflow-hidden bg-zinc-950 w-full z-0 pt-20 sm:pt-24",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-110 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic text-white [--conic-position:from_70deg_at_center_top]",
            isOrange
              ? "from-[#d5360c] via-transparent to-transparent"
              : "from-cyan-500 via-transparent to-transparent"
          )}
        >
          <div className="absolute w-[100%] left-0 bg-zinc-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-zinc-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={cn(
            "absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic text-white [--conic-position:from_290deg_at_center_top]",
            isOrange
              ? "from-transparent via-transparent to-[#ef470d]"
              : "from-transparent via-transparent to-cyan-500"
          )}
        >
          <div className="absolute w-40 h-[100%] right-0 bg-zinc-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-zinc-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-zinc-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div
          className={cn(
            "absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl",
            isOrange ? "bg-[#d5360c]" : "bg-cyan-500"
          )}
        />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl",
            isOrange ? "bg-[#f97316]" : "bg-cyan-400"
          )}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]",
            isOrange ? "bg-[#f97316]" : "bg-cyan-400"
          )}
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-zinc-950" />
      </div>

      <div
        className={cn(
          "relative z-50 flex flex-col items-center px-4 sm:px-6 w-full max-w-7xl mx-auto pb-10 sm:pb-14 -translate-y-16 sm:-translate-y-20 md:-translate-y-24",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
});

LampContainer.displayName = "LampContainer";
