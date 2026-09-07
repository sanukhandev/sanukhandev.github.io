import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function AboutTeaser() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="about" className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column (md:col-span-7) */}
          <div className="md:col-span-7 space-y-4">
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "نبذة عني" : "ABOUT"}
            </div>

            <h2 className="section-h2 text-primary leading-tight">
              {isArabic ? (
                "بدأت بالقرب من البنية التحتية أكثر من عمارة التطبيقات."
              ) : (
                <>
                  I started closer to infrastructure <br className="hidden sm:block" />
                  than application architecture.
                </>
              )}
            </h2>

            <div className="space-y-3 text-[16.5px] text-secondary leading-[1.65] font-normal">
              <p>
                {isArabic
                  ? "العمل مع الشبكات والأنظمة أعطاني عادة لم أفقدها أبداً: أميل إلى النظر إلى البرمجيات من الخارج إلى الداخل — ما تعتمد عليه، وما يعتمد عليها، ومن يمتلك البيانات، وكيف تفشل وكيف يعرف المشغل ما إذا كانت قد أدت عملها بالفعل."
                  : "Working with networks and systems gave me a habit I've never really lost: I tend to look at software from the outside in — what it depends on, what depends on it, where data is owned, how it fails and how someone operating it knows whether it actually did its job."}
              </p>
              <p>
                {isArabic
                  ? "هذا التفكير رافقني عبر هندسة التطبيقات وتجزئة الطيران وتجارة المؤسسات ومنصات السيارات وبيئات التكامل الضخمة."
                  : "That thinking followed me through application engineering, airline retailing, enterprise commerce, automotive platforms and large integration environments."}
              </p>
              <p>
                {isArabic
                  ? "اليوم يقع معظم عملي بين عمارة الحلول وهندسة المنصات والقيادة التقنية — لكني أصر على البقاء قريباً من التنفيذ لأعرف ما إذا كانت العمارة تعمل فعلياً."
                  : "Today, most of my work sits somewhere between solution architecture, platform engineering and technical leadership — but I still like getting close enough to implementation to know whether the architecture actually works."}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline"
              >
                <span>{isArabic ? "المزيد عني" : "More about me"}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Right Column (md:col-span-5) — Handwritten Quote */}
          <div className="md:col-span-5 flex items-center justify-center pt-4 md:pt-0">
            <div className="font-handwritten text-2xl sm:text-3xl text-accent font-semibold leading-relaxed tracking-wide transform -rotate-2 max-w-xs text-center md:text-left rtl:md:text-right select-none">
              {isArabic ? (
                <>
                  “ الأنظمة الجيدة لا تُبنى فقط. <br />
                  &nbsp;&nbsp;بل تُفهم وتُشغَّل <br />
                  &nbsp;&nbsp;وتتطور. ”
                </>
              ) : (
                <>
                  “ Good systems aren't just built. <br />
                  &nbsp;&nbsp;They're understood, operated <br />
                  &nbsp;&nbsp;and evolved. ”
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

