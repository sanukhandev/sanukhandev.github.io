import {
  nav as baseNav,
  profile as baseProfile,
  skills as baseSkills,
  services as baseServices,
  works as baseWorks,
  workCategories as baseWorkCategories,
  articles as baseArticles,
  certifications as baseCertifications,
  footer as baseFooter,
} from "@/data/siteData";
import { useLocale } from "@/hooks/use-locale";

const arServiceImpactByIndex: string[][] = [
  [
    "تصميم تكاملات PIM مؤسسية عبر علامات M&S وACE وWatsons لإدارة الكتالوج والأسعار والمخزون على نطاق واسع.",
    "تصميم مسارات قائمة على الأحداث باستخدام Azure Event Hub وKafka وRabbitMQ لمزامنة المنتجات والأسعار لحظياً عبر مناطق متعددة.",
    "بناء خدمات مصغرة serverless عبر Node.js وAzure Functions لإدارة عمليات التكامل عالية الإنتاجية.",
    "تنفيذ تكاملات SAP–PIM–Shopify–Kibo لدعم تجربة تجارة موحدة متعددة القنوات.",
    "تصميم منصات SaaS متعددة المستأجرين بعزل صارم وقابلية توسع وعقود API واضحة.",
    "قيادة تنفيذ cloud-native على Azure وKubernetes مع توجيه الفرق الهندسية وملكية القرارات المعمارية.",
  ],
  [
    "تطوير منصات ERP وإدارة المشاريع باستخدام Laravel وAngular بهندسة معيارية قابلة للصيانة.",
    "بناء وحدات إدارة مهام معتمدة على التقويم مع حالات سير عمل معقدة.",
    "تنفيذ هندسة واجهات قابلة للتوسع مع NgRx لضمان موثوقية على مستوى المؤسسات.",
  ],
  [
    "تطوير منصة B2B لشركات الطيران وتجميع المحتوى مع إدارة موردين متعددين للتسعير والمحتوى.",
    "تصميم خدمات حجز وتذاكر قابلة للتوسع باستخدام Node.js microservices وJava backends.",
    "تنفيذ أنظمة إدارة محتوى الطيران وفق معيار NDC بعقود بيانات منظمة.",
    "المساهمة في أنظمة خلفية موزعة عالية التوافر بحدود خدمات مرنة.",
  ],
  [
    "بناء منصة مؤتمرات فيديو باستخدام React وDjango مع إشارات وسائط لحظية قابلة للتوسع.",
    "تنفيذ أنظمة ERP وإدارة الأصول وخدمات المساعدة على الطريق لقطاعات مؤسسية متعددة.",
    "تسليم منصات تجارة إلكترونية وأدوات backend مؤسسية لعدة عملاء.",
    "تطوير تطبيقات Android وخدمات backend باستخدام Spring Boot وPHP.",
  ],
  [
    "تسليم أكثر من 100 حل برمجي في مجالات ERP وSaaS والتجارة الإلكترونية وLMS وروبوتات الدردشة الذكية.",
    "التخصص في التكاملات كثيفة الأتمتة والهندسات الخلفية القابلة للتوسع والتنفيذ السحابي.",
    "تصميم وإطلاق منصات SaaS متعددة المستأجرين مع نماذج اشتراك وفوترة.",
    "بناء أدوات مدعومة بالذكاء الاصطناعي ومنصات LMS لعملاء من الشركات المتوسطة والمؤسسات.",
  ],
  [
    "تصميم وإدارة البنية التحتية للشبكات والتوجيه وإدارة الأنظمة.",
    "بناء أساس قوي في موثوقية البنية التحتية والأمن وعمليات الأنظمة.",
  ],
];

const arArticleCategoryMap: Record<string, string> = {
  Architecture: "الهندسة المعمارية",
  "Data Engineering": "هندسة البيانات",
  JavaScript: "جافاسكريبت",
  Algorithms: "الخوارزميات",
  DSA: "هياكل البيانات والخوارزميات",
  DevTools: "أدوات المطور",
  "Computer Science": "علوم الحاسب",
};

