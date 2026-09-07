import { ShoppingBag, Plane, Car, Cloud, Building, ShoppingCart, Settings } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function DomainExperience() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const domains = [
    { icon: ShoppingBag, name: isArabic ? "التجزئة" : "Retail" },
    { icon: Plane, name: isArabic ? "الطيران" : "Airline" },
    { icon: Car, name: isArabic ? "السيارات" : "Automotive" },
    { icon: Cloud, name: isArabic ? "SaaS" : "SaaS" },
    { icon: Building, name: isArabic ? "العقارات" : "Real Estate" },
    { icon: ShoppingCart, name: isArabic ? "التجارة" : "Commerce" },
    { icon: Settings, name: isArabic ? "العمليات المؤسسية" : "Enterprise Ops" },
  ];

  return (
    <section className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em] mb-1.5">
            {isArabic ? "أنظمة تعاملت معها" : "SYSTEMS I'VE HAD TO UNDERSTAND"}
          </div>
          <h2 className="section-h2 text-primary">
            {isArabic ? (
              "مجالات مختلفة. أنماط متشابهة. قيود مختلفة."
            ) : (
              <>
                Different domains. Similar patterns. <br className="hidden sm:block" />
                Different constraints.
              </>
            )}
          </h2>
        </div>

        {/* 7 Horizontal Items with Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 my-10 text-center">
          {domains.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="flex flex-col items-center justify-center p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[14px] font-semibold text-primary">{item.name}</span>
              </div>
            );
          })}
        </div>

        {/* Centered Summary Sentence */}
        <div className="text-center pt-4 border-t border-border/40">
          <p className="text-[15.5px] text-secondary italic max-w-2xl mx-auto font-normal">
            {isArabic
              ? "العمل عبر مجالات متعددة علمني أن الأنماط المعمارية تتكرر، ولكن قيود الأعمال نادراً ما تكرر."
              : "Working across domains taught me that architecture patterns repeat, but business constraints rarely do."}
          </p>
        </div>
      </div>
    </section>
  );
}

