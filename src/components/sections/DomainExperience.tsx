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
    <section className="studio-domains">
      <div className="studio-shell studio-domains-layout">
        <header className="studio-domains-intro">
          <div className="studio-eyebrow"><span>{isArabic ? "مجالات العمل" : "DOMAINS I WORK ACROSS"}</span><span aria-hidden="true">/ INDEX_SECTORS // 7</span></div>
          <h2>{isArabic ? "مجالات مختلفة. أنماط متشابهة. قيود مختلفة." : "Different domains. Similar patterns. Different constraints."}</h2>
          <p>{isArabic
            ? "مبادئ العمارة الجيدة تبقى ثابتة عبر القطاعات، ولكن قيود الأعمال والكمون تفرض تصميم الحل."
            : "Core integration patterns stay consistent, but operational throughput, latency tolerance and regulatory constraints shape the architecture."}</p>
        </header>
        <div className="studio-domain-index">
          {domains.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="studio-domain-row">
                <span className="studio-domain-code">SEC.{item.code}</span>
                <span className="studio-domain-name">{item.name}</span>
                <span className="studio-domain-context">{item.tag}</span>
                <Icon size={24} aria-hidden="true" className="studio-domain-icon" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(DomainExperience);
