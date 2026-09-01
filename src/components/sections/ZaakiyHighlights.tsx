import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { ArrowRight, Bot, Cpu, Network, ShieldCheck, Zap, LineChart } from "lucide-react";

const flowIcons = [Zap, Network, Bot, ShieldCheck, Cpu];

export default function ZaakiyHighlights() {
  const { ui } = useSiteContent();

  return (
    <section id="zaakiy" className="py-12 md:py-16 lg:py-20 relative overflow-hidden scroll-mt-20">
      <div id="ops-intelligence" className="container-narrow">
        {/* Header & Positioning */}
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase text-accent">
            <span>{ui.zaakiy.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            <span className="brand-zaakiy text-accent">{ui.zaakiy.title}</span>
          </h2>

          <p className="mt-2 text-xl font-bold text-primary">
            {ui.zaakiy.subtitle}
          </p>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-secondary font-normal">
            {ui.zaakiy.supporting}
          </p>

          <div className="mt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              <span>{ui.zaakiy.exploreLink}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* CONCEPTUAL FLOW: Signals → Context → Reasoning → Decision → Action */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/20 p-6 sm:p-7 shadow-sm">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.zaakiy.flowEyebrow}
          </p>

          <div className="overflow-x-auto py-2">
            <div className="min-w-[650px] flex items-center justify-between gap-2">
              {ui.zaakiy.flowNodes.map((node, idx) => {
                const Icon = flowIcons[idx] || Zap;
                return (
                  <div key={node.label} className="flex items-center gap-2 flex-1">
                    <div className="w-full rounded-xl border border-border bg-background/80 p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center text-accent mb-1.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="block text-xs font-bold text-primary">{node.label}</span>
                      <span className="block text-[10px] text-muted-foreground mt-0.5">{node.desc}</span>
                    </div>
                    {idx < ui.zaakiy.flowNodes.length - 1 && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent/60 rtl:rotate-180" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* WHAT I'M EXPLORING */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.zaakiy.exploringEyebrow}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ui.zaakiy.exploringItems.map((item) => (
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
