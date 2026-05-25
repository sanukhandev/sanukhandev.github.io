import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

type JsonLdNode = Record<string, unknown>;

export const safeJsonLdStringify = (schema: JsonLdNode | JsonLdNode[]) =>
  JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export const buildBreadcrumbListSchema = (
  items: Array<{ name: string; path: string }>,
): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const buildHomepageSchemas = (): JsonLdNode[] => [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sanu Khan",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    jobTitle: "CTO / Solutions Architect",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://github.com/sanukhandev",
      "https://linkedin.com/in/sanukhandev",
      "https://dev.to/sanukhandev",
      "https://x.com/sanukhandev",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "sanukhan.dev",
    url: SITE_URL,
    inLanguage: ["en", "ar"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sanu Khan Engineering",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    founder: {
      "@type": "Person",
      name: "Sanu Khan",
    },
  },
];

export const buildBlogPostingSchema = (input: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  tags?: string[];
}): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: input.title,
  description: input.description,
  image: input.image || DEFAULT_OG_IMAGE,
  datePublished: input.publishedTime,
  dateModified: input.modifiedTime || input.publishedTime,
  mainEntityOfPage: `${SITE_URL}${input.path}`,
  url: `${SITE_URL}${input.path}`,
  author: {
    "@type": "Person",
    name: "Sanu Khan",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: "Sanu Khan Engineering",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: DEFAULT_OG_IMAGE,
    },
  },
  keywords: input.tags,
  inLanguage: "en",
});

export const buildFaqSchema = (
  faq: Array<{ q: string; a: string }>,
): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
});

export const buildCreativeWorkSchema = (input: {
  title: string;
  description: string;
  path: string;
  created?: string;
  updated?: string;
  technologies?: string[];
}): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: input.title,
  description: input.description,
  url: `${SITE_URL}${input.path}`,
  dateCreated: input.created,
  dateModified: input.updated,
  creator: {
    "@type": "Person",
    name: "Sanu Khan",
  },
  about: input.technologies,
  inLanguage: "en",
});

export const buildTechArticleSchema = (input: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
}): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: input.title,
  description: input.description,
  datePublished: input.publishedTime,
  dateModified: input.modifiedTime || input.publishedTime,
  url: `${SITE_URL}${input.path}`,
  author: {
    "@type": "Person",
    name: "Sanu Khan",
  },
  publisher: {
    "@type": "Organization",
    name: "Sanu Khan Engineering",
  },
  inLanguage: "en",
});

export const buildContactPageSchema = (): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sanu Khan",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Person",
    name: "Sanu Khan",
    email: "hello@sanukhan.dev",
    url: SITE_URL,
  },
  inLanguage: "en",
});