const arArticlesByIndex: Array<{ title: string; excerpt: string }> = [
  {
    title: "بوابة API: الحارس الذي تحتاجه خدماتك المصغرة",
    excerpt:
      "كيف تعمل بوابة API كنقطة دخول موحدة للخدمات المصغرة، مع إدارة التوثيق والحد من الطلبات والتوجيه والرصد.",
  },
  {
    title: "DuckDB: نسخة SQLite لعالم التحليلات",
    excerpt:
      "قاعدة OLAP داخلية دون إعدادات مع أداء عمودي سريع ودعم CSV وParquet وJSON للتحليلات المحلية.",
  },
  {
    title: "شرح JavaScript Proxy: أساليب قوية للتعامل الديناميكي مع الكائنات",
    excerpt:
      "استخدام Proxy لاعتراض سلوك الكائنات للتحقق والتسجيل والتحكم بالوصول وفهم آليات Vue 3.",
  },
  {
    title:
      "بناء Merge Sort مرن للكائنات المتداخلة والنصوص والأرقام في JavaScript",
    excerpt:
      "تطوير mergeSortBy() غير متلف على Array.prototype يدعم القيم البسيطة ومفاتيح الكائنات والمقارنات المخصصة.",
  },
  {
    title: "لماذا Project Euler قد يكون أقوى مدرب DSA لا تستخدمه حتى الآن؟",
    excerpt:
      "كيف تطورك ألغاز Project Euler الرياضية لتفكير خوارزمي أعمق وحلول أكثر كفاءة في المقابلات والعمل.",
  },
  {
    title: "كيف أنقذني Warp Terminal من كارثة Git بأمر واحد",
    excerpt:
      "قصة عملية عندما تحول rebase إلى فوضى، وكيف قدم Warp خطوات آمنة للاستعادة خلال ثوانٍ.",
  },
  {
    title: "دليل عملي لبناء منصة SaaS متكاملة وفعالة من حيث التكلفة",
    excerpt:
      "عمارة عملية باستخدام Laravel وNext.js وMySQL وWordPress Headless لاستهداف التوسع والصيانة بتكلفة متوازنة.",
  },
  {
    title:
      "فك لغز P vs NP: لماذا تؤثر على مستقبل الذكاء الاصطناعي والحوسبة الكمية",
    excerpt:
      "استكشاف دور مسألة P vs NP في قلب أبحاث الذكاء الاصطناعي وكيف قد تفتح الحوسبة الكمية مسارات جديدة للحل.",
  },
  {
    title: "مسألة P vs NP: أعقد لغز رياضي في علوم الحاسب",
    excerpt:
      "شرح مبسط لأشهر مسألة مفتوحة في علوم الحاسب ولماذا لا تزال جائزة المليون دولار بانتظار الحل.",
  },
  {
    title: "دليل شامل لـ Big O وممارسات كتابة كود أكثر كفاءة",
    excerpt:
      "شرح تعقيد الزمن والمساحة بأمثلة JavaScript عملية من O(1) إلى O(n²) ولماذا إتقانه مهم للإنتاج والمقابلات.",
  },
  {
    title: "تقنية Sliding Window: خوارزمية قوية لمطوري JavaScript",
    excerpt:
      "إتقان نمط Sliding Window للمصفوفات والسلاسل مع أمثلة عملية مثل أعظم مجموع جزئي ومعالجة تدفق البيانات.",
  },
];

