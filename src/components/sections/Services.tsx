import { services } from "@/data/siteData";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TagChip } from "@/components/shared/SectionHeading";

export default function Services() {
  return (
    <section id="experience" className="section-pad bg-[#16171d]/45">
      <div className="container-narrow">
        <SectionHeading
          title="Experience"
          subtitle="Leadership across enterprise integrations, distributed platforms, and commerce architecture."
          align="left"
        />

        <div className="relative space-y-6 border-l border-[#2b2f3b] pl-6">
          {services.map((item, index) => (
            <article key={item.company} className="premium-card relative p-6">
              <span className="absolute -left-[33px] top-7 h-3 w-3 rounded-full bg-[#38c755]" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[20px] font-semibold text-[#f0f1f4]">{item.company}</h3>
                <span className="text-[12px] text-[#8a90a8]">Role {index + 1}</span>
              </div>
              <p className="mt-1 text-[14px] font-medium text-[#8a90a8]">{item.role}</p>

              <ul className="mt-4 space-y-2 text-[15px] text-[#8a90a8]">
                {item.impact.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#38c755]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((t) => (
                  <TagChip key={t} label={t} className="bg-[#16171d] text-[#8a90a8]" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
