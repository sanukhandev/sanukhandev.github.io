import React, { useState, useEffect, useMemo } from "react";
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

/** Smooth cubic ease-out counting animation component with SSR/prerender safety */
function AnimatedCounter({ value }: { value: string }) {
  const { prefix, target, suffix } = useMemo(() => parseStatValue(value), [value]);
  // Default to target so static prerender & SEO crawlers see the full number immediately
  const [count, setCount] = useState(target);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setCount(0);
    const duration = 1400; // 1.4s smooth ease
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
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

export default function HeroSection({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const hero = useSectionData("hero");

  // Typewriter state for the primary headline
  const part1 = hero.headlinePrefix; // "ENGINEERING CLARITY"
  const part2 = hero.headlineSuffix; // "INTO COMPLEX"
  const part3 = hero.headlineHighlight; // "SYSTEMS."

  const totalLength = useMemo(
    () => part1.length + 1 + part2.length + 1 + part3.length,
    [part1, part2, part3]
  );

  // Initialize with full length for SSR & SEO prerendering
  const [typedLength, setTypedLength] = useState(totalLength);
  const [isTypingDone, setIsTypingDone] = useState(true);

  useEffect(() => {
    // Respect user motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedLength(totalLength);
      setIsTypingDone(true);
      return;
    }

    setTypedLength(0);
    setIsTypingDone(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setTypedLength(current);
      if (current >= totalLength) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 28); // brisk, responsive typing cadence

    return () => clearInterval(interval);
  }, [totalLength]);

  // Derived visible slices for line 1, line 2 prefix, and line 2 highlight
  const len1 = part1.length;
  const len2 = len1 + 1 + part2.length;

  const visiblePart1 = part1.slice(0, Math.min(typedLength, len1));
  const visiblePart2 =
    typedLength > len1
      ? part2.slice(0, Math.max(0, Math.min(typedLength - len1 - 1, part2.length)))
      : "";
  const visiblePart3 =
    typedLength > len2 ? part3.slice(0, Math.max(0, typedLength - len2 - 1)) : "";

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
            {/* Minimal Eyebrow & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
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
            </div>

            {/* Typewriter Animated Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase tracking-tight leading-[0.98] text-[#141413] dark:text-white min-h-[2.1em]">
              {/* Screen-reader accessible complete string */}
              <span className="sr-only">
                {part1} {part2} {part3}
              </span>

              {/* Visually animated typewriter display */}
              <span aria-hidden="true">
                {visiblePart1}
                <br />
                {visiblePart2}
                {visiblePart2 && visiblePart3 ? " " : ""}
                <span className="text-[#D5360C] drop-shadow-[0_2px_14px_rgba(213,54,12,0.2)]">
                  {visiblePart3}
                </span>
                {/* Blinking Orange Terminal Cursor */}
                <span
                  className={`inline-block w-[3.5px] h-[0.8em] bg-[#D5360C] ml-1.5 rtl:ml-0 rtl:mr-1.5 align-baseline transition-opacity duration-300 ${
                    isTypingDone ? "animate-pulse opacity-70" : "opacity-100"
                  }`}
                />
              </span>
            </h1>

            {/* Improved Senior Subheading */}
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {hero.subheading}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#D5360C] px-7 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white transition-all hover:bg-[#AD2A09] hover:shadow-lg hover:shadow-orange-950/20 active:scale-[0.98]"
              >
                <span>{hero.exploreWork}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-black/15 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.04] px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#141413] dark:text-white backdrop-blur-md transition-all hover:border-[#D5360C]/60 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]"
              >
                <span>{hero.letsConnect}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90 text-[#D5360C]" />
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Clean, Floating Telemetry (No Heavy Background Card) ── */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            {/* Telemetry Header Strip */}
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.08] dark:border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{hero.trackRecord}</span>
              </div>
              <span className="text-[11px] font-mono text-[#D5360C] font-semibold tabular-nums">
                13+ YRS // PROD
              </span>
            </div>

            {/* 4 Verified Indicators Grid with Animated Counters */}
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
                  <span className="text-xs uppercase font-bold tracking-wider text-[#D5360C] mt-1.5 font-mono">
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
                    <div
                      key={capabilityName}
                      className="flex items-center gap-1.5 rounded-md border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:border-[#D5360C]/50 hover:text-primary transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[#D5360C]" />
                      <span>{capabilityName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
