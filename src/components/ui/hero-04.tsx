import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RotateCardStack } from "@/components/ui/rotate-card-stack";
import { useSiteContent } from "@/data/siteContent";
import { useLocale } from "@/hooks/use-locale";

export function HeroSection04() {
  const { profile, works, skills, ui } = useSiteContent();
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const roleBrand =
    (profile as typeof profile & { roleBrand?: string }).roleBrand ?? "ZaakiyV3RSE";
  const primarySkills = skills.clusters
    .slice(0, 5)
    .map((cluster) => cluster.title.toUpperCase());
  const showcaseWorks = works.slice(0, 3);
  const primaryCtas = profile.ctas.slice(0, 2);
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const reveal: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section
      id="home"
      className="font-body relative overflow-hidden py-12 md:py-16"
    >
      <motion.div
        className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        {/* Eyebrow & ARCHITECT display background */}
        <motion.div className="relative text-center" variants={reveal}>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[11px] font-semibold uppercase text-accent sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {ui.hero.eyebrow}
          </div>

          <h1 className="font-display relative z-10 text-[clamp(3.5rem,14vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-primary/15 select-none pointer-events-none md:text-9xl xl:text-[10rem]">
            {ui.hero.title}
          </h1>

          {/* Overlapping Character Portrait & Core Positioning */}
          <div className="relative -mt-16 sm:-mt-24 z-20 mx-auto max-w-4xl">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10">
              {/* Character Illustration */}
              <div className="shrink-0 w-44 sm:w-52 md:w-60">
                <picture>
                  <source srcSet="/assets/images/sanu.avif" type="image/avif" />
                  <source srcSet="/assets/images/sanu.webp" type="image/webp" />
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.name} portrait`}
                    width={420}
                    height={520}
                    loading="eager"
                    fetchpriority="high"
                    className="h-auto w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]"
                  />
                </picture>
              </div>

              {/* Main Headline & Positioning */}
              <div className="text-center md:text-start max-w-xl">
                <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl md:text-5xl leading-[1.1]">
                  {ui.hero.headline}
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-secondary font-normal">
                  {ui.hero.supporting}
                </p>

                {/* Compact Verified Credibility Line */}
                <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-semibold text-accent/90 border-l-2 rtl:border-r-2 rtl:border-l-0 pl-3 rtl:pr-3 rtl:pl-0 py-0.5">
                  {ui.hero.credibilityLine.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {idx < ui.hero.credibilityLine.length - 1 && (
                        <span className="opacity-40">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Button
                    className="h-11 rounded-xl bg-accent px-6 font-semibold text-white transition-all duration-300 hover:bg-accent/90 shadow-md shadow-accent/20"
                    asChild
                  >
                    <a href="#work">{ui.hero.exploreWork}</a>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border-border bg-secondary/50 px-6 font-semibold text-primary transition-all duration-300 hover:border-accent/50 hover:bg-secondary"
                    asChild
                  >
                    <a href="#architecture">{ui.hero.viewArchitecture}</a>
                  </Button>
                </div>

                {/* Inspiring Leadership Quote */}
                <div className="mt-5 flex items-center justify-center md:justify-start gap-2.5 text-[12px] font-mono tracking-wide text-secondary">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse" />
                  <span className="italic">{ui.hero.quote}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-0 z-0 block dark:hidden"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
        linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: `
        linear-gradient(to right, #404040 1px, transparent 1px),
        linear-gradient(to bottom, #404040 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}
