import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { Calendar, Tag, ArrowLeft, ExternalLink, BookOpen, Hash } from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ZaakiyChatWidget from "@/components/ZaakiyChatWidget";
import { useDevToArticle, useDevToArticles } from "@/hooks/use-devto-articles";

type TocItem = { id: string; text: string; level: number };

/** Extract h2/h3/h4 headings from Dev.to body_html */
function extractToc(html: string): TocItem[] {
  const re = /<h([234])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[234]>/gi;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    if (id && text) items.push({ id, text, level });
  }
  return items;
}

export default function DevToBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useDevToArticle(slug);
  const { data: allArticles } = useDevToArticles(8);

  const recentPosts = useMemo(
    () => (allArticles || []).filter((a) => a.slug !== slug).slice(0, 5),
    [allArticles, slug],
  );

  const toc = useMemo(
    () => (article?.body_html ? extractToc(article.body_html) : []),
    [article],
  );

  const chatContext = useMemo(() => {
    if (!article) return undefined;
    const bodyText = article.body_html
      ? article.body_html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 1200)
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
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline">
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
    ? new Date(article.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
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
          author: { "@type": "Person", name: "Sanu Khan", url: "https://sanukhan.dev" },
          publisher: { "@type": "Organization", name: "SanuKhan.dev", url: "https://sanukhan.dev" },
          mainEntityOfPage: article.url,
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
        <div className="mx-auto max-w-[1400px] px-4 py-8">

          {/* Back nav */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> All Posts
          </Link>

          {/* ── 3-column grid ── */}
          <div className="mt-5 flex gap-6 lg:items-start">

            {/* ── LEFT SIDEBAR: Table of Contents ── */}
            <aside className="hidden w-[220px] shrink-0 xl:block">
              <div className="sticky top-22 flex max-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                    On this page
                  </span>
                </div>
                {toc.length > 0 ? (
                  <nav className="overflow-y-auto px-3 py-3">
                    <ul className="space-y-0.5">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block rounded-lg px-2 py-1.5 text-[12px] leading-snug text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-primary)] hover:text-[var(--accent)]"
                            style={{ paddingLeft: `${(item.level - 2) * 10 + 8}px` }}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <div className="px-4 py-3">
                    <p className="text-[11px] text-[var(--text-secondary)]">No headings found.</p>
                  </div>
                )}
                {/* Tags section below TOC */}
                {article.tags.length > 0 && (
                  <div className="border-t border-[var(--border)] px-4 py-3">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Hash className="h-3 w-3 text-[var(--accent)]" />
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Tags</span>
                    </div>
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
                {/* Dev.to link */}
                <div className="border-t border-[var(--border)] px-4 py-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Read on Dev.to
                  </a>
                </div>
              </div>
            </aside>

            {/* ── MAIN ARTICLE ── */}
            <article className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                Engineering Blog
              </p>
              <h1 className="mt-2 text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold leading-[1.15]">
                {article.title}
              </h1>
              <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
                {article.description}
              </p>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[var(--text-secondary)]">
                {published && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {published}
                  </span>
                )}
                {article.tags.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {article.tags.slice(0, 3).join(", ")}
                  </span>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Dev.to
                </a>
              </div>

              {/* Cover image */}
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="mt-5 w-full rounded-2xl border border-[var(--border)] object-cover"
                />
              )}

              {/* Tags (mobile only — also shown in left sidebar on xl) */}
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

              {/* Article body */}
              {article.body_html ? (
                <div
                  className="devto-content mt-7"
                  // Dev.to returns sanitized HTML – safe to render
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: article.body_html }}
                />
              ) : (
                <div className="mt-7 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
                  <p className="text-[15px] text-[var(--text-secondary)]">Full article is on Dev.to.</p>
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

              {/* Footer CTA */}
              <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--border)] pt-7">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  Continue on Dev.to
                </a>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-5 py-2.5 text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog Index
                </Link>
              </div>
            </article>

            {/* ── RIGHT SIDEBAR: Recent posts + author card ── */}
            <aside className="hidden w-[260px] shrink-0 lg:block">
              <div className="sticky top-22 flex max-h-[calc(100vh-6rem)] flex-col gap-4 overflow-hidden">

                {/* Author card */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/images/sanu.avif"
                      alt="Sanu Khan"
                      className="h-10 w-10 rounded-full border border-[var(--border)] object-cover"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-[var(--text-primary)]">Sanu Khan</p>
                      <p className="text-[11px] text-[var(--text-secondary)]">Tech Lead · Cloud Architect</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] leading-5 text-[var(--text-secondary)]">
                    13+ years building distributed systems. Writing about architecture, cloud, and engineering.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a
                      href="https://dev.to/sanukhandev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border border-[var(--border)] py-1.5 text-center text-[11px] font-semibold text-[var(--accent)] hover:border-[var(--accent)]"
                    >
                      Dev.to
                    </a>
                    <Link
                      to="/"
                      className="flex-1 rounded-lg border border-[var(--border)] py-1.5 text-center text-[11px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                    >
                      Portfolio
                    </Link>
                  </div>
                </div>

                {/* Recent posts */}
                {recentPosts.length > 0 && (
                  <div className="flex min-h-0 flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <div className="border-b border-[var(--border)] px-4 py-3">
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                        More Posts
                      </span>
                    </div>
                    <ul className="space-y-0 divide-y divide-[var(--border)] overflow-hidden">
                      {recentPosts.map((post) => (
                        <li key={post.id}>
                          <Link
                            to={post.localPath}
                            className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[var(--bg-primary)]"
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
                      <Link to="/blog" className="text-[11px] font-semibold text-[var(--accent)] hover:underline">
                        View all posts →
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


export default function DevToBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useDevToArticle(slug);
  const { data: allArticles } = useDevToArticles(6);

  const recentPosts = useMemo(
    () => (allArticles || []).filter((a) => a.slug !== slug).slice(0, 4),
    [allArticles, slug],
  );

  /** Plain-text summary of the article for Zaakiy chat context */
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
          <div className="container-narrow section-pad">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-2/3 rounded-xl bg-[var(--bg-secondary)]" />
              <div className="h-4 w-full rounded-lg bg-[var(--bg-secondary)]" />
              <div className="h-4 w-5/6 rounded-lg bg-[var(--bg-secondary)]" />
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
          description="This blog post could not be loaded. Browse all engineering posts on Sanu Khan's blog index."
          canonicalPath={`/blog/${slug || ""}`}
        />
        <Navbar />
        <main className="min-h-screen bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
          <div className="container-narrow section-pad">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blog
            </Link>
            <h1 className="mt-6 text-4xl font-extrabold">Post Not Found</h1>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)]">
              This post is unavailable right now. Browse all posts or visit
              Dev.to directly.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://dev.to/sanukhandev"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[14px] font-semibold text-[var(--accent)] hover:underline"
              >
                View Dev.to Profile
              </a>
            </div>
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
        <div className="container-narrow section-pad">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Posts
          </Link>

          <div className="mt-6 flex flex-col gap-10 lg:flex-row lg:items-start">
            {/* ── Main article ── */}
            <article className="min-w-0 flex-1">
              {/* Label */}
              <p className="text-[12px] font-semibold uppercase tracking-widest text-[var(--accent)]">
                Engineering Blog
              </p>

              {/* Title */}
              <h1 className="mt-2 text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold leading-[1.15]">
                {article.title}
              </h1>

              {/* Description */}
              <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
                {article.description}
              </p>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-[var(--text-secondary)]">
                {published && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {published}
                  </span>
                )}
                {article.tags.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    {article.tags.slice(0, 4).join(", ")}
                  </span>
                )}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Read on Dev.to
                </a>
              </div>

              {/* Cover image */}
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="mt-6 w-full rounded-2xl border border-[var(--border)] object-cover"
                />
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1 text-[11px] font-semibold text-[var(--text-secondary)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Article body */}
              {article.body_html ? (
                <div
                  className="devto-content mt-8"
                  // Dev.to returns sanitized HTML – safe to render
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: article.body_html }}
                />
              ) : (
                <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 text-center">
                  <p className="text-[15px] text-[var(--text-secondary)]">
                    Full article content is available on Dev.to.
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

              {/* Footer CTA */}
              <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--border)] pt-8">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  Continue on Dev.to
                </a>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-5 py-2.5 text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog Index
                </Link>
              </div>
            </article>

            {/* ── Sidebar: recent posts ── */}
            {recentPosts.length > 0 && (
              <aside className="w-full shrink-0 lg:w-[280px]">
                <div className="sticky top-24">
                  <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                    Recent Posts
                  </h2>
                  <ul className="space-y-3">
                    {recentPosts.map((post) => (
                      <li key={post.id}>
                        <Link
                          to={post.localPath}
                          className="group block rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3.5 transition-colors hover:border-[var(--accent)]"
                        >
                          {post.coverImage && (
                            <img
                              src={post.coverImage}
                              alt=""
                              className="mb-2.5 h-28 w-full rounded-lg object-cover"
                            />
                          )}
                          <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                            {post.title}
                          </p>
                          {post.publishedAt && (
                            <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                              {new Date(post.publishedAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/blog"
                    className="mt-4 inline-block text-[12px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    View all posts →
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Zaakiy AI with blog context so it can answer questions about the article */}
      <ZaakiyChatWidget extraContext={chatContext} />
    </>
  );
}
