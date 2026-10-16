import {
  nav as baseNav,
  profile as baseProfile,
  skills as baseSkills,
  services as baseServices,
  works as baseWorks,
    articles as baseArticles,
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
      { label: "الخدمات", href: "#services" },
      { label: "الأعمال", href: "#work" },
      { label: "الملاحظات", href: "#writing" },
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
      { value: "1M+", label: "أنظمة على نطاق منتج" },
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
  articles: baseArticles.map((article, index) => ({
    ...article,
    category: arArticleCategoryMap[article.category] ?? article.category,
    title: arArticlesByIndex[index]?.title ?? article.title,
    excerpt: arArticlesByIndex[index]?.excerpt ?? article.excerpt,
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
};

const enContent = {
  nav: baseNav,
  profile: baseProfile,
  skills: baseSkills,
  services: baseServices,
  works: baseWorks,
  articles: baseArticles,
  footer: baseFooter,
};

export const siteContent = {
  en: enContent,
  ar: arContent,
};

export function useSiteContent() {
  const { locale } = useLocale();
  return siteContent[locale];
}
