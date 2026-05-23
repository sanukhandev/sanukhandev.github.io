import { motion, useReducedMotion } from "framer-motion";
import { Binary, BrainCircuit, GitBranch, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const principles = [
  {
    icon: GitBranch,
    title: "Architecture Before Features",
    detail:
      "Each platform starts from service boundaries, event contracts, and operational ownership models before interface-level implementation.",
  },
  {
    icon: Binary,
    title: "Telemetry As A First-Class Primitive",
    detail:
      "Signals, traces, and workflow metrics are embedded in the system fabric so teams can reason in real time and intervene early.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Assisted Operational Orchestration",
    detail:
      "Automation is designed as a calm decision-support layer that augments operator judgment rather than replacing control points.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Reliability",
    detail:
      "Delivery focuses on compliance-aware flows, tenant isolation, high availability, and lifecycle resilience across cloud-native stacks.",
  },
];

export default function EngineeringPhilosophy() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="philosophy" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Engineering Philosophy"
          title="Systems Are Products. Operations Are The Interface."
          subtitle="Design doctrine for modern enterprise platforms built for scale, observability, and decision velocity."
          align="left"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="premium-card p-5"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-default/70 bg-secondary/70">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-[22px] font-semibold text-primary">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-secondary">{item.detail}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
