import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const nodes = [
  { id: "api", label: "API Gateway", x: 12, y: 24 },
  { id: "events", label: "Event Streams", x: 36, y: 45 },
  { id: "ai", label: "AI Agents", x: 62, y: 20 },
  { id: "data", label: "Data Pipelines", x: 76, y: 58 },
  { id: "ops", label: "Ops Telemetry", x: 48, y: 74 },
  { id: "apps", label: "Client Apps", x: 20, y: 72 },
];

const links = [
  ["api", "events"],
  ["events", "ai"],
  ["events", "data"],
  ["ai", "ops"],
  ["data", "ops"],
  ["api", "apps"],
  ["apps", "ops"],
];

const getNode = (id: string) => nodes.find((n) => n.id === id);

export default function EngineeringSystemMap() {
  return (
    <section id="engineering-map" className="section-pad surface-1 relative overflow-hidden">
      <div aria-hidden className="ambient-mesh" />
      <div aria-hidden className="grid-overlay" />

      <div className="container-narrow relative z-10">
        <SectionHeading
          eyebrow="Operational Intelligence"
          title="Engineering System Map"
          subtitle="A live view of how architecture, automation, and telemetry operate together across delivery systems."
          align="left"
          accentMark
        />

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            className="glass-card relative min-h-[420px] overflow-hidden p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              {links.map(([fromId, toId], index) => {
                const from = getNode(fromId);
                const to = getNode(toId);
                if (!from || !to) return null;

                const cx = (from.x + to.x) / 2;
                const cy = (from.y + to.y) / 2 - 8;

                return (
                  <motion.path
                    key={`${fromId}-${toId}`}
                    d={`M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`}
                    fill="none"
                    stroke="rgba(56,199,85,0.35)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 1.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: index * 0.08 }}
                  />
                );
              })}
            </svg>

            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
              >
                <motion.div
                  className="glow-ring flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent"
                  animate={{ boxShadow: ["0 0 0 0 rgba(56,199,85,0.35)", "0 0 0 10px rgba(56,199,85,0)"] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.18 }}
                />
                <div className="mt-2 whitespace-nowrap rounded-md border border-default bg-secondary/90 px-2 py-1 micro-label text-secondary">
                  {node.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              "Signal routing across APIs and event buses",
              "Streaming decisions with AI orchestration",
              "Telemetry-first operations and incident visibility",
              "Workflow automation with resilient pipelines",
            ].map((item) => (
              <motion.article
                key={item}
                variants={staggerItem}
                className="premium-card p-4"
              >
                <p className="font-body text-sm leading-relaxed text-secondary">{item}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
