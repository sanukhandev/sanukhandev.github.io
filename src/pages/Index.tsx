import { Suspense, lazy, memo, useEffect } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TechParticles from "@/components/TechParticles";
import EngineeringPhilosophy from "@/components/sections/EngineeringPhilosophy";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import SeoMeta from "@/components/SeoMeta";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { revealInView } from "@/lib/design-system";
import { trackEvent } from "@/utils/analytics";
import { HeroSection04 } from "@/components/ui/hero-04";

const Articles = lazy(() => import("@/components/sections/Articles"));
const Works = lazy(() => import("@/components/sections/Works"));
const Services = lazy(() => import("@/components/sections/Services"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const ZaakiyHighlights = lazy(
  () => import("@/components/sections/ZaakiyHighlights"),
);
const BlogPreview = lazy(() => import("@/components/sections/BlogPreview"));
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
      initial={
        reducedMotion ? false : revealInView.initial
      }
      whileInView={
        reducedMotion ? undefined : revealInView.whileInView
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : index * 0.05,
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

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const trackedSections = new Set<string>();
    const sectionIds = [
      "home",
      "philosophy",
      "stack",
      "works",
      "ops-intelligence",
      "principles",
      "experience",
      "ecosystem",
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
        threshold: 0.45,
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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-75">
        <TechParticles count={18} fullPage />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 system-grid" />
      <div className="pointer-events-none fixed inset-0 z-0 system-noise" />

      <div className="relative z-10">
        <SeoMeta
          title="Sanu Khan | Tech Lead & Cloud Architect UAE"
          description="Tech Lead and Cloud Architect in Dubai UAE. 13+ years delivering distributed systems, event-driven platforms, and enterprise integrations across MENA and global markets."
          canonicalPath="/"
          keywords="sanu khan, tech lead dubai, cloud architect uae, full stack engineer, distributed systems"
        />
        <Navbar />
        <motion.main
          className="section-flow"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <HeroSection04 />
          <EngineeringPhilosophy />
          <Suspense fallback={sectionFallback}>
            <FlowModule index={1} tone="muted">
              <Skills />
            </FlowModule>
            <FlowModule index={2} tone="muted">
              <Works />
            </FlowModule>
            <FlowModule index={3} tone="anchor">
              <ZaakiyHighlights />
            </FlowModule>
            <FlowModule index={4} tone="muted">
              <Articles />
            </FlowModule>
            <FlowModule index={5} tone="muted">
              <Services />
            </FlowModule>
            <FlowModule index={6} tone="muted">
              <BlogPreview />
            </FlowModule>
          </Suspense>
        </motion.main>
        <Suspense fallback={null}>
          <Footer />
          <ZaakiyChatWidget extraContext="Page: Sanu Khan portfolio homepage.\nZaakiy V3RSE: A suite of AI-driven platforms built by Sanu Khan.\n- Zaakiy AI: Multilingual AI chat support platform (10K+ conversations, English & Arabic).\n- Zaakiy CRM: CRM solution for SMEs, content creators, and social media influencers.\n- Zaakiy ERP: ERP solutions including a real estate platform.\n- Zaakiy GO: Food delivery app in Dubai.\nSanu is the founder and Solution Architect behind Zaakiy V3RSE." />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Index);
