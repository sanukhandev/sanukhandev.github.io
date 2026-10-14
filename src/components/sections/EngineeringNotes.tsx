import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function EngineeringNotes() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const { articles } = useSiteContent();

  // Grab latest 3 articles dynamically from existing blog content
  const latestPosts = articles.slice(0, 3);

  return (
    <section id="writing" className="studio-writing">
      <div className="studio-shell">
        <header className="studio-section-heading studio-writing-heading">
          <div>
            <div className="studio-eyebrow"><span>{isArabic ? "ملاحظات هندسية" : "ENGINEERING NOTES"}</span><span aria-hidden="true">/ NOTEBOOK DISPATCHES</span></div>
            <h2>{isArabic ? "أحدث الأفكار من ملاحظاتي الهندسية." : "Latest thinking from my notes."}</h2>
          </div>
          <Link className="studio-text-link" to="/blog">{isArabic ? "عرض كل الملاحظات" : "View all notes"} <ArrowRight size={20} aria-hidden="true" className="rtl:rotate-180" /></Link>
        </header>
        <div className="studio-journal">
          {latestPosts.map((post, idx) => (
            <article key={post.localPath || post.title} className={`studio-journal-entry studio-journal-entry--${idx + 1}`}>
              <Link to={post.localPath} className="studio-journal-cover" aria-label={post.title}>
                <MediaPlaceholder kind="article" index={String(idx + 1).padStart(2, "0")} />
                
              </Link>
              <div className="studio-journal-copy">
                <div className="studio-journal-meta"><span>FOLIO // 0{idx + 1}</span><span>{post.category}</span></div>
                <h3><Link to={post.localPath}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link className="studio-text-link" to={post.localPath}>{isArabic ? "قراءة الملاحظة" : "Read note"} <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(EngineeringNotes);
