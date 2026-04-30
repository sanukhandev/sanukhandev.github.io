import { Award, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function Certifications() {
  const { certifications, ui } = useSiteContent();

  return (
    <section className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          title={ui.certifications.title}
          subtitle={ui.certifications.subtitle}
          align="left"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="premium-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#38c755]/40"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-tea-green-500/15 text-tea-green-400">
                  <Award className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-[#8a90a8]">
                  {c.issuer}
                </span>
              </div>
              <h3 className="text-[15px] font-semibold leading-snug text-[#f0f1f4]">
                {c.title}
              </h3>
              {c.issued && (
                <p className="mt-1 text-xs text-[#8a90a8]">{ui.certifications.issued} {c.issued}</p>
              )}
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-tea-green-400 hover:text-tea-green-300"
              >
                {ui.certifications.view} <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
