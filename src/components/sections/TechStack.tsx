import * as Icons from "lucide-react";
import { techStack } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function TechStack() {
  return (
    <section className="section-pad">
      <div className="container-narrow">
        <SectionHeading title="Tech Stack" subtitle="Tools I reach for daily" />

        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:grid-cols-5">
          {techStack.map((t) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[t.icon] || Icons.Box;
            return (
              <div
                key={t.name}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-tea-green-500/40"
              >
                <Icon className="h-6 w-6 text-tea-green-400 transition-transform group-hover:scale-110" />
                <span className="text-[11px] font-medium text-muted-foreground">{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
