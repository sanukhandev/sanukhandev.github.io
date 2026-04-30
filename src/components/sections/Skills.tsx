import { skills } from "@/data/siteData";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";

export default function Skills() {
  return (
    <section id="stack" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={skills.eyebrow}
          title={skills.title}
          subtitle={skills.intro}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.clusters.map((cluster) => (
            <article
              key={cluster.title}
              className="premium-card group min-h-[170px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
            >
              <h3 className="text-[16px] font-semibold text-[#f0f1f4]">
                {cluster.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cluster.tags.map((tag) => (
                  <TagChip
                    key={tag}
                    label={tag}
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
