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
      slug: "airline-retailing-aggregation",
      title: "Airline NDC Retailing & Aggregation Fabric",
      ar: "منصة تجميع حجوزات الطيران والتوزيع الجديد",
      image: "/assets/observability.jpg",
      category: "DISTRIBUTED / AIRLINE",
      detail: ar
        ? "بنية توزيع وتجميع حجوزات طيران عالية الكثافة تدمج معايير NDC وتدفق الأسعار والحجوزات الفورية بدون تأخير."
        : "High-throughput airline retailing aggregation fabric integrating IATA NDC standards, real-time fare streaming, and resilient booking pipelines.",
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
      slug: "real-estate-erp-architecture",
      title: "AI-Assisted Real Estate ERP Architecture",
      ar: "معمارية تخطيط موارد المؤسسات العقارية المدعومة بالذكاء الاصطناعي",
      image: "/assets/architecture.jpg",
      category: "ENTERPRISE / ERP",
      detail: ar
        ? "منصة عمليات عقارية متعددة الفروع مع عزل الصلاحيات، وتدفقات مالية قابلة للتدقيق، ومساعد ذكاء اصطناعي واعي بالأذونات."
        : "Branch-aware real estate operations platform with strict domain invariants, auditable ledger workflows, and permission-aware AI tooling.",
    },
    {
      slug: "headless-healthcare-digital-experience",
      title: "Headless Healthcare Experience & Integration",
      ar: "منصة الرعاية الصحية الرقمية والتكامل السريري",
      image: "/assets/integration.jpg",
      category: "HEALTHCARE / INTEGRATIONS",
      detail: ar
        ? "طبقات تكامل بدون خوادم Serverless تربط منصات الرعاية الصحية بعقود خدمات مرنة ومقاومة للأعطال مع مراعاة حماية البيانات."
        : "Serverless validation and integration layers connecting healthcare platforms with resilient, compliant, and privacy-first service contracts.",
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
              <article key={project.title} className="project-card dark-card relative rounded-2xl p-4 shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                {/* Corner registration crosshairs for architectural precision */}
                <div aria-hidden="true" className="absolute top-2 start-2.5 text-[10px] font-mono text-zinc-400/40 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2 end-2.5 text-[10px] font-mono text-zinc-400/40 select-none">+</div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="block overflow-hidden rounded-xl bg-zinc-900"
                  aria-label={`Read case study for ${project.title}`}
                >
                  <ResponsiveImage
                    src={project.image}
                    alt={`Conceptual illustration for ${project.title}`}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
                <div style={{ paddingTop: "18px" }}>
                  <div className="numbered">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </div>
                  <h2
                    style={{ fontSize: "1.15rem", lineHeight: 1.35 }}
                    className="font-bold uppercase tracking-tight text-primary my-2 hover:text-[#D5360C] transition-colors"
                  >
                    <Link to={`/projects/${project.slug}`}>{ar ? project.ar : project.title}</Link>
                  </h2>
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
