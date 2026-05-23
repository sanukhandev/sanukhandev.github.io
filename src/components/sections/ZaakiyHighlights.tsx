import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  type LucideIcon,
  MessageSquareText,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";

interface Pillar {
  icon: LucideIcon;
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
    icon: MessageSquareText,
    title: "Natural Operational Interaction",
    detail:
      "Teams can ask, approve, summarize, and trigger workflows in plain language without jumping across heavy screens.",
  },
  {
    icon: Activity,
    title: "Live Operational Context",
    detail:
      "Realtime signals from workflows, alerts, and events help teams see what matters now and act earlier.",
  },
  {
    icon: Workflow,
    title: "Calm Automation Layer",
    detail:
      "Routine coordination, escalations, and checks run in the background so teams can focus on real decisions.",
  },
];

const pillarsAr: Pillar[] = [
  {
    icon: MessageSquareText,
    title: "تفاعل تشغيلي طبيعي",
    detail:
      "يمكن للفرق الاستعلام والاعتماد والتلخيص وتنفيذ سير العمل دون التنقل بين واجهات معقدة.",
  },
  {
    icon: Activity,
    title: "سياق تشغيلي مباشر",
    detail:
      "إشارات لحظية من الأحداث والتنبيهات وحالات سير العمل تساعد الفرق على اتخاذ القرار أسرع.",
  },
  {
    icon: Workflow,
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

const flowPhasesEn = [
  "Signal Capture",
  "Context Build",
  "Decision Assist",
  "Automation Trigger",
];

const flowPhasesAr = [
  "التقاط الإشارات",
  "بناء السياق",
  "دعم القرار",
  "تشغيل الأتمتة",
];

const statusFeedEn = [
  "Realtime workload anomaly detected",
  "Policy check completed",
  "Escalation prevented via auto-routing",
];

const statusFeedAr = [
  "تم رصد تغير تشغيلي لحظي",
  "اكتملت مراجعة السياسات",
  "تم منع التصعيد عبر التوجيه الآلي",
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
  const flowPhases = isArabic ? flowPhasesAr : flowPhasesEn;
  const statusFeed = isArabic ? statusFeedAr : statusFeedEn;
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
          className="relative overflow-hidden rounded-[30px] border border-default/70 bg-secondary/10 p-5 sm:p-8 lg:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 42% at 8% 6%, hsl(var(--primary) / 0.16), transparent 70%), radial-gradient(50% 40% at 88% 88%, hsl(var(--primary) / 0.12), transparent 74%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:46px_46px]" />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <motion.div variants={item} className="relative lg:col-span-5">
              <p className="micro-label mb-3 text-accent/90">
                {isArabic ? "بيئة تشغيل ذكية" : "Operational Intelligence Layer"}
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

              <div className="mt-6 rounded-2xl border border-default/60 bg-background/50 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.17em] text-secondary/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Radar className="h-3.5 w-3.5 text-accent" />
                    {isArabic ? "حالة النظام" : "System Pulse"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-accent">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                    {isArabic ? "نشط" : "Live"}
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {statusFeed.map((statusLine) => (
                    <p
                      key={statusLine}
                      className="inline-flex items-start gap-2 text-[12px] leading-relaxed text-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/85" />
                      {statusLine}
                    </p>
                  ))}
                </div>
              </div>

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

            <motion.div variants={item} className="relative lg:col-span-7">
              <div className="mb-4 rounded-2xl border border-default/60 bg-background/45 p-3 backdrop-blur-sm">
                <div className="grid gap-2 sm:grid-cols-2">
                  {flowPhases.map((phase, idx) => (
                    <div
                      key={phase}
                      className="flex items-center gap-2 rounded-xl border border-default/50 bg-secondary/40 px-3 py-2"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-[11px] font-semibold text-accent">
                        {idx + 1}
                      </span>
                      <span className="text-[12px] font-medium text-secondary">
                        {phase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                {pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  const span = i === 1 ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-2";
                  const offset = i === 0 ? "lg:mt-10" : i === 2 ? "lg:mt-4" : "";

                  return (
                    <motion.article
                      key={pillar.title}
                      className={`glass-card relative overflow-hidden rounded-2xl border border-default/70 bg-secondary/45 p-4 ${span} ${offset}`}
                      whileHover={
                        reduceMotion ? undefined : { y: -5, scale: 1.01, rotateX: 2 }
                      }
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      style={{ transformPerspective: 1000 }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(95% 65% at 100% 0%, hsl(var(--primary) / 0.12), transparent 64%)",
                        }}
                      />
                      <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-default bg-secondary/80 text-accent">
                          <Icon className="h-4 w-4" />
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

              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto]">
                <div className="rounded-xl border border-default/70 bg-secondary/35 p-3">
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

                <div className="rounded-xl border border-default/70 bg-background/45 px-3 py-2">
                  <p className="mb-1 text-[11px] uppercase tracking-widest text-secondary/70">
                    {isArabic ? "وضع" : "Mode"}
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent">
                    <Bot className="h-3.5 w-3.5" />
                    {isArabic ? "Zaakiy AI Copilot" : "Zaakiy AI Copilot"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-[84%] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.12)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
