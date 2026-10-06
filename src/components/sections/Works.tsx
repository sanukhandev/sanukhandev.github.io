import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedCaseStudy } from "@/data/caseStudies";

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
    <section id="work" className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Section Header with Field Note Tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                {isArabic ? "أعمال مختارة" : "SELECTED WORK"}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/60 border border-dashed border-border px-1.5 py-0.2 rounded select-none">
                // 01_FIELD_CASES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08]">
              {isArabic ? (
                "أنظمة لم يكن الجزء المثير فيها مجرد كود."
              ) : (
                <>
                  A few systems where the interesting <br className="hidden sm:inline" />
                  part wasn't the code.
                </>
              )}
            </h2>
          </div>

          <Link
            to="/projects"
            className="group inline-flex items-center gap-1.5 text-[14px] font-mono font-semibold text-accent hover:underline shrink-0"
          >
            <span>{isArabic ? "عرض كل الأعمال" : "View all work"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3-Column Structured Project Blocks with Tactile Editorial Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {projects.map((project, idx) => (
            <article
              key={project.slug}
              className={`group flex flex-col justify-between rounded-xl border border-dashed border-border/90 bg-card/60 p-6 sm:p-7 transition-all duration-200 ease-out hover:border-accent/60 hover:bg-card/90 active:scale-[0.99] relative ${
                idx === 1 ? "md:-translate-y-1.5" : ""
              }`}
            >
              {/* Corner Drafting Marks */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-2 font-mono text-[10px] text-accent/30 select-none pointer-events-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 font-mono text-[10px] text-accent/30 select-none pointer-events-none"
              >
                +
              </span>

              <div>
                {/* Meta Header with Stamp */}
                <div className="flex items-center justify-between text-[11.5px] font-mono text-muted-foreground mb-3 pb-3 border-b border-dashed border-border/70">
                  <span className="font-bold text-accent text-sm">{project.num}</span>
                  <span className="font-mono text-[10px] text-accent/80 border border-dashed border-accent/40 bg-accent/5 px-2 py-0.5 rounded select-none transform rotate-1">
                    {project.stamp}
                  </span>
                  <span className="uppercase tracking-wider font-medium">{project.domain}</span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] sm:text-[21px] font-semibold text-primary mb-2.5 leading-snug transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                  <Link to={`/projects/${project.slug}`} className="focus-visible:outline-none">
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-[14.5px] text-secondary leading-relaxed font-normal mb-5 line-clamp-3">
                  {project.subtitle}
                </p>

                {/* Architecture Labels */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border/80 bg-surface px-2 py-0.5 text-[11px] font-mono text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Architectural Blueprint Mini-Diagram */}
                <div className="rounded-lg border border-dashed border-border/80 bg-background/80 p-3.5 mb-6 font-mono text-[11.5px] transition-transform duration-200 ease-out group-hover:scale-[1.01] relative">
                  {/* Top Layer */}
                  <div className="grid grid-cols-3 gap-1.5 text-center mb-1.5">
                    {project.diagram.top.map((item) => (
                      <div
                        key={item}
                        className="rounded border border-border/80 bg-surface py-1 text-primary font-medium truncate px-1 text-[11px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-accent/80 text-xs py-0.5 font-mono">↓</div>

                  {/* Middle Integration Gate */}
                  <div className="rounded border border-accent/40 bg-accent/10 py-1.5 px-2 text-center font-semibold text-accent text-[11px]">
                    {project.diagram.middle}
                  </div>

                  <div className="text-center text-accent/80 text-xs py-0.5 font-mono">↓</div>

                  {/* Bottom Layer */}
                  <div className="grid grid-cols-3 gap-1.5 text-center mt-0.5">
                    {project.diagram.bottom.map((item) => (
                      <div
                        key={item}
                        className="rounded border border-border/80 bg-surface py-1 text-primary font-medium truncate px-1 text-[11px]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Case Study CTA Link */}
              <div className="pt-4 border-t border-dashed border-border/60">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent group-hover:underline"
                >
                  <span>{isArabic ? "عرض دراسة الحالة" : "View case study"}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
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
