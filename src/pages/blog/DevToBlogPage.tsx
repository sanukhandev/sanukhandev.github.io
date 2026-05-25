import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ExternalLink,
  Hash,
} from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ZaakiyChatWidget from "@/components/ZaakiyChatWidget";
import { useDevToArticle, useDevToArticles } from "@/hooks/use-devto-articles";
import { buildBlogPostingSchema, buildBreadcrumbListSchema } from "@/lib/schema";

type TocItem = { id: string; text: string; level: number };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

function buildTocAndHtml(html: string): {
  toc: TocItem[];
  contentHtml: string;
} {
  const seen = new Map<string, number>();
  const toc: TocItem[] = [];

  const contentHtml = html.replace(
    /<h([1234])([^>]*?)>([\s\S]*?)<\/h[1234]>/gi,
    (_full, levelStr: string, attrs: string, rawText: string) => {
      const level = Number(levelStr);
      // id= on the h element itself (some renderers)
      const idMatch = attrs.match(/\bid="([^"]+)"/i);
      // Dev.to puts the anchor as <a name="..."> child inside the heading
      const nameMatch = rawText.match(/<a[^>]+\bname="([^"]+)"/i);
      const rawClean = rawText.replace(/<[^>]+>/g, "").trim();
      const cleanText = rawClean;
      const base =
        idMatch?.[1] ||
        nameMatch?.[1] ||
        slugify(rawClean) ||
        `section-${toc.length + 1}`;
      const count = seen.get(base) || 0;
      seen.set(base, count + 1);
      const id = count ? `${base}-${count + 1}` : base;

      // Only include h2 and h3 in the TOC
      if (cleanText && level >= 2 && level <= 3)
        toc.push({ id, text: cleanText, level });

      const attrsWithoutId = attrs.replace(/\bid="[^"]*"/i, "");
      return `<h${level}${attrsWithoutId} id="${id}">${rawText}</h${level}>`;
    },
  );

  return { toc, contentHtml };
}

