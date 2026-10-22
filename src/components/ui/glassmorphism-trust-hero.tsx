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
      className={`relative w-full bg-[#D5360C] text-white overflow-hidden font-sans min-h-[92vh] flex flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 ${className}`}
    >
      {/* Background Subtle Depth Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 75% 20%, rgba(255,255,255,0.25) 0%, transparent 70%), radial-gradient(ellipse 70% 50% at 20% 85%, rgba(0,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-center">
          {/* ── LEFT COLUMN: Core Positioning & Identity ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7">
            {/* Eyebrow & Location Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
                <span className="text-[#f7f7f5] text-xs">✳</span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white">
                  {hero.eyebrow}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md text-[11px] font-medium text-white/90">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{hero.location}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black uppercase tracking-tight leading-[1.02] text-white">
              {hero.headlinePrefix}
              <br />
              {hero.headlineSuffix} <span className="text-[#E6D5BD]">{hero.headlineHighlight}</span>
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-normal">
              {hero.subheading}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#101010] transition-all hover:bg-[#F7F7F5] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <span>{hero.exploreWork}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 active:scale-[0.98]"
              >
                <span>{hero.letsConnect}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Verified Indicators & Capabilities Glass Panels ── */}
          <div className="lg:col-span-5 flex flex-col space-y-5 lg:space-y-6">
            {/* Verified Indicators Glass Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/15">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-white/90">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{hero.trackRecord}</span>
                </div>
                <span className="text-[11px] font-mono text-white/70">13+ YRS</span>
              </div>

              {/* 4 Verified Indicators Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 text-start">
                {hero.stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${i >= 2 ? "pt-3 border-t border-white/10" : ""}`}
                  >
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#E6D5BD] mt-1">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-white/75 mt-0.5">
                      {stat.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What I Build / What I Solve Glass Panel */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
              <div className="mb-4">
                <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-white">
                  {hero.whatIBuildTitle}
                </h2>
                <p className="text-xs sm:text-[13px] text-white/85 mt-1 leading-relaxed">
                  {hero.whatIBuildDesc}
                </p>
              </div>

              {/* Compact 2-column readable capability grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {hero.capabilities.map((capabilityName, i) => {
                  const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
                  return (
                    <div
                      key={capabilityName}
                      className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/95 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#E6D5BD]" />
                      <span className="truncate">{capabilityName}</span>
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
