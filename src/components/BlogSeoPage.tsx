import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

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

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: h1,
          inLanguage: "en",
          author: { "@type": "Person", name: "Sanu Khan", url: "https://sanukhan.dev" },
          url: `https://sanukhan.dev${canonicalPath}`,
          description,
        }}
      />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <article className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold leading-[1.1] text-[#f0f1f4]">{h1}</h1>
          <p className="mt-4 text-[16px] leading-7 text-[#8a90a8]">{keywordLead}</p>

          <section className="mt-8 rounded-xl border border-[#2b2f3b] bg-[#16171d] p-5">
            <h2 className="text-[24px] font-bold text-[#f0f1f4]">Table of Contents</h2>
            <ul className="mt-3 space-y-2 text-[15px] text-[#8a90a8]">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-[#f0f1f4] hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-[28px] font-bold text-[#f0f1f4]">{section.title}</h2>
                <div className="mt-3 space-y-4 text-[15px] leading-7 text-[#8a90a8]">
                  {section.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>
                {section.code ? (
                  <pre className="mt-4 overflow-x-auto rounded-xl border border-[#2b2f3b] bg-[#16171d] p-4 text-[13px] text-[#8a90a8]">
                    {section.code}
                  </pre>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-10">
            <h2 className="text-[26px] font-bold text-[#f0f1f4]">FAQ</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <article key={item.q} className="rounded-xl border border-[#2b2f3b] bg-[#16171d] p-4">
                  <h3 className="text-[18px] font-semibold text-[#f0f1f4]">{item.q}</h3>
                  <p className="mt-2 text-[15px] text-[#8a90a8]">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <nav className="mt-10" aria-label="Internal links">
            <h2 className="text-[22px] font-bold text-[#f0f1f4]">Related Internal Links</h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to={link.href}>
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
