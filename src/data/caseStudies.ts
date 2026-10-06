export interface CaseStudyDecision {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  summary: string;
  context: string;
  problem: string;
  constraints: string[];
  architectureDiagramText: string;
  diagramStyle?: "flow" | "wide" | "tree";
  keyDecisions: CaseStudyDecision[];
  failureModel: string;
  role: string;
  outcomes: string[];
  lessons: string;
  wouldRevisitToday: string;
  themes: string[];
  systemsInvolved: string[];
}

export const flagshipCaseStudies: CaseStudy[] = [
  {
    slug: "real-estate-erp-architecture",
    title: "AI-Assisted Real Estate ERP Architecture",
    subtitle: "Designing a multi-branch property, leasing, payments, maintenance and inventory platform in a 25-hour AI-assisted product engineering sprint.",
    domain: "Real Estate Operations & Product Architecture",
    summary: "An architecture-first ERP concept that turns fragmented property operations into one branch-aware operational platform, with financial invariants, auditable workflows and a permission-aware AI assistant.",
    context: "The real-estate operation needed one platform for branches, owners, tenants, properties, agreements, collections, owner payouts, maintenance, procurement, inventory, reporting and documents. I approached it as a solo product engineering sprint with Codex and Antigravity: discovery, domain modelling, UX, architecture and an interactive prototype.",
    problem: "The system had to make complex real-estate operations feel simple without compromising branch isolation, lease availability, financial correctness or inventory traceability. The portfolio challenge was to prove the architecture and core workflows in 25 hours without presenting a projected ERP as a finished production system.",
    constraints: [
      "Every sensitive read and write must satisfy both permission and active-branch authorization",
      "One directly leasable property record must never have overlapping active tenant agreements",
      "Posted payments, receipts and stock movements must remain auditable and correctable without silent edits",
      "The prototype needed a credible path from low-cost deployment to production hardening without shared-server coupling"
    ],
    architectureDiagramText: `
  [ Angular SPA ]
        │ HTTPS / JSON
        ▼
  [ Laravel REST API ]
   ├── Branch Context + RBAC + Policies
   ├── Domain Services + Transaction Boundaries
   ├── Availability + Installment Rules
   ├── Payment / Receipt / Inventory Workflows
   └── Permission-aware AI Tools
        │
        ▼
  [ MySQL ]  ── [ Private Files ]  ── [ Notifications ]

  Owner → Property → Owner Agreement → Tenant Agreement
  Payment → Receipt       PO Receiving → Stock Movement
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "Simplified Direct-Property Model",
        description: "Represented every independently leasable flat, villa, shop or office as a Property record, removing unnecessary rooms, beds and rentable-component hierarchies while preserving leasing behaviour."
      },
      {
        title: "Branch Tenancy as a Security Boundary",
        description: "Made branch context first-class across middleware, policies, queries and foreign-key validation so a record ID alone can never authorize cross-branch access."
      },
      {
        title: "Server-Authoritative Invariants",
        description: "Kept availability, installment totals, outstanding balances and inventory balances inside transactional application rules rather than trusting frontend calculations."
      },
      {
        title: "AI as a Narrow Assistant Layer",
        description: "Designed natural-language operational queries and draft actions around permission-aware tools, with explicit confirmation required for posting payments, activating agreements or scrapping stock."
      }
    ],
    failureModel: "Financial and operational workflows are treated as atomic boundaries: agreement plus schedule, payment plus receipt, PO receiving plus stock, and work-order consumption plus stock either commit together or fail together. Posted records use void, reverse or replacement patterns. For deployment, the lean path is a managed MySQL database, one small application service and object storage for private documents—avoiding the operational drag of shared hosting while leaving room to scale workers and notifications independently.",
    role: "Solo Solution Architect & Product Engineer — used Codex and Antigravity to move from domain discovery to an interactive ERP prototype in 25 hours, while defining the information architecture, design system, Laravel + Angular boundaries, database model, security invariants and core leasing and payment flows.",
    outcomes: [
      "A coherent multi-branch ERP concept covering 15+ operational modules and 30+ planned workflows",
      "A reduced property model that lowered schema and UX complexity without losing independent leasing capability",
      "A clear architecture for branch-safe access, no-double-booking, immutable financial posting and movement-based inventory",
      "A practical low-cost deployment direction that keeps infrastructure simple without relying on shared servers"
    ],
    lessons: "The fastest path was not generating more features; it was making the domain boundaries explicit early. A smaller model with clear invariants gives AI-assisted development something reliable to build on.",
    wouldRevisitToday: "I would harden the prototype with automated authorization and invariant tests, managed backups, queue workers, rate limiting, observability and deployment pipelines before calling it production-ready. The architecture is designed to grow; the 25-hour claim is for the design and interactive prototype sprint.\n\n\"Its not about the features of tools, its how to use it to make it better\"",
    themes: [
      "Modular Monolith",
      "Branch Tenancy",
      "RBAC",
      "Financial Integrity",
      "Availability Rules",
      "Inventory Traceability",
      "AI-Assisted Engineering",
      "Low-Cost Deployment"
    ],
    systemsInvolved: ["Angular", "Laravel REST API", "MySQL", "Private Storage", "AI Tool Layer", "Managed Deployment"]
  },
  {
    slug: "garage-management-and-diagnostics",
    title: "Garage Management & Diagnostic Intelligence Platform",
    subtitle: "Architecting a workshop operating system that connects vehicle diagnosis, service execution, resource allocation and predictive spare-parts intelligence.",
    domain: "Automotive Service Operations & Applied ML",
    summary: "A modular garage platform combining deep spare-parts inventory, service work orders, technician and bay allocation, machine-diagnosis connectors, generated reports and ML-assisted demand and lifespan forecasting.",
    context: "Independent garages and multi-site workshops need to coordinate customers, vehicles, diagnosis, estimates, work orders, technicians, service bays, parts and suppliers without losing the link between a diagnostic signal and the repair action. The architecture treats the workshop as one operational system instead of a collection of disconnected point tools.",
    problem: "A diagnosis often arrives in one tool, the repair decision is made in another, and parts availability is checked manually. That creates repeat inspections, incorrect allocations, parts shortages, idle technicians and weak visibility into which components actually fail over time.",
    constraints: [
      "Diagnostic connectors must normalize different machine and vehicle data formats without coupling the core workflow to one vendor",
      "A work order must reserve the right technician, bay, tools and parts while preserving an auditable service history",
      "Inventory must track serialized and non-serialized spares, kits, substitutes, returns, wastage, transfers and reorder thresholds",
      "ML recommendations can guide demand, movement and lifespan decisions but cannot silently approve purchases or replace technician judgement"
    ],
    architectureDiagramText: `
  [ Angular Workshop Console ]
                │ HTTPS / JSON
                ▼
  [ Java MVC Application ]
   ├── Auth / Roles / Branch Context
   ├── Vehicle + Customer Service History
   ├── Work Order + Resource Allocation
   ├── Parts Ledger + Procurement
   ├── Diagnostic Connector Gateway
   └── ML Recommendation API
                │
        [ Hibernate / Transaction Layer ]
                │
                ▼
  [ MySQL / Audit Store ]  [ Object Storage / Reports ]

  AWS VPC → private application/data subnets → load balancer
       → DNS resolver → controlled garage and diagnostic integrations
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "Diagnostic Adapter Boundary",
        description: "Placed vendor and machine-diagnostic connectors behind a normalized gateway so the service domain receives stable fault codes, measurements, severity and evidence regardless of source protocol."
      },
      {
        title: "Work Order as the Operational Spine",
        description: "Connected diagnosis, estimate, approval, resource reservation, parts consumption, technician notes, quality checks and final report through an explicit work-order lifecycle."
      },
      {
        title: "Movement-Based Spare Ledger",
        description: "Kept purchases, reservations, issues, returns, transfers, adjustments and scrap as immutable movements, deriving stock and cost instead of trusting an editable quantity field."
      },
      {
        title: "ML as Decision Support",
        description: "Used spare density, movement velocity, failure history and remaining-life signals to recommend reorder levels and predictive replacements while keeping approval and safety decisions human-controlled."
      }
    ],
    failureModel: "A diagnostic connector can fail without blocking manual work-order creation; the report records source, confidence and missing evidence. Resource reservations and parts consumption commit transactionally with the work order. If an ML service is unavailable, the platform falls back to deterministic movement and threshold rules. The deployment baseline uses an AWS VPC, private subnets, a VPS or small application nodes behind load balancing, DNS resolution and managed backups, with connectors isolated from the database.",
    role: "Solution Architect & Product Engineer — defined the domain boundaries, normalized diagnostic contract, service workflow, inventory ledger, resource allocation model, ML decision points and AWS network/deployment shape across Java MVC, Hibernate and Angular.",
    outcomes: [
      "One traceable flow from machine diagnosis to generated report, approved work order and consumed spare parts",
      "A resource-aware workshop schedule covering technicians, service bays, tools and parts availability",
      "Deep inventory visibility for spare movement, density, substitutions, returns, wastage and predictive lifespan",
      "A pragmatic Java and AWS architecture that can begin on a lean VPS footprint and scale behind load balancing"
    ],
    lessons: "The valuable unit is not the diagnostic code or the stock count by itself; it is the decision chain that explains what was found, why a repair was chosen, which resources were used and what the next service should expect.",
    wouldRevisitToday: "I would validate connector contracts with real diagnostic equipment, add event-driven ingestion for high-volume telemetry, measure ML precision against technician outcomes and harden the AWS topology with autoscaling, observability, backups and disaster recovery before production rollout.",
    themes: [
      "Java MVC",
      "Hibernate",
      "Angular",
      "Diagnostic Integrations",
      "Work Order Orchestration",
      "Resource Allocation",
      "Inventory Intelligence",
      "Predictive ML",
      "AWS VPC"
    ],
    systemsInvolved: ["Angular", "Java MVC", "Hibernate", "MySQL", "Diagnostic Connectors", "AWS VPC", "Load Balancer", "DNS Resolver"]
  },
  {
    slug: "headless-healthcare-digital-experience",
    title: "منصة التجربة الرقمية الصحية وHeadless CMS",
    subtitle: "فصل إدارة المحتوى عن تجربة ويب صحية آمنة وقائمة على المكونات ومحسنة لمحركات البحث.",
    domain: "التجارب الرقمية الصحية والعمارة المنفصلة",
    summary: "منصة Next.js للعرض والتطبيق مع WordPress كنظام CMS منظم، متصلة عبر عمليات GraphQL مضبوطة وطبقة خادم وتخزين مؤقت وإعادة تحقق آمنة.",
    context: "احتاجت المؤسسة الصحية إلى تحديث منصة تسويقية قائمة مع الحفاظ على هويتها البصرية ومنح المحررين مرونة أكبر وإنشاء أساس قابل للتوسع للمتخصصين والخدمات والأقسام والمواقع والتنقل وSEO.",
    problem: "كان يجب دعم التحرير الغني دون السماح لنظام CMS بالتحكم في العرض أو كشف WordPress للمتصفح أو نشر استجابات GraphQL الخام داخل مكونات React، مع الحفاظ على الأداء وإمكانية الوصول والمعاينة والأمان.",
    constraints: [
      "يبقى WordPress مرجع المحتوى بينما تملك Next.js العرض والتوجيه والبيانات الوصفية وتجربة المستخدم",
      "لا يصل المتصفح إلى WordPress مباشرة ولا تنكشف الأسرار الخاصة بالخادم",
      "تتحول البنى المنظمة إلى مكونات معتمدة بدلاً من ترميز page-builder عشوائي",
      "تؤثر تحديثات المحتوى على ذاكرة التخزين الخاصة بالكيانات المتأثرة فقط مع الحفاظ على المعاينة الآمنة"
    ],
    architectureDiagramText: `
  [ محررو المحتوى ]
          │
          ▼
  [ WordPress + Custom Plugin ]
   ├── محتوى منظم / ACF
   ├── التنقل / القوائم الكبيرة
   ├── SEO / الإعدادات العامة
   └── المتخصصون / الخدمات / الأقسام / المواقع
          │
          ▼
  [ WPGraphQL ] → [ عمليات معتمدة ومثبتة ]
          │
          ▼
  [ طبقة بيانات خادم Next.js ]
   ├── التحقق + تحويل الأنواع
   ├── View Models + SEO
   ├── Cache Tags + Revalidation
   └── المعاينة + معالجة الأخطاء
          │
          ▼
  [ React Components ] → [ HTML مؤقت ] → [ CDN ]
`,
    diagramStyle: "flow",
    keyDecisions: [
      { title: "حد CMS على الخادم", description: "تم إبقاء اتصال WordPress خلف Next.js حتى لا يصل المتصفح إلى CMS مباشرة ولا تنكشف بيانات الاعتماد." },
      { title: "محتوى منظم بدلاً من Page Builder", description: "تم نمذجة المتخصصين والخدمات والأقسام والمواقع والتنقل والأقسام القابلة لإعادة الاستخدام كمحتوى منظم." },
      { title: "View Models مملوكة للواجهة", description: "أضيفت طبقة تحقق وتحويل ونماذج typed بين GraphQL وReact لمعالجة الحقول الفارغة وتطور المخطط مركزياً." },
      { title: "إعادة تحقق موجهة", description: "استخدمت وسوم الكاش وwebhooks موقعة بـ HMAC حتى تؤثر تغييرات المحرر على الصفحات والكيانات المتأثرة فقط." }
    ],
    failureModel: "ترفض البيانات غير الصحيحة أو تطبع قبل وصولها إلى المكونات. ولا يمكن لطلب إعادة تحقق مزور أو معاد استخدامه إبطال الكاش بسبب التحقق من POST وHMAC والطابع الزمني وقائمة الأحداث والحمولة. تستخدم المعاينة حد ثقة موثقاً ولا تشارك عبر الكاش العام، بينما يستمر المحتوى المخزن مؤقتاً عند تعطل CMS.",
    role: "معماري حلول ومهندس Full-Stack — صممت عمارة Next.js وWordPress plugin وعقود WPGraphQL ونماذج المحتوى وView Models وSEO والكاش والمعاينة والأمان وتوافق إصدارات الواجهة والخلفية.",
    outcomes: [
      "منصة Headless منفصلة يدير فيها المحررون المحتوى المنظم دون التحكم في العرض",
      "نظام مكونات قابل لإعادة الاستخدام للأبطال والأقسام والبطاقات والمتخصصين والخدمات والأسئلة الشائعة",
      "طبقة GraphQL وخادم مضبوطة مع التحقق والعمليات المعتمدة وغياب mutations العامة",
      "إبطال موجه للكاش وتدفقات معاينة وإعادة تحقق موقعة وبيئات تطوير وتجربة وإنتاج معزولة"
    ],
    lessons: "العمارة المنفصلة ليست مجرد وضع CMS خلف API؛ الحد المهم هو العقد بين نية المحرر ومسؤولية الواجهة: منظم بما يكفي للإدارة ومقيد بما يكفي للحفاظ على اتساق المنتج.",
    wouldRevisitToday: "سأوسع المراقبة حول زمن GraphQL ونسب إصابة الكاش، وأؤتمت فحوص توافق العقود بين إصدارات المستودعات، وأضيف اختبارات مرونة لتعطل CMS وإساءة المعاينة وإعادة استخدام webhooks والحمولات الكبيرة.",
    themes: ["Next.js App Router", "React Server Components", "WordPress Headless CMS", "WPGraphQL", "Backend for Frontend", "Structured Content", "SEO Architecture", "Cache Revalidation", "HMAC Webhooks", "Secure Preview"],
    systemsInvolved: ["Next.js", "React", "TypeScript", "WordPress", "ACF", "WPGraphQL", "WP Engine", "CDN", "CI/CD"]
  },
  {
    slug: "headless-healthcare-digital-experience",
    title: "Headless Healthcare & Digital Experience Platform",
    subtitle: "Separating editorial content management from a secure, component-driven and SEO-optimized healthcare web experience.",
    domain: "Healthcare Digital Experience & Headless Architecture",
    summary: "A Next.js presentation platform with WordPress as a structured headless CMS, connected through controlled GraphQL operations, server-side mapping, targeted caching and secure content revalidation.",
    context: "The healthcare organization needed to modernize an established marketing platform while preserving its visual language, giving editors more flexibility and creating a scalable foundation for specialists, services, departments, locations, navigation, SEO and future integrations.",
    problem: "The platform had to support rich editorial workflows without allowing CMS changes to control presentation, expose WordPress to normal browser traffic or scatter raw CMS responses throughout React components. Performance, accessibility, SEO, preview and security all had to remain first-class concerns.",
    constraints: [
      "WordPress must remain the content and editorial authority while Next.js owns presentation, routing, metadata and user experience",
      "Browser traffic must not query WordPress directly or expose server-side credentials and implementation details",
      "Reusable CMS structures must map to approved frontend components instead of arbitrary page-builder markup",
      "Content updates must invalidate only affected cached entities while preserving safe preview, rollback and deployment boundaries"
    ],
    architectureDiagramText: `
  [ Content Editors ]
          │
          ▼
  [ WordPress Admin + Custom Plugin ]
   ├── Structured Content / ACF
   ├── Navigation / Mega Menus
   ├── SEO / Global Settings
   └── Specialists / Services / Departments / Locations
          │
          ▼
  [ WPGraphQL ] → [ Approved / Persisted Operations ]
          │
          ▼
  [ Next.js Server Data Layer ]
   ├── Validation + Type Mapping
   ├── View Models + SEO Mapping
   ├── Cache Tags + Revalidation
   └── Preview + Error Handling
          │
          ▼
  [ React Components ] → [ Static / Cached HTML ] → [ CDN ]
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "Server-Side CMS Boundary",
        description: "Kept all WordPress communication behind Next.js so browser traffic never reaches the CMS directly and credentials remain server-only."
      },
      {
        title: "Structured Content, Not Page-Builder Markup",
        description: "Modeled specialists, services, departments, locations, navigation and reusable sections as structured content mapped to approved component patterns."
      },
      {
        title: "Frontend-Owned View Models",
        description: "Added validation, mappers and typed view models between GraphQL responses and React components, centralizing nullable-field handling and schema evolution."
      },
      {
        title: "Targeted Cache Revalidation",
        description: "Used entity cache tags and signed HMAC webhooks so editorial changes invalidate only affected pages, lists, navigation or global settings."
      }
    ],
    failureModel: "Malformed GraphQL data is rejected or normalized before it reaches the component tree. A failed or forged revalidation request cannot invalidate caches because the endpoint requires POST, HMAC verification, timestamp and replay checks, allow-listed events and bounded payloads. Preview content uses a separate authenticated trust boundary and is never shared through public caches. If the CMS is unavailable, cached public content can continue serving while errors remain observable.",
    role: "Solution Architect & Full-Stack Engineer — designed and engineered the Next.js application boundary, WordPress plugin architecture, WPGraphQL contracts, structured content models, frontend view models, SEO, caching, preview, security and FE/BE release compatibility.",
    outcomes: [
      "A decoupled headless platform where editorial teams manage structured content without controlling presentation",
      "A reusable component-driven design system for heroes, content sections, cards, specialists, services, statistics, FAQs and CTAs",
      "A controlled GraphQL and server-side data layer with validation, generated types, approved operations and no public mutations",
      "Targeted cache invalidation, signed preview/revalidation workflows and isolated development, staging and production environments"
    ],
    lessons: "Headless architecture is not simply moving a CMS behind an API. The valuable boundary is the contract between editorial intent and frontend responsibility: structured enough for people to manage, constrained enough for the product to stay coherent.",
    wouldRevisitToday: "I would extend observability around GraphQL latency and cache hit ratios, automate contract compatibility checks across submodule revisions, and add more resilience testing for CMS outages, preview abuse, oversized payloads and webhook replay attempts.",
    themes: [
      "Next.js App Router",
      "React Server Components",
      "WordPress Headless CMS",
      "WPGraphQL",
      "Backend for Frontend",
      "Structured Content",
      "SEO Architecture",
      "Cache Revalidation",
      "HMAC Webhooks",
      "Secure Preview"
    ],
    systemsInvolved: ["Next.js", "React", "TypeScript", "WordPress", "ACF", "WPGraphQL", "WP Engine", "CDN", "CI/CD"]
  },
  {
    slug: "enterprise-retail-integration",
    title: "Enterprise Retail Integration",
    subtitle: "Connecting product, inventory, pricing and order flows across enterprise and commerce platforms.",
    domain: "Enterprise Retail & Omnichannel Commerce",
    summary: "Connecting product, inventory, pricing and order flows across enterprise ERP, PIM, e-commerce storefronts, and OMS without coupling downstream systems to the core.",
    context: "Multi-brand enterprise retail environment involving legacy back-office systems (SAP), Product Information Management (PIM), headless commerce channels (Shopify, Kibo), and Order Management Systems (OMS).",
    problem: "Business-critical data such as product catalogs, pricing, inventory, and orders needed to move reliably between systems across 9 regional markets without tightly coupling every downstream channel to the source ERP or causing stock drift during flash sales.",
    constraints: [
      "Synchronous ERP calls under peak load caused cascading failures across retail channels",
      "Product updates arrived out-of-order, leading to stale pricing or missing attributes",
      "Multi-region tax rules and currency conversions differed by brand and sales territory",
      "Zero downtime acceptable for live commerce storefronts during inventory sync"
    ],
    architectureDiagramText: `
  [ SAP ERP ]
       │
       ▼ (Async Payload)
  [ Integration Layer API ]  ──── (Validation & Contract Gate)
       │
       ▼
  [ Event Bus (Azure Event Hubs / Kafka) ]
   ├──► [ PIM Synchronization Worker ]  ────►  Commerce Channels (Shopify / Kibo)
   ├──► [ Inventory Processing Engine ] ────►  Real-time Stock Ledger
   └──► [ OMS Order Routing Pipeline ] ────►  Fulfillment & Warehouse APIs
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "Event-Driven Asynchronous Integration",
        description: "Decoupled downstream commerce endpoints from SAP using event streams, enabling channels to process updates independently."
      },
      {
        title: "Contract-First Schema Validation",
        description: "Enforced strict JSON schema validation at the integration gate to reject malformed SAP payloads before publishing."
      },
      {
        title: "Idempotent Event Consumers",
        description: "Designed consumer handlers with state hashing so duplicate or out-of-order event deliveries never corrupted inventory counts."
      },
      {
        title: "Dead-Letter & Exponential Backoff Queues",
        description: "Isolated failing channel syncs into dead-letter queues with automated exponential backoff retries and alert telemetry."
      }
    ],
    failureModel: "When downstream PIM or commerce endpoints become unavailable, events buffer durably in Event Hubs. Upstream checkout and SAP operations remain completely unaffected. Replay mechanisms allow backfilling historical state without data loss once endpoints recover.",
    role: "Solution Architect & Technical Lead — responsible for integration architecture, event contracts, failure handling models, and leading engineering delivery across cross-functional teams.",
    outcomes: [
      "Near real-time catalog, price, and inventory synchronization across 9 regional markets",
      "Eliminated cascading storefront outages caused by legacy ERP sync bottlenecks",
      "Zero stock drift or price mismatch incidents recorded during high-concurrency campaigns"
    ],
    lessons: "Integration failures are rarely about payload syntax; they are almost always about ambiguous data ownership and unhandled temporal ordering. Explicit idempotency keys and state authority rules must be established upfront.",
    wouldRevisitToday: "Replace custom polling retry mechanisms with event-driven saga orchestrators (such as Temporal or Azure Durable Functions) to handle complex multi-step transaction rollbacks cleanly.",
    themes: [
      "Event-Driven Integration",
      "Serverless Processing",
      "API Contracts",
      "Async Workflows",
      "Data Ownership",
      "Idempotency",
      "Retry Handling",
      "Observability"
    ],
    systemsInvolved: ["SAP", "PIM", "Commerce", "OMS", "Integration APIs", "Event Bus"]
  },
  {
    slug: "airline-retailing-aggregation",
    title: "Airline Retailing & Aggregation",
    subtitle: "Normalising airline content and booking workflows across B2B and B2C platforms.",
    domain: "Travel Technology & Airline Distribution",
    summary: "Aggregating multi-supplier NDC airline content, pricing, and booking workflows into a unified, high-availability B2B marketplace API.",
    context: "Enterprise travel technology environment spanning a B2B airline ticketing marketplace, NDC airline content management system, and B2B aggregation platform.",
    problem: "Integrating legacy GDS suppliers alongside modern NDC (New Distribution Capability) APIs — each with distinct XML schemas, erratic latency profiles, and inconsistent error codes — into a fast, reliable travel booking API.",
    constraints: [
      "Supplier API response latencies varied wildly from 200ms to 4000ms",
      "Seat availability and fare offers expired within short 5-minute windows",
      "Airline NDC schema versions differed significantly by carrier and implementation phase",
      "High search-to-book ratio requiring aggressive caching without serving stale fares"
    ],
    architectureDiagramText: `
  [ B2B Travel Portals / Clients ]
               │
               ▼
  [ Aggregation Gateway & Normalizer ] ─── (Canonical Offer Schema)
               │
   ┌───────────┼───────────┐
   ▼           ▼           ▼
[ NDC Adapter ] [ NDC Adapter ] [ GDS Adapter ]
(Carrier A)     (Carrier B)     (Amadeus/Sabre)
`,
    diagramStyle: "wide",
    keyDecisions: [
      {
        title: "Canonical Domain Representation",
        description: "Created a unified internal canonical model for flight offers, seat maps, and ancillaries to abstract carrier-specific XML/JSON structures."
      },
      {
        title: "Circuit-Breaker Pattern on External Calls",
        description: "Wrapped supplier HTTP clients in circuit breakers to fail fast when carrier NDC endpoints experienced latency spikes."
      },
      {
        title: "Async Parallel Fan-Out Search",
        description: "Dispatched search queries across suppliers in parallel with a strict cutoff timeout, returning partial aggregated results instead of waiting for the slowest endpoint."
      },
      {
        title: "Stateful Booking Saga",
        description: "Built a multi-step booking state machine to coordinate hold-seat, payment-charge, and ticket-issuance phases safely."
      }
    ],
    failureModel: "If a carrier NDC service times out or returns non-retryable errors, the aggregator gracefully excludes that carrier's offers from the search response without failing the overall search request. Seat hold failures automatically trigger refund/release sagas.",
    role: "Solution Architect & Platform Lead — designed supplier normalization layer, canonical schemas, resiliency patterns, and booking state machines.",
    outcomes: [
      "Unified multi-supplier booking flow supporting B2B travel partners",
      "Sub-second initial search results via parallel fan-out and early response streaming",
      "Resilient operation through carrier outage windows without system-wide downtime"
    ],
    lessons: "When aggregating third-party APIs with unpredictable SLAs, contract isolation and circuit breakers are non-negotiable. Never let a single slow supplier degrade your entire client response time.",
    wouldRevisitToday: "Introduce gRPC protocols for internal supplier adapter communication to reduce payload serialization latency when processing heavy XML-to-JSON transformations.",
    themes: [
      "Supplier Integration",
      "API Normalization",
      "Retailing Workflows",
      "Booking Flows",
      "Service Boundaries",
      "Fault Tolerance",
      "Contract Consistency",
      "Distributed Integrations"
    ],
    systemsInvolved: ["NDC APIs", "GDS Providers", "Aggregation Gateway", "Booking Engine", "B2B Marketplace"]
  },
  {
    slug: "automotive-omnichannel-platform",
    title: "Automotive Omnichannel Platform",
    subtitle: "Creating a shared workflow across digital and operational vehicle processes.",
    domain: "Automotive Retail & Fleet Operations",
    summary: "Centralizing used-car intake, inspection, reconditioning, pricing, and digital showroom sync across physical dealerships and online platforms.",
    context: "Omnichannel automotive enterprise with physical dealerships, inspection yards, centralized reconditioning hubs, and digital vehicle listing platforms.",
    problem: "Vehicle lifecycle states (intake, 150-point inspection, reconditioning, pricing approval, reservation, sale) were tracked in fragmented spreadsheets and legacy dealership software, creating inventory lag and double-booking risks.",
    constraints: [
      "Yard inspection apps required offline capability due to spotty cellular coverage in vehicle lots",
      "Price updates required strict approval workflows before reflecting on digital showrooms",
      "Multi-channel reservations needed instant lock mechanism to prevent simultaneous customer bookings",
      "Legacy dealership management systems (DMS) lacked real-time webhook support"
    ],
    architectureDiagramText: `
  [ Mobile Yard App ] ──► (Offline Queue & Sync)
            │
            ▼
  [ Vehicle Lifecycle FSM & Central State Store ]
            │
   ┌────────┴────────┐
   ▼                 ▼
[ Dealer Ops ERP ] [ Digital Showroom APIs ] ──► (Web / Mobile Channels)
`,
    diagramStyle: "tree",
    keyDecisions: [
      {
        title: "Centralized Finite State Machine (FSM)",
        description: "Modeled vehicle lifecycle into explicit, immutable state transitions (Draft → Inspected → Reconditioned → Priced → Listed → Reserved → Sold)."
      },
      {
        title: "Offline-First Mobile Synchronization",
        description: "Built mobile inspection tools with local SQLite persistence and delta-sync background sync when connection is restored."
      },
      {
        title: "Distributed Lock on Vehicle Reservation",
        description: "Enforced atomic reservation locks using Redis to prevent race conditions across online buyers and physical showroom sales reps."
      },
      {
        title: "Event-Driven Omnichannel Distribution",
        description: "Broadcast vehicle status and price updates via webhooks to digital channels the moment a vehicle enters 'Priced' state."
      }
    ],
    failureModel: "Offline inspections store data locally and sync with conflict detection upon reconnecting. If a pricing update fails sync to an external digital channel, the vehicle status remains in 'Pending Sync' until verified, preventing incorrect price displays.",
    role: "Solution Architect — defined domain boundaries, state transition rules, offline sync strategies, and integration contracts between dealership operations and digital channels.",
    outcomes: [
      "Single source of truth for used-car inventory state across physical and digital channels",
      "Reduced vehicle time-to-market from trade-in intake to live digital listing",
      "Eliminated vehicle double-booking across physical lots and online reservations"
    ],
    lessons: "Physical operational workflows always have edge cases software engineers don't anticipate. Build explicit 'Exception / Manual Review' states into your state machine rather than assuming happy path progression.",
    wouldRevisitToday: "Implement event-sourcing for complete vehicle history to enable instant audit playback of reconditioning costs, price drops, and ownership handoffs over time.",
    themes: [
      "Centralized Workflow",
      "Integration Boundaries",
      "Lifecycle State",
      "Data Consistency",
      "Channel Coordination",
      "Operational Visibility"
    ],
    systemsInvolved: ["Dealership DMS", "Inspection Yard App", "Central State Store", "Digital Showroom", "Pricing Engine"]
  },
  {
    slug: "zaakiy-v3rse",
    title: "Zaakiy V3RSE — Operational Intelligence Agentic Platform",
    subtitle: "Designing a configuration-driven, multi-tenant agent platform that combines source-of-truth routing, enterprise RAG, live connectors, deterministic calculations and LLM reasoning.",
    domain: "AI Platforms & Operational Intelligence",
    summary: "Zaakiy V3RSE is an OpsInt platform rather than a document chat application: a shared agent runtime gives each organization a versioned Agent Package, controlled connectors, tenant-scoped knowledge and explainable operational outputs.",
    context: "Organizations need answers that combine stable knowledge with current operational truth. Policies may live in Drive, budgets in Sheets, project status in an API and actual cost in a finance system. Zaakiy V3RSE was shaped as a generic platform where those rules are configured per organization instead of implemented as customer-specific frontend and backend code.",
    problem: "A semantic match alone cannot decide which source is authoritative, whether a user may access it, or how conflicting values should be reconciled. The platform therefore had to coordinate retrieval, live connectors, business rules, deterministic calculations and LLM explanation while preserving tenant isolation and auditability.",
    constraints: [
      "Every tenant-scoped operation must carry server-derived user, organization, role, permission and request context",
      "Stable documents and live operational data must remain separate source categories",
      "Organization behaviour must live in declarative Agent Packages, not customer-specific application code",
      "Only validated and active Agent Package versions may be used by the runtime",
      "LLM output must explain evidence and never become the source of truth for deterministic calculations"
    ],
    architectureDiagramText: `
  [ Next.js / React Operations UI ]
                │ JWT / SSE
                ▼
  [ Spring Boot Modular Monolith ]
   ├── Auth + Tenant Context
   ├── Agent Runtime + Source Routing
   ├── Knowledge Ingestion + Hybrid Retrieval
   ├── Connector Registry + MCP Tools
   ├── Deterministic Calculations
   └── Reports + Audit + Usage
        │             │             │
        ▼             ▼             ▼
  [PostgreSQL]   [pgvector]   [Google / HTTP / MCP]
                         │
                         ▼
                 [ Gemini Provider ]

  Organization → Agent Package → Active Version → Operational Answer
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "Shared Runtime, Tenant-Specific Intelligence",
        description: "The same platform serves multiple organizations while each organization supplies its own Agent Package, sources, terminology, rules, connectors and report definitions."
      },
      {
        title: "Source-of-Truth Routing",
        description: "The runtime decides whether a question needs RAG knowledge, a live structured connector or both before the model receives context."
      },
      {
        title: "Declarative Agent Packages",
        description: "Instructions, domain behaviour, procedures, routing, calculations and conflict rules are versioned files rather than customer-specific Java or React implementations."
      },
      {
        title: "Deterministic Evidence Before Reasoning",
        description: "Backend calculations produce validated values and evidence first; Gemini explains the result rather than inventing financial or operational truth."
      },
      {
        title: "Modular Monolith Before Microservices",
        description: "Spring Boot keeps the initial platform cohesive while domain boundaries allow retrieval, connectors, reports and workflows to scale independently later."
      }
    ],
    failureModel: "A request is rejected when organization context, authorization or source policy is missing. Retrieval always applies organization filters, live connectors are allow-listed, tool execution is audited, and report rendering consumes validated report JSON rather than arbitrary generated HTML. If a source conflicts with an approved authority, the conflict is surfaced instead of silently merged.",
    role: "Product Architect & AI Systems Engineer — defined the Gen-3 product model, multi-tenant boundary, Agent Package contract, runtime flow, source-of-truth strategy, retrieval architecture, connector abstraction, reporting model and security invariants.",
    outcomes: [
      "Reframed Zaakiy from document chat into an operational intelligence platform",
      "Created a reusable onboarding model where a new organization requires configuration, connectors, knowledge indexing and package activation rather than a code fork",
      "Separated enterprise RAG from live structured data so policies, metrics and financial values are handled by the right source",
      "Defined an auditable path from user question to authorized tools, deterministic calculations, evidence and generated operational report",
      "Established a cost-conscious modular-monolith baseline with optional Temporal and Redis only when measured demand requires them"
    ],
    lessons: "The most important AI architecture decision is not which model answers the question. It is defining what the system is allowed to know, which source is authoritative, what must be calculated deterministically and how the answer can be explained and audited.",
    wouldRevisitToday: "I would add stronger package contract testing, connector simulators, retrieval evaluation datasets, tenant-aware PostgreSQL RLS verification and production tracing before onboarding sensitive operational data.",
    themes: [
      "Operational Intelligence",
      "Agentic Runtime",
      "Multi-Tenant Security",
      "Source-of-Truth Routing",
      "Enterprise RAG",
      "MCP Connectors",
      "Deterministic AI Workflows",
      "Modular Monolith"
    ],
    systemsInvolved: [
      "Next.js / React",
      "Spring Boot",
      "PostgreSQL",
      "pgvector",
      "Gemini",
      "Google Drive / Sheets",
      "HTTP / MCP Connectors",
      "Docker"
    ]
  }
];

export const arFlagshipCaseStudies: CaseStudy[] = [
  {
    slug: "real-estate-erp-architecture",
    title: "عمارة نظام ERP عقاري بمساعدة الذكاء الاصطناعي",
    subtitle: "تصميم منصة متعددة الفروع للعقارات والتأجير والمدفوعات والصيانة والمخزون ضمن sprint هندسي مدته 25 ساعة.",
    domain: "عمليات العقارات وعمارة المنتجات",
    summary: "تصور معماري لنظام ERP يحول عمليات العقارات المتفرقة إلى منصة تشغيلية واحدة مع عزل للفروع وسلامة مالية وتدقيق ومساعد ذكاء اصطناعي واعٍ بالصلاحيات.",
    context: "احتاجت عملية العقارات إلى منصة واحدة للفروع والمالكين والمستأجرين والعقارات والاتفاقيات والتحصيل والصيانة والمشتريات والمخزون والتقارير. أدرت المشروع كمهندس منتجات ومعماري حلول منفرد باستخدام Codex وAntigravity.",
    problem: "كان التحدي جعل العمليات العقارية المعقدة بسيطة دون التضحية بعزل الفروع أو صحة العقود والمدفوعات أو تتبع المخزون، مع إثبات العمارة والتدفقات الأساسية خلال 25 ساعة دون الادعاء ببناء نظام إنتاج كامل.",
    constraints: [
      "كل قراءة أو كتابة حساسة يجب أن تمر عبر الصلاحية والفرع النشط",
      "لا يجوز وجود عقود تأجير نشطة متداخلة للعقار نفسه",
      "المدفوعات والإيصالات وحركات المخزون المنشورة قابلة للتدقيق وليست قابلة للتعديل الصامت",
      "يجب أن يبدأ النموذج الأولي بنشر منخفض التكلفة دون الاعتماد على خوادم الاستضافة المشتركة"
    ],
    architectureDiagramText: `
  [ Angular SPA ]
        │ HTTPS / JSON
        ▼
  [ Laravel REST API ]
   ├── سياق الفرع + RBAC + السياسات
   ├── خدمات النطاق + حدود المعاملات
   ├── قواعد التوفر والأقساط
   ├── المدفوعات / الإيصالات / المخزون
   └── أدوات ذكاء اصطناعي واعية بالصلاحيات
        │
        ▼
  [ MySQL ] ── [ ملفات خاصة ] ── [ إشعارات ]
`,
    diagramStyle: "flow",
    keyDecisions: [
      { title: "نموذج عقار مباشر مبسط", description: "تم تمثيل كل وحدة قابلة للتأجير كسجل Property واحد وإزالة التسلسلات غير الضرورية للغرف والأسرة والمكونات." },
      { title: "عزل الفروع كحد أمني", description: "أصبح سياق الفرع أساسياً في الوسيط والسياسات والاستعلامات والتحقق من المفاتيح الأجنبية." },
      { title: "قواعد موثوقة على الخادم", description: "بقيت التوافر والأقساط والأرصدة وحركات المخزون داخل قواعد التطبيق والمعاملات بدلاً من الاعتماد على الواجهة." },
      { title: "الذكاء الاصطناعي كمساعد محدود", description: "تصل الاستعلامات الطبيعية إلى أدوات محددة الصلاحيات، مع تأكيد صريح قبل العمليات الحساسة." }
    ],
    failureModel: "تعمل الاتفاقية مع جدولها، والدفع مع إيصالها، واستلام أمر الشراء مع حركة المخزون كحدود ذرية. تستخدم السجلات المالية المنشورة الإبطال أو العكس أو الاستبدال. ومسار النشر المنخفض التكلفة هو قاعدة MySQL مُدارة وخدمة تطبيق صغيرة وتخزين كائنات خاص، بدلاً من الاستضافة المشتركة.",
    role: "معماري حلول ومهندس منتجات منفرد — استخدمت Codex وAntigravity للانتقال من اكتشاف النطاق إلى نموذج ERP تفاعلي خلال 25 ساعة، مع تحديد العمارة ونظام التصميم وحدود Angular وLaravel وقواعد الأمان.",
    outcomes: [
      "تصور ERP متعدد الفروع يغطي أكثر من 15 وحدة تشغيلية و30 تدفقاً مخططاً",
      "نموذج عقاري مبسط خفض تعقيد قاعدة البيانات وتجربة المستخدم",
      "عمارة واضحة لعزل الفروع ومنع الحجز المزدوج وسلامة المدفوعات وتتبع المخزون",
      "مسار نشر منخفض التكلفة لا يعتمد على خوادم مشتركة"
    ],
    lessons: "لم يكن أسرع طريق هو توليد مزيد من الميزات، بل توضيح حدود النطاق والقواعد أولاً. النموذج الأصغر ذو الثوابت الواضحة يمنح التطوير بمساعدة الذكاء الاصطناعي أساساً موثوقاً.",
    wouldRevisitToday: "سأضيف اختبارات الصلاحيات والثوابت والنسخ الاحتياطية والمراقبة ومحددات المعدل قبل اعتبار النظام جاهزاً للإنتاج. ادعاء 25 ساعة يخص تصميم النموذج الأولي التفاعلي فقط.\n\n\"Its not about the features of tools, its how to use it to make it better\"",
    themes: ["Modular Monolith", "عزل الفروع", "RBAC", "السلامة المالية", "تتبع المخزون", "هندسة بمساعدة الذكاء الاصطناعي", "نشر منخفض التكلفة"],
    systemsInvolved: ["Angular", "Laravel REST API", "MySQL", "Private Storage", "AI Tool Layer", "Managed Deployment"]
  },
  {
    slug: "garage-management-and-diagnostics",
    title: "منصة إدارة الورش وذكاء التشخيص",
    subtitle: "عمارة نظام تشغيل للورش يربط تشخيص المركبات وتنفيذ أوامر العمل وتخصيص الموارد وذكاء قطع الغيار التنبؤي.",
    domain: "عمليات خدمات السيارات والتعلم الآلي التطبيقي",
    summary: "منصة للورش تجمع مخزون قطع الغيار العميق وأوامر الخدمة وتخصيص الفنيين والموارد وموصلات التشخيص وتقارير الإصلاح وتوقع الطلب والعمر الافتراضي للقطع.",
    context: "تحتاج الورش المستقلة ومتعددة الفروع إلى تنسيق العملاء والمركبات والتشخيص والتقديرات وأوامر العمل والفنيين والمواقع وقطع الغيار والموردين دون فقدان الصلة بين إشارة التشخيص وإجراء الإصلاح.",
    problem: "غالباً ما يصل التشخيص من أداة، ويُتخذ قرار الإصلاح في أداة أخرى، ويتم فحص توفر القطعة يدوياً. يؤدي ذلك إلى إعادة الفحص وتخصيص غير صحيح ونقص في القطع وفنيين غير مستغلين وضعف في سجل الأعطال.",
    constraints: [
      "يجب تطبيع تنسيقات أجهزة وموردي التشخيص دون ربط النظام بمورد واحد",
      "يجب أن يربط أمر العمل الفني والموقع والأدوات والقطع مع سجل خدمة قابل للتدقيق",
      "يجب تتبع القطع التسلسلية وغير التسلسلية والبدائل والمرتجعات والهدر والتحويلات",
      "تقدم توصيات التعلم الآلي الدعم فقط ولا تعتمد المشتريات أو تستبدل حكم الفني"
    ],
    architectureDiagramText: `
  [ Angular Workshop Console ]
                │ HTTPS / JSON
                ▼
  [ Java MVC Application ]
   ├── المصادقة والأدوار وسياق الفرع
   ├── المركبات وسجل الخدمة
   ├── أوامر العمل وتخصيص الموارد
   ├── دفتر القطع والمشتريات
   ├── بوابة موصلات التشخيص
   └── واجهة توصيات التعلم الآلي
                │
        [ Hibernate / Transaction Layer ]
                │
                ▼
  [ MySQL / Audit Store ]  [ Object Storage / Reports ]

  AWS VPC → شبكات خاصة للتطبيق والبيانات → موازن حمل
       → محلل DNS → تكاملات تشخيص مضبوطة
`,
    diagramStyle: "flow",
    keyDecisions: [
      { title: "حد فاصل لمحوّلات التشخيص", description: "وضع موصلات الموردين والأجهزة خلف بوابة موحدة حتى يستقبل نطاق الخدمة أكواداً وقياسات وأدلة ثابتة." },
      { title: "أمر العمل كمحور تشغيلي", description: "ربط التشخيص والتقدير والموافقة وحجز الموارد واستهلاك القطع وملاحظات الفني والتقرير النهائي بدورة واضحة." },
      { title: "دفتر قطع قائم على الحركات", description: "تسجيل الشراء والحجز والصرف والمرتجعات والتحويلات والتعديلات والهدر كحركات غير قابلة للتعديل." },
      { title: "التعلم الآلي لدعم القرار", description: "استخدام كثافة القطع وسرعة الحركة وسجل الأعطال وإشارات العمر المتبقي لاقتراح إعادة الطلب والاستبدال مع إبقاء القرار بشرياً." }
    ],
    failureModel: "يمكن أن يتعطل موصل التشخيص دون منع إنشاء أمر عمل يدوي؛ ويسجل التقرير المصدر ودرجة الثقة والأدلة الناقصة. تلتزم حجوزات الموارد واستهلاك القطع بالمعاملة. وعند تعطل التعلم الآلي يعود النظام إلى قواعد الحركة والحدود. يبدأ النشر داخل AWS VPC مع شبكات خاصة وVPS أو عقد تطبيق صغيرة خلف موازن حمل ومحلل DNS ونسخ احتياطية مُدارة.",
    role: "معماري حلول ومهندس منتجات — حددت حدود النطاق وعقد التشخيص الموحد وسير الخدمة ودفتر المخزون ونموذج تخصيص الموارد ونقاط قرار التعلم الآلي وشكل شبكة AWS والنشر باستخدام Java MVC وHibernate وAngular.",
    outcomes: [
      "مسار قابل للتتبع من تشخيص الجهاز إلى التقرير وأمر العمل وقطع الغيار المستخدمة",
      "جدولة واعية بالموارد تشمل الفنيين والمواقع والأدوات وتوفر القطع",
      "رؤية عميقة لحركة القطع والبدائل والمرتجعات والهدر والعمر الافتراضي",
      "عمارة Java وAWS عملية يمكن أن تبدأ على VPS منخفض التكلفة وتتوسع خلف موازن حمل"
    ],
    lessons: "الوحدة المهمة ليست كود التشخيص أو كمية المخزون وحدها، بل سلسلة القرار التي تشرح ما تم اكتشافه ولماذا اختير الإصلاح وما الموارد المستخدمة وما المتوقع في الخدمة القادمة.",
    wouldRevisitToday: "سأختبر عقود الموصلات مع أجهزة تشخيص حقيقية، وأضيف استقبالاً قائماً على الأحداث للبيانات الكثيفة، وأقيس دقة التعلم الآلي مقابل نتائج الفنيين، ثم أضيف المراقبة والنسخ الاحتياطية والتعافي من الكوارث قبل الإطلاق الإنتاجي.",
    themes: ["Java MVC", "Hibernate", "Angular", "تكاملات التشخيص", "أوامر العمل", "تخصيص الموارد", "ذكاء المخزون", "التعلم الآلي التنبؤي", "AWS VPC"],
    systemsInvolved: ["Angular", "Java MVC", "Hibernate", "MySQL", "Diagnostic Connectors", "AWS VPC", "Load Balancer", "DNS Resolver"]
  },
  {
    slug: "enterprise-retail-integration",
    title: "تكامل التجزئة للمؤسسات",
    subtitle: "ربط تدفقات المنتجات والمخزون والتسعير والطلبات عبر المؤسسة ومنصات التجارة.",
    domain: "تجزئة المؤسسات والتجارة متعددة القنوات",
    summary: "ربط تدفقات المنتجات والمخزون والتسعير والطلبات عبر أنظمة ERP و PIM المخصصة وواجهات المتاجر الرقمية و OMS دون ربط الأنظمة التابعة بالأنظمة المركزية.",
    context: "بيئة تجزئة مؤسسية متعددة العلامات التجارية تشمل أنظمة مكتبية قديمة (SAP)، وإدارة معلومات المنتجات (PIM)، وقنوات تجارة منفصلة (Shopify, Kibo)، وأنظمة إدارة الطلبات (OMS).",
    problem: "كانت البيانات الحيوية للأعمال مثل الكتالوجات والأسعار والمخزون والطلبات بحاجة للانتقال بين الأنظمة في 9 أسواق إقليمية بموثوقية ودون ربط وثيق بالـ ERP أو التسبب في تباين المخزون أثناء حملات المبيعات الضخمة.",
    constraints: [
      "تسببت استدعاءات ERP المتزامنة أثناء ذروة الحمل في إخفاقات متتالية عبر قنوات التجزئة",
      "وصلت تحديثات المنتجات غير مرتبة مما أدى إلى أسعار قديمة أو سمات مفقودة",
      "اختلفت قواعد الضرائب وتحويل العملات في الأسواق المتعددة حسب العلامة التجارية والمنطقة",
      "عدم قبول أي توقف للخدمة في واجهات المتاجر المباشرة أثناء مزامنة المخزون"
    ],
    architectureDiagramText: `
  [ SAP ERP ]
       │
       ▼ (حمولة غير متزامنة)
  [ واجهة API لطبقة التكامل ]  ──── (بوابة التحقق والعقود)
       │
       ▼
  [ ناقل الأحداث (Azure Event Hubs / Kafka) ]
   ├──► [ عامل مزامنة PIM ]             ────►  قنوات التجارة (Shopify / Kibo)
   ├──► [ محرك معالجة المخزون ]         ────►  دفتر المخزون اللحظي
   └──► [ مسار توجيه الطلبات في OMS ]    ────►  واجهات المستودعات والتنفيذ
`,
    diagramStyle: "flow",
    keyDecisions: [
      {
        title: "تكامل غير متزامن قائم على الأحداث",
        description: "فصل نقاط التجارة التابعة عن SAP باستخدام تدفقات الأحداث، مما مكن القنوات من معالجة التحديثات بشكل مستقل."
      },
      {
        title: "التحقق من العقود والمخططات أولاً",
        description: "فرض تحقق صارم من مخططات JSON عند بوابة التكامل لرفض بيانات SAP المشوهة قبل النشر."
      },
      {
        title: "مستهلكون متكافئ القوة للأحداث (Idempotent)",
        description: "تصميم معالجات استهلاك الأحداث بتشفير الحالة لمنع تكرار البيانات عند تسليم الأحداث المكررة."
      },
      {
        title: "طوابير الرسائل الميتة وإعادة المحاولة التراكمية",
        description: "عزل عمليات المزامنة الفاشلة في طوابير الرسائل الميتة مع إعادة محاولة تلقائية وقياسات تنبيهية."
      }
    ],
    failureModel: "عند عدم توفر خدمات PIM أو التجارة التابعة، يتم تخزين الأحداث بأمان في Event Hubs. تظل عمليات الشراء و SAP العلوية غير متأثرة تماماً. تتيح آليات الإعادة ملء الحالة التاريخية دون فقدان للبيانات فور تعافي الخدمات.",
    role: "معماري حلول وقائد تقني — مسؤول عن عمارة التكامل وعقود الأحداث ونماذج التعامل مع الأعطال وقيادة تسليم الهندسة عبر الفرق.",
    outcomes: [
      "مزامنة لحظية تقريباً للكتالوج والأسعار والمخزون عبر 9 أسواق إقليمية",
      "القضاء على انقطاعات واجهات المتاجر المتتالية الناتجة عن اختناقات ERP القديمة",
      "صفر حوادث تباين في المخزون أو عدم اتساق في الأسعار أثناء الحملات عالية التزامن"
    ],
    lessons: "إخفاقات التكامل نادراً ما تكون بسبب بناء البيانات؛ بل تتعلق دائماً بملكية البيانات والترتيب الزمني غير المعالج. يجب تحديد مفاتيح تكافؤ القوة وقواعد سلطة البيانات مسبقاً.",
    wouldRevisitToday: "استبدال آليات إعادة المحاولة التقليدية بمُنسقات الساجا القائمة على الأحداث (مثل Temporal أو Azure Durable Functions) لمعالجة التراجعات المعقدة للمعاملات بنقاء.",
    themes: [
      "تكامل قائم على الأحداث",
      "معالجة بدون خوادم",
      "عقود API",
      "تدفقات غير متزامنة",
      "ملكية البيانات",
      "تكافؤ القوة",
      "إدارة التكرار",
      "القابلية للملاحظة"
    ],
    systemsInvolved: ["SAP", "PIM", "التجارة", "OMS", "واجهات التكامل", "ناقل الأحداث"]
  },
  {
    slug: "airline-retailing-aggregation",
    title: "تجميع وتجزئة رحلات الطيران",
    subtitle: "توحيد محتوى الطيران وسير عمل الحجز عبر منصات B2B و B2C.",
    domain: "تقنيات السفر وتوزيع رحلات الطيران",
    summary: "تجميع محتوى شركات الطيران متعددة الموردين حسب معيار NDC والأسعار وسير عمل الحجز في API موحد عالي التوافر لأسواق B2B.",
    context: "بيئة تقنيات سفر مؤسسية تضم سوق تذاكر طيران B2B ونظام إدارة محتوى NDC لمنصات التجميع.",
    problem: "دمج موردي GDS القدامى مع واجهات NDC الحديثة — بحمولات مختلفة واستجابات متغيرة ورموز أخطاء غير متسقة — في API حجز سريع وموثوق.",
    constraints: [
      "تفاوت زمن استجابة API الموردين بشدة من 200 ملي ثانية إلى 4000 ملي ثانية",
      "انتهاء صلاحية توافر المقاعد وعروض الأسعار خلال فترات قصيرة (5 دقائق)",
      "اختلاف إصدارات مخططات NDC بشكل كبير حسب شركة الطيران ومرحلة التطبيق",
      "ارتفاع نسبة البحث مقابل الحجز مما تطلب تخزيناً مؤقتاً مكثفاً دون تقديم أسعار قديمة"
    ],
    architectureDiagramText: `
  [ بوابات سفر B2B / العملاء ]
               │
               ▼
  [ بوابة التجميع والتوحيد ] ─── (مخطط العرض القياسي)
               │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 [ محول NDC ] [ محول NDC ] [ محول GDS ]
 (شركة أ)     (شركة ب)     (أماديوس/صابر)
`,
    diagramStyle: "wide",
    keyDecisions: [
      {
        title: "تمثيل النطاق القياسي الموحد",
        description: "إنشاء نموذج داخلي موحد لعروض الرحلات ومخططات المقاعد والخدمات الإضافية لترجمة هياكل XML/JSON الخاصة بكل شركة."
      },
      {
        title: "نمط قاطع الدائرة (Circuit-Breaker) على الاستدعاءات الخارجية",
        description: "تغليف عملاء HTTP للموردين بقواطع دائرة للفشل السريع عند ارتفاع زمن استجابة نقاط NDC."
      },
      {
        title: "البحث الموازي المتزامن عبر الموردين",
        description: "إرسال استعلامات البحث للموردين بالتوازي مع وقت قطع صارم، وإعادة نتائج مجمعة جزئية بدلاً من انتظار أبطأ نقطة."
      },
      {
        title: "ساجا الحجز ذات الحالة (Stateful Saga)",
        description: "بناء آلة حالة حجز متعددة الخطوات لتنسيق مراحل حجز المقعد والخصم وإصدار التذاكر بأمان."
      }
    ],
    failureModel: "إذا انتهت مهلة خدمة NDC لشركة طيران أو أعادت خطأ غير قابل للتكرار، يستبعد المجمع عروض هذه الشركة بسلاسة من نتائج البحث دون إفشال الطلب بأكمله. تؤدي إخفاقات حجز المقاعد تلقائياً إلى التراجع عن الدفع.",
    role: "معماري حلول وقائد منصة — تصميم طبقة توحيد الموردين والمخططات القياسية وأنماط المرونة وآلات حالة الحجز.",
    outcomes: [
      "سير عمل حجز موحد متعدد الموردين يدعم شركاء السفر في B2B",
      "نتائج بحث أولية في أقل من ثانية عبر التوازي وبث الاستجابات المبكرة",
      "تشغيل مرن أثناء فترات انقطاع شركات الطيران دون انقطاع النظام بأكمله"
    ],
    lessons: "عند تجميع واجهات API خارجية باتفاقيات مستوى خدمة غير متوقعة، فإن عزل العقود وقواطع الدوائر أمر لا مفر منه. لا تدع مورداً بطيئاً يضر بزمن استجابة عميلك.",
    wouldRevisitToday: "إدخال بروتوكولات gRPC لاتصالات محولات الموردين الداخلية لتقليل زمن تسلسل البيانات عند معالجة تحويلات XML إلى JSON الثقيلة.",
    themes: [
      "تكامل الموردين",
      "توحيد API",
      "سير عمل التجزئة",
      "تدفقات الحجز",
      "حدود الخدمات",
      "تحمل الأخطاء",
      "اتساق العقود",
      "تكاملات موزعة"
    ],
    systemsInvolved: ["NDC APIs", "مزودو GDS", "بوابة التجميع", "محرك الحجز", "سوق B2B"]
  },
  {
    slug: "automotive-omnichannel-platform",
    title: "منصة السيارات متعددة القنوات",
    subtitle: "إنشاء سير عمل مشترك عبر العمليات الرقمية والتشغيلية للسيارات.",
    domain: "تجزئة السيارات وعمليات الأسطول",
    summary: "مركبة فحص واستلام وسيارات مستعملة وإعادة تهيئة وتسعير ومزامنة صالات العرض الرقمية عبر المعارض الفعالة والمنصات الإلكترونية.",
    context: "مؤسسة سيارات متعددة القنوات تضم معارض فيزيائية وساحات فحص ومراكز إعادة تهيئة ومنصات عرض رقمية.",
    problem: "كانت حالات دورة حياة المركبة (استلام، فحص 150 نقطة، إعادة تهيئة، موافقة تسعير، حجز، بيع) متفرقة في جداول بيانات وبرامج قديمة مما تسبب بتأخر المخزون ومخاطر الحجز المزدوج.",
    constraints: [
      "تطلبت تطبيقات الفحص في الساحات إمكانية العمل بدون إنترنت بسبب ضعف تغطية الشبكة في المعارض",
      "تطلبت تحديثات الأسعار تدفقات موافقة صارمة قبل عكسها على صالات العرض الرقمية",
      "تطلبت الحجوزات متعددة القنوات آلية قفل فورية لمنع الحجوزات المتزامنة بين العملاء",
      "افتقرت أنظمة إدارة المعارض القديمة (DMS) لدعم Webhooks اللحظية"
    ],
    architectureDiagramText: `
  [ تطبيق الساحة المحمول ] ──► (طابور ومزامنة بدون إنترنت)
            │
            ▼
  [ آلة حالات دورة حياة المركبة ومخزن الحالة المركزي ]
            │
   ┌────────┴────────┐
   ▼                 ▼
[ ERP عمليات المعرض ] [ واجهات صالات العرض الرقمية ] ──► (قنوات الويب / المحمول)
`,
    diagramStyle: "tree",
    keyDecisions: [
      {
        title: "آلة حالات محددة مركزية (FSM)",
        description: "نمذجة دورة حياة المركبة إلى انتقالات حالات غير قابلة للتغيير (مسودة ← مفحوصة ← مجهزة ← مسعرة ← معروضة ← محجوزة ← مباعة)."
      },
      {
        title: "مزامنة المحمول بدون إنترنت أولاً",
        description: "بناء أدوات فحص محمول مع حفظ محلي في SQLite ومزامنة خلفية عند استعادة الاتصال."
      },
      {
        title: "قفل موزن على حجز المركبات",
        description: "فرض أقفال حجز ذرية باستخدام Redis لمنع سباق البيانات بين المشترين عبر الإنترنت ومندوبي المبيعات."
      },
      {
        title: "توزيع متعدد القنوات قائم على الأحداث",
        description: "بث حالة المركبة وتحديثات الأسعار عبر Webhooks للقنوات الرقمية بمجرد دخول المركبة حالة 'مسعرة'."
      }
    ],
    failureModel: "تخزن الفحوصات بدون إنترنت البيانات محلياً وتزامن مع اكتشاف التعارضات عند الاتصال. إذا فشلت مزامنة تحديث السعر مع قناة خارجية، تظل حالة المركبة في 'قيد المزامنة' حتى التحقق.",
    role: "معماري حلول — تحديد حدود النطاق وقواعد الانتقال بين الحالات واستراتيجيات المزامنة وعقود التكامل.",
    outcomes: [
      "مصدر واحد للحقيقة لحالة مخزون السيارات المستعملة عبر القنوات الفيزيائية والرقمية",
      "تقليل الوقت اللازم لعرض المركبة من الاستلام حتى العرض المباشر",
      "القضاء على الحجز المزدوج للمركبات عبر المعارض والمنصات الإلكترونية"
    ],
    lessons: "العمليات التشغيلية الفعالة تحتوي دائماً على حالات خاصة لا يتوقعها المهندسون. ابنِ حالات 'استثناء / مراجعة يدوية' صريحة في آلة الحالات بدلاً من افتراض المسار السعيد.",
    wouldRevisitToday: "تطبيق Event-Sourcing لسجل المركبة الكامل لتمكين مراجعة فورية لتكاليف التجهيز وانخفاض الأسعار ونقل الملكية عبر الزمن.",
    themes: [
      "سير عمل مركزي",
      "حدود التكامل",
      "حالات دورة الحياة",
      "اتساق البيانات",
      "تنسيق القنوات",
      "الرؤية التشغيلية"
    ],
    systemsInvolved: ["معارض DMS", "تطبيق الفحص", "مخزن الحالة المركزي", "معرض رقمي", "محرك التسعير"]
  }
];

export function getLocalizedCaseStudies(locale: string): CaseStudy[] {
  if (locale !== "ar") {
    return flagshipCaseStudies;
  }

  const translatedSlugs = new Set(arFlagshipCaseStudies.map((cs) => cs.slug));
  return [
    ...arFlagshipCaseStudies,
    ...flagshipCaseStudies.filter((cs) => !translatedSlugs.has(cs.slug)),
  ];
}

export function getLocalizedCaseStudy(slug: string, locale: string): CaseStudy | undefined {
  const list = getLocalizedCaseStudies(locale);
  return list.find((cs) => cs.slug === slug);
}
