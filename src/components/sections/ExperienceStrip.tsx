import { useLocale } from "@/hooks/use-locale";

export default function ExperienceStrip() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const items = [
    {
      label: isArabic ? "13+ سنة" : "13+ years",
      value: isArabic ? "بناء أنظمة إنتاجية" : "Building production systems"
    },
    {
      label: isArabic ? "تكامل المؤسسات" : "Enterprise Integration",
      value: isArabic ? "ERP · PIM · التجارة · OMS" : "ERP · PIM · Commerce · OMS"
    },
    {
      label: isArabic ? "المجالات" : "Domains",
      value: isArabic ? "التجزئة · السيارات · الطيران · SaaS" : "Retail · Automotive · Airline · SaaS"
    },
    {
      label: isArabic ? "العمارة المعمارية" : "Architecture",
      value: isArabic ? "سحابية · موزعة · قائمة على الأحداث" : "Cloud · Distributed · Event-driven"
    }
  ];

  return (
    <section className="py-6 border-y border-border/60 bg-secondary/10">
      <div className="container-narrow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {items.map((item, idx) => (
            <div
              key={item.label}
              className={`flex flex-col justify-center ${
                idx > 0 ? "pt-4 sm:pt-0 sm:pl-6 lg:pl-8 rtl:sm:pl-0 rtl:sm:pr-6 rtl:lg:pr-8" : ""
              }`}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                {item.label}
              </span>
              <span className="mt-1 text-sm font-semibold text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

