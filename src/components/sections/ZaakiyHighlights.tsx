import { Activity, ArrowUpRight, MessageSquareText, ShieldCheck, Workflow } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";

interface Pillar {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const uspEn = [
  "AI-assisted operations",
  "Realtime visibility",
  "Workflow automation",
  "Branch-aware governance",
];

const uspAr = [
  "عمليات مدعومة بالذكاء الاصطناعي",
  "رؤية لحظية",
  "أتمتة سير العمل",
  "حوكمة واعية للفروع",
];

const pillarsEn: Pillar[] = [
  {
    icon: <MessageSquareText className="h-4 w-4" />,
    title: "Natural Operational Interaction",
    detail:
      "Teams can ask, approve, summarize, and trigger workflows in plain language without jumping across heavy screens.",
  },
  {
    icon: <Activity className="h-4 w-4" />,
    title: "Live Operational Context",
    detail:
      "Realtime signals from workflows, alerts, and events help teams see what matters now and act earlier.",
  },
  {
    icon: <Workflow className="h-4 w-4" />,
    title: "Calm Automation Layer",
    detail:
      "Routine coordination, escalations, and checks run in the background so teams can focus on real decisions.",
  },
];

const pillarsAr: Pillar[] = [
  {
    icon: <MessageSquareText className="h-4 w-4" />,
    title: "تفاعل تشغيلي طبيعي",
    detail:
      "يمكن للفرق الاستعلام والاعتماد والتلخيص وتنفيذ سير العمل دون التنقل بين واجهات معقدة.",
  },
  {
    icon: <Activity className="h-4 w-4" />,
    title: "سياق تشغيلي مباشر",
    detail:
      "إشارات لحظية من الأحداث والتنبيهات وحالات سير العمل تساعد الفرق على اتخاذ القرار أسرع.",
  },
  {
    icon: <Workflow className="h-4 w-4" />,
    title: "أتمتة هادئة",
    detail:
      "التنسيق الروتيني والتصعيدات والتحققات تعمل في الخلفية ليبقى تركيز الفرق على القرارات الأهم.",
  },
];

const trustEn = [
  "Role-aware visibility",
  "Branch-aware governance",
  "Audit-ready workflows",
];

const trustAr = [
  "رؤية حسب الدور",
  "حوكمة واعية للفروع",
  "تدفق قابل للتدقيق",
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const { profile, ui } = useSiteContent();
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();

  const usps = isArabic ? uspAr : uspEn;
  const pillars = isArabic ? pillarsAr : pillarsEn;
  const trust = isArabic ? trustAr : trustEn;
  const roleBrand =
    (profile as typeof profile & { roleBrand?: string }).roleBrand ??
    "Zaakiy V3RSE";

  return (
    <section id="zaakiy" className="section-pad relative overflow-hidden">
      <div className="container-narrow">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="rounded-[28px] border border-default/70 bg-secondary/20 p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <motion.div variants={item} className="lg:col-span-5">
              <p className="micro-label mb-3 text-accent">
                {isArabic ? ui.hero.creatorLabel : "Explore Features"}
              </p>

              <h2 className="font-display text-[clamp(2rem,4.8vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-primary">
                {isArabic ? (
                  <>
                    شغّل مؤسستك عبر
                    <br />
                    منصة عمليات
                    <span
                      style={{ fontFamily: "'Anta', sans-serif" }}
                      className="text-accent"
                    >
                      {" "}{roleBrand}
                    </span>
                  </>
                ) : (
                  <>
                    Run enterprise operations
                    <br />
                    through
                    <span
                      style={{ fontFamily: "'Anta', sans-serif" }}
                      className="text-accent"
                    >
                      {" "}{roleBrand}
                    </span>
                  </>
                )}
              </h2>

              <p className="mt-4 max-w-[44ch] font-body text-[14px] leading-relaxed text-secondary">
                {isArabic
                  ? "بدلاً من العمل عبر أدوات متقطعة، تمنحك المنصة تجربة تشغيل موحدة تجمع الرؤية، التنفيذ، والأتمتة في تدفق عملي واضح."
                  : "Instead of working across fragmented tools, the platform gives teams one operational flow for visibility, execution, and automation."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {usps.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-default bg-secondary/55 px-3 py-1 text-[11px] font-medium text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-70" />
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-soft bg-accent/10 px-4 py-2 text-[12px] font-semibold text-accent transition-colors hover:bg-accent/20"
                >
                  {isArabic ? "استعرض التطبيقات" : "Explore Applications"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-secondary/75">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  {isArabic ? "جاهز لبيئات المؤسسات" : "Enterprise-ready workflows"}
                </span>
              </div>
            </motion.div>

            <motion.div variants={item} className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {pillars.map((pillar, i) => {
                  const span = i === 1 ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-2";
                  const offset = i === 0 ? "lg:mt-10" : i === 2 ? "lg:mt-4" : "";

                  return (
                    <motion.article
                      key={pillar.title}
                      className={`glass-card rounded-2xl border border-default/70 p-4 ${span} ${offset}`}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-default bg-secondary/80 text-accent">
                          {pillar.icon}
                        </span>
                        <h3 className="font-body text-[13px] font-semibold text-primary">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="font-body text-[12px] leading-[1.65] text-secondary">
                        {pillar.detail}
                      </p>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-default/70 bg-secondary/35 p-3">
                <p className="micro-label mb-2 text-secondary/80">
                  {isArabic ? "ثقة تشغيلية" : "Operational Trust"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {trust.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-default bg-secondary/55 px-2.5 py-1 text-[11px] text-secondary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-70" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
