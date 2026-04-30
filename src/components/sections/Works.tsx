import { useMemo, useState } from "react";
import { works, workCategories, type WorkCategory } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Live: "bg-tea-green-500/15 text-tea-green-300 border-tea-green-500/30",
  "In Progress": "bg-beige-500/15 text-beige-300 border-beige-500/30",
  Concept: "bg-magenta-bloom-500/15 text-magenta-bloom-300 border-magenta-bloom-500/30",
};

export default function Works() {
  const [active, setActive] = useState<WorkCategory>("All");

  const filtered = useMemo(
    () => (active === "All" ? works : works.filter((w) => w.category === active)),
    [active],
  );

  return (
    <section id="works" className="section-pad">
      <div className="container-narrow">
        <SectionHeading title="Latest Works" subtitle="A selection of recent projects." />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {workCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                active === c
                  ? "border-tea-green-500 bg-tea-green-500 text-jet-black-950"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <article
              key={w.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-tea-green-500/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                    statusTone[w.status],
                  )}
                >
                  {w.status}
                </span>
                <span className="text-xs text-muted-foreground">{w.year}</span>
              </div>
              <h3 className="text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{w.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.tags.map((t) => (
                  <TagChip key={t} label={t} />
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="border-tea-green-500/40 bg-transparent text-tea-green-300 hover:bg-tea-green-500/10"
          >
            <a href="#works">View All Works</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
