import { useMemo, useState } from "react";
import { works, workCategories, type WorkCategory } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export default function Works() {
  const [active, setActive] = useState<WorkCategory>("All");

  const filtered = useMemo(
    () =>
      active === "All" ? works : works.filter((w) => w.category === active),
    [active],
  );

  return (
    <section id="works" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Work"
          title="Case Studies"
          subtitle="Impact-led delivery across distributed commerce and enterprise integration landscapes."
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
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <article
              key={w.title}
              className="premium-card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-[18px] font-semibold text-[#f0f1f4]">
                  {w.title}
                </h3>
                <span className="text-xs text-[#8a90a8]">{w.scope}</span>
              </div>
              <div className="space-y-3 text-[15px] text-[#8a90a8]">
                <p>
                  <span className="font-semibold text-[#f0f1f4]">Problem:</span>{" "}
                  {w.problem}
                </p>
                <p>
                  <span className="font-semibold text-[#f0f1f4]">
                    Solution:
                  </span>{" "}
                  {w.solution}
                </p>
                <p>
                  <span className="font-semibold text-[#38c755]">Outcome:</span>{" "}
                  {w.outcome}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.tags.map((t) => (
                  <TagChip
                    key={t}
                    label={t}
                    className="bg-[#16171d] text-[#8a90a8]"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
