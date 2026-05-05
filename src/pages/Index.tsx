import { Suspense, lazy, memo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import SeoMeta from "@/components/SeoMeta";
import { useLocale } from "@/hooks/use-locale";
import { trackEvent } from "@/utils/analytics";

const Works = lazy(() => import("@/components/sections/Works"));
const Services = lazy(() => import("@/components/sections/Services"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const ToolsPreview = lazy(() => import("@/components/sections/ToolsPreview"));
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
    <div className="min-h-screen bg-background text-foreground">
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
          <Skills />
          <Services />
          <Works />
          <ToolsPreview />
          <BlogPreview />
          <Certifications />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
        <ZaakiyChatWidget />
      </Suspense>
    </div>
  );
};

export default memo(Index);
