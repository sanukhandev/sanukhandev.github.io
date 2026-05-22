import { ArrowUpRight, Braces, FlaskConical, Globe } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface UtilityCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const utilityCards: UtilityCard[] = [
  {
    icon: <Braces className="h-4 w-4" />,
    title: "JSON Formatter",
    description: "Validate, clean, and structure payloads instantly.",
    href: "https://aruvix.com/json-formatter",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: "API Client",
    description: "Inspect and test APIs with precision-focused workflows.",
    href: "https://aruvix.com/api-client",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "QA Utilities",
    description: "Generate assertions, validate payloads, and debug faster.",
    href: "https://aruvix.com",
  },
];

const utilityCardsAr: UtilityCard[] = [
  {
    icon: <Braces className="h-4 w-4" />,
    title: "منسق JSON",
    description: "تحقق من البيانات ونظّمها بسرعة ودقة.",
    href: "https://aruvix.com/json-formatter",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: "عميل API",
    description: "اختبر واجهات API وراقب الاستجابات بسرعة.",
    href: "https://aruvix.com/api-client",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "أدوات الجودة",
    description: "تحقق واختبر وصحح أسرع ضمن سير عمل عملي.",
    href: "https://aruvix.com",
  },
];

export default function AruvixSection() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const sectionUtilityCards = isArabic ? utilityCardsAr : utilityCards;

  return (
    <section id="aruvix" className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container-narrow">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            {isArabic ? "منصة أدوات هندسية" : "Engineering Toolkit Platform"}
          </p>
          <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-primary">
            {isArabic ? (
              <>
                أدوات هندسية
                <span className="text-accent"> مركّزة.</span>
              </>
            ) : (
              <>
                Focused engineering
                <span className="text-accent"> utilities.</span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-[620px] text-[15px] leading-[1.8] text-secondary">
            {isArabic
              ? "Aruvix مساحة مركزة لتبسيط التنسيق، وفحص الـ API، والتحقق من الجودة ضمن سير عمل هندسي سريع وقابل للتوسع."
              : "Aruvix is a focused toolkit for faster formatting, API inspection, and quality validation across modern engineering workflows."}
          </p>

          <p className="mt-2 text-[12px] leading-relaxed text-secondary/75">
            {isArabic
              ? "منصة مركّزة على السرعة، الجودة، وتقليل الاحتكاك اليومي في سير عمل المطورين."
              : "A compact toolkit built for speed, quality, and lower day-to-day engineering friction."}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sectionUtilityCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-[18px] border border-default bg-secondary/30 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:bg-secondary/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-default bg-secondary text-accent transition-colors duration-200 group-hover:border-accent-soft">
                  {card.icon}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent opacity-70" />
              </div>
              <h3 className="mb-1.5 text-[14px] font-semibold text-primary">
                {card.title}
              </h3>
              <p className="text-[12px] leading-[1.65] text-secondary">
                {card.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