const arContent = {
  nav: {
    ...baseNav,
    brand: "سانوخان.ديف",
    links: [
      { label: "الأعمال", href: "#work" },
      { label: "المعمارية", href: "#architecture" },
      { label: "Zaakiy", href: "#zaakiy" },
      { label: "المقالات", href: "#writing" },
      { label: "نبذة عني", href: "#about" },
    ],
    cta: { ...baseNav.cta, label: "لنتحدث" },
  },
  profile: {
    ...baseProfile,
    name: "سانو خان",
    role: "معماري تقني · قائد هندسي",
    roleBrand: "ZaakiyV3RSE",
    subRole: "معماري تقني · قائد هندسي · متخصص في تكاملات المؤسسات",
    subtitle:
      "معماري سحابي وقائد تقني · Azure · معمارية قائمة على الأحداث",
    statement:
      "أكثر من 100 حل تقني · مؤسس ZaakiyV3RSE · خبرة +13 سنة",
    meta: [
      "+13 سنة في بناء الأنظمة الموزعة",
      "متخصص في العمارة المعتمدة على الأحداث",
      "مؤسس ZaakiyV3RSE",
      "تنفيذ على Azure و AWS و Kubernetes",
    ],
    impactMetrics: [
      { value: "13+", label: "سنوات الخبرة" },
      { value: "100+", label: "أنظمة تم تسليمها" },
      { value: "9", label: "أسواق مخدومة" },
      { value: "800K+", label: "أنظمة على نطاق منتج" },
    ],
    ctas: [
      { label: "لنتحدث", href: "#contact", variant: "hire" as const },
      {
        label: "تحميل السيرة الذاتية",
        href: "/Sanu Khan - Resume.pdf",
        variant: "download" as const,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/sanukhan/",
        variant: "social" as const,
      },
    ],
  },
  skills: {
    ...baseSkills,
    eyebrow: "مجالات الهندسة",
    title: "مجموعات الخبرة الهندسية",
    intro:
      "تنفيذ تقني بمنهجية العمارة أولاً عبر السحابة والتكاملات وهندسة المنصات بمعايير إنتاجية عالية.",
    expandLabel: "عرض كل المهارات",
    collapseLabel: "عرض مهارات أقل",
    clusters: [
      { ...baseSkills.clusters[0], title: "السحابة والعمارة" },
      { ...baseSkills.clusters[1], title: "أنظمة الخلفية" },
      { ...baseSkills.clusters[2], title: "أنظمة الواجهة" },
      { ...baseSkills.clusters[3], title: "DevOps والبنية التحتية" },
      { ...baseSkills.clusters[4], title: "تكاملات المؤسسات" },
    ],
  },
  services: baseServices.map((item, index) => ({
    ...item,
    role:
      index === 0
        ? "قائد تقني ومهندس حلول"
        : index === 1
          ? "مهندس واجهة وتطوير متكامل"
          : index === 2
            ? "مهندس منصات وتطوير متكامل"
            : index === 3
              ? "مهندس بحث وتطوير"
              : index === 4
                ? "مستشار عمارة حلول وتطوير متكامل"
                : "مهندس شبكات وأنظمة",
    duration: item.duration.replace("Present", "حتى الآن"),
    location:
      item.location === "Dubai, UAE"
        ? "دبي، الإمارات"
        : item.location === "India"
          ? "الهند"
          : item.location === "Remote / Global"
            ? "عن بُعد / عالمي"
            : item.location,
    impact: arServiceImpactByIndex[index] ?? item.impact,
  })),
  works: [
    {
      ...baseWorks[0],
      title: "منصة تجارة قائمة على الأحداث",
      problem:
        "تحديثات الأسعار والمخزون والكتالوج كانت مجزأة بين المناطق، مما سبب تأخيراً وعدم اتساق في حالة المنتجات.",
      solution:
        "تصميم مسارات قائمة على الأحداث باستخدام Kafka و Event Hubs وخدمات تكامل لمزامنة بيانات المنتجات والأسعار.",
      outcome: "تحقيق اتساق شبه لحظي عبر أسواق متعددة على نطاق يفوق 800K منتج.",
      scope: "تجارة متعددة المناطق",
    },
    {
      ...baseWorks[1],
      title: "حزمة تكامل PIM للمؤسسات",
      problem:
        "تدفقات بيانات المنتج بين PIM وأنظمة التجارة كانت هشة وصعبة التتبع والمراجعة.",
      solution:
        "بناء orchestrations تكامل serverless عبر Azure Functions مع تحقق من صحة العقود البيانية.",
      outcome:
        "رفع جودة البيانات وتقليل التدخلات التشغيلية في دورات نشر الكتالوج الضخمة.",
      scope: "تكامل مؤسسي",
    },
    {
      ...baseWorks[2],
      title: "نواة منصة SaaS متعددة المستأجرين",
      problem:
        "التخصيص والتوسع على مستوى المستأجر كانا مقيدين بهيكل تشغيلي أحادي.",
      solution:
        "إعادة تصميم حدود المنصة إلى خدمات مصغرة بعقود نشر وبيانات واعية بالمستأجر.",
      outcome:
        "زيادة سرعة الإصدارات وقابلية التوسع مع الحفاظ على عزل المستأجرين.",
      scope: "هندسة منصات عالمية",
    },
  ],
  workCategories: baseWorkCategories,
  articles: baseArticles.map((article, index) => ({
    ...article,
    category: arArticleCategoryMap[article.category] ?? article.category,
    title: arArticlesByIndex[index]?.title ?? article.title,
    excerpt: arArticlesByIndex[index]?.excerpt ?? article.excerpt,
  })),
  certifications: baseCertifications.map((cert, index) => ({
    ...cert,
    title:
      index === 0
        ? "مقدمة في الأمن السيبراني"
        : index === 1
          ? "بايثون (أساسيات)"
          : index === 2
            ? "SQL (متوسط)"
            : index === 3
              ? "React (أساسيات)"
              : index === 4
                ? "حل المشكلات (متوسط)"
                : "React - الدليل الكامل",
    category:
      index === 0
        ? "الأمن"
        : index === 1
          ? "البرمجة"
          : index === 2
            ? "قواعد البيانات"
            : index === 3
              ? "الواجهة الأمامية"
              : index === 4
                ? "الخوارزميات"
                : "واجهة أمامية متقدمة",
  })),
  footer: {
    ...baseFooter,
    brand: "سانوخان.ديف",
    blurb: "مؤسس ZaakiyV3RSE • قائد تقني • معماري سحابي",
    socials: baseFooter.socials.map((s) =>
      s.label === "Buy me a coffee" ? { ...s, label: "ادعمني بقهوة" } : s,
    ),
    quickLinks: [
      { label: "الأعمال", href: "#work" },
      { label: "المعمارية", href: "#architecture" },
      { label: "Zaakiy", href: "#zaakiy" },
      { label: "المقالات", href: "#writing" },
      { label: "نبذة عني", href: "#about" },
    ],
    contact: {
      ...baseFooter.contact,
      location: "دبي، الإمارات",
      cta: { label: "لنتحدث", href: "#contact" },
    },
    copyright: `© ${new Date().getFullYear()} سانو خان. جميع الحقوق محفوظة.`,
  },
  ui: {
    localeSwitch: { en: "English", ar: "العربية" },
    coffeeCta: "ادعمني بقهوة",
    hero: {
      coffeeCta: "ادعمني بقهوة",
      eyebrow: "معماري تقني · قائد هندسي",
      title: "معماري",
      headline: "أصمم وأبني منصات قابلة للتوسع.",
      supporting:
        "أصمم وأطور منصات إنتاجية في التجارة الرقمية وتقنيات السفر والأنظمة المؤسسية والذكاء الاصطناعي، بدءًا من المعمارية وواجهات API وحتى النشر والتشغيل.",
      credibilityLine: [
        "+13 سنة خبرة هندسية",
        "أنظمة إنتاجية",
        "المعمارية ← التسليم",
      ],
      exploreWork: "استعرض أعمالي",
      viewArchitecture: "استعرض المعمارية",
      quote:
        "“تجاوز الحدود في الهندسة المعمارية — بناء منصات فائقة التوسع وتحويل التعقيدات إلى واقع تقني ملموس.”",
    },
    works: {
      eyebrow: "منصات إنتاجية مختارة",
      title: "منصات إنتاجية مختارة",
      subtitle:
        "منصات ساهمت في تصميمها وبنائها وتسليمها عبر التجارة الرقمية والسيارات وتقنيات السفر والأنظمة المؤسسية.",
      myContributionLabel: "مساهمتي",
      viewProject: "عرض المشروع",
      systemsData: [
        {
          id: "regional-commerce-platform",
          industry: "التجارة الرقمية · متعددة المناطق",
          title: "منصة تجارة إقليمية للمؤسسات",
          description:
            "منصة تجارة إقليمية متعددة الأسواق تُزامن كتالوج المنتجات، الأسعار، والمخزون عبر الأسواق الإقليمية.",
          contributions: ["هندسة المنصات", "التكامل المؤسسي", "التسليم للإنتاج"],
          evidence: "9 أسواق إقليمية",
          projectUrl: "/projects",
        },
        {
          id: "omnichannel-commerce-fabric",
          industry: "السيارات والتجارة المؤسسية",
          title: "بنية تجارة موحدة متعددة القنوات",
          description:
            "شبكة تكامل معتمدة على الأحداث تربط أنظمة ERP وPIM وواجهات المتاجر مع التحقق لحظياً من عقود البيانات.",
          contributions: ["معمارية الحلول", "تدفق الأحداث", "حوكمة واجهات API"],
          evidence: "منصة إنتاجية مؤسسية",
          projectUrl: "/projects",
        },
        {
          id: "airline-b2b-marketplace",
          industry: "تقنيات السفر · تجميع خدمات الطيران",
          title: "منصة تجميع NDC وسوق الطيران B2B",
          description:
            "منصة تجميع NDC عالية التوافر تعالج محتوى الطيران متعدد الموردين، التسعير، وسير عمل حجز B2B.",
          contributions: ["هندسة المنصات", "تكامل NDC", "سير عمل B2B"],
          evidence: "تجميع متعدد الموردين",
          projectUrl: "/projects",
        },
        {
          id: "airport-commerce-platform",
          industry: "تجارة المطارات · تجارة التجزئة للسفر",
          title: "منصة تجارة المطارات والتجزئة",
          description:
            "نظام تجارة مطارات متعدد المحطات لإدارة المخزون لحظياً، معالجة الطلبات، وتكاملات الدفع.",
          contributions: ["معمارية النطاق", "نواة التجارة", "واجهات API مرنة"],
          evidence: "عمليات متعددة المحطات",
          projectUrl: "/projects",
        },
      ],
    },
    architecture: {
      eyebrow: "دراسة حالة معمارية",
      title: "الهندسة المعمارية في التطبيق",
      subtitle:
        "كيف أحول متطلبات الأعمال إلى هندسة معمارية قابلة للتنفيذ والتشغيل في بيئات الإنتاج.",
      challengeLabel: "التحدي",
      challengeText:
        "بناء منصة تجارة مطارات معيارية تتيح تجارب منتجات مستقلة مع الحفاظ على أساس تجاري مشترك للمنتجات، الحجز، الدفع، وسير العمل التشغيلي.",
      topologyLabel: "مخطط المعمارية الهندسية",
      topologyEcosystem: "منظومة تجارة المطارات",
      diagram: {
        tier1Label: "الطبقة 1",
        tier1Text: "العميل ونقاط البيع POS",
        tier2Label: "الطبقة 2",
        tier2Text: "تجربة الويب والهاتف المحمول",
        interfaceLabel: "طبقة الواجهات",
        interfaceText: "بوابة واجهات التجارة API Gateway",
        domainALabel: "النطاق أ",
        domainAText: "النقل والتنقل / المواقف",
        domainBLabel: "النطاق ب",
        domainBText: "المنتجات / التجزئة",
        domainCLabel: "النطاق ج",
        domainCText: "الحجز / الصالات",
        coreLabel: "السلطة المركزية",
        coreText: "مُحرّك نواة التجارة Commerce Core",
        integrationsLabel: "التكاملات",
        integrationsText: "بوابات الدفع · OMS · تدفق الأحداث",
      },
      keyDecisionsLabel: "القرارات المعمارية الرئيسية",
      keyDecisions: [
        {
          title: "واجهة أمامية قائمة على APIs",
          desc: "فصل واجهات الويب والهاتف والمحطات عن منطق أعمال الخلفية.",
        },
        {
          title: "حدود النطاقات Domain Boundaries",
          desc: "فصل كتالوج المنتجات، المخزون، وإتمام الشراء إلى حدود خدمات مستقلة.",
        },
        {
          title: "مرجعية التجارة المركزية",
          desc: "تأسيس مصدر واحد للحقيقة لقواعد التسعير، منطق العروض، وحالة الطلب.",
        },
        {
          title: "مسارات عمل مستقلة",
          desc: "طوابير انتظار غير متزامنة لمعالجة بوابات الدفع، التحقق الجمركي، وإتمام الطلبات.",
        },
        {
          title: "فصل البيئات و CI/CD",
          desc: "أتمتة مسارات النشر مع القياس البعادي المركزي، التسجيل المنظم، والتتبع الموزع.",
        },
      ],
      whyArchitectureLabel: "لماذا هذه المعمارية؟",
      whyArchitectureText:
        "مكّنت المعمارية المنفصلة من إجراء عمليات النشر بدون توقف، والتوسع المستقل لمعالجة الدفع كثيفة التزامن، وتبسيط الملكية التشغيلية عبر الفرق الهندسية.",
    },
    whatIArchitect: {
      eyebrow: "مجالات الهندسة",
      title: "مجالات الهندسة المعمارية التي أعمل عليها",
      subtitle:
        "هندسة معمارية تركز على الأنظمة الحيوية للأعمال، وليس التقنية لمجرد التقنية.",
      domainsData: [
        {
          id: "platform-architecture",
          title: "هندسة المنصات",
          description:
            "الأنظمة الموزعة، واجهات API، حدود النطاقات، سير العمل القائم على الأحداث، ومعمارية التكامل.",
          tags: ["الأنظمة الموزعة", "المعتمدة على الأحداث", "تصميم API"],
        },
        {
          id: "commerce-transaction",
          title: "أنظمة التجارة والمعاملات",
          description:
            "سير عمل المنتجات، الحجز، إتمام الشراء، الدفع، وإدارة الطلبات.",
          tags: ["إدارة الطلبات", "تكامل الدفع", "مزامنة الكتالوج"],
        },
        {
          id: "enterprise-integration",
          title: "تكامل الأنظمة المؤسسية",
          description:
            "تحديث الأنظمة القديمة، تكاملات B2B، المنصات الداخلية، وأتمتة العمليات.",
          tags: ["تكامل SAP", "الحوسبة بدون خوادم", "التحقق من العقود"],
        },
        {
          id: "ai-enabled-engineering",
          title: "الهندسة المدعومة بالذكاء الاصطناعي",
          description:
            "سير عمل قائم على الوكلاء الذكيين، أنظمة استرجاع السياق، الذكاء الهندسي، والعمليات المدعومة بالذكاء الاصطناعي.",
          tags: ["سير عمل الوكلاء", "استرجاع السياق", "أتمتة الذكاء الاصطناعي"],
        },
      ],
    },
    zaakiy: {
      eyebrow: "بحث وتطوير شخصي",
      title: "ZaakiyV3RSE",
      subtitle: "منصة ذكاء تشغيلي مبنية حول الذكاء الاصطناعي.",
      supporting:
        "منصة تجريبية تستكشف كيف يمكن للوكلاء والبيانات التشغيلية والسياق الهندسي العمل معاً لاكتشاف الأحداث التشغيلية وتحليلها والاستجابة لها.",
      exploreLink: "استكشف Zaakiy",
      flowEyebrow: "تدفق التنفيذ المفهومي",
      flowNodes: [
        { label: "الإشارات", desc: "القياس البعادي والأحداث" },
        { label: "السياق", desc: "رسم بياني للنظام" },
        { label: "الاستدلال", desc: "تقييم الوكلاء" },
        { label: "القرار", desc: "ضوابط السياسات" },
        { label: "التنفيذ", desc: "سير عمل مؤتمت" },
      ],
      exploringEyebrow: "ما أستكشفه تقنيًا",
      exploringItems: [
        {
          title: "تنسيق الوكلاء Agent Orchestration",
          desc: "توزيع المهام بين عدة وكلاء ومزامنة الحالة.",
        },
        {
          title: "الذكاء التشغيلي Operational Intelligence",
          desc: "تحليل البيانات لحظياً واكتشاف الشذوذ.",
        },
        {
          title: "استرجاع السياق Context Retrieval",
          desc: "تضمين سياق الكود، مخططات النظام، والسجل للاستدلال.",
        },
        {
          title: "الاستدلال المؤتمت Automated Reasoning",
          desc: "حل المشكلات التشغيلية بناءً على القواعد ونماذج الذكاء الاصطناعي.",
        },
        {
          title: "الإنسان ضمن دورة القرار Human-in-the-Loop",
          desc: "بوابات موافقة خاضعة للرقابة للتغييرات عالية التأثير.",
        },
        {
          title: "سير العمل التكيفي Adaptive Workflows",
          desc: "رسوم بيانية للتنفيذ الديناميكي تتكيف مع أعطال التشغيل.",
        },
      ],
    },
    engineeringNotes: {
      eyebrow: "ملاحظات هندسية",
      title: "ملاحظات هندسية",
      subtitle:
        "ملاحظات عملية حول الهندسة المعمارية والتوسع والبيانات والذكاء الاصطناعي.",
      readArticle: "قراءة المقال",
      viewAll: "عرض جميع الملاحظات الهندسية ←",
      readTimeSuffix: "مدة القراءة",
    },
    beyondArchitecture: {
      eyebrow: "ما بعد مخطط المعمارية",
      title: "ما بعد مخطط الهندسة المعمارية",
      subtitle:
        "أبقى مشاركًا من مرحلة المتطلبات والتصميم المعماري وحتى التنفيذ والاختبار والنشر والتحقق في بيئة الإنتاج.",
      executionFlowEyebrow: "سير العمل المتكامل",
      processFlow: [
        { number: "01", title: "الفهم", desc: "أهداف الأعمال والقيود" },
        { number: "02", title: "النمذجة", desc: "النطاقات وحدود النظام" },
        { number: "03", title: "التصميم", desc: "عقود API والمرونة" },
        { number: "04", title: "البناء", desc: "التنفيذ البرمجي والتسليم" },
        { number: "05", title: "التشغيل", desc: "القابلية للملاحظة والقياس" },
        { number: "06", title: "التعلم", desc: "حلقات التغذية الراجعة من الإنتاج" },
      ],
      leadershipEyebrow: "قدرات القيادة الهندسية",
      leadershipItems: [
        {
          title: "التوجيه المعماري",
          desc: "تحويل متطلبات الأعمال إلى توجيه تقني قابل للتنفيذ.",
        },
        {
          title: "ضوابط الهندسة",
          desc: "وضع الحدود والعقود والمعايير وممارسات التسليم.",
        },
        {
          title: "تمكين الفريق",
          desc: "جعل القرارات المعمارية مفهومة وقابلة للتطبيق للفرق الهندسية.",
        },
        {
          title: "ملكية التسليم",
          desc: "البقاء قريباً من التنفيذ والاختبار والنشر ونتائج بيئة الإنتاج.",
        },
      ],
      experienceEyebrow: "+13 سنة من مسيرة العمل والخبرات",
    },
    footer: {
      ctaHeading: "هل تعمل على منصة تواجه تحديات هندسية معقدة؟",
      ctaSubtitle:
        "أهتم بفرص الهندسة المعمارية وهندسة المنصات والقيادة التقنية التي تتطلب تحويل الأنظمة المعقدة إلى حلول أبسط وأكثر قابلية للتوسع والتشغيل.",
      ctaButton: "لنتحدث",
    },
    zaakiychat: {
      greeting: (koFiLink: string) =>
        `مرحباً! أنا Zaakiy، المساعد الشخصي بالذكاء الاصطناعي لسانو خان. اسألني عن خبرته المعمارية الممتدة لـ 13+ عاماً، أنظمة الإنتاج، المقالات الهندسية، أو كيفية التواصل معه!`,
      dailyLimitReached: (email: string) =>
        `وصلنا إلى الحد اليومي. يرجى التواصل مباشرة عبر البريد الإلكتروني: ${email}`,
      aiTyping: "Zaakiy يفكر...",
      placeholder: "اسأل Zaakiy أي شيء عن سانو...",
      sendButtonLabel: "إرسال",
      errorOccurred: "عذراً، حدث خطأ. يُرجى المحاولة مجدداً.",
      scopeDisclaimer: "المساعد الشخصي لسانو خان بالذكاء الاصطناعي",
    },
  },
};

