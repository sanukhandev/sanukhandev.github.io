import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const SITE = "https://www.sanukhan.dev";
const DEFAULT_OG_IMAGE = `${SITE}/assets/images/og-card.jpg`;
const DEVTO_USERNAME = "sanukhandev";
const DEVTO_TIMEOUT_MS = 5000;

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

const staticRoutes = [
  {
    route: "/",
    canonicalPath: "/",
    title:
      "Sanu Khan | Solution Architect, Tech Lead & Software Engineer in Dubai, UAE",
    description:
      "Sanu Khan (Sanu Karimulla Khan) — Solution Architect, Tech Lead, and Senior Software Engineer in Dubai, UAE with 13+ years architecting enterprise integrations (SAP, Shopify, Kibo), cloud microservices (Azure, AWS, Kafka), and full-stack platforms across the UAE, KSA, and GCC.",
    keywords:
      "Sanu Khan, Sanu Karimulla Khan, sanukhan.dev, ZaakiyV3RSE, Solution Architect Dubai, Solution Architect UAE, Software Engineer Dubai, Software Engineer UAE, Tech Lead Dubai, Enterprise Integration Architect UAE, Cloud & Microservices Architect Dubai, Full Stack Consultant UAE, SAP ERP Integration Dubai, Node.js Developer UAE, React Developer Dubai",
    ogType: "website",
    h1: "Sanu Khan — Solution Architect, Tech Lead & Software Engineer in Dubai, UAE",
    summary:
      "13+ years designing enterprise integrations (SAP, Shopify, Kibo), event-driven cloud platforms (Azure, AWS, Kafka), and resilient full-stack systems across retail, aviation, automotive, real estate, and healthcare in Dubai, UAE and the GCC.",
    sections: [
      "Solution Architecture & Technical Leadership in Dubai, UAE",
      "Enterprise Integration (SAP S/4HANA, ECC, Commerce Cloud, Shopify, Kibo)",
      "Cloud & Event-Driven Microservices (Azure, AWS, Kafka, Kubernetes)",
      "Full-Stack Platform Engineering (Node.js, TypeScript, React, Next.js, Java Spring Boot)",
      "Selected Production Case Studies & Engineering Notes",
    ],
    schemas: [
      breadcrumbSchema([{ name: "Home", path: "/" }]),
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What kind of engineering and architecture work does Sanu Khan take on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sanu Khan leads solution architecture, enterprise systems integration (SAP, ERP, CRM, commerce), event-driven platform engineering, and full-stack technical delivery across retail, aviation, automotive, real estate, and healthcare in Dubai, UAE and international markets.",
            },
          },
          {
            "@type": "Question",
            name: "Is Sanu Khan available for Solution Architect or Tech Lead roles in Dubai and the UAE?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Based in Dubai, UAE, Sanu Khan is open to principal/lead engineering roles, solution architecture leadership, and selective advisory or integration engagements across the UAE, KSA, GCC, and remote global teams.",
            },
          },
        ],
      },
    ],
  },
  {
    route: "/about",
    canonicalPath: "/about",
    title:
      "About Sanu Khan | Solution Architect & Engineering Leader in Dubai, UAE",
    description:
      "Meet Sanu Khan (Sanu Karimulla Khan), a Dubai-based Solution Architect and Tech Lead with 13+ years of enterprise delivery across Al-Futtaim, TechCarrot, SAP ecosystems, aviation retailing, and cloud-native platforms.",
    keywords:
      "About Sanu Khan, Sanu Karimulla Khan, Solution Architect Dubai, Tech Lead Dubai, Al-Futtaim Architect, TechCarrot Tech Lead, Enterprise Architect UAE, Software Engineering Leader Dubai",
    ogType: "profile",
    h1: "About Sanu Khan — Solution Architect & Engineering Leader in Dubai, UAE",
    summary:
      "13+ years of production engineering, solution architecture, and technical leadership in Dubai, UAE across enterprise retail, airline retailing, automotive omnichannel, real estate ERP, and healthcare platforms.",
    sections: [
      "Engineering Philosophy & Architectural Principles",
      "Enterprise Delivery Track Record in Dubai & MENA",
      "Core Technical Capabilities: Cloud, Integration, Full-Stack & AI",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE}/about#profilepage`,
        url: `${SITE}/about`,
        name: "About Sanu Khan | Solution Architect & Engineering Leader in Dubai, UAE",
        mainEntity: { "@id": `${SITE}/#person` },
      },
    ],
  },
  {
    route: "/projects",
    canonicalPath: "/projects",
    title:
      "Enterprise Architecture & Software Engineering Case Studies | Sanu Khan",
    description:
      "Production engineering case studies by Sanu Khan in Dubai, UAE: enterprise retail SAP integration, airline NDC retailing aggregation, automotive omnichannel platforms, real estate ERP architecture, and healthcare digital experience.",
    keywords:
      "Enterprise Architecture Case Studies, Solution Architect Portfolio Dubai, SAP Integration Case Study, Airline NDC Retailing Architecture, Automotive Omnichannel Platform, Real Estate ERP UAE, ZaakiyV3RSE, Sanu Khan Projects",
    ogType: "website",
    h1: "Selected Enterprise Architecture & Production Engineering Case Studies",
    summary:
      "Detailed architectural case studies covering problem context, system constraints, trade-offs, and verified production delivery across retail, aviation, automotive, real estate, and healthcare.",
    sections: [
      "Enterprise Retail Integration Architecture",
      "Airline Retailing & NDC Offer/Order Aggregation",
      "Automotive Omnichannel Commerce & Service Platform",
      "Real Estate Property & Leasing ERP Architecture",
      "Garage Management & Connected Vehicle Diagnostics",
      "Headless Healthcare Patient Digital Experience",
      "ZaakiyV3RSE — Interactive Architecture & Engineering Portfolio",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${SITE}/projects#collection`,
        url: `${SITE}/projects`,
        name: "Enterprise Architecture & Software Engineering Case Studies | Sanu Khan",
        author: { "@id": `${SITE}/#person` },
      },
    ],
  },
  {
    route: "/projects/agentic-rag-implementation",
    canonicalPath: "/projects/agentic-rag-implementation",
    title: "Agentic RAG Implementation — Multi-Tenant AI Architecture | Sanu Khan",
    description: "Technical case study of a multi-tenant RAG platform with document ingestion, pgvector retrieval, n8n orchestration and tenant-scoped AI.",
    keywords: "Agentic RAG, RAG implementation, multi-tenant AI, pgvector, n8n, AI architecture, Sanu Khan",
    ogType: "article",
    h1: "Agentic RAG — Knowledge into Action",
    summary: "A multi-tenant AI platform designed for approved enterprise knowledge, grounded conversations and orchestrated business workflows.",
    sections: [
      "Knowledge Ingestion and Embeddings",
      "Tenant-Scoped pgvector Retrieval",
      "n8n Intent Orchestration and Governance",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Agentic RAG Implementation", path: "/projects/agentic-rag-implementation" },
      ]),
    ],
  },
  {
    route: "/projects/enterprise-retail-integration",
    canonicalPath: "/projects/enterprise-retail-integration",
    title: "Enterprise Retail Integration — Case Study | Sanu Khan",
    description:
      "Event-driven integration backbone connecting digital commerce storefronts, order orchestration, warehouse execution, and SAP ERP across regional retail operations in the UAE and MENA.",
    keywords:
      "Enterprise Retail Integration, SAP ERP Integration Dubai, Event-Driven Retail Architecture, Order Management Orchestration, Commerce Integration UAE, Sanu Khan Case Study",
    ogType: "article",
    h1: "Enterprise Retail Integration — Event-Driven Commerce & SAP Backbone",
    summary:
      "Architected an asynchronous, contract-first integration layer decoupling high-traffic digital storefronts from SAP ERP and warehouse execution systems.",
    sections: [
      "System Context & Peak Retail Constraints",
      "Event-Driven Integration & Anti-Corruption Layer",
      "Idempotent Order & Inventory Synchronization",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Enterprise Retail Integration",
          path: "/projects/enterprise-retail-integration",
        },
      ]),
    ],
  },
  {
    route: "/projects/airline-retailing-aggregation",
    canonicalPath: "/projects/airline-retailing-aggregation",
    title: "Airline Retailing Aggregation — Case Study | Sanu Khan",
    description:
      "High-throughput airline retailing and NDC offer/order aggregation platform normalizing multi-provider GDS, NDC, and LCC fare and ancillary streams.",
    keywords:
      "Airline Retailing Aggregation, NDC Offer Order Architecture, Aviation Middleware Dubai, High Throughput API Aggregation, Travel Tech Architecture UAE, Sanu Khan",
    ogType: "article",
    h1: "Airline Retailing & NDC Offer/Order Aggregation Platform",
    summary:
      "Designed resilient fan-out search, connector isolation, and canonical offer/order normalization across heterogeneous airline distribution providers.",
    sections: [
      "Multi-Provider Latency & Schema Fragmentation",
      "Bounded Fan-Out & Circuit-Broken Connector Mesh",
      "Canonical Offer & Order Lifecycle Integrity",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Airline Retailing Aggregation",
          path: "/projects/airline-retailing-aggregation",
        },
      ]),
    ],
  },
  {
    route: "/projects/automotive-omnichannel-platform",
    canonicalPath: "/projects/automotive-omnichannel-platform",
    title: "Automotive Omnichannel Platform — Case Study | Sanu Khan",
    description:
      "Unified automotive digital retailing, vehicle reservation, trade-in valuation, finance, and dealer management system (DMS) integration platform.",
    keywords:
      "Automotive Omnichannel Platform, Dealer Management System Integration, Automotive Digital Retailing UAE, Enterprise Architecture Dubai, Sanu Khan",
    ogType: "article",
    h1: "Automotive Omnichannel Commerce & Dealer Integration Platform",
    summary:
      "Connected online vehicle discovery, financing, and reservations with physical dealership DMS, CRM, and ERP workflows.",
    sections: [
      "Bridging Online Customer Journeys & Dealership Operations",
      "Real-Time VIN Reservation & DMS Synchronization",
      "Unified Lead, Finance & Handover Orchestration",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Automotive Omnichannel Platform",
          path: "/projects/automotive-omnichannel-platform",
        },
      ]),
    ],
  },
  {
    route: "/projects/real-estate-erp-architecture",
    canonicalPath: "/projects/real-estate-erp-architecture",
    title: "Real Estate ERP Architecture — Case Study | Sanu Khan",
    description:
      "Multi-entity real estate property management, leasing lifecycle, billing schedules, and financial ERP reconciliation architecture in the UAE.",
    keywords:
      "Real Estate ERP Architecture UAE, Property Management System Dubai, Leasing Lifecycle Automation, Financial ERP Integration, Sanu Khan",
    ogType: "article",
    h1: "Real Estate ERP & Leasing Lifecycle Architecture",
    summary:
      "Architected a domain-driven property, leasing, and financial reconciliation platform supporting multi-entity portfolios and automated billing schedules.",
    sections: [
      "Complex Leasing Lifecycles & Financial Governance",
      "Audit-Safe Contract State Machines & Ledger Sync",
      "Multi-Entity Portfolio & Tenant Self-Service",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Real Estate ERP Architecture",
          path: "/projects/real-estate-erp-architecture",
        },
      ]),
    ],
  },
  {
    route: "/projects/garage-management-and-diagnostics",
    canonicalPath: "/projects/garage-management-and-diagnostics",
    title: "Garage Management & Diagnostics — Case Study | Sanu Khan",
    description:
      "Workshop bay scheduling, technician job cards, parts inventory, and vehicle diagnostic telemetry platform for multi-branch service centers.",
    keywords:
      "Garage Management System UAE, Workshop Operations Platform, Automotive Aftersales Architecture Dubai, Telemetry Diagnostics Integration, Sanu Khan",
    ogType: "article",
    h1: "Garage Management & Vehicle Diagnostics Platform",
    summary:
      "Streamlined multi-branch workshop scheduling, digital inspections, parts reservations, and customer approvals.",
    sections: [
      "Workshop Throughput & Bay Utilization Bottlenecks",
      "Digital Job Cards, Parts Sync & Customer Approvals",
      "Real-Time Service Status & Aftersales Analytics",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Garage Management & Diagnostics",
          path: "/projects/garage-management-and-diagnostics",
        },
      ]),
    ],
  },
  {
    route: "/projects/headless-healthcare-digital-experience",
    canonicalPath: "/projects/headless-healthcare-digital-experience",
    title: "Headless Healthcare Digital Experience — Case Study | Sanu Khan",
    description:
      "Privacy-first headless patient portal, appointment scheduling, clinician directory, and HIS/EMR integration architecture.",
    keywords:
      "Headless Healthcare Architecture, Patient Portal UAE, HIS EMR Integration Dubai, Healthcare Digital Experience, Sanu Khan",
    ogType: "article",
    h1: "Headless Healthcare Digital Experience & HIS Integration",
    summary:
      "Delivered a fast, accessible patient experience decoupling digital appointment and care journeys from legacy Hospital Information Systems (HIS).",
    sections: [
      "Clinical System Constraints & Patient UX",
      "BFF & Anti-Corruption Layer over Legacy HIS/EMR",
      "Privacy, Consent & Accessible Care Journeys",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        {
          name: "Headless Healthcare Digital Experience",
          path: "/projects/headless-healthcare-digital-experience",
        },
      ]),
    ],
  },
  {
    route: "/projects/zaakiy-v3rse",
    canonicalPath: "/projects/zaakiy-v3rse",
    title: "ZaakiyV3RSE — Interactive Architecture & AI Portfolio Case Study | Sanu Khan",
    description:
      "How sanukhan.dev (ZaakiyV3RSE) is architected: bilingual English/Arabic editorial design system, AI-assisted engineering assistant, browser-native developer tools, and technical SEO.",
    keywords:
      "ZaakiyV3RSE, sanukhan.dev Architecture, Bilingual RTL Design System, AI Portfolio Assistant, Technical SEO Vite React, Sanu Khan",
    ogType: "article",
    h1: "ZaakiyV3RSE — Bilingual Editorial Engineering Portfolio & AI System",
    summary:
      "An inside look at the design system, bilingual LTR/RTL typography, AI assistant guardrails, and performance engineering behind sanukhan.dev.",
    sections: [
      "Editorial Design System & Bilingual LTR/RTL Architecture",
      "Guarded AI Assistant & Browser-Native Developer Utilities",
      "Performance, Accessibility & Search Readiness",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "ZaakiyV3RSE", path: "/projects/zaakiy-v3rse" },
      ]),
    ],
  },
  {
    route: "/contact",
    canonicalPath: "/contact",
    title:
      "Contact Sanu Khan | Hire Solution Architect & Tech Lead in Dubai, UAE",
    description:
      "Connect with Sanu Khan in Dubai, UAE for Solution Architecture, Technical Leadership, Enterprise SAP/API Integration, and Full-Stack Consulting roles or engagements across the UAE and GCC.",
    keywords:
      "Contact Sanu Khan, Hire Solution Architect Dubai, Hire Tech Lead UAE, Full Stack Consultant Dubai, Enterprise Integration Consultant UAE, sanukhan.dev contact",
    ogType: "website",
    h1: "Contact Sanu Khan — Solution Architecture & Engineering Leadership in Dubai, UAE",
    summary:
      "Available for Solution Architect, Principal/Lead Software Engineer, and Enterprise Integration consulting conversations in Dubai, UAE, across the GCC, and remote.",
    sections: [
      "Direct Contact: hello@sanukhan.dev | Dubai, United Arab Emirates",
      "Architecture Reviews, Platform Delivery & Leadership Roles",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  },
  {
    route: "/faq",
    canonicalPath: "/faq",
    title:
      "Engineering & Architecture FAQ | Sanu Khan — Solution Architect Dubai",
    description:
      "Frequently asked questions about Sanu Khan's solution architecture approach, enterprise integration delivery, tech stack (Node.js, React, Java, Azure, AWS, SAP), and availability in Dubai, UAE.",
    keywords:
      "Sanu Khan FAQ, Solution Architect Dubai FAQ, Software Engineer UAE Questions, Enterprise Integration Consulting UAE, Tech Lead Dubai",
    ogType: "website",
    h1: "Frequently Asked Questions — Solution Architecture & Engineering Delivery",
    summary:
      "Answers on architectural engagement models, enterprise SAP/API integration, cloud platforms, and availability in Dubai, UAE.",
    sections: [
      "Scope of Solution Architecture & Technical Leadership",
      "Enterprise Systems, Cloud Stack & Delivery Governance",
      "Availability in Dubai, UAE & Remote Collaboration",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
    ],
  },
  {
    route: "/tools",
    canonicalPath: "/tools",
    title:
      "Free Online Developer Tools — JSON Formatter, API Client & cURL Converter | Sanu Khan",
    description:
      "Privacy-first, browser-based developer utilities by Sanu Khan: JSON Formatter & Validator, REST API Testing Client, and cURL to JSON/Fetch Converter. 100% client-side execution.",
    keywords:
      "Free Developer Tools Online, JSON Formatter Online, REST API Client Browser, cURL to JSON Converter, cURL to Fetch Converter, Privacy First Developer Utilities, Sanu Khan Tools",
    ogType: "website",
    h1: "Privacy-First Online Developer Tools — JSON, API & cURL Utilities",
    summary:
      "Fast, zero-telemetry browser utilities built for software engineers and solution architects to inspect payloads, test REST endpoints, and convert cURL commands.",
    sections: [
      "JSON Formatter, Validator & Minifier Online",
      "Online REST API Client & HTTP Request Tester",
      "cURL to JSON & JavaScript Fetch Converter",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
      ]),
    ],
  },
  {
    route: "/tools/json-formatter-online",
    canonicalPath: "/tools/json-formatter-online",
    title:
      "JSON Formatter, Validator & Minifier Online (Free, Private) | Sanu Khan",
    description:
      "Format, validate, prettify, and minify JSON payloads instantly in your browser. 100% client-side execution with line-level syntax error detection and zero server uploads.",
    keywords:
      "JSON Formatter Online, JSON Validator Online, JSON Beautifier, JSON Minifier, Private JSON Formatter Browser, Debug API JSON Payload, Sanu Khan Tools",
    ogType: "website",
    h1: "JSON Formatter, Validator & Minifier Online",
    summary:
      "Format, validate, and minify complex nested JSON payloads directly in your browser with zero server uploads.",
    sections: [
      "Prettify & Minify JSON with 100% Client-Side Privacy",
      "Instant Syntax Validation & Error Pinpointing",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        {
          name: "JSON Formatter Online",
          path: "/tools/json-formatter-online",
        },
      ]),
    ],
  },
  {
    route: "/tools/api-client-tool",
    canonicalPath: "/tools/api-client-tool",
    title:
      "Online REST API Client & HTTP Request Tester (Browser-Based) | Sanu Khan",
    description:
      "Test REST and GraphQL APIs directly from your browser. Send GET, POST, PUT, PATCH, and DELETE requests, inspect HTTP status codes, headers, latency, and JSON responses.",
    keywords:
      "Online REST API Client, HTTP Request Tester Browser, Test API Online Free, Lightweight Postman Alternative Web, REST Endpoint Debugger, Sanu Khan Tools",
    ogType: "website",
    h1: "Online REST API Client & HTTP Request Tester",
    summary:
      "Execute HTTP requests, customize headers and JSON bodies, and inspect response status, timing, and payloads directly in your browser.",
    sections: [
      "Browser-Native REST & HTTP Endpoint Testing",
      "Response Status, Latency & Header Inspection",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        { name: "API Client Tool", path: "/tools/api-client-tool" },
      ]),
    ],
  },
  {
    route: "/tools/curl-to-json-converter",
    canonicalPath: "/tools/curl-to-json-converter",
    title:
      "cURL to JSON & JavaScript Fetch Converter Online (Free) | Sanu Khan",
    description:
      "Convert cURL commands into structured JSON request configs and ready-to-run JavaScript/TypeScript fetch() snippets instantly in your browser.",
    keywords:
      "cURL to JSON Converter, cURL to Fetch Converter, Parse cURL Command Online, Convert cURL to JavaScript Fetch, API Command Parser, Sanu Khan Tools",
    ogType: "website",
    h1: "cURL to JSON & JavaScript Fetch Converter Online",
    summary:
      "Parse terminal cURL commands into structured JSON objects and clean JavaScript fetch() code in one click.",
    sections: [
      "Extract URLs, HTTP Methods, Headers & Auth Flags from cURL",
      "Generate Production-Ready JavaScript fetch() Code",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools" },
        {
          name: "cURL to JSON Converter",
          path: "/tools/curl-to-json-converter",
        },
      ]),
    ],
  },
  {
    route: "/blog",
    canonicalPath: "/blog",
    title:
      "Software Architecture, System Design & Engineering Blog | Sanu Khan",
    description:
      "Technical articles and architectural notes by Sanu Khan on distributed systems, microservices, Node.js API design, cloud scaling, ERP architecture, and algorithms.",
    keywords:
      "Software Architecture Blog, System Design Articles, Distributed Systems Engineering, Node.js Best Practices, Microservices Architecture Blog, Sanu Khan Blog",
    ogType: "website",
    h1: "Engineering Notes — System Design, Distributed Architecture & Production Lessons",
    summary:
      "Practical field notes on scaling backends, API gateways, database selection, ERP architecture, and algorithmic problem solving by Sanu Khan.",
    sections: [
      "System Design & Distributed Backend Scaling",
      "Node.js API Architecture & Production Best Practices",
      "JavaScript Algorithms, Data Structures & Complexity",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  },
  {
    route: "/blogs",
    canonicalPath: "/blog",
    title:
      "Software Architecture, System Design & Engineering Blog | Sanu Khan",
    description:
      "Technical articles and architectural notes by Sanu Khan on distributed systems, microservices, Node.js API design, cloud scaling, ERP architecture, and algorithms.",
    keywords:
      "Software Architecture Blog, System Design Articles, Distributed Systems Engineering, Node.js Best Practices, Microservices Architecture Blog, Sanu Khan Blog",
    ogType: "website",
    h1: "Engineering Notes — System Design, Distributed Architecture & Production Lessons",
    summary:
      "Practical field notes on scaling backends, API gateways, database selection, ERP architecture, and algorithmic problem solving by Sanu Khan.",
    sections: [
      "System Design & Distributed Backend Scaling",
      "Node.js API Architecture & Production Best Practices",
      "JavaScript Algorithms, Data Structures & Complexity",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  },
  {
    route: "/blog/javascript-algorithms",
    canonicalPath: "/blog/javascript-algorithms",
    title:
      "JavaScript Algorithms & Data Structures for Production Systems | Sanu Khan",
    description:
      "Practical guide to JavaScript and TypeScript algorithms, Big-O time/space complexity, sliding window patterns, hash maps, and sorting in real-world backend and frontend workloads.",
    keywords:
      "JavaScript Algorithms, TypeScript Data Structures, Big O Notation JavaScript, Sliding Window Technique, Merge Sort JavaScript, Production Performance Optimization, Sanu Khan",
    ogType: "article",
    h1: "JavaScript Algorithms & Data Structures for Production Engineering",
    summary:
      "How algorithmic complexity, sliding window techniques, and lookup structures impact real-world Node.js and React latency.",
    sections: [
      "Big-O Complexity in Real Production Payloads",
      "Sliding Window, Hash Maps & Custom Sorting Patterns",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        {
          name: "JavaScript Algorithms",
          path: "/blog/javascript-algorithms",
        },
      ]),
    ],
  },
  {
    route: "/blog/nodejs-api-best-practices",
    canonicalPath: "/blog/nodejs-api-best-practices",
    title:
      "Node.js API Best Practices for Enterprise & High-Traffic Backends | Sanu Khan",
    description:
      "Production Node.js and TypeScript API architecture guide: contract-first validation, idempotency, rate limiting, structured observability, circuit breakers, and zero-downtime deployment.",
    keywords:
      "Node.js API Best Practices, Enterprise Node.js Architecture, TypeScript Backend Patterns, Idempotent REST APIs, Node.js Microservices Production, Sanu Khan",
    ogType: "article",
    h1: "Node.js API Best Practices for Resilient Enterprise Systems",
    summary:
      "Architectural patterns for building fault-tolerant, observable, contract-first Node.js and TypeScript APIs in production.",
    sections: [
      "Contract-First Validation, Idempotency & Error Taxonomies",
      "Timeouts, Circuit Breakers & Structured Observability",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        {
          name: "Node.js API Best Practices",
          path: "/blog/nodejs-api-best-practices",
        },
      ]),
    ],
  },
  {
    route: "/software-engineer-uae",
    canonicalPath: "/software-engineer-uae",
    title:
      "Senior Software Engineer & Solution Architect in Dubai, UAE | Sanu Khan",
    description:
      "Sanu Khan — Dubai-based Senior Software Engineer and Solution Architect with 13+ years delivering enterprise platforms, SAP/ERP integrations, and cloud-native microservices across the UAE and GCC.",
    keywords:
      "Software Engineer UAE, Senior Software Engineer Dubai, Solution Architect Dubai, Principal Software Engineer UAE, Enterprise Software Architect Dubai, Cloud & Microservices Engineer UAE, Sanu Khan",
    ogType: "website",
    h1: "Senior Software Engineer & Solution Architect in Dubai, UAE",
    summary:
      "13+ years designing and shipping high-availability enterprise platforms, cloud microservices, and complex systems integrations across Dubai, Abu Dhabi, and the GCC.",
    sections: [
      "Production-Grade Software Engineering & Solution Architecture in the UAE",
      "Cloud-Native Microservices, Event-Driven Systems & DevOps Governance",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Software Engineer UAE", path: "/software-engineer-uae" },
      ]),
    ],
  },
  {
    route: "/full-stack-consultant-uae",
    canonicalPath: "/full-stack-consultant-uae",
    title:
      "Full-Stack Consultant & Technical Lead in Dubai, UAE | Sanu Khan",
    description:
      "Full-Stack Consultant and Technical Lead in Dubai, UAE specializing in end-to-end product architecture, React/Next.js frontends, Node.js/Java microservices, and enterprise cloud delivery.",
    keywords:
      "Full Stack Consultant UAE, Full Stack Architect Dubai, Technical Lead Dubai, React Node.js Consultant UAE, Fractional CTO Tech Lead Dubai, Enterprise Web Platform Architect UAE, Sanu Khan",
    ogType: "website",
    h1: "Full-Stack Consultant & Technical Lead in Dubai, UAE",
    summary:
      "End-to-end architectural leadership and hands-on full-stack delivery from React/Next.js interfaces to Node.js/Java services and cloud infrastructure.",
    sections: [
      "Unified Frontend, Backend & Cloud Architecture",
      "Technical Roadmapping, Code Quality & Delivery Acceleration",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        {
          name: "Full-Stack Consultant UAE",
          path: "/full-stack-consultant-uae",
        },
      ]),
    ],
  },
  {
    route: "/api-integration-services",
    canonicalPath: "/api-integration-services",
    title:
      "Enterprise API & SAP Integration Architect in Dubai, UAE | Sanu Khan",
    description:
      "Enterprise API and systems integration architecture in Dubai, UAE: SAP S/4HANA & ECC, Shopify, Kibo, payment gateways, NDC aviation APIs, and event-driven Kafka/Azure middleware.",
    keywords:
      "API Integration Services UAE, Enterprise Integration Architect Dubai, SAP ERP Integration Dubai, Shopify Kibo Integration UAE, Event-Driven Middleware Architect, REST GraphQL Webhook Integration Dubai, Sanu Khan",
    ogType: "website",
    h1: "Enterprise API & Systems Integration Architecture in Dubai, UAE",
    summary:
      "Contract-first REST, GraphQL, webhook, and event-driven integration layers connecting digital commerce, ERP (SAP), CRM, payment gateways, and logistics across the GCC.",
    sections: [
      "SAP, ERP, CRM & Omnichannel Commerce Integration",
      "Idempotent Event Brokers, Anti-Corruption Layers & Observability",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        {
          name: "API Integration Services",
          path: "/api-integration-services",
        },
      ]),
    ],
  },
  {
    route: "/nodejs-developer-uae",
    canonicalPath: "/nodejs-developer-uae",
    title:
      "Senior Node.js Developer & Backend Architect in Dubai, UAE | Sanu Khan",
    description:
      "Senior Node.js & TypeScript Backend Architect in Dubai, UAE building high-throughput APIs, NestJS/Express microservices, event-driven workers, and enterprise integrations.",
    keywords:
      "Node.js Developer UAE, Senior Node.js Architect Dubai, TypeScript Backend Engineer UAE, NestJS Microservices Dubai, High Throughput API Engineering UAE, Sanu Khan",
    ogType: "website",
    h1: "Senior Node.js Developer & Backend Architect in Dubai, UAE",
    summary:
      "Architecting low-latency, fault-tolerant Node.js and TypeScript backend services, API gateways, and asynchronous event pipelines for enterprise workloads.",
    sections: [
      "High-Throughput Node.js & TypeScript Microservices",
      "Resilient Caching, Queue Processing & Database Optimization",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Node.js Developer UAE", path: "/nodejs-developer-uae" },
      ]),
    ],
  },
  {
    route: "/react-developer-dubai",
    canonicalPath: "/react-developer-dubai",
    title:
      "Senior React & Next.js Frontend Architect in Dubai, UAE | Sanu Khan",
    description:
      "Senior React, Next.js, and TypeScript Frontend Architect in Dubai, UAE delivering accessible, bilingual (LTR/RTL), Core Web Vitals-optimized web applications and design systems.",
    keywords:
      "React Developer Dubai, Senior Frontend Architect UAE, Next.js Developer Dubai, TypeScript UI Engineering UAE, Bilingual RTL Web Applications Dubai, Core Web Vitals Optimization UAE, Sanu Khan",
    ogType: "website",
    h1: "Senior React & Next.js Frontend Architect in Dubai, UAE",
    summary:
      "Designing and engineering high-performance React, Next.js, and TypeScript applications with bilingual English/Arabic (LTR/RTL) support and strict Core Web Vitals.",
    sections: [
      "Component Design Systems & State Architecture",
      "Bilingual LTR/RTL Engineering & Core Web Vitals Performance",
    ],
    schemas: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "React Developer Dubai", path: "/react-developer-dubai" },
      ]),
    ],
  },
];

