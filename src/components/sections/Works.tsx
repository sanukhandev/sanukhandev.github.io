import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Webhook, Boxes } from "lucide-react";
import { type WorkCategory } from "@/data/siteData";
import { useSiteContent } from "@/data/siteContent";
import { Button } from "@/components/ui/button";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";
import { SectionHeading, TechTag } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/utils/analytics";

const categoryIcons: Record<string, ComponentType<{ className?: string }>> = {
  Commerce: ShoppingCart,
  Integration: Webhook,
  Platform: Boxes,
};

export default function Works() {
  const { works, workCategories, ui } = useSiteContent();
  const [active, setActive] = useState<WorkCategory>("All");

  const filtered = useMemo(
    () =>
      active === "All" ? works : works.filter((w) => w.category === active),
    [active, works],
  );

  const galleryHighlights = useMemo(
    () =>
      (filtered.length ? filtered : works).slice(0, 4).map((item) => ({
        id: item.title,
        title: item.scope,
        detail: item.category,
        summary: item.outcome,
      })),
    [filtered, works],
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const trackedProjects = new Set<string>();
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("#works [data-project-name]"),
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
      { threshold: 0.6 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section id="works" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Featured Systems"
          title="Enterprise Systems Delivered"
          subtitle="Flagship architecture case studies spanning event-driven commerce, integration orchestration, and platform modernization."
          align="left"
        />

        <div className="mb-10 rounded-2xl bg-secondary/20 p-4 sm:p-6">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <ContainerStagger>
              <ContainerAnimated className="mb-3 block text-xs font-medium text-accent md:text-sm">
                {ui.works.eyebrow}
              </ContainerAnimated>
              <ContainerAnimated className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                Architecture Programs With Measurable Outcomes
              </ContainerAnimated>
              <ContainerAnimated className="my-4 text-sm text-secondary md:my-5 md:text-base">
                From platform decomposition to telemetry-informed operations,
                each system is engineered for throughput, reliability, and enterprise governance.
              </ContainerAnimated>
              <ContainerAnimated>
                <Button asChild className="bg-accent text-on-accent hover:bg-accent/90">
                  <a href="#contact">Discuss your architecture roadmap</a>
                </Button>
              </ContainerAnimated>
            </ContainerStagger>

            <GalleryGrid>
              {galleryHighlights.map((item, index) => (
                <GalleryGridCell
                  index={index}
                  key={item.id}
                  className={cn(
                    "border border-default/70 p-4",
                    index % 2 === 0
                      ? "bg-gradient-to-br from-secondary via-background to-secondary/60"
                      : "bg-gradient-to-br from-accent-soft/60 via-background to-secondary/70",
                  )}
                >
                  <div className="flex h-full flex-col justify-end">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                      {item.detail}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-2 line-clamp-3 text-xs text-secondary">
                      {item.summary}
                    </p>
                  </div>
                </GalleryGridCell>
              ))}
            </GalleryGrid>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {workCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                active === c
                  ? "border-accent bg-accent text-on-accent"
                  : "border-default bg-secondary text-secondary hover:text-primary",
              )}
            >
              {ui.works.categoryLabels[c]}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((w) => (
            <article
              key={w.title}
              data-project-name={w.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "_")
                .replace(/^_+|_+$/g, "")}
              className="premium-card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft ring-1 ring-accent/30">
                  {(() => {
                    const Icon = categoryIcons[w.category] ?? Boxes;
                    return <Icon className="h-[18px] w-[18px] text-accent" />;
                  })()}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-secondary">
                  {w.scope}
                </span>
              </div>

              <h3 className="mb-4 text-[17px] font-semibold leading-snug text-primary">
                {w.title}
              </h3>
              <div className="space-y-3 text-[15px] text-secondary">
                <p>
                  <span className="font-semibold text-primary">
                    {ui.works.problem}:
                  </span>{" "}
                  {w.problem}
                </p>
                <p>
                  <span className="font-semibold text-primary">
                    {ui.works.solution}:
                  </span>{" "}
                  {w.solution}
                </p>
                <p>
                  <span className="font-semibold text-accent">
                    {ui.works.outcome}:
                  </span>{" "}
                  {w.outcome}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.tags.map((t) => (
                  <TechTag key={t} label={t} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <nav
          className="mt-8 flex flex-wrap gap-3"
          aria-label="Projects section internal navigation"
        >
          <Link
            to="/api-integration-services"
            className="link-accent text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Azure integration project delivery approach
          </Link>
          <a
            href="#contact"
            className="link-accent text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact for project architecture review
          </a>
        </nav>
      </div>
    </section>
  );
}
