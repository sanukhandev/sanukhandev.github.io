/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowDownRight } from "@aliimam/icons";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/data/siteContent";
import { useLocale } from "@/hooks/use-locale";

export function HeroSection04() {
  const { profile, works, skills } = useSiteContent();
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
    <section className="font-body relative min-h-[86vh] overflow-hidden py-12 md:py-14 lg:min-h-screen">
      <motion.div
        className="relative z-20 mx-auto max-w-7xl px-6"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        <motion.div className="relative" variants={reveal}>
          <p className="font-body absolute -top-2 left-20 text-sm font-medium tracking-wider">
            {isArabic ? "منذ 2011 |  13+ سنوات | دبي، الإمارات | مفتوح المصدر | مهندس" : "SINCE 2011 |  13+ YEARS | DUBAI, UAE | OPEN SOURCE | ARCHITECT | TECH LEAD | CONSULTANT | DEVELOPER | TECH ENTREPRENEUR | WRITER"}
          </p>
          <h1 className="font-display relative z-20 text-center text-7xl font-bold tracking-[-7px] text-primary md:text-9xl md:tracking-[-14px] xl:text-[10rem] xl:tracking-[-1rem] leading-[0.95]">
            {isArabic ? (
              "مهندس"
            ) : (
              "ARCHITECT"
            )}
          </h1>
          <p className="font-body absolute -bottom-9 right-24 hidden text-4xl font-thin tracking-[6px] xl:block">
            <span
              style={{
                fontFamily: "'Anta', sans-serif",
                textShadow:
                  "0 0 18px color-mix(in srgb, var(--accent) 28%, transparent)",
              }}
              className="text-accent"
            >
              {roleBrand}
            </span>
          </p>
          <p className="font-body absolute -bottom-9 left-24 text-4xl font-thin tracking-[6px] xl:hidden">
            <span
              style={{
                fontFamily: "'Anta', sans-serif",
                textShadow:
                  "0 0 18px color-mix(in srgb, var(--accent) 28%, transparent)",
              }}
              className="text-accent"
            >
              {roleBrand}
            </span>
          </p>
        </motion.div>

        <motion.div className="relative grid grid-cols-1 gap-6 pt-12 md:grid-cols-3 md:items-center md:gap-8 md:pt-14" variants={reveal}>
          <div className="w-full md:self-center">
            <p className="text-primary font-body ml-auto max-w-xl text-right text-sm font-medium tracking-wide md:text-base">
              {isArabic ? profile.subtitle : profile.subtitle.toUpperCase()}
              <br />
              {isArabic ? profile.statement : profile.statement.toUpperCase()}
              <br />
              {isArabic ? "هندسة. تكامل. تأثير." : "ARCHITECTURE. INTEGRATION. IMPACT."}
            </p>
          </div>

          <div className="flex w-full justify-center">
            <div className="w-full max-w-[17rem] overflow-hidden opacity-90 md:max-w-[19rem]">
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
            const isPrimary = index === 0;
            const isExternal = /^https?:\/\//i.test(cta.href);

            return (
              <motion.div
                key={`${cta.label}-${cta.href}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
              >
                <Button
                  size="lg"
                  variant={isPrimary ? "default" : "outline"}
                  asChild
                  className={isPrimary ? "shadow-[0_10px_24px_-14px_rgba(56,199,85,0.75)]" : ""}
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

        <motion.div className="mt-12 items-end justify-between md:mt-14 md:flex" variants={reveal}>
          <div className="relative">
            <div className="mb-8 h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg md:mb-0">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[0]?.scope ?? "Platform"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[0]?.title ?? "Enterprise Systems"}
              </p>
            </div>
            <div className="absolute left-6 -top-6 mb-8 h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg md:mb-0">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[1]?.scope ?? "Integration"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[1]?.title ?? "Cloud Delivery"}
              </p>
            </div>
            <div className="absolute left-12 -top-12 mb-8 h-36 w-60 overflow-hidden rounded-md border border-default bg-secondary p-4 shadow-lg md:mb-0">
              <p className="font-body text-xs uppercase tracking-wider text-secondary">
                {showcaseWorks[2]?.scope ?? "Commerce"}
              </p>
              <p className="font-body mt-2 text-sm font-semibold text-primary">
                {showcaseWorks[2]?.title ?? "Distributed Architectures"}
              </p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 md:justify-end">
              <span className="font-body text-lg font-medium tracking-wider">
                {isArabic ? "أحدث الأعمال" : "RECENT WORK"}
              </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="mt-3 md:text-right">
              <h2 className="font-display text-5xl uppercase tracking-[-4px]">
                {isArabic ? "عمارة بلا حدود" : "Architecture without Limits"}
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