const enContent = {
  nav: baseNav,
  profile: baseProfile,
  skills: baseSkills,
  services: baseServices,
  works: baseWorks,
  workCategories: baseWorkCategories,
  articles: baseArticles,
  certifications: baseCertifications,
  footer: baseFooter,
  ui: {
    localeSwitch: { en: "English", ar: "Arabic" },
    coffeeCta: "Buy me a coffee",
    hero: {
      coffeeCta: "Buy me a coffee",
      eyebrow: "TECHNICAL ARCHITECT · ENGINEERING LEAD",
      title: "ARCHITECT",
      headline: "I architect and build platforms that scale.",
      supporting:
        "I design and deliver production platforms across commerce, travel technology, enterprise systems and AI — from architecture and APIs to deployment and operations.",
      credibilityLine: [
        "13+ Years Engineering",
        "Production Systems",
        "Architecture → Delivery",
      ],
      exploreWork: "Explore My Work",
      viewArchitecture: "View Architecture",
      quote:
        "“Breaking glass ceilings in architecture — engineering scalable platforms and turning complex challenges into production reality.”",
    },
    works: {
      eyebrow: "Selected Production Systems",
      title: "Selected Production Systems",
      subtitle:
        "Platforms I've helped architect, build and deliver across commerce, automotive, travel technology and enterprise operations.",
      myContributionLabel: "MY CONTRIBUTION",
      viewProject: "View project",
      systemsData: [
        {
          id: "regional-commerce-platform",
          industry: "COMMERCE · MULTI-REGION",
          title: "Regional Enterprise Commerce Platform",
          description:
            "Multi-market regional commerce platform synchronizing product catalog, pricing, and inventory across regional markets.",
          contributions: [
            "Platform Engineering",
            "Integration",
            "Production Delivery",
          ],
          evidence: "9 regional markets",
          projectUrl: "/projects",
        },
        {
          id: "omnichannel-commerce-fabric",
          industry: "AUTOMOTIVE & ENTERPRISE COMMERCE",
          title: "Enterprise Omnichannel Commerce Fabric",
          description:
            "Event-driven integration fabric connecting ERP, PIM, and omnichannel storefronts with real-time payload validation.",
          contributions: [
            "Solution Architecture",
            "Event Streaming",
            "API Governance",
          ],
          evidence: "Production Enterprise Platform",
          projectUrl: "/projects",
        },
        {
          id: "airline-b2b-marketplace",
          industry: "TRAVEL TECH · AIRLINE AGGREGATION",
          title: "Airline NDC & Travel B2B Marketplace",
          description:
            "High-availability NDC aggregation platform handling multi-supplier airline content, pricing, and B2B booking workflows.",
          contributions: [
            "Platform Engineering",
            "NDC Integration",
            "B2B Workflows",
          ],
          evidence: "Multi-Supplier Aggregation",
          projectUrl: "/projects",
        },
        {
          id: "airport-commerce-platform",
          industry: "AIRPORT COMMERCE · TRAVEL RETAIL",
          title: "Airport Commerce & Travel Retail Platform",
          description:
            "Multi-terminal airport commerce system for real-time inventory management, order processing, and payment integrations.",
          contributions: [
            "Domain Architecture",
            "Commerce Core",
            "Resilient APIs",
          ],
          evidence: "Multi-Terminal Operations",
          projectUrl: "/projects",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture in Practice",
      title: "Architecture in Practice",
      subtitle:
        "How I turn business requirements into production architecture.",
      challengeLabel: "THE CHALLENGE",
      challengeText:
        "Build a modular airport commerce platform capable of supporting independent product experiences while retaining a shared commerce foundation for products, booking, checkout and operational workflows.",
      topologyLabel: "SYSTEM ARCHITECTURE TOPOLOGY",
      topologyEcosystem: "Airport Commerce Ecosystem",
      diagram: {
        tier1Label: "Tier 1",
        tier1Text: "Customer & POS",
        tier2Label: "Tier 2",
        tier2Text: "Web & Mobile Experience",
        interfaceLabel: "Interface Layer",
        interfaceText: "Commerce APIs Gateway",
        domainALabel: "Domain A",
        domainAText: "Shuttle / Parking",
        domainBLabel: "Domain B",
        domainBText: "Products / Retail",
        domainCLabel: "Domain C",
        domainCText: "Booking / Lounge",
        coreLabel: "Core Authority",
        coreText: "Commerce Core Engine",
        integrationsLabel: "Integrations",
        integrationsText: "Payment Gateways · OMS · Event Streaming",
      },
      keyDecisionsLabel: "KEY ARCHITECTURAL DECISIONS",
      keyDecisions: [
        {
          title: "API-First Frontend",
          desc: "Decoupled web, mobile, and terminal interfaces from backend business logic.",
        },
        {
          title: "Domain Boundaries",
          desc: "Separated product catalog, inventory, and checkout into autonomous service boundaries.",
        },
        {
          title: "Commerce Authority",
          desc: "Established single source of truth for pricing rules, promotion logic, and order status.",
        },
        {
          title: "Independent Workflows",
          desc: "Asynchronous queuing for payment gateway processing, duty-free validation, and fulfillment.",
        },
        {
          title: "CI/CD & Environment Separation",
          desc: "Automated deployment pipelines with centralized telemetry, structured logging, and distributed tracing.",
        },
      ],
      whyArchitectureLabel: "WHY THIS ARCHITECTURE?",
      whyArchitectureText:
        "The decoupled architecture enabled zero-downtime deployments, independent scaling for high-concurrency payment processing, and streamlined operational ownership across engineering teams.",
    },
    whatIArchitect: {
      eyebrow: "CORE DOMAINS",
      title: "What I Architect",
      subtitle:
        "Architecture focused on business-critical systems, not technology for technology's sake.",
      domainsData: [
        {
          id: "platform-architecture",
          title: "PLATFORM ARCHITECTURE",
          description:
            "Distributed systems, APIs, domain boundaries, event-driven workflows and integration architecture.",
          tags: ["Distributed Systems", "Event-Driven", "API Design"],
        },
        {
          id: "commerce-transaction",
          title: "COMMERCE & TRANSACTION SYSTEMS",
          description:
            "Product, booking, checkout, payment and order-management workflows.",
          tags: ["Order Management", "Payment Integration", "Catalog Sync"],
        },
        {
          id: "enterprise-integration",
          title: "ENTERPRISE INTEGRATION",
          description:
            "Legacy modernization, B2B integrations, internal platforms and operational automation.",
          tags: ["SAP Integration", "Serverless", "Contract Validation"],
        },
        {
          id: "ai-enabled-engineering",
          title: "AI-ENABLED ENGINEERING",
          description:
            "Agentic workflows, retrieval systems, engineering intelligence and AI-assisted operations.",
          tags: ["Agentic Workflows", "Context Retrieval", "AI Automation"],
        },
      ],
    },
    zaakiy: {
      eyebrow: "PERSONAL R&D",
      title: "ZaakiyV3RSE",
      subtitle: "An AI-native operations intelligence platform.",
      supporting:
        "An experimental platform exploring how agents, operational data and engineering context can work together to detect, reason about and respond to operational events.",
      exploreLink: "Explore Zaakiy",
      flowEyebrow: "CONCEPTUAL EXECUTION FLOW",
      flowNodes: [
        { label: "Signals", desc: "Telemetry & Events" },
        { label: "Context", desc: "System Graph" },
        { label: "Reasoning", desc: "Agent Evaluation" },
        { label: "Decision", desc: "Policy Guardrails" },
        { label: "Action", desc: "Automated Workflow" },
      ],
      exploringEyebrow: "WHAT I'M EXPLORING",
      exploringItems: [
        {
          title: "Agent Orchestration",
          desc: "Multi-agent task distribution and state synchronization.",
        },
        {
          title: "Operational Intelligence",
          desc: "Real-time telemetry analysis and anomaly detection.",
        },
        {
          title: "Context Retrieval",
          desc: "Embedding code context, system schemas, and history for reasoning.",
        },
        {
          title: "Automated Reasoning",
          desc: "Rule-based and LLM-driven operational problem resolution.",
        },
        {
          title: "Human-in-the-Loop",
          desc: "Controlled approval gates for high-impact system mutations.",
        },
        {
          title: "Adaptive Workflows",
          desc: "Dynamic execution graphs that adjust to runtime failure modes.",
        },
      ],
    },
    engineeringNotes: {
      eyebrow: "TECHNICAL WRITING",
      title: "Engineering Notes",
      subtitle:
        "Practical notes on architecture, scaling, data and AI engineering.",
      readArticle: "Read article",
      viewAll: "View all engineering notes →",
      readTimeSuffix: "min read",
    },
    beyondArchitecture: {
      eyebrow: "ABOUT & LEADERSHIP",
      title: "Beyond the Architecture Diagram",
      subtitle:
        "I stay involved from requirements and architecture through implementation, QA, deployment and production validation.",
      executionFlowEyebrow: "END-TO-END EXECUTION FLOW",
      processFlow: [
        { number: "01", title: "Understand", desc: "Business goals & constraints" },
        { number: "02", title: "Model", desc: "Domains & system boundaries" },
        { number: "03", title: "Design", desc: "API contracts & resilience" },
        { number: "04", title: "Build", desc: "Hands-on delivery & code" },
        { number: "05", title: "Operate", desc: "Observability & telemetry" },
        { number: "06", title: "Learn", desc: "Production feedback loops" },
      ],
      leadershipEyebrow: "ENGINEERING LEADERSHIP CAPABILITIES",
      leadershipItems: [
        {
          title: "ARCHITECTURE DIRECTION",
          desc: "Translate business requirements into implementable technical direction.",
        },
        {
          title: "ENGINEERING GUARDRAILS",
          desc: "Establish boundaries, contracts, standards and delivery practices.",
        },
        {
          title: "TEAM ENABLEMENT",
          desc: "Make architectural decisions understandable and actionable for engineering teams.",
        },
        {
          title: "DELIVERY OWNERSHIP",
          desc: "Stay close to implementation, QA, deployment and production outcomes.",
        },
      ],
      experienceEyebrow: "13+ YEARS CAREER & WORK EXPERIENCE",
    },
    footer: {
      ctaHeading: "Building a platform with complex engineering challenges?",
      ctaSubtitle:
        "I'm interested in architecture, platform engineering and technical leadership opportunities where complex systems need to become simpler, scalable and operable.",
      ctaButton: "Let's Talk",
    },
    zaakiychat: {
      greeting: (koFiLink: string) =>
        `Hi! I'm Zaakiy, Sanu Khan's personal AI assistant. Ask me anything about Sanu's 13+ years architecture experience, production systems, blog posts, or how to get in touch!`,
      dailyLimitReached: (email: string) =>
        `Daily chat limit reached. Please connect directly via email: ${email}`,
      aiTyping: "Zaakiy is thinking...",
      placeholder: "Ask Zaakiy anything about Sanu...",
      sendButtonLabel: "Send",
      errorOccurred: "Sorry, something went wrong. Please try again.",
      scopeDisclaimer: "Personal AI Assistant for Sanu Khan",
    },
  },
};

export const siteContent = {
  en: enContent,
  ar: arContent,
};

export function useSiteContent() {
  const { locale } = useLocale();
  return siteContent[locale];
}
