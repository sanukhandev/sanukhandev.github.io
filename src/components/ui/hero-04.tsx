import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export function HeroSection04() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const stats = [
    {
      title: isArabic ? "13+ سنة" : "13+ years",
      sub: isArabic ? "بناء أنظمة إنتاجية" : "Building production systems",
    },
    {
      title: isArabic ? "تكامل المؤسسات" : "Enterprise integration",
      sub: isArabic ? "ERP · PIM · التجارة · OMS" : "ERP · PIM · Commerce · OMS",
    },
    {
      title: isArabic ? "المجالات" : "Domains",
      sub: isArabic ? "التجزئة · السيارات · الطيران · SaaS" : "Retail · Automotive · Airline · SaaS",
    },
    {
      title: isArabic ? "المقر" : "Based in",
      icon: MapPin,
      sub: isArabic ? "دبي، الإمارات" : "Dubai, UAE",
    },
  ];

  return (
    <section
      id="home"
      className="relative pt-8 pb-10 md:pt-12 md:pb-14 bg-background text-foreground"
    >
      <div className="container-narrow">
        {/* Balanced 2-Column Desktop Hero Layout */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14 min-h-[400px] md:min-h-[440px]">
          {/* Left Column (~68% desktop) */}
          <div className="flex-1 max-w-[720px]">
            {/* Eyebrow */}
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em] mb-3 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>
                {isArabic
                  ? "معماري تقني · هندسة المنصات"
                  : "SOLUTION ARCHITECT · PLATFORM ENGINEERING"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[clamp(52px,5vw,64px)] font-extrabold tracking-[-0.045em] text-primary leading-[0.98] sm:leading-[1.03] mb-5">
              {isArabic ? (
                "أصمم الأنظمة حول مشكلات الأعمال المعقدة."
              ) : (
                <>
                  I design systems around <br className="hidden sm:block" />
                  messy business problems.
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-[18.5px] text-secondary leading-[1.6] font-normal max-w-[640px] mb-6">
              {isArabic
                ? "أعمل عبر العمارة المعمارية والتكامل والتنفيذ — خاصة حيث تتطلب الأنظمة والفرق والعمليات المتعددة أن تعمل كمنصة واحدة."
                : "I work across architecture, integration and implementation — particularly where multiple systems, teams and business processes need to behave as one platform."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-11 rounded-lg bg-accent px-6 text-[14.5px] font-semibold text-white transition-colors hover:bg-accent/90 shadow-sm gap-1.5"
              >
                <a href="#work">
                  <span>{isArabic ? "عرض أعمالي" : "View my work"}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-11 rounded-lg border-border bg-transparent px-6 text-[14.5px] font-semibold text-primary transition-colors hover:bg-secondary/20 hover:border-accent/40"
              >
                <a href="#writing">
                  {isArabic ? "قراءة الملاحظات الهندسية" : "Read engineering notes"}
                </a>
              </Button>
            </div>

            {/* Human Context Line */}
            <p className="text-[13.5px] text-muted-foreground font-mono mt-4 font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
              <span>
                {isArabic
                  ? "العمارة والتكامل — ومع كود كافٍ للبقاء على اتصال بالواقع."
                  : "Architecture, integration — and still enough code to stay honest."}
              </span>
            </p>
          </div>

          {/* Right Column — Larger Avatar with Expanded ARCHITECT Background Word & One-line Quote */}
          <div className="shrink-0 relative flex flex-col items-center justify-center self-center my-4 lg:my-0 min-h-[360px] lg:min-h-[400px] w-full lg:w-[36%] overflow-hidden sm:overflow-visible">
            {/* Background Decorative Word: ARCHITECT (Expanded behind avatar & text) */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none font-mono text-[clamp(80px,12vw,160px)] font-extrabold tracking-[-0.06em] leading-[0.8] text-accent/10 dark:text-accent/12 uppercase text-center whitespace-nowrap"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              ARCHITECT
            </div>

            {/* Larger Floating Portrait (z-index 10, completely unframed) */}
            <div className="relative z-10 w-[240px] sm:w-[280px] lg:w-[320px]">
              <picture>
                <source srcSet="/assets/images/sanu-400.avif" type="image/avif" />
                <source srcSet="/assets/images/sanu-400.webp" type="image/webp" />
                <img
                  src="/assets/images/sanu-400.avif"
                  alt="Sanu Khan illustration"
                  width={400}
                  height={600}
                  loading="eager"
                  className="h-auto w-full object-contain filter drop-shadow-[0_14px_28px_rgba(20,35,25,0.09)]"
                />
              </picture>
            </div>

            {/* One-Line Personal Annotation */}
            <div className="relative z-20 mt-3 font-handwritten text-[19px] sm:text-[21px] text-accent font-semibold text-center select-none transform -rotate-1">
              {isArabic
                ? "أنظمة معقدة. قرارات واضحة. نتائج أفضل."
                : "Complex systems. Clear decisions. Better outcomes."}
            </div>
          </div>
        </div>

        {/* Integrated Hero Experience Strip */}
        <div className="mt-12 pt-8 border-t border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
            {stats.map((stat, idx) => (
              <div
                key={stat.title}
                className={`flex flex-col justify-center ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-6 lg:pl-8 rtl:sm:pl-0 rtl:sm:pr-6 rtl:lg:pr-8" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 text-[13px] font-mono uppercase text-accent font-semibold tracking-wider">
                  {stat.icon && <stat.icon className="h-3.5 w-3.5" />}
                  <span>{stat.title}</span>
                </div>
                <span className="mt-1 text-[14.5px] font-semibold text-primary">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

