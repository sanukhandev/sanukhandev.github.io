import type { ComponentType, CSSProperties } from "react";
import { Cloud, Server } from "lucide-react";
import {
  SiGooglecloud,
  SiServerless,
  SiSpringboot,
  SiNodedotjs,
  SiNestjs,
  SiGraphql,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiKubernetes,
  SiDocker,
  SiTerraform,
  SiShopify,
  SiApachekafka,
  SiSap,
  SiRabbitmq,
  SiAngular,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiDjango,
  SiAndroid,
} from "react-icons/si";
import { cn } from "@/lib/utils";

type SiIconType = ComponentType<{ className?: string; style?: CSSProperties }>;

const tagIconMap: Record<string, { icon: SiIconType; color: string }> = {
  // Cloud
  Azure: { icon: Cloud as SiIconType, color: "#0078D4" },
  "Azure Functions": { icon: Cloud as SiIconType, color: "#0078D4" },
  "Azure Event Hubs": { icon: Cloud as SiIconType, color: "#0078D4" },
  "Event Hubs": { icon: Cloud as SiIconType, color: "#0078D4" },
  AWS: { icon: Server as SiIconType, color: "#FF9900" },
  GCP: { icon: SiGooglecloud, color: "#4285F4" },
  Serverless: { icon: SiServerless, color: "#FD5750" },
  // Backend
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  GraphQL: { icon: SiGraphql, color: "#E10098" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Django: { icon: SiDjango, color: "#092E20" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  // Frontend
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Angular: { icon: SiAngular, color: "#DD0031" },
  Android: { icon: SiAndroid, color: "#3DDC84" },
  // DevOps
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Terraform: { icon: SiTerraform, color: "#7B42BC" },
  // Integrations
  Kafka: { icon: SiApachekafka, color: "#a0a0a0" },
  RabbitMQ: { icon: SiRabbitmq, color: "#FF6600" },
  SAP: { icon: SiSap, color: "#0FAAFF" },
  Shopify: { icon: SiShopify, color: "#96BF48" },
};

export function TechTag({ label }: { label: string }) {
  const entry = tagIconMap[label];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-default bg-secondary px-2.5 py-1 text-xs font-medium text-secondary transition-colors hover:border-accent-soft hover:text-primary">
      {entry ? (
        <entry.icon
          className="h-3.5 w-3.5 shrink-0"
          style={{ color: entry.color }}
        />
      ) : null}
      {label}
    </span>
  );
}

const tones = [
  "bg-tea-green-500/10 text-tea-green-300 border-tea-green-500/30",
  "bg-magenta-bloom-500/10 text-magenta-bloom-300 border-magenta-bloom-500/30",
  "bg-vibrant-coral-500/10 text-vibrant-coral-300 border-vibrant-coral-500/30",
  "bg-beige-500/10 text-beige-300 border-beige-500/30",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

interface TagChipProps {
  label: string;
  className?: string;
  tone?: number; // override
}

export function TagChip({ label, className, tone }: TagChipProps) {
  const toneClass = tones[(tone ?? hash(label)) % tones.length];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-default px-2.5 py-0.5 text-xs font-medium",
        toneClass,
        className,
      )}
    >
      {label}
    </span>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center rounded-full border border-default bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-tea-green-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-[28px] font-bold leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[15px] text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
