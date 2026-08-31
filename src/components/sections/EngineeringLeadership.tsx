import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Compass, Shield, Users, Target } from "lucide-react";

export default function EngineeringLeadership() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const leadershipCapabilities = [
    {
      title: "ARCHITECTURE DIRECTION",
      description:
        "Turn business requirements into implementable technical direction.",
      icon: Compass,
    },
    {
      title: "ENGINEERING GUARDRAILS",
      description:
        "Establish contracts, standards, testing and delivery boundaries.",
      icon: Shield,
    },
    {
      title: "TEAM ENABLEMENT",
      description:
        "Help engineers understand why systems are designed the way they are.",
      icon: Users,
    },
    {
      title: "DELIVERY OWNERSHIP",
      description:
        "Stay close to implementation, QA, deployment and production outcomes.",
      icon: Target,
    },
  ];

  return (
    <section id="leadership" className="section-pad bg-secondary/10 scroll-mt-20">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "القيادة الهندسية" : "TECHNICAL LEADERSHIP"}
          title={isArabic ? "القيادة الهندسية والتنفيذ" : "Engineering Leadership"}
          subtitle={
            isArabic
              ? "ربط الرؤية المعمارية بالتنفيذ الهندسي اليومي وتوجيه الفرق لتسليم أنظمة عالية الجودة."
              : "Connecting architectural vision with hands-on engineering execution, standards, and delivery ownership."
          }
          align="left"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadershipCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition-all duration-300 hover:border-accent/40"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-accent mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary font-normal">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
