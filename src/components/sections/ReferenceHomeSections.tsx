import { type FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Boxes, ChevronDown, Cloud, Code2, CircuitBoard, Download, GitBranch, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandIdentity } from "@/components/BrandIdentity";
import { BrushRevealPortrait } from "@/components/ui/BrushRevealPortrait";
import { MatrixScrambleWord } from "@/components/ui/MatrixScrambleWord";
import { ZaakiyBrain } from "@/components/ui/ZaakiyBrain";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { searchFocusedFaqs } from "@/data/faqData";

const join = (isArabic: boolean, en: string, ar: string) => (isArabic ? ar : en);
const HERO_MATRIX_WORDS_EN = ["clarity", "structure", "resilience", "reliability"];
const HERO_MATRIX_WORDS_AR = ["الوضوح", "البنية", "المرونة", "الموثوقية"];

function DevToCover({ coverImage, title, index }: { coverImage: string | null; title: string; index: number }) {
  const [failed, setFailed] = useState(false);
  if (coverImage?.startsWith("https://") && !failed) {
    return <img src={coverImage} alt={title} loading="lazy" referrerPolicy="no-referrer" className="sk-journal__cover" onError={() => setFailed(true)} />;
  }
  return <div className="sk-journal__fallback" aria-label={title}><span className="sk-mono">NOTE / 0{index + 1}</span><strong>{title}</strong></div>;
}

function SectionHeading({ eyebrow, title, intro, isArabic }: { eyebrow: string; title: string; intro?: string; isArabic: boolean }) {
  return <header className="sk-section-heading"><p className="sk-eyebrow"><span aria-hidden="true">/</span>{eyebrow}</p><h2>{title}</h2>{intro && <p className="sk-section-heading__intro">{intro}</p>}<span className="sk-heading-rule" aria-hidden="true" /><span className="sr-only">{isArabic ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span></header>;
}

export function ReferenceHero() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const enterStyle = (delay: number) => ({ animationDelay: `${delay}s` });

  return <section id="home" className="sk-hero" aria-labelledby="sk-hero-title"><div className="sk-shell sk-hero__grid">
    <div className="sk-hero__intro"><p className="sk-eyebrow sk-fade-up" style={enterStyle(0.02)}><span aria-hidden="true">01</span>{join(ar, "INTRODUCTION", "مقدمة")}</p><h1 id="sk-hero-title"><span className="sk-hero__word">{join(ar, "Engineering", "أهندس")}</span><br /><span className="sk-hero__matrix-line"><MatrixScrambleWord words={ar ? HERO_MATRIX_WORDS_AR : HERO_MATRIX_WORDS_EN} isArabic={ar} interval={3400} className="sk-hero__matrix-word" /></span><br />{join(ar, "into complex", "في الأنظمة")}<br /><span>{join(ar, "systems.", "المعقدة.")}</span></h1><p className="sk-hero__lead sk-fade-up" style={enterStyle(0.28)}>{join(ar, "I connect business problems, architecture and delivery across enterprise systems, integrations and cloud platforms.", "أربط بين مشكلات الأعمال والعمارة والتنفيذ عبر الأنظمة المؤسسية والتكاملات والمنصات السحابية.")}</p><div className="sk-hero__actions sk-fade-up" style={enterStyle(0.38)}><a className="sk-button sk-button--accent" href="#work">{join(ar, "View selected work", "استعرض الأعمال المختارة")} <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" /></a><a className="sk-text-link" href="mailto:hello@sanukhan.dev">{join(ar, "Start a conversation", "ابدأ محادثة")} <ArrowUpRight size={17} aria-hidden="true" /></a></div><a className="sk-hero__resume sk-fade-up" href="/Sanu%20Khan%20-%20Resume.pdf" download style={enterStyle(0.44)}><Download size={14} aria-hidden="true" /> {join(ar, "Download résumé", "تحميل السيرة الذاتية")}</a><p className="sk-script-note sk-fade-up" style={enterStyle(0.48)}>{join(ar, "Make the invisible legible.", "اجعل ما لا يُرى واضحاً.")}</p></div>
    <figure className="sk-hero__portrait sk-fade-up" style={enterStyle(0.18)}><BrushRevealPortrait mirrored={ar} alt={join(ar, "Portrait of Sanu Khan wearing a beige blazer", "صورة سانو خان بسترة بيج")} ariaLabel={join(ar, "Portrait of Sanu Khan", "صورة سانو خان")} /></figure>
    <aside className="sk-hero__identity sk-fade-up" aria-label={join(ar, "Professional identity", "الهوية المهنية")} style={enterStyle(0.25)}><div className="sk-hero__identity-block"><span className="sk-eyebrow"><span aria-hidden="true">/</span>{join(ar, "POSITION", "المجال")}</span><h2>{join(ar, "Tech Lead · Solution Expert", "قائد تقني · خبير حلول")}</h2><p>{join(ar, "Architecture-to-delivery ownership for systems that have to work in the real world.", "ملكية كاملة من العمارة إلى التنفيذ لأنظمة يجب أن تعمل في الواقع.")}</p></div><dl className="sk-hero__facts"><div><dt>{join(ar, "BASED IN", "الموقع")}</dt><dd><MapPin size={15} aria-hidden="true" /> Dubai, UAE</dd></div><div><dt>{join(ar, "FOCUS", "التركيز")}</dt><dd>{join(ar, "Integration · Platforms · Reliability", "التكامل · المنصات · الموثوقية")}</dd></div><div><dt>{join(ar, "SIGNATURE RESEARCH", "البحث المميز")}</dt><dd>ZaakiyV3RSE</dd></div></dl></aside>
  </div></section>;
}

