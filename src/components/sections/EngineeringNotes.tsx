import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";

export function EngineeringNotes() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const { articles } = useSiteContent();

  // Grab latest 3 articles dynamically from existing blog content
  const latestPosts = articles.slice(0, 3);

  return (
    <section id="writing" className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
                {isArabic ? "ملاحظات هندسية" : "ENGINEERING NOTES"}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-[10px] text-muted-foreground border border-dashed border-border px-1.5 py-0.2 rounded transform -rotate-1 select-none"
              >
                [NOTEBOOK // DISPATCHES]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08]">
              {isArabic ? "أحدث الأفكار من ملاحظاتي الهندسية." : "Latest thinking from my notes."}
            </h2>
          </div>

          <Link
            to="/blog"
            className="group inline-flex items-center gap-1.5 text-[14px] font-mono font-semibold text-accent hover:underline shrink-0"
          >
            <span>{isArabic ? "عرض كل الملاحظات" : "View all notes"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
          </Link>
        </div>

        {/*
          Editorial article previews:
          Desktop: 3 columns with dashed dividers
          Mobile: vertical list
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x divide-dashed divide-border/80">
          {latestPosts.map((post, idx) => (
            <article
              key={post.slug || post.title}
              className={`group flex flex-col justify-between ${
                idx > 0 ? "pt-8 md:pt-0 md:pl-8 lg:pl-10 rtl:md:pl-0 rtl:md:pr-8 rtl:lg:pr-10" : ""
              }`}
            >
              <div>
                {/* Folio & Date Metadata */}
                <div className="flex items-center justify-between text-[11.5px] font-mono text-muted-foreground mb-3 pb-2 border-b border-dashed border-border/50">
                  <span className="text-accent font-semibold">
                    FOLIO // 0{idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span>{post.date}</span>
                    {post.readTime && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[19px] sm:text-[20px] font-semibold text-primary group-hover:text-accent transition-colors duration-200 mb-3 leading-snug">
                  <Link to={post.path || `/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                {/* Short Summary */}
                <p className="text-[14.5px] sm:text-[15px] text-secondary leading-relaxed font-normal mb-5 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read note → Link */}
              <div className="pt-2">
                <Link
                  to={post.path || `/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent group-hover:underline"
                >
                  <span>{isArabic ? "قراءة الملاحظة" : "Read note"}</span>
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

export default memo(EngineeringNotes);
