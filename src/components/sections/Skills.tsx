import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Cloud, Server, Monitor, Container, Network } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading, TechTag } from "@/components/shared/SectionHeading";
import { cardHover, staggerContainer, staggerItem } from "@/lib/animations";

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
  const [featured, ...rest] = skills.clusters;
  const FeaturedIcon = featured ? (clusterIcons[featured.title] ?? Cloud) : Cloud;

  return (
    <section id="stack" className="section-pad surface-2 relative overflow-hidden">
      <div aria-hidden className="ambient-mesh" />
      <div className="container-narrow">
        <SectionHeading
          eyebrow={skills.eyebrow}
          title={skills.title}
          subtitle={skills.intro}
          align="left"
          accentMark
        />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_1.9fr]">
          {featured ? (
            <motion.article
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="glass-card group p-6"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <span className="glow-ring flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
                  <FeaturedIcon className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <p className="micro-label text-secondary opacity-70">Core Cluster</p>
                  <h3 className="font-display text-xl font-bold tracking-tight text-primary">
                    {featured.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <TechTag key={tag} label={tag} />
                ))}
              </div>
            </motion.article>
          ) : null}

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {rest.map((cluster) => {
              const Icon = clusterIcons[cluster.title] ?? Cloud;
              return (
                <motion.article
                  key={cluster.title}
                  variants={staggerItem}
                  className="premium-card group min-h-[170px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft"
                >
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="ring-accent-soft flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft ring-1">
                      <Icon className="h-4 w-4 text-accent" />
                    </span>
                    <h3 className="font-display text-[16px] font-semibold tracking-tight text-primary">
                      {cluster.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cluster.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