const fetchDevToArticles = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEVTO_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=100`,
      { signal: controller.signal },
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((post) => typeof post?.slug === "string" && post.slug.trim())
      .map((post) => {
        const slug = post.slug.trim();
        const canonicalPath = `/blog/${slug}`;
        const title = `${post.title} | Sanu Khan`;
        const description =
          post.description ||
          `${post.title} — Technical article by Sanu Khan, Solution Architect & Software Engineer in Dubai, UAE.`;
        const tags = Array.isArray(post.tag_list) ? post.tag_list : [];
        const keywords = [
          ...tags,
          "Sanu Khan",
          "Software Architecture",
          "Engineering Blog",
        ].join(", ");
        const ogImage = post.cover_image || post.social_image || DEFAULT_OG_IMAGE;
        return {
          route: canonicalPath,
          canonicalPath,
          title,
          description,
          keywords,
          ogType: "article",
          ogImage,
          publishedTime: post.published_at,
          h1: post.title,
          summary: description,
          sections: [
            `Published by Sanu Khan — Solution Architect & Tech Lead in Dubai, UAE`,
            tags.length > 0 ? `Topics: ${tags.join(", ")}` : "Technical Engineering Note",
          ],
          schemas: [
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: canonicalPath },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${SITE}${canonicalPath}#article`,
              headline: post.title,
              description,
              url: `${SITE}${canonicalPath}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE}${canonicalPath}`,
              },
              image: ogImage,
              datePublished: post.published_at,
              dateModified: post.edited_at || post.published_at,
              author: { "@id": `${SITE}/#person` },
              publisher: { "@id": `${SITE}/#person` },
              keywords: tags.join(", "),
            },
          ],
        };
      });
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
};

