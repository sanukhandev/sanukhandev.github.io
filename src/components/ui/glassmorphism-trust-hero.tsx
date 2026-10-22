import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Bot,
  Workflow,
  Cpu,
  Compass,
  MapPin,
} from "lucide-react";
import { useSectionData } from "@/lib/i18n";
import { useLocale } from "@/hooks/use-locale";

const CAPABILITY_ICONS = [Layers, Bot, Workflow, Cpu, Compass];

/** Helper to parse a stat string into prefix, number, and suffix */
function parseStatValue(raw: string) {
  const match = raw.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw };
  return {
    prefix: match[1] || "",
    target: parseInt(match[2], 10),
    suffix: match[3] || "",
  };
}

/** Smooth quartic ease-out counting animation component with SSR/prerender safety */
function AnimatedCounter({ value }: { value: string }) {
  const { prefix, target, suffix } = useMemo(() => parseStatValue(value), [value]);
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    setCount(0);
    const duration = 2000; // 2s serene, smooth ease
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Silky quartic ease-out for a smooth breeze deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    const handle = requestAnimationFrame(update);
    return () => cancelAnimationFrame(handle);
  }, [target]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Gentle, organic ease curve for fluid breeze motion
const breezeEase = [0.16, 1, 0.3, 1] as const;

export default function HeroSection({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const hero = useSectionData("hero");
  const prefersReduced = useReducedMotion();

  const part1 = hero.headlinePrefix; // "ENGINEERING CLARITY"
  const part2 = hero.headlineSuffix; // "INTO COMPLEX"
  const part3 = hero.headlineHighlight; // "SYSTEMS."

  return (
    <section
      id="home"
      aria-label={ar ? "القسم الرئيسي" : "Hero Introduction"}
      className={`relative w-full bg-[#FAF8F5] dark:bg-[#09090B] text-[#141413] dark:text-[#FAFAFA] overflow-hidden font-sans min-h-[88vh] flex flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-black/[0.06] dark:border-white/[0.08] ${className}`}
    >
      {/* Subtle Ambient Radial Light (Linear / Calm Precision style) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(213, 54, 12, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* ── LEFT COLUMN: Core Positioning & Identity ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            {/* Minimal Eyebrow & Status Pill with Gentle Float */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: breezeEase }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {hero.eyebrow}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3 h-3 text-[#D5360C]" />
                <span>{hero.location}</span>
              </div>
            </motion.div>

            {/* Headline with Staggered Breeze Blur-Reveal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase tracking-tight leading-[0.98] text-[#141413] dark:text-white">
              {/* Screen-reader accessible complete string */}
              <span className="sr-only">
                {part1} {part2} {part3}
              </span>

              {/* Visually animated breeze display */}
              <span aria-hidden="true" className="block">
                <motion.span
                  className="inline-block"
                  initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.05, ease: breezeEase, delay: 0.08 }}
                >
                  {part1}
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.05, ease: breezeEase, delay: 0.24 }}
                >
                  {part2}{" "}
                </motion.span>
                <motion.span
                  className="inline-block text-[#D5360C] drop-shadow-[0_2px_16px_rgba(213,54,12,0.22)]"
                  initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 1.15, ease: breezeEase, delay: 0.4 }}
                >
                  {part3}
                </motion.span>
              </span>
            </h1>

            {/* Smooth Breathing Subheading */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: breezeEase, delay: 0.32 }}
              className="max-w-2xl text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal"
            >
              {hero.subheading}
            </motion.p>

            {/* Primary & Secondary CTAs with Smooth Micro-Physics */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.95, ease: breezeEase, delay: 0.44 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#work"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#D5360C] px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-md shadow-orange-950/15 transition-all hover:bg-[#AD2A09] hover:shadow-xl hover:shadow-orange-950/25"
              >
                <span>{hero.exploreWork}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141413] dark:text-white backdrop-blur-md transition-all hover:border-[#D5360C]/60 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <span>{hero.letsConnect}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90 text-[#D5360C]" />
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Clean, Floating Telemetry with Breeze Glide ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.15, ease: breezeEase, delay: 0.28 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            {/* Telemetry Header Strip */}
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.08] dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{hero.trackRecord}</span>
              </div>
              <span className="text-[11px] font-mono text-[#AD2A09] dark:text-[#E6D5BD] font-semibold tabular-nums">
                13+ YRS // PROD
              </span>
            </div>

            {/* 4 Verified Indicators Grid with Silky Animated Counters */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 text-start">
              {hero.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col ${
                    i >= 2 ? "pt-5 border-t border-black/[0.06] dark:border-white/[0.08]" : ""
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#141413] dark:text-white tabular-nums">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#AD2A09] dark:text-[#E6D5BD] mt-1.5 font-mono">
                    {stat.label}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>

            {/* What I Build / Capabilities Floating Micro-Tags */}
            <div className="pt-6 border-t border-black/[0.08] dark:border-white/10">
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                {hero.whatIBuildTitle}
              </div>
              <div className="flex flex-wrap gap-2">
                {hero.capabilities.map((capabilityName, i) => {
                  const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
                  return (
                    <motion.div
                      key={capabilityName}
                      whileHover={{ y: -1, scale: 1.02 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-1.5 rounded-md border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:border-[#D5360C]/50 hover:text-primary transition-colors cursor-default"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#D5360C]" />
                      <span>{capabilityName}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
