import { memo } from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";

export function Footer() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground">
      {/* ==================================================
          18. CONTACT CTA (Tactile Architectural Dispatch Card)
          ================================================== */}
      <section id="contact" className="py-10 sm:py-12 md:py-14 scroll-mt-20">
        <div className="container-narrow">
          <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-6 sm:p-8 lg:p-10 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 select-none">
            {/* Drafting Corner Crosshairs */}
            <span
              aria-hidden="true"
              className="absolute top-2.5 left-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 left-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2.5 right-2.5 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>

            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] text-accent font-semibold tracking-wider uppercase">
                  {isArabic ? "قنوات التواصل" : "DISPATCH // OPEN_CHANNELS"}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] text-accent/80 border border-dashed border-accent/40 bg-background/60 px-1.5 py-0.2 rounded transform rotate-1 select-none"
                >
                  STATUS: ACCEPTING
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-primary tracking-[-0.03em] leading-tight mb-3">
                {isArabic ? "هل تواجه مشكلة نظام معقدة؟" : "Have a difficult system problem?"}
              </h2>

              <p className="text-[15.5px] sm:text-[16px] text-secondary leading-relaxed font-normal mb-3">
                {isArabic
                  ? "إذا كنت تعمل على العمارة المعمارية أو التكامل أو تعقيدات المنصة، يسعدني دائماً تبادل الخبرات."
                  : "If you're working through architecture, integration or platform complexity, I'm always happy to compare notes."}
              </p>

              <div className="quote-handwritten text-[16px] sm:text-[17px] text-accent/90">
                {isArabic
                  ? "“ محادثة واحدة قد توفر شهوراً من إعادة البناء. ”"
                  : "“ One candid conversation can save months of architectural rework. ”"}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                asChild
                className="h-11 rounded-lg bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-accent/90 shadow-xs gap-1.5"
              >
                <a href="mailto:hello@sanukhan.dev?subject=Architecture%20Inquiry%20–%20SanuKhan.dev">
                  <span>{isArabic ? "لنتحدث" : "Let's talk"}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-11 rounded-lg border-border bg-surface px-5 text-[14px] font-semibold text-primary transition-colors hover:border-accent/40"
              >
                <a href="mailto:hello@sanukhan.dev">
                  {isArabic ? "راسلني بالبريد" : "Email me"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          19. FOOTER (Minimal Technical Editorial Style)
          ================================================== */}
      <div className="border-t border-border/60 py-8 sm:py-10 text-[14px]">
        <div className="container-narrow flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* LEFT: SanuKhan.dev & identity */}
          <div>
            <a
              href="#home"
              className="inline-flex items-baseline text-[18px] font-semibold tracking-tight text-primary transition-opacity hover:opacity-90 select-none"
              aria-label="SanuKhan.dev home"
            >
              <span>SanuKhan</span>
              <span className="text-accent font-semibold">.dev</span>
            </a>
            <div className="text-muted-foreground text-[13px] mt-1 font-mono">
              {isArabic
                ? "معماري حلول · هندسة المنصات | دبي، الإمارات"
                : "Solution Architect · Platform Engineering | Dubai, UAE"}
            </div>
          </div>

          {/* CENTER NAVIGATION: Work, Architecture, Notes, About */}
          <nav className="flex flex-wrap items-center gap-6 text-[14px] font-medium text-secondary" aria-label="Footer Navigation">
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
          </nav>

          {/* SOCIAL LINKS: LinkedIn, GitHub, Email */}
          <div className="flex items-center gap-5 text-sm font-medium text-secondary">
            <a
              href="https://www.linkedin.com/in/sanukhandev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Linkedin className="h-4 w-4 text-accent" />
              LinkedIn
            </a>
            <a
              href="https://github.com/sanukhandev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4 text-accent" />
              GitHub
            </a>
            <a
              href="mailto:hello@sanukhan.dev"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4 text-accent" />
              Email
            </a>
          </div>
        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="container-narrow pt-8 mt-8 border-t border-dashed border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground font-mono text-[12px]">
          <div>
            {isArabic
              ? `© ${currentYear} سانو خان. صُممت بحرفية.`
              : `© ${currentYear} Sanu Khan. Designed with intent.`}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>25.2048° N, 55.2708° E · AE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
