import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { ArrowRight, Bot, Cpu, Network, ShieldCheck, Zap, LineChart } from "lucide-react";

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const flowNodes = [
    { label: "Signals", desc: "Telemetry & Events", icon: Zap },
    { label: "Context", desc: "System Graph", icon: Network },
    { label: "Reasoning", desc: "Agent Evaluation", icon: Bot },
    { label: "Decision", desc: "Policy Guardrails", icon: ShieldCheck },
    { label: "Action", desc: "Automated Workflow", icon: Cpu },
  ];

  const exploringItems = [
    { title: "Agent Orchestration", desc: "Multi-agent task distribution and state synchronization." },
    { title: "Operational Intelligence", desc: "Real-time telemetry analysis and anomaly detection." },
    { title: "Context Retrieval", desc: "Embedding code context, system schemas, and history for reasoning." },
    { title: "Automated Reasoning", desc: "Rule-based and LLM-driven operational problem resolution." },
    { title: "Human-in-the-Loop", desc: "Controlled approval gates for high-impact system mutations." },
    { title: "Adaptive Workflows", desc: "Dynamic execution graphs that adjust to runtime failure modes." },
  ];

  return (
    <section id="zaakiy" className="py-12 md:py-16 lg:py-20 relative overflow-hidden scroll-mt-20">
      <div id="ops-intelligence" className="container-narrow">
        {/* Header & Positioning */}
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            <span>PERSONAL R&amp;D</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            <span className="brand-zaakiy text-accent">ZaakiyV3RSE</span>
          </h2>

          <p className="mt-2 text-xl font-bold text-primary">
            {isArabic
              ? "منصة ذكاء تشغيلي قائمة على الذكاء الاصطناعي."
              : "An AI-native operations intelligence platform."}
          </p>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-secondary font-normal">
            {isArabic
              ? "منصة تجريبية تستكشف كيف يمكن للوكلاء والبيانات التشغيلية والسياق الهندسي العمل معاً لاكتشاف الأحداث التشغيلية وتحليلها والاستجابة لها."
              : "An experimental platform exploring how agents, operational data and engineering context can work together to detect, reason about and respond to operational events."}
          </p>

          <div className="mt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              <span>Explore Zaakiy</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* CONCEPTUAL FLOW: Signals → Context → Reasoning → Decision → Action */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/20 p-6 sm:p-7 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            CONCEPTUAL EXECUTION FLOW
          </p>

          <div className="overflow-x-auto py-2">
            <div className="min-w-[650px] flex items-center justify-between gap-2">
              {flowNodes.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="flex items-center gap-2 flex-1">
                    <div className="w-full rounded-xl border border-border bg-background/80 p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center text-accent mb-1.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="block text-xs font-bold text-primary">{node.label}</span>
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

        {/* WHAT I'M EXPLORING */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            WHAT I'M EXPLORING
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exploringItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background/60 p-5 transition-all duration-300 hover:border-accent/40 shadow-sm"
              >
                <h4 className="text-sm font-bold text-primary mb-1.5 flex items-center gap-2">
                  <LineChart className="h-3.5 w-3.5 text-accent" />
                  {item.title}
                </h4>
                <p className="text-xs text-secondary leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
