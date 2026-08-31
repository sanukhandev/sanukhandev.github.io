import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";
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
  const { title, description, canonicalPath, h1, keywordLead, toc, sections, faq, links } = props;
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
    <>
      <SeoMeta
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        kind="article"
        schema={schemas}
      />
      <main className="min-h-[100dvh] bg-background pt-20 pb-16 text-foreground">
        <article className="container-narrow section-pad max-w-3xl mx-auto">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-primary sm:text-3xl md:text-4xl">{h1}</h1>
          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">{keywordLead}</p>

          <section className="mt-8 rounded-xl border border-default bg-secondary p-5">
            <h2 className="text-lg font-bold text-primary">Table of Contents</h2>
            <ul className="mt-3 space-y-2 text-sm text-secondary">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-primary hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-xl font-bold text-primary sm:text-2xl pb-2 border-b border-border/40">{section.title}</h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-secondary">
                  {section.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>
                {section.code ? (
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-default bg-secondary p-4 font-mono text-xs sm:text-sm text-secondary">
                    {section.code}
                  </pre>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-[26px] font-bold text-primary">FAQ</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <article key={item.q} className="rounded-xl border border-default bg-secondary p-4">
                  <h3 className="text-[18px] font-semibold text-primary">{item.q}</h3>
                  <p className="mt-2 text-[15px] text-secondary">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <nav className="mt-10" aria-label="Internal links">
            <h2 className="text-[22px] font-bold text-primary">Related Internal Links</h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link className="text-[14px] font-semibold text-accent hover:underline" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </main>
    </>
  );
}
