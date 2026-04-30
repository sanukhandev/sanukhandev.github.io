import ToolSeoPage from "@/components/ToolSeoPage";

export default function JsonFormatterToolPage() {
  return (
    <ToolSeoPage
      title="JSON Formatter Online | Sanu Khan"
      description="JSON formatter online to validate, beautify, and minify payloads for API development, integration debugging, and technical documentation workflows."
      canonicalPath="/tools/json-formatter-online"
      h1="JSON Formatter Online for API Development"
      schemaName="JSON Formatter Online"
      intro={[
        "This json formatter online tool is designed for backend engineers, frontend developers, and integration teams who need fast and reliable JSON cleanup before testing or documenting APIs. It helps you format dense payloads into readable structures, detect syntax issues quickly, and switch between minified and beautified views with predictable output.",
        "When teams collaborate across services, readable JSON is not a convenience, it is operational clarity. Debugging logs, message contracts, and sample payloads become easier to review, share, and validate when formatting is consistent.",
      ]}
      howTo={[
        "Paste raw JSON into the input area.",
        "Run format to beautify structure and indentation.",
        "Use validate to catch syntax and structure issues.",
        "Use minify when preparing compact payloads for transport.",
      ]}
      exampleInput={`{"user":{"id":42,"name":"Sanu"},"roles":["admin","editor"],"active":true}`}
      exampleOutput={`{
  "user": {
    "id": 42,
    "name": "Sanu"
  },
  "roles": [
    "admin",
    "editor"
  ],
  "active": true
}`}
      links={[
        { label: "API Client Tool", href: "/tools/api-client-tool" },
        { label: "Curl to JSON Converter", href: "/tools/curl-to-json-converter" },
        { label: "Portfolio Projects", href: "/" },
      ]}
    />
  );
}
