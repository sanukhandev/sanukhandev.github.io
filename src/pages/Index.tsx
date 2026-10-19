import { memo } from "react";
import Navbar from "@/components/Navbar";
import { SectionReveal } from "@/components/ui/SectionReveal";
import SeoMeta from "@/components/SeoMeta";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildFaqSchema, buildHomepageSchemas } from "@/lib/schema";
import { searchFocusedFaqs } from "@/data/faqData";
import Footer from "@/components/sections/Footer";
import { EditorialExpertise } from "@/components/sections/EditorialExpertise";
import {
  ReferenceHero,
  ReferenceProof,
  ReferenceImpact,
  ReferenceServices,
  ReferenceProjects,
  ReferenceProcess,
  ReferenceBento,
  ReferenceTestimonials,
  ReferenceWriting,
  ReferenceZaakiy,
  ReferenceFaq,
  ReferenceContact,
} from "@/components/sections/ReferenceHomeSections";

const Index = () => {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const currentSeo = getLocalizedPageSeo("home", locale);

  const homeFaqSchema = buildFaqSchema(
    searchFocusedFaqs.slice(0, 6).map((item) => ({
      q: isArabic ? item.question.ar : item.question.en,
      a: isArabic ? item.answer.ar : item.answer.en,
    })),
  );

  return (
    <div className="sk-page relative min-h-screen">
      {/* Accessible Skip to Content Link (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] rounded-sm bg-[#D5360C] px-4 py-2 text-sm font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        {isArabic ? "الانتقال إلى المحتوى الرئيسي" : "Skip to content"}
      </a>

      <SeoMeta
        title={currentSeo.title}
        description={currentSeo.description}
        canonicalPath={currentSeo.canonicalPath}
        keywords={currentSeo.keywords}
        kind="profile"
        schema={[...buildHomepageSchemas(), homeFaqSchema]}
      />

      <Navbar />

      <main id="main-content" className="pt-0">
        <ReferenceHero />
        <ReferenceProof />
        <SectionReveal><ReferenceImpact /></SectionReveal>
        <SectionReveal><ReferenceServices /></SectionReveal>
        <SectionReveal><EditorialExpertise /></SectionReveal>
        <SectionReveal><ReferenceProjects /></SectionReveal>
        <SectionReveal><ReferenceProcess /></SectionReveal>
        <SectionReveal><ReferenceBento /></SectionReveal>
        <SectionReveal><ReferenceTestimonials /></SectionReveal>
        <SectionReveal><ReferenceWriting /></SectionReveal>
        <SectionReveal><ReferenceZaakiy /></SectionReveal>
        <SectionReveal><ReferenceFaq /></SectionReveal>
        <SectionReveal><ReferenceContact /></SectionReveal>
        <Footer />
      </main>
    </div>
  );
};

export default memo(Index);
