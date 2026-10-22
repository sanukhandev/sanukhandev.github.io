import { memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { getLocalizedCaseStudies } from "@/data/caseStudies";
import { buildBreadcrumbListSchema, buildProjectsCollectionSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

const CASE_STUDY_IMAGES: Record<string, string> = {
  "zaakiy-v3rse": "/assets/systems.jpg",
  "enterprise-retail-integration": "/assets/commerce.jpg",
  "airline-retailing-aggregation": "/assets/observability.jpg",
  "automotive-omnichannel-platform": "/assets/platform.jpg",
  "real-estate-erp-architecture": "/assets/architecture.jpg",
  "garage-management-and-diagnostics": "/assets/automation.jpg",
  "headless-healthcare-digital-experience": "/assets/integration.jpg",
};

export function ProjectsPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("projects", locale);
  const caseStudies = getLocalizedCaseStudies(locale);

  return (
    <div className="editorial-content min-h-screen projects-page">
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={[
          buildProjectsCollectionSchema(caseStudies),
          buildBreadcrumbListSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "المشاريع" : "Projects", path: "/projects" },
          ]),
        ]}
      />

      <Navbar />

      <main id="main-content">
        <header className="intro shell">
          <p className="overline" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>SANU KHAN</span>
            <span>{ar ? "دراسات هندسية مختارة" : "SELECTED ENGINEERING WORK"}</span>
          </p>
          <h1>{ar ? "المشاريع." : "PROJECTS."}</h1>
          <div className="crumb">{ar ? "أنظمة ساهمت في بنائها." : "Systems I have helped shape."}</div>
        </header>

        <section className="section shell" style={{ paddingTop: "20px" }}>
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">01 / {ar ? "دراسات مختارة" : "SELECTED CASE STUDIES"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-10">
            {caseStudies.map((cs, index) => {
              const image = CASE_STUDY_IMAGES[cs.slug] || "/assets/systems.jpg";
              return (
                <article key={cs.slug} className="project-card dark-card relative rounded-2xl p-4 shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                  {/* Corner registration crosshairs for architectural precision */}
                  <div aria-hidden="true" className="absolute top-2 start-2.5 text-[10px] font-mono text-zinc-400/40 select-none">+</div>
                  <div aria-hidden="true" className="absolute top-2 end-2.5 text-[10px] font-mono text-zinc-400/40 select-none">+</div>

                  <Link
                    to={`/projects/${cs.slug}`}
                    className="block overflow-hidden rounded-xl bg-zinc-900"
                    aria-label={`Read case study for ${cs.title}`}
                  >
                    <ResponsiveImage
                      src={image}
                      alt={`Conceptual illustration for ${cs.title}`}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div style={{ paddingTop: "18px" }}>
                    <div className="numbered">
                      {String(index + 1).padStart(2, "0")} / {cs.domain.toUpperCase()}
                    </div>
                    <h2
                      style={{ fontSize: "1.15rem", lineHeight: 1.35 }}
                      className="font-bold uppercase tracking-tight text-primary my-2 hover:text-[#D5360C] transition-colors"
                    >
                      <Link to={`/projects/${cs.slug}`}>{cs.title}</Link>
                    </h2>
                    <p className="dark-project-text" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                      {cs.summary}
                    </p>
                    <Link className="read-more" to={`/projects/${cs.slug}`}>
                      {ar ? "عرض دراسة الحالة ↗" : "VIEW CASE STUDY ↗"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section shell text-center" style={{ textAlign: "center", padding: "70px 0" }}>
          <h2 className="section-heading">{ar ? "لنحل تحديك القادم." : "LET’S SOLVE WHAT’S NEXT."}</h2>
          <div style={{ marginTop: "30px" }}>
            <Link className="button dark" to="/contact">
              {ar ? "تواصل معي" : "WORK WITH ME"} <span className="arrow">↗</span>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default memo(ProjectsPage);
