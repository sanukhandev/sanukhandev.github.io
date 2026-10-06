import { memo } from "react";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { MatrixScrambleWord } from "@/components/ui/MatrixScrambleWord";

export function HeroSection04() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const stats = [
    {
      value: "13+",
      label: isArabic ? "سنوات الخبرة" : "Years experience",
      note: isArabic ? "أنظمة إنتاجية" : "Production systems",
    },
    {
      value: "20+",
      label: isArabic ? "أنظمة ومنصات" : "Systems & platforms",
      note: isArabic ? "تكاملات معقدة" : "High throughput",
    },
    {
      value: "7",
      label: isArabic ? "مجالات مختلفة" : "Industries",
      note: isArabic ? "تجزئة · طيران · سيارات" : "Retail · Air · Auto",
    },
    {
      value: "AE",
      label: isArabic ? "منذ 2021 · متاح" : "Since 2021 · Available",
      note: isArabic ? "عمارة وقيادة تقنية" : "Architect & Lead",
      isLocation: true,
    },
  ];

  const systemTags = isArabic
    ? ["العمارة المعمارية", "تكامل المؤسسات", "هندسة المنصات", "الذكاء الاصطناعي"]
    : ["Architecture", "Enterprise Integration", "Platform Engineering", "AI & Automation"];

  const matrixWordsEn = ["messy", "complex", "transformative", "distributed", "mission-critical"];
  const matrixWordsAr = ["تعقيدات", "تحولات", "تحديات", "توسعات"];

  return (
    <section
      id="home"
      className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-14 border-b border-border/60 overflow-hidden"
    >
      {/* Subtle blueprint grid background with organic radial light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 system-grid opacity-15 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-1/6 w-[560px] h-[560px] rounded-full bg-accent/[0.04] blur-3xl pointer-events-none"
      />

      {/* WIDE HERO CONTAINER (Max 1440px with generous margins) */}
      <div className="w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          {/* ============================================================
              LEFT COLUMN: Editorial Content (~50% Desktop)
              ============================================================ */}
          <div className="w-full lg:w-[50%] xl:w-[48%] flex flex-col items-start text-left rtl:text-right">
            {/* Technical Stamp & Eyebrow with Active Beacon */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-surface/90 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.08em] text-accent shadow-2xs backdrop-blur-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span>
                  {isArabic
                    ? "معماري حلول · هندسة المنصات"
                    : "SOFTWARE ENGINEER · SOLUTION ARCHITECT · DUBAI, UAE"}
                </span>
              </div>

              {/* Imperfection stamp tag (slightly tilted notebook stamp) */}
              <span
                aria-hidden="true"
                className="hidden sm:inline-block font-mono text-[10px] text-muted-foreground border border-dashed border-border px-2 py-0.5 rounded transform rotate-1 select-none"
              >
                [REF: ENG_2026]
              </span>
            </div>

            {/* Main Headline (Refined editorial scale, balanced & confident with Matrix scramble) */}
            <h1 className="text-[34px] sm:text-[44px] lg:text-[48px] xl:text-[54px] font-semibold tracking-[-0.035em] text-primary leading-[1.08] sm:leading-[1.06] mb-5 max-w-[620px]">
              {isArabic ? (
                <>
                  أصمم الأنظمة لمواجهة{" "}
                  <MatrixScrambleWord words={matrixWordsAr} isArabic={true} />
                  {" "}الأعمال الواقعية.
                </>
              ) : (
                <>
                  I design systems for <br className="hidden sm:inline" />
                  <MatrixScrambleWord words={matrixWordsEn} />
                  {" "}business problems.
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-[16px] sm:text-[17.5px] text-secondary leading-[1.65] font-normal max-w-[560px] mb-8">
              {isArabic
                ? "العمارة والتكامل وهندسة المنصات للأنظمة التي تحتاج للصمود أمام التعقيدات التشغيلية والتجارية الواقعية."
                : "Software engineering, architecture and integration for production systems that need to survive real-world complexity."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8 lg:mb-12 w-full sm:w-auto">
              <Button
                asChild
                className="h-11 sm:h-12 rounded-lg bg-accent px-6 text-[14px] sm:text-[14.5px] font-semibold text-white transition-all hover:bg-accent/90 shadow-xs gap-2 active:scale-[0.98]"
              >
                <a href="#work">
                  <span>{isArabic ? "عرض أعمالي المختارة" : "View selected work"}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-11 sm:h-12 rounded-lg border-border bg-surface/70 px-6 text-[14px] sm:text-[14.5px] font-semibold text-primary transition-colors hover:border-accent/40 hover:bg-secondary/20"
              >
                <a href="#about">
                  <span>{isArabic ? "نبذة عني" : "About me"}</span>
                </a>
              </Button>
            </div>

            {/* MOBILE ONLY: Unboxed Avatar visual in mobile reading flow */}
            <div className="w-full flex flex-col items-center justify-center my-6 lg:hidden">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex flex-col items-center">
                {/* Floating Avatar (Completely unboxed with responsive srcset) */}
                <picture className="w-full flex justify-center">
                  <source
                    type="image/avif"
                    srcSet="/avatar-340.avif 340w, /avatar-680.avif 680w"
                    sizes="(max-width: 640px) 340px, 400px"
                  />
                  <img
                    src="/avatar-340.avif"
                    alt="Sanu Khan - Solution Architect & Platform Engineer"
                    width={340}
                    height={311}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(17,24,20,0.12)] select-none"
                  />
                </picture>

                {/* Imperfection tape note on mobile */}
                <div className="mt-3.5 inline-flex items-center gap-2 rounded border border-dashed border-border/90 bg-surface/90 px-3.5 py-1.5 shadow-2xs transform -rotate-1 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="quote-handwritten text-[16px] sm:text-[17px] text-primary">
                    {isArabic
                      ? "أنظمة معقدة. قرارات واضحة. نتائج أفضل."
                      : "Complex systems. Clear decisions. Better outcomes."}
                  </span>
                </div>

                {/* Mobile System Tags */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                  {systemTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border/80 bg-surface/80 px-2 py-0.5 text-[10.5px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Row (Sleek, tactile dividers) */}
            <div className="w-full pt-6 sm:pt-7 border-t border-dashed border-border/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-border/80">
                {stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${
                      idx > 0 ? "pt-3 sm:pt-0 sm:pl-4 lg:pl-5 rtl:sm:pl-0 rtl:sm:pr-4 rtl:lg:pr-5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {stat.isLocation && (
                        <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                      )}
                      <span className="text-[21px] sm:text-[23px] font-semibold text-primary tracking-tight font-mono">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] text-muted-foreground font-medium mt-0.5 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN: Prominent, Unboxed Architectural Avatar (~50% Desktop)
              NO BOX, NO CARD BORDER, NATURALLY FLOATING WITH TACTILE TOUCHES
              ============================================================ */}
          <div className="hidden lg:flex w-full lg:w-[50%] xl:w-[52%] flex-col items-center justify-center relative select-none">
            {/* Open Canvas with Subtle Blueprint Registration Marks */}
            <div className="relative w-full max-w-[560px] xl:max-w-[620px] flex flex-col items-center">
              {/* Architectural Canvas Corner Crosshairs (drafting table markings) */}
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -top-3 -right-3 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
              >
                +
              </span>

              {/* Blueprint coordinate tag floating at the top-right */}
              <div
                aria-hidden="true"
                className="w-full flex items-center justify-between font-mono text-[10px] text-muted-foreground mb-2 px-1 tracking-wider"
              >
                <span>FIG. 00 // FIELD PORTRAIT</span>
                <span>25.2048° N, 55.2708° E · AE</span>
              </div>

              {/*
                THE AVATAR: COMPLETELY UNBOXED!
                NO border, NO card container, NO background frame.
                Renders freely, floating naturally on the page with responsive srcset.
              */}
              <div className="relative w-full flex items-center justify-center">
                <picture className="w-full flex justify-center">
                  <source
                    type="image/avif"
                    srcSet="/avatar-680.avif 680w, /avatar-1000.avif 1000w, /avatar_new.avif 1312w"
                    sizes="(max-width: 1280px) 560px, 620px"
                  />
                  <img
                    src="/avatar_new.avif"
                    alt="Sanu Khan - Solution Architect & Platform Engineer"
                    width={1312}
                    height={1199}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_42px_rgba(17,24,20,0.14)] select-none transition-transform duration-300 ease-out hover:scale-[1.015]"
                  />
                </picture>
              </div>

              {/* Tilted Notebook Tape Note Annotation (Imperfection Style) */}
              <div className="mt-3 inline-flex items-center gap-2.5 rounded-md border border-dashed border-border bg-surface/95 px-4 py-2 shadow-xs transform -rotate-1 hover:rotate-0 transition-transform duration-200 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span className="quote-handwritten text-[17px] sm:text-[18px] text-primary">
                  {isArabic
                    ? "أنظمة معقدة. قرارات واضحة. نتائج أفضل."
                    : "Complex systems. Clear decisions. Better outcomes."}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1">/* memo */</span>
              </div>

              {/* Floating System Tags (Editorial tactile badges) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5">
                {systemTags.map((tag, idx) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/90 px-3 py-1 text-[11px] font-mono text-secondary shadow-2xs transition-transform duration-150 hover:-translate-y-0.5 ${
                      idx % 2 === 0 ? "transform -rotate-0.5" : "transform rotate-0.5"
                    }`}
                  >
                    <Sparkles className="h-2.5 w-2.5 text-accent/70" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection04);
