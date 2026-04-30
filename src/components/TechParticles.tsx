import { useRef } from "react";
import * as Icons from "lucide-react";

// Lucide icon names that map to recognisable tech concepts
const ICON_NAMES = [
  "FileCode2",   // TypeScript / code
  "Server",      // Node / backend
  "Database",    // PostgreSQL / data
  "Cloud",       // AWS / Azure
  "GitBranch",   // Git
  "Zap",         // Vite / performance
  "Wind",        // Tailwind
  "Layers",      // Architecture / microservices
  "Cpu",         // Compute / Kubernetes
  "Network",     // Networking / mesh
  "Code2",       // Code
  "Terminal",    // CLI / DevOps
  "Globe",       // Web / MENA markets
  "Boxes",       // Docker / containers
  "Shield",      // Security
  "Activity",    // Observability / monitoring
  "Figma",       // Design systems
  "BarChart3",   // Analytics
  "HardDrive",   // Storage / persistence
  "Webhook",     // Event-driven / Kafka
  "BrainCircuit",// AI / ML
  "Gauge",       // Performance
  "Flame",       // Hot path
  "Settings2",   // Configuration / Terraform
  "Lock",        // IAM / security
] as const;

type Particle = {
  id: number;
  iconName: string;
  x: number;
  bottom: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    iconName: ICON_NAMES[i % ICON_NAMES.length],
    x: parseFloat(rand(1, 99).toFixed(2)),
    bottom: parseFloat(rand(0, 75).toFixed(2)),
    size: Math.round(rand(13, 22)),
    opacity: parseFloat(rand(0.07, 0.20).toFixed(2)),
    duration: parseFloat(rand(20, 42).toFixed(1)),
    delay: parseFloat(rand(-40, 0).toFixed(1)),
    drift: parseFloat(rand(-55, 55).toFixed(0)),
  }));
}

export default function TechParticles({ count = 24 }: { count?: number }) {
  const particlesRef = useRef<Particle[]>();
  if (!particlesRef.current) {
    particlesRef.current = generateParticles(count);
  }
  const particles = particlesRef.current;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => {
        const Icon = (
          Icons as unknown as Record<
            string,
            React.ComponentType<{
              width?: number;
              height?: number;
              strokeWidth?: number;
              style?: React.CSSProperties;
            }>
          >
        )[p.iconName] ?? Icons.Code2;

        return (
          <div
            key={p.id}
            className="tech-particle absolute"
            style={
              {
                left: `${p.x}%`,
                bottom: `${p.bottom}%`,
                "--p-drift": `${p.drift}px`,
                "--p-op": p.opacity,
                "--p-dur": `${p.duration}s`,
                "--p-delay": `${p.delay}s`,
                color: "#38c755",
              } as React.CSSProperties
            }
          >
            <Icon width={p.size} height={p.size} strokeWidth={1.2} />
          </div>
        );
      })}
    </div>
  );
}
