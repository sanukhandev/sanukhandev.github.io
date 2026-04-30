import { Quote } from "lucide-react";
import { testimonials } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="container-narrow">
        <SectionHeading title="Testimonials" subtitle="What clients say." />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="h-5 w-5 text-tea-green-400" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="h-9 w-9 rounded-full border border-border object-cover"
                />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
