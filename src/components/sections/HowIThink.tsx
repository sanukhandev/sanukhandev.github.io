import { Database, AlertTriangle, ArrowLeftRight, Box, TrendingUp, Sliders } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function HowIThink() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const principles = [
    {
      icon: Database,
      title: isArabic ? "الملكية" : "Ownership",
      question: isArabic ? "من يمتلك البيانات؟" : "Who owns the data?",
    },
    {
      icon: AlertTriangle,
      title: isArabic ? "الأعطال" : "Failure",
      question: isArabic ? "ماذا يحدث عندما يختفي نظام تابع؟" : "What happens when a dependency disappears?",
    },
    {
      icon: ArrowLeftRight,
      title: isArabic ? "الاتساق" : "Consistency",
      question: isArabic ? "أين يمكننا أن نكون غير متسقين مؤقتاً؟" : "Where can we be temporarily wrong?",
    },
    {
      icon: Box,
      title: isArabic ? "الحدود" : "Boundaries",
      question: isArabic ? "أي المسؤوليات تنتمي معاً؟" : "Which responsibilities belong together?",
    },
    {
      icon: TrendingUp,
      title: isArabic ? "العمليات" : "Operations",
      question: isArabic ? "كيف نعرف أن النظام عمل بالفعل؟" : "How do we know it actually worked?",
    },
    {
      icon: Sliders,
      title: isArabic ? "المفاضلات" : "Trade-offs",
      question: isArabic ? "ما الذي لا نقوم بتحسينه؟" : "What are we not optimizing?",
    },
  ];

  return (
    <section className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        {/* Top Header Grid */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12 mb-12">
          <div className="flex-1 max-w-xl">
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em] mb-2">
              {isArabic ? "كيف أفكر في الأنظمة" : "HOW I THINK ABOUT SYSTEMS"}
            </div>
            <h2 className="section-h2 text-primary leading-tight">
              {isArabic ? (
                "العمارة ليست مجرد مخطط. إنها القرارات التي تقف وراءه."
              ) : (
                <>
                  Architecture isn't the diagram. <br className="hidden sm:block" />
                  It's the decisions behind it.
                </>
              )}
            </h2>
          </div>

          <div className="flex-1 max-w-lg">
            <p className="text-[16.5px] text-secondary leading-[1.65] font-normal">
              {isArabic
                ? "على مر السنين، تعلمت أن الهندسة المعمارية الجيدة ترتبط بالحدود والمسؤوليات وسلوك النظام عند حدوث غير المتوقع أكثر من ارتباطها بالتقنية نفسها."
                : "Over the years, I've learned that good architecture is less about technology and more about boundaries, responsibilities and how the system behaves when things don't go as planned."}
            </p>
          </div>
        </div>

        {/* 6-Column Horizontal Grid with Line Icons and Vertical Dividers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className={`flex flex-col ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-4 lg:pl-6 rtl:sm:pl-0 rtl:sm:pr-4 rtl:lg:pr-6" : ""
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent mb-3">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="text-[15.5px] font-semibold text-primary mb-1">
                  {p.title}
                </h3>

                <p className="text-[13.5px] text-muted-foreground leading-snug font-normal">
                  {p.question}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

