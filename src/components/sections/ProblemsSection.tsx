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
    <section className="studio-problems">
      <div className="studio-shell">
        <header className="studio-section-heading studio-problems-intro">
          <div>
            <div className="studio-eyebrow"><span>{isArabic ? "المشكلات التي أتعامل معها" : "PROBLEMS I GET PULLED INTO"}</span><span aria-hidden="true">/ FIELD DISPATCHES</span></div>
            <h2>{isArabic ? "المشكلات التي يُطلب مني التعامل معها." : "Problems I get pulled into."}</h2>
          </div>
        </header>
        <div className="studio-problem-list">
          {problems.map((p) => (
            <article className="studio-problem-item" key={p.num}>
              <div className="studio-problem-index">{p.num}<span>{p.code}</span></div>
              <div className="studio-problem-detail"><h3>{p.title}</h3><p>{p.description}</p></div>
              <span className="studio-problem-status">STATUS: TRIAGED &amp; SOLVED</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProblemsSection);
