export const nav = {
  brand: "SanuKhan.dev",
  links: [
    { label: "Work", href: "#works" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Hire Me", href: "#contact" },
};

export const profile = {
  name: "Sanu Khan",
  role: "Creator of ZaakiyV3RSE",
  roleBrand: "ZaakiyV3RSE",
  subRole:
    "Tech Lead • Cloud & MS Architect • Enterprise Integrations Specialist",
  subtitle:
    "Designing scalable distributed systems, enterprise integrations, and high-performance platforms across global markets.",
  statement:
    "Leading architecture and platform engineering for event-driven commerce, enterprise integration, and multi-region cloud delivery. Creator of ZaakiyV3RSE.",
  meta: [
    "13+ years building distributed systems",
    "Event-driven architecture specialist",
    "Creator of ZaakiyV3RSE",
    "Azure • AWS • Kubernetes delivery",
  ],
  impactMetrics: [
    { value: "13+", label: "Years Experience" },
    { value: "100+", label: "Systems Delivered" },
    { value: "9", label: "Markets Served" },
    { value: "1M+", label: "Product Scale Systems" },
  ],
  ctas: [
    {
      label: "Hire Me",
      href: "mailto:hello@sanukhan.dev?subject=Hire%20Inquiry%20–%20SanuKhan.dev",
      variant: "hire" as const,
    },
    {
      label: "Buy Me a Coffee",
      href: "https://ko-fi.com/sanukhan",
      variant: "buyMeACoffee" as const,
    },
  ],
  avatarUrl: "/assets/images/sanu.avif",
};

export const skills = {
  eyebrow: "Stack",
  title: "Engineering Expertise Clusters",
  intro:
    "Architecture-first execution across cloud, integrations, and platform engineering with production-grade delivery discipline.",
  expandLabel: "View all skills",
  collapseLabel: "View less skills",
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

export const services = [
  {
    company: "TechCarrot LLC",
    client: "Al-Futtaim EIT Client",
    location: "Dubai, UAE",
    role: "Tech Lead & Solution Architect",
    duration: "Feb 2022 – Present",
    current: true,
    impact: [
      "Architected enterprise PIM integrations across M&S, ACE, and Watsons retail brands — catalog, pricing, and inventory at scale",
      "Designed event-driven pipelines on Azure Event Hub, Kafka, and RabbitMQ for real-time multi-region product and pricing sync",
      "Built serverless microservices using Node.js and Azure Functions for high-throughput integration orchestration",
      "Delivered SAP–PIM–Shopify–Kibo integrations enabling unified omnichannel commerce platforms",
      "Architected multi-tenant SaaS systems with strict tenant isolation, scalable deployments, and contract-driven APIs",
      "Led cloud-native delivery on Azure and Kubernetes — mentored engineering teams and owned architectural decisions",
    ],
    stack: [
      "Azure Functions",
      "Kafka",
      "Event Hubs",
      "RabbitMQ",
      "Node.js",
      "Kubernetes",
      "SAP",
      "Shopify",
      "Kibo",
      "Microservices",
    ],
  },
  {
    company: "28 Light Bulbs",
    client: null,
    location: "Dubai, UAE",
    role: "Frontend & Full Stack Engineer",
    duration: "Oct 2021 – Jan 2022",
    current: false,
    impact: [
      "Built ERP and project management platforms using Laravel and Angular with modular, maintainable architecture",
      "Developed calendar-driven task management modules with complex workflow state handling",
      "Implemented scalable UI architectures with NgRx state management for enterprise-grade frontend reliability",
    ],
    stack: ["Laravel", "Angular", "NgRx", "PHP", "MySQL"],
  },
  {
    company: "TP Connects Technologies",
    client: null,
    location: "Dubai, UAE",
    role: "Full Stack & Platform Engineer",
    duration: "Mar 2021 – Oct 2021",
    current: false,
    impact: [
      "Built airline B2B marketplace and aggregation platform handling multi-supplier content and pricing",
      "Designed scalable booking and ticketing services using Node.js microservices and Java backends",
      "Implemented NDC-based airline content management systems with structured data contracts",
      "Contributed to high-availability distributed backends with resilient service boundaries",
    ],
    stack: ["Node.js", "React", "Java", "NDC", "Microservices", "REST APIs"],
  },
  {
    company: "Candour Automation",
    client: null,
    location: "India",
    role: "R&D Engineer",
    duration: "Sep 2016 – Dec 2020",
    current: false,
    impact: [
      "Built video conferencing platform using React and Django with scalable real-time media signaling",
      "Delivered ERP, asset management, and roadside assistance systems across diverse enterprise domains",
      "Shipped e-commerce platforms and enterprise backend tools for multiple clients",
      "Developed Android applications and Spring Boot/PHP backend services",
    ],
    stack: ["React", "Django", "Spring Boot", "PHP", "Android", "PostgreSQL"],
  },
  {
    company: "Freelance & Independent Consulting",
    client: null,
    location: "Remote / Global",
    role: "Solution Architect & Full Stack Consultant",
    duration: "2010 – Present",
    current: false,
    impact: [
      "Delivered 100+ software solutions across ERP, SaaS, e-commerce, LMS, and AI chatbot domains",
      "Specialized in automation-heavy integrations, scalable backend architectures, and cloud delivery",
      "Designed and launched SaaS platforms with multi-tenant models and subscription billing",
      "Built AI-assisted tools and LMS systems for mid-market and enterprise clients",
    ],
    stack: [
      "Full Stack",
      "SaaS",
      "ERP",
      "LMS",
      "AI Chatbots",
      "Integrations",
      "Cloud",
    ],
  },
  {
    company: "Early Career",
    client: null,
    location: "India",
    role: "Network & Systems Engineer",
    duration: "2010 – 2016",
    current: false,
    impact: [
      "Designed and managed network infrastructure, routing, and system administration",
      "Built the foundational expertise in infrastructure reliability, security, and systems operations",
    ],
    stack: ["Networking", "Linux", "System Administration", "Security"],
  },
];

export const workCategories = [
  "All",
  "Commerce",
  "Integration",
  "Platform",
  "Operations Intelligence",
  "Automation",
  "AI",
  "Operations",
  "Infrastructure",
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
    title: "Operational Intelligence Ecosystem",
    problem:
      "Enterprise operations were fragmented across disconnected systems, limiting visibility, automation, and coordinated decision making.",
    solution:
      "Architected an event-driven operational intelligence platform with centralized telemetry, AI-assisted orchestration, and distributed workflow automation layers.",
    outcome:
      "Enabled real-time operational awareness and scalable intelligent automation across multi-domain business environments.",
    tags: [
      "Operational Intelligence",
      "AI Workflows",
      "Event-Driven",
      "Telemetry"
    ],
    scope: "Enterprise operational ecosystem",
    category: "Operations",
  },

  {
    title: "Retail Event Processing Network",
    problem:
      "Catalog, pricing, and inventory events were processed asynchronously across regions with inconsistent propagation timing.",
    solution:
      "Designed distributed event streaming pipelines using Kafka and Azure Event Hubs with resilient synchronization services.",
    outcome:
      "Improved near real-time consistency and operational throughput for high-scale commerce environments.",
    tags: [
      "Kafka",
      "Azure Event Hubs",
      "Streaming",
      "Microservices"
    ],
    scope: "Global commerce operations",
    category: "Commerce",
  },

  {
    title: "AI-Assisted Workflow Automation",
    problem:
      "Operational workflows depended heavily on manual coordination and repetitive human intervention.",
    solution:
      "Built AI-assisted orchestration pipelines capable of contextual workflow execution, escalation handling, and intelligent routing.",
    outcome:
      "Reduced operational overhead while improving execution efficiency and response coordination.",
    tags: [
      "AI Automation",
      "Workflow Engine",
      "Orchestration",
      "Process Intelligence"
    ],
    scope: "Operational automation systems",
    category: "Automation",
  },

  {
    title: "Enterprise Integration Fabric",
    problem:
      "Cross-platform integrations between enterprise systems lacked observability, resilience, and validation governance.",
    solution:
      "Developed serverless integration orchestration layers with contract-driven payload validation and operational monitoring pipelines.",
    outcome:
      "Improved integration reliability, traceability, and operational stability across distributed enterprise systems.",
    tags: [
      "Azure Functions",
      "Serverless",
      "Integration",
      "Observability"
    ],
    scope: "Enterprise integration architecture",
    category: "Integration",
  },

  {
    title: "Multi-Tenant Platform Infrastructure",
    problem:
      "Tenant-specific scaling, deployments, and operational boundaries were constrained by tightly coupled platform architecture.",
    solution:
      "Refactored platform services into tenancy-aware microservice domains with isolated deployment and observability contracts.",
    outcome:
      "Improved scalability, deployment agility, and operational isolation across distributed tenant environments.",
    tags: [
      "Kubernetes",
      "Microservices",
      "SaaS",
      "Platform Engineering"
    ],
    scope: "Multi-tenant platform systems",
    category: "Platform",
  },

  {
    title: "Real-Time Observability & Monitoring Layer",
    problem:
      "Operational incidents and performance anomalies lacked centralized monitoring and proactive visibility.",
    solution:
      "Implemented unified observability pipelines with telemetry aggregation, distributed tracing, and operational intelligence dashboards.",
    outcome:
      "Enhanced proactive incident detection, system diagnostics, and operational decision support capabilities.",
    tags: [
      "Observability",
      "Distributed Tracing",
      "Monitoring",
      "Telemetry"
    ],
    scope: "Enterprise monitoring systems",
    category: "Infrastructure",
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

export const footer = {
  brand: "SanuKhan.dev",
  blurb: "Tech Lead • Cloud Architect",
  socials: [
    { label: "GitHub", icon: "GitHub", href: "https://github.com/sanukhandev" },
    {
      label: "LinkedIn",
      icon: "LinkedIn",
      href: "https://www.linkedin.com/in/sanukhandev/",
    },
    {
      label: "Dev.to",
      icon: "DevTo",
      href: "https://dev.to/sanukhandev",
    },
    {
      label: "Stack Overflow",
      icon: "StackOverflow",
      href: "https://stackoverflow.com/users/8219738/sanu-khan",
    },
    {
      label: "Medium",
      icon: "Medium",
      href: "https://medium.com/@sanukhandev",
    },
    {
      label: "X",
      icon: "X",
      href: "https://x.com/sanukhandev",
    },
    {
      label: "YouTube",
      icon: "YouTube",
      href: "https://www.youtube.com/@sanukhan2653",
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
    phone: "+971563860850",
    location: "Dubai, UAE",
    cta: { label: "Connect", href: "#contact" },
  },
  copyright: `© ${new Date().getFullYear()} Sanu Khan. All rights reserved.`,
};
