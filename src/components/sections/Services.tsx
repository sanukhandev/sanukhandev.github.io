import * as Icons from "lucide-react";
import { services } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TagChip } from "@/components/shared/SectionHeading";

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          title="Services & Expertise"
          subtitle="End-to-end product engineering, from idea to launch."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[s.icon] || Icons.Sparkles;
            return (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-tea-green-500/40"
              >
                <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl bg-tea-green-500/15 text-tea-green-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <TagChip key={t} label={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
