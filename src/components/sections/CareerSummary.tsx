import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Briefcase, Building2, Layers } from "lucide-react";

interface Milestone {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string;
}

const careerMilestones: Milestone[] = [
  {
    period: "2022 – Present",
    role: "Tech Lead & Solution Architect",
    company: "Enterprise Solutions Consultancy",
    location: "Dubai, UAE",
    highlights:
      "Enterprise PIM, catalog, pricing, and event-driven multi-region commerce architecture across retail ecosystems.",
  },
  {
    period: "2021 – 2022",
    role: "Frontend & Full Stack Engineer",
    company: "Digital Product Studio",
    location: "Dubai, UAE",
    highlights:
      "Built ERP and task management platforms using Laravel and Angular with NgRx state architecture.",
  },
  {
    period: "2021 – 2021",
    role: "Full Stack & Platform Engineer",
    company: "Travel Tech Platform",
    location: "Dubai, UAE",
    highlights:
      "Airline B2B marketplace and NDC-based flight content aggregation microservices.",
  },
  {
    period: "2016 – 2020",
    role: "R&D Engineer",
    company: "Enterprise Automation Solutions",
    location: "India",
    highlights:
      "Video conferencing, enterprise ERP systems, roadside assistance, and Android/Spring Boot backends.",
  },
  {
    period: "2010 – Present",
    role: "Solution Architect & Consultant",
    company: "Independent Consulting",
    location: "Global / Remote",
    highlights:
      "Delivered 100+ software solutions across SaaS, ERP, LMS, and custom AI tools.",
  },
  {
    period: "2010 – 2016",
    role: "Network & Systems Engineer",
    company: "Early Career",
    location: "India",
    highlights:
      "Network infrastructure design, routing, security, and Linux administration foundation.",
  },
];

export default function CareerSummary() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="about" className="section-pad scroll-mt-20">
      <div id="experience" className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "نبذة سريعة" : "ABOUT & CAREER"}
          title={isArabic ? "المسيرة المهنية والخبرات" : "About & Career Milestones"}
          subtitle={
            isArabic
              ? "ملخص احترافي مكثف للمسيرة المهنية في هندسة البرمجيات وبناء المنصات."
              : "A compact overview of my 13+ year career in architecture, platform engineering, and enterprise systems."
          }
          align="left"
        />

        {/* Executive Summary Card */}
        <div className="mt-8 rounded-2xl border border-border bg-secondary/20 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-primary mb-3">
                Professional Summary
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-secondary font-normal">
                Technical Architect and Engineering Lead with 13+ years of experience designing, building, and operating production platforms across omnichannel retail commerce, travel technology, enterprise systems, and AI-enabled software.
              </p>
            </div>

            <div className="space-y-4 border-t lg:border-t-0 lg:border-l border-border/50 pt-4 lg:pt-0 lg:pl-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" /> PRIMARY INDUSTRIES
                </p>
                <p className="text-xs text-secondary font-medium">
                  Omnichannel Retail · Travel Tech · Enterprise Automations · AI Platforms
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-1 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> TECHNICAL FOCUS
                </p>
                <p className="text-xs text-secondary font-medium">
                  Event-Driven Microservices · Cloud Architecture (Azure/AWS) · API Design · Delivery Leadership
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Chronological Timeline */}
        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-6">
            CAREER TIMELINE
          </p>

          <div className="space-y-4">
            {careerMilestones.map((item) => (
              <div
                key={`${item.company}-${item.period}`}
                className="group rounded-xl border border-border bg-background/80 p-5 transition-all duration-300 hover:border-accent/40 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-accent shrink-0" />
                    <h4 className="text-base font-bold text-primary group-hover:text-accent transition-colors">
                      {item.role}
                    </h4>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-sm font-semibold text-secondary">{item.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span>{item.period}</span>
                    <span>·</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-secondary font-normal pl-6">
                  {item.highlights}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
