import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedCaseStudies } from "@/data/caseStudies";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("projects", locale);
  const caseStudies = getLocalizedCaseStudies(locale);

  return (
    <>
      <SeoMeta
        title={isArabic ? "أعمال معمارية مختارة ودراسات حالة — سانو خان" : "Selected Architecture Work & Case Studies — Sanu Khan"}
        description={isArabic ? "دراسات حالة تفصيلية لتكاملات المؤسسات، والتجارب الرقمية الصحية، وتجميع تجزئة رحلات الطيران، ومنصات السيارات متعددة القنوات بواسطة معماري الحلول سانو خان." : "Detailed case studies of enterprise integrations, headless healthcare experiences, airline retailing aggregation, and automotive omnichannel platforms by Solution Architect Sanu Khan."}
        canonicalPath={seo.canonicalPath}
        keywords={[
          "architecture case studies",
          "enterprise retail integration",
          "airline retailing NDC aggregation",
          "automotive omnichannel platform",
          "headless healthcare digital experience",
          "Next.js WordPress headless CMS",
          "solution architecture case studies"
        ]}
        schema={buildBreadcrumbListSchema([
          { name: isArabic ? "الرئيسية" : "Home", path: "/" },
          { name: isArabic ? "الأعمال" : "Projects", path: "/projects" }
        ])}
      />

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 text-foreground">
        <section className="container-narrow max-w-4xl space-y-12">
          {/* Header */}
          <header className="border-b border-border/60 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-semibold mb-3">
              <span>{isArabic ? "01 — معرض العمارة المعمارية" : "01 — Architecture Portfolio"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              {isArabic ? "أعمال معمارية مختارة" : "Selected Architecture Work"}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-secondary font-normal">
              {isArabic
                ? "أنظمة لم يكن الجزء المثير فيها مجرد كود — مع التركيز على سياق المشكلة والقيود والقرارات المعمارية والتعامل مع الأعطال والنتائج المحققة."
                : "Systems where the interesting part wasn't the code — focusing on problem context, constraints, architecture decisions, failure handling, and verified outcomes."}
            </p>
          </header>

          {/* Flagship Case Studies List */}
          <div className="space-y-12">
            {caseStudies.map((cs, idx) => (
              <article
                key={cs.slug}
                className="rounded-xl border border-border bg-secondary/20 p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-accent">0{idx + 1}</span>
                    <span className="text-xs font-mono text-muted-foreground uppercase">{cs.domain}</span>
                  </div>
                  <Link
                    to={`/projects/${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline shrink-0"
                  >
                    {isArabic ? "قراءة دراسة الحالة كاملة" : "Read full case study"} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </div>

                <h2 className="text-2xl font-bold text-primary">
                  {cs.title}
                </h2>

                <p className="text-sm text-secondary leading-relaxed font-normal">
                  {cs.summary}
                </p>

                {/* Key decisions summary */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono uppercase text-accent font-semibold block">
                    {isArabic ? "القرارات المعمارية الرئيسية" : "Key Decisions"}
                  </span>
                  {cs.keyDecisions.slice(0, 2).map((kd) => (
                    <div key={kd.title} className="flex items-start gap-2 text-xs text-secondary">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-primary">{kd.title}: </span>
                        <span>{kd.description}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer metadata & link */}
                <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.systemsInvolved.map((sys) => (
                      <span key={sys} className="rounded bg-background px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/40">
                        {sys}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${cs.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>{isArabic ? "قراءة دراسة الحالة" : "Read case study"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6 pt-4 border-t border-border/60 text-xs font-mono">
            <Link to="/about" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "نبذة عن سانو خان" : "About Sanu Khan"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
            <Link to="/blog" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "ملاحظات هندسية" : "Engineering Notes"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
            <Link to="/contact" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "التواصل" : "Contact"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
          </nav>
        </section>
      </main>

      <Footer />
    </>
  );
}
