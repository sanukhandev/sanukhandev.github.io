import {
  Briefcase,
  History,
  Building2,
  Cpu,
  Globe,
  Network,
} from "lucide-react";
import { useMemo } from "react";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  WorkExperience,
  type ExperienceItemType,
  type ExperiencePositionIconType,
} from "@/components/ui/work-experience";

const roleIcons = [Briefcase, Building2, Network, Cpu, Globe, History];

const getStartYear = (duration: string) => {
  const match = duration.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : "";
};

export default function Services() {
  const { services, ui } = useSiteContent();

  const experiences = useMemo<ExperienceItemType[]>(
    () =>
      services.map((item) => ({
        id: item.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
        companyName: item.company,
        isCurrentEmployer: item.current,
        positions: [
          {
            id: `${item.company}-${item.role}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
            title: item.role,
            employmentPeriod: item.duration,
            employmentType: item.client ?? item.location,
            summary: item.impact[0],
            details: item.impact.slice(1),
            skills: item.stack,
            icon: inferPositionIcon(item.role),
            isExpanded: Boolean(item.current),
          },
        ],
      })),
    [services],
  );

  return (
    <section id="experience" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          title={ui.experience.title}
          subtitle={ui.experience.subtitle}
          align="left"
        />

        {/* Career stat pills */}
        <div className="mb-8 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-widest text-secondary">
          <span className="rounded-full border border-default px-3 py-1">
            {ui.experience.stats[0]}
          </span>
          <span className="rounded-full border border-default px-3 py-1">
            {ui.experience.stats[1]}
          </span>
          <span className="rounded-full border border-default px-3 py-1">
            {ui.experience.stats[2]}
          </span>
          <span className="rounded-full border border-accent-soft bg-accent-soft px-3 py-1 text-accent">
            {ui.experience.stats[3]}
          </span>
        </div>

        <div className="relative">
      

          <WorkExperience experiences={experiences} />

          <nav
            className="mt-8 flex flex-wrap gap-3"
            aria-label="Experience section internal navigation"
          >
            <a
              href="#works"
              className="link-accent text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View architecture and integration projects
            </a>
            <a
              href="#contact"
              className="link-accent text-[14px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact Sanu Khan for solution design
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

function inferPositionIcon(role: string): ExperiencePositionIconType {
  const value = role.toLowerCase();

  if (value.includes("design") || value.includes("ux") || value.includes("ui")) {
    return "design";
  }
  if (value.includes("engineer") || value.includes("architect") || value.includes("developer")) {
    return "code";
  }
  if (value.includes("research") || value.includes("learning") || value.includes("trainer")) {
    return "education";
  }

  return "business";
}
