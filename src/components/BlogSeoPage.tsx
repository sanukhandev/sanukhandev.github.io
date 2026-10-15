import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import SeoMeta from "@/components/SeoMeta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import {
  buildBlogPostingSchema,
  buildBreadcrumbListSchema,
  buildFaqSchema,
} from "@/lib/schema";

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  code?: string;
};

type BlogSeoPageProps = {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  keywordLead: string;
  toc: Array<{ id: string; label: string }>;
  sections: Section[];
  faq: Array<{ q: string; a: string }>;
  links: Array<{ label: string; href: string }>;
};

export default function BlogSeoPage(props: BlogSeoPageProps) {
  const {
    title,
    description,
    canonicalPath,
    h1,
    keywordLead,
    toc,
    sections,
    faq,
    links,
  } = props;

  const schemas = [
    buildBlogPostingSchema({
      title: h1,
      description,
      path: canonicalPath,
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: h1, path: canonicalPath },
    ]),
  ];

  if (faq.length > 0) {
    schemas.push(buildFaqSchema(faq));
  }

  return (
    <div className="sk-page relative min-h-screen flex flex-col">
      <SeoMeta
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        kind="article"
        schema={schemas}
      />
      <Navbar />

      <main id="main-content" className="flex-1 pt-24 pb-20 sm:pt-28">
        <article className="sk-shell max-w-[760px] mx-auto w-full">
          {/* Breadcrumb back link */}
          <Link
            to="/blog"
            className="sk-mono text-[var(--sk-orange-ink)] inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:text-[var(--sk-black)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ALL ARTICLES
          </Link>

          <p className="sk-eyebrow mb-2">
            <span aria-hidden="true">/</span> ENGINEERING GUIDE
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--sk-black)] leading-[1.12]">
            {h1}
          </h1>

          <p className="mt-4 text-lg sm:text-xl leading-relaxed text-[var(--sk-black)] opacity-85 font-normal">
            {keywordLead}
          </p>

          {/* Table of contents */}
          {toc.length > 0 && (
            <section className="mt-8 border border-[var(--sk-line)] p-6">
              <h2 className="sk-mono text-[var(--sk-orange-ink)] font-semibold flex items-center gap-2 text-xs uppercase tracking-wider mb-3">
                <BookOpen className="h-4 w-4" /> Table of Contents
              </h2>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-[var(--sk-black)] opacity-80 hover:opacity-100 hover:text-[var(--sk-orange-ink)] hover:underline transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Body Sections */}
          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sk-black)] pb-3 border-b border-[var(--sk-line)]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base sm:text-lg leading-relaxed text-[var(--sk-black)] opacity-90">
                  {section.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>
                {section.code ? (
                  <pre className="mt-5 overflow-x-auto border border-white/20 bg-[var(--sk-black)] text-[var(--sk-ivory)] p-4 sm:p-5 font-mono text-xs sm:text-sm rounded-md shadow-md leading-relaxed">
                    <code>{section.code}</code>
                  </pre>
                ) : null}
              </section>
            ))}
          </div>

          {/* FAQ */}
          {faq.length > 0 && (
            <section className="mt-14 border-t border-[var(--sk-line)] pt-10">
              <p className="sk-eyebrow mb-2">
                <span aria-hidden="true">/</span> FREQUENTLY ASKED
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sk-black)] mb-6">
                Questions &amp; Practical Answers
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <article
                    key={item.q}
                    className="border border-[var(--sk-line)] p-5 sm:p-6"
                  >
                    <h3 className="text-lg font-bold text-[var(--sk-black)]">
                      {item.q}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[var(--sk-black)] opacity-85">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Related internal links */}
          {links.length > 0 && (
            <nav
              className="mt-12 border-t border-[var(--sk-line)] pt-8"
              aria-label="Related guides"
            >
              <p className="sk-mono text-[var(--sk-orange-ink)] text-xs font-semibold uppercase tracking-wider mb-3">
                Related Engineering Guides
              </p>
              <ul className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="sk-text-link inline-flex items-center gap-1 text-sm font-semibold text-[var(--sk-orange-ink)] hover:text-[var(--sk-black)]"
                      to={link.href}
                    >
                      {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
