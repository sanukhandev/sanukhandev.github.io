import { Briefcase, History, Building2, Cpu, Globe, Network, CheckCircle2 } from "lucide-react";
import { services } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";

const roleIcons = [Briefcase, Building2, Network, Cpu, Globe, History];

const getStartYear = (duration: string) => {
  const match = duration.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : "";
};

export default function Services() {
  return (
    <section id="experience" className="section-pad bg-[#16171d]/45">
      <div className="container-narrow">
        <SectionHeading
          title="Experience"
          subtitle="Engineer → System Builder → Architect → Tech Lead"
          align="left"
        />

        {/* Career stat pills */}
        <div className="mb-8 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-widest text-[#8a90a8]">
          <span className="rounded-full border border-[#2b2f3b] px-3 py-1">13+ Years</span>
          <span className="rounded-full border border-[#2b2f3b] px-3 py-1">6 Roles</span>
          <span className="rounded-full border border-[#2b2f3b] px-3 py-1">3 Countries</span>
          <span className="rounded-full border border-[#38c755]/40 bg-[#38c755]/10 px-3 py-1 text-[#38c755]">Currently Available</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#38c755] via-[#2b2f3b] to-transparent" />

          <div className="space-y-5">
            {services.map((item, index) => {
              const Icon = roleIcons[index % roleIcons.length];
              const startYear = getStartYear(item.duration);
              return (
                <article key={item.company} className="group relative pl-14">
                  {startYear && (
                    <span className="timeline-year-shimmer timeline-year-vertical absolute -left-[58px] top-8 hidden origin-left whitespace-nowrap sm:block">
                      {startYear}
                    </span>
                  )}

                  {/* Timeline node */}
                  <div
                    className={[
                      "absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110",
                      item.current
                        ? "border-[#38c755] bg-[#38c755]/15 shadow-[0_0_14px_rgba(56,199,85,0.35)]"
                        : "border-[#2b2f3b] bg-[#16171d] group-hover:border-[#38c755]/50",
                    ].join(" ")}
                  >
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        item.current ? "text-[#38c755]" : "text-[#8a90a8] group-hover:text-[#38c755]"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={[
                      "premium-card p-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#38c755]/30",
                      item.current ? "border-[#38c755]/25" : "",
                    ].join(" ")}
                  >
                    {/* Header row */}
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[17px] font-bold text-[#f0f1f4]">{item.company}</h3>
                          {item.client && (
                            <span className="rounded-full border border-[#2b2f3b] bg-[#16171d] px-2 py-0.5 text-[11px] text-[#8a90a8]">
                              {item.client}
                            </span>
                          )}
                          {item.current && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#38c755]/40 bg-[#38c755]/10 px-2 py-0.5 text-[11px] font-semibold text-[#38c755]">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#38c755]" />
                              Current
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[13px] font-semibold text-[#38c755]/80">{item.role}</p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                        <span className="rounded-full border border-[#2b2f3b] bg-[#0f1015] px-3 py-1 text-[12px] font-medium text-[#8a90a8]">
                          {item.duration}
                        </span>
                        <span className="text-[11px] text-[#8a90a8]">{item.location}</span>
                      </div>
                    </div>

                    {/* Impact bullets */}
                    <ul className="mt-4 space-y-2">
                      {item.impact.map((point) => (
                        <li key={point} className="flex gap-2 text-[14px] text-[#8a90a8]">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#38c755]/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.stack.map((t) => (
                        <TagChip key={t} label={t} className="bg-[#0f1015] text-[#8a90a8]" />
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
