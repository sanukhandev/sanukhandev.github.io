import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ArchitectureInPractice() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const decisions = [
    {
      title: "Domain Boundaries",
      desc: "Separated product catalog, stock inventory, and checkout processing into autonomous service boundaries.",
    },
    {
      title: "API-First Frontend",
      desc: "Decoupled web experience, mobile endpoints, and terminal POS interfaces from core backend business logic.",
    },
    {
      title: "Commerce Authority",
      desc: "Established a single source of truth for pricing, promotion rules, and order status with event propagation.",
    },
    {
      title: "Independent Workflows",
      desc: "Asynchronous queuing for payment gateway processing, duty-free validation, and fulfillment workflows.",
    },
    {
      title: "Integration Boundaries",
      desc: "Contract-driven payload validation for SAP ERP and external supplier data synchronization.",
    },
    {
      title: "CI/CD & Observability",
      desc: "Automated deployment pipelines with centralized telemetry, structured logging, and distributed tracing.",
    },
  ];

  return (
    <section id="architecture" className="section-pad bg-secondary/20 scroll-mt-20">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "دراسة حالة معمارية" : "CASE STUDY: AIRPORT COMMERCE PLATFORM"}
          title={isArabic ? "الهندسة المعمارية في التطبيق" : "Architecture in Practice"}
          subtitle={
            isArabic
              ? "تفصيل هندسي لكيفية تصميم وتنفيذ بنية معيارية قابلة للتوسع والصيانة لمثال واقعي من أعمال الإنتاج."
              : "An engineering breakdown of how domain boundaries, API contracts, and integration layers were designed for a production commerce ecosystem."
          }
          align="left"
        />

        {/* THE CHALLENGE */}
        <div className="mt-8 rounded-2xl border border-border bg-background/80 p-6 sm:p-8 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
            THE CHALLENGE
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-primary font-medium">
            Airport retail operations require synchronized inventory and transaction processing across multiple terminal storefronts, offline-tolerant POS systems, and strict payment compliance. Legacy monoliths struggled under peak flight passenger spikes and cross-supplier catalog delays.
          </p>
        </div>

        {/* ARCHITECTURE VISUALIZATION */}
        <div className="mt-8 rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              ARCHITECTURE VISUALIZATION
            </p>
            <span className="text-xs font-mono text-muted-foreground">High-Level Event & Data Flow</span>
          </div>

          {/* Clean Lightweight SVG Flow Diagram */}
          <div className="overflow-x-auto py-4">
            <div className="min-w-[680px] flex items-center justify-between gap-3 text-center">
              {/* Node 1 */}
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">Trigger</span>
                <span className="block mt-1 text-xs font-bold text-primary">Customer &amp; POS</span>
                <span className="block text-[11px] text-secondary mt-0.5">Web / Mobile / Kiosk</span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />

              {/* Node 2 */}
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">Interface</span>
                <span className="block mt-1 text-xs font-bold text-primary">Commerce APIs</span>
                <span className="block text-[11px] text-secondary mt-0.5">REST / GraphQL Gateway</span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />

              {/* Node 3 */}
              <div className="flex-1 rounded-xl border border-accent/40 bg-accent/10 p-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase font-semibold">Core Domain</span>
                <span className="block mt-1 text-xs font-bold text-primary">Domain Capabilities</span>
                <span className="block text-[11px] text-secondary mt-0.5">Catalog · Stock · Orders</span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />

              {/* Node 4 */}
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">Core Services</span>
                <span className="block mt-1 text-xs font-bold text-primary">Commerce Engine</span>
                <span className="block text-[11px] text-secondary mt-0.5">Pricing &amp; Promo Rules</span>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-accent/60" />

              {/* Node 5 */}
              <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">Integrations</span>
                <span className="block mt-1 text-xs font-bold text-primary">Payment &amp; ERP</span>
                <span className="block text-[11px] text-secondary mt-0.5">SAP / Gateway / OMS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURAL DECISIONS */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            ARCHITECTURAL DECISIONS
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decisions.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background/70 p-5 transition-all duration-300 hover:border-accent/40"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <h4 className="text-sm font-bold text-primary">
                    0{idx + 1}. {item.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-secondary font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RESULT */}
        <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-2">
            RESULT &amp; OPERATIONAL IMPACT
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-primary font-medium">
            The decoupled architecture enabled zero-downtime deployments, independent scaling for high-concurrency payment processing, and streamlined operational ownership across engineering teams.
          </p>
        </div>
      </div>
    </section>
  );
}
