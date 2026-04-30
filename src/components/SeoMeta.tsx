import { useEffect } from "react";

type SeoMetaProps = {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
};

const SITE_URL = "https://www.sanukhan.dev";

const upsertMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
  let node = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, name);
    document.head.appendChild(node);
  }
  node.content = content;
};

const upsertLink = (rel: string, href: string) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!node) {
    node = document.createElement("link");
    node.rel = rel;
    document.head.appendChild(node);
  }
  node.href = href;
};

const upsertSchema = (schema: Record<string, unknown> | Array<Record<string, unknown>>) => {
  let node = document.head.querySelector("script[data-seo-schema='true']") as HTMLScriptElement | null;
  if (!node) {
    node = document.createElement("script");
    node.type = "application/ld+json";
    node.setAttribute("data-seo-schema", "true");
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(schema);
};

export default function SeoMeta({ title, description, canonicalPath, schema, noindex = false }: SeoMetaProps) {
  useEffect(() => {
    document.title = title;

    const canonical = `${SITE_URL}${canonicalPath}`;

    upsertMeta("description", description);
    upsertMeta(
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:type", "website", "property");

    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);

    upsertLink("canonical", canonical);

    if (schema) {
      upsertSchema(schema);
    }
  }, [title, description, canonicalPath, schema, noindex]);

  return null;
}
