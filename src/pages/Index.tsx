import { Suspense, lazy, memo, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
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
const ZaakiyHighlights = lazy(
  () => import("@/components/sections/ZaakiyHighlights"),
);
const EngineeringNotes = lazy(
  () => import("@/components/sections/EngineeringNotes"),
);
const BeyondArchitecture = lazy(
  () => import("@/components/sections/BeyondArchitecture"),
);
const Footer = lazy(() => import("@/components/sections/Footer"));
const ZaakiyChatWidget = lazy(() => import("@/components/ZaakiyChatWidget"));

const sectionFallback = (
  <div className="container-narrow py-12">
    <div className="h-32 animate-pulse rounded-2xl bg-muted" />
  </div>
);

type FlowModuleProps = {
  children: ReactNode;
  tone?: "base" | "muted" | "anchor";
};

function FlowModule({ children, tone = "base" }: FlowModuleProps) {
  return (
    <div className={cn("system-module relative", `system-module--${tone}`)}>
      {children}
    </div>
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
      "zaakiy",
      "writing",
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
    <div className="system-shell relative bg-background text-foreground min-h-screen">
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
        <main className="section-flow pt-16 sm:pt-20">
          {/* 01. HERO */}
          <HeroSection04 />

          <Suspense fallback={sectionFallback}>
            {/* 02. SELECTED PRODUCTION SYSTEMS */}
            <FlowModule tone="base">
              <Works />
            </FlowModule>

            {/* 03. ARCHITECTURE IN PRACTICE */}
            <FlowModule tone="muted">
              <ArchitectureInPractice />
            </FlowModule>

            {/* 04. WHAT I ARCHITECT */}
            <FlowModule tone="base">
              <WhatIArchitect />
            </FlowModule>

            {/* 05. ZAAKIYV3RSE */}
            <FlowModule tone="anchor">
              <ZaakiyHighlights />
            </FlowModule>

            {/* 06. ENGINEERING NOTES */}
            <FlowModule tone="muted">
              <EngineeringNotes />
            </FlowModule>

            {/* 07. ABOUT / ENGINEERING LEADERSHIP */}
            <FlowModule tone="base">
              <BeyondArchitecture />
            </FlowModule>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          {/* 08 & 09. FINAL CTA & FOOTER */}
          <Footer />
          <ZaakiyChatWidget extraContext="Page: Sanu Khan portfolio homepage.\nSanu Khan: Technical Architect & Engineering Lead based in Dubai, UAE with 13+ years experience.\nZaakiyV3RSE: An AI-native operations intelligence platform exploring agent orchestration, contextual reasoning, and adaptive workflows." />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Index);
