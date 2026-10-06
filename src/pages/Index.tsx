import { Suspense, lazy, memo } from "react";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildHomepageSchemas } from "@/lib/schema";
import { HeroSection04 } from "@/components/ui/hero-04";
import ScrollReveal from "@/components/ui/scroll-reveal";

const Works = lazy(() => import("@/components/sections/Works"));
const HowIThink = lazy(() => import("@/components/sections/HowIThink"));
const ArchitectureInPractice = lazy(() => import("@/components/sections/ArchitectureInPractice"));
const CrossTapeMarquee = lazy(() => import("@/components/sections/CrossTapeMarquee"));
const ProblemsSection = lazy(() => import("@/components/sections/ProblemsSection"));
const DomainExperience = lazy(() => import("@/components/sections/DomainExperience"));
const ZaakiyHighlights = lazy(() => import("@/components/sections/ZaakiyHighlights"));
const EngineeringNotes = lazy(() => import("@/components/sections/EngineeringNotes"));
const AboutTeaser = lazy(() => import("@/components/sections/AboutTeaser"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const sectionFallback = (
  <div className="container-narrow py-8">
    <div className="h-24 animate-pulse rounded-xl bg-muted/40" />
  </div>
);

const Index = () => {
  const { isSwitchingLocale, locale } = useLocale();
  const currentSeo = getLocalizedPageSeo("home", locale);

  if (isSwitchingLocale) {
    return <LocaleSwitchSkeleton />;
  }

  return (
    <div className="relative bg-background text-foreground min-h-screen">
      {/* Accessible Skip to Content Link (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        {locale === "ar" ? "الانتقال إلى المحتوى الرئيسي" : "Skip to content"}
      </a>

      <SeoMeta
        title="Software Engineer & Solution Architect in Dubai, UAE"
        description="Software Engineer and Solution Architect in Dubai, UAE with 13+ years designing enterprise integrations, distributed platforms and cloud systems across retail, airline, automotive and SaaS environments."
        canonicalPath={currentSeo.canonicalPath}
        keywords={[
          "Software Engineer UAE",
          "Software Engineer Dubai",
          "Solution Architect Dubai",
          "Platform Engineer UAE",
          "Enterprise Integration Architect",
          "Cloud Architect Dubai",
          "Distributed Systems Architect",
          "Event-Driven Architecture",
          "Sanu Khan",
        ]}
        kind="profile"
        schema={buildHomepageSchemas()}
      />

      <Navbar />

      <main id="main-content" className="pt-[72px] sm:pt-20">
        {/* 01. HERO (Includes copy, CTAs, Avatar, and Metrics in mobile-first responsive order) */}
        <HeroSection04 />

        {/* 02. SELECTED WORK */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <Works />
          </ScrollReveal>
        </Suspense>

        {/* 03. HOW I THINK (Architecture Principles) */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <HowIThink />
          </ScrollReveal>
        </Suspense>

        {/* 04. ARCHITECTURE IN PRACTICE (Interactive Blueprint Diagram) */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <ArchitectureInPractice />
          </ScrollReveal>
        </Suspense>

        {/* MID-PAGE CROSS TAPE MARQUEE */}
        <Suspense fallback={null}>
          <CrossTapeMarquee />
        </Suspense>

        {/* 05. PROBLEMS I GET PULLED INTO */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <ProblemsSection />
          </ScrollReveal>
        </Suspense>

        {/* 06. DOMAINS I WORK ACROSS */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <DomainExperience />
          </ScrollReveal>
        </Suspense>

        {/* 07. ZAAKIYV3RSE / LAB SECTION */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <ZaakiyHighlights />
          </ScrollReveal>
        </Suspense>

        {/* 08. ENGINEERING NOTES */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <EngineeringNotes />
          </ScrollReveal>
        </Suspense>

        {/* 09. ABOUT */}
        <Suspense fallback={sectionFallback}>
          <ScrollReveal>
            <AboutTeaser />
          </ScrollReveal>
        </Suspense>

        {/* 10. CONTACT CTA & FOOTER */}
        <Suspense fallback={null}>
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </Suspense>
      </main>
    </div>
  );
};

export default memo(Index);
