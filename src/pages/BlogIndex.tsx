import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Search, Tag } from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { articles as fallbackArticles } from "@/data/siteData";

type BlogCard = {
  href: string;
  title: string;
  description: string;
  publishedAt?: string;
  tags: string[];
};

const slugFromDevToUrl = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
};

const PAGE_SIZE = 6;

export default function BlogIndex() {
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
      const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
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

  return (
    <>
      <SeoMeta
        title="Engineering Blog | Sanu Khan"
        description="Engineering blog with deep-dive guides on architecture, backend systems, JavaScript, cloud, and practical software execution."
        canonicalPath="/blog"
        keywords="engineering blog, software architecture, nodejs, javascript, distributed systems"
      />

      <Navbar />

      <main className="bg-[var(--bg-primary)] pt-16 text-[var(--text-primary)]">
        <div className="mx-auto grid h-[calc(100vh-4rem)] max-w-[1700px] grid-cols-1 gap-6 px-4 py-6 xl:grid-cols-[260px_minmax(0,1fr)_280px]">
          <aside className="hidden xl:block">
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                Blog Task Bar
              </p>

              <label className="mb-2 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-[12px]">
                <Search className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <input
                  value={query}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search blogs"
                  className="w-full bg-transparent text-[12px] outline-none placeholder:text-[var(--text-secondary)]"
                />
              </label>

              <p className="mb-2 mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                <Tag className="h-3.5 w-3.5" /> Filter by tag
              </p>
              <div className="max-h-[calc(100vh-18rem)] space-y-1 overflow-y-auto pr-1">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagChange(tag)}
                    className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-[12px] transition-colors ${
                      selectedTag === tag
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                    }`}
                  >
                    {tag === "all" ? "All tags" : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="min-h-0 overflow-y-auto pr-1">
            <h1 className="text-[38px] font-extrabold text-[var(--text-primary)]">
              Engineering Blog
            </h1>
            <p className="mt-3 max-w-3xl text-[15px] text-[var(--text-secondary)]">
              Deep dives on architecture, backend patterns, cloud systems, and practical engineering execution.
            </p>

            <div className="mt-5 xl:hidden">
              <label className="mb-2 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-[12px]">
                <Search className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                <input
                  value={query}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search blogs"
                  className="w-full bg-transparent text-[12px] outline-none placeholder:text-[var(--text-secondary)]"
                />
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagChange(tag)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${
                      selectedTag === tag
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {tag === "all" ? "All" : `#${tag}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {paginatedPosts.map((post) => (
                <article key={post.href} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
                  <h2 className="text-[20px] font-bold text-[var(--text-primary)]">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-[14px] text-[var(--text-secondary)]">{post.description}</p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                    {post.publishedAt && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={`${post.href}-${tag}`}
                        className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    className="mt-4 inline-flex text-[14px] font-semibold text-[var(--accent)] hover:underline"
                    to={post.href}
                  >
                    Read article
                  </Link>
                </article>
              ))}

              {!paginatedPosts.length && (
                <article className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5 sm:col-span-2">
                  <h2 className="text-[20px] font-bold text-[var(--text-primary)]">No posts found</h2>
                  <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                    Try changing your search or selected tag.
                  </p>
                </article>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
              <p className="text-[12px] text-[var(--text-secondary)]">
                Showing {paginatedPosts.length} of {filteredPosts.length} posts
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[12px] disabled:opacity-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Prev
                </button>
                <span className="text-[12px] text-[var(--text-secondary)]">
                  Page {Math.min(page, totalPages)} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[12px] disabled:opacity-50"
                >
                  Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </section>

          <aside className="hidden xl:block">
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                Blog Overview
              </p>
              <div className="mt-3 space-y-2 text-[13px] text-[var(--text-secondary)]">
                <p>Total posts: {posts.length}</p>
                <p>Filtered posts: {filteredPosts.length}</p>
                <p>Total tags: {Math.max(0, allTags.length - 1)}</p>
              </div>

              <div className="mt-5 border-t border-[var(--border)] pt-4">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
                  Quick Links
                </p>
                <div className="flex flex-col gap-2 text-[13px]">
                  <Link className="text-[var(--accent)] hover:underline" to="/">
                    Back to portfolio
                  </Link>
                  <Link className="text-[var(--accent)] hover:underline" to="/tools">
                    Explore tools
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
