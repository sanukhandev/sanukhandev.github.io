import { useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { trackEvent } from "@/utils/analytics";
import { Layers, Server, ShoppingCart, Globe } from "lucide-react";

interface ProductionSystem {
  id: string;
  industry: string;
  title: string;
  description: string;
  contributions: string[];
  techContext: string[];
  outcome: string;
  icon: typeof ShoppingCart;
}

const systemsData: ProductionSystem[] = [
  {
    id: "m-and-s-commerce",
    industry: "RETAIL COMMERCE / MULTI-REGION",
    title: "Marks & Spencer Regional Commerce Platform",
    description:
      "Enterprise PIM integration fabric synchronizing product catalog, pricing, and inventory across 9 regional markets.",
    contributions: [
      "Architecture",
      "Platform Engineering",
      "API Integration",
      "Production Delivery",
    ],
    techContext: [
      "Azure Event Hubs",
      "Kafka",
      "Node.js",
      "Azure Functions",
      "SAP",
      "Shopify",
    ],
    outcome: "9 Regional Markets · High-Throughput Event Synchronization",
    icon: ShoppingCart,
  },
  {
    id: "tradepoint-omnichannel",
    industry: "AUTOMOTIVE & ENTERPRISE COMMERCE",
    title: "Al-Futtaim TradePoint & Omnichannel Integration",
    description:
      "Event-driven integration fabric connecting SAP ERP, PIM, and omnichannel storefronts with real-time payload validation.",
    contributions: [
      "Solution Architecture",
      "Event Streaming",
      "Enterprise Integration",
      "API Governance",
    ],
    techContext: [
      "Kafka",
      "RabbitMQ",
      "Node.js",
      "Kubernetes",
      "Kibo Commerce",
      "SAP",
    ],
    outcome: "Production Platform · Unified Omnichannel Commerce",
    icon: Layers,
  },
  {
    id: "tpconnects-marketplace",
    industry: "TRAVEL TECH / AIRLINE AGGREGATION",
    title: "TPConnects Airline B2B Content Marketplace",
    description:
      "High-availability NDC aggregation platform handling multi-supplier airline content, pricing, and B2B booking workflows.",
    contributions: [
      "Platform Engineering",
      "NDC Integration",
      "Microservices",
      "B2B Workflows",
    ],
    techContext: [
      "Node.js",
      "Java Microservices",
      "NDC APIs",
      "React",
      "REST APIs",
    ],
    outcome: "Production B2B Marketplace · Multi-Supplier Aggregation",
    icon: Globe,
  },
  {
    id: "airport-commerce",
    industry: "AIRPORT COMMERCE / TRAVEL RETAIL",
    title: "Airport Commerce & Duty-Free Platform",
    description:
      "Multi-terminal airport commerce system for real-time inventory management, order processing, and payment gateway integrations.",
    contributions: [
      "Domain Architecture",
      "Commerce Core",
      "Payment Integration",
      "Resilient APIs",
    ],
    techContext: [
      "Node.js",
      "Microservices",
      "API Gateway",
      "Event Streaming",
      "Payment APIs",
    ],
    outcome: "Multi-Terminal Retail Operations · Production Systems",
    icon: Server,
  },
];

export default function Works() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const trackedProjects = new Set<string>();
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#work [data-project-name]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const projectName =
            entry.target.getAttribute("data-project-name") || "";
          if (!projectName || trackedProjects.has(projectName)) {
            return;
          }

          trackedProjects.add(projectName);
          trackEvent("project_view", { project_name: projectName });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="section-pad scroll-mt-20">
      <div id="works" className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "أنظمة الإنتاج" : "PRODUCTION PROOF"}
          title={isArabic ? "أنظمة إنتاجية مختارة" : "Selected Production Systems"}
          subtitle={
            isArabic
              ? "منصات ساهمت في هندستها، بنائها، وتسليمها عبر قطاعات التجارة، السيارات، السفر والعمليات المؤسسية."
              : "Platforms I've helped architect, build and deliver across commerce, automotive, travel and enterprise operations."
          }
          align="left"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {systemsData.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.id}
                data-project-name={sys.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/60 shadow-sm"
              >
                <div>
                  {/* Industry / System Type Header */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/50">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {sys.industry}
                    </span>
                    <Icon className="h-4 w-4 text-accent opacity-80" />
                  </div>

                  {/* Project Name */}
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-primary sm:text-2xl group-hover:text-accent transition-colors">
                    {sys.title}
                  </h3>

                  {/* One-sentence explanation */}
                  <p className="mt-3 text-sm leading-relaxed text-secondary font-normal">
                    {sys.description}
                  </p>

                  {/* MY CONTRIBUTION */}
                  <div className="mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      MY CONTRIBUTION
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sys.contributions.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* TECHNICAL CONTEXT */}
                  <div className="mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      TECHNICAL CONTEXT
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {sys.techContext.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-background/60 px-2.5 py-0.5 text-xs text-secondary font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* OUTCOME / SCALE */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    OUTCOME / SCALE
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    {sys.outcome}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
