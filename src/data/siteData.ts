// =============================================================
// Sanu Khan — Portfolio Source Data
// Edit any value below to update the site. This is the single
// source of truth for all visible content.
// =============================================================

export const nav = {
  brand: "SanuKhan",
  links: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#works" },
    { label: "Articles", href: "#articles" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Hire Me", href: "#contact" },
};

export const profile = {
  name: "Sanu Khan",
  greeting: "Hi, I'm Sanu Khan",
  tagline:
    "Full Stack Developer crafting fast, scalable, and beautiful digital products for the modern web.",
  meta: [
    "Role: Full Stack Developer",
    "Location: Remote · India",
    "Status: Available for new projects",
  ],
  stats: [
    { value: "14+", label: "Years Experience" },
    { value: "150+", label: "Projects Shipped" },
    { value: "50+", label: "Happy Clients" },
  ],
  ctas: [
    { label: "Hire Me", href: "#contact", variant: "primary" as const },
    { label: "Download CV", href: "#", variant: "outline" as const },
  ],
  // Replace this with your photo when ready.
  avatarUrl: "/assets/images/sanu.png",
};

export const skills = {
  eyebrow: "Web",
  title: "Full Stack Web Engineering",
  intro:
    "I design and build production web applications end-to-end — from pixel-perfect interfaces to robust APIs and cloud infrastructure.",
  bullets: [
    "Modern React & TypeScript front-ends",
    "Node.js, REST & GraphQL APIs",
    "Databases, caching & performance",
    "Cloud deployment & DevOps",
  ],
  list: [
    { name: "React / Next.js", percent: 95 },
    { name: "TypeScript", percent: 92 },
    { name: "Node.js", percent: 90 },
    { name: "TailwindCSS", percent: 96 },
    { name: "PostgreSQL", percent: 85 },
    { name: "AWS / Vercel", percent: 80 },
    { name: "Docker", percent: 78 },
    { name: "Testing (Vitest / Jest)", percent: 82 },
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
    icon: "Code2",
    title: "Web Development",
    description:
      "Production-grade web apps with React, Next.js and TypeScript — fast, accessible and maintainable.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: "Smartphone",
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native — one codebase, native feel on iOS and Android.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    icon: "Server",
    title: "Backend & APIs",
    description:
      "Scalable backends, REST and GraphQL APIs, authentication, payments and real-time features.",
    tags: ["Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    icon: "PenTool",
    title: "UI / UX Design",
    description:
      "Clean, conversion-focused interfaces designed in Figma and shipped pixel-perfect to production.",
    tags: ["Figma", "Design Systems"],
  },
  {
    icon: "Cloud",
    title: "DevOps & Cloud",
    description:
      "CI/CD pipelines, containerization and cloud infrastructure on AWS, Vercel and Cloudflare.",
    tags: ["AWS", "Docker", "CI/CD"],
  },
];

export const workCategories = [
  "All",
  "Web",
  "Mobile",
  "Backend",
  "Design",
] as const;
export type WorkCategory = (typeof workCategories)[number];

export const works: Array<{
  title: string;
  description: string;
  tags: string[];
  year: string;
  status: "Live" | "In Progress" | "Concept";
  category: Exclude<WorkCategory, "All">;
}> = [
  {
    title: "Linear Pay",
    description:
      "Modern payment dashboard with real-time analytics, subscriptions and invoicing.",
    tags: ["React", "Stripe", "Postgres"],
    year: "2025",
    status: "Live",
    category: "Web",
  },
  {
    title: "Habitly",
    description:
      "Mobile habit tracker with streaks, reminders and beautiful data visualizations.",
    tags: ["React Native", "Expo"],
    year: "2025",
    status: "Live",
    category: "Mobile",
  },
  {
    title: "NodeKit API",
    description:
      "Open-source TypeScript starter kit for building scalable REST and GraphQL APIs.",
    tags: ["Node.js", "TypeScript", "GraphQL"],
    year: "2024",
    status: "Live",
    category: "Backend",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Headless commerce build with custom checkout, CMS and admin dashboard.",
    tags: ["Next.js", "Stripe", "Sanity"],
    year: "2024",
    status: "Live",
    category: "Web",
  },
  {
    title: "Realtime CRM",
    description:
      "Sales CRM with live collaboration, pipeline boards and AI-assisted insights.",
    tags: ["React", "WebSockets"],
    year: "2024",
    status: "In Progress",
    category: "Web",
  },
  {
    title: "Sound Wave App",
    description:
      "Music streaming UI concept with offline mode and spatial audio support.",
    tags: ["React Native", "Audio"],
    year: "2023",
    status: "Concept",
    category: "Mobile",
  },
  {
    title: "Crypto Tracker Pro",
    description:
      "Multi-exchange portfolio tracker with alerts, charts and tax reporting.",
    tags: ["React", "Charts", "WebSockets"],
    year: "2023",
    status: "Live",
    category: "Web",
  },
];

export const articles = [
  {
    category: "React",
    title: "Building Resilient React Apps with Suspense and Error Boundaries",
    excerpt:
      "A practical guide to gracefully handling async state and failures in modern React.",
    tags: ["React", "Patterns"],
    url: "#",
  },
  {
    category: "TypeScript",
    title: "Advanced TypeScript Patterns for Large-Scale Codebases",
    excerpt:
      "Generics, conditional types and template literal types that scale with your team.",
    tags: ["TypeScript", "Architecture"],
    url: "#",
  },
  {
    category: "Performance",
    title: "Shipping Faster Web Apps: A Practical Performance Playbook",
    excerpt:
      "Concrete techniques to cut TTI, reduce bundle size and ace your Core Web Vitals.",
    tags: ["Performance", "Web Vitals"],
    url: "#",
  },
  {
    category: "Backend",
    title: "Designing PostgreSQL Schemas That Don't Break in Production",
    excerpt:
      "Indexing strategies, migrations and query patterns from real-world systems.",
    tags: ["Postgres", "Backend"],
    url: "#",
  },
  {
    category: "DevOps",
    title: "From Zero to CI/CD with GitHub Actions and Docker",
    excerpt:
      "A step-by-step pipeline that ships your app safely to production.",
    tags: ["CI/CD", "DevOps"],
    url: "#",
  },
  {
    category: "Career",
    title: "Lessons Learned After 14 Years as a Full Stack Developer",
    excerpt:
      "What actually compounds over a long engineering career — and what doesn't.",
    tags: ["Career", "Lessons"],
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
  brand: "SanuKhan",
  blurb:
    "Full Stack Developer building fast, scalable products for startups and teams worldwide.",
  socials: [
    { label: "GitHub", icon: "Github", href: "https://github.com" },
    { label: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com" },
    { label: "Twitter", icon: "Twitter", href: "https://twitter.com" },
    { label: "Email", icon: "Mail", href: "mailto:hello@example.com" },
  ],
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Works", href: "#works" },
    { label: "Articles", href: "#articles" },
  ],
  servicesLinks: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Development", href: "#services" },
    { label: "Backend & APIs", href: "#services" },
    { label: "UI / UX Design", href: "#services" },
  ],
  contact: {
    email: "hello@sanukhan.dev",
    location: "Remote · India",
    cta: { label: "Hire Me", href: "#contact" },
  },
  copyright: `© ${new Date().getFullYear()} Sanu Khan. All rights reserved.`,
};
