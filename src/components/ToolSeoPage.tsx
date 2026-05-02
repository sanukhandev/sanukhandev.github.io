import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

type ToolSeoPageProps = {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  intro: string[];
  howTo: string[];
  exampleInput: string;
  exampleOutput: string;
  links: Array<{ label: string; href: string }>;
  schemaName: string;
};

export default function ToolSeoPage(props: ToolSeoPageProps) {
  const {
    title,
    description,
    canonicalPath,
    h1,
    intro,
    howTo,
    exampleInput,
    exampleOutput,
    links,
    schemaName,
  } = props;

  return (
    <>
      <SeoMeta
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: schemaName,
          applicationCategory: "DeveloperTool",
          operatingSystem: "Web",
          inLanguage: "en",
          url: `https://sanukhan.dev${canonicalPath}`,
        }}
      />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <article className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold leading-[1.1] text-[#f0f1f4]">{h1}</h1>
          <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#8a90a8]">
            {intro.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <section className="mt-8">
            <h2 className="text-[26px] font-bold text-[#f0f1f4]">How to Use</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-[#8a90a8]">
              {howTo.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-[#2b2f3b] bg-[#16171d] p-4">
              <h2 className="text-[18px] font-semibold text-[#f0f1f4]">Example Input</h2>
              <pre className="mt-3 overflow-x-auto text-[13px] text-[#8a90a8]">{exampleInput}</pre>
            </div>
            <div className="rounded-xl border border-[#2b2f3b] bg-[#16171d] p-4">
              <h2 className="text-[18px] font-semibold text-[#f0f1f4]">Example Output</h2>
              <pre className="mt-3 overflow-x-auto text-[13px] text-[#8a90a8]">{exampleOutput}</pre>
            </div>
          </section>

          <nav className="mt-10" aria-label="Internal links">
            <h2 className="text-[22px] font-bold text-[#f0f1f4]">Internal Links</h2>
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
