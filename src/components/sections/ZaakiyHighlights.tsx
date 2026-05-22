import {
  Activity,
  Bot,
  Building2,
  MessageSquareText,
  Shield,
  Workflow,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

const metaPills = [
  "AI-Native Ops Layer",
  "Realtime Enterprise Orchestration",
  "Autonomous Monitoring",
  "Workflow Intelligence",
  "Enterprise Governance",
];

const metaPillsAr = [
  "طبقة عمليات مدعومة بالذكاء الاصطناعي",
  "تنسيق مؤسسي لحظي",
  "مراقبة ذاتية",
  "ذكاء سير العمل",
  "حوكمة مؤسسية",
];

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CapabilityBlock {
  title: string;
  points: string[];
}

const cards: { en: FeatureCard[]; ar: FeatureCard[] } = {
  en: [
    {
      icon: <Bot className="h-4 w-4" />,
      title: "AI-Native Operational Platform",
      description:
        "An embedded intelligence layer that understands organizational context, workflow states, permissions, and realtime business events.",
    },
    {
      icon: <MessageSquareText className="h-4 w-4" />,
      title: "Conversational Enterprise Operations",
      description:
        "Natural operational interactions for queries, approvals, summaries, reporting, and guided execution across systems.",
    },
    {
      icon: <Activity className="h-4 w-4" />,
      title: "Realtime Operational Intelligence",
      description:
        "Live dashboards, event-driven notifications, and streaming responses for low-latency visibility and faster operational decisions.",
    },
    {
      icon: <Workflow className="h-4 w-4" />,
      title: "Autonomous Ops Intelligence",
      description:
        "Continuous observation of system health, failures, anomalies, and infrastructure events with AI-assisted escalation and analysis.",
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "Multi-Branch Enterprise Intelligence",
      description:
        "Branch-aware governance, role-aware visibility, centralized intelligence, and contextual responses for enterprise-scale ecosystems.",
    },
  ],
  ar: [
    {
      icon: <Bot className="h-4 w-4" />,
      title: "منصة عمليات مدعومة بالذكاء الاصطناعي",
      description:
        "طبقة ذكاء مدمجة تفهم سياق المؤسسة، وحالات سير العمل، والصلاحيات، والأحداث اللحظية لتنسيق العمليات.",
    },
    {
      icon: <MessageSquareText className="h-4 w-4" />,
      title: "عمليات مؤسسية محادثية",
      description:
        "تفاعل تشغيلي طبيعي للاستعلامات والاعتمادات والملخصات والتقارير وتنفيذ المهام عبر الأنظمة.",
    },
    {
      icon: <Activity className="h-4 w-4" />,
      title: "ذكاء تشغيلي لحظي",
      description:
        "لوحات حية وإشعارات مدفوعة بالأحداث واستجابات متدفقة لرؤية تشغيلية منخفضة الكمون.",
    },
    {
      icon: <Workflow className="h-4 w-4" />,
      title: "ذكاء عمليات ذاتي",
      description:
        "مراقبة مستمرة لصحة النظام والأعطال والشذوذات مع دعم تحليل الحوادث والتصعيد الذكي.",
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "ذكاء مؤسسي متعدد الفروع",
      description:
        "حوكمة واعية للفروع، ورؤية حسب الأدوار، وذكاء مركزي، واستجابات سياقية لمؤسسات واسعة النطاق.",
    },
  ],
};

const coreVision = {
  en: {
    from: [
      "Static record management",
      "Disconnected workflows",
      "Manual operations",
      "Reactive monitoring",
    ],
    to: [
      "AI-assisted operations",
      "Realtime enterprise orchestration",
      "Intelligent workflow automation",
      "Predictive operational intelligence",
      "Autonomous monitoring ecosystems",
    ],
  },
  ar: {
    from: [
      "إدارة سجلات ثابتة",
      "سير عمل منفصل",
      "عمليات يدوية",
      "مراقبة تفاعلية بعد الحدث",
    ],
    to: [
      "عمليات مدعومة بالذكاء الاصطناعي",
      "تنسيق مؤسسي لحظي",
      "أتمتة ذكية لسير العمل",
      "ذكاء تشغيلي تنبؤي",
      "منظومة مراقبة ذاتية",
    ],
  },
};

const capabilityBlocks: { en: CapabilityBlock[]; ar: CapabilityBlock[] } = {
  en: [
    {
      title: "Operational Intelligence",
      points: [
        "AI-generated insights",
        "Predictive operational analysis",
        "Workflow anomaly detection",
      ],
    },
    {
      title: "Realtime Infrastructure",
      points: [
        "Live operational updates",
        "Event-driven architecture",
        "Streaming AI interfaces",
      ],
    },
    {
      title: "Enterprise Governance",
      points: [
        "RBAC-aware intelligence",
        "Workflow traceability",
        "Operational compliance",
      ],
    },
    {
      title: "Autonomous Monitoring",
      points: [
        "AI-assisted incident handling",
        "Deployment intelligence",
        "Self-reporting operational signals",
      ],
    },
  ],
  ar: [
    {
      title: "الذكاء التشغيلي",
      points: [
        "رؤى مولدة بالذكاء الاصطناعي",
        "تحليل تشغيلي تنبؤي",
        "اكتشاف شذوذات سير العمل",
      ],
    },
    {
      title: "البنية التحتية اللحظية",
      points: [
        "تحديثات تشغيلية مباشرة",
        "عمارة مدفوعة بالأحداث",
        "واجهات AI متدفقة",
      ],
    },
    {
      title: "الحوكمة المؤسسية",
      points: [
        "ذكاء واعٍ بالصلاحيات",
        "تتبّع سير العمل",
        "امتثال تشغيلي",
      ],
    },
    {
      title: "المراقبة الذاتية",
      points: [
        "معالجة حوادث مدعومة بالذكاء الاصطناعي",
        "ذكاء النشر",
        "إشارات تشغيلية ذاتية التقرير",
      ],
    },
  ],
};

const architecturePoints = {
  en: [
    "GraphQL-first operational querying",
    "Realtime infrastructure and event awareness",
    "Modular enterprise services",
    "Low-latency operational UX",
    "Scalable branch-aware governance",
  ],
  ar: [
    "استعلامات تشغيلية تعتمد GraphQL أولاً",
    "بنية لحظية ووعي بالأحداث",
    "خدمات مؤسسية معيارية",
    "تجربة تشغيل منخفضة الكمون",
    "حوكمة قابلة للتوسع وواعية للفروع",
  ],
};

const stackPoints = {
  en: [
    "Contextual AI reasoning",
    "Skill-based operational execution",
    "Workflow automation orchestration",
    "Predictive intelligence",
    "Realtime streaming interactions",
  ],
  ar: [
    "استدلال AI سياقي",
    "تنفيذ تشغيلي قائم على المهارات",
    "تنسيق أتمتة سير العمل",
    "ذكاء تنبؤي",
    "تفاعلات متدفقة لحظياً",
  ],
};

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const featureCards = isArabic ? cards.ar : cards.en;
  const pills = isArabic ? metaPillsAr : metaPills;
  const vision = isArabic ? coreVision.ar : coreVision.en;
  const blocks = isArabic ? capabilityBlocks.ar : capabilityBlocks.en;
  const architecture = isArabic ? architecturePoints.ar : architecturePoints.en;
  const stack = isArabic ? stackPoints.ar : stackPoints.en;

  return (
    <section id="zaakiy" className="section-pad relative overflow-hidden">
      <div className="container-narrow">
        <div className="grid gap-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
          <div className="flex flex-col justify-center lg:pr-12 xl:pr-16">
            <h2
              className="text-[clamp(1.7rem,3.2vw,2.35rem)] font-extrabold leading-[1.1] tracking-tight text-primary"
              style={{ maxWidth: "22ch" }}
            >
              {isArabic ? (
                <>
                  ما هو
                  <br />
                  <span
                    style={{ fontFamily: "'Anta', sans-serif" }}
                    className="text-accent opacity-90"
                  >
                    Zaakiy V3RSE
                  </span>
                  ؟
                </>
              ) : (
                <>
                  What is
                  <br />
                  <span
                    style={{ fontFamily: "'Anta', sans-serif" }}
                    className="text-accent opacity-90"
                  >
                    Zaakiy V3RSE
                  </span>
                  ?
                </>
              )}
            </h2>

            <p className="mt-4 max-w-[520px] text-[14px] leading-[1.85] text-secondary">
              {isArabic
                ? "ZaakiyVerse هي طبقة ذكاء تشغيلي للمؤسسات الحديثة، تحول الأنظمة التقليدية إلى بيئة تشغيل لحظية ذاتية مدعومة بالذكاء الاصطناعي."
                : "ZaakiyVerse is the operational intelligence layer for modern enterprises, transforming traditional systems into AI-assisted, realtime, autonomous operations."}
            </p>

            <div className="mt-4 rounded-xl border border-accent-soft bg-accent/5 px-3.5 py-3">
              <p className="text-[12px] leading-relaxed text-secondary">
                {isArabic
                  ? "تموضع المنتج: نظام قيادة عملياتي مدعوم بالذكاء الاصطناعي للمؤسسات متعددة الفروع." 
                  : "Positioning: An AI-native operational command ecosystem built for realtime enterprise orchestration."}
              </p>
            </div>

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

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-default bg-secondary/35 px-3.5 py-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary opacity-70">
                  {isArabic ? "من" : "From"}
                </p>
                <ul className="space-y-1.5 text-[12px] text-secondary">
                  {vision.from.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-border" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-accent-soft bg-accent/5 px-3.5 py-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                  {isArabic ? "إلى" : "To"}
                </p>
                <ul className="space-y-1.5 text-[12px] text-secondary">
                  {vision.to.map((item) => (
                    <li key={item} className="flex items-start gap-1.5">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="hidden lg:block w-px self-stretch"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)",
            }}
          />

          <div className="flex flex-col gap-0 lg:pl-12 xl:pl-16">
            {featureCards.map((card, i) => (
              <article
                key={card.title}
                className="group relative flex gap-4 border-b border-default py-4 last:border-b-0 transition-all duration-200 ease-out"
              >
                <div className="flex w-8 shrink-0 flex-col items-center pt-0.5">
                  <span className="text-[11px] font-bold tabular-nums text-accent opacity-75 transition-opacity duration-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < featureCards.length - 1 && (
                    <div className="mt-2 flex-1 w-px bg-border opacity-30" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-default bg-secondary/80 text-accent transition-colors duration-200 group-hover:border-accent-soft">
                      {card.icon}
                    </span>
                    <h3 className="text-[14px] font-semibold text-primary">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-[13px] leading-[1.7] text-secondary">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-9 h-px bg-border opacity-40" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {blocks.map((block) => (
            <article
              key={block.title}
              className="rounded-[16px] border border-default bg-secondary/30 p-4"
            >
              <h3 className="text-[14px] font-semibold text-primary">{block.title}</h3>
              <ul className="mt-2.5 space-y-1.5 text-[12px] text-secondary">
                {block.points.map((point) => (
                  <li key={point} className="flex items-start gap-1.5">
                    <Shield className="mt-0.5 h-3 w-3 shrink-0 text-accent opacity-70" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[16px] border border-default bg-secondary/30 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary opacity-70">
              {isArabic ? "الفلسفة المعمارية" : "Architectural Philosophy"}
            </p>
            <ul className="space-y-1.5 text-[12px] text-secondary">
              {architecture.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[16px] border border-accent-soft bg-accent/5 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              {isArabic ? "مجموعة الذكاء" : "Intelligence Stack"}
            </p>
            <ul className="space-y-1.5 text-[12px] text-secondary">
              {stack.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
