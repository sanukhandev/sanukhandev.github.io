import { Bot, Building2, MapPin } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const metaPills = [
  "Solution Architect",
  "AI Platforms",
  "Multilingual Systems",
  "Scalable Infrastructure",
];

const metaPillsAr = [
  "مهندس حلول",
  "منصات ذكاء اصطناعي",
  "أنظمة متعددة اللغات",
  "بنية تحتية قابلة للتوسع",
];

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric?: { value: string; label: string };
}

const cards: { en: FeatureCard[]; ar: FeatureCard[] } = {
  en: [
    {
      icon: <Bot className="h-4 w-4" />,
      title: "Zaakiy AI",
      description:
        "A multilingual powerhouse that has navigated 10,000+ conversations, delivering brand-first support in English, Arabic, and beyond.",
      metric: { value: "10K+", label: "Conversations" },
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "Architectural Reach",
      description:
        "From the automated workflows of Zaakiy CRM to the robust resource planning of Zaakiy ERP, I build systems that scale with the speed of modern business.",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      title: "Hyper-Local Impact",
      description:
        "With Zaakiy GO, we're bringing that same architectural precision to the food delivery space in Dubai.",
    },
  ],
  ar: [
    {
      icon: <Bot className="h-4 w-4" />,
      title: "Zaakiy AI",
      description:
        "منصة متعددة اللغات تجاوزت 10,000 محادثة، تقدم دعماً يعكس هوية العلامة التجارية بالعربية والإنجليزية وما هو أبعد.",
      metric: { value: "+10K", label: "محادثة" },
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "نطاق معماري",
      description:
        "من سير عمل Zaakiy CRM الآلية إلى تخطيط موارد Zaakiy ERP، أبني أنظمة تتوسع بسرعة الأعمال الحديثة.",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      title: "أثر محلي عميق",
      description:
        "مع Zaakiy GO، نُطبّق الدقة المعمارية ذاتها على قطاع توصيل الطعام في دبي.",
    },
  ],
};

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const featureCards = isArabic ? cards.ar : cards.en;
  const pills = isArabic ? metaPillsAr : metaPills;

  return (
    <section
      id="zaakiy"
      className="surface-2 section-pad relative overflow-hidden"
    >
      <div className="container-narrow">
        <div className="grid gap-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
          {/* ── LEFT: Founder narrative ── */}
          <div className="flex flex-col justify-center lg:pr-12 xl:pr-16">
            {/* Eyebrow */}
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {isArabic ? "منظومة Zaakiy" : "Zaakiy Ecosystem"}
            </p>

            {/* Headline */}
            <h2
              className="text-[clamp(1.7rem,3.2vw,2.35rem)] font-extrabold leading-[1.1] tracking-tight text-primary"
              style={{ maxWidth: "21ch" }}
            >
              {isArabic ? (
                <>
                  بناء منظومة:
                  <br />
                  إرث Zaakiy
                </>
              ) : (
                <>
                  Engineering an Ecosystem:
                  <br />
                  <span className="text-accent opacity-90">
                    The Zaakiy Legacy
                  </span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="mt-4 max-w-[460px] text-[14px] leading-[1.85] text-secondary">
              {isArabic
                ? "ما بدأ كتكريم لابني تحوّل إلى مجموعة من المنصات المدعومة بالذكاء الاصطناعي، مصممة لردم الهوة بين البنية التقنية المعقدة وتجربة الإنسان السلسة."
                : "What started as a tribute to my son has evolved into a suite of AI-driven platforms designed to bridge the gap between complex backend architecture and seamless human experience."}
            </p>

            {/* Meta pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-default bg-secondary/60 px-3 py-1 text-[11px] font-medium text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-70" />
                  {pill}
                </span>
              ))}
            </div>

            {/* Founder mark */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-px w-8 bg-accent opacity-40" />
              <p className="text-[11px] font-semibold text-secondary opacity-60">
                {isArabic ? "بقلم سانو خان" : "By Sanu Khan"}
              </p>
            </div>
          </div>

          {/* ── Vertical divider (desktop only) ── */}
          <div
            aria-hidden
            className="hidden lg:block w-px self-stretch"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)",
            }}
          />

          {/* ── RIGHT: Stacked product cards ── */}
          <div className="flex flex-col gap-0 lg:pl-12 xl:pl-16">
            {featureCards.map((card, i) => (
              <article
                key={i}
                className="group relative flex gap-4 border-b border-default py-4 last:border-b-0 transition-all duration-200 ease-out"
              >
                {/* Number index */}
                <div className="flex w-8 shrink-0 flex-col items-center pt-0.5">
                  <span className="text-[11px] font-bold tabular-nums text-accent opacity-75 transition-opacity duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < featureCards.length - 1 && (
                    <div className="mt-2 flex-1 w-px bg-border opacity-30" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-default bg-secondary/80 text-accent transition-colors duration-200 group-hover:border-accent-soft">
                        {card.icon}
                      </span>
                      <h3 className="text-[14px] font-semibold text-primary">
                        {card.title}
                      </h3>
                    </div>

                    {card.metric && (
                      <span className="shrink-0 rounded-full border border-accent-soft bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                        {card.metric.value} {card.metric.label}
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] leading-[1.7] text-secondary">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
