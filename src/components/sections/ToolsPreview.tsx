import { Link } from "react-router-dom";

const tools = [
  {
    title: "JSON Formatter Online",
    description:
      "Format, validate, and minify JSON instantly for API debugging and payload cleanup.",
    href: "/tools/json-formatter-online",
  },
  {
    title: "API Client Tool",
    description:
      "Test REST endpoints with method, headers, and body controls designed for fast backend workflows.",
    href: "/tools/api-client-tool",
  },
  {
    title: "Curl to JSON Converter",
    description:
      "Convert cURL commands into structured JSON configs for reproducible API requests and docs.",
    href: "/tools/curl-to-json-converter",
  },
];

export default function ToolsPreview() {
  return (
    <section className="section-pad" id="tools">
      <div className="container-narrow">
        <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[#f0f1f4]">Tools</h2>
        <p className="mt-3 max-w-3xl text-[15px] text-[#8a90a8]">
          Developer tools built for real API and integration workflows. Each tool page includes examples, usage steps,
          and related implementation notes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.href} className="premium-card p-5">
              <h3 className="text-[18px] font-semibold text-[#f0f1f4]">{tool.title}</h3>
              <p className="mt-2 text-[14px] text-[#8a90a8]">{tool.description}</p>
              <Link className="mt-4 inline-flex text-[14px] font-semibold text-[#38c755] hover:underline" to={tool.href}>
                Open {tool.title}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