export function ReferenceProof() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { profile } = useSiteContent();
  return <section className="sk-proof" aria-label={join(ar, "Selected impact", "أثر مختار")}><div className="sk-shell sk-proof__layout"><div className="sk-proof__intro"><p className="sk-eyebrow"><span aria-hidden="true">02</span>{join(ar, "SELECTED IMPACT", "أثر مختار")}</p><p>{join(ar, "Verified signals from the work behind the systems.", "مؤشرات موثقة من العمل خلف هذه الأنظمة.")}</p></div><div className="sk-proof__metrics">{profile.impactMetrics.map((metric) => <div className="sk-proof__metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="sk-proof__platforms"><span className="sk-mono">{join(ar, "ECOSYSTEMS", "البيئات التقنية")}</span><span>Azure</span><span>AWS</span><span>Kubernetes</span><span>Kafka</span><span>ERP / PIM</span><span>Power Platform</span></div></div></section>;
}

export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const capabilities = [
    {
      number: "01",
      title: join(ar, "Enterprise Architecture & Governance", "العمارة المؤسسية والحوكمة"),
      description: join(
        ar,
        "Make system boundaries, ownership and trade-offs explicit before complexity becomes operational risk.",
        "تحديد حدود الأنظمة وملكيتها ومفاضلاتها قبل أن يتحول التعقيد إلى مخاطرة تشغيلية."
      ),
      href: "/software-engineer-uae",
      actionText: join(ar, "Explore architecture services", "استكشف خدمات العمارة"),
    },
    {
      number: "02",
      title: join(ar, "Cloud & Platform Strategy", "استراتيجية السحابة والمنصات"),
      description: join(
        ar,
        "Choose an operating model that balances reliability, scale, cost and the team's ability to own it.",
        "اختيار نموذج تشغيل يوازن بين الموثوقية والتوسع والتكلفة وقدرة الفريق على امتلاكه."
      ),
      href: "/full-stack-consultant-uae",
      actionText: join(ar, "View cloud strategy solutions", "عرض حلول استراتيجية السحابة"),
    },
    {
      number: "03",
      title: join(ar, "Systems Integration & Modernization", "تكامل الأنظمة والتحديث"),
      description: join(
        ar,
        "Connect enterprise systems around explicit contracts, data ownership and recoverable workflows.",
        "ربط الأنظمة المؤسسية بعقود واضحة وملكية بيانات ومسارات قابلة للتعافي."
      ),
      href: "/api-integration-services",
      actionText: join(ar, "View integration capabilities", "عرض قدرات التكامل"),
    },
    {
      number: "04",
      title: join(ar, "Technical Leadership & Delivery", "القيادة التقنية والتنفيذ"),
      description: join(
        ar,
        "Align teams and delivery decisions with observable production behavior and a practical path forward.",
        "مواءمة الفرق وقرارات التنفيذ مع سلوك إنتاج قابل للرصد ومسار عملي إلى الأمام."
      ),
      href: "/nodejs-developer-uae",
      actionText: join(ar, "Explore technical leadership", "استكشف القيادة التقنية"),
    },
  ];

  return (
    <section id="services" className="sk-section sk-capabilities">
      <span id="architecture" className="sk-anchor" aria-hidden="true" />
      <div className="sk-shell">
        <header className="sk-section-heading">
          <p className="sk-eyebrow">
            <span aria-hidden="true">/</span>
            {join(ar, "WHAT I SOLVE", "ما أتعامل معه")}
          </p>
          <h2>{join(ar, "Where architecture meets execution.", "حيث تلتقي العمارة بالتنفيذ.")}</h2>
          <p className="sk-section-heading__intro">
            {join(
              ar,
              "The discipline is not choosing more technology. It is creating a system the business and the engineering team can understand, operate and evolve.",
              "الممارسة ليست اختيار المزيد من التقنيات، بل بناء نظام يمكن للأعمال والفريق الهندسي فهمه وتشغيله وتطويره."
            )}
          </p>
          <span className="sk-heading-rule" aria-hidden="true" />
          <span className="sr-only">{ar ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span>
        </header>

        <div className="sk-capabilities__list">
          {capabilities.map((item) => (
            <Link
              to={item.href}
              className="sk-capability group"
              key={item.number}
              aria-label={`${item.title} — ${item.actionText}`}
            >
              <span className="sk-capability__number sk-mono">{item.number}</span>
              <div className="sk-capability__copy">
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <ArrowUpRight className="sk-capability__arrow" size={20} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <div className="sk-system-line" aria-hidden="true">
          <span>{join(ar, "CONTEXT", "السياق")}</span>
          <i />
          <span>{join(ar, "ARCHITECTURE", "العمارة")}</span>
          <i />
          <span>{join(ar, "DELIVERY", "التنفيذ")}</span>
          <i />
          <span>{join(ar, "OUTCOMES", "النتائج")}</span>
        </div>
      </div>
    </section>
  );
}


const SELECTED_PROJECTS_EN = [
  {
    slug: "enterprise-retail-integration",
    title: "Enterprise Retail Integration",
    subtitle: "Connecting product, inventory, pricing and order flows across enterprise and commerce platforms.",
    domain: "Enterprise Retail & Omnichannel Commerce"
  },
  {
    slug: "airline-retailing-aggregation",
    title: "Airline Retailing & Aggregation",
    subtitle: "Normalising airline content and booking workflows across B2B and B2C platforms.",
    domain: "Travel Technology & Airline Distribution"
  },
  {
    slug: "automotive-omnichannel-platform",
    title: "Automotive Omnichannel Platform",
    subtitle: "Creating a shared workflow across digital and operational vehicle processes.",
    domain: "Automotive Retail & Fleet Operations"
  },
  {
    slug: "real-estate-erp-architecture",
    title: "AI-Assisted Real Estate ERP Architecture",
    subtitle: "Designing a multi-branch property, leasing, payments, maintenance and inventory platform in a 25-hour AI-assisted product engineering sprint.",
    domain: "Real Estate Operations & Product Architecture"
  },
  {
    slug: "zaakiy-v3rse",
    title: "Zaakiy V3RSE — Operational Intelligence Agentic Platform",
    subtitle: "Designing a configuration-driven, multi-tenant agent platform that combines source-of-truth routing, enterprise RAG, live connectors, deterministic calculations and LLM reasoning.",
    domain: "AI Platforms & Operational Intelligence"
  }
];

const SELECTED_PROJECTS_AR = [
  {
    slug: "enterprise-retail-integration",
    title: "تكامل التجزئة للمؤسسات",
    subtitle: "ربط تدفقات المنتجات والمخزون والتسعير والطلبات عبر المؤسسة ومنصات التجارة.",
    domain: "تجزئة المؤسسات والتجارة متعددة القنوات"
  },
  {
    slug: "airline-retailing-aggregation",
    title: "تجميع وتجزئة رحلات الطيران",
    subtitle: "توحيد محتوى الطيران وسير عمل الحجز عبر منصات B2B و B2C.",
    domain: "تقنيات السفر وتوزيع رحلات الطيران"
  },
  {
    slug: "automotive-omnichannel-platform",
    title: "منصة السيارات متعددة القنوات",
    subtitle: "إنشاء سير عمل مشترك عبر العمليات الرقمية والتشغيلية للسيارات.",
    domain: "تجزئة السيارات وعمليات الأسطول"
  },
  {
    slug: "real-estate-erp-architecture",
    title: "عمارة نظام ERP عقاري بمساعدة الذكاء الاصطناعي",
    subtitle: "تصميم منصة متعددة الفروع للعقارات والتأجير والمدفوعات والصيانة والمخزون ضمن sprint هندسي مدته 25 ساعة.",
    domain: "عمليات العقارات وعمارة المنتجات"
  },
  {
    slug: "zaakiy-v3rse",
    title: "منصة Zaakiy V3RSE — منصة الوكلاء للذكاء التشغيلي",
    subtitle: "تصميم منصة وكلاء موجهة بالإعدادات ومتعددة المستأجرين، تجمع بين التوجيه المعتمد وRAG المؤسسي والموصلات الحية والحسابات الحتمية واستدلال النماذج اللغوية.",
    domain: "منصات الذكاء الاصطناعي والذكاء التشغيلي"
  }
];

export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const projects = ar ? SELECTED_PROJECTS_AR : SELECTED_PROJECTS_EN;
  const visuals = [
    "/media/project-retail-cover",
    "/media/project-airline-cover",
    "/media/project-automotive-cover",
    "/media/project-erp-cover",
    "/media/project-zaakiy-cover",
  ];

  const getBentoVariant = (index: number) => {
    if (index === 0) return "sk-project--featured";
    if (index === 1) return "sk-project--tall";
    return "sk-project--standard";
  };

  return (
    <section id="work" className="sk-section sk-work">
      <div className="sk-shell">
        <header className="sk-section-heading">
          <p className="sk-eyebrow">
            <span aria-hidden="true">/</span>
            {join(ar, "SELECTED WORK", "أعمال مختارة")}
          </p>
          <h2>{join(ar, "Systems I've helped shape.", "أنظمة ساهمت في تشكيلها.")}</h2>
          <p className="sk-section-heading__intro">
            {join(
              ar,
              "Case studies grounded in integration challenges, operating constraints and architectural decisions.",
              "دراسات حالة تستند إلى تحديات التكامل والقيود التشغيلية والقرارات المعمارية."
            )}
          </p>
          <span className="sk-heading-rule" aria-hidden="true" />
          <span className="sr-only">{ar ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span>
        </header>

        <div className="sk-work__grid">
          {projects.map((project, index) => {
            const bentoClass = getBentoVariant(index);
            return (
              <Link
                to={`/projects/${project.slug}`}
                key={project.slug}
                className={`sk-project ${bentoClass}`}
              >
                <div className="sk-project__media">
                  <picture className="sk-project__picture">
                    <source
                      type="image/avif"
                      srcSet={`${visuals[index]}-480.avif 480w, ${visuals[index]}-720.avif 720w, ${visuals[index]}-960.avif 960w`}
                      sizes="(max-width: 767px) 100vw, (max-width: 1050px) 50vw, 40vw"
                    />
                    <img
                      src={`${visuals[index]}.webp`}
                      alt={join(
                        ar,
                        `Conceptual architecture visual for ${project.title}`,
                        `تصور معماري لـ ${project.title}`
                      )}
                      loading="lazy"
                      width={960}
                      height={640}
                    />
                  </picture>
                  <span className="sk-project__index sk-mono">0{index + 1}</span>
                </div>
                <div className="sk-project__copy">
                  <div>
                    <span className="sk-mono">{project.domain}</span>
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <span className="sk-text-link">
                    {join(ar, "Read case study", "اقرأ دراسة الحالة")}{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="sk-section__footer">
          <Link to="/projects" className="sk-text-link">
            {join(ar, "View all architecture work", "عرض جميع الأعمال المعمارية")}{" "}
            <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { articles } = useSiteContent();
  const { data: devToArticles } = useDevToArticles(20);
  const posts = devToArticles?.length
    ? devToArticles.slice(0, 4).map((post) => ({
        title: post.title,
        excerpt: post.description,
        category: post.tags[0] || "Engineering",
        localPath: post.localPath,
        coverImage: post.coverImage,
      }))
    : articles.slice(0, 4).map((post) => ({ ...post, coverImage: null as string | null }));

  return (
    <section id="writing" className="sk-section sk-journal">
      <div className="sk-shell">
        <header className="sk-section-heading">
          <p className="sk-eyebrow">
            <span aria-hidden="true">/</span>
            {join(ar, "ENGINEERING JOURNAL", "الملاحظات الهندسية")}
          </p>
          <h2>{join(ar, "Notes from the architecture desk.", "ملاحظات من مكتب العمارة.")}</h2>
          <p className="sk-section-heading__intro">
            {join(
              ar,
              "Field notes on architecture, technical trade-offs and operating real systems.",
              "ملاحظات عملية حول العمارة والمفاضلات التقنية وتشغيل الأنظمة الحقيقية."
            )}
          </p>
          <span className="sk-heading-rule" aria-hidden="true" />
          <span className="sr-only">{ar ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span>
        </header>

        <div className="sk-journal__grid">
          {posts.map((post, index) => {
            const isFeatured = index === 0 || (posts.length === 4 && index === 3);
            const bentoClass = isFeatured ? "sk-journal__item--featured" : "sk-journal__item--standard";
            return (
              <article className={`sk-journal__item ${bentoClass}`} key={post.localPath || post.title}>
                <Link to={post.localPath} aria-label={post.title}>
                  <DevToCover coverImage={post.coverImage} title={post.title} index={index} />
                </Link>
                <div className="sk-journal__copy">
                  <div>
                    <span className="sk-mono">{post.category} / 0{index + 1}</span>
                    <h3>
                      <Link to={post.localPath}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt}</p>
                  </div>
                  <Link to={post.localPath} className="sk-text-link">
                    {join(ar, "Read article", "اقرأ المقال")}{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <div className="sk-section__footer">
          <Link to="/blog" className="sk-text-link">
            {join(ar, "Browse all notes", "تصفح جميع الملاحظات")}{" "}
            <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <section id="zaakiy" className="sk-zaakiy">
      <div className="sk-shell sk-zaakiy__grid">
        <div className="sk-zaakiy__copy">
          <p className="sk-eyebrow">
            <span aria-hidden="true">05</span>
            {join(ar, "SIGNATURE RESEARCH / OPERATIONS INTELLIGENCE", "البحث المميز / الذكاء التشغيلي")}
          </p>
          <div className="brand-zaakiy sk-zaakiy__wordmark">ZaakiyV3RSE</div>
          <h2>{join(ar, "Beyond uptime. Toward outcome intelligence.", "ما بعد الجاهزية. نحو ذكاء النتائج.")}</h2>
          <p>
            {join(
              ar,
              "ZaakiyV3RSE explores how systems can connect technical signals to operational context and reason about whether a workflow delivered its intended outcome.",
              "يستكشف ZaakiyV3RSE كيف يمكن للأنظمة ربط الإشارات التقنية بالسياق التشغيلي والتفكير في تحقق النتيجة المقصودة من سير العمل."
            )}
          </p>
          <Link to="/projects/zaakiy-v3rse" className="sk-button sk-button--light">
            {join(ar, "Explore the research", "استكشف البحث")}{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <figure className="sk-zaakiy__visual">
          <ZaakiyBrain locale={locale} />
          <figcaption className="sk-mono">
            {join(ar, "CONCEPTUAL VISUAL / NOT A LIVE SYSTEM", "تصور مفاهيمي / ليس نظاماً حياً")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const steps = [
    [
      join(ar, "Understand", "افهم"),
      join(ar, "Start with the business problem and operating constraints.", "ابدأ بمشكلة العمل والقيود التشغيلية."),
    ],
    [
      join(ar, "Architect", "صمّم"),
      join(ar, "Map boundaries, dependencies, ownership and failure paths.", "ارسم الحدود والتبعيات والملكية ومسارات الفشل."),
    ],
    [
      join(ar, "Align", "وائم"),
      join(ar, "Make trade-offs legible to decision-makers and delivery teams.", "اجعل المفاضلات واضحة لصنّاع القرار وفرق التنفيذ."),
    ],
    [
      join(ar, "Deliver", "نفّذ"),
      join(ar, "Build, integrate and validate the smallest useful path.", "ابنِ وادمج وتحقق من أصغر مسار مفيد."),
    ],
    [
      join(ar, "Evolve", "طوّر"),
      join(ar, "Observe production behavior and improve what matters.", "راقب سلوك الإنتاج وطوّر ما يحقق القيمة."),
    ],
  ];
  const icons = [<Boxes />, <GitBranch />, <CircuitBoard />, <Code2 />, <Cloud />];

  return (
    <section id="process" className="sk-section sk-process">
      <div className="sk-shell">
        <header className="sk-section-heading">
          <p className="sk-eyebrow">
            <span aria-hidden="true">/</span>
            {join(ar, "APPROACH & LEADERSHIP", "المنهجية والقيادة")}
          </p>
          <h2>{join(ar, "From complexity to a workable plan.", "من التعقيد إلى خطة قابلة للتنفيذ.")}</h2>
          <p className="sk-section-heading__intro">
            {join(
              ar,
              "A clear sequence keeps architecture connected to the work of delivering and operating a real system.",
              "تُبقي الخطوات الواضحة العمارة متصلة بعمل تنفيذ وتشغيل النظام الحقيقي."
            )}
          </p>
          <span className="sk-heading-rule" aria-hidden="true" />
          <span className="sr-only">{ar ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span>
        </header>

        <ol className="sk-process__timeline">
          {steps.map(([title, description], index) => (
            <li key={title}>
              <div className="sk-process__top">
                <span className="sk-process__number sk-mono">0{index + 1}</span>
                <span className="sk-process__icon" aria-hidden="true">
                  {icons[index]}
                </span>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ReferenceAbout() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <section id="about" className="sk-section sk-about">
      <div className="sk-shell sk-about__grid">
        <div className="sk-about__frame-wrapper">
          <div className="sk-about__card-stack">
            {/* Layer 1: Reddish-brown back card */}
            <div className="sk-about__card sk-about__card--back" aria-hidden="true" />
            {/* Layer 2: Warm burnt-amber middle card */}
            <div className="sk-about__card sk-about__card--mid" aria-hidden="true" />
            {/* Layer 3: Front card holding portrait with exact proportions */}
            <div className="sk-about__card sk-about__card--front">
              <div className="sk-about__portrait-wrap">
                <img
                  src="/hero-avatar-cutout.avif"
                  alt={join(ar, "Portrait of Sanu Khan", "صورة سانو خان")}
                  width={340}
                  height={425}
                  loading="lazy"
                  className="sk-about__portrait-img"
                />
              </div>
              <div className="sk-about__card-footer">
                <span className="sk-mono">{join(ar, "SANU KHAN // PERSPECTIVE", "سانو خان // رؤية شخصية")}</span>
                <span className="sk-about__card-dot" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="sk-about__copy">
          <p className="sk-eyebrow">
            <span aria-hidden="true">07</span>
            {join(ar, "PERSONAL PERSPECTIVE", "رؤية شخصية")}
          </p>
          <BrandIdentity compact />
          <blockquote>
            {join(
              ar,
              "“Good systems aren't just built. They're understood, operated and evolved.”",
              "«الأنظمة الجيدة لا تُبنى فقط، بل تُفهم وتُشغّل وتتطور.»"
            )}
          </blockquote>
          <p>
            {join(
              ar,
              "I started closer to infrastructure than application architecture. That shaped how I work today: look at software from the outside in, understand what it depends on, what can fail and how each decision affects the whole.",
              "بدأت بالقرب من البنية التحتية أكثر من عمارة التطبيقات. شكّل ذلك منهجي اليوم: النظر إلى البرمجيات من الخارج إلى الداخل وفهم تبعياتها ومواطن فشلها وتأثير كل قرار على المنظومة."
            )}
          </p>
          <Link to="/about" className="sk-text-link">
            {join(ar, "More about my work", "المزيد عن عملي")}{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="faq" className="sk-section sk-faq">
      <div className="sk-shell">
        <header className="sk-section-heading">
          <p className="sk-eyebrow">
            <span aria-hidden="true">/</span>
            FAQ
          </p>
          <h2>{join(ar, "A few useful answers.", "بعض الإجابات المفيدة.")}</h2>
          <p className="sk-section-heading__intro">
            {join(
              ar,
              "Direct answers on architecture consulting, system design, technical leadership, scalability and engagement models.",
              "إجابات مباشرة حول استشارات العمارة وتصميم الأنظمة والقيادة التقنية وقابلية التوسع ونماذج التعاون."
            )}
          </p>
          <span className="sk-heading-rule" aria-hidden="true" />
          <span className="sr-only">{ar ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span>
        </header>

        <div className="sk-faq__list">
          {searchFocusedFaqs.map((item, index) => (
            <details key={item.id}>
              <summary>
                <span className="sk-mono">0{index + 1}</span>
                {join(ar, item.question.en, item.question.ar)}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{join(ar, item.answer.en, item.answer.ar)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceContact() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = ["Name: " + form.name, "Email: " + form.email, "", form.message].join("\n");
    window.location.href =
      "mailto:hello@sanukhan.dev?subject=" +
      encodeURIComponent("Project inquiry from sanukhan.dev") +
      "&body=" +
      encodeURIComponent(body);
  };
  return (
    <section id="contact" className="sk-contact">
      <div className="sk-shell sk-contact__grid">
        <div className="sk-contact__intro">
          <p className="sk-eyebrow">
            <span aria-hidden="true">08</span>
            {join(ar, "CONTACT / NEXT STEP", "التواصل / الخطوة التالية")}
          </p>
          <h2>{join(ar, "Have a complex system to untangle?", "هل لديك نظام معقّد يحتاج إلى حل؟")}</h2>
          <p>
            {join(
              ar,
              "Bring the context, constraints and the decision in front of you. We can start with clarity before commitment.",
              "شارك السياق والقيود والقرار الذي تواجهه. يمكننا البدء بالوضوح قبل الالتزام."
            )}
          </p>
          <div className="sk-contact__paths">
            <div>
              <span className="sk-mono">{join(ar, "01 / REVIEW", "01 / مراجعة")}</span>
              <strong>{join(ar, "Architecture & technical review", "مراجعة العمارة والتقنيات")}</strong>
            </div>
            <div>
              <span className="sk-mono">{join(ar, "02 / DELIVERY", "02 / تنفيذ")}</span>
              <strong>{join(ar, "Platform & integration delivery", "تطوير المنصات والتكامل")}</strong>
            </div>
          </div>
        </div>
        <form onSubmit={send} className="sk-contact__form">
          <label>
            {join(ar, "Name", "الاسم")}
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={join(ar, "Your name", "اسمك")}
            />
          </label>
          <label>
            {join(ar, "Email", "البريد الإلكتروني")}
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={240}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
            />
          </label>
          <label>
            {join(ar, "Project details", "تفاصيل المشروع")}
            <textarea
              name="message"
              rows={5}
              required
              maxLength={5000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={join(ar, "Scope, timeline and context...", "النطاق والجدول الزمني والسياق...")}
            />
          </label>
          <button className="sk-button sk-button--accent" type="submit">
            {join(ar, "Compose inquiry email", "إعداد رسالة الاستفسار")}{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <small>
            {join(ar, "Opens your email app. Nothing is submitted to a server.", "يُفتح تطبيق البريد الإلكتروني. لا يتم إرسال شيء إلى خادم.")}
          </small>
        </form>
      </div>
    </section>
  );
}

export { default as ReferenceFooter } from "@/components/sections/Footer";
