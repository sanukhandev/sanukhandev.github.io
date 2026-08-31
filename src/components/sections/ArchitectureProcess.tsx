import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Business goals, users, constraints and failure conditions.",
  },
  {
    number: "02",
    title: "Model",
    description: "Domains, ownership, data and system boundaries.",
  },
  {
    number: "03",
    title: "Design",
    description: "Contracts, integrations, scalability and resilience.",
  },
  {
    number: "04",
    title: "Build",
    description: "Incremental delivery with engineering guardrails.",
  },
  {
    number: "05",
    title: "Operate",
    description: "Observability, deployment, recovery and support.",
  },
  {
    number: "06",
    title: "Learn",
    description: "Production evidence feeds the next architectural decision.",
  },
];

export default function ArchitectureProcess() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="process" className="section-pad bg-secondary/10 scroll-mt-20">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "منهجية العمل" : "ARCHITECTURAL METHODOLOGY"}
          title={isArabic ? "كيف أفكر في الهندسة المعمارية" : "How I Think About Architecture"}
          subtitle={
            isArabic
              ? "عملية معمارية مكوّنة من ست مراحل تضمن الانطلاق من أهداف العمل حتى تسليم أنظمة إنتاجية مستقرة."
              : "A six-stage architectural process ensuring system design originates from business constraints and delivers operable production outcomes."
          }
          align="left"
        />

        {/* 6-Stage Timeline (Horizontal Grid Desktop, Vertical Mobile) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-xl border border-border bg-background/80 p-5 shadow-sm transition-all duration-300 hover:border-accent/40"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-accent/80 font-mono">
                    {step.number}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-secondary font-normal">
                  {step.description}
                </p>
              </div>

              {/* Progress Connector Indicator */}
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <span className="block h-1 w-1 rounded-full bg-accent/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
