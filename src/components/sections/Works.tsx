import { Link } from "react-router-dom";
import { getLocalizedCaseStudies } from "@/data/caseStudies";
import { useLocale } from "@/hooks/use-locale";
import { ArrowRight } from "lucide-react";

export default function Works() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const caseStudies = getLocalizedCaseStudies(locale);

  const case1 = caseStudies[0];
  const case2 = caseStudies[1];
  const case3 = caseStudies[2];

  return (
    <section id="work" className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em] mb-1.5">
              {isArabic ? "أعمال معمارية مختارة" : "SELECTED ARCHITECTURE WORK"}
            </div>
            <h2 className="section-h2 text-primary">
              {isArabic ? (
                "أنظمة لم يكن الجزء المثير فيها مجرد كود."
              ) : (
                <>
                  A few systems where the interesting <br className="hidden sm:block" />
                  part wasn't the code.
                </>
              )}
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-mono font-semibold text-accent hover:underline shrink-0"
          >
            <span>{isArabic ? "عرض كل الأعمال" : "View all work"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3-Column Desktop Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 01: Enterprise Retail Integration */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/40 p-6 transition-all duration-200 hover:border-accent/40 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[13px] font-mono text-muted-foreground mb-3">
                <span className="font-bold text-accent">01</span>
                <span>{isArabic ? "التجزئة / التجارة" : "Retail / Commerce"}</span>
              </div>

              <h3 className="text-[21px] font-semibold text-primary mb-2.5 leading-snug">
                {case1.title}
              </h3>

              <p className="text-[14.5px] text-secondary leading-relaxed font-normal mb-5 line-clamp-3">
                {case1.subtitle}
              </p>

              {/* Mini Technical Diagram 1 */}
              <div className="rounded-lg border border-border/60 bg-background/60 p-3.5 mb-6 text-[12px] font-mono">
                <div className="flex items-center justify-between gap-1.5 text-center mb-2">
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 font-semibold text-primary">
                    SAP
                  </div>
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 font-semibold text-primary">
                    PIM
                  </div>
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 font-semibold text-primary">
                    {isArabic ? "التجارة" : "Commerce"}
                  </div>
                </div>

                <div className="text-center text-accent my-1 font-bold">↓</div>

                <div className="rounded border border-accent/40 bg-accent/10 py-1.5 text-center font-bold text-accent mb-2">
                  {isArabic ? "طبقة التكامل" : "Integration Layer"}
                </div>

                <div className="text-center text-accent my-1 font-bold">↓</div>

                <div className="rounded border border-border/80 bg-secondary/30 py-1 text-center font-semibold text-primary">
                  OMS
                </div>
              </div>
            </div>

            <Link
              to={`/projects/${case1.slug}`}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline pt-2 border-t border-border/40"
            >
              <span>{isArabic ? "قراءة دراسة الحالة" : "Read case study"}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* CARD 02: Airline Retailing & Aggregation */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/40 p-6 transition-all duration-200 hover:border-accent/40 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[13px] font-mono text-muted-foreground mb-3">
                <span className="font-bold text-accent">02</span>
                <span>{isArabic ? "الطيران / السفر" : "Airline / Travel"}</span>
              </div>

              <h3 className="text-[21px] font-semibold text-primary mb-2.5 leading-snug">
                {case2.title}
              </h3>

              <p className="text-[14.5px] text-secondary leading-relaxed font-normal mb-5 line-clamp-3">
                {case2.subtitle}
              </p>

              {/* Mini Technical Diagram 2 */}
              <div className="rounded-lg border border-border/60 bg-background/60 p-3.5 mb-6 text-[12px] font-mono">
                <div className="grid grid-cols-2 gap-1.5 text-center">
                  <div className="space-y-1">
                    <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                      {isArabic ? "مصادر الطيران" : "Airline Sources"}
                    </div>
                    <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                      {isArabic ? "محتوى NDC" : "NDC Content"}
                    </div>
                    <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                      {isArabic ? "الأنظمة القديمة" : "Legacy Systems"}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center space-y-1">
                    <div className="rounded border border-accent/40 bg-accent/10 py-2 font-bold text-accent">
                      {isArabic ? "التجميع والتوحيد" : "Aggregation & Normalisation"}
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 text-[10.5px]">
                      <span className="bg-secondary/40 rounded py-0.5">{isArabic ? "بحث" : "Search"}</span>
                      <span className="bg-secondary/40 rounded py-0.5">{isArabic ? "حجز" : "Booking"}</span>
                      <span className="bg-secondary/40 rounded py-0.5">{isArabic ? "ما بعد الحجز" : "Post-Book"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={`/projects/${case2.slug}`}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline pt-2 border-t border-border/40"
            >
              <span>{isArabic ? "قراءة دراسة الحالة" : "Read case study"}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* CARD 03: Automotive Omnichannel Platform */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card/40 p-6 transition-all duration-200 hover:border-accent/40 shadow-xs">
            <div>
              <div className="flex items-center justify-between text-[13px] font-mono text-muted-foreground mb-3">
                <span className="font-bold text-accent">03</span>
                <span>{isArabic ? "السيارات" : "Automotive"}</span>
              </div>

              <h3 className="text-[21px] font-semibold text-primary mb-2.5 leading-snug">
                {case3.title}
              </h3>

              <p className="text-[14.5px] text-secondary leading-relaxed font-normal mb-5 line-clamp-3">
                {case3.subtitle}
              </p>

              {/* Mini Technical Diagram 3 */}
              <div className="rounded-lg border border-border/60 bg-background/60 p-3.5 mb-6 text-[12px] font-mono">
                <div className="flex items-center justify-between gap-1.5 text-center mb-2">
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                    {isArabic ? "الويب" : "Web"}
                  </div>
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                    {isArabic ? "صالة العرض" : "Showroom"}
                  </div>
                  <div className="flex-1 rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">
                    {isArabic ? "الشركاء" : "Partners"}
                  </div>
                </div>

                <div className="text-center text-accent my-1 font-bold">↓</div>

                <div className="rounded border border-accent/40 bg-accent/10 py-1.5 text-center font-bold text-accent mb-2">
                  {isArabic ? "منصة السيارات" : "Vehicle Platform"}
                </div>

                <div className="text-center text-accent my-1 font-bold">↓</div>

                <div className="grid grid-cols-3 gap-1 text-center">
                  <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">{isArabic ? "المخزون" : "Inventory"}</div>
                  <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">{isArabic ? "سير العمل" : "Workflow"}</div>
                  <div className="rounded border border-border/80 bg-secondary/30 py-1 text-primary font-medium">{isArabic ? "العمليات" : "Operations"}</div>
                </div>
              </div>
            </div>

            <Link
              to={`/projects/${case3.slug}`}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline pt-2 border-t border-border/40"
            >
              <span>{isArabic ? "قراءة دراسة الحالة" : "Read case study"}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

