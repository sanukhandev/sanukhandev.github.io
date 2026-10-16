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
    item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
  })),
});

export const buildHomepageSchemas = (): JsonLdNode[] => [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: "Sanu Khan — Solution Architect, Tech Lead & Software Engineer in Dubai, UAE",
    inLanguage: ["en", "ar"],
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sanu Khan Engineering",
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sanu Khan",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Sanu Khan — Solution Architecture & Platform Engineering",
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    email: "hello@sanukhan.dev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Qatar" },
    ],
    provider: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sanu Khan",
    },
    serviceType: [
      "Solution Architecture Consulting",
      "Enterprise System & SAP ERP Integration",
      "Event-Driven & Cloud Platform Engineering",
      "Full-Stack Technical Leadership",
      "Operational Intelligence & Agentic AI Systems",
    ],
  },
];

export const buildProfilePageSchema = (input: {
  name: string;
  description: string;
  path: string;
}): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: input.name,
  description: input.description,
  url: `${SITE_URL}${input.path}`,
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Sanu Khan",
    alternateName: ["Sanu Karimulla Khan", "sanukhandev", "سانو خان"],
    jobTitle: "Solution Architect, Tech Lead & Software Engineer",
    url: SITE_URL,
  },
});

export const buildProjectsCollectionSchema = (
  items: Array<{ title: string; summary: string; slug: string }>,
): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Selected Solution Architecture Case Studies — Sanu Khan",
  url: `${SITE_URL}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.summary,
      url: `${SITE_URL}/projects/${item.slug}`,
    })),
  },
});

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
  datePublished: input.publishedTime || "2026-01-15",
  dateModified: input.modifiedTime || input.publishedTime || "2026-10-16",
  mainEntityOfPage: `${SITE_URL}${input.path}`,
  url: `${SITE_URL}${input.path}`,
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Sanu Khan",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
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
    "@id": `${SITE_URL}/#person`,
    name: "Sanu Khan",
    url: SITE_URL,
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
  image: DEFAULT_OG_IMAGE,
  datePublished: input.publishedTime || "2026-01-15",
  dateModified: input.modifiedTime || input.publishedTime || "2026-10-16",
  url: `${SITE_URL}${input.path}`,
  author: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Sanu Khan",
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sanu Khan Engineering",
    url: SITE_URL,
  },
  inLanguage: "en",
});

export const buildContactPageSchema = (): JsonLdNode => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sanu Khan — Solution Architect in Dubai, UAE",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Sanu Khan",
    email: "hello@sanukhan.dev",
    url: SITE_URL,
  },
  inLanguage: "en",
});
