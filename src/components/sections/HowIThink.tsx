import { memo } from "react";
import { Database, AlertTriangle, ArrowLeftRight, Box, Clock, Sliders } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export function HowIThink() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const principles = [
    {
      num: "01",
      tag: "OWNERSHIP",
      icon: Database,
      title: isArabic ? "الملكية" : "Ownership",
      question: isArabic ? "من يمتلك البيانات؟" : "Who owns the data?",
    },
    {
      num: "02",
      tag: "FAILURE_MODES",
      icon: AlertTriangle,
      title: isArabic ? "الأعطال" : "Failure",
      question: isArabic ? "ماذا يحدث عندما تختفي الأنظمة التابعة؟" : "What happens when dependencies disappear?",
    },
    {
      num: "03",
      tag: "CONSISTENCY",
      icon: ArrowLeftRight,
      title: isArabic ? "الاتساق" : "Consistency",
      question: isArabic ? "متى يمكننا الاعتماد على الاتساق النهائي؟" : "When can we be eventually consistent?",
    },
    {
      num: "04",
      tag: "BOUNDARIES",
      icon: Box,
      title: isArabic ? "الحدود" : "Boundaries",
      question: isArabic ? "أي المسؤوليات تنتمي معاً؟" : "Which responsibilities belong together?",
    },
    {
      num: "05",
      tag: "OPS // 03:00",
      icon: Clock,
      title: isArabic ? "العمليات" : "Operations",
      question: isArabic ? "كيف ندعم النظام في الثالثة فجراً؟" : "How do we support it at 03:00?",
    },
    {
      num: "06",
      tag: "TRADE_OFFS",
      icon: Sliders,
      title: isArabic ? "المفاضلات" : "Trade-offs",
      question: isArabic ? "ما الذي نتعمد عدم تحسينه الآن؟" : "What are we deliberately not optimizing?",
    },
  ];

  return (
    <section className="studio-thinking">
      <div className="studio-shell studio-thinking-layout">
        <header className="studio-thinking-intro">
          <div className="studio-eyebrow"><span>{isArabic ? "كيف أفكر" : "HOW I THINK"}</span><span aria-hidden="true">/ 02_PRINCIPLES</span></div>
          <h2>{isArabic ? "العمارة ليست مجرد مخطط. إنها القرارات التي تقف وراءه." : "Architecture isn't the diagram. It's the decisions behind it."}</h2>
          <p>{isArabic
            ? "على مر السنين، تعلمت أن الهندسة المعمارية الجيدة ترتبط بالحدود والمسؤوليات وسلوك النظام عند حدوث غير المتوقع أكثر من ارتباطها بالتقنية نفسها."
            : "Over the years, I've learned that good architecture is less about technology and more about boundaries, responsibilities and how the system behaves when things don't go as planned."}</p>
        </header>
        <div className="studio-principle-list">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <article key={p.num} className="studio-principle-row">
                <div className="studio-principle-label"><span>{p.num}</span><Icon aria-hidden="true" size={20} /></div>
                <div className="studio-principle-copy"><h3>{p.title}</h3><p>{p.question}</p></div>
                <span className="studio-principle-tag">{p.tag}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(HowIThink);
