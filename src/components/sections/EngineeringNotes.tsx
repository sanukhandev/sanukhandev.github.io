import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

export default function EngineeringNotes() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const notes = [
    {
      date: isArabic ? "28 أغسطس 2024" : "Aug 28, 2024",
      title: isArabic
        ? "بوابة API: الحارس الذي تحتاجه خدماتك المصغرة"
        : "Round Robin Is Lying to You",
      premise: isArabic
        ? "كيف تعمل بوابة API كنقطة دخول موحدة للخدمات المصغرة مع إدارة التوثيق والتوجيه."
        : "Equal traffic doesn't mean equal load.",
      readTime: isArabic ? "5 دقائق قراءة" : "5 min read",
      path: "/blog/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e",
    },
    {
      date: isArabic ? "12 يوليو 2024" : "Jul 12, 2024",
      title: isArabic
        ? "DuckDB: نسخة SQLite لعالم التحليلات"
        : "Scaling a Backend from 1 User to 1 Million",
      premise: isArabic
        ? "قاعدة OLAP داخلية دون إعدادات مع أداء عمودي سريع ودعم CSV وParquet للتحليلات المحلية."
        : "Where architecture actually starts changing.",
      readTime: isArabic ? "8 دقائق قراءة" : "8 min read",
      path: "/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m",
    },
    {
      date: isArabic ? "03 يونيو 2024" : "Jun 03, 2024",
      title: isArabic
        ? "دليل عملي لبناء منصة SaaS متكاملة وفعالة من حيث التكلفة"
        : "Choosing the Right Storage Model",
      premise: isArabic
        ? "عمارة عملية باستخدام Laravel وNext.js وMySQL لاستهداف التوسع والصيانة بتكلفة متوازنة."
        : "How data characteristics affect architectural choices.",
      readTime: isArabic ? "6 دقائق قراءة" : "6 min read",
      path: "/blog/building-a-cost-effective-full-stack-saas-platform-a-practical-guide-for-small-to-mid-size-it-2d44",
    },
  ];

  return (
    <section id="writing" className="py-12 md:py-16 scroll-mt-20 border-t border-border/60">
      <div className="container-narrow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[13px] font-mono uppercase text-accent font-semibold tracking-[0.08em] mb-1.5">
              {isArabic ? "ملاحظات هندسية" : "ENGINEERING NOTES"}
            </div>
            <h2 className="section-h2 text-primary">
              {isArabic
                ? "أشياء تعلمتها أو شككت فيها أو غيرت رأيي بشأنها."
                : "Things I've learned, questioned or changed my mind about."}
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-mono font-semibold text-accent hover:underline shrink-0"
          >
            <span>{isArabic ? "عرض كل الملاحظات" : "View all notes"}</span>
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {/* 3-Column Horizontal Grid with Thin Vertical Dividers (No Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/60">
          {notes.map((note, idx) => (
            <Link
              key={note.title}
              to={note.path}
              className={`group flex flex-col justify-between ${
                idx > 0 ? "pt-6 md:pt-0 md:pl-8 rtl:md:pl-0 rtl:md:pr-8" : ""
              }`}
            >
              <div>
                <div className="text-[13px] font-mono text-muted-foreground mb-2.5">
                  {note.date}
                </div>

                <h3 className="text-[19px] font-semibold text-primary group-hover:text-accent transition-colors mb-2 leading-snug">
                  {note.title}
                </h3>

                <p className="text-[15.5px] text-secondary leading-relaxed font-normal mb-4">
                  {note.premise}
                </p>
              </div>

              <div className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-accent group-hover:underline pt-2">
                <span>{note.readTime}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

