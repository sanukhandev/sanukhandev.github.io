import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GitMerge, Network, Cpu, AlertCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

export function ZaakiyHighlights() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const capabilities = [
    { icon: GitMerge, name: isArabic ? "ربط الأحداث" : "Event correlation", code: "CORR_01" },
    { icon: Network, name: isArabic ? "السياق التشغيلي" : "Operational context", code: "CTX_02" },
    { icon: Cpu, name: isArabic ? "ذكاء تدفق العمل" : "Workflow intelligence", code: "FLOW_03" },
    { icon: AlertCircle, name: isArabic ? "اكتشاف الشذوذ" : "Anomaly detection", code: "ANOM_04" },
    { icon: Bot, name: isArabic ? "التشخيص المؤتمت" : "Automated diagnostics", code: "DIAG_05" },
  ];

  return (
    <section id="zaakiy" className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Distinct Architectural Notebook Lab Container */}
        <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-6 sm:p-9 lg:p-11 relative overflow-hidden select-none">
          {/* Corner Crosshairs */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 left-2.5 font-mono text-[11px] text-accent/50 select-none pointer-events-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 font-mono text-[11px] text-accent/50 select-none pointer-events-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 left-2.5 font-mono text-[11px] text-accent/50 select-none pointer-events-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 font-mono text-[11px] text-accent/50 select-none pointer-events-none"
          >
            +
          </span>

          {/* Subtle geometric background aura */}
          <div
            aria-hidden="true"
            className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Column (7 cols): Content & Capabilities */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Eyebrow & Lab Stamp */}
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <div className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                  {isArabic ? "المختبر / البحث والتطوير" : "R&D LAB // SYSTEMS EXPERIMENT"}
                </div>
                {/* Rotated Experimental Stamp */}
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] text-accent border border-dashed border-accent/50 bg-background/80 px-2 py-0.5 rounded transform -rotate-2 select-none"
                >
                  EXP_V3 // ACTIVE_LAB
                </span>
              </div>

              {/* Branded Title with Anta font and animated gradient */}
              <div className="mb-3">
                <span className="brand-zaakiy text-3xl sm:text-4xl">
                  ZaakiyV3RSE
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-semibold text-primary tracking-[-0.035em] leading-[1.12] mb-4">
                {isArabic
                  ? "هل يمكن للنظام فهم ما إذا كان قد حقق ما كُلّف به بالفعل؟"
                  : "Can a system understand whether it accomplished what it was supposed to do?"}
              </h2>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16.5px] text-secondary leading-relaxed font-normal mb-8 max-w-xl">
                {isArabic
                  ? "تجربة هندسية حول الذكاء التشغيلي المدعوم بالذكاء الاصطناعي، وربط السياق، والوعي بالأنظمة لمعرفة ما إذا كانت أهداف الأعمال قد تحققت فعلاً وليس مجرد استجابة 200 من واجهة برمجة التطبيقات."
                  : "An experiment around AI-powered operational intelligence, graph context correlation and semantic system awareness — moving beyond HTTP 200 status codes to business outcome guarantees."}
              </p>

              {/* Capabilities List */}
              <div className="w-full mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    {isArabic ? "القدرات الأساسية:" : "Core Capabilities:"}
                  </span>
                  <span className="text-[10px] font-mono text-accent">5 TELEMETRY VECTORS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {capabilities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-dashed border-border/80 bg-background/70 text-[13.5px] font-medium text-primary hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-accent/15 text-accent shrink-0">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground/60">{item.code}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="h-11 rounded-lg bg-accent px-6 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 shadow-xs gap-2"
              >
                <Link to="/projects/zaakiy-v3rse">
                  <span>{isArabic ? "استكشف البحث والتطوير" : "Explore the research"}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>

            {/* Right Column (5 cols): Abstract SVG Architecture Blueprint */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-md rounded-xl border border-dashed border-accent/40 bg-background/95 p-6 sm:p-7 shadow-xs font-mono text-xs relative">
                {/* Visual SVG Geometric System Topology */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-border/80 text-muted-foreground">
                  <span className="brand-zaakiy text-[12px] uppercase">Zaakiy Context Engine</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    ENGINE // LIVE
                  </span>
                </div>

                {/* Conceptual Blueprint Layers */}
                <div className="space-y-3">
                  {/* Layer 1: Operational Signals */}
                  <div className="rounded-lg border border-dashed border-border/90 bg-surface/80 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground">LAYER 01</div>
                      <div className="font-semibold text-primary text-[12.5px]">
                        {isArabic ? "إشارات التشغيل" : "Operational Signals"}
                      </div>
                    </div>
                    <div className="text-[10.5px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
                      Logs · Traces · Spans
                    </div>
                  </div>

                  {/* Flow connector */}
                  <div className="flex justify-center text-accent/60 text-xs font-mono">↓ [CORRELATE]</div>

                  {/* Layer 2: Graph Context Correlation */}
                  <div className="rounded-lg border border-accent/50 bg-accent/15 p-3 flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-[10px] text-accent/80 font-bold">LAYER 02</div>
                      <div className="font-semibold text-accent text-[12.5px]">
                        {isArabic ? "ربط سياق النظام" : "Graph Context Correlation"}
                      </div>
                    </div>
                    <div className="text-[10.5px] text-accent font-bold">
                      Domain Awareness
                    </div>
                  </div>

                  {/* Flow connector */}
                  <div className="flex justify-center text-accent/60 text-xs font-mono">↓ [VERIFY]</div>

                  {/* Layer 3: Outcome Verification */}
                  <div className="rounded-lg border border-dashed border-border/90 bg-surface/80 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground">LAYER 03</div>
                      <div className="font-semibold text-primary text-[12.5px]">
                        {isArabic ? "التحقق من نتيجة الأعمال" : "Outcome Verification"}
                      </div>
                    </div>
                    <div className="text-[10.5px] font-medium text-primary bg-secondary/20 px-2 py-0.5 rounded">
                      Intent vs Reality
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="mt-4 pt-3 border-t border-dashed border-border/70 flex items-center justify-between text-[10px] text-muted-foreground/75">
                  <span>SPEC: AUTONOMOUS_CORRELATION</span>
                  <span>v3.4.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ZaakiyHighlights);
