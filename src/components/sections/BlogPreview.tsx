import { Link } from "react-router-dom";
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
    <section className="section-pad" id="blog">
      <div className="container-narrow">
        <h2 className="text-[28px] font-bold leading-tight tracking-tight text-primary">
          Blog
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] text-secondary">
          Latest technical posts from Dev.to on architecture, backend systems,
          and platform engineering.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {blogs.map((post) => (
            <article key={post.href} className="premium-card p-5">
              <h3 className="text-[18px] font-semibold text-primary">
                {post.title}
              </h3>
              <p className="mt-2 text-[14px] text-secondary">
                {post.description}
              </p>
              <Link
                className="mt-4 inline-flex text-[14px] font-semibold text-accent hover:underline"
                to={post.href}
              >
                Read {post.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
