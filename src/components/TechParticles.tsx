import type { CSSProperties } from "react";
import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  Figma,
  FileCode2,
  Flame,
  Gauge,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  Lock,
  Network,
  Server,
  Settings2,
  Shield,
  Terminal,
  Webhook,
  Wind,
  Zap,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Lucide icon names that map to recognisable tech concepts
const ICON_NAMES = [
  "FileCode2", // TypeScript / code
  "Server", // Node / backend
  "Database", // PostgreSQL / data
  "Cloud", // AWS / Azure
  "GitBranch", // Git
  "Zap", // Vite / performance
  "Wind", // Tailwind
  "Layers", // Architecture / microservices
  "Cpu", // Compute / Kubernetes
  "Network", // Networking / mesh
  "Code2", // Code
  "Terminal", // CLI / DevOps
  "Globe", // Web / MENA markets
  "Boxes", // Docker / containers
  "Shield", // Security
  "Activity", // Observability / monitoring
  "Figma", // Design systems
  "BarChart3", // Analytics
  "HardDrive", // Storage / persistence
  "Webhook", // Event-driven / Kafka
  "BrainCircuit", // AI / ML
  "Gauge", // Performance
  "Flame", // Hot path
  "Settings2", // Configuration / Terraform
  "Lock", // IAM / security
] as const;

type Particle = {
  id: number;
  iconName: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  float: number;
  rotate: number;
  blur: number;
};

const ICON_MAP: Record<string, LucideIcon> = {
  FileCode2,
  Server,
  Database,
  Cloud,
  GitBranch,
  Zap,
  Wind,
  Layers,
  Cpu,
  Network,
  Code2,
  Terminal,
  Globe,
  Boxes,
  Shield,
  Activity,
  Figma,
  BarChart3,
  HardDrive,
  Webhook,
  BrainCircuit,
  Gauge,
  Flame,
  Settings2,
  Lock,
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    iconName: ICON_NAMES[i % ICON_NAMES.length],
    x: parseFloat(rand(1, 99).toFixed(2)),
    y: parseFloat(rand(4, 90).toFixed(2)),
    size: Math.round(rand(12, 24)),
    opacity: parseFloat(rand(0.18, 0.5).toFixed(2)),
    duration: parseFloat(rand(8.5, 17).toFixed(1)),
    delay: parseFloat(rand(-16, 0).toFixed(1)),
    drift: parseFloat(rand(-55, 55).toFixed(0)),
    float: parseFloat(rand(10, 28).toFixed(0)),
    rotate: parseFloat(rand(-18, 18).toFixed(0)),
    blur: parseFloat(rand(0, 0.25).toFixed(2)),
  }));
}

interface TechParticlesProps {
  count?: number;
  fullPage?: boolean;
}

export default function TechParticles({
  count = 24,
  fullPage = false,
}: TechParticlesProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const smoothX = useSpring(parallaxX, {
    stiffness: 40,
    damping: 16,
    mass: 0.8,
  });
  const smoothY = useSpring(parallaxY, {
    stiffness: 40,
    damping: 16,
    mass: 0.8,
  });

  useEffect(() => {
    if (shouldReduceMotion || isMobile) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;
      parallaxX.set(xRatio * 14);
      parallaxY.set(yRatio * 12);
    };

    const onLeave = () => {
      parallaxX.set(0);
      parallaxY.set(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile, parallaxX, parallaxY, shouldReduceMotion]);

  const particles = useMemo(
    () => generateParticles(isMobile ? Math.min(count, 10) : count),
    [count, isMobile],
  );

  return (
    <div
      aria-hidden
      className={
        fullPage
          ? "pointer-events-none fixed inset-0 overflow-hidden"
          : "pointer-events-none absolute inset-0 overflow-hidden"
      }
    >
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent) 0%, transparent 72%)",
            filter: "blur(18px)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.5 }
              : { opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.06, 0.96] }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {particles.map((p) => {
          const Icon = ICON_MAP[p.iconName] ?? Code2;

          return (
            <motion.div
              key={p.id}
              className="absolute"
              initial={
                shouldReduceMotion || isMobile
                  ? { opacity: p.opacity }
                  : { opacity: 0, y: 8, scale: 0.8 }
              }
              animate={
                shouldReduceMotion || isMobile
                  ? { opacity: p.opacity }
                  : {
                      y: [0, -p.float, 0],
                      x: [0, p.drift, 0],
                      opacity: [0.08, p.opacity, p.opacity * 0.55, p.opacity],
                      scale: [0.9, 1.12, 0.95],
                      rotate: [0, p.rotate, 0],
                    }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  color: "var(--accent)",
                  filter: `blur(${p.blur}px) drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 30%, transparent))`,
                } as CSSProperties
              }
            >
              <Icon size={p.size} strokeWidth={1.2} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
