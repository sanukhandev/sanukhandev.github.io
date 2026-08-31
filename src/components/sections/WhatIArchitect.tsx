import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Cpu, ShoppingBag, Network, Bot } from "lucide-react";

interface Domain {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: typeof Cpu;
}

const domainsData: Domain[] = [
  {
    id: "platform-architecture",
    title: "Platform Architecture",
    description:
      "Distributed systems, APIs, service boundaries, event-driven workflows and integration architecture.",
    tags: ["Distributed Systems", "Event-Driven", "Microservices", "API Design"],
    icon: Cpu,
  },
  {
    id: "commerce-transaction",
    title: "Commerce & Transaction Systems",
    description:
      "Product, inventory, booking, checkout, payment and order-management workflows.",
    tags: ["PIM", "Order Management", "Payment Gateways", "Catalog Sync"],
    icon: ShoppingBag,
  },
  {
    id: "enterprise-integration",
    title: "Enterprise Integration",
    description:
      "Legacy modernization, internal platforms, B2B integrations and operational automation.",
    tags: ["SAP Integration", "Serverless", "Contract Validation", "Azure"],
    icon: Network,
  },
  {
    id: "ai-enabled-engineering",
    title: "AI-Enabled Engineering",
    description:
      "Agentic workflows, retrieval systems, engineering intelligence and AI-assisted operations.",
    tags: ["Agentic Workflows", "RAG", "Context Orchestration", "AI Automation"],
    icon: Bot,
  },
];

export default function WhatIArchitect() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="capabilities" className="section-pad scroll-mt-20">
      <div id="stack" className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "مجالات الهندسة" : "CORE DOMAINS"}
          title={isArabic ? "ما أقوم بهندسته" : "What I Architect"}
          subtitle={
            isArabic
              ? "التركيز على حل المشكلات المعقدة وتصميم البنى التحتية القابلة للتوسع والصيانة للمنصات المؤسسية."
              : "Four primary engineering domains where I design, structure, and deliver production systems."
          }
          align="left"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {domainsData.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/50 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors">
                      {domain.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-secondary font-normal">
                    {domain.description}
                  </p>
                </div>

                {/* Secondary tags supporting the story */}
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