const buildSemanticShell = (page) => {
  const sectionItems = (page.sections || [])
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");

  return `<div id="root"><div class="container-narrow" style="padding-top:4rem;padding-bottom:4rem"><header><nav aria-label="Primary Static Navigation"><a href="/">Sanu Khan</a> · <a href="/about">About</a> · <a href="/projects">Projects</a> · <a href="/software-engineer-uae">Services</a> · <a href="/tools">Tools</a> · <a href="/blog">Blog</a> · <a href="/faq">FAQ</a> · <a href="/contact">Contact</a></nav></header><main id="main-content"><article><h1>${escapeHtml(
    page.h1 || page.title,
  )}</h1><p>${escapeHtml(page.summary || page.description)}</p>${
    sectionItems ? `<ul>${sectionItems}</ul>` : ""
  }</article></main></div></div>`;
};

const renderRouteHtml = (template, page) => {
  const canonicalUrl = `${SITE}${page.canonicalPath}`;
  const arAlternateUrl = `${canonicalUrl}?lang=ar`;
  const ogImage = page.ogImage || DEFAULT_OG_IMAGE;

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
  );

  // Replace meta keywords
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`,
  );

  // Replace canonical link
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
  );

  // Replace hreflang links
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(canonicalUrl)}" />`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="ar"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="ar" href="${escapeHtml(arAlternateUrl)}" />`,
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />`,
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(page.ogType || "website")}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`,
  );

  // Inject route-specific JSON-LD schemas before </head>
  if (Array.isArray(page.schemas) && page.schemas.length > 0) {
    const schemaScripts = page.schemas
      .map(
        (schemaObj) =>
          `    <script type="application/ld+json" data-seo-schema="true">${JSON.stringify(
            schemaObj,
          )}</script>`,
      )
      .join("\n");
    html = html.replace("</head>", `${schemaScripts}\n  </head>`);
  }

  // Inject semantic crawlable content inside <div id="root"></div>
  html = html.replace(
    /<div id="root"><\/div>/i,
    buildSemanticShell(page),
  );

  return html;
};

const main = async () => {
  const distDir = resolve(process.cwd(), "dist");
  const rootHtmlPath = join(distDir, "index.html");
  if (!existsSync(rootHtmlPath)) {
    console.error("[prerender-routes] dist/index.html not found.");
    process.exit(1);
  }

  const template = readFileSync(rootHtmlPath, "utf8");
  const devtoPages = await fetchDevToArticles();

  const seenRoutes = new Set(staticRoutes.map((p) => p.route));
  const allPages = [
    ...staticRoutes,
    ...devtoPages.filter((p) => !seenRoutes.has(p.route)),
  ];

  for (const page of allPages) {
    const rendered = renderRouteHtml(template, page);
    const outPath =
      page.route === "/"
        ? rootHtmlPath
        : join(distDir, page.route.replace(/^\/+/, ""), "index.html");

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, rendered, "utf8");
  }

  console.log(
    `[prerender-routes] Generated SEO-complete static HTML for ${allPages.length} routes.`,
  );
};

await main();
