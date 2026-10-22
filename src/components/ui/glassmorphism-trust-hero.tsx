import React from "react";
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

export default function HeroSection({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const hero = useSectionData("hero");

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-center">
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

            {/* Headline with Signature Accent */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase tracking-tight leading-[0.98] text-[#141413] dark:text-white">
              {hero.headlinePrefix}
              <br />
              {hero.headlineSuffix}{" "}
              <span className="text-[#D5360C] drop-shadow-[0_2px_14px_rgba(213,54,12,0.2)]">
                {hero.headlineHighlight}
              </span>
            </h1>

            {/* Subheading */}
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

          {/* ── RIGHT COLUMN: Unified Precision Architecture Bento Card ── */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#F2EFE9]/90 dark:bg-[#121215]/90 p-6 sm:p-7 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              {/* Corner crosshairs for architectural precision */}
              <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-zinc-400/40 select-none">+</div>
              <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-zinc-400/40 select-none">+</div>
              <div aria-hidden="true" className="absolute bottom-2.5 start-3 text-[10px] font-mono text-zinc-400/40 select-none">+</div>
              <div aria-hidden="true" className="absolute bottom-2.5 end-3 text-[10px] font-mono text-zinc-400/40 select-none">+</div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{hero.trackRecord}</span>
                </div>
                <span className="text-[11px] font-mono text-[#D5360C] font-semibold tabular-nums">
                  13+ YRS // PROD
                </span>
              </div>

              {/* 4 Verified Indicators Grid (2x2 clean quadrant) */}
              <div className="grid grid-cols-2 gap-5 text-start">
                {hero.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${i >= 2 ? "pt-4 border-t border-black/[0.06] dark:border-white/[0.08]" : ""}`}
                  >
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#141413] dark:text-white tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#D5360C] mt-1 font-mono">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                      {stat.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* What I Build / Capabilities Micro-Strip */}
              <div className="mt-6 pt-5 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="text-[10.5px] font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-2.5">
                  {hero.whatIBuildTitle}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hero.capabilities.map((capabilityName, i) => {
                    const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
                    return (
                      <div
                        key={capabilityName}
                        className="flex items-center gap-1.5 rounded-md border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        <Icon className="h-3 w-3 shrink-0 text-[#D5360C]" />
                        <span>{capabilityName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
