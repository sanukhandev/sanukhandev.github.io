import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type SeoMetaProps = {
  title: string;
  description: string;
  canonicalPath: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noindex?: boolean;
  ogImage?: string;
  keywords?: string;
};

const SITE_URL = "https://sanukhan.dev";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/sanu.avif`;
const DEFAULT_DESCRIPTION =
  "Sanu Khan is a Tech Lead and Full Stack Engineer building scalable cloud-native platforms, enterprise integrations, and resilient product systems.";

const normalizePath = (path: string) => {
  if (!path) {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash === "/") {
    return withLeadingSlash;
  }

  return withLeadingSlash.replace(/\/+$/, "");
};

const normalizeUrl = (rawUrl: string) => {
  const url = new URL(rawUrl, SITE_URL);
  url.pathname = normalizePath(url.pathname);
  return url.toString();
};

const withBrandTitle = (title: string) => {
  const trimmed = title.trim();
  if (!trimmed) {
    return "Sanu Khan";
  }

  return /sanu khan/i.test(trimmed) ? trimmed : `${trimmed} | Sanu Khan`;
};

export default function SeoMeta({
  title,
  description,
  canonicalPath,
  schema,
  noindex = false,
  ogImage,
  keywords,
}: SeoMetaProps) {
  const location = useLocation();
  const safeDescription = description.trim() || DEFAULT_DESCRIPTION;
  const safeTitle = withBrandTitle(title);

  const canonicalUrl =
    typeof window !== "undefined"
      ? normalizeUrl(window.location.href)
      : normalizeUrl(
          `${SITE_URL}${normalizePath(canonicalPath || location.pathname)}`,
        );
  const socialImage = ogImage ?? DEFAULT_OG_IMAGE;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const schemaPayload = schema ? JSON.stringify(schema) : "";

  return (
    <Helmet prioritizeSeoTags>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robotsContent} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={socialImage} />
      <meta property="og:site_name" content="sanukhan.dev" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:creator" content="@sanukhandev" />
      <link rel="canonical" href={canonicalUrl} />
      {schemaPayload ? (
        <script type="application/ld+json">{schemaPayload}</script>
      ) : null}
    </Helmet>
  );
}
