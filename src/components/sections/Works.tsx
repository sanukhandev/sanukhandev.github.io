import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { trackEvent } from "@/utils/analytics";
import { ArrowRight, ShoppingCart, Layers, Globe, Server } from "lucide-react";

const systemIcons: Record<string, typeof ShoppingCart> = {
  "regional-commerce-platform": ShoppingCart,
  "omnichannel-commerce-fabric": Layers,
  "airline-b2b-marketplace": Globe,
  "airport-commerce-platform": Server,
};

export default function Works() {
  const { ui } = useSiteContent();

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
          eyebrow={ui.works.eyebrow}
          title={ui.works.title}
          subtitle={ui.works.subtitle}
          align="left"
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {ui.works.systemsData.map((sys) => {
            const Icon = systemIcons[sys.id] || ShoppingCart;
            return (
              <div
                key={sys.id}
                data-project-name={sys.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-6 sm:p-7 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/40 shadow-sm"
              >
                <div>
                  {/* Industry Header */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/40">
                    <span className="text-[11px] font-semibold uppercase text-accent">
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
                    <p className="text-[11px] font-semibold uppercase text-muted-foreground mb-2">
                      {ui.works.myContributionLabel}
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform"
                  >
                    <span>{ui.works.viewProject}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
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
