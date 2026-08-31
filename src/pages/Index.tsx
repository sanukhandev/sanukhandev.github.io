import { Suspense, lazy, memo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { revealInView } from "@/lib/design-system";
import { pageSeo } from "@/lib/seo";
import { buildHomepageSchemas } from "@/lib/schema";
import { trackEvent } from "@/utils/analytics";
import { HeroSection04 } from "@/components/ui/hero-04";

const TechParticles = lazy(() => import("@/components/TechParticles"));
const Works = lazy(() => import("@/components/sections/Works"));
const ArchitectureInPractice = lazy(
  () => import("@/components/sections/ArchitectureInPractice"),
);
const WhatIArchitect = lazy(
  () => import("@/components/sections/WhatIArchitect"),
);
const SystemsPhilosophy = lazy(
  () => import("@/components/sections/SystemsPhilosophy"),
);
const ZaakiyHighlights = lazy(
  () => import("@/components/sections/ZaakiyHighlights"),
);
const EngineeringNotes = lazy(
  () => import("@/components/sections/EngineeringNotes"),
);
const ArchitectureProcess = lazy(
  () => import("@/components/sections/ArchitectureProcess"),
);
const FromAmbiguityToProduction = lazy(
  () => import("@/components/sections/FromAmbiguityToProduction"),
);
const EngineeringLeadership = lazy(
  () => import("@/components/sections/EngineeringLeadership"),
);
const CareerSummary = lazy(
  () => import("@/components/sections/CareerSummary"),
);
const Footer = lazy(() => import("@/components/sections/Footer"));
const ZaakiyChatWidget = lazy(() => import("@/components/ZaakiyChatWidget"));

const sectionFallback = (
  <div className="container-narrow section-pad">
    <div className="h-40 animate-pulse rounded-2xl bg-muted" />
  </div>
);

type FlowModuleProps = {
  children: ReactNode;
  index: number;
  tone?: "base" | "muted" | "anchor";
};

function FlowModule({ children, index, tone = "base" }: FlowModuleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("system-module", `system-module--${tone}`)}
      initial={reducedMotion ? false : revealInView.initial}
      whileInView={reducedMotion ? undefined : revealInView.whileInView}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : index * 0.04,
      }}
    >
      <span className="system-connector" aria-hidden />
      {children}
    </motion.div>
  );
}

const Index = () => {
  const { isSwitchingLocale } = useLocale();
  const reducedMotion = useReducedMotion();
  const [enableParticles, setEnableParticles] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(
        () => setEnableParticles(true),
        { timeout: 1500 },
      );
      return () => window.cancelIdleCallback(idleId);
    }

    const timer = setTimeout(() => setEnableParticles(true), 350);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const trackedSections = new Set<string>();
    const sectionIds = [
      "home",
      "work",
      "architecture",
      "capabilities",
      "philosophy",
      "zaakiy",
      "writing",
      "process",
      "how-i-work",
      "leadership",
      "about",
      "contact",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionName = entry.target.id;
          if (!sectionName || trackedSections.has(sectionName)) {
            return;
          }

          trackedSections.add(sectionName);
          trackEvent("section_view", { section_name: sectionName });
          trackEvent("section_engagement", { section_name: sectionName });
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.4,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (isSwitchingLocale) {
    return <LocaleSwitchSkeleton />;
  }

  return (
    <div className="system-shell relative bg-background text-foreground">
      <div className="system-backdrop pointer-events-none fixed inset-0 -z-10" />
      {enableParticles ? (
        <Suspense fallback={null}>
          <div className="pointer-events-none fixed inset-0 z-0 opacity-75">
            <TechParticles count={14} fullPage />
          </div>
        </Suspense>
      ) : null}
      <div className="pointer-events-none fixed inset-0 z-0 system-grid" />
      <div className="pointer-events-none fixed inset-0 z-0 system-noise" />

      <div className="relative z-10">
        <SeoMeta
          title={pageSeo.home.title}
          description={pageSeo.home.description}
          canonicalPath={pageSeo.home.canonicalPath}
          keywords={pageSeo.home.keywords}
          kind="profile"
          schema={buildHomepageSchemas()}
        />
        <Navbar />
        <motion.main
          className="section-flow pt-20 sm:pt-24"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* 1. HERO */}
          <HeroSection04 />

          <Suspense fallback={sectionFallback}>
            {/* 2. SELECTED PRODUCTION SYSTEMS */}
            <FlowModule index={1} tone="base">
              <Works />
            </FlowModule>

            {/* 3. ARCHITECTURE IN PRACTICE */}
            <FlowModule index={2} tone="muted">
              <ArchitectureInPractice />
            </FlowModule>

            {/* 4. WHAT I ARCHITECT */}
            <FlowModule index={3} tone="base">
              <WhatIArchitect />
            </FlowModule>

            {/* 5. SYSTEMS PHILOSOPHY */}
            <FlowModule index={4} tone="muted">
              <SystemsPhilosophy />
            </FlowModule>

            {/* 6. ZAAKIYV3RSE R&D */}
            <FlowModule index={5} tone="anchor">
              <ZaakiyHighlights />
            </FlowModule>

            {/* 7. ENGINEERING NOTES */}
            <FlowModule index={6} tone="muted">
              <EngineeringNotes />
            </FlowModule>

            {/* 8. HOW I THINK ABOUT ARCHITECTURE */}
            <FlowModule index={7} tone="base">
              <ArchitectureProcess />
            </FlowModule>

            {/* 9. FROM AMBIGUITY TO PRODUCTION */}
            <FlowModule index={8} tone="muted">
              <FromAmbiguityToProduction />
            </FlowModule>

            {/* 10. ENGINEERING LEADERSHIP */}
            <FlowModule index={9} tone="base">
              <EngineeringLeadership />
            </FlowModule>

            {/* 11. ABOUT & CAREER SUMMARY */}
            <FlowModule index={10} tone="muted">
              <CareerSummary />
            </FlowModule>
          </Suspense>
        </motion.main>
        <Suspense fallback={null}>
          {/* 12. FINAL CTA & FOOTER */}
          <Footer />
          <ZaakiyChatWidget extraContext="Page: Sanu Khan portfolio homepage.\nSanu Khan: Technical Architect & Engineering Lead based in Dubai, UAE with 13+ years experience.\nZaakiyV3RSE: An AI-native operations intelligence platform exploring agent orchestration, contextual reasoning, and adaptive workflows." />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Index);
