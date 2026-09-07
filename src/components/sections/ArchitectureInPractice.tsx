import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function ArchitectureInPractice() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const keyQuestions = [
    {
      num: "01",
      text: isArabic
        ? "ماذا يحدث عندما لا يتوفر نظام تابع؟"
        : "What happens when a downstream system is unavailable?",
    },
    {
      num: "02",
      text: isArabic
        ? "أين يتم فرض تكافؤ القوة (Idempotency)؟"
        : "Where is idempotency enforced?",
    },
    {
      num: "03",
      text: isArabic
        ? "ما الذي يمكن إعادة محاولته بأمان؟"
        : "What can safely be retried?",
    },
    {
      num: "04",
      text: isArabic
        ? "كيف يعرف المشغلون بحصول الفشل؟"
        : "How do operators know it failed?",
    },
    {
      num: "05",
      text: isArabic
        ? "هل استجابة 200 تعني تحقق نتيجة الأعمال بنجاح؟"
        : "Is a 200 response the same as a successful business outcome?",
    },
  ];

  return (
    <section id="architecture" className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (~30% -> 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "الهندسة المعمارية في التطبيق" : "ARCHITECTURE IN PRACTICE"}
            </div>

            <h2 className="section-h2 text-primary leading-tight">
              {isArabic
                ? "نموذج مبسط لكيفية تحليلي للأنظمة كثيفة التكامل."
                : "A simplified example of how I reason about integration-heavy systems."}
            </h2>

            <p className="text-[15.5px] text-secondary leading-relaxed font-normal">
              {isArabic
                ? "هذا ليس مشروعاً محدداً، بل تمثيل لنوع الأنظمة التي عملت عليها — منصات متعددة، تدفقات غير متزامنة، واهتمامات تشغيلية حقيقية."
                : "This isn't a specific project, but a representation of the kind of systems I've worked on — multiple platforms, asynchronous flows, and real operational concerns."}
            </p>

            <div className="pt-2">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline"
              >
                <span>
                  {isArabic
                    ? "رؤية المزيد من الملاحظات المعمارية"
                    : "See more architecture notes"}
                </span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Center Column (~42% -> 5 cols) — Styled Technical Flow Diagram */}
          <div className="lg:col-span-5 rounded-xl border border-border bg-secondary/20 p-5 font-mono text-[12.5px] relative">
            {/* Background grid texture overlay */}
            <div className="absolute inset-0 system-grid pointer-events-none opacity-20" />

            <div className="relative z-10 flex flex-col items-center space-y-3 py-2 text-center">
              {/* Commerce Platform */}
              <div className="w-52 rounded-md border border-border/80 bg-background py-2 font-bold text-primary shadow-xs">
                {isArabic ? "منصة التجارة" : "Commerce Platform"}
              </div>

              {/* Down Arrow + Label */}
              <div className="flex flex-col items-center text-[11px] text-accent">
                <span className="bg-background/80 px-2 py-0.5 rounded border border-accent/30 text-accent font-semibold">
                  {isArabic ? "متزامن (حرج)" : "Synchronous (critical)"}
                </span>
                <span className="text-sm">↓</span>
              </div>

              {/* Integration API */}
              <div className="w-60 rounded-md border border-accent/40 bg-accent/10 py-2 font-bold text-accent shadow-xs">
                {isArabic ? "واجهة التكامل API" : "Integration API"} <br />
                <span className="text-[11px] font-normal text-muted-foreground">
                  {isArabic ? "(التحقق والتحويل)" : "(Validation & Transform)"}
                </span>
              </div>

              {/* Down Arrow + Label */}
              <div className="flex flex-col items-center text-[11px] text-accent">
                <span className="bg-background/80 px-2 py-0.5 rounded border border-accent/30 text-accent font-semibold">
                  {isArabic ? "غير متزامن (أحداث)" : "Asynchronous (events)"}
                </span>
                <span className="text-sm">↓</span>
              </div>

              {/* Event Bus */}
              <div className="w-56 rounded-md border border-border/80 bg-background py-2 font-bold text-primary shadow-xs">
                {isArabic ? "ناقل الأحداث Event Bus" : "Event Bus"}
              </div>

              <div className="text-xs text-accent">↓</div>

              {/* Parallel Downstream Systems */}
              <div className="grid grid-cols-3 gap-2 w-full pt-1">
                <div className="rounded border border-border/80 bg-background py-2 font-semibold text-primary">
                  PIM
                </div>
                <div className="rounded border border-border/80 bg-background py-2 font-semibold text-primary">
                  {isArabic ? "المخزون" : "Inventory"}
                </div>
                <div className="rounded border border-border/80 bg-background py-2 font-semibold text-primary">
                  OMS
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (~28% -> 3 cols) — Soft Green Panel */}
          <div className="lg:col-span-3 rounded-xl border border-accent/30 bg-accent/5 p-5">
            <div className="text-[13px] font-mono font-semibold text-accent uppercase tracking-wider mb-3">
              {isArabic ? "أسئلة رئيسية أطرحها دائماً" : "Key questions I always ask"}
            </div>

            <div className="space-y-3">
              {keyQuestions.map((q) => (
                <div key={q.num} className="flex items-start gap-2 text-[13.5px]">
                  <span className="font-mono font-bold text-accent shrink-0">{q.num}</span>
                  <span className="text-secondary font-medium leading-snug">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