export default function DevToBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useDevToArticle(slug);
  const { data: allArticles } = useDevToArticles(12);

  const recentPosts = useMemo(
    () => (allArticles || []).filter((a) => a.slug !== slug).slice(0, 6),
    [allArticles, slug],
  );

  const { toc, contentHtml } = useMemo(() => {
    if (!article?.body_html) {
      return { toc: [], contentHtml: "" };
    }

    const { toc: builtToc, contentHtml: rawHtml } = buildTocAndHtml(
      article.body_html,
    );
    const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
      USE_PROFILES: { html: true },
    });
    return { toc: builtToc, contentHtml: sanitizedHtml };
  }, [article]);

  useEffect(() => {
    if (!contentHtml) return;
    const blocks = document.querySelectorAll<HTMLElement>(
      ".devto-content .highlight.js-code-highlight",
    );
    const createdButtons: HTMLButtonElement[] = [];

    blocks.forEach((block) => {
      // Remove Dev.to's fullscreen panel
      block.querySelector(".highlight__panel")?.remove();
      // Don't add twice
      if (block.querySelector(".devto-copy-btn")) return;
      const pre = block.querySelector("pre");
      if (!pre) return;
      const btn = document.createElement("button");
      btn.className = "devto-copy-btn";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy code");
      btn.addEventListener("click", () => {
        const text = pre.textContent ?? "";
        navigator.clipboard
          .writeText(text)
          .then(() => {
            btn.textContent = "✓ Copied";
            setTimeout(() => {
              btn.textContent = "Copy";
            }, 2000);
          })
          .catch(() => {
            btn.textContent = "Error";
          });
      });
      block.appendChild(btn);
      createdButtons.push(btn);
    });

    return () => {
      createdButtons.forEach((button) => button.remove());
    };
  }, [contentHtml]);

  const articleRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!toc.length || !articleRef.current) return;
    const root = articleRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { root, rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );
    toc.forEach(({ id }) => {
      const el = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc, contentHtml]);

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
        <main className="min-h-[100dvh] bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
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
        <main className="min-h-[100dvh] bg-[var(--bg-primary)] pt-20 text-[var(--text-primary)]">
          <div className="mx-auto max-w-[1400px] px-4 py-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
            </Link>
            <h1 className="mt-6 text-4xl font-extrabold">Post Not Found</h1>
            <p className="mt-3 text-[15px] text-[var(--text-secondary)]">
              This post is unavailable. Browse all posts or visit Dev.to
              directly.
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

  const readingMinutes = Math.max(
    1,
    Math.round(
      (contentHtml
        ? contentHtml
            .replace(/<[^>]+>/g, " ")
            .trim()
            .split(/\s+/).length
        : article.description.trim().split(/\s+/).length) / 220,
    ),
  );

  return (
    <>
      <SeoMeta
        title={`${article.title} | Sanu Khan`}
        description={article.description}
        canonicalPath={article.localPath}
        keywords={article.tags.join(", ")}
        kind="article"
        publishedTime={article.publishedAt || undefined}
        modifiedTime={article.publishedAt || undefined}
        ogImage={article.coverImage || undefined}
        schema={[
          buildBlogPostingSchema({
            title: article.title,
            description: article.description,
            path: article.localPath,
            publishedTime: article.publishedAt || undefined,
            modifiedTime: article.publishedAt || undefined,
            image: article.coverImage || undefined,
            tags: article.tags,
          }),
          buildBreadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title, path: article.localPath },
          ]),
        ]}
      />

      <Navbar />

      <main className="bg-[var(--bg-primary)] pt-16 text-[var(--text-primary)]">
        <div className="mx-auto grid h-[calc(100vh-4rem)] max-w-[1700px] grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[260px_minmax(0,1fr)_300px]">
          <aside className="hidden xl:block">
            <div className="sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                On this page
              </p>

              {toc.length > 0 ? (
                <ul className="space-y-0.5">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={[
                            "block rounded-md py-1.5 text-[12px] leading-snug transition-colors",
                            isActive
                              ? "bg-[var(--accent)]/10 font-semibold text-[var(--accent)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--accent)]",
                          ].join(" ")}
                          style={{
                            paddingLeft: `${(item.level - 2) * 12 + 8}px`,
                            paddingRight: "8px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            const el =
                              articleRef.current?.querySelector<HTMLElement>(
                                `#${CSS.escape(item.id)}`,
                              );
                            el?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                            setActiveId(item.id);
                          }}
                        >
                          {isActive && (
                            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] align-middle" />
                          )}
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-[12px] text-[var(--text-secondary)]">
                  No headings found.
                </p>
              )}

              {article.tags.length > 0 && (
                <div className="mt-4 border-t border-[var(--border)] pt-3">
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

              <div className="mt-4 border-t border-[var(--border)] pt-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  Article Snapshot
                </p>
                <div className="space-y-1.5 text-[12px] text-[var(--text-secondary)]">
                  {published && <p>Published: {published}</p>}
                  <p>Read time: ~{readingMinutes} min</p>
                  <p>Total tags: {article.tags.length}</p>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--border)] pt-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  Quick Links
                </p>
                <div className="space-y-2 text-[12px]">
                  <Link
                    className="block text-[var(--accent)] hover:underline"
                    to="/blog"
                  >
                    Browse all blog posts
                  </Link>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open on Dev.to
                  </a>
                </div>
              </div>

              {recentPosts.length > 0 && (
                <div className="mt-4 border-t border-[var(--border)] pt-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                    More to Read
                  </p>
                  <div className="space-y-2">
                    {recentPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        to={post.localPath}
                        className="block rounded-lg px-2 py-1.5 text-[12px] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--accent)]"
                      >
                        {post.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <article ref={articleRef} className="min-h-0 overflow-y-auto pr-1">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent)] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All Posts
            </Link>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)] opacity-80">
              Tech Writing
            </p>
            <h1 className="mt-2 text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold leading-[1.12] tracking-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-[var(--text-secondary)]">
              {article.description}
            </p>

            {/* Clean meta row: Published · read time · author — inspired by reference design */}
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[var(--text-secondary)]">
              {published && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[var(--accent)]" />
                  {published}
                </span>
              )}
              {published && <span className="opacity-30">&middot;</span>}
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                {readingMinutes} min read
              </span>
              <span className="opacity-30">&middot;</span>
              <span className="font-semibold text-[var(--text-primary)]">
                Sanu Khan
              </span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1 text-[12px] text-[var(--accent)] opacity-70 hover:opacity-100 hover:underline"
              >
                <ExternalLink className="h-3 w-3" /> Dev.to
              </a>
            </div>

            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={article.title}
                width={1200}
                height={630}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="mt-6 w-full rounded-2xl border border-[var(--border)] object-cover"
              />
            )}

            {article.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
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

            {contentHtml ? (
              <div
                className="devto-content mt-7"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
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

            {/* KEEP READING — shown inline below article on all viewports */}
            {recentPosts.length > 0 && (
              <div className="mt-14 border-t border-[var(--border)] pt-8">
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  Keep Reading
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {recentPosts.slice(0, 4).map((post) => (
                    <Link
                      key={post.id}
                      to={post.localPath}
                      className="group flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3.5 transition-colors hover:border-[var(--accent)]/40 hover:bg-[var(--bg-primary)]"
                    >
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          width={320}
                          height={224}
                          loading="lazy"
                          decoding="async"
                          className="mt-0.5 h-14 w-20 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="mt-0.5 flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]">
                          <BookOpen className="h-5 w-5 text-[var(--text-secondary)]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                          {post.title}
                        </p>
                        {post.publishedAt && (
                          <p className="mt-1 text-[11px] text-[var(--text-secondary)]">
                            {new Date(post.publishedAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    View all posts <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </article>

          <aside className="hidden xl:block">
            <div className="h-full space-y-4">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/images/sanu.avif"
                    alt="Sanu Khan"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10 rounded-full border border-[var(--border)] object-cover"
                  />
                  <div>
                    <p className="text-[13px] font-bold text-[var(--text-primary)]">
                      Sanu Khan
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Tech Lead · Cloud Architect
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[12px] leading-5 text-[var(--text-secondary)]">
                  13+ years building distributed systems. Writing about
                  architecture, cloud, and engineering.
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
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-4">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    More to Read
                  </p>
                  <ul className="space-y-3">
                    {recentPosts.slice(0, 5).map((post) => (
                      <li key={post.id}>
                        <Link to={post.localPath} className="group block">
                          <p className="line-clamp-2 text-[12px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                            {post.title}
                          </p>
                          {post.publishedAt && (
                            <p className="mt-0.5 text-[10px] text-[var(--text-secondary)]">
                              {new Date(post.publishedAt).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-[var(--border)] pt-3">
                    <Link
                      to="/blog"
                      className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                    >
                      View all posts →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <ZaakiyChatWidget extraContext={chatContext} />
    </>
  );
}
