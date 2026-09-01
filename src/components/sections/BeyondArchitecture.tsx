import { useMemo } from "react";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  WorkExperience,
  type ExperienceItemType,
  type ExperiencePositionIconType,
} from "@/components/ui/work-experience";
import { ArrowRight, Compass, Shield, Users, Target } from "lucide-react";

const leadershipIcons = [Compass, Shield, Users, Target];

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

export default function BeyondArchitecture() {
  const { services, ui } = useSiteContent();

  const experiences = useMemo<ExperienceItemType[]>(
    () =>
      services.map((item) => ({
        id: item.company
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        companyName: item.company,
        isCurrentEmployer: item.current,
        positions: [
          {
            id: `${item.company}-${item.role}`
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, ""),
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
    <section id="about" className="py-12 md:py-16 lg:py-20 scroll-mt-20">
      <div id="leadership" className="container-narrow">
        <SectionHeading
          eyebrow={ui.beyondArchitecture.eyebrow}
          title={ui.beyondArchitecture.title}
          subtitle={ui.beyondArchitecture.subtitle}
          align="left"
        />

        {/* Understand → Model → Design → Build → Operate → Learn Flow */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/20 p-5 sm:p-7 shadow-sm">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.beyondArchitecture.executionFlowEyebrow}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {ui.beyondArchitecture.processFlow.map((step, idx) => (
              <div
                key={step.number}
                className="relative rounded-xl border border-border bg-background/80 p-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-accent">
                    {step.number}
                  </span>
                  {idx < ui.beyondArchitecture.processFlow.length - 1 && (
                    <ArrowRight className="hidden lg:block h-3 w-3 text-muted-foreground opacity-40 absolute -right-2 rtl:-left-2 rtl:right-auto top-1/2 -translate-y-1/2 z-10 rtl:rotate-180" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-primary">{step.title}</h4>
                <p className="text-[11px] text-secondary mt-0.5 leading-snug font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Compact Leadership Items */}
        <div className="mt-8">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.beyondArchitecture.leadershipEyebrow}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.beyondArchitecture.leadershipItems.map((item, idx) => {
              const Icon = leadershipIcons[idx] || Compass;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background/70 p-5 transition-all duration-300 hover:border-accent/40 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase text-accent mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-secondary font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FULL WORK EXPERIENCE TIMELINE */}
        <div id="experience" className="mt-12 scroll-mt-20">
          <p className="text-[11px] font-semibold uppercase text-accent mb-4">
            {ui.beyondArchitecture.experienceEyebrow}
          </p>

          <WorkExperience experiences={experiences} />
        </div>
      </div>
    </section>
  );
}
