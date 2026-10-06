import { memo } from "react";
import { useLocale } from "@/hooks/use-locale";

export function ProblemsSection() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const problems = [
    {
      num: "01",
      code: "DRIFT_RESOLUTION",
      title: isArabic
        ? "أنظمة تجاوزت معماريتها الأصلية"
        : "Systems that outgrow their original architecture",
      description: isArabic
        ? "فك تشابك التبعيات، وتحديد اختناقات الأداء، ووضع مسار عملي دون ادعاء إمكانية إعادة كتابة كل شيء من الصفر."
        : "Untangling dependencies, finding bottlenecks and defining a practical path forward without claiming you can rewrite from scratch.",
    },
    {
      num: "02",
      code: "HETEROGENEOUS_INTEGRATION",
      title: isArabic
        ? "أنظمة مؤسسية تحتاج للتواصل فيما بينها"
        : "Enterprise systems that need to talk to each other",
      description: isArabic
        ? "ربط المنصات عبر أنظمة ERP و PIM والتجارة و OMS والأنظمة المخصصة."
        : "Connecting platforms across ERP, PIM, commerce, OMS and legacy custom monoliths.",
    },
    {
      num: "03",
      code: "SLA_CRITICALITY",
      title: isArabic
        ? "منصات تؤثر فيها الأعطال مباشرة على الأعمال"
        : "Platforms where failure matters",
      description: isArabic
        ? "تصميم أنظمة موثوقة وقابلة للملاحظة وقادرة على الصمود التشغيلي."
        : "Designing reliable, observable and operationally resilient systems that handle partial degradations gracefully.",
    },
    {
      num: "04",
      code: "PLATFORM_MIGRATION",
      title: isArabic
        ? "فرق تنتقل من تسليم الميزات إلى تفكير المنصات"
        : "Teams moving from feature delivery to platform thinking",
      description: isArabic
        ? "مساعدة الفرق على مراعاة القابلية للتشغيل والصيانة والتطور طويل الأجل."
        : "Helping teams account for operability, maintainability, reusable capabilities and long-term evolution.",
    },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "المشكلات التي أتعامل معها" : "PROBLEMS I GET PULLED INTO"}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-[10px] text-muted-foreground/75 border border-dashed border-border px-1.5 py-0.2 rounded transform -rotate-1 select-none"
            >
              /* field dispatches */
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08]">
            {isArabic ? "المشكلات التي يُطلب مني التعامل معها." : "Problems I get pulled into."}
          </h2>
        </div>

        {/*
          4-Column Editorial Notebook Layout:
          Desktop: 4 columns with dashed dividers
          Tablet: 2 columns
          Mobile: 1 column
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border/80">
          {problems.map((p, idx) => (
            <div
              key={p.num}
              className={`flex flex-col justify-between group ${
                idx > 0 ? "pt-6 md:pt-0 md:pl-6 lg:pl-6 rtl:md:pl-0 rtl:md:pr-6 rtl:lg:pr-6" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="font-semibold text-accent/90 tracking-wider">
                    [ DISPATCH // {p.num} ]
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 border border-border/60 px-1.5 py-0.2 rounded">
                    {p.code}
                  </span>
                </div>

                <h3 className="text-[19px] sm:text-[20px] font-semibold text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
                  {p.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-secondary leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>

              {/* Subtle drafting tick line at bottom */}
              <div className="pt-4 mt-4 border-t border-dashed border-border/40 font-mono text-[10px] text-muted-foreground/50">
                STATUS: TRIAGED & SOLVED
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProblemsSection);
