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
  }
];

export const arFlagshipCaseStudies: CaseStudy[] = [
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
  return locale === "ar" ? arFlagshipCaseStudies : flagshipCaseStudies;
}

export function getLocalizedCaseStudy(slug: string, locale: string): CaseStudy | undefined {
  const list = getLocalizedCaseStudies(locale);
  return list.find((cs) => cs.slug === slug);
}

