import { memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedCaseStudies } from "@/data/caseStudies";
import { buildBreadcrumbListSchema, buildProjectsCollectionSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export function ProjectsPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("projects", locale);
  const caseStudies = getLocalizedCaseStudies(locale);

  const projects = [
    {
      slug: "zaakiy-v3rse",
      title: "Operational Intelligence Ecosystem",
      ar: "منظومة الذكاء التشغيلي",
      image: "/assets/systems.jpg",
      category: "AI / OPERATIONS",
      detail: ar
        ? "تصميم منظومة ذكاء تشغيلي قائمة على تدفق الأحداث مع تتبع القياسات عن بُعد، والتنسيق الذكي، وأتمتة العمليات الموزعة."
        : "Architected event-driven operational intelligence with telemetry, AI-assisted orchestration, and distributed workflow automation.",
    },
    {
      slug: "enterprise-retail-integration",
      title: "Retail Event Processing Network",
      ar: "شبكة معالجة أحداث تجارة التجزئة",
      image: "/assets/commerce.jpg",
      category: "EVENT-DRIVEN / COMMERCE",
      detail: ar
        ? "معالجة أحداث تعتمد على Kafka وAzure Event Hubs لمزامنة المنتجات والتسعير والمخزون عبر أسواق إقليمية متعددة."
        : "Kafka and Azure Event Hubs based event processing for multi-region product, pricing, and inventory synchronization.",
    },
    {
      slug: "zaakiy-v3rse",
      title: "AI-Assisted Workflow Automation",
      ar: "أتمتة سير العمل بمساعدة الذكاء الاصطناعي",
      image: "/assets/automation.jpg",
      category: "AI / PROCESS",
      detail: ar
        ? "أتمتة وتنسيق يراعي السياق لتقليل التدخل اليدوي وتحسين الاستجابة التشغيلية السريعة."
        : "Context-aware automation and orchestration to reduce manual coordination and improve operational response.",
    },
    {
      slug: "enterprise-retail-integration",
      title: "Enterprise Integration Fabric",
      ar: "منصة تكامل الأنظمة المؤسسية",
      image: "/assets/integration.jpg",
      category: "INTEGRATIONS / AZURE",
      detail: ar
        ? "طبقات تحقق وتكامل بدون خوادم Serverless تربط منصات الأعمال بعقود خدمات مرنة ومقاومة للأعطال."
        : "Serverless validation and integration layers connecting business platforms with resilient service contracts.",
    },
    {
      slug: "automotive-omnichannel-platform",
      title: "Multi-Tenant Platform Infrastructure",
      ar: "بنية المنصات متعددة المستأجرين",
      image: "/assets/platform.jpg",
      category: "SAAS / INFRASTRUCTURE",
      detail: ar
        ? "بنية معمارية تراعي متطلبات المستأجرين مع حدود منفصلة للنشر والتوسع والمراقبة اللحظية."
        : "Tenant-aware service architecture with separated deployment, scaling, and observability boundaries.",
    },
    {
      slug: "airline-retailing-aggregation",
      title: "Real-Time Observability & Monitoring Layer",
      ar: "منظومة المراقبة والاستدلال اللحظي",
      image: "/assets/observability.jpg",
      category: "CLOUD / TELEMETRY",
      detail: ar
        ? "تتبع موزع ومراقبة موحدة تمكن من الاكتشاف الاستباقي والتشخيص الفوري للأعطال المعقدة."
        : "Distributed tracing and consolidated monitoring enabling proactive detection and diagnostics.",
    },
  ];

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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              marginTop: "40px",
            }}
          >
            {projects.map((project, index) => (
              <article key={project.title} className="project-card dark-card" style={{ padding: "16px" }}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block overflow-hidden"
                  aria-label={`Read case study for ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`Conceptual illustration for ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    className="project-image"
                    style={{ width: "100%", height: "280px", objectFit: "cover" }}
                  />
                </Link>
                <div style={{ paddingTop: "18px" }}>
                  <div className="numbered">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </div>
                  <h3 style={{ fontSize: "24px", margin: "10px 0 8px" }}>
                    <Link to={`/projects/${project.slug}`}>{ar ? project.ar : project.title}</Link>
                  </h3>
                  <p className="dark-project-text" style={{ fontSize: "13px", lineHeight: "1.6" }}>
                    {project.detail}
                  </p>
                  <Link className="read-more" to={`/projects/${project.slug}`}>
                    {ar ? "عرض دراسة الحالة ↗" : "VIEW CASE STUDY ↗"}
                  </Link>
                </div>
              </article>
            ))}
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
