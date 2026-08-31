import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface Note {
  category: string;
  title: string;
  description: string;
  readTime: string;
  url: string;
  isExternal?: boolean;
}

const featuredNotes: Note[] = [
  {
    category: "Architecture",
    title: "API Gateway: The Bouncer Your Microservices Didn't Know They Needed",
    description:
      "How API Gateways act as the single entry point for microservices — handling auth, rate limiting, routing, and observability so your services don't have to.",
    readTime: "5 min read",
    url: "https://dev.to/sanukhandev/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e",
    isExternal: true,
  },
  {
    category: "Data Engineering",
    title: "DuckDB: The SQLite of Analytics You Didn't Know You Needed",
    description:
      "An in-process OLAP database with zero config, blazing-fast columnar queries, and support for CSV, Parquet, and JSON — perfect for data science and offline analytics.",
    readTime: "4 min read",
    url: "https://dev.to/sanukhandev",
    isExternal: true,
  },
  {
    category: "Platform Engineering",
    title: "Architecting a Resilient Multi-Tenant SaaS Engine",
    description:
      "Design considerations for tenant isolation, data boundaries, and API rate-limiting in production cloud environments.",
    readTime: "6 min read",
    url: "/blog/nodejs-api-best-practices",
    isExternal: false,
  },
];

export default function EngineeringNotes() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

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

        {/* 3 Featured Article Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredNotes.map((note) => (
            <div
              key={note.title}
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
                {note.isExternal ? (
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    to={note.url}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>Read article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
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
