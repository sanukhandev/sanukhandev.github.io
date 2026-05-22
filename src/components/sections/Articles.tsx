import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading, TagChip } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Articles() {
  const { articles, ui } = useSiteContent();

  return (
    <section id="articles" className="section-pad surface-2 relative overflow-hidden">
      <div className="container-narrow">
        <SectionHeading
          title={ui.articles.title}
          subtitle={ui.articles.subtitle}
          align="left"
          accentMark
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {articles.map((a) => (
            <motion.a
              key={a.title}
              variants={staggerItem}
              href={a.url}
              className="premium-card group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full border border-default bg-secondary px-2.5 py-0.5 micro-label text-accent">
                {a.category}
              </span>
              <h3 className="font-display text-[20px] font-semibold leading-tight tracking-[-0.03em] text-primary">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 font-body text-[15px] text-secondary">
                {a.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <TagChip
                    key={t}
                    label={t}
                    className="bg-secondary text-secondary"
                  />
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                {ui.articles.read} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
