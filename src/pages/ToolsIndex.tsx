import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedPageSeo, SITE_URL } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

const tools = [
  {
    href: "/tools/json-formatter-online",
    title: "JSON Formatter Online",
    description: "Format and validate JSON payloads for APIs and integration debugging.",
  },
  {
    href: "/tools/api-client-tool",
    title: "API Client Tool",
    description: "Run REST calls with headers/body and inspect response details quickly.",
  },
  {
    href: "/tools/curl-to-json-converter",
    title: "Curl to JSON Converter",
    description: "Convert cURL commands to reusable JSON request config structures.",
  },
];

export default function ToolsIndex() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const seo = getLocalizedPageSeo("toolsIndex", locale);

  const toolsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Developer Tools by Sanu Khan",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      description: tool.description,
      url: `${SITE_URL}${tool.href}`,
    })),
  };

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={[
          toolsItemListSchema,
          buildBreadcrumbListSchema([
            { name: isAr ? "الرئيسية" : "Home", path: "/" },
            { name: isAr ? "أدوات المطورين" : "Tools", path: "/tools" },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-28 pb-20 text-foreground">
        <section className="container mx-auto max-w-5xl px-4 sm:px-6">
          <div className="border-b border-foreground/10 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">01 / Utilities</span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Developer Tools
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Practical utilities for API engineering, integration debugging, and payload transformation.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, idx) => (
              <article
                key={tool.href}
                className="group relative flex flex-col justify-between border border-foreground/15 bg-background p-6 transition-all duration-200 hover:border-accent"
              >
                <div>
                  <span className="font-mono text-xs text-foreground/40">0{idx + 1}</span>
                  <h2 className="mt-2 text-xl font-bold text-foreground group-hover:text-accent">
                    {tool.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    {tool.description}
                  </p>
                </div>
                <Link
                  className="mt-6 inline-flex items-center text-sm font-semibold text-accent hover:underline"
                  to={tool.href}
                >
                  Launch tool &rarr;
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4 border-t border-foreground/10 pt-8 text-sm">
            <Link className="font-medium text-accent hover:underline" to="/blog">
              &larr; Explore Engineering Articles
            </Link>
            <span className="text-foreground/30">•</span>
            <Link className="font-medium text-foreground/70 hover:text-foreground hover:underline" to="/api-integration-services">
              API Integration Services
            </Link>
            <span className="text-foreground/30">•</span>
            <Link className="font-medium text-foreground/70 hover:text-foreground hover:underline" to="/">
              Portfolio Overview
            </Link>
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
