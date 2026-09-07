import { useLocale } from "@/hooks/use-locale";

export default function ProblemsSection() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const problems = [
    {
      num: "01",
      title: isArabic
        ? "أنظمة تجاوزت معماريتها الأصلية"
        : "Systems that have outgrown their original architecture",
      description: isArabic
        ? "فك تشابك التبعيات، وتحديد اختناقات الأداء، ووضع مسار عملي دون ادعاء إمكانية إعادة كتابة كل شيء من الصفر."
        : "Untangling dependencies, finding bottlenecks and defining a practical path forward without pretending everything can simply be rewritten.",
    },
    {
      num: "02",
      title: isArabic
        ? "أنظمة مؤسسية تحتاج للتواصل فيما بينها"
        : "Enterprise systems that need to talk to each other",
      description: isArabic
        ? "تحديد الملكية والعقود وحدود التكامل عبر ERP و PIM والتجارة و OMS والمنصات المخصصة."
        : "Defining ownership, contracts and integration boundaries across ERP, PIM, commerce, OMS and custom platforms.",
    },
    {
      num: "03",
      title: isArabic
        ? "منصات تؤثر فيها الأعطال مباشرة على الأعمال"
        : "Platforms where failure matters",
      description: isArabic
        ? "تصميم عمليات إعادة المحاولة وتكافؤ القوة والقابلية للملاحظة والسلوك المتدهور بدلاً من افتراض استجابة كل نظام تابع."
        : "Designing retries, idempotency, observability and degraded behaviour instead of assuming every dependency will always respond.",
    },
    {
      num: "04",
      title: isArabic
        ? "فرق تنتقل من تسليم الميزات إلى تفكير المنصات"
        : "Teams moving from feature delivery to platform thinking",
      description: isArabic
        ? "مساعدة القرارات الهندسية على مراعاة القابلية للتشغيل والصيانة والتوسع والفرق التي ستتولى النظام لاحقاً."
        : "Helping engineering decisions account for operability, maintainability, scale and the teams that will own the system later.",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-secondary/15 border-t border-border/60">
      <div className="container-narrow">
        <div className="max-w-3xl mb-10">
          <h2 className="section-h2 text-primary">
            {isArabic ? "المشكلات التي يُطلب مني التعامل معها" : "Problems I tend to get pulled into"}
          </h2>
        </div>

        <div className="space-y-6 divide-y divide-border/60">
          {problems.map((p) => (
            <div key={p.num} className="pt-6 first:pt-0 flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <span className="w-[50px] text-[14px] font-mono font-bold text-accent shrink-0 pt-0.5">
                [{p.num}]
              </span>
              <div className="space-y-1.5 max-w-[800px]">
                <h3 className="text-[17.5px] font-semibold text-primary">
                  {p.title}
                </h3>
                <p className="text-[15.5px] text-secondary leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

