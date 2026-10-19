export const SITE_URL = "https://www.sanukhan.dev";
export const SITE_NAME = "sanukhan.dev";
export const DEFAULT_AUTHOR = "Sanu Khan";
export const DEFAULT_TWITTER_HANDLE = "@sanukhandev";
// Must stay a raster format (JPG/PNG): LinkedIn, X, Facebook, Slack and
// WhatsApp OG scrapers do not decode AVIF/WebP. Regenerate with
// `node scripts/generate-og-image.mjs`.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/sanu-khan-cinematic-og-card.jpg`;

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

  if (typeof keywords !== "string") {
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
    title: "Sanu Khan — Tech Lead, Full-Stack Developer & Solution Architect in Dubai",
    description:
      "Sanu Khan is a Dubai-based Tech Lead and solution architect with 13+ years in full-stack development, system design, API integrations, automation and tech consulting.",
    canonicalPath: "/",
    keywords: [
      "Sanu Khan",
      "Sanu Karimulla Khan",
      "Solution Architect Dubai",
      "Solution Architect UAE",
      "Software Engineer Dubai",
      "Software Engineer UAE",
      "Tech Lead Dubai",
      "Enterprise Integration Architect UAE",
      "Cloud Architect Dubai",
      "SAP ERP Integration UAE",
      "Full Stack Consultant UAE",
      "Node.js Developer UAE",
      "React Developer Dubai",
      "Event-Driven Architecture Kafka Azure",
      "ZaakiyV3RSE",
      "Full-Stack Developer Dubai",
      "System Design Expert UAE",
      "Integration Expert Dubai",
      "Process Automation Expert",
      "Technology Business Consultant UAE",
      "Technical Writer and Content Strategist",
    ],
  },
  blogIndex: {
    title: "Engineering Journal — System Design, Cloud, APIs & Architecture | Sanu Khan",
    description:
      "Technical writeups and architecture field notes by Sanu Khan on distributed systems, event-driven integration, Node.js API design, cloud reliability, and AI engineering.",
    canonicalPath: "/blog",
    keywords: [
      "Sanu Khan Engineering Blog",
      "Software Architecture Notes",
      "Distributed Systems Blog",
      "Event-Driven Architecture Guide",
      "Node.js API Best Practices",
      "Enterprise Integration Patterns",
      "Cloud Engineering UAE",
      "JavaScript Algorithms Guide",
    ],
  },
  toolsIndex: {
    title: "Free Developer Tools — JSON Formatter, API Client & cURL Converter | Sanu Khan",
    description:
      "Fast, browser-based developer tools built by Sanu Khan for API engineering: online JSON formatter & validator, REST API client tester, and cURL to JSON converter.",
    canonicalPath: "/tools",
    keywords: [
      "Developer Tools Online",
      "JSON Formatter Online",
      "JSON Validator Beautifier",
      "Online REST API Client",
      "cURL to JSON Converter",
      "API Debugging Utilities",
      "Sanu Khan Tools",
    ],
  },
  faq: {
    title: "Solution Architecture & Engineering FAQ — Dubai, UAE | Sanu Khan",
    description:
      "Frequently asked questions about enterprise solution architecture, SAP & API integrations, cloud modernization, technical leadership, and consulting with Sanu Khan in Dubai, UAE.",
    canonicalPath: "/faq",
    keywords: [
      "Sanu Khan FAQ",
      "Solution Architect Dubai FAQ",
      "Enterprise Architecture Consulting UAE",
      "System Scalability & Resilience",
      "Contract-First API Design",
      "Cloud Modernization Strategy UAE",
      "Hire Solution Architect Dubai",
    ],
  },
  about: {
    title: "About Sanu Khan — Solution Architect & Platform Engineering Lead in Dubai",
    description:
      "Career progression, architectural principles, and engineering background of Sanu Khan — Solution Architect & Tech Lead in Dubai, UAE with 13+ years building mission-critical systems.",
    canonicalPath: "/about",
    keywords: [
      "About Sanu Khan",
      "Sanu Karimulla Khan",
      "Solution Architect Dubai Profile",
      "Platform Engineering Lead UAE",
      "Enterprise Systems Architect Dubai",
      "TechCarrot Solution Expert",
      "Al-Futtaim Enterprise IT Alumni",
    ],
  },
  projects: {
    title: "Architecture Case Studies & Enterprise Systems Portfolio | Sanu Khan",
    description:
      "In-depth solution architecture case studies by Sanu Khan in Dubai, UAE: enterprise retail SAP/PIM integration, airline NDC aggregation, real estate ERP, automotive omnichannel, healthcare, and ZaakiyV3RSE AI.",
    canonicalPath: "/projects",
    keywords: [
      "Solution Architecture Case Studies",
      "Sanu Khan Portfolio Projects",
      "Enterprise Retail SAP Integration",
      "Airline NDC Retailing Aggregation",
      "Automotive Omnichannel Architecture",
      "Real Estate ERP Architecture UAE",
      "Headless Healthcare Digital Platform",
      "Garage Management Diagnostics System",
      "ZaakiyV3RSE Operational Intelligence AI",
    ],
  },
  contact: {
    title: "Contact Sanu Khan — Solution Architecture & Technical Consulting in Dubai, UAE",
    description:
      "Contact Sanu Khan in Dubai, UAE for enterprise solution architecture consulting, technical leadership, API integration strategy, and cloud platform modernization.",
    canonicalPath: "/contact",
    keywords: [
      "Contact Sanu Khan",
      "Hire Solution Architect Dubai",
      "Technical Strategy Consultant UAE",
      "Enterprise Integration Consulting Dubai",
      "Full Stack & Cloud Advisory UAE",
    ],
  },
} as const;

