import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Layers,
  Bot,
  Workflow,
  Cpu,
  Compass,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

// --- EXPERTISE CAPABILITIES ---
const EXPERTISE = [
  { name: { en: "Systems Integration", ar: "تكامل الأنظمة" }, icon: Layers },
  { name: { en: "AI Agents & RAG", ar: "وكلاء الذكاء الاصطناعي" }, icon: Bot },
  { name: { en: "Workflow Automation", ar: "أتمتة مسارات العمل" }, icon: Workflow },
  { name: { en: "Solution Architecture", ar: "معمارية الحلول" }, icon: Cpu },
  { name: { en: "Technology Consulting", ar: "الاستشارات التقنية" }, icon: Compass },
];

export default function HeroSection({ className = "" }: { className?: string }) {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section
      id="home"
      aria-label={ar ? "القسم الرئيسي" : "Hero Introduction"}
      className={`relative w-full bg-[#D5360C] text-white overflow-hidden font-sans min-h-[92vh] flex flex-col justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 ${className}`}
    >
      {/* Background Subtle Texture */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop')",
          maskImage:
            "linear-gradient(180deg, transparent, black 10%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 10%, black 85%, transparent)",
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
                  {ar
                    ? "سانو خان / قائد تقني وخبير حلول"
                    : "SANU KHAN / TECH LEAD & SOLUTIONING EXPERT"}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md text-[11px] font-medium text-white/90">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{ar ? "دبي، الإمارات العربية المتحدة" : "Dubai, UAE"}</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black uppercase tracking-tight leading-[1.02] text-white">
              {ar ? (
                <>
                  هندسة الوضوح
                  <br />
                  في المنظومات <span className="text-[#E6D5BD]">المعقدة.</span>
                </>
              ) : (
                <>
                  ENGINEERING CLARITY
                  <br />
                  INTO COMPLEX <span className="text-[#E6D5BD]">SYSTEMS.</span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed font-normal">
              {ar
                ? "أربط بين استراتيجية الأعمال والتنفيذ الهندسي المتقن — أبني منصات رقمية قابلة للتوسع، وتكاملات ذكية، وتجارب سلسة تحل مشكلات الأعمال الفعلية."
                : "I connect business strategy with engineering execution—building scalable digital platforms, intelligent integrations, and seamless experiences that solve real problems."}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-[#101010] transition-all hover:bg-[#F7F7F5] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <span>{ar ? "استكشف الأعمال المختارة" : "Explore Selected Work"}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 active:scale-[0.98]"
              >
                <span>{ar ? "لنتواصل معاً" : "Let's Connect"}</span>
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
                  <span>{ar ? "سجل هندسي موثق" : "VERIFIED TRACK RECORD"}</span>
                </div>
                <span className="text-[11px] font-mono text-white/70">13+ YRS</span>
              </div>

              {/* 4 Verified Indicators Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-5 text-start">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">13+</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#E6D5BD] mt-1">
                    {ar ? "سنوات خبرة" : "Years of Experience"}
                  </span>
                  <span className="text-[11px] text-white/75 mt-0.5">
                    {ar ? "هندسة معمارية وقيادة تقنية" : "Architecture & tech leadership"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">100+</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#E6D5BD] mt-1">
                    {ar ? "أنظمة تم تسليمها" : "Systems Delivered"}
                  </span>
                  <span className="text-[11px] text-white/75 mt-0.5">
                    {ar ? "من الفكرة إلى بيئات الإنتاج" : "From concept to production"}
                  </span>
                </div>

                <div className="flex flex-col pt-3 border-t border-white/10">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">9</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#E6D5BD] mt-1">
                    {ar ? "أسواق إقليمية" : "Markets Served"}
                  </span>
                  <span className="text-[11px] text-white/75 mt-0.5">
                    {ar ? "منصات عبر الشرق الأوسط" : "Across GCC & Middle East"}
                  </span>
                </div>

                <div className="flex flex-col pt-3 border-t border-white/10">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">1M+</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#E6D5BD] mt-1">
                    {ar ? "أنظمة عالية النطاق" : "Product-Scale Systems"}
                  </span>
                  <span className="text-[11px] text-white/75 mt-0.5">
                    {ar ? "حركة مرور وأحداث فائقة" : "High-throughput telemetry"}
                  </span>
                </div>
              </div>
            </div>

            {/* What I Build / What I Solve Glass Panel */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
              <div className="mb-4">
                <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-white">
                  {ar ? "ما أبنيه. ما أحله." : "WHAT I BUILD. WHAT I SOLVE."}
                </h2>
                <p className="text-xs sm:text-[13px] text-white/85 mt-1 leading-relaxed">
                  {ar
                    ? "ربط الأنظمة، وأتمتة التعقيد، وهندسة تكنولوجيا تصنع قيمة حقيقية للأعمال."
                    : "Connecting systems, automating complexity, and engineering technology that delivers business value."}
                </p>
              </div>

              {/* Compact 2-column readable capability grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {EXPERTISE.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/95 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-colors"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-[#E6D5BD]" />
                    <span className="truncate">{ar ? item.name.ar : item.name.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
