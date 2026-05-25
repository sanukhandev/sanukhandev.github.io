import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";
import { pageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/schema";

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
  return (
    <>
      <SeoMeta
        title={pageSeo.toolsIndex.title}
        description={pageSeo.toolsIndex.description}
        canonicalPath={pageSeo.toolsIndex.canonicalPath}
        keywords={pageSeo.toolsIndex.keywords}
        schema={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">Developer Tools Platform</h1>
          <p className="mt-4 max-w-3xl text-[15px] text-secondary">
            Practical tools for API engineering, integration debugging, and request transformation.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.href} className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-primary">{tool.title}</h2>
                <p className="mt-2 text-[14px] text-secondary">{tool.description}</p>
                <Link className="mt-3 inline-flex text-[14px] font-semibold text-accent hover:underline" to={tool.href}>
                  Open {tool.title}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/blog">
              Explore Blog Articles
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/api-integration-services">
              API Integration Services
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/">
              Portfolio Homepage
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
