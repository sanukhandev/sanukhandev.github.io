import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://sanukhan.dev";
const LASTMOD = new Date().toISOString().slice(0, 10);

const routes = [
  "/",
  "/faq",
  "/tools",
  "/tools/json-formatter-online",
  "/tools/api-client-tool",
  "/tools/curl-to-json-converter",
  "/blog",
  "/blog/javascript-algorithms",
  "/blog/nodejs-api-best-practices",
  "/nodejs-developer-uae",
  "/react-developer-dubai",
  "/api-integration-services",
  "/full-stack-consultant-uae",
  "/services/nodejs-backend-engineer",
  "/services/react-developer-dubai",
  "/services/azure-cloud-architect",
  "/services/full-stack-developer-uae",
];

const priorityFor = (route) => {
  if (route === "/") return "1.0";
  if (route.startsWith("/tools")) return "0.9";
  if (route.startsWith("/blog")) return "0.85";
  return "0.88";
};

const changefreqFor = (route) => {
  if (route === "/") return "weekly";
  if (route.startsWith("/blog")) return "weekly";
  if (route.startsWith("/tools")) return "monthly";
  return "monthly";
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map(
    (route) => `  <url>\n    <loc>${SITE}${route}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${changefreqFor(route)}</changefreq>\n    <priority>${priorityFor(route)}</priority>\n  </url>`,
  )
  .join("\n")}\n</urlset>\n`;

writeFileSync(resolve(process.cwd(), "public", "sitemap.xml"), xml, "utf8");
