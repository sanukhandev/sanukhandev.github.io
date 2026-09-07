import { Suspense, lazy, memo } from "react";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildHomepageSchemas } from "@/lib/schema";
import { HeroSection04 } from "@/components/ui/hero-04";

const ExperienceStrip = lazy(() => import("@/components/sections/ExperienceStrip"));
const Works = lazy(() => import("@/components/sections/Works"));
const HowIThink = lazy(() => import("@/components/sections/HowIThink"));
const ArchitectureInPractice = lazy(() => import("@/components/sections/ArchitectureInPractice"));
const ProblemsSection = lazy(() => import("@/components/sections/ProblemsSection"));
const DomainExperience = lazy(() => import("@/components/sections/DomainExperience"));
const ZaakiyHighlights = lazy(() => import("@/components/sections/ZaakiyHighlights"));
const EngineeringNotes = lazy(() => import("@/components/sections/EngineeringNotes"));
const AboutTeaser = lazy(() => import("@/components/sections/AboutTeaser"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const sectionFallback = (
  <div className="container-narrow py-12">
    <div className="h-24 animate-pulse rounded-xl bg-muted" />
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
      <SeoMeta
        title="Sanu Khan — Solution Architect & Platform Engineer"
        description="Solution Architect with 13+ years designing enterprise integrations, distributed platforms and cloud systems across retail, airline, automotive and SaaS environments."
        canonicalPath={currentSeo.canonicalPath}
        keywords={[
          "Solution Architect Dubai",
          "Platform Engineer UAE",
          "Enterprise Integration Architect",
          "Cloud Architect Dubai",
          "Distributed Systems Architect",
          "Event-Driven Architecture",
          "Sanu Khan"
        ]}
        kind="profile"
        schema={buildHomepageSchemas()}
      />

      <Navbar />

      <main className="pt-16 sm:pt-20">
        {/* 01. HERO (with integrated Experience Strip) */}
        <HeroSection04 />

        {/* 03. SELECTED ARCHITECTURE WORK */}
        <Suspense fallback={sectionFallback}>
          <Works />
        </Suspense>

        {/* 04. HOW I THINK ABOUT SYSTEMS */}
        <Suspense fallback={sectionFallback}>
          <HowIThink />
        </Suspense>

        {/* 05. ARCHITECTURE IN PRACTICE */}
        <Suspense fallback={sectionFallback}>
          <ArchitectureInPractice />
        </Suspense>

        {/* 06. PROBLEMS I TEND TO GET PULLED INTO */}
        <Suspense fallback={sectionFallback}>
          <ProblemsSection />
        </Suspense>

        {/* 07. EXPERIENCE ACROSS DOMAINS */}
        <Suspense fallback={sectionFallback}>
          <DomainExperience />
        </Suspense>

        {/* 08. ZAAKIYV3RSE R&D */}
        <Suspense fallback={sectionFallback}>
          <ZaakiyHighlights />
        </Suspense>

        {/* 09. ENGINEERING NOTES */}
        <Suspense fallback={sectionFallback}>
          <EngineeringNotes />
        </Suspense>

        {/* 10. ABOUT TEASER */}
        <Suspense fallback={sectionFallback}>
          <AboutTeaser />
        </Suspense>

        {/* 11. CONTACT & FOOTER */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default memo(Index);
