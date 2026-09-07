import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { ArrowRight, GitMerge, Network, Cpu, AlertCircle, Bot, CheckCircle2 } from "lucide-react";

export default function ZaakiyHighlights() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const researchItems = [
    { icon: GitMerge, name: isArabic ? "ربط الأحداث Event correlation" : "Event correlation" },
    { icon: Network, name: isArabic ? "السياق التشغيلي Operational context" : "Operational context" },
    { icon: Cpu, name: isArabic ? "ذكاء تدفق العمل Workflow intelligence" : "Workflow intelligence" },
    { icon: AlertCircle, name: isArabic ? "اكتشاف الشذوذ Anomaly detection" : "Anomaly detection" },
    { icon: Bot, name: isArabic ? "التشخيص بالذكاء الاصطناعي" : "AI-assisted diagnosis" },
    { icon: CheckCircle2, name: isArabic ? "الإدراك بنتائج الأعمال" : "Business outcome awareness" },
  ];

  return (
    <section id="zaakiy" className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start divide-y md:divide-y-0 md:divide-x divide-border/60">
          {/* Left Column (md:col-span-7) */}
          <div className="md:col-span-7 space-y-4">
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "بحث وتطوير" : "R&D"}
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-accent font-anta">
              ZaakiyV3RSE
            </h2>

            <h3 className="text-[21px] font-semibold text-primary leading-snug">
              {isArabic
                ? "هل يمكن للنظام فهم ما إذا كان قد حقق ما كُلّف به بالفعل؟"
                : "Can a system understand whether it accomplished what it was supposed to do?"}
            </h3>

            <div className="space-y-3 text-[16.5px] text-secondary leading-[1.65] font-normal">
              <p>
                {isArabic
                  ? "معظم المنصات تخبرك أن المهمة عُمِلت أو أن API أعاد 200 أو أن الرسالة استُهلكت. لكن ذلك لا يعني بالضرورة تحقق نتيجة الأعمال المطلوبة."
                  : "Most platforms can tell us that a job ran, an API returned 200, or a message was consumed. That doesn't necessarily tell us whether the intended business outcome actually happened."}
              </p>
              <p>
                <span className="font-anta text-accent font-bold">ZaakiyV3RSE</span>{" "}
                {isArabic
                  ? "هو المكان الذي أستكشف فيه هذه الفجوة — ربط الإشارات التشغيلية وسياق النظام ونتائج الأعمال لاستكشاف ذكاء تشغيلي أفضل."
                  : "is where I explore that gap — connecting operational signals, system context and business outcomes to investigate better operational intelligence."}
              </p>
              <p className="text-[14.5px] text-muted-foreground italic pt-0.5">
                {isArabic
                  ? "هنا أختبر وأجرب الأفكار دون ادعاء أنها جاهزة للإنتاج الفوري."
                  : "This is where I experiment without pretending every idea is production-ready."}
              </p>
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="h-10 rounded-lg bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 gap-1.5 shadow-xs"
              >
                <Link to="/projects">
                  <span>{isArabic ? "استكشف البحث والتطوير" : "Explore the research"}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column (md:col-span-5) */}
          <div className="md:col-span-5 pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8 space-y-4">
            <div className="text-[14px] font-mono font-semibold text-primary">
              {isArabic ? "مجالات أستكشفها" : "Areas I'm exploring"}
            </div>

            <div className="space-y-3">
              {researchItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex items-center gap-3 text-[14.5px] font-medium text-secondary">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-accent/10 text-accent shrink-0">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

