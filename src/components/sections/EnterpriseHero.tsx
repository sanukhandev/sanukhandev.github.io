import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, Cpu, Database, Gauge, Network, Waves } from "lucide-react";

const capabilityTags = [
  "Event-Driven Architecture",
  "Operational Telemetry",
  "AI Orchestration",
  "Multi-Tenant SaaS",
  "Enterprise Integrations",
  "Cloud-Native Systems",
];

const metrics = [
  { label: "Systems at Scale", value: "100+" },
  { label: "Years in Production", value: "13+" },
  { label: "Markets Delivered", value: "9" },
  { label: "Telemetry Uptime", value: "99.95%" },
];

const nodeSet = [
  { icon: Network, title: "Signal Ingestion" },
  { icon: Database, title: "Context Graph" },
  { icon: Cpu, title: "Decision Engine" },
  { icon: Waves, title: "Orchestration Layer" },
  { icon: Gauge, title: "Telemetry Surface" },
  { icon: Activity, title: "Ops Response" },
];

export default function EnterpriseHero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="section-pad relative overflow-hidden pt-28 sm:pt-32">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-2xl border border-default/70 bg-secondary/35 p-7 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(130,170,150,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(130,170,150,0.12)_1px,transparent_1px)] [background-size:34px_34px]" />
          <motion.div
            className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full"
            initial={reducedMotion ? false : { opacity: 0.2, scale: 0.9 }}
            animate={reducedMotion ? undefined : { opacity: [0.18, 0.28, 0.18], scale: [0.96, 1.03, 0.96] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(0,178,167,0.22), transparent 68%)" }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <motion.p
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-default/70 bg-background/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Enterprise Systems Architect & Operational Intelligence Engineer
              </motion.p>

              <motion.h1
                className="font-display max-w-5xl text-[clamp(3.4rem,8.2vw,6rem)] leading-[0.95] text-primary"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Engineering Operational Intelligence Systems For Modern Enterprises
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-[16px] leading-relaxed text-secondary sm:text-[17px]"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
              >
                Architecting scalable event-driven platforms, AI orchestration systems, enterprise integrations, and multi-tenant SaaS ecosystems.
              </motion.p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {capabilityTags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    className="rounded-md border border-default/70 bg-background/70 px-3 py-1.5 text-[12px] font-medium text-secondary"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + idx * 0.04 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="rounded-xl border border-default/70 bg-background/70 p-3"
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24 + idx * 0.06 }}
                  >
                    <p className="text-[20px] font-semibold text-primary">{item.value}</p>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-secondary">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="rounded-xl border border-default/70 bg-background/70 p-4"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[12px] uppercase tracking-[0.16em] text-secondary">Telemetry Mesh</p>
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {nodeSet.map((node, i) => {
                    const Icon = node.icon;
                    return (
                      <motion.div
                        key={node.title}
                        className="rounded-lg border border-default/70 bg-secondary/60 px-2.5 py-2"
                        initial={reducedMotion ? false : { opacity: 0.3 }}
                        animate={
                          reducedMotion
                            ? undefined
                            : { opacity: [0.45, 1, 0.45], borderColor: ["rgba(27,48,39,0.75)", "rgba(37,192,111,0.52)", "rgba(27,48,39,0.75)"] }
                        }
                        transition={{ duration: 4.2, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                          <span className="text-[11px] font-medium text-secondary">{node.title}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
