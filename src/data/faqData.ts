export interface FaqItem {
  id: string;
  question: {
    en: string;
    ar: string;
  };
  answer: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
}

export const searchFocusedFaqs: FaqItem[] = [
  {
    id: "solution-architecture",
    question: {
      en: "How do you approach solution architecture for complex enterprise integrations?",
      ar: "كيف تتعامل مع عمارة الحلول لتكاملات المؤسسات المعقدة؟",
    },
    answer: {
      en: "I approach enterprise solution architecture contract-first and event-driven. Instead of brittle point-to-point connections, I design explicit schema contracts, domain boundaries, and asynchronous queues (using Azure Event Hubs, Kafka, or RabbitMQ). This decouples ERP, PIM, and commerce layers, guarantees idempotent processing, and provides observability across multi-system data flows so failures are isolated and recoverable.",
      ar: "أتعامل مع عمارة حلول المؤسسات بنهج يعتمد على العقود الصريحة والأنظمة المعتمدة على الأحداث. بدلاً من الربط النقطي الهش، أصمم عقود بيانات معرّفة وحدود نطاقات واضحة ومسارات غير متزامنة (باستخدام Azure Event Hubs أو Kafka أو RabbitMQ). يؤدي هذا إلى فصل طبقات ERP وPIM والتجارة وضمان المعالجة المتكررة بأمان مع رصد كامل لتدفقات البيانات.",
    },
    category: {
      en: "Solution Architecture",
      ar: "عمارة الحلول",
    },
  },
  {
    id: "system-scalability",
    question: {
      en: "What architectural strategies ensure system scalability under heavy peak loads?",
      ar: "ما الاستراتيجيات المعمارية التي تضمن قابلية توسع الأنظمة تحت أحمال الذروة الشديدة؟",
    },
    answer: {
      en: "Scalability begins by isolating read and write workloads, applying stateless microservices, and utilizing distributed streaming pipelines. For high-throughput environments across retail and travel, I implement multi-tier caching (Redis, CDN), backpressure-aware message brokers, database read replicas, and circuit breakers. This prevents regional traffic spikes from cascading into downstream system outages.",
      ar: "تبدأ قابلية التوسع بفصل أعباء القراءة عن الكتابة واستخدام خدمات مصغرة عديمة الحالة ومسارات بث بيانات موزعة. في البيئات عالية الإنتاجية للتجزئة والسفر، أنفذ تخزيناً مؤقتاً متعدد المستويات (Redis وCDN) ووسطاء رسائل يدعمون التحكم بالضغط وقواطع دوائر لمنع انتشار الاختناقات إلى الأنظمة الخلفية.",
    },
    category: {
      en: "System Design & Scalability",
      ar: "تصميم الأنظمة وقابلية التوسع",
    },
  },
  {
    id: "technical-leadership",
    question: {
      en: "How do you align technical leadership with delivery deadlines and product goals?",
      ar: "كيف توائم القيادة التقنية مع مواعيد التسليم وأهداف المنتج؟",
    },
    answer: {
      en: "Technical leadership is about making trade-offs transparent and architectural boundaries observable. I work closely with engineering teams and business stakeholders to break ambitious roadmaps into validated increments, establish code quality and testing standards, enforce automated CI/CD pipelines, and eliminate blockers before technical debt compounds into delivery drag.",
      ar: "تتمثل القيادة التقنية في جعل المفاضلات واضحة وحدود العمارة قابلة للرصد. أعمل عن كثب مع فرق الهندسة وصنّاع القرار لتحويل خطط المنتجات الطموحة إلى مراحل تسليم عملية، مع تطبيق معايير الجودة والاختبار وأتمتة مسارات CI/CD لإزالة المعوقات قبل تراكم الديون التقنية.",
    },
    category: {
      en: "Technical Leadership",
      ar: "القيادة التقنية",
    },
  },
  {
    id: "ai-systems-intelligence",
    question: {
      en: "How do you integrate AI systems and operational intelligence into enterprise platforms?",
      ar: "كيف تدمج أنظمة الذكاء الاصطناعي والذكاء التشغيلي في المنصات المؤسسية؟",
    },
    answer: {
      en: "Through research and architecture such as ZaakiyV3RSE, I integrate configuration-driven AI agents, deterministic calculations, and enterprise RAG. By keeping business-critical computations and validation deterministic while leveraging LLMs for semantic reasoning, routing, and synthesis, platforms gain intelligent automation without risking hallucinated data in auditable workflows.",
      ar: "من خلال البحث والعمارة مثل ZaakiyV3RSE، أدمج وكلاء الذكاء الاصطناعي الموجّهين بالإعدادات والحسابات الحتمية واسترجاع البيانات المعزز (RAG). نحافظ على حتمية العمليات الحسابية والتحقق الحرج بينما نوظف نماذج اللغة للتفكير الدلالي والتوجيه دون المخاطرة ببيانات غير دقيقة في مسارات قابلة للتدقيق.",
    },
    category: {
      en: "AI Systems & Intelligence",
      ar: "أنظمة الذكاء الاصطناعي",
    },
  },
  {
    id: "cloud-modernization",
    question: {
      en: "What is your approach to cloud modernization and legacy system migration?",
      ar: "ما منهجك في التحديث السحابي وترقية الأنظمة القديمة؟",
    },
    answer: {
      en: "I use the Strangler Fig pattern to progressively migrate legacy monoliths to cloud-native platforms on Azure and AWS without risky big-bang rewrites. We establish anti-corruption layers, mirror event streams to synchronize state in real time, and cut over domain by domain with automated canary validation and rollback mechanisms.",
      ar: "أستخدم نمط Strangler Fig للترحيل التدريجي من الأنظمة القديمة المتجانسة إلى منصات سحابية على Azure وAWS دون اللجوء لإعادة بناء جذرية محفوفة بالمخاطر. ننشئ طبقات وسيطة لحماية النطاقات ونزامن الأحداث لحظياً، ثم ننقل الخدمات مجالاً تلو الآخر مع تحقّق آلي وإمكانية استرجاع سريعة.",
    },
    category: {
      en: "Cloud & Modernization",
      ar: "السحابة والتحديث",
    },
  },
  {
    id: "uae-consulting-services",
    question: {
      en: "What services and engagement models do you offer for UAE and international teams?",
      ar: "ما الخدمات ونماذج العمل التي تقدمها للفرق في الإمارات ودولياً؟",
    },
    answer: {
      en: "Based in Dubai, UAE, I provide architecture advisory, fractional tech leadership, hands-on full-stack development, and end-to-end integration delivery. Engagements range from focused architectural reviews (system audits, scalability assessments) to ongoing technical guidance and platform execution across GCC and global markets.",
      ar: "انطلاقاً من دبي، أقدم الاستشارات المعمارية والقيادة التقنية وتطوير الأنظمة المتكاملة وتنفيذ مشاريع الربط المؤسسي. تتراوح نماذج التعاون بين المراجعات المعمارية المركزة (تدقيق الأنظمة، تقييم التوسع) والإشراف التقني المستمر وتسليم المنصات عبر أسواق الخليج والعالم.",
    },
    category: {
      en: "Services & Engagements",
      ar: "الخدمات والتعاون",
    },
  },
  {
    id: "contract-first-apis",
    question: {
      en: "Why is a contract-first API approach essential for omnichannel commerce?",
      ar: "لماذا يُعد نهج APIs المبني على العقود أولاً ضرورياً للتجارة متعددة القنوات؟",
    },
    answer: {
      en: "In omnichannel ecosystems where mobile apps, web storefronts, ERPs, and external partners interact, contract-first design with OpenAPI and JSON Schemas eliminates integration drift. Frontend and backend teams develop in parallel against mock servers, and contract test suites prevent breaking changes from reaching production.",
      ar: "في بيئات التجارة متعددة القنوات التي تتفاعل فيها التطبيقات والمتاجر الإلكترونية وأنظمة ERP والشركاء، يقضي التصميم القائم على العقود (OpenAPI وJSON Schema) على تباين البيانات. تتيح هذه العقود للفرق التطوير بالتوازي، وتمنع اختبارات التوافق الآلية أي تغييرات معطلة من الوصول للإنتاج.",
    },
    category: {
      en: "API Engineering",
      ar: "هندسة الواجهات البرمجية",
    },
  },
];
