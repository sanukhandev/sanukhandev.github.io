// =============================================================
// Sanu Khan — Portfolio Source Data
// Edit any value below to update the site. This is the single
// source of truth for all visible content.
// =============================================================

export const nav = {
  brand: "SanuKhan.dev",
  links: [
    { label: "Work", href: "#works" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Connect", href: "#contact" },
};

export const profile = {
  name: "Sanu Khan",
  role: "Tech Lead • Cloud & Microservices Architect",
  subtitle:
    "Designing scalable distributed systems, enterprise integrations, and high-performance platforms across global markets.",
  statement:
    "Leading architecture and platform engineering for event-driven commerce, enterprise integration, and multi-region cloud delivery.",
  meta: [
    "13+ years building distributed systems",
    "Event-driven architecture specialist",
    "Azure • AWS • Kubernetes delivery",
  ],
  impactMetrics: [
    { value: "13+", label: "Years Experience" },
    { value: "100+", label: "Systems Delivered" },
    { value: "9", label: "Markets Served" },
    { value: "800K+", label: "Product Scale Systems" },
  ],
  ctas: [
    { label: "View Work", href: "#works", variant: "primary" as const },
    {
      label: "Architecture Highlights",
      href: "#experience",
      variant: "outline" as const,
    },
  ],
  avatarUrl: "/assets/images/sanu.png",
};

export const skills = {
  eyebrow: "Stack",
  title: "Engineering Expertise Clusters",
  intro:
    "Architecture-first execution across cloud, integrations, and platform engineering with production-grade delivery discipline.",
  clusters: [
    {
      title: "Cloud & Architecture",
      tags: [
        "Azure",
        "AWS",
        "GCP",
        "Serverless",
        "Event-driven",
        "Microservices",
      ],
    },
    {
      title: "Backend Systems",
      tags: [
        "Java",
        "Spring Boot",
        "Node.js",
        "NestJS",
        "GraphQL",
        "PostgreSQL",
      ],
    },
    {
      title: "Frontend Systems",
      tags: ["React", "Next.js", "TypeScript", "Design Systems", "Performance"],
    },
    {
      title: "DevOps & Infra",
      tags: ["Kubernetes", "Docker", "CI/CD", "Terraform", "Observability"],
    },
    {
      title: "Enterprise Integrations",
      tags: ["SAP", "Shopify", "Kibo", "REST", "Kafka", "Azure Event Hubs"],
    },
  ],
};

export const techStack = [
  { name: "React", icon: "Atom" },
  { name: "TypeScript", icon: "FileCode2" },
  { name: "Node.js", icon: "Server" },
  { name: "Tailwind", icon: "Wind" },
  { name: "Postgres", icon: "Database" },
  { name: "AWS", icon: "Cloud" },
  { name: "Docker", icon: "Container" },
  { name: "Git", icon: "GitBranch" },
  { name: "Figma", icon: "Figma" },
  { name: "Vite", icon: "Zap" },
];

export const services = [
  {
    company: "TechCarrot (Current)",
    role: "Tech Lead • Cloud & Integration Architecture",
    impact: [
      "Built Azure Functions-based PIM integrations for high-throughput catalog and pricing workflows",
      "Engineered event-driven retail platforms using Kafka and Event Hubs for real-time sync",
      "Delivered SAP, Shopify, and Kibo integrations across distributed commerce estates",
      "Led architecture for multi-tenant SaaS systems with secure tenant isolation",
    ],
    stack: ["Azure Functions", "Kafka", "Event Hubs", "SAP", "Shopify", "Kibo"],
  },
  {
    company: "Previous Roles",
    role: "Senior Engineer • Platform Systems",
    impact: [
      "Architected airline marketplace workflows with resilient booking and settlement boundaries",
      "Delivered enterprise ERP platforms integrating finance, operations, and supply chain modules",
      "Built real-time video conferencing systems with scalable media signaling services",
      "Shipped 100+ client systems across web, backend, and integration-heavy domains",
    ],
    stack: [
      "Distributed Systems",
      "Enterprise APIs",
      "Realtime",
      "ERP",
      "Commerce",
    ],
  },
];

export const workCategories = [
  "All",
  "Commerce",
  "Integration",
  "Platform",
] as const;
export type WorkCategory = (typeof workCategories)[number];

export const works: Array<{
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  tags: string[];
  scope: string;
  category: Exclude<WorkCategory, "All">;
}> = [
  {
    title: "Retail Event-Driven Platform",
    problem:
      "Pricing, inventory, and catalog updates were fragmented across regions, creating latency and inconsistent product states.",
    solution:
      "Designed event-driven pipelines with Kafka/Event Hubs and integration services to synchronize product and pricing signals.",
    outcome:
      "Enabled near real-time multi-market consistency across systems supporting 800K+ catalog scale.",
    tags: ["Kafka", "Event Hubs", "Azure", "Microservices"],
    scope: "Multi-region commerce",
    category: "Commerce",
  },
  {
    title: "Enterprise PIM Integration Suite",
    problem:
      "Product information flows between PIM and downstream commerce systems were brittle and difficult to audit.",
    solution:
      "Built serverless integration orchestrations using Azure Functions with contract-driven payload validation.",
    outcome:
      "Improved data integrity and reduced operational interventions for large catalog publication cycles.",
    tags: ["Azure Functions", "PIM", "Serverless", "Integration"],
    scope: "Enterprise integration",
    category: "Integration",
  },
  {
    title: "Multi-Tenant SaaS Platform Core",
    problem:
      "Tenant-level customization and scaling were constrained by a monolithic operational model.",
    solution:
      "Refactored platform boundaries into microservices with tenancy-aware data and deployment contracts.",
    outcome:
      "Increased release velocity and platform scalability while preserving tenant isolation controls.",
    tags: ["Kubernetes", "Microservices", "SaaS", "Observability"],
    scope: "Global platform engineering",
    category: "Platform",
  },
];

export const articles = [
  {
    category: "Architecture",
    title: "Designing Event-Driven Integrations for Enterprise Commerce",
    excerpt:
      "Patterns for decoupled integration pipelines, replay safety, and observability at scale.",
    tags: ["Event-Driven", "Architecture"],
    url: "#",
  },
  {
    category: "Platform",
    title: "Multi-Tenant SaaS Boundaries That Scale",
    excerpt:
      "A practical architecture model for tenancy isolation, scaling, and operational safety.",
    tags: ["SaaS", "Platform"],
    url: "#",
  },
  {
    category: "Leadership",
    title: "Tech Lead Playbook for Distributed Engineering Teams",
    excerpt:
      "Engineering governance, release strategy, and architecture communication for scale.",
    tags: ["Tech Lead", "Distributed Teams"],
    url: "#",
  },
];

export const certifications = [
  {
    issuer: "AWS",
    title: "AWS Certified Solutions Architect — Associate",
    url: "#",
  },
  { issuer: "Meta", title: "Meta Front-End Developer Professional", url: "#" },
  {
    issuer: "Google",
    title: "Google UX Design Professional Certificate",
    url: "#",
  },
  {
    issuer: "Microsoft",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    url: "#",
  },
  {
    issuer: "MongoDB",
    title: "MongoDB Certified Developer Associate",
    url: "#",
  },
  {
    issuer: "Stripe",
    title: "Stripe Certified Professional Developer",
    url: "#",
  },
  {
    issuer: "HashiCorp",
    title: "HashiCorp Certified: Terraform Associate",
    url: "#",
  },
  { issuer: "Docker", title: "Docker Certified Associate", url: "#" },
  { issuer: "GitHub", title: "GitHub Actions Certified", url: "#" },
];

export const testimonials = [
  {
    quote:
      "Sanu delivered our platform ahead of schedule with quality that exceeded expectations. A true professional.",
    name: "Aisha Verma",
    role: "Product Lead, Linear Pay",
    avatarUrl: "/assets/images/sanu.png",
  },
  {
    quote:
      "Reliable, communicative and deeply technical. Sanu became a core part of our engineering team within a week.",
    name: "Marcus Chen",
    role: "CTO, Habitly",
    avatarUrl: "/assets/images/sanu.png",
  },
  {
    quote:
      "Outstanding work on our headless commerce stack. Performance and DX both improved dramatically.",
    name: "Priya Sharma",
    role: "Founder, NorthStore",
    avatarUrl: "/assets/images/sanu.png",
  },
];

export const footer = {
  brand: "SanuKhan.dev",
  blurb: "Tech Lead • Cloud Architect",
  socials: [
    { label: "GitHub", icon: "Github", href: "https://github.com/sanukhandev" },
    {
      label: "LinkedIn",
      icon: "Linkedin",
      href: "https://linkedin.com/in/sanukhandev",
    },
  ],
  quickLinks: [
    { label: "Work", href: "#works" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ],
  servicesLinks: [],
  contact: {
    email: "hello@sanukhan.dev",
    location: "Global",
    cta: { label: "Connect", href: "#contact" },
  },
  copyright: `© ${new Date().getFullYear()} Sanu Khan. All rights reserved.`,
};
