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
    title:
      "API Gateway: The Bouncer Your Microservices Didn't Know They Needed",
    excerpt:
      "How API Gateways act as the single entry point for microservices — handling auth, rate limiting, routing, and observability so your services don't have to.",
    tags: ["API Gateway", "DevOps", "Microservices"],
    url: "https://dev.to/sanukhandev/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e",
  },
  {
    category: "Data Engineering",
    title: "DuckDB: The SQLite of Analytics You Didn't Know You Needed",
    excerpt:
      "An in-process OLAP database with zero config, blazing-fast columnar queries, and support for CSV, Parquet, and JSON — perfect for data science and offline analytics.",
    tags: ["DuckDB", "SQL", "Data Engineering"],
    url: "https://dev.to/sanukhandev/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m",
  },
  {
    category: "JavaScript",
    title:
      "JavaScript Proxy Explained: Powerful Tips for Dynamic Object Handling",
    excerpt:
      "How to use JavaScript's Proxy object to intercept and control object behaviour — covering validation, logging, access control, and Vue 3 reactivity internals.",
    tags: ["JavaScript", "Web Dev", "Frontend"],
    url: "https://dev.to/sanukhandev/unmasking-javascript-proxies-the-secret-agents-of-your-objects-4eac",
  },
  {
    category: "Algorithms",
    title:
      "Creating a Merge Sort Array Prototype for Nested Objects, Strings and Numbers in JavaScript",
    excerpt:
      "Build a custom non-mutating mergeSortBy() on Array.prototype that handles primitives, nested object keys, and custom comparator functions.",
    tags: ["JavaScript", "Algorithms", "Tutorial"],
    url: "https://dev.to/sanukhandev/creating-a-merge-sort-array-prototype-for-nested-objects-strings-and-numbers-in-javascript-4l3j",
  },
  {
    category: "DSA",
    title:
      "Why Project Euler Might Be the Most Powerful DSA Trainer You're Not Using Yet",
    excerpt:
      "How Project Euler's math-driven puzzles train you to think algorithmically, optimise solutions, and build real DSA skills that ace interviews.",
    tags: ["DSA", "Python", "Problem Solving"],
    url: "https://dev.to/sanukhandev/why-project-euler-might-be-the-most-powerful-dsa-trainer-youre-not-using-yet-293c",
  },
  {
    category: "DevTools",
    title:
      "How Warp Terminal Saved Me from a Git Disaster With Just One Prompt",
    excerpt:
      "When a rebase went catastrophically wrong, one natural-language prompt in Warp Terminal produced the exact safe steps needed to recover — instantly.",
    tags: ["Git", "Terminal", "Productivity"],
    url: "https://dev.to/sanukhandev/how-warp-terminal-saved-me-from-a-git-disaster-with-just-one-prompt-3fge",
  },
  {
    category: "Architecture",
    title:
      "Building a Cost-Effective Full-Stack SaaS Platform: A Practical Guide for Small to Mid-Size IT",
    excerpt:
      "A pragmatic full-stack architecture using Laravel, Next.js, MySQL, Headless WordPress, and cPanel hosting — built to balance cost, scalability, and maintainability.",
    tags: ["SaaS", "Full Stack", "Architecture"],
    url: "https://dev.to/sanukhandev/building-a-cost-effective-full-stack-saas-platform-a-practical-guide-for-small-to-mid-size-it-2d44",
  },
  {
    category: "Computer Science",
    title:
      "Unravelling P vs NP: How This Unsolved Problem Influences the Future of AI with Quantum Computing",
    excerpt:
      "Exploring how the P vs NP problem sits at the heart of AI research, and why quantum computing may offer new pathways toward resolving this millennium-prize puzzle.",
    tags: ["AI", "Computer Science", "Quantum Computing"],
    url: "https://dev.to/sanukhandev/unravelling-p-vs-np-how-this-unsolved-problem-influences-the-future-of-ai-with-quantum-computing-37c3",
  },
  {
    category: "Computer Science",
    title: "P vs NP Problem: The Ultimate Computer Math Puzzle",
    excerpt:
      "A one-byte explainer on the most famous open problem in computer science — and why a $1 million prize still awaits its solver.",
    tags: ["Computer Science", "Theory", "Beginners"],
    url: "https://dev.to/sanukhandev/p-vs-np-problem-the-ultimate-computer-math-puzzle-5hj0",
  },
  {
    category: "Algorithms",
    title:
      "A Comprehensive Guide to Big O Notation and Efficient Coding Practices with Examples",
    excerpt:
      "Time and space complexity explained with real JavaScript examples — from O(1) to O(n²) — and why mastering Big O is essential for interviews and production code.",
    tags: ["JavaScript", "Algorithms", "Big O"],
    url: "https://dev.to/sanukhandev/a-comprehensive-guide-to-big-o-notation-and-efficient-coding-practices-with-examples-44n2",
  },
  {
    category: "Algorithms",
    title:
      "The Sliding Window Technique: A Powerful Algorithm for JavaScript Developers",
    excerpt:
      "Master the sliding window pattern for arrays and strings — with practical JavaScript examples covering max subarray sums, real-time data streaming, and more.",
    tags: ["JavaScript", "Algorithms", "Web Dev"],
    url: "https://dev.to/sanukhandev/the-sliding-window-technique-a-powerful-algorithm-for-javascript-developers-3nfm",
  },
];

export const certifications = [
  {
    issuer: "Simplilearn",
    title: "Introduction to Cyber Security",
    issued: "Apr 2023",
    credentialId: "MycyWRDvWyb",
    category: "Security",
    url: "https://simpli.app.link/MycyWRDvWyb",
  },
  {
    issuer: "HackerRank",
    title: "Python (Basic)",
    issued: "Jan 2022",
    credentialId: "8124d504fd5d",
    category: "Programming",
    url: "https://www.hackerrank.com/certificates/8124d504fd5d",
  },
  {
    issuer: "HackerRank",
    title: "SQL (Intermediate)",
    issued: "Feb 2022",
    credentialId: "0568be8a2030",
    category: "Database",
    url: "https://www.hackerrank.com/certificates/0568be8a2030",
  },
  {
    issuer: "HackerRank",
    title: "React (Basic)",
    issued: "Feb 2022",
    credentialId: "81d2dee86295",
    category: "Frontend",
    url: "https://www.hackerrank.com/certificates/81d2dee86295",
  },
  {
    issuer: "HackerRank",
    title: "Problem Solving (Intermediate)",
    issued: "Feb 2022",
    credentialId: "56d29c99f14d",
    category: "Algorithms",
    url: "https://www.hackerrank.com/certificates/56d29c99f14d",
  },
  {
    issuer: "Udemy",
    title: "React - The Complete Guide",
    issued: "Jan 2022",
    credentialId: "UC-119237dc-9851-489c-8f06-313fca17fdc1",
    category: "Advanced Frontend",
    url: "https://www.udemy.com/certificate/UC-119237dc-9851-489c-8f06-313fca17fdc1/",
  },
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
      href: "https://www.linkedin.com/in/sanu-khan-dev/",
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
    email: "khan.sanukhan@outlook.com",
    phone: "+971563860850",
    location: "Dubai, UAE",
    cta: { label: "Connect", href: "#contact" },
  },
  copyright: `© ${new Date().getFullYear()} Sanu Khan. All rights reserved.`,
};
