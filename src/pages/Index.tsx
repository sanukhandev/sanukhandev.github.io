import { memo } from "react";
import Navbar from "@/components/Navbar";
import { SectionReveal } from "@/components/ui/SectionReveal";
import SeoMeta from "@/components/SeoMeta";
import LocaleSwitchSkeleton from "@/components/LocaleSwitchSkeleton";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildHomepageSchemas } from "@/lib/schema";
import {
  ReferenceHero,
  ReferenceProof,
  ReferenceServices,
  ReferenceProjects,
  ReferenceWriting,
  ReferenceZaakiy,
  ReferenceProcess,
  ReferenceAbout,
  ReferenceFaq,
  ReferenceContact,
  ReferenceFooter,
} from "@/components/sections/ReferenceHomeSections";

const Index = () => {
  const { isSwitchingLocale, locale } = useLocale();
  const currentSeo = getLocalizedPageSeo("home", locale);

  if (isSwitchingLocale) {
    return <LocaleSwitchSkeleton />;
  }

  return (
    <div className="sk-page relative min-h-screen">
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
        <ReferenceHero />
        <SectionReveal><ReferenceProof /></SectionReveal>
        <SectionReveal><ReferenceServices /></SectionReveal>
        <SectionReveal><ReferenceProjects /></SectionReveal>
        <SectionReveal><ReferenceWriting /></SectionReveal>
        <SectionReveal><ReferenceZaakiy /></SectionReveal>
        <SectionReveal><ReferenceProcess /></SectionReveal>
        <SectionReveal><ReferenceAbout /></SectionReveal>
        <SectionReveal><ReferenceFaq /></SectionReveal>
        <SectionReveal><ReferenceContact /></SectionReveal>
        <ReferenceFooter />
      </main>
    </div>
  );
};

export default memo(Index);
