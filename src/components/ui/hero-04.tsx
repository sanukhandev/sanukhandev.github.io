import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/data/siteContent";
import { useLocale } from "@/hooks/use-locale";

export function HeroSection04() {
  const { profile, works, skills, ui } = useSiteContent();
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const roleBrand =
    (profile as typeof profile & { roleBrand?: string }).roleBrand ?? " ZaakiyV3RSE";
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
      className="font-body relative min-h-[86vh] overflow-hidden py-10 md:py-14 lg:min-h-screen"
    >
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        <motion.div className="relative" variants={reveal}>
          <h1 className="font-display relative z-20 text-center text-[clamp(3.2rem,16vw,7.2rem)] font-bold leading-[0.95] tracking-[-0.045em] text-primary md:text-9xl md:tracking-[-14px] xl:text-[10rem] xl:tracking-[-1rem]">
            {ui.hero.title}
          </h1>
          <p className="font-body mt-3 px-2 text-center text-xs font-medium uppercase tracking-[0.1em] text-secondary sm:px-4 md:text-sm">
            {ui.hero.metaLine}
          </p>
          
          <p className="font-body absolute -bottom-8 left-1/2 hidden -translate-x-1/2 text-3xl font-thin tracking-[4px] sm:block xl:hidden">
            <span
              className="brand-zaakiy text-accent"
              style={{
                textShadow:
                  "0 0 18px color-mix(in srgb, var(--accent) 28%, transparent)",
              }}
            >
              {roleBrand}
            </span>
          </p>
        </motion.div>

        <motion.div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center md:gap-8" variants={reveal}>
          <div className="w-full md:self-center">
            <p className="text-primary font-body mx-auto max-w-xl text-center text-sm font-medium tracking-wide md:ml-auto md:text-right md:text-base">
              {isArabic ? profile.subtitle : profile.subtitle.toUpperCase()}
              <br />
              {isArabic ? profile.statement : profile.statement.toUpperCase()}
              <br />
              {ui.hero.impactLine}
            </p>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-full max-w-[20rem] overflow-hidden opacity-90 md:max-w-[23rem]">
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} portrait`}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="w-full text-xl font-bold md:self-center md:text-2xl lg:text-3xl">
            <div className="font-body relative z-20 text-center text-lg font-semibold sm:text-xl md:text-left">
              {primarySkills.map((skill) => (
                <div key={skill}>/ {skill}</div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-2 pt-4 sm:gap-3" variants={reveal}>
          {primaryCtas.map((cta, index) => {
            const isExternal = /^https?:\/\//i.test(cta.href);

            return (
              <motion.div
                key={`${cta.label}-${cta.href}`}
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              >
                <Button
                  className={`h-10 w-full rounded-lg border border-accent/50 bg-transparent px-4 text-accent transition-all duration-300 ease-out hover:text-white sm:w-auto sm:px-5 ${
                    reduceMotion ? "" : "hover:scale-110 hover:-translate-y-1"
                  }`}
                  asChild
                >
                  <a
                    href={cta.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {cta.label}
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="mt-6 flex flex-col gap-8 md:mt-8 md:grid md:grid-cols-[18rem_minmax(0,1fr)] md:items-center md:gap-14" variants={reveal}>
          <div className="relative mx-auto h-44 w-full max-w-[17rem] md:mx-0 md:h-48 md:w-[18rem]">
            <div className="h-32 w-full overflow-hidden rounded-md border border-default bg-secondary p-3 shadow-lg sm:h-36 sm:w-60 sm:p-4">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[0]?.scope ?? "Platform"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[0]?.title ?? "Enterprise Systems"}
              </p>
            </div>
            <div className="absolute left-3 -top-4 h-32 w-[calc(100%-0.75rem)] overflow-hidden rounded-md border border-default bg-secondary p-3 shadow-lg sm:left-6 sm:-top-6 sm:h-36 sm:w-60 sm:p-4">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[1]?.scope ?? "Integration"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[1]?.title ?? "Cloud Delivery"}
              </p>
            </div>
            <div className="absolute left-6 -top-8 h-32 w-[calc(100%-1.5rem)] overflow-hidden rounded-md border border-default bg-secondary p-3 shadow-lg sm:left-12 sm:-top-12 sm:h-36 sm:w-60 sm:p-4">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[2]?.scope ?? "Commerce"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[2]?.title ?? "Distributed Architectures"}
              </p>
            </div>
          </div>
          <div className="text-center md:self-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="font-body text-lg font-medium tracking-wider">
                {ui.hero.recentExperienceLabel}
              </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="mt-2 md:text-left">
              <h2 className="font-display text-[clamp(2rem,8vw,3.1rem)] uppercase tracking-[-0.03em] md:tracking-[-4px]">
                {ui.hero.architectureWithoutLimits}
              </h2>
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
