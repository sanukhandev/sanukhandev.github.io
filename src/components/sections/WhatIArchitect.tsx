import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Cpu, ShoppingBag, Network, Bot } from "lucide-react";

const domainIcons: Record<string, typeof Cpu> = {
  "platform-architecture": Cpu,
  "commerce-transaction": ShoppingBag,
  "enterprise-integration": Network,
  "ai-enabled-engineering": Bot,
};

export default function WhatIArchitect() {
  const { ui } = useSiteContent();

  return (
    <section id="capabilities" className="py-12 md:py-16 lg:py-20 scroll-mt-20">
      <div id="stack" className="container-narrow">
        <SectionHeading
          eyebrow={ui.whatIArchitect.eyebrow}
          title={ui.whatIArchitect.title}
          subtitle={ui.whatIArchitect.subtitle}
          align="left"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ui.whatIArchitect.domainsData.map((domain) => {
            const Icon = domainIcons[domain.id] || Cpu;
            return (
              <div
                key={domain.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-6 sm:p-7 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/40 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
                      {domain.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-secondary font-normal">
                    {domain.description}
                  </p>
                </div>

                {/* Max 3 capability labels */}
                <div className="mt-6 pt-4 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-[11px] font-medium text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
