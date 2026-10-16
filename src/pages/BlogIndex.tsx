import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Search,
  Tag,
  X,
} from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { articles as fallbackArticles } from "@/data/siteData";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

type BlogCard = {
  href: string;
  title: string;
  description: string;
  publishedAt?: string;
  tags: string[];
  coverImage?: string | null;
  readTime?: string;
};

const slugFromDevToUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
};

const PAGE_SIZE = 8;

export default function BlogIndex() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("blogIndex", locale);
  const { data } = useDevToArticles(30);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [page, setPage] = useState(1);

  const devtoPosts: BlogCard[] = useMemo(
    () =>
      (data || []).map((post) => ({
        href: post.localPath,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        tags: post.tags,
        coverImage: post.coverImage,
      })),
    [data],
  );

  const fallbackPosts: BlogCard[] = useMemo(
    () =>
      fallbackArticles.map((post) => ({
        href: `/blog/${slugFromDevToUrl(post.url)}`,
        title: post.title,
        description: post.excerpt,
        tags: [post.category],
        readTime: post.readTime,
      })),
    [],
  );

  const posts = devtoPosts.length ? devtoPosts : fallbackPosts;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return ["all", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "all" || post.tags.includes(selectedTag);
      const matchesQuery =
        !needle ||
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  const paginatedPosts = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, page, totalPages]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const onSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const onTagChange = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTag("all");
    setPage(1);
  };

  return (
    <div className="sk-page relative min-h-screen flex flex-col">
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={"keywords" in seo ? seo.keywords : undefined}
        schema={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <Navbar />

      <main id="main-content" className="flex-1 pt-24 pb-20 sm:pt-28">
        <div className="sk-shell">
          {/* Header section */}
          <header className="border-b border-[var(--sk-line)] pb-8 sm:pb-12">
            <p className="sk-eyebrow mb-3">
              <span aria-hidden="true">/</span>
              {ar ? "الملاحظات الهندسية" : "ENGINEERING JOURNAL"}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--sk-fg)] leading-[1.08]">
              {ar
                ? "المقالات وملاحظات العمارة البرمجية"
                : "Articles & Architecture Notes"}
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-[var(--sk-fg)] opacity-85 leading-relaxed">
              {ar
                ? "دراسات متعمقة حول الأنظمة الموزعة وتكامل المؤسسات وعمارة الأنظمة المعتمدة على الأحداث وموثوقية الإنتاج."
                : "Field notes, deep dives and design decisions on distributed platforms, enterprise integration, event-driven systems and production reliability."}
            </p>
          </header>

          {/* Search & Tag Filter Bar */}
          <div className="mt-8 border-b border-[var(--sk-line)] pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search box */}
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--sk-fg)] opacity-50 rtl:left-auto rtl:right-3.5 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    ar
                      ? "ابحث في المقالات والمواضيع..."
                      : "Search by title, topic, or keyword..."
                  }
                  className="w-full pl-10 pr-9 py-2.5 rtl:pl-9 rtl:pr-10 bg-transparent border border-[var(--sk-line)] rounded-none text-sm text-[var(--sk-fg)] placeholder:text-[var(--sk-fg)]/45 focus:outline-none focus:border-[var(--sk-orange-ink)] transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--sk-fg)] opacity-50 hover:opacity-100 rtl:right-auto rtl:left-3"
                    aria-label={ar ? "مسح البحث" : "Clear search"}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Counter */}
              <p className="sk-mono text-[var(--sk-orange-ink)] font-semibold shrink-0">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? ar
                    ? "مقال"
                    : "ARTICLE"
                  : ar
                    ? "مقالات"
                    : "ARTICLES"}
              </p>
            </div>

            {/* Tag Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="sk-mono text-[var(--sk-fg)] opacity-60 mr-1 flex items-center gap-1 rtl:mr-0 rtl:ml-1">
                <Tag className="h-3 w-3" /> {ar ? "الموضوع:" : "TOPIC:"}
              </span>
              {allTags.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagChange(tag)}
                    className={`inline-flex items-center px-3 py-1 text-xs font-mono tracking-wider uppercase transition-colors ${
                      isSelected
                        ? "bg-[var(--sk-fg)] text-[var(--sk-bg)] border border-[var(--sk-fg)]"
                        : "border border-[var(--sk-line)] text-[var(--sk-fg)] hover:border-[var(--sk-fg)] bg-transparent"
                    }`}
                  >
                    {tag === "all" ? (ar ? "الكل" : "ALL") : `#${tag}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="mt-10">
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {paginatedPosts.map((post, idx) => {
                  const globalIdx = (page - 1) * PAGE_SIZE + idx + 1;
                  const dateStr = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString(
                        ar ? "ar-AE" : "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )
                    : null;

                  return (
                    <article
                      key={post.href}
                      className="group flex flex-col justify-between border border-[var(--sk-line)] bg-transparent p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--sk-fg)] hover:shadow-lg"
                    >
                      <div>
                        {/* Top Meta: Index & Category */}
                        <div className="flex items-center justify-between gap-2 border-b border-[var(--sk-line)] pb-3 text-xs">
                          <span className="sk-mono text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] font-semibold">
                            {post.tags[0] || (ar ? "هندسة" : "ENGINEERING")} /{" "}
                            {String(globalIdx).padStart(2, "0")}
                          </span>
                          {dateStr && (
                            <span className="sk-mono text-[var(--sk-fg)] opacity-70 flex items-center gap-1.5">
                              <Calendar className="h-3 w-3" />
                              {dateStr}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="mt-4 text-xl sm:text-2xl font-bold leading-snug text-[var(--sk-fg)] group-hover:text-[var(--sk-orange)] transition-colors">
                          <Link to={post.href} className="hover:underline">
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt / Summary */}
                        <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[var(--sk-fg)] opacity-85 line-clamp-3">
                          {post.description}
                        </p>
                      </div>

                      {/* Bottom Footer: Tags & Read Link */}
                      <div className="mt-6 pt-4 border-t border-[var(--sk-line)] flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono text-[var(--sk-fg)] opacity-70"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          to={post.href}
                          className="sk-text-link shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sk-orange-ink)] dark:text-[var(--sk-orange)] group-hover:text-[var(--sk-fg)]"
                        >
                          {ar ? "اقرأ المقال" : "Read article"}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="border border-[var(--sk-line)] p-12 text-center my-12">
                <p className="text-xl font-bold text-[var(--sk-fg)]">
                  {ar ? "لم يتم العثور على مقالات" : "No articles found"}
                </p>
                <p className="mt-2 text-sm text-[var(--sk-fg)] opacity-75">
                  {ar
                    ? "جرّب تغيير عبارة البحث أو اختيار موضوع آخر."
                    : "Try adjusting your search terms or clearing selected topic filters."}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--sk-fg)] text-[var(--sk-bg)] text-sm font-semibold hover:bg-[var(--sk-orange)] hover:text-white transition-colors"
                >
                  {ar ? "إعادة ضبط التصفية" : "Reset filters"}
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--sk-line)] pt-6">
              <p className="sk-mono text-xs text-[var(--sk-fg)] opacity-75">
                {ar
                  ? `عرض ${paginatedPosts.length} من إجمالي ${filteredPosts.length} مقال`
                  : `Showing ${paginatedPosts.length} of ${filteredPosts.length} articles`}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--sk-line)] text-xs font-mono uppercase text-[var(--sk-fg)] disabled:opacity-30 disabled:pointer-events-none hover:border-[var(--sk-fg)] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />{" "}
                  {ar ? "السابق" : "Prev"}
                </button>
                <span className="sk-mono text-xs px-3 py-1 text-[var(--sk-fg)]">
                  {ar
                    ? `صفحة ${page} من ${totalPages}`
                    : `Page ${page} of ${totalPages}`}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--sk-line)] text-xs font-mono uppercase text-[var(--sk-fg)] disabled:opacity-30 disabled:pointer-events-none hover:border-[var(--sk-fg)] transition-colors"
                >
                  {ar ? "التالي" : "Next"}{" "}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
