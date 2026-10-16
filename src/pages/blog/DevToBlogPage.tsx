import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ExternalLink,
  Hash,
  Share2,
} from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { profile } from "@/data/siteData";
import { useDevToArticle, useDevToArticles } from "@/hooks/use-devto-articles";
import { buildBlogPostingSchema, buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

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
      const idMatch = attrs.match(/\bid="([^"]+)"/i);
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
  const { locale } = useLocale();
  const ar = locale === "ar";
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
      block.querySelector(".highlight__panel")?.remove();
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
    const articleEl = articleRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: "-80px 0px -55% 0px", threshold: 0 },
    );
    toc.forEach(({ id }) => {
      const el = articleEl.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc, contentHtml]);

  if (isLoading) {
    return (
      <div className="sk-page relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-20 sm:pt-28">
          <div className="sk-shell max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-32 bg-[var(--sk-line)]" />
              <div className="h-10 w-3/4 bg-[var(--sk-line)]" />
              <div className="h-5 w-full bg-[var(--sk-line)]" />
              <div className="h-5 w-2/3 bg-[var(--sk-line)]" />
              <div className="mt-12 h-96 w-full border border-[var(--sk-line)] bg-transparent" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="sk-page relative min-h-screen flex flex-col">
        <SeoMeta
          title="Blog Post Not Found | Sanu Khan"
          description="This blog post could not be loaded."
          canonicalPath={`/blog/${slug || ""}`}
        />
        <Navbar />
        <main className="flex-1 pt-24 pb-20 sm:pt-28">
          <div className="sk-shell max-w-2xl mx-auto text-center border border-[var(--sk-line)] p-12">
            <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] mb-2">ERROR 404</p>
            <h1 className="text-3xl font-bold text-[var(--sk-fg)]">
              {ar ? "المقال غير متوفر" : "Article Not Found"}
            </h1>
            <p className="mt-3 text-base text-[var(--sk-fg)] opacity-75">
              {ar
                ? "تعذر تحميل هذا المقال. يمكنك تصفح بقية المقالات من الفهرس."
                : "The requested article is currently unavailable or may have been moved."}
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--sk-fg)] text-[var(--sk-bg)] text-sm font-semibold hover:bg-[var(--sk-orange)] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />{" "}
              {ar ? "العودة إلى المدونة" : "Back to Blog Index"}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const published = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(
        ar ? "ar-AE" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      )
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
    <div className="sk-page relative min-h-screen flex flex-col">
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

      <main id="main-content" className="flex-1 pt-24 pb-20 sm:pt-28">
        <div className="sk-shell">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[240px_minmax(0,1fr)_260px]">
            {/* Left Column: Sticky Table of Contents */}
            <aside className="hidden xl:block">
              <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto space-y-6 pr-2">
                <Link
                  to="/blog"
                  className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] hover:text-[var(--sk-fg)] transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />{" "}
                  {ar ? "كل المقالات" : "ALL ARTICLES"}
                </Link>

                {toc.length > 0 && (
                  <div className="border-t border-[var(--sk-line)] pt-5">
                    <p className="sk-mono text-[var(--sk-fg)] font-semibold mb-3 flex items-center gap-1.5 text-xs tracking-wider uppercase">
                      <BookOpen className="h-3.5 w-3.5 text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)]" />
                      {ar ? "جدول المحتويات" : "CONTENTS"}
                    </p>
                    <ul className="space-y-1.5 text-xs">
                      {toc.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={`block py-1 text-xs leading-snug transition-colors ${
                                isActive
                                  ? "font-bold text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] border-l-2 border-[var(--sk-orange-ink)] dark:border-[var(--sk-orange)] pl-2"
                                  : "text-[var(--sk-fg)] opacity-70 hover:opacity-100 hover:text-[var(--sk-orange)] pl-2.5"
                              }`}
                              style={{
                                paddingInlineStart: `${
                                  (item.level - 2) * 10 + 8
                                }px`,
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
                              {item.text}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <div className="border-t border-[var(--sk-line)] pt-5 text-xs space-y-2">
                  <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] font-semibold uppercase">
                    {ar ? "بيانات القراءة" : "ARTICLE METRICS"}
                  </p>
                  {published && (
                    <p className="text-[var(--sk-fg)] opacity-75">
                      {ar ? "تاريخ النشر:" : "Published:"} {published}
                    </p>
                  )}
                  <p className="text-[var(--sk-fg)] opacity-75">
                    {ar ? "وقت القراءة المقدر:" : "Est. reading time:"} ~{readingMinutes}{" "}
                    {ar ? "دقائق" : "min"}
                  </p>
                </div>
              </div>
            </aside>

            {/* Center Column: Article Content */}
            <article
              ref={articleRef}
              className="max-w-[760px] mx-auto w-full min-w-0"
            >
              {/* Back breadcrumb for mobile/tablet */}
              <div className="xl:hidden mb-6">
                <Link
                  to="/blog"
                  className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] inline-flex items-center gap-1.5 text-xs font-semibold"
                >
                  <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />{" "}
                  {ar ? "العودة إلى جميع المقالات" : "BACK TO ALL ARTICLES"}
                </Link>
              </div>

              {/* Eyebrow */}
              <p className="sk-eyebrow mb-2">
                <span aria-hidden="true">/</span>
                {article.tags[0]?.toUpperCase() ||
                  (ar ? "مقال تقني" : "TECHNICAL ARTICLE")}
              </p>

              {/* H1 Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--sk-fg)] leading-[1.12]">
                {article.title}
              </h1>

              {/* Excerpt / Lead */}
              <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[var(--sk-fg)] opacity-85 font-normal">
                {article.description}
              </p>

              {/* Meta row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[var(--sk-fg)] opacity-75 pb-6 border-b border-[var(--sk-line)]">
                {published && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)]" />
                    {published}
                  </span>
                )}
                <span className="opacity-40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)]" />
                  ~{readingMinutes} {ar ? "دقائق قراءة" : "min read"}
                </span>
                <span className="opacity-40">•</span>
                <span className="font-semibold text-[var(--sk-fg)]">
                  {profile.name}
                </span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] font-semibold hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Dev.to
                </a>
              </div>

              {/* Cover Image (real image only, no wireframe box) */}
              {article.coverImage &&
                article.coverImage.startsWith("http") && (
                  <figure className="my-8 overflow-hidden rounded-md border border-[var(--sk-line)]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-auto object-cover max-h-[480px]"
                      loading="eager"
                    />
                  </figure>
                )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="my-6 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 border border-[var(--sk-line)] text-xs font-mono uppercase text-[var(--sk-fg)] opacity-75"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Body Content */}
              {contentHtml ? (
                <div
                  className="devto-content mt-8"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                <div className="mt-8 border border-[var(--sk-line)] p-8 text-center">
                  <p className="text-base text-[var(--sk-fg)] opacity-80">
                    {ar
                      ? "المحتوى الكامل منشور على Dev.to."
                      : "Full article content is available on Dev.to."}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--sk-orange)] text-[var(--sk-white)] text-sm font-semibold hover:bg-[var(--sk-orange-ink)] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {ar ? "قراءة المقال على Dev.to" : "Read Full Article on Dev.to"}
                  </a>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-[var(--sk-line)] pt-8">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--sk-orange)] text-[var(--sk-white)] text-sm font-semibold hover:bg-[var(--sk-orange-ink)] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />{" "}
                  {ar ? "متابعة النقاش على Dev.to" : "Join Discussion on Dev.to"}
                </a>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[var(--sk-line)] text-sm font-semibold text-[var(--sk-fg)] hover:border-[var(--sk-fg)] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" />{" "}
                  {ar ? "فهرس المقالات" : "Back to Blog Index"}
                </Link>
              </div>

              {/* Keep Reading Section */}
              {recentPosts.length > 0 && (
                <section className="mt-16 border-t border-[var(--sk-line)] pt-10">
                  <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] font-semibold mb-6">
                    {ar ? "مواضيع مقترحة للقراءة" : "CONTINUE READING"}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {recentPosts.slice(0, 4).map((post) => (
                      <Link
                        key={post.id}
                        to={post.localPath}
                        className="group flex flex-col justify-between border border-[var(--sk-line)] p-5 hover:border-[var(--sk-fg)] hover:-translate-y-0.5 transition-all"
                      >
                        <div>
                          <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] text-xs mb-2">
                            {post.tags[0]?.toUpperCase() || "ENGINEERING"}
                          </p>
                          <h3 className="text-base font-bold text-[var(--sk-fg)] group-hover:text-[var(--sk-orange)] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-[var(--sk-fg)] opacity-75 mt-2 line-clamp-2 leading-relaxed">
                            {post.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[var(--sk-line)] flex items-center justify-between text-xs">
                          {post.publishedAt && (
                            <span className="sk-mono opacity-60">
                              {new Date(post.publishedAt).toLocaleDateString(
                                ar ? "ar-AE" : "en-US",
                                { month: "short", day: "numeric", year: "numeric" },
                              )}
                            </span>
                          )}
                          <span className="sk-text-link inline-flex items-center gap-1 font-semibold text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] group-hover:text-[var(--sk-fg)]">
                            {ar ? "قراءة" : "Read"}{" "}
                            <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Right Column: Sticky Author & Info */}
            <aside className="hidden xl:block">
              <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto space-y-6">
                {/* Author Card with real portrait */}
                <div className="border border-[var(--sk-line)] p-5">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/hero-avatar-latest-480.webp"
                      alt={profile.name}
                      className="h-12 w-12 rounded-full object-cover border border-[var(--sk-line)]"
                    />
                    <div>
                      <p className="text-sm font-bold text-[var(--sk-fg)]">
                        {profile.name}
                      </p>
                      <p className="sk-mono text-[11px] text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)]">
                        Tech Lead &amp; Architect
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--sk-fg)] opacity-80">
                    13+ years building distributed systems, event-driven
                    architecture, and enterprise cloud solutions.
                  </p>
                  <a
                    href="https://dev.to/sanukhandev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> Follow on Dev.to
                  </a>
                </div>

                {/* Article Tags */}
                {article.tags.length > 0 && (
                  <div className="border border-[var(--sk-line)] p-5">
                    <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] text-xs font-semibold mb-3 flex items-center gap-1.5 uppercase">
                      <Hash className="h-3.5 w-3.5" /> Topic Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 border border-[var(--sk-line)] text-[11px] font-mono uppercase text-[var(--sk-fg)] opacity-80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* More notes */}
                {recentPosts.length > 0 && (
                  <div className="border border-[var(--sk-line)] p-5">
                    <p className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] text-xs font-semibold mb-3 uppercase">
                      More Architecture Notes
                    </p>
                    <ul className="space-y-3">
                      {recentPosts.slice(0, 4).map((post) => (
                        <li key={post.id}>
                          <Link to={post.localPath} className="group block">
                            <p className="text-xs font-semibold text-[var(--sk-fg)] group-hover:text-[var(--sk-orange)] transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </p>
                            {post.publishedAt && (
                              <p className="sk-mono text-[10px] text-[var(--sk-fg)] opacity-60 mt-1">
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
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
