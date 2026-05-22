import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Webhook, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import { type WorkCategory } from "@/data/siteData";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading, TechTag } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/utils/analytics";
import { staggerContainer, staggerItem } from "@/lib/animations";

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
    <section id="works" className="section-pad surface-1 relative overflow-hidden">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={ui.works.eyebrow}
          title={ui.works.title}
          subtitle={ui.works.subtitle}
          align="left"
          accentMark
        />

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

        <motion.div
          className="space-y-6"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filtered.map((w, index) => (
            <motion.article
              key={w.title}
              variants={staggerItem}
              data-project-name={w.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "_")
                .replace(/^_+|_+$/g, "")}
              className={cn(
                "glass-card grid gap-5 overflow-hidden p-6 lg:grid-cols-2",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
              whileHover={{ y: -4 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-default/70 bg-secondary p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(56,199,85,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(56,199,85,0.08),transparent_45%)]" />
                <div className="relative flex h-full min-h-[180px] flex-col justify-between">
                  <span className="micro-label text-secondary/80">Architecture Pattern</span>
                  <h4 className="font-display text-[26px] font-bold leading-none tracking-[-0.04em] text-primary/85">
                    {w.category}
                  </h4>
                  <p className="micro-label text-accent">{w.scope}</p>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft ring-1 ring-accent/30">
                    {(() => {
                      const Icon = categoryIcons[w.category] ?? Boxes;
                      return <Icon className="h-[18px] w-[18px] text-accent" />;
                    })()}
                  </span>
                  <span className="micro-label text-secondary">{w.scope}</span>
                </div>

                <h3 className="mb-4 font-display text-[24px] font-semibold leading-tight tracking-[-0.035em] text-primary">
                  {w.title}
                </h3>
                <div className="space-y-3 font-body text-[15px] text-secondary">
                  <p>
                    <span className="font-semibold text-primary">{ui.works.problem}:</span>{" "}
                    {w.problem}
                  </p>
                  <p>
                    <span className="font-semibold text-primary">{ui.works.solution}:</span>{" "}
                    {w.solution}
                  </p>
                  <p>
                    <span className="font-semibold text-accent">{ui.works.outcome}:</span>{" "}
                    {w.outcome}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {w.tags.map((t) => (
                    <TechTag key={t} label={t} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
