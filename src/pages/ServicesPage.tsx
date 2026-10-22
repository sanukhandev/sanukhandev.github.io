import { memo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import SeoMeta from "@/components/SeoMeta";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/schema";

export function ServicesPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("services", locale);

  const capabilities = [
    {
      num: "01 ✳",
      title: ar ? "تصميم النظم وهندسة الحلول" : "SYSTEM DESIGN & SOLUTION ARCHITECTURE",
      desc: ar
        ? "تصميم النظم السحابية الأصلية، وحدود الخدمات المصغرة، وتدفقات البيانات المرنة، والخرائط التقنية الواقعية."
        : "Design cloud-native systems, microservice boundaries, resilient data flows and realistic technology roadmaps.",
      img: "/assets/architecture.jpg",
    },
    {
      num: "02 ✳",
      title: ar ? "هندسة التطبيقات المتكاملة" : "FULL STACK APPLICATION ENGINEERING",
      desc: ar
        ? "بناء منصات متطورة باستخدام React وNext.js وNode.js وأنظمة خلفية حديثة بعقود بيانات قوية وانضباط إنتاجي."
        : "Ship React, Next.js, Node.js and modern backend platforms with strong contracts and production discipline.",
      img: "/assets/frontend.jpg",
    },
    {
      num: "03 ✳",
      title: ar ? "تكامل أنظمة المؤسسات" : "ENTERPRISE SYSTEM INTEGRATION",
      desc: ar
        ? "ربط أنظمة ERP وPIM والتجارة وواجهات البرمجة وخطوط التدفق المعتمدة على الأحداث عبر الفرق والمنصات."
        : "Connect ERP, PIM, commerce, APIs and event-driven pipelines across teams and platforms.",
      img: "/assets/integration.jpg",
    },
    {
      num: "04 ✳",
      title: ar ? "هندسة السحابة والمنصات" : "CLOUD & PLATFORM ENGINEERING",
      desc: ar
        ? "خبرة في Azure وAWS والحاويات وتكامل/نشر مستمر CI/CD وإدارة بيئات سحابية قابلة للصيانة والتوسع."
        : "Azure, AWS, containers, CI/CD and maintainable cloud-native delivery.",
      img: "/assets/cloud.jpg",
    },
    {
      num: "05 ✳",
      title: ar ? "الذكاء الاصطناعي وأتمتة العمليات" : "AI & PROCESS AUTOMATION",
      desc: ar
        ? "أتمتة الأعمال الروتينية من خلال التنسيق الذكي والأدوات المتطورة وتكامل سير العمل التشغيلي."
        : "Automate repetitive work through orchestration, intelligent tooling and workflow integration.",
      img: "/assets/automation.jpg",
    },
    {
      num: "06 ✳",
      title: ar ? "القيادة التقنية والاستشارات" : "TECHNICAL LEADERSHIP & CONSULTING",
      desc: ar
        ? "سد الفجوة بين أولويات الإدارة وقيود العمارة وفرق الهندسة وواقع تسليم المشاريع."
        : "Bridge executive priorities, architecture constraints, engineering teams and delivery realities.",
      img: "/assets/enterprise.jpg",
    },
    {
      num: "07 ✳",
      title: ar ? "الكتابة التقنية وتمكين الفرق" : "TECHNICAL WRITING & ENABLEMENT",
      desc: ar
        ? "شرح القرارات المعمارية المعقدة عبر توثيق عملي، ومقالات تحليلية، وسجلات قرارات قابلة للتطبيق."
        : "Explain difficult engineering decisions with usable documentation, articles and decision records.",
      img: "/assets/backend.jpg",
    },
    {
      num: "08 ✳",
      title: ar ? "الاستراتيجية التقنية والتحديث" : "TECHNOLOGY STRATEGY & MODERNIZATION",
      desc: ar
        ? "تدقيق التعقيد التشغيلي، وتحديد الاستثمارات التقنية الصحيحة، وتحسين مسار المنصات على المدى الطويل."
        : "Audit complexity, prioritize the right investments and improve long-term platform direction.",
      img: "/assets/saas.jpg",
    },
  ];

  const deliverySteps = [
    {
      step: "01 / 04",
      title: ar ? "التقييم" : "ASSESS",
      desc: ar ? "تدقيق سياق النظام والقيود التقنية والأهداف التشغيلية الأساسية." : "Audit system context and key constraints.",
    },
    {
      step: "02 / 04",
      title: ar ? "التوافق" : "ALIGN",
      desc: ar ? "تحديد أولويات العمارة والمفاضلات الهندسية والنتائج التجارية المستهدفة." : "Prioritize architecture and business outcomes.",
    },
    {
      step: "03 / 04",
      title: ar ? "التنفيذ" : "EXECUTE",
      desc: ar ? "البناء، والتكامل، والتحقق المستمر لضمان أعلى معايير الجودة والجاهزية." : "Build, integrate and continuously validate.",
    },
    {
      step: "04 / 04",
      title: ar ? "التمكين" : "ENABLE",
      desc: ar ? "نقل المعرفة، والمراقبة الاستباقية، والتطوير المستمر مع نمو النظام." : "Transfer knowledge, monitor and evolve.",
    },
  ];

  return (
    <div className="editorial-content min-h-screen">
      <SeoMeta
        title={seo.title || (ar ? "الخدمات | سانو خان — خبير حلول وهندسة نظم" : "Services — Solution Architecture, Full Stack & Automation | Sanu Khan")}
        description={seo.description || (ar ? "خدمات الاستشارات الهندسية، تصميم النظم، تكامل المؤسسات، وهندسة المنصات السحابية في دبي." : "Engineering consultancy, solution architecture, enterprise integrations, and platform engineering from Dubai, UAE.")}
        canonicalPath="/services"
        schema={[
          buildBreadcrumbListSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "الخدمات" : "Services", path: "/services" },
          ]),
        ]}
      />

      <Navbar />

      <main id="main-content">
        <header className="intro shell">
          <div className="eyebrow">SANU KHAN</div>
          <div className="overline">
            <h1>{ar ? "الخدمات." : "SERVICES."}</h1>
            <div className="crumb">
              ©2026 [{ar ? "مرر للاستكشاف" : "Scroll to explore"}]
              <br />
              {ar ? "الخبرات / التسليم" : "EXPERTISE / DELIVERY"}
            </div>
          </div>
        </header>

        <section className="section shell" style={{ paddingTop: "20px" }}>
          <div className="splithead">
            <p className="lead" style={{ maxWidth: "680px" }}>
              {ar
                ? "من استراتيجية الأنظمة عالية المستوى إلى الهندسة العملية. استشارات واقعية للمنصات المعقدة، والمنتجات الطموحة، والفرق التي تحتاج إلى قيادة تقنية يعتمد عليها."
                : "From high-level system strategy to hands-on engineering. Practical consultancy for complex platforms, ambitious products and teams that need dependable technical leadership."}
            </p>
            <span className="eyebrow">[{ar ? "08 قدرات أساسية" : "08 CORE CAPABILITIES"}]</span>
          </div>

          <div style={{ marginTop: "65px" }}>
            {capabilities.map((cap) => (
              <div key={cap.num} className="service-row">
                <span className="number">{cap.num}</span>
                <h3>{cap.title}</h3>
                <div>
                  <p>{cap.desc}</p>
                  <Link className="button" to="/contact" style={{ padding: "8px 13px", marginTop: "12px" }}>
                    {ar ? "ناقش هذا المجال" : "DISCUSS THIS AREA"} <span className="arrow">↗</span>
                  </Link>
                </div>
                <div className="overflow-hidden rounded-xl bg-zinc-900 aspect-[16/10] w-full max-w-[280px]">
                  <ResponsiveImage alt={cap.title} src={cap.img} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section shell">
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">{ar ? "نموذج التسليم" : "DELIVERY MODEL"}</span>
          </div>
          <h2 className="section-heading">
            {ar ? (
              <>
                من السؤال الأول
                <br />
                إلى <span className="muted">الإنتاج.</span>
              </>
            ) : (
              <>
                FROM THE FIRST
                <br />
                QUESTION TO <span className="muted">PRODUCTION.</span>
              </>
            )}
          </h2>
          <div className="four" style={{ marginTop: "45px" }}>
            {deliverySteps.map((step) => (
              <div key={step.step} className="processcard">
                <span className="step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <ContactSection />

        <Footer />
      </main>
    </div>
  );
}

export default memo(ServicesPage);