export const pageSeoAr = {
  home: {
    title: "Sanu Khan | سانو خان — قائد تقني وخبير حلول وتطوير متكامل في دبي",
    description:
      "سانو خان خبير تقني وقائد هندسي في دبي بخبرة تزيد عن 13 عاماً في التطوير المتكامل وتصميم الأنظمة وعمارة الحلول والتكاملات وأتمتة العمليات والاستشارات التقنية.",
    canonicalPath: "/",
    keywords: [
      "سانو خان",
      "Sanu Khan",
      "معماري حلول دبي",
      "مهندس برمجيات دبي",
      "مهندس برمجيات الإمارات",
      "خبير تقني",
      "قائد هندسي",
      "تكامل الأنظمة المؤسسية",
      "منصات التجارة الرقمية",
      "تقنيات السفر",
      "خبير سحابي الإمارات",
      "قائد تقني دبي",
      "تطوير متكامل دبي",
      "تصميم الأنظمة",
      "خبير تكامل الأنظمة",
      "أتمتة العمليات",
      "استشارات تقنية وتجارية",
      "كاتب تقني واستراتيجي محتوى",
    ],
  },
  blogIndex: {
    title: "الملاحظات الهندسية | معمارية البرمجيات، السحابة، وواجهات API — سانو خان",
    description:
      "ملاحظات ومقالات تقنية بقلم سانو خان حول معمارية الأنظمة الموزعة، التكامل المؤسسي، السحابة، هندسة واجهات API، وتسليم البرمجيات للإنتاج.",
    canonicalPath: "/blog",
    keywords: [
      "مدونة سانو خان الهندسية",
      "معمارية البرمجيات",
      "الهندسة السحابية الإمارات",
      "أفضل ممارسات API",
      "الأنظمة الموزعة",
      "تكامل الأنظمة المؤسسية",
    ],
  },
  toolsIndex: {
    title: "أدوات المطورين | منسق JSON، عميل API، محول cURL — سانو خان",
    description:
      "أدوات مجانية وسريعة للمطورين لسير عمل APIs: تنسيق والتحقق من JSON، اختبار واجهات REST API، وتحويل أوامر cURL إلى JSON.",
    canonicalPath: "/tools",
    keywords: [
      "أدوات المطورين",
      "منسق json أونلاين",
      "عميل api",
      "تحويل curl إلى json",
      "سانو خان",
    ],
  },
  faq: {
    title: "الأسئلة الشائعة حول عمارة الحلول والاستشارات التقنية — سانو خان",
    description:
      "أسئلة شائعة وإجابات متعمقة حول عمارة الحلول المؤسسية، استشارات القيادة التقنية، تكامل الأنظمة، والتعاون مع سانو خان في دبي والإمارات.",
    canonicalPath: "/faq",
    keywords: [
      "أسئلة شائعة سانو خان",
      "استشارات معمارية دبي",
      "معماري حلول الإمارات",
      "تكامل واجهات برمجة التطبيقات",
    ],
  },
  about: {
    title: "نبذة عن سانو خان — معماري حلول وقائد هندسة المنصات في دبي",
    description:
      "عن سانو خان: أكثر من 13 عاماً من القيادة الهندسية ومعمارية الحلول السحابية، التكاملات المؤسسية، وأنظمة المنتجات فائقة التوسع في دبي، الإمارات.",
    canonicalPath: "/about",
    keywords: [
      "نبذة عن سانو خان",
      "معماري حلول دبي",
      "قائد هندسة المنصات الإمارات",
      "مهندس أنظمة مؤسسية",
    ],
  },
  projects: {
    title: "المشاريع ودراسات الحالة المعمارية — سانو خان | دبي، الإمارات",
    description:
      "دراسات حالة معمارية مختارة وأنظمة مسلّمة بواسطة سانو خان عبر تجارة التجزئة، الطيران (NDC)، العقارات (ERP)، الرعاية الصحية، والذكاء الاصطناعي (ZaakiyV3RSE).",
    canonicalPath: "/projects",
    keywords: [
      "مشاريع سانو خان",
      "دراسات حالة معمارية",
      "تكامل أنظمة التجزئة SAP",
      "منصة ZaakiyV3RSE",
      "معماري حلول دبي",
    ],
  },
  contact: {
    title: "تواصل مع سانو خان — استشارات عمارة الحلول والقيادة التقنية في دبي",
    description:
      "تواصل مع سانو خان في دبي، الإمارات للاستشارات المعمارية، القيادة التقنية، استراتيجية تكامل APIs، وتحديث المنصات السحابية.",
    canonicalPath: "/contact",
    keywords: [
      "تواصل مع سانو خان",
      "استشارات تقنية دبي",
      "معماري حلول الإمارات",
    ],
  },
} as const;

export function getLocalizedPageSeo(
  key: keyof typeof pageSeo,
  locale: "en" | "ar" = "en",
) {
  return locale === "ar" ? pageSeoAr[key] : pageSeo[key];
}
