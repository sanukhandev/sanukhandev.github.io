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
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Top Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-14 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                {isArabic ? "كيف أفكر" : "HOW I THINK"}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[10px] text-muted-foreground/60 border border-dashed border-border px-1.5 py-0.2 rounded select-none transform -rotate-1"
              >
                // 02_PRINCIPLES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08]">
              {isArabic ? (
                <>
                  العمارة ليست مجرد مخطط. <br className="hidden sm:inline" />
                  إنها القرارات التي تقف وراءه.
                </>
              ) : (
                <>
                  Architecture isn't the diagram. <br className="hidden sm:inline" />
                  It's the decisions behind it.
                </>
              )}
            </h2>
          </div>

          <div className="max-w-xl lg:pb-1">
            <p className="text-[15.5px] sm:text-[16.5px] text-secondary leading-[1.65] font-normal">
              {isArabic
                ? "على مر السنين، تعلمت أن الهندسة المعمارية الجيدة ترتبط بالحدود والمسؤوليات وسلوك النظام عند حدوث غير المتوقع أكثر من ارتباطها بالتقنية نفسها."
                : "Over the years, I've learned that good architecture is less about technology and more about boundaries, responsibilities and how the system behaves when things don't go as planned."}
            </p>
          </div>
        </div>

        {/* 6 Principles with Tactile Dashed Dividers and Field Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-border/80">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className={`flex flex-col justify-between group ${
                  idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-6 rtl:sm:pl-0 rtl:sm:pr-6 rtl:lg:pr-6" : ""
                }`}
              >
                <div>
                  {/* Header with Number & Small Icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-mono text-[11px] font-semibold text-accent/90 tracking-wider">
                      [{p.num}]
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-200">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Principle Title */}
                  <h3 className="text-[16px] font-semibold text-primary mb-1.5 group-hover:text-accent transition-colors duration-200">
                    {p.title}
                  </h3>

                  {/* Guiding Question */}
                  <p className="text-[13.5px] text-muted-foreground leading-snug font-normal">
                    {p.question}
                  </p>
                </div>

                {/* Classification tag */}
                <div className="pt-3 mt-4 border-t border-dashed border-border/40 font-mono text-[9.5px] text-muted-foreground/60 tracking-wider">
                  // {p.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(HowIThink);
