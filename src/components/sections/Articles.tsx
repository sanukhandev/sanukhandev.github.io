import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";

export default function Articles() {
  return (
    <section id="articles" className="section-pad">
      <div className="container-narrow">
        <SectionHeading title="Insights" subtitle="Selected architecture notes." align="left" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.url}
              className="premium-card group flex flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full border border-[#2b2f3b] bg-[#16171d] px-2.5 py-0.5 text-[11px] font-semibold text-tea-green-300">
                {a.category}
              </span>
              <h3 className="text-[16px] font-semibold leading-snug text-[#f0f1f4]">{a.title}</h3>
              <p className="mt-2 flex-1 text-[15px] text-[#8a90a8]">{a.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <TagChip key={t} label={t} className="bg-[#16171d] text-[#8a90a8]" />
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-tea-green-400 transition-transform group-hover:translate-x-0.5">
                Read Article <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
