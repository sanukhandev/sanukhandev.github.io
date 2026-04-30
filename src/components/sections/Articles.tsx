import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";

export default function Articles() {
  return (
    <section id="articles" className="section-pad">
      <div className="container-narrow">
        <SectionHeading title="Latest Articles" subtitle="Notes from the field." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <a
              key={a.title}
              href={a.url}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-tea-green-500/40"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full border border-tea-green-500/30 bg-tea-green-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-tea-green-300">
                {a.category}
              </span>
              <h3 className="text-base font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <TagChip key={t} label={t} />
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
