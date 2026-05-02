import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Webhook, Boxes } from "lucide-react";
import { type WorkCategory } from "@/data/siteData";
import { useSiteContent } from "@/data/siteContent";
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

          const projectName = entry.target.getAttribute("data-project-name") || "";
          if (!projectName || trackedProjects.has(projectName)) {
            return;
          }

          trackedProjects.add(projectName);
          trackEvent("project_view", { project_name: projectName });
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.6,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section id="works" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={ui.works.eyebrow}
          title={ui.works.title}
          subtitle={ui.works.subtitle}
          align="left"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {workCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                active === c
                  ? "border-[#38c755] bg-[#38c755] text-[#0f1015]"
                  : "border-[#2b2f3b] bg-[#16171d] text-[#8a90a8] hover:text-[#f0f1f4]",
              )}
            >
              {ui.works.categoryLabels[c]}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <article
              key={w.title}
              data-project-name={w.title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")}
              className="premium-card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#38c755]/10 ring-1 ring-[#38c755]/25">
                  {(() => {
                    const Icon = categoryIcons[w.category] ?? Boxes;
                    return <Icon className="h-[18px] w-[18px] text-[#38c755]" />;
                  })()}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-[#8a90a8]">{w.scope}</span>
              </div>

              <h3 className="mb-4 text-[17px] font-semibold leading-snug text-[#f0f1f4]">
                {w.title}
              </h3>
              <div className="space-y-3 text-[15px] text-[#8a90a8]">
                <p>
                  <span className="font-semibold text-[#f0f1f4]">{ui.works.problem}:</span>{" "}
                  {w.problem}
                </p>
                <p>
                  <span className="font-semibold text-[#f0f1f4]">{ui.works.solution}:</span>{" "}
                  {w.solution}
                </p>
                <p>
                  <span className="font-semibold text-[#38c755]">{ui.works.outcome}:</span>{" "}
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

        <nav className="mt-8 flex flex-wrap gap-3" aria-label="Projects section internal navigation">
          <Link
            to="/api-integration-services"
            className="text-[14px] font-semibold text-[#38c755] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38c755]/70"
          >
            View Azure integration project delivery approach
          </Link>
          <a
            href="#contact"
            className="text-[14px] font-semibold text-[#38c755] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38c755]/70"
          >
            Contact for project architecture review
          </a>
        </nav>
      </div>
    </section>
  );
}
