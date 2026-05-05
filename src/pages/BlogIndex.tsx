import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { articles as fallbackArticles } from "@/data/siteData";

const slugFromDevToUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
};

export default function BlogIndex() {
  const { data } = useDevToArticles(24);
  const devtoPosts = (data || []).map((post) => ({
    href: post.localPath,
    title: post.title,
    description: post.description,
  }));
  const fallbackPosts = fallbackArticles.map((post) => ({
    href: `/blog/${slugFromDevToUrl(post.url)}`,
    title: post.title,
    description: post.excerpt,
  }));
  const posts = devtoPosts.length ? devtoPosts : fallbackPosts;

  return (
    <>
      <SeoMeta
        title="Engineering Blog | Sanu Khan"
        description="Engineering blog with deep-dive guides on javascript algorithms and nodejs api best practices for scalable software teams."
        canonicalPath="/blog"
        keywords="engineering blog, javascript algorithms, nodejs api best practices, software architecture"
      />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">
            Engineering Blog
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] text-secondary">
            Long-form guides focused on architecture, backend patterns, and
            practical engineering execution.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <article key={post.href} className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-[14px] text-secondary">
                  {post.description}
                </p>
                <Link
                  className="mt-3 inline-flex text-[14px] font-semibold text-accent hover:underline"
                  to={post.href}
                >
                  Read {post.title}
                </Link>
              </article>
            ))}
            {!posts.length && (
              <article className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-primary">
                  No blog posts loaded yet
                </h2>
                <p className="mt-2 text-[14px] text-secondary">
                  Please check again in a moment or visit the Dev.to profile
                  directly.
                </p>
                <a
                  className="mt-3 inline-flex text-[14px] font-semibold text-accent hover:underline"
                  href="https://dev.to/sanukhandev"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on Dev.to
                </a>
              </article>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="text-[14px] font-semibold text-accent hover:underline"
              to="/tools"
            >
              Explore Developer Tools
            </Link>
            <Link
              className="text-[14px] font-semibold text-accent hover:underline"
              to="/full-stack-consultant-uae"
            >
              Full Stack Consultant UAE
            </Link>
            <Link
              className="text-[14px] font-semibold text-accent hover:underline"
              to="/"
            >
              Back to Portfolio
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
