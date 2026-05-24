import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { articles as fallbackArticles } from "@/data/siteData";

const slugFromDevToUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
};

const fallbackBlogs = fallbackArticles.slice(0, 4).map((article) => ({
  title: article.title,
  href: `/blog/${slugFromDevToUrl(article.url)}`,
  description: article.excerpt,
}));

export default function BlogPreview() {
  const { data } = useDevToArticles(4);
  const devtoBlogs = (data || []).map((post) => ({
    title: post.title,
    href: post.localPath,
    description: post.description,
  }));
  const blogs = devtoBlogs.length ? devtoBlogs : fallbackBlogs;

  return (
    <section className="section-pad" id="ecosystem">
      <div className="container-narrow">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent opacity-90">
              Ecosystem
            </p>
            <h2 className="mt-1 text-[clamp(1.9rem,7vw,2.8rem)] font-bold leading-tight tracking-tight text-primary">
              Platform Intelligence Journal
            </h2>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:underline sm:mb-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <p className="mt-2 max-w-2xl text-[14px] leading-6 text-secondary sm:text-[15px]">
          Engineering analyses on distributed systems, operational telemetry, event-driven design, and enterprise integration strategies.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {blogs.map((post) => (
            <Link
              key={post.href}
              to={post.href}
              className="group premium-card relative flex flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-primary transition-colors group-hover:text-accent sm:text-[16px]">
                  {post.title}
                </h3>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-secondary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-70" />
              </div>
              <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-6 text-secondary">
                {post.description}
              </p>
              <p className="mt-4 text-[12px] font-semibold text-accent opacity-80 group-hover:opacity-100">
                Read article →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
