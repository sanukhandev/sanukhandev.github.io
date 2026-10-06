import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

export function AboutTeaser() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <section id="about" className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column (7 cols): Editorial Text & Journey */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                {isArabic ? "نبذة عني" : "ABOUT"}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[10px] text-muted-foreground/75 border border-dashed border-border px-1.5 py-0.2 rounded transform -rotate-1 select-none"
              >
                [ORIGIN // INFRA_FIRST]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08] mb-6">
              {isArabic ? (
                <>
                  بدأت بالقرب من البنية التحتية <br className="hidden sm:inline" />
                  أكثر من عمارة التطبيقات.
                </>
              ) : (
                <>
                  I started closer to infrastructure <br className="hidden sm:inline" />
                  than application architecture.
                </>
              )}
            </h2>

            <div className="space-y-4 text-[15.5px] sm:text-[16.5px] text-secondary leading-[1.7] font-normal mb-8 max-w-2xl">
              <p>
                {isArabic
                  ? "العمل مع الشبكات والأنظمة أعطاني عادة لم أفقدها أبداً: أحب أن أنظر إلى البرمجيات من الخارج إلى الداخل — ما تعتمد عليه، وما الذي يمكن أن يفشل فيها وكيف، وكيف تؤثر القرارات المتخذة في مجال واحد على بقية المنظومة."
                  : "Working with networks and systems gave me a habit I've never really lost: I like to look at software from the outside in — what it depends on, what can and will go wrong, and how decisions made in one area affect the rest of the system."}
              </p>
              <p>
                {isArabic
                  ? "ذلك التفكير رافقني عبر هندسة التطبيقات، وأعمال التكامل، وتجارة المؤسسات، ومنصات السيارات، وبيئات التكامل الواسعة."
                  : "That thinking followed me through application engineering, integration work, enterprise commerce, automotive platforms and large integration environments."}
              </p>
              <p>
                {isArabic
                  ? "اليوم، يقع معظم عملي بين عمارة الحلول، وهندسة المنصات، والقيادة التقنية."
                  : "Today, most of my work sits somewhere between solution architecture, platform engineering and technical leadership."}
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="h-11 rounded-lg border-border bg-transparent px-5 text-[14px] font-semibold text-primary transition-colors hover:border-accent/40 hover:bg-secondary/20 gap-2"
            >
              <Link to="/about">
                <span>{isArabic ? "المزيد عني" : "More about me"}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>

          {/* Right Column (5 cols): Unboxed Editorial Simple Green Quote */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pt-2 lg:pt-0 select-none">
            <blockquote className="relative max-w-md w-full">
              <p className="quote-handwritten text-accent text-3xl sm:text-4xl lg:text-[40px] leading-[1.28] mb-5 font-normal">
                {isArabic ? (
                  <>
                    “ الأنظمة الجيدة لا تُبنى فقط. <br />
                    إنها تُفهم، <br />
                    وتُشغَّل، <br />
                    وتتطور. ”
                  </>
                ) : (
                  <>
                    “Good systems aren't just built. <br />
                    They're understood, <br />
                    operated <br />
                    and evolved.”
                  </>
                )}
              </p>
              <footer className="text-[13px] font-mono text-muted-foreground font-semibold flex items-center justify-between pt-2 border-t border-border/40">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-0.5 bg-accent rounded-full" aria-hidden="true" />
                  — {isArabic ? "سانو خان" : "Sanu Khan"}
                </span>
                <span className="text-[11px] font-mono text-accent font-semibold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20 select-none">
                  AE
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutTeaser);
