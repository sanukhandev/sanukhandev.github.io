import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

type LinkItem = { label: string; href: string };

type SeoPageLayoutProps = {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  intro: string;
  sections: Array<{ id: string; title: string; content: string[] }>;
  cta: { text: string; action: string; href: string };
  links: LinkItem[];
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function SeoPageLayout(props: SeoPageLayoutProps) {
  const {
    title,
    description,
    canonicalPath,
    h1,
    intro,
    sections,
    cta,
    links,
    schema,
  } = props;

  const serviceSchema = schema ?? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    description,
    inLanguage: "en",
    url: `https://www.sanukhan.dev${canonicalPath}`,
    provider: {
      "@type": "Person",
      name: "Sanu Khan",
      url: "https://www.sanukhan.dev",
    },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
  };

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        schema={serviceSchema}
      />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <article className="container-narrow section-pad">
          <header>
            <h1 className="text-[40px] font-extrabold leading-[1.1] text-primary">
              {h1}
            </h1>
            <p className="mt-4 max-w-4xl text-[16px] text-secondary">{intro}</p>
          </header>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="text-[28px] font-bold text-primary">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-4 text-[15px] leading-7 text-secondary">
                  {section.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-default bg-secondary p-6">
            <h2 className="text-[24px] font-bold text-primary">{cta.text}</h2>
            <a
              className="mt-3 inline-flex rounded-lg bg-accent px-4 py-2 text-[14px] font-semibold text-on-accent"
              href={cta.href}
            >
              {cta.action}
            </a>
          </section>

          <nav className="mt-10" aria-label="Internal links">
            <h2 className="text-[22px] font-bold text-primary">
              Related Resources
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-[14px] font-semibold text-accent hover:underline"
                    to={item.href}
                  >
                    {item.label}
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
