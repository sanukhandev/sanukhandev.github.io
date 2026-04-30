import { Cloud, Server, Monitor, Container, Network } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";

const clusterIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Cloud & Architecture": Cloud,
  "Backend Systems": Server,
  "Frontend Systems": Monitor,
  "DevOps & Infra": Container,
  "Enterprise Integrations": Network,
  "السحابة والعمارة": Cloud,
  "أنظمة الخلفية": Server,
  "أنظمة الواجهة": Monitor,
  "DevOps والبنية التحتية": Container,
  "تكاملات المؤسسات": Network,
};

export default function Skills() {
  const { skills } = useSiteContent();

  return (
    <section id="stack" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={skills.eyebrow}
          title={skills.title}
          subtitle={skills.intro}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.clusters.map((cluster) => {
            const Icon = clusterIcons[cluster.title] ?? Cloud;
            return (
              <article
                key={cluster.title}
                className="premium-card group min-h-[170px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#38c755]/10 ring-1 ring-[#38c755]/25">
                    <Icon className="h-4 w-4 text-[#38c755]" />
                  </span>
                  <h3 className="text-[16px] font-semibold text-[#f0f1f4]">
                    {cluster.title}
                  </h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cluster.tags.map((tag) => (
                    <TagChip
                      key={tag}
                      label={tag}
                      className="bg-[#16171d] text-[#8a90a8]"
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
