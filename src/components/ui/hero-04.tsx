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
    (profile as typeof profile & { roleBrand?: string }).roleBrand ?? "Zaakiy V3RSE";
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
      className="font-body relative min-h-[86vh] overflow-hidden py-12 md:py-14 lg:min-h-screen"
    >
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-6"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        <motion.div className="relative" variants={reveal}>
          <h1 className="font-display relative z-20 text-center text-7xl font-bold tracking-[-7px] text-primary md:text-9xl md:tracking-[-14px] xl:text-[10rem] xl:tracking-[-1rem] leading-[0.95]">
            {ui.hero.title}
          </h1>
          <p className="font-body mt-3 px-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-secondary md:text-xs">
            {ui.hero.metaLine}
          </p>
          
          <p className="font-body absolute -bottom-9 left-24 text-4xl font-thin tracking-[6px] xl:hidden">
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

        <motion.div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center md:gap-8 " variants={reveal}>
          <div className="w-full md:self-center">
            <p className="text-primary font-body ml-auto max-w-xl text-right text-sm font-medium tracking-wide md:text-base">
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
            <div className="font-body relative z-20 text-left text-xl font-semibold">
              {primarySkills.map((skill) => (
                <div key={skill}>/ {skill}</div>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-3 pt-4" variants={reveal}>
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
                  className={`h-10 rounded-lg border border-accent/50 bg-transparent px-5 text-accent hover:text-white transition-all duration-300 ease-out ${
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

        <motion.div className="mt-1 flex flex-col gap-8 md:mt-1 md:grid md:grid-cols-[18rem_minmax(0,1fr)] md:items-center md:gap-16" variants={reveal}>
          <div className="relative h-48 w-[18rem]">
            <div className="h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[0]?.scope ?? "Platform"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[0]?.title ?? "Enterprise Systems"}
              </p>
            </div>
            <div className="absolute left-6 -top-6 h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[1]?.scope ?? "Integration"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[1]?.title ?? "Cloud Delivery"}
              </p>
            </div>
            <div className="absolute left-12 -top-12 h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[2]?.scope ?? "Commerce"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[2]?.title ?? "Distributed Architectures"}
              </p>
            </div>
          </div>
          <div className="md:self-center">
            <div className="flex items-center gap-2 md:justify-start">
              <span className="font-body text-lg font-medium tracking-wider">
                {ui.hero.recentExperienceLabel}
              </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="md:text-left">
              <h2 className="font-display text-5xl uppercase tracking-[-4px]">
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
