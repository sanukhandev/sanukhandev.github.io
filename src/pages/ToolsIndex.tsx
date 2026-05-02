import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";

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
        title="Developer Tools Platform | Sanu Khan"
        description="Developer tools platform with JSON formatter online, API client tool, and curl to JSON converter for faster backend and integration workflows."
        canonicalPath="/tools"
        keywords="developer tools, json formatter online, api client tool, curl to json converter"
      />
      <main className="min-h-screen bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-[#f0f1f4]">Developer Tools Platform</h1>
          <p className="mt-4 max-w-3xl text-[15px] text-[#8a90a8]">
            Practical tools for API engineering, integration debugging, and request transformation.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.href} className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-[#f0f1f4]">{tool.title}</h2>
                <p className="mt-2 text-[14px] text-[#8a90a8]">{tool.description}</p>
                <Link className="mt-3 inline-flex text-[14px] font-semibold text-[#38c755] hover:underline" to={tool.href}>
                  Open {tool.title}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/blog">
              Explore Blog Articles
            </Link>
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/api-integration-services">
              API Integration Services
            </Link>
            <Link className="text-[14px] font-semibold text-[#38c755] hover:underline" to="/">
              Portfolio Homepage
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
