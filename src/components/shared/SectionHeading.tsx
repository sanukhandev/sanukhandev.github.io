import { cn } from "@/lib/utils";

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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
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

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center rounded-full border border-tea-green-500/40 bg-tea-green-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tea-green-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
