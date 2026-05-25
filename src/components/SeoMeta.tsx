import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { buildSeoMetadata } from "@/lib/seo";
import { safeJsonLdStringify } from "@/lib/schema";

type SeoMetaProps = {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
  ogImage?: string;
  keywords?: string | string[];
  kind?: "website" | "article" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export default function SeoMeta({
  title,
  description,
  canonicalPath,
  schema,
  noindex = false,
  ogImage,
  keywords,
  kind = "website",
  author,
  publishedTime,
  modifiedTime,
}: SeoMetaProps) {
  const location = useLocation();
  const resolvedCanonicalPath = canonicalPath || location.pathname;
  const metadata = buildSeoMetadata({
    title,
    description,
    canonicalPath: resolvedCanonicalPath,
    noindex,
    ogImage,
    keywords,
    kind,
    author,
    publishedTime,
    modifiedTime,
  });
  const schemaPayload = schema ? safeJsonLdStringify(schema) : "";

  return (
    <Helmet prioritizeSeoTags>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {metadata.keywords ? (
        <meta name="keywords" content={metadata.keywords} />
      ) : null}
      <meta name="robots" content={metadata.robots} />
      <meta name="author" content={metadata.author} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.canonicalUrl} />
      <meta property="og:type" content={metadata.type} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:site_name" content={metadata.siteName} />
      {metadata.publishedTime ? (
        <meta
          property="article:published_time"
          content={metadata.publishedTime}
        />
      ) : null}
      {metadata.modifiedTime ? (
        <meta
          property="article:modified_time"
          content={metadata.modifiedTime}
        />
      ) : null}
      <meta name="twitter:card" content={metadata.twitterCard} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />
      <meta name="twitter:creator" content={metadata.twitterCreator} />
      <link rel="canonical" href={metadata.canonicalUrl} />
      {schemaPayload ? (
        <script type="application/ld+json">{schemaPayload}</script>
      ) : null}
    </Helmet>
  );
}
