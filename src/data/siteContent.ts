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
      "فك لغز P vs NP: لماذا يؤثر على مستقبل الذكاء الاصطناعي والحوسبة الكمية",
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
      { label: "الأعمال", href: "#works" },
      { label: "الخبرات", href: "#experience" },
      { label: "المهارات", href: "#stack" },
      { label: "تواصل", href: "#contact" },
    ],
    cta: { ...baseNav.cta, label: "تواصل" },
  },
  profile: {
    ...baseProfile,
    name: "سانو خان",
    role: "مؤسس منظومة Zaakiy",
    subRole: "قائد تقني • معماري سحابي ومعماري MS • متخصص في تكاملات المؤسسات",
    subtitle:
      "أصمم أنظمة موزعة قابلة للتوسع، وتكاملات مؤسسية، ومنصات عالية الأداء لأسواق عالمية وإقليمية.",
    statement:
      "أقود هندسة المنصات والعمارة التقنية لمنظومات تجارة قائمة على الأحداث وتكاملات مؤسساتية متعددة المناطق. أنا مؤسس منظومة Zaakiy.",
    meta: [
      "+13 سنة في بناء الأنظمة الموزعة",
      "متخصص في العمارة المعتمدة على الأحداث",
      "مؤسس منظومة Zaakiy",
      "تنفيذ على Azure و AWS و Kubernetes",
    ],
    impactMetrics: [
      { value: "13+", label: "سنوات الخبرة" },
      { value: "100+", label: "أنظمة تم تسليمها" },
      { value: "9", label: "أسواق مخدومة" },
      { value: "800K+", label: "أنظمة على نطاق منتج" },
    ],
    ctas: [
      { ...baseProfile.ctas[0], label: "عرض الأعمال" },
      { ...baseProfile.ctas[1], label: "ملخص العمارة" },
      { ...baseProfile.ctas[2], label: "وظفني" },
    ],
  },
  skills: {
    ...baseSkills,
    eyebrow: "المهارات",
    title: "مجموعات الخبرة الهندسية",
    intro:
      "تنفيذ تقني بمنهجية العمارة أولاً عبر السحابة والتكاملات وهندسة المنصات بمعايير إنتاجية عالية.",
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
    blurb: "مؤسس منظومة Zaakiy • قائد تقني • معماري سحابي",
    socials: baseFooter.socials.map((s) =>
      s.label === "Buy me a coffee" ? { ...s, label: "ادعمني بقهوة" } : s,
    ),
    quickLinks: [
      { label: "الأعمال", href: "#works" },
      { label: "الخبرات", href: "#experience" },
      { label: "المهارات", href: "#stack" },
      { label: "تواصل", href: "#contact" },
    ],
    contact: {
      ...baseFooter.contact,
      location: "دبي، الإمارات",
      cta: { ...baseFooter.contact.cta, label: "تواصل" },
    },
    copyright: `© ${new Date().getFullYear()} سانو خان. جميع الحقوق محفوظة.`,
  },
  ui: {
    localeSwitch: { en: "English", ar: "العربية" },
    hero: {
      leadershipBadge: "+13 سنة من القيادة الهندسية",
      innovationLines: ["نبني", "ابتكارات", "منذ 2011"],
      floatingBadges: [
        "خدمات مصغرة",
        "الشرق الأوسط والعالم",
        "+13 سنة",
        "منذ 2011",
        "+100 عميل",
      ],
    },
    works: {
      eyebrow: "الأعمال",
      title: "دراسات حالة",
      subtitle: "تنفيذ يعتمد على الأثر عبر التجارة الموزعة وتكاملات المؤسسات.",
      categoryLabels: {
        All: "الكل",
        Commerce: "التجارة",
        Integration: "التكامل",
        Platform: "المنصة",
      },
      problem: "المشكلة",
      solution: "الحل",
      outcome: "النتيجة",
    },
    experience: {
      title: "الخبرات",
      subtitle: "مهندس ← باني أنظمة ← معماري ← قائد تقني",
      stats: ["13+ سنة", "6 أدوار", "3 دول", "متاح حالياً"],
      current: "حالي",
    },
    articles: {
      title: "رؤى تقنية",
      subtitle: "ملاحظات مختارة في العمارة التقنية.",
      read: "اقرأ المقال",
    },
    certifications: {
      title: "الشهادات",
      subtitle: "توثيق مختصر للتطوير المهني المستمر.",
      issued: "تاريخ الإصدار",
      view: "عرض الشهادة",
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
    hero: {
      leadershipBadge: "13+ Years of Engineering Leadership",
      innovationLines: ["Building", "Innovations", "since 2011"],
      floatingBadges: [
        "Microservices",
        "MENA & Global",
        "13+ Yrs",
        "Since 2011",
        "100+ Clients",
      ],
    },
    works: {
      eyebrow: "Work",
      title: "Case Studies",
      subtitle:
        "Impact-led delivery across distributed commerce and enterprise integration landscapes.",
      categoryLabels: {
        All: "All",
        Commerce: "Commerce",
        Integration: "Integration",
        Platform: "Platform",
      },
      problem: "Problem",
      solution: "Solution",
      outcome: "Outcome",
    },
    experience: {
      title: "Experience",
      subtitle: "Engineer → System Builder → Architect → Tech Lead",
      stats: ["13+ Years", "6 Roles", "3 Countries", "Currently Available"],
      current: "Current",
    },
    articles: {
      title: "Insights",
      subtitle: "Selected architecture notes.",
      read: "Read Article",
    },
    certifications: {
      title: "Certifications",
      subtitle: "Compact verification of continuous upskilling.",
      issued: "Issued",
      view: "View Certificate",
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
