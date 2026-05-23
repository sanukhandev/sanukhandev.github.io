import type { ComponentType } from "react";
import { Cloud, Server, Monitor, Container, Network } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";

const clusterIcons: Record<string, ComponentType<{ className?: string }>> = {
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
          eyebrow="Architecture Expertise"
          title="Core Capability Domains"
          subtitle="Cloud-native architectures, distributed backends, and integration systems engineered for operational resilience and scale."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.clusters.map((cluster) => {
            const Icon = clusterIcons[cluster.title] ?? Cloud;
            return (
              <article
                key={cluster.title}
                className="premium-card group min-h-[170px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="ring-accent-soft flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft ring-1">
                    <Icon className="h-4 w-4 text-accent" />
                  </span>
                </div>
                <ExpandableSkillTags
                  title={cluster.title}
                  skills={cluster.tags}
                  initialCount={6}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
