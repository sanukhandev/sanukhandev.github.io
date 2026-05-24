import { motion, useReducedMotion } from "framer-motion";
import { Hero } from "@/components/ui/animated-hero";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const rotatingWordsEn = ["smart", "adaptive", "secure", "branch-aware", "realtime"];
const rotatingWordsAr = ["ذكية", "تكيفية", "آمنة", "واعية للفروع", "لحظية"];
const detailPillsEn = [
  "Realtime visibility",
  "Workflow orchestration",
  "Policy-aware automations",
  "Enterprise integration-ready",
];
const detailPillsAr = [
  "رؤية لحظية",
  "تنسيق سير العمل",
  "أتمتة واعية بالسياسات",
  "جاهز لتكاملات المؤسسات",
];
const richLinesEn = [
  "ZaakiyV3RSE unifies branch operations, approvals, and execution signals in a single operational layer.",
  "Built for enterprise teams that need policy-aware actions, traceable workflows, and faster operational decisions.",
];
const richLinesAr = [
  "يوحّد ZaakiyV3RSE عمليات الفروع والاعتمادات وإشارات التنفيذ ضمن طبقة تشغيل واحدة.",
  "مصمم لفرق المؤسسات التي تحتاج إجراءات واعية بالسياسات وتدفقات قابلة للتتبع وقرارات تشغيل أسرع.",
];

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const { profile } = useSiteContent();
  const isArabic = locale === "ar";
  const reduceMotion = useReducedMotion();
  const roleBrand =
    (profile as typeof profile & { roleBrand?: string }).roleBrand ??
    "ZaakiyV3RSE";

  return (
    <section id="ops-intelligence" className="section-pad relative overflow-hidden">
      <div className="container-narrow">
        <div className="mb-5 max-w-3xl text-left sm:mb-7">
          <span className="mb-3 inline-flex items-center rounded-full border border-default bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-tea-green-300">
            Operational Intelligence Platform
          </span>
          <h2 className="text-[clamp(2rem,6.2vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-primary">
            <span className="brand-zaakiy text-accent">
              ZaakiyV3RSE
            </span>{" "}
            Operational Nerve System
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:mt-4 sm:text-[16px]">
            A platform layer for AI-assisted workflow orchestration, policy-aware automation, and real-time operational visibility.
          </p>
        </div>
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="relative overflow-hidden rounded-[30px] border border-default/70 bg-secondary/10 p-3 sm:p-4 lg:p-6"
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
          <Hero
            className="relative z-10"
            badgeText={isArabic ? "اكتشف نظام Zaakiy" : "Explore Zaakiy Launch"}
            badgeHref="#works"
            badgeTarget="_self"
            titlePrefix={
              isArabic
                ? "عمليات المؤسسات عبر"
                : "Enterprise operations through"
            }
            brandText={roleBrand}
            titleWords={isArabic ? rotatingWordsAr : rotatingWordsEn}
            description={
              isArabic
                ? "تمنح ZaakiyV3RSE فرقك رؤية لحظية وسير عمل ذكي وأتمتة عملية داخل تجربة تشغيل واحدة متكاملة."
                : "ZaakiyV3RSE gives teams one intelligent operating layer for real-time visibility, calm automation, and faster execution."
            }
            detailPills={isArabic ? detailPillsAr : detailPillsEn}
            richTextLines={isArabic ? richLinesAr : richLinesEn}
            referenceLabel={isArabic ? "المرجع: zaakiy.io" : "Reference: zaakiy.io"}
            referenceHref="https://zaakiy.io"
          />

          <div
            className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-[84%] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.12)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
