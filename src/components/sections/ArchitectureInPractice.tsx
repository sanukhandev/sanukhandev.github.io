import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ArchitectureInPractice() {
  const { ui } = useSiteContent();

  return (
    <section id="architecture" className="py-12 md:py-16 lg:py-20 bg-secondary/10 scroll-mt-20">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={ui.architecture.eyebrow}
          title={ui.architecture.title}
          subtitle={ui.architecture.subtitle}
          align="left"
        />

        {/* THE CHALLENGE */}
        <div className="mt-8 rounded-2xl border border-border bg-background/80 p-6 sm:p-8 shadow-sm">
          <p className="text-[11px] font-semibold uppercase text-accent mb-2">
            {ui.architecture.challengeLabel}
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-primary font-medium">
            {ui.architecture.challengeText}
          </p>
        </div>

        {/* ARCHITECTURE DIAGRAM */}
        <div className="mt-8 rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
            <p className="text-[11px] font-semibold uppercase text-accent">
              {ui.architecture.topologyLabel}
            </p>
            <span className="text-xs font-mono text-muted-foreground">{ui.architecture.topologyEcosystem}</span>
          </div>

          <div className="overflow-x-auto py-4">
            <div className="min-w-[720px] flex flex-col items-center gap-4 text-center">
              {/* Top Tier: Customer */}
              <div className="w-52 rounded-xl border border-border bg-secondary/30 py-2.5 px-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">{ui.architecture.diagram.tier1Label}</span>
                <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.tier1Text}</span>
              </div>

              <ArrowRight className="h-4 w-4 text-accent/60 rotate-90" />

              {/* Tier 2: Web Experience */}
              <div className="w-60 rounded-xl border border-border bg-secondary/30 py-2.5 px-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase">{ui.architecture.diagram.tier2Label}</span>
                <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.tier2Text}</span>
              </div>

              <ArrowRight className="h-4 w-4 text-accent/60 rotate-90" />

              {/* Tier 3: Commerce APIs */}
              <div className="w-68 rounded-xl border border-accent/40 bg-accent/10 py-2.5 px-4 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase font-semibold">{ui.architecture.diagram.interfaceLabel}</span>
                <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.interfaceText}</span>
              </div>

              <ArrowRight className="h-4 w-4 text-accent/60 rotate-90" />

              {/* Tier 4: Parallel Domain Boundaries */}
              <div className="w-full flex items-center justify-center gap-4">
                <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-3">
                  <span className="block text-[10px] font-mono text-accent">{ui.architecture.diagram.domainALabel}</span>
                  <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.domainAText}</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-3">
                  <span className="block text-[10px] font-mono text-accent">{ui.architecture.diagram.domainBLabel}</span>
                  <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.domainBText}</span>
                </div>
                <div className="flex-1 rounded-xl border border-border bg-secondary/40 p-3">
                  <span className="block text-[10px] font-mono text-accent">{ui.architecture.diagram.domainCLabel}</span>
                  <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.domainCText}</span>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-accent/60 rotate-90" />

              {/* Tier 5: Commerce Core */}
              <div className="w-72 rounded-xl border border-border bg-secondary/50 py-3 px-6 shadow-sm">
                <span className="block text-[10px] font-mono text-accent uppercase font-semibold">{ui.architecture.diagram.coreLabel}</span>
                <span className="block text-sm font-extrabold text-primary">{ui.architecture.diagram.coreText}</span>
              </div>

              <ArrowRight className="h-4 w-4 text-accent/60 rotate-90" />

              {/* Tier 6: Payment / OMS / Events */}
              <div className="w-80 rounded-xl border border-border bg-background py-2.5 px-4 shadow-sm">
                <span className="block text-[10px] font-mono text-muted-foreground uppercase">{ui.architecture.diagram.integrationsLabel}</span>
                <span className="block text-xs font-bold text-primary">{ui.architecture.diagram.integrationsText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KEY DECISIONS */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.architecture.keyDecisionsLabel}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ui.architecture.keyDecisions.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-background/80 p-5 transition-all duration-300 hover:border-accent/40 shadow-sm"
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

        {/* WHY THIS ARCHITECTURE? */}
        <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase text-accent mb-2">
            {ui.architecture.whyArchitectureLabel}
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-primary font-medium">
            {ui.architecture.whyArchitectureText}
          </p>
        </div>
      </div>
    </section>
  );
}
