import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { ArrowRight, Clock } from "lucide-react";

interface FallbackNote {
  category: string;
  title: string;
  description: string;
  readTime: string;
  localPath: string;
}

const fallbackNotes: FallbackNote[] = [
  {
    category: "Architecture",
    title: "API Gateway: The Bouncer Your Microservices Didn't Know They Needed",
    description:
      "How API Gateways act as the single entry point for microservices — handling auth, rate limiting, routing, and observability so your services don't have to.",
    readTime: "5 min read",
    localPath: "/blog/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e",
  },
  {
    category: "Data Engineering",
    title: "DuckDB: The SQLite of Analytics You Didn't Know You Needed",
    description:
      "An in-process OLAP database with zero config, blazing-fast columnar queries, and support for CSV, Parquet, and JSON — perfect for data science and offline analytics.",
    readTime: "4 min read",
    localPath: "/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m",
  },
  {
    category: "Platform Engineering",
    title: "Unmasking JavaScript Proxies: The Secret Agents of Your Objects",
    description:
      "Using JavaScript Proxy to intercept object behaviors for validation, logging, access control, and understanding Vue 3 reactivity.",
    readTime: "6 min read",
    localPath: "/blog/unmasking-javascript-proxies-the-secret-agents-of-your-objects-4eac",
  },
];

export default function EngineeringNotes() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const { data: fetchedArticles } = useDevToArticles(3);

  const displayNotes =
    fetchedArticles && fetchedArticles.length > 0
      ? fetchedArticles.slice(0, 3).map((art) => ({
          category: art.tags[0] ? art.tags[0].toUpperCase() : "ARCHITECTURE",
          title: art.title,
          description: art.description,
          readTime: "~5 min read",
          localPath: art.localPath,
        }))
      : fallbackNotes;

  return (
    <section id="writing" className="section-pad scroll-mt-20">
      <div id="articles" className="container-narrow">
        <SectionHeading
          eyebrow={isArabic ? "المقالات الهندسية" : "TECHNICAL WRITING"}
          title={isArabic ? "ملاحظات هندسية" : "Engineering Notes"}
          subtitle={
            isArabic
              ? "رؤى معمارية، دروس من الإنتاج، وملاحظات حول بناء المنصات القابلة للتوسع."
              : "Architectural insights, platform notes, and lessons learned from production systems."
          }
          align="left"
        />

        {/* 3 Featured Article Cards Routing Internally to /blog/:slug */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayNotes.map((note) => (
            <Link
              key={note.title}
              to={note.localPath}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-secondary/20 p-6 transition-all duration-300 hover:border-accent/50 hover:bg-secondary/50 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                    {note.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Clock className="h-3 w-3" />
                    {note.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {note.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary line-clamp-3">
                  {note.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline">
                  <span>Read article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <span>View all engineering notes</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
