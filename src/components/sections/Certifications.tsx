import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Certifications() {
  const { certifications, ui } = useSiteContent();

  return (
    <section className="section-pad surface-2 relative overflow-hidden">
      <div className="container-narrow">
        <SectionHeading
          title={ui.certifications.title}
          subtitle={ui.certifications.subtitle}
          align="left"
          accentMark
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certifications.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              className="glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-soft"
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-tea-green-500/15 text-tea-green-400">
                  <Award className="h-4 w-4" />
                </span>
                <span className="micro-label text-secondary">
                  {c.issuer}
                </span>
              </div>
              <h3 className="font-display text-[18px] font-semibold leading-snug tracking-[-0.02em] text-primary">
                {c.title}
              </h3>
              {c.issued && (
                <p className="mt-1 font-body text-xs text-secondary">
                  {ui.certifications.issued} {c.issued}
                </p>
              )}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
              >
                {ui.certifications.view} <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
