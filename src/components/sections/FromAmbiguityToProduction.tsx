import { useLocale } from "@/hooks/use-locale";
import { ArrowRight, FileCheck, Layers, GitBranch, Terminal, CheckCircle, Activity, Lightbulb } from "lucide-react";

export default function FromAmbiguityToProduction() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const flowNodes = [
    { title: "Business Problem", desc: "Requirements & Scope", icon: Lightbulb },
    { title: "Domain Model", desc: "Boundaries & Schemas", icon: Layers },
    { title: "Architecture", desc: "Contracts & Topology", icon: GitBranch },
    { title: "Delivery Plan", desc: "Milestones & Guardrails", icon: FileCheck },
    { title: "Implementation", desc: "Hands-on Code & Review", icon: Terminal },
    { title: "Production", desc: "Deploy & Release", icon: CheckCircle },
    { title: "Observation", desc: "Telemetry & Evolution", icon: Activity },
  ];

  return (
    <section id="how-i-work" className="section-pad scroll-mt-20">
      <div className="container-narrow">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
            DELIVERY ENGAGEMENT MODEL
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            {isArabic ? "من الغموض إلى الإنتاج" : "From Ambiguity to Production"}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary font-medium">
            {isArabic
              ? "أظل مشاركاً إلى ما بعد مخططات الهندسة المعمارية — أعمل عبر المتطلبات، القرارات الهندسية، التنفيذ البرمجي، التسليم، والتحقق في بيئة الإنتاج."
              : "I stay involved beyond architecture diagrams — working across requirements, engineering decisions, implementation, delivery and production validation."}
          </p>
        </div>

        {/* Visual Flow Nodes */}
        <div className="mt-10 rounded-2xl border border-border bg-secondary/20 p-6 sm:p-8 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-6">
            END-TO-END ARCHITECTURAL OWNERSHIP FLOW
          </p>

          <div className="overflow-x-auto py-2">
            <div className="min-w-[850px] flex items-center justify-between gap-2">
              {flowNodes.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <div key={node.title} className="flex items-center gap-2 flex-1">
                    <div className="w-full rounded-xl border border-border bg-background/80 p-3.5 text-center shadow-sm">
                      <div className="flex items-center justify-center text-accent mb-1.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="block text-xs font-bold text-primary">{node.title}</span>
                      <span className="block text-[10px] text-muted-foreground mt-0.5">{node.desc}</span>
                    </div>
                    {idx < flowNodes.length - 1 && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
