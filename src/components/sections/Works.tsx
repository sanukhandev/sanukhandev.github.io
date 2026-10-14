import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedCaseStudy } from "@/data/caseStudies";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function Works() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const case1Data = getLocalizedCaseStudy("enterprise-retail-integration", locale);
  const case2Data = getLocalizedCaseStudy("airline-retailing-aggregation", locale);
  const case3Data = getLocalizedCaseStudy("automotive-omnichannel-platform", locale);

  const projects = [
    {
      num: "01",
      stamp: "PROD // RETAIL",
      domain: isArabic ? "التجزئة / التجارة" : "RETAIL / COMMERCE",
      title: case1Data?.title || (isArabic ? "تكامل التجزئة والتجارة للمؤسسات" : "Enterprise Retail Integration"),
      subtitle:
        case1Data?.subtitle ||
        (isArabic
          ? "ربط تدفقات المنتجات والمخزون والأسعار والطلبات عبر منصات المؤسسات والتجارة."
          : "Connecting product, inventory, pricing and order flows across enterprise and commerce platforms."),
      slug: "enterprise-retail-integration",
      tags: ["SAP", "PIM", "Commerce", "Integration Layer", "OMS", "Payments"],
      diagram: {
        top: ["SAP", "PIM", isArabic ? "التجارة" : "Commerce"],
        middle: isArabic ? "طبقة التكامل وعقود البيانات" : "Integration Layer (Contract Gate)",
        bottom: ["OMS", isArabic ? "المخزون اللحظي" : "Stock Ledger", isArabic ? "المدفوعات" : "Payments"],
      },
    },
    {
      num: "02",
      stamp: "PROD // AIRLINE",
      domain: isArabic ? "الطيران / السفر" : "AIRLINE / TRAVEL",
      title: case2Data?.title || (isArabic ? "تجزئة الطيران وتجميع المحتوى" : "Airline Retailing & Aggregation"),
      subtitle:
        case2Data?.subtitle ||
        (isArabic
          ? "منصة تجميع NDC عالية التوافر لمعالجة محتوى الطيران متعدد الموردين والتسعير وحجز B2B."
          : "High-availability NDC aggregation handling multi-supplier airline content, pricing, and booking workflows."),
      slug: "airline-retailing-aggregation",
      tags: ["NDC APIs", "Multi-Supplier", "Aggregation Engine", "Booking APIs", "Resilience"],
      diagram: {
        top: [isArabic ? "مصادر الطيران" : "Airlines", "NDC APIs", "GDS"],
        middle: isArabic ? "محرك التجميع والتطبيع المعياري" : "Aggregation & Normalization Gateway",
        bottom: [isArabic ? "البحث الموازي" : "Parallel Search", isArabic ? "الحجز" : "Booking Engine", "Sagas"],
      },
    },
    {
      num: "03",
      stamp: "PROD // AUTO",
      domain: isArabic ? "السيارات والعمليات" : "AUTOMOTIVE",
      title: case3Data?.title || (isArabic ? "منصة السيارات الموحدة متعددة القنوات" : "Automotive Omnichannel Platform"),
      subtitle:
        case3Data?.subtitle ||
        (isArabic
          ? "معمارية قائمة على الأحداث توحد صالات العرض والواجهة الرقمية ومخزون المركبات وسير العمل."
          : "Event-driven architecture unifying showroom, digital storefront, vehicle inventory and partner workflows."),
      slug: "automotive-omnichannel-platform",
      tags: ["Showroom API", "Vehicle Catalog", "Event Fabric", "Workflow Engine", "Inventory"],
      diagram: {
        top: [isArabic ? "فحص الساحة" : "Yard App", isArabic ? "المعرض" : "Showroom", isArabic ? "الويب" : "Web"],
        middle: isArabic ? "آلة حالات دورة حياة المركبة FSM" : "Vehicle Lifecycle FSM & Event Fabric",
        bottom: ["ERP", isArabic ? "المخزون" : "Inventory", isArabic ? "العرض الرقمي" : "Listing APIs"],
      },
    },
  ];

  return (
    <section id="work" className="studio-work" aria-labelledby="studio-work-heading">
      <div className="studio-shell">
        <header className="studio-section-heading studio-work-heading">
          <div>
            <div className="studio-eyebrow">
              <span>{isArabic ? "أعمال مختارة" : "SELECTED WORK"}</span>
              <span aria-hidden="true">/ 01_FIELD_CASES</span>
            </div>
            <h2 id="studio-work-heading">
              {isArabic ? "أنظمة لم يكن الجزء المثير فيها مجرد كود." : "A few systems where the interesting part wasn't the code."}
            </h2>
          </div>
          <Link className="studio-text-link" to="/projects">
            {isArabic ? "عرض كل الأعمال" : "View all work"}
            <ArrowRight size={20} aria-hidden="true" className="rtl:rotate-180" />
          </Link>
        </header>

        <div className="studio-work-stream">
          {projects.map((project, idx) => (
            <article className={`studio-project studio-project--${idx + 1}`} key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="studio-project-visual"
                aria-label={project.title}
              >
                <MediaPlaceholder kind="project" index={project.num} />
                
                <span className="studio-project-visual-bottom">
                  <span>{project.stamp}</span>
                  <ArrowRight size={22} aria-hidden="true" className="rtl:rotate-180" />
                </span>
              </Link>

              <div className="studio-project-story">
                <div className="studio-project-overline">
                  <span>{project.num} / {project.domain}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <h3>
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="studio-project-description">{project.subtitle}</p>
                <div className="studio-project-tags" aria-label={isArabic ? "التقنيات" : "Technologies"}>
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="studio-project-system">
                  <div className="studio-project-system-top">
                    {project.diagram.top.map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <div className="studio-project-system-middle">
                    <span aria-hidden="true">↓</span>
                    <strong>{project.diagram.middle}</strong>
                    <span aria-hidden="true">↓</span>
                  </div>
                  <div className="studio-project-system-top">
                    {project.diagram.bottom.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
                <Link to={`/projects/${project.slug}`} className="studio-text-link studio-project-link">
                  {isArabic ? "عرض دراسة الحالة" : "View case study"}
                  <ArrowRight size={19} aria-hidden="true" className="rtl:rotate-180" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Works);
