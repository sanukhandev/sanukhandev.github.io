import { Suspense, lazy, memo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import TechParticles from "@/components/TechParticles";
import Hero from "@/components/sections/Hero";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import SeoMeta from "@/components/SeoMeta";
import { useLocale } from "@/hooks/use-locale";
import { trackEvent } from "@/utils/analytics";

const Works = lazy(() => import("@/components/sections/Works"));
const Services = lazy(() => import("@/components/sections/Services"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const ZaakiyHighlights = lazy(
  () => import("@/components/sections/ZaakiyHighlights"),
);
const AruvixSection = lazy(() => import("@/components/sections/AruvixSection"));
const BlogPreview = lazy(() => import("@/components/sections/BlogPreview"));
const Certifications = lazy(
  () => import("@/components/sections/Certifications"),
);
const Footer = lazy(() => import("@/components/sections/Footer"));
const ZaakiyChatWidget = lazy(() => import("@/components/ZaakiyChatWidget"));

const sectionFallback = (
  <div className="container-narrow section-pad">
    <div className="h-40 animate-pulse rounded-2xl bg-muted" />
  </div>
);

const Index = () => {
  const { isSwitchingLocale } = useLocale();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const trackedSections = new Set<string>();
    const sectionIds = [
      "home",
      "works",
      "experience",
      "stack",
      "zaakiy",
      "tools",
      "blog",
      "articles",
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
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
        <TechParticles count={30} fullPage />
      </div>

      <div className="relative z-10">
        <SeoMeta
          title="Sanu Khan | Tech Lead & Cloud Architect UAE"
          description="Tech Lead and Cloud Architect in Dubai UAE. 13+ years delivering distributed systems, event-driven platforms, and enterprise integrations across MENA and global markets."
          canonicalPath="/"
          keywords="sanu khan, tech lead dubai, cloud architect uae, full stack engineer, distributed systems"
        />
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={sectionFallback}>
            <Services />
            <Certifications />
            <Skills />
            <ZaakiyHighlights />
            <AruvixSection />
            <Works />
            <BlogPreview />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
          <ZaakiyChatWidget extraContext="Page: Sanu Khan portfolio homepage.\nZaakiy V3RSE: A suite of AI-driven platforms built by Sanu Khan.\n- Zaakiy AI: Multilingual AI chat support platform (10K+ conversations, English & Arabic).\n- Zaakiy CRM: CRM solution for SMEs, content creators, and social media influencers.\n- Zaakiy ERP: ERP solutions including a real estate platform.\n- Zaakiy GO: Food delivery app in Dubai.\nSanu is the founder and Solution Architect behind Zaakiy V3RSE." />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Index);
