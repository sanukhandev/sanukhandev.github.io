import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://www.sanukhan.dev";
const DEVTO_USERNAME = "sanukhandev";
const LASTMOD = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  "/",
  "/faq",
  "/tools",
  "/tools/json-formatter-online",
  "/tools/api-client-tool",
  "/tools/curl-to-json-converter",
  "/blog",
  "/nodejs-developer-uae",
  "/react-developer-dubai",
  "/api-integration-services",
  "/full-stack-consultant-uae",
  "/services/nodejs-backend-engineer",
  "/services/react-developer-dubai",
  "/services/azure-cloud-architect",
  "/services/full-stack-developer-uae",
];

const fetchDevToBlogRoutes = async () => {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=100`,
    );

    if (!response.ok) {
      return [];
    }

    const posts = await response.json();
    if (!Array.isArray(posts)) {
      return [];
    }

    return posts
      .map((post) => (typeof post?.slug === "string" ? post.slug.trim() : ""))
      .filter(Boolean)
      .map((slug) => `/blog/${slug}`);
  } catch {
    return [];
  }
};

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

const main = async () => {
  const devtoBlogRoutes = await fetchDevToBlogRoutes();
  const routes = Array.from(new Set([...staticRoutes, ...devtoBlogRoutes]));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(
      (route) => `  <url>\n    <loc>${SITE}${route}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${changefreqFor(route)}</changefreq>\n    <priority>${priorityFor(route)}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>\n`;

  writeFileSync(resolve(process.cwd(), "public", "sitemap.xml"), xml, "utf8");
};

await main();
