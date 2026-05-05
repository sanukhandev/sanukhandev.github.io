import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ExternalLink,
  Hash,
  Tag,
} from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ZaakiyChatWidget from "@/components/ZaakiyChatWidget";
import { useDevToArticle, useDevToArticles } from "@/hooks/use-devto-articles";

type TocItem = { id: string; text: string; level: number };

function extractToc(html: string): TocItem[] {
  const re = /<h([234])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[234]>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = re.exec(html)) !== null) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").trim();

    if (id && text) {
      items.push({ id, text, level });
    }
  }

  return items;
}

export default function DevToBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useDevToArticle(slug);
  const { data: allArticles } = useDevToArticles(10);

  const recentPosts = useMemo(
    () => (allArticles || []).filter((a) => a.slug !== slug).slice(0, 6),
    [allArticles, slug],
  );

  const toc = useMemo(
    () => (article?.body_html ? extractToc(article.body_html) : []),
    [article],
  );

  const chatContext = useMemo(() => {
    if (!article) return undefined;

    const bodyText = article.body_html
      ? article.body_html
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 1200)
      : article.description;

    return [
      `Blog title: ${article.title}`,
      `Summary: ${article.description}`,
      `Tags: ${article.tags.join(", ")}`,
      `Content excerpt: ${bodyText}`,
    ].join("\n");
  }, [article]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
          <div className="mx-auto max-w-[1400px] px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-2/3 rounded-xl bg-[var(--bg-secondary)]" />
              <div className="h-4 w-full rounded-lg bg-[var(--bg-secondary)]" />
              <div className="mt-8 h-64 rounded-2xl bg-[var(--bg-secondary)]" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isError || !article) {
    return (
      <>
        <SeoMeta
          title="Blog Post Not Found | Sanu Khan"
          description="This blog post could not be loaded."
          canonicalPath={`/blog/${slug || ""}`}
        />
        <Navbar />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
          <div className="mx-auto max-w-[1400px] px-4 py-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
            </Link>
            <h1 className="mt-6 text-4xl font-extrabold">Post Not Found</h1>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)]">
              This post is unavailable. Browse all posts or visit Dev.to directly.
            </p>
          </div>
        </main>
        <Footer />
        <ZaakiyChatWidget />
      </>
    );
  }

  const published = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <SeoMeta
        title={`${article.title} | Sanu Khan`}
        description={article.description}
        canonicalPath={article.localPath}
        keywords={article.tags.join(", ")}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          inLanguage: "en",
          url: `https://sanukhan.dev${article.localPath}`,
          datePublished: article.publishedAt || undefined,
          author: {
            "@type": "Person",
            name: "Sanu Khan",
            url: "https://sanukhan.dev",
          },
          publisher: {
            "@type": "Organization",
            name: "SanuKhan.dev",
            url: "https://sanukhan.dev",
          },
          mainEntityOfPage: article.url,
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
        <div className="mx-auto max-w-[1600px] px-4 py-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Posts
          </Link>

          <div className="mt-5 grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="border-b border-[var(--border)] px-4 py-3">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                    On this page
                  </p>
                </div>

                <div className="px-3 py-3">
                  {toc.length > 0 ? (
                    <ul className="space-y-1">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block rounded-lg px-2 py-1.5 text-[12px] leading-snug text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--accent)]"
                            style={{ paddingLeft: `${(item.level - 2) * 10 + 8}px` }}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      No headings found.
                    </p>
                  )}
                </div>

                {article.tags.length > 0 && (
                  <div className="border-t border-[var(--border)] px-4 py-3">
                    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                      <Hash className="h-3 w-3 text-[var(--accent)]" /> Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] bg-[var(--bg-primary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            <article className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                Engineering Blog
              </p>
              <h1 className="mt-2 text-[clamp(1.6rem,3.3vw,2.4rem)] font-extrabold leading-[1.15]">
                {article.title}
              </h1>
              <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
                {article.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                {published && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {published}
                  </span>
                )}
                {article.tags.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" /> {article.tags.slice(0, 3).join(", ")}
                  </span>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Dev.to
                </a>
              </div>

              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="mt-5 w-full rounded-2xl border border-[var(--border)] object-cover"
                />
              )}

              {article.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 xl:hidden">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {article.body_html ? (
                <div
                  className="devto-content mt-7"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: article.body_html }}
                />
              ) : (
                <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
                  <p className="text-[15px] text-[var(--text-secondary)]">
                    Full article is on Dev.to.
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read Full Article on Dev.to
                  </a>
                </div>
              )}

              <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--border)] pt-7">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" /> Continue on Dev.to
                </a>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-5 py-2.5 text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Blog Index
                </Link>
              </div>
            </article>

            <aside className="hidden xl:block">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/images/sanu.avif"
                      alt="Sanu Khan"
                      className="h-10 w-10 rounded-full border border-[var(--border)] object-cover"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-[var(--text-primary)]">Sanu Khan</p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Tech Lead · Cloud Architect
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] leading-5 text-[var(--text-secondary)]">
                    13+ years building distributed systems. Writing about architecture,
                    cloud, and engineering.
                  </p>
                  <a
                    href="https://dev.to/sanukhandev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> Follow on Dev.to
                  </a>
                </div>

                {recentPosts.length > 0 && (
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <div className="border-b border-[var(--border)] px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                        More Posts
                      </p>
                    </div>
                    <ul className="divide-y divide-[var(--border)]">
                      {recentPosts.map((post) => (
                        <li key={post.id}>
                          <Link
                            to={post.localPath}
                            className="group flex items-start gap-3 px-4 py-3 hover:bg-[var(--bg-primary)]"
                          >
                            {post.coverImage ? (
                              <img
                                src={post.coverImage}
                                alt=""
                                className="mt-0.5 h-12 w-16 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="mt-0.5 flex h-12 w-16 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]">
                                <BookOpen className="h-5 w-5 text-[var(--text-secondary)]" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                                {post.title}
                              </p>
                              {post.publishedAt && (
                                <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-[var(--border)] px-4 py-2.5">
                      <Link
                        to="/blog"
                        className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                      >
                        View all posts {"->"}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <ZaakiyChatWidget extraContext={chatContext} />
    </>
  );
}
