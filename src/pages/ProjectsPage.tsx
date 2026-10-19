import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedCaseStudies } from "@/data/caseStudies";
import { buildBreadcrumbListSchema, buildProjectsCollectionSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ProjectsPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("projects", locale);
  const caseStudies = getLocalizedCaseStudies(locale);

  const projectImages: Record<string, string> = {
    "enterprise-retail-integration": "/media/project-retail-cover.webp",
    "airline-retailing-aggregation": "/media/project-airline-cover.webp",
    "automotive-omnichannel-platform": "/media/project-automotive-cover.webp",
    "real-estate-erp-architecture": "/media/project-erp-cover.webp",
    "zaakiy-v3rse": "/media/zaakiy-intelligence.avif",
  };

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={[
          buildProjectsCollectionSchema(caseStudies),
          buildBreadcrumbListSchema([
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "الأعمال" : "Projects", path: "/projects" },
          ]),
        ]}
      />

      <Navbar />

      <main className="min-h-screen bg-background text-foreground pt-20">
        {/* Top Header Banner matching video */}
        <section className="border-b border-border/80 py-16 sm:py-24 bg-background">
          <div className="sk-shell space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase">
              <span>Sanu Khan ®</span>
              <span>©2026 [Scroll to Explore]</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-primary">
                {isArabic ? "معرض الأعمال الهندسية" : "SELECTED PROJECTS"}
              </h1>
              <p className="sk-script-note text-2xl sm:text-3xl text-accent block font-normal tracking-normal lowercase">
                {isArabic ? "حيث تلتقي العمارة الهندسية بدقة التنفيذ" : "where architecture meets execution."}
              </p>
            </div>
            <p className="max-w-3xl text-base sm:text-lg text-secondary font-medium leading-relaxed pt-2">
              {isArabic
                ? "أنظمة واقعية لم يكن الجزء المثير فيها مجرد كود — مع التركيز على سياق المشكلة والقيود والقرارات المعمارية والتعامل مع الأعطال والنتائج المحققة."
                : "Real-world systems where the interesting part wasn't just code — focusing on problem context, constraints, architecture decisions, failure handling, and verified outcomes."}
            </p>
          </div>
        </section>

        {/* Flagship Case Studies List */}
        <section className="py-16 sm:py-24">
          <div className="sk-shell space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {caseStudies.map((cs, idx) => (
                <article
                  key={cs.slug}
                  className="border border-border bg-secondary/10 overflow-hidden flex flex-col justify-between group hover:border-accent transition-colors"
                >
                  <div className="aspect-16/10 overflow-hidden relative border-b border-border bg-black/5">
                    <img
                      src={projectImages[cs.slug] || "/media/selected-projects.avif"}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/90 text-white font-mono text-[10px] uppercase font-bold px-2.5 py-1">
                      0{idx + 1} // {cs.domain}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="font-mono text-xs text-accent font-semibold block uppercase">
                        @{cs.domain.split(" ")[0]} /CaseStudy
                      </span>
                      <h2 className="text-2xl font-bold uppercase tracking-tight text-primary">
                        {cs.title}
                      </h2>
                      <p className="text-sm text-secondary leading-relaxed">
                        {cs.subtitle}
                      </p>

                      {/* Verified Outcome Points */}
                      <ul className="space-y-2 pt-2 border-t border-border/60">
                        {cs.outcomes.slice(0, 2).map((outcome, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-border/80 flex items-center justify-between">
                      <Link
                        to={`/projects/${cs.slug}`}
                        className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider hover:bg-accent/90 transition-colors shadow-xs"
                      >
                        <span>{isArabic ? "قراءة دراسة الحالة" : "VIEW CASE STUDY"}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="font-mono text-xs text-muted-foreground">
                        {cs.role}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
