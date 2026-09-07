import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function Footer() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  return (
    <footer className="border-t border-border/60 bg-background text-foreground">
      {/* Soft Light-Green Contact CTA Box */}
      <section id="contact" className="py-12 md:py-16 scroll-mt-20">
        <div className="container-narrow">
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left Side */}
            <div className="max-w-xl space-y-3">
              <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                {isArabic ? "لنتحدث" : "LET'S TALK"}
              </div>

              <h2 className="section-h2 text-primary">
                {isArabic
                  ? "هل تواجه تحدياً معقداً في نظامك؟"
                  : "Have a difficult system problem?"}
              </h2>

              <p className="text-[16px] text-secondary leading-relaxed font-normal">
                {isArabic
                  ? "إذا كنت تعمل على العمارة المعمارية أو والتكامل أو تعقيدات المنصة، يسعدني دائماً تبادل الخبرات."
                  : "If you're working through architecture, integration or platform complexity, I'm always happy to compare notes."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  className="h-10 rounded-lg bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 gap-1.5 shadow-xs"
                >
                  <a href="mailto:hello@sanukhan.dev?subject=Architecture%20Inquiry%20–%20SanuKhan.dev">
                    <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </a>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  className="h-10 rounded-lg border-border bg-background px-5 text-[14px] font-semibold text-primary transition-colors hover:border-accent/40"
                >
                  <a href="mailto:hello@sanukhan.dev">
                    {isArabic ? "راسلني بالبريد" : "Email me"}
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col md:items-end gap-3 text-[13px] font-mono text-muted-foreground">
              <span>{isArabic ? "أو تواصل معي عبر ———" : "Or find me on ———"}</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/sanukhandev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-accent" />
                  LinkedIn
                </a>

                <a
                  href="https://github.com/sanukhandev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-accent transition-colors"
                >
                  <Github className="h-4 w-4 text-accent" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-8 border-t border-border/60 text-[13px]">
        <div className="container-narrow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div>
            <div className="wordmark inline-flex items-baseline text-primary select-none">
              {isArabic ? (
                <span>سانو خان</span>
              ) : (
                <>
                  <span>SanuKhan</span>
                  <span className="wordmark-domain">.dev</span>
                </>
              )}
            </div>
            <div className="text-muted-foreground text-[13px] mt-1 font-mono">
              {isArabic
                ? "معماري حلول · هندسة المنصات | دبي، الإمارات"
                : "Solution Architect · Platform Engineering | Dubai, UAE"}
            </div>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center gap-5 text-secondary text-[14px] font-medium">
            <a href="#work" className="hover:text-accent transition-colors">
              {isArabic ? "الأعمال" : "Work"}
            </a>
            <a href="#architecture" className="hover:text-accent transition-colors">
              {isArabic ? "المعمارية" : "Architecture"}
            </a>
            <a href="#writing" className="hover:text-accent transition-colors">
              {isArabic ? "الملاحظات" : "Notes"}
            </a>
            <a href="#about" className="hover:text-accent transition-colors">
              {isArabic ? "نبذة عني" : "About"}
            </a>
            <a href="/Sanu Khan - Resume.pdf" download className="hover:text-accent transition-colors">
              {isArabic ? "السيرة الذاتية" : "Resume"}
            </a>
          </div>

          {/* Right Copyright */}
          <div className="text-muted-foreground font-mono text-[12.5px]">
            {isArabic
              ? `© ${new Date().getFullYear()} سانو خان. بُني بهدف.`
              : `© ${new Date().getFullYear()} Sanu Khan. Built with purpose.`}
          </div>
        </div>
      </div>
    </footer>
  );
}

