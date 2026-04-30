import ToolSeoPage from "@/components/ToolSeoPage";

export default function CurlToJsonToolPage() {
  return (
    <ToolSeoPage
      title="Curl to JSON Converter | Sanu Khan"
      description="Curl to JSON converter for transforming command-line requests into structured JSON configs useful for API docs, testing, and client generation workflows."
      canonicalPath="/tools/curl-to-json-converter"
      h1="Curl to JSON Converter for Integration Workflows"
      schemaName="Curl to JSON Converter"
      intro={[
        "The curl to json converter helps engineers translate command-line API snippets into reusable JSON structures that can be shared in documentation, tool configs, and test suites. This eliminates repetitive manual parsing and reduces mistakes in complex headers and body payload extraction.",
        "Teams that manage multiple integrations can standardize request definitions faster when cURL commands are transformed into clear machine-readable objects.",
      ]}
      howTo={[
        "Paste your full cURL command into the input area.",
        "Run convert to parse method, URL, headers, and body.",
        "Review generated JSON object and validate key fields.",
        "Reuse output in API clients, docs, or test scripts.",
      ]}
      exampleInput={`curl -X POST https://api.example.com/v1/items -H "Authorization: Bearer token" -H "Content-Type: application/json" -d '{"name":"Widget","price":99}'`}
      exampleOutput={`{
  "method": "POST",
  "url": "https://api.example.com/v1/items",
  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },
  "body": {
    "name": "Widget",
    "price": 99
  }
}`}
      links={[
        { label: "API Client Tool", href: "/tools/api-client-tool" },
        { label: "JavaScript Algorithms Blog", href: "/blog/javascript-algorithms" },
        { label: "Tech Lead Portfolio", href: "/" },
      ]}
    />
  );
}
