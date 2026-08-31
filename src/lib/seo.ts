export const SITE_URL = "https://www.sanukhan.dev";
export const SITE_NAME = "sanukhan.dev";
export const DEFAULT_AUTHOR = "Sanu Khan";
export const DEFAULT_TWITTER_HANDLE = "@sanukhandev";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/sanu.avif`;

export type SeoKind = "website" | "article" | "profile";

export type BuildSeoInput = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string | string[] | readonly string[];
  noindex?: boolean;
  ogImage?: string;
  kind?: SeoKind;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export type SeoMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  robots: string;
  keywords?: string;
  author: string;
  type: SeoKind;
  publishedTime?: string;
  modifiedTime?: string;
  twitterCard: "summary_large_image";
  twitterCreator: string;
  siteName: string;
};

export const normalizePath = (path: string) => {
  if (!path) {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash === "/") {
    return withLeadingSlash;
  }

  return withLeadingSlash.replace(/\/+$/, "");
};

export const normalizeUrl = (rawUrl: string) => {
  const url = new URL(rawUrl, SITE_URL);
  url.pathname = normalizePath(url.pathname);
  url.search = "";
  url.hash = "";
  return url.toString();
};

export const canonicalFromPath = (canonicalPath: string) =>
  normalizeUrl(`${SITE_URL}${normalizePath(canonicalPath)}`);

export const withBrandTitle = (title: string) => {
  const trimmed = title.trim();
  if (!trimmed) {
    return "Sanu Khan";
  }

  return /sanu khan/i.test(trimmed) ? trimmed : `${trimmed} | Sanu Khan`;
};

const normalizeKeywords = (
  keywords?: string | string[] | readonly string[],
) => {
  if (!keywords) {
    return undefined;
  }

  if (Array.isArray(keywords)) {
    const unique = Array.from(
      new Set(keywords.map((item) => item.trim()).filter(Boolean)),
    );
    return unique.length ? unique.join(", ") : undefined;
  }

  return keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((value, index, source) => source.indexOf(value) === index)
    .join(", ");
};

export const buildSeoMetadata = (input: BuildSeoInput): SeoMetadata => {
  const canonicalUrl = canonicalFromPath(input.canonicalPath);

  return {
    title: withBrandTitle(input.title),
    description: input.description.trim(),
    canonicalUrl,
    ogImage: input.ogImage || DEFAULT_OG_IMAGE,
    robots: input.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    keywords: normalizeKeywords(input.keywords),
    author: input.author || DEFAULT_AUTHOR,
    type: input.kind || "website",
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
    twitterCard: "summary_large_image",
    twitterCreator: DEFAULT_TWITTER_HANDLE,
    siteName: SITE_NAME,
  };
};

export const pageSeo = {
  home: {
    title: "Sanu Khan — Technical Architect & Engineering Lead",
    description:
      "Technical Architect and Engineering Lead designing production platforms across commerce, travel technology, enterprise systems and AI-enabled engineering.",
    canonicalPath: "/",
    keywords: [
      "Sanu Khan",
      "Technical Architect",
      "Engineering Lead",
      "Commerce Platforms",
      "Travel Technology",
      "Enterprise Systems",
      "Cloud Architect UAE",
      "Tech Lead Dubai",
    ],
  },
  blogIndex: {
    title: "WriteUps | Architecture, Cloud, APIs, and Engineering Systems",
    description:
      "Technical writeups by Sanu Khan on backend architecture, cloud systems, API engineering, and production-grade software delivery.",
    canonicalPath: "/blog",
    keywords: [
      "engineering blog",
      "software architecture",
      "cloud engineering",
      "api best practices",
      "distributed systems",
    ],
  },
  toolsIndex: {
    title: "Developer Tools | JSON Formatter, API Client, cURL Converter",
    description:
      "Developer utilities for API workflows: JSON formatter online, API client testing, and cURL to JSON conversion.",
    canonicalPath: "/tools",
    keywords: [
      "developer tools",
      "json formatter",
      "api client",
      "curl to json",
    ],
  },
  faq: {
    title: "FAQ | Sanu Khan",
    description:
      "Frequently asked questions about services, architecture consulting, delivery model, and collaboration with Sanu Khan.",
    canonicalPath: "/faq",
  },
  about: {
    title: "About | Sanu Khan",
    description:
      "About Sanu Khan: CTO-level engineering leadership in cloud architecture, enterprise integrations, and high-scale product systems.",
    canonicalPath: "/about",
  },
  projects: {
    title: "Projects & Case Studies | Sanu Khan",
    description:
      "Selected architecture case studies and delivered systems across commerce, integration, AI workflows, and platform modernization.",
    canonicalPath: "/projects",
  },
  contact: {
    title: "Contact | Sanu Khan",
    description:
      "Contact Sanu Khan for architecture consulting, technical leadership, API integration strategy, and platform modernization engagements.",
    canonicalPath: "/contact",
  },
} as const;
