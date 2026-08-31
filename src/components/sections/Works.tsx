import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { trackEvent } from "@/utils/analytics";
import { ArrowRight, ShoppingCart, Layers, Globe, Server } from "lucide-react";

interface SystemCard {
  id: string;
  industry: string;
  title: string;
  description: string;
  contributions: string[];
  evidence: string;
  icon: typeof ShoppingCart;
  projectUrl: string;
}

const systemsData: SystemCard[] = [
  {
    id: "regional-commerce-platform",
    industry: "COMMERCE · MULTI-REGION",
    title: "Regional Enterprise Commerce Platform",
    description:
      "Multi-market regional commerce platform synchronizing product catalog, pricing, and inventory across regional markets.",
    contributions: ["Platform Engineering", "Integration", "Production Delivery"],
    evidence: "9 regional markets",
    icon: ShoppingCart,
    projectUrl: "/projects",
  },
  {
    id: "omnichannel-commerce-fabric",
    industry: "AUTOMOTIVE & ENTERPRISE COMMERCE",
    title: "Enterprise Omnichannel Commerce Fabric",
    description:
      "Event-driven integration fabric connecting ERP, PIM, and omnichannel storefronts with real-time payload validation.",
    contributions: ["Solution Architecture", "Event Streaming", "API Governance"],
    evidence: "Production Enterprise Platform",
    icon: Layers,
    projectUrl: "/projects",
  },
  {
    id: "airline-b2b-marketplace",
    industry: "TRAVEL TECH · AIRLINE AGGREGATION",
    title: "Airline NDC & Travel B2B Marketplace",
    description:
      "High-availability NDC aggregation platform handling multi-supplier airline content, pricing, and B2B booking workflows.",
    contributions: ["Platform Engineering", "NDC Integration", "B2B Workflows"],
    evidence: "Multi-Supplier Aggregation",
    icon: Globe,
    projectUrl: "/projects",
  },
  {
    id: "airport-commerce-platform",
    industry: "AIRPORT COMMERCE · TRAVEL RETAIL",
    title: "Airport Commerce & Travel Retail Platform",
    description:
      "Multi-terminal airport commerce system for real-time inventory management, order processing, and payment integrations.",
    contributions: ["Domain Architecture", "Commerce Core", "Resilient APIs"],
    evidence: "Multi-Terminal Operations",
    icon: Server,
    projectUrl: "/projects",
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
    <section id="work" className="py-12 md:py-16 lg:py-20 scroll-mt-20">
      <div id="works" className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "أنظمة الإنتاج" : "PRODUCTION PROOF"}
          title={isArabic ? "أنظمة إنتاجية مختارة" : "Selected Production Systems"}
          subtitle={
            isArabic
              ? "منصات ساهمت في هندستها، بنائها، وتسليمها عبر قطاعات التجارة، السيارات، تكنولوجيا السفر والعمليات المؤسسية."
              : "Platforms I've helped architect, build and deliver across commerce, automotive, travel technology and enterprise operations."
          }
          align="left"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {systemsData.map((sys) => {
            const Icon = sys.icon;
            return (
              <div
                key={sys.id}
                data-project-name={sys.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-6 sm:p-7 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/40 shadow-sm"
              >
                <div>
                  {/* Industry Header */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/40">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {sys.industry}
                    </span>
                    <Icon className="h-4 w-4 text-accent opacity-80" />
                  </div>

                  {/* Project Name */}
                  <h3 className="mt-4 text-xl font-bold tracking-tight text-primary sm:text-2xl group-hover:text-accent transition-colors">
                    {sys.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-secondary font-normal line-clamp-3">
                    {sys.description}
                  </p>

                  {/* MY CONTRIBUTION (Max 3 clean tags) */}
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
                </div>

                {/* Evidence & Action Link */}
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="rounded-lg bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-bold text-accent">
                    {sys.evidence}
                  </div>

                  <Link
                    to={sys.projectUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
