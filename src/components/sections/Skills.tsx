import { Check } from "lucide-react";
import { skills } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Skills() {
  return (
    <section id="about" className="section-pad">
      <div className="container-narrow">
        <SectionHeading eyebrow={skills.eyebrow} title={skills.title} />

        <div className="grid gap-10 rounded-2xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-muted-foreground">{skills.intro}</p>
            <ul className="mt-6 space-y-3">
              {skills.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-tea-green-500/15 text-tea-green-400">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {skills.list.map((s) => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">{s.percent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-tea-green-500 transition-all"
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
