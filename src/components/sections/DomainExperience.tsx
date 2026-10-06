import { memo } from "react";
import { ShoppingBag, Plane, Car, Cloud, Building2, ShoppingCart, Cog } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export function DomainExperience() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const domains = [
    { icon: ShoppingBag, code: "01", name: isArabic ? "التجزئة" : "Retail", tag: "Omnichannel / ERP" },
    { icon: Plane, code: "02", name: isArabic ? "الطيران" : "Aviation", tag: "NDC / Aggregation" },
    { icon: Car, code: "03", name: isArabic ? "السيارات" : "Automotive", tag: "Dealer / Fleet" },
    { icon: Cloud, code: "04", name: isArabic ? "SaaS" : "SaaS", tag: "Multi-tenant / APIs" },
    { icon: Building2, code: "05", name: isArabic ? "العقارات" : "Real Estate", tag: "Portals / Ledger" },
    { icon: ShoppingCart, code: "06", name: isArabic ? "التجارة" : "Commerce", tag: "Cart / Fulfillment" },
    { icon: Cog, code: "07", name: isArabic ? "العمليات المؤسسية" : "Enterprise Ops", tag: "PIM / Microservices" },
  ];

  return (
    <section className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "مجالات العمل" : "DOMAINS I WORK ACROSS"}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-[10px] text-muted-foreground border border-dashed border-border px-1.5 py-0.2 rounded transform rotate-1 select-none"
            >
              [INDEX_SECTORS // 7]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08] mb-3">
            {isArabic ? "مجالات مختلفة. أنماط متشابهة. قيود مختلفة." : "Different domains. Similar patterns. Different constraints."}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary font-normal">
            {isArabic
              ? "مبادئ العمارة الجيدة تبقى ثابتة عبر القطاعات، ولكن قيود الأعمال والكمون تفرض تصميم الحل."
              : "Core integration patterns stay consistent, but operational throughput, latency tolerance and regulatory constraints shape the architecture."}
          </p>
        </div>

        {/* 7 Sectors Layout: Architectural Catalog Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {domains.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-xl border border-dashed border-border/80 bg-card/40 transition-all duration-200 hover:border-accent/60 hover:bg-card/90 text-center"
              >
                {/* Sector index code in corner */}
                <div className="w-full flex items-center justify-end font-mono text-[9px] text-muted-foreground mb-2">
                  <span>SEC.{item.code}</span>
                </div>

                {/* Minimal circle icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent mb-3 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Name */}
                <span className="text-[14px] font-semibold text-primary leading-tight mb-1">
                  {item.name}
                </span>

                {/* Micro Footprint Tag */}
                <span className="text-[10px] font-mono text-muted-foreground tracking-tight">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(DomainExperience);
