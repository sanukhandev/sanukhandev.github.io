/**
 * Evidence-based areas of practice. Titles describe areas of work, not separate
 * employment roles, client endorsements, or guarantees of delivery outcomes.
 * Keep published links and English/Arabic parity intact.
 */
export const expertiseAreas = [
  {
    id: "full-stack",
    number: "01",
    title: { en: "Full-stack engineering", ar: "الهندسة والتطوير المتكامل" },
    description: {
      en: "Production-minded frontends, APIs and backend services designed as one maintainable product.",
      ar: "واجهات وخدمات خلفية وواجهات برمجية تتكامل في منتج قابل للصيانة وجاهز للإنتاج.",
    },
    specialties: {
      en: ["Full-Stack Developer", "Platform Engineering"],
      ar: ["مطور متكامل", "هندسة المنصات"],
    },
    href: "/full-stack-consultant-uae",
  },
  {
    id: "systems",
    number: "02",
    title: { en: "System design & solutions", ar: "تصميم الأنظمة وعمارة الحلول" },
    description: {
      en: "Clear architecture boundaries, resilience strategies and practical trade-offs for complex platforms.",
      ar: "حدود معمارية واضحة واستراتيجيات للموثوقية ومفاضلات عملية للمنصات المعقدة.",
    },
    specialties: {
      en: ["System Design", "Solutions Expert"],
      ar: ["تصميم الأنظمة", "خبير حلول"],
    },
    href: "/software-engineer-uae",
  },
  {
    id: "integrations",
    number: "03",
    title: { en: "Integrations & connected data", ar: "التكاملات وتدفق البيانات" },
    description: {
      en: "Contract-first APIs and reliable workflows that connect products, platforms and enterprise systems.",
      ar: "واجهات برمجية بعقود واضحة ومسارات موثوقة تربط المنتجات والمنصات وأنظمة المؤسسات.",
    },
    specialties: {
      en: ["Integration Expert", "API Strategy"],
      ar: ["خبير تكامل", "استراتيجية الواجهات البرمجية"],
    },
    href: "/api-integration-services",
  },
  {
    id: "automation",
    number: "04",
    title: { en: "Process automation", ar: "أتمتة العمليات" },
    description: {
      en: "Reduce manual handoffs through workflow design, integrations and responsible AI-assisted processes.",
      ar: "تقليل المهام اليدوية من خلال تصميم سير العمل والتكاملات وعمليات مدعومة بالذكاء الاصطناعي بمسؤولية.",
    },
    specialties: {
      en: ["Process Automation Expert", "AI Workflows"],
      ar: ["خبير أتمتة العمليات", "سير عمل ذكي"],
    },
    href: "/api-integration-services",
  },
  {
    id: "leadership",
    number: "05",
    title: { en: "Technical leadership", ar: "القيادة التقنية" },
    description: {
      en: "Align cross-functional teams, clarify ownership and turn technical decisions into executable delivery.",
      ar: "توحيد جهود الفرق متعددة التخصصات وتوضيح المسؤوليات وتحويل القرارات التقنية إلى تنفيذ فعلي.",
    },
    specialties: {
      en: ["Tech Lead", "Collaborative Team Player"],
      ar: ["قائد تقني", "شريك فعال ضمن الفريق"],
    },
    href: "/about",
  },
  {
    id: "consulting",
    number: "06",
    title: { en: "Technology & business advisory", ar: "الاستشارات التقنية والتجارية" },
    description: {
      en: "Connect business objectives with technology strategy, operating realities and measurable decisions.",
      ar: "ربط أهداف الأعمال بالاستراتيجية التقنية والواقع التشغيلي والقرارات القابلة للقياس.",
    },
    specialties: {
      en: ["Tech Consultant", "Business Consultant"],
      ar: ["مستشار تقني", "مستشار أعمال"],
    },
    href: "/contact",
  },
  {
    id: "writing",
    number: "07",
    title: { en: "Technical writing & content", ar: "الكتابة التقنية واستراتيجية المحتوى" },
    description: {
      en: "Make complex engineering concepts understandable through practical writing, documentation and content strategy.",
      ar: "تبسيط المفاهيم الهندسية المعقدة من خلال الكتابة العملية والتوثيق واستراتيجية المحتوى.",
    },
    specialties: {
      en: ["Tech Writer", "Content Strategist"],
      ar: ["كاتب تقني", "استراتيجي محتوى"],
    },
    href: "/blog",
  },
] as const;
