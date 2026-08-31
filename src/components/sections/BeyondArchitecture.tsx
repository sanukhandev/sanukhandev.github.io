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

interface FlowStep {
  number: string;
  title: string;
  desc: string;
}

const processFlow: FlowStep[] = [
  { number: "01", title: "Understand", desc: "Business goals & constraints" },
  { number: "02", title: "Model", desc: "Domains & system boundaries" },
  { number: "03", title: "Design", desc: "API contracts & resilience" },
  { number: "04", title: "Build", desc: "Hands-on delivery & code" },
  { number: "05", title: "Operate", desc: "Observability & telemetry" },
  { number: "06", title: "Learn", desc: "Production feedback loops" },
];

const leadershipItems = [
  {
    title: "ARCHITECTURE DIRECTION",
    desc: "Translate business requirements into implementable technical direction.",
    icon: Compass,
  },
  {
    title: "ENGINEERING GUARDRAILS",
    desc: "Establish boundaries, contracts, standards and delivery practices.",
    icon: Shield,
  },
  {
    title: "TEAM ENABLEMENT",
    desc: "Make architectural decisions understandable and actionable for engineering teams.",
    icon: Users,
  },
  {
    title: "DELIVERY OWNERSHIP",
    desc: "Stay close to implementation, QA, deployment and production outcomes.",
    icon: Target,
  },
];

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
  const { locale } = useLocale();
  const { services } = useSiteContent();
  const isArabic = locale === "ar";

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
          eyebrow={isArabic ? "ما بعد المخطط المعماري" : "ABOUT & LEADERSHIP"}
          title={isArabic ? "ما بعد مخطط الهندسة المعمارية" : "Beyond the Architecture Diagram"}
          subtitle={
            isArabic
              ? "أظل مشاركاً من المتطلبات والهندسة المعمارية حتى التنفيذ، والتحقق في بيئة الإنتاج."
              : "I stay involved from requirements and architecture through implementation, QA, deployment and production validation."
          }
          align="left"
        />

        {/* Understand → Model → Design → Build → Operate → Learn Flow */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/20 p-5 sm:p-7 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            END-TO-END EXECUTION FLOW
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {processFlow.map((step, idx) => (
              <div
                key={step.number}
                className="relative rounded-xl border border-border bg-background/80 p-3.5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-accent">
                    {step.number}
                  </span>
                  {idx < processFlow.length - 1 && (
                    <ArrowRight className="hidden lg:block h-3 w-3 text-muted-foreground opacity-40 absolute -right-2 top-1/2 -translate-y-1/2 z-10" />
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            ENGINEERING LEADERSHIP CAPABILITIES
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadershipItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background/70 p-5 transition-all duration-300 hover:border-accent/40 shadow-sm"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-1.5">
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            13+ YEARS CAREER &amp; WORK EXPERIENCE
          </p>

          <WorkExperience experiences={experiences} />
        </div>
      </div>
    </section>
  );
}
