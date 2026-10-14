import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrushRevealPortrait } from "@/components/ui/BrushRevealPortrait";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown, Code2, Boxes, Cloud, CircuitBoard, GitBranch, Mail, MapPin, Download } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { getLocalizedCaseStudy } from "@/data/caseStudies";

const join = (isArabic: boolean, en: string, ar: string) => isArabic ? ar : en;

export function ReferenceHero() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const reducedMotion = useReducedMotion();

  const enter = (delay: number, y = 20) => ({
    initial: reducedMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section id="home" className="zr-hero zr-hero-v3" aria-labelledby="zr-hero-title">
      <div className="zr-hero-three-column zr-shell">
        <div className="zr-hero-introduction">
          <motion.p className="zr-hero-v3-eyebrow" {...enter(0.05)}>
            <span className="zr-hero-v3-accent-line" aria-hidden="true" />
            {join(ar, "HELLO, I'M SANU KHAN", "مرحباً، أنا سانو خان")}
          </motion.p>
          <h1 id="zr-hero-title" className="zr-hero-v3-title">
            <motion.span {...enter(0.13)}>
              {join(ar, "A Solution", "معماري حلول")}
            </motion.span>
            <motion.span {...enter(0.21)}>
              {join(ar, "Architect", "وهندسة منصات")}
            </motion.span>
            <motion.span className="zr-hero-v3-highlight" {...enter(0.31)}>
              {join(ar, "who builds", "أبني ما")}
            </motion.span>
            <motion.span className="zr-hero-v3-highlight" {...enter(0.4)}>
              {join(ar, "what matters.", "يهم حقاً.")}
            </motion.span>
          </h1>
          <motion.p className="zr-hero-v3-summary" {...enter(0.49)}>
            {join(ar,
              "I design scalable systems, solve complex problems, and turn ideas into real-world software solutions.",
              "أصمم أنظمة قابلة للتوسع، وأحل التحديات المعقدة، وأحوّل الأفكار إلى حلول برمجية واقعية."
            )}
          </motion.p>
          <motion.div className="zr-hero-v3-actions" {...enter(0.56)}>
            <a className="zr-hero-v3-action-primary" href="#work">
              {join(ar, "View My Work", "شاهد أعمالي")}
              <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
            </a>
            <a className="zr-hero-v3-action-secondary" href="/Sanu%20Khan%20-%20Resume.pdf" download>
              {join(ar, "Download Resume", "تحميل السيرة الذاتية")}
              <Download size={17} aria-hidden="true" />
            </a>
          </motion.div>
          <motion.a className="zr-hero-v3-scroll" href="#services" {...enter(0.7)}>
            <span>{join(ar, "SCROLL TO EXPLORE", "مرّر للاستكشاف")}</span>
            <span className="zr-hero-v3-scroll-line" aria-hidden="true" />
          </motion.a>
        </div>

        <motion.div className="zr-hero-v3-person" {...enter(0.22, 28)}>
          <BrushRevealPortrait
            alt={join(ar, "Portrait of Sanu Khan wearing a beige blazer", "صورة سانو خان بسترة بيج")}
          />
          <div className="zr-hero-v3-paint-label" aria-hidden="true">
            {join(ar, "Hover to see me in color", "مرّر لرؤية الألوان")}
            <span className="zr-hero-v3-hand-arrow">↙</span>
          </div>
        </motion.div>

        <motion.aside className="zr-hero-v3-details" aria-label={join(ar, "Professional summary", "الملخص المهني")} {...enter(0.35)}>
          <div className="zr-hero-v3-detail">
            <span className="zr-hero-v3-detail-label">
              <span className="zr-hero-v3-accent-line" aria-hidden="true" />
              {join(ar, "CURRENTLY", "حالياً")}
            </span>
            <h2>{join(ar, "Solution Architect", "معماري حلول")}</h2>
            <p>{join(ar, "Designing scalable solutions for real-world impact.", "أصمم حلولاً قابلة للتوسع ذات أثر واقعي.")}</p>
          </div>
          <div className="zr-hero-v3-detail">
            <span className="zr-hero-v3-detail-label">
              <MapPin size={19} aria-hidden="true" />
              {join(ar, "BASED IN", "الموقع")}
            </span>
            <h3>{join(ar, "Dubai, UAE", "دبي، الإمارات")}</h3>
            <p>{join(ar, "Building global solutions from here.", "أبني حلولاً عالمية من هنا.")}</p>
          </div>
          <div className="zr-hero-v3-detail">
            <span className="zr-hero-v3-detail-label">
              <CircuitBoard size={19} aria-hidden="true" />
              {join(ar, "FOCUS AREAS", "مجالات التركيز")}
            </span>
            <div className="zr-hero-v3-focus">
              {(ar
                ? ["تصميم الأنظمة", "العمارة السحابية", "هندسة الخلفيات", "الأنظمة القابلة للتوسع"]
                : ["System Design", "Cloud Architecture", "Backend Engineering", "Scalable Solutions"]
              ).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

export function ReferenceProof() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { profile } = useSiteContent();
  return (
    <section className="zr-proof zr-shell" aria-label={join(ar, "Engineering experience", "الخبرة الهندسية")}>
      <p className="zr-proof-label">{join(ar, "EXPERIENCE ACROSS TECHNOLOGIES AND PLATFORMS", "خبرة عبر التقنيات والمنصات")}</p>
      <div className="zr-tech-strip" aria-label={join(ar, "Technology experience", "الخبرات التقنية")}>
        {["Azure", "Node.js", "React", "Kubernetes", "Kafka", "TypeScript"].map(name => <span key={name}>{name}</span>)}
      </div>
      <div className="zr-metrics">
        {profile.impactMetrics.map((metric) => (
          <div key={metric.label} className="zr-metric">
            <strong>{metric.value}</strong><span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const services = [
    {
      title: join(ar, "Solution Architecture", "عمارة الحلول"),
      copy: join(ar, "Architecture consulting for production systems, clear boundaries, and long-term platform decisions.", "استشارات معمارية للأنظمة الإنتاجية، وحدود المسؤولية، والقرارات طويلة المدى."),
      label: "01 / ARCHITECTURE",
    },
    {
      title: join(ar, "Enterprise Integrations", "تكامل الأنظمة المؤسسية"),
      copy: join(ar, "Connecting ERP, commerce, inventory, and event-driven services with reliable API contracts.", "ربط أنظمة ERP والتجارة والمخزون والخدمات المعتمدة على الأحداث عبر واجهات موثوقة."),
      label: "02 / INTEGRATION",
    },
    {
      title: join(ar, "Full-Stack & Cloud Platforms", "منصات الويب والسحابة"),
      copy: join(ar, "Scalable backend and frontend delivery across SaaS, cloud and enterprise environments.", "تطوير واجهات وخدمات قابلة للتوسع لمنصات SaaS والسحابة والمؤسسات."),
      label: "03 / PLATFORM",
    },
  ];
  return (
    <section id="services" className="zr-section zr-services">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "HOW I CAN HELP", "كيف يمكنني المساعدة")}</p>
          <h2>{join(ar, "What I Can Do for You", "كيف يمكنني مساعدتك")}</h2>
          <p>{join(ar, "Engineering expertise from problem discovery to dependable production systems.", "خبرة هندسية من استكشاف المشكلة حتى الأنظمة الإنتاجية الموثوقة.")}</p>
        </header>
        <div className="zr-service-grid">
          {services.map((service, i) => (
            <article key={service.label} className={"zr-service-card zr-service-card-" + (i + 1)}>
              <div className="zr-service-card-copy">
                <span className="zr-card-label">{service.label}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#contact" className="zr-service-arrow" aria-label={join(ar, "Discuss", "ناقش") + " " + service.title}><ArrowUpRight size={21} aria-hidden="true" /></a>
              </div>
              <MediaPlaceholder kind="project" index={"0" + (i + 1)} className="zr-service-media" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceExpertise() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { skills } = useSiteContent();
  const clusters = skills.clusters.slice(0, 4);
  return (
    <section id="architecture" className="zr-section zr-expertise">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "EXPERTISE", "الخبرات")}</p>
          <h2>{join(ar, "Core Skills & Expertise", "المهارات والخبرات الأساسية")}</h2>
          <p>{skills.intro}</p>
        </header>
        <div className="zr-expertise-stack">
          {clusters.map((cluster, i) => (
            <article key={cluster.title} className="zr-expertise-row">
              <div className="zr-expertise-copy">
                <span className="zr-card-label">0{i + 1} / {join(ar, "CORE CAPABILITY", "قدرة أساسية")}</span>
                <h3>{cluster.title}</h3>
                <p>{join(ar, "Production-focused capabilities across architecture, delivery, and maintainability.", "قدرات موجهة للأنظمة الإنتاجية في العمارة والتسليم وقابلية الصيانة.")}</p>
                <div className="zr-tech-tags">{cluster.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
              <MediaPlaceholder kind="project" index={"0" + (i + 4)} className="zr-expertise-media" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const ids = [
    "enterprise-retail-integration",
    "airline-retailing-aggregation",
    "automotive-omnichannel-platform",
    "real-estate-erp-architecture",
    "zaakiy-v3rse"
  ];
  const projects = ids.map(slug => getLocalizedCaseStudy(slug, locale)).filter((entry) => entry !== undefined && entry !== null);
  return (
    <section id="work" className="zr-section zr-projects">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "SELECTED WORK", "أعمال مختارة")}</p>
          <h2>{join(ar, "Selected Projects", "مشاريع مختارة")}</h2>
          <p>{join(ar, "Architecture, integrations, platforms, and experiments from real engineering work.", "معمارية الأنظمة والتكامل والمنصات والتجارب الهندسية.")}</p>
        </header>
        <div className="zr-project-grid">
          {projects.map((project, i) => (
            <Link to={"/projects/" + project.slug} key={project.slug} className={"zr-project-tile zr-project-tile-" + (i + 1)}>
              <div className="zr-project-media">
                <MediaPlaceholder kind="project" index={"0" + (i + 1)} />
                <span className="zr-project-link-icon"><ArrowUpRight size={19} aria-hidden="true" /></span>
              </div>
              <div className="zr-project-info">
                <span className="zr-card-label">{project.domain}</span>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="zr-projects-footer"><Link to="/projects" className="zr-text-action">{join(ar, "View all projects", "عرض جميع المشاريع")} <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { articles } = useSiteContent();
  const posts = articles.slice(0,3);
  return (
    <section id="writing" className="zr-section zr-writing">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar,"ENGINEERING JOURNAL","الملاحظات الهندسية")}</p>
          <h2>{join(ar,"Latest Thinking", "أحدث الأفكار")}</h2>
          <p>{join(ar,"Notes on architecture, data, programming and the decisions behind reliable software.","ملاحظات حول العمارة والبيانات والبرمجة والقرارات وراء الأنظمة الموثوقة.")}</p>
        </header>
        <div className="zr-writing-list">
          {posts.map((post,i)=>(
            <article key={post.localPath || post.title} className="zr-writing-item">
              <Link to={post.localPath} className="zr-writing-image" aria-label={post.title}>
                <MediaPlaceholder kind="article" index={String(i+1).padStart(2,"0")} />
              </Link>
              <div className="zr-writing-text">
                <span className="zr-card-label">{post.category} / 0{i+1}</span>
                <h3><Link to={post.localPath}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link to={post.localPath} className="zr-text-action">{join(ar,"Read article","اقرأ المقال")} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="zr-writing-all"><Link to="/blog" className="zr-text-action">{join(ar,"Browse all articles","تصفح جميع المقالات")} <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <section id="zaakiy" className="zr-section zr-zaakiy">
      <div className="zr-shell">
        <div className="zr-zaakiy-panel">
          <div className="zr-zaakiy-copy">
            <p className="zr-kicker">{join(ar, "R&D / OPERATIONS INTELLIGENCE", "البحث والتطوير / الذكاء التشغيلي")}</p>
            <div className="brand-zaakiy zr-zaakiy-wordmark">ZaakiyV3RSE</div>
            <h2>{join(ar, "Can a system understand whether it accomplished what it was supposed to do?", "هل يمكن للنظام فهم ما إذا كان قد حقق ما كُلّف به بالفعل؟")}</h2>
            <p>{join(ar,
              "An experiment around AI-powered operational intelligence, graph context correlation and semantic system awareness — moving beyond HTTP 200 status codes to business outcome guarantees.",
              "تجربة هندسية حول الذكاء التشغيلي المدعوم بالذكاء الاصطناعي وربط السياق والوعي بالأنظمة للتحقق من نتائج الأعمال."
            )}</p>
            <Link className="zr-button zr-button-primary" to="/projects/zaakiy-v3rse">{join(ar, "Explore the research", "استكشف البحث والتطوير")} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <div className="zr-zaakiy-display" role="img" aria-label={join(ar, "Conceptual operational intelligence layers", "رسم توضيحي لطبقات الذكاء التشغيلي")}>
            <div className="zr-zaakiy-orbit"><span /><span /><span /></div>
            <div className="zr-zaakiy-core">
              <CircuitBoard size={42} strokeWidth={1.4} aria-hidden="true" />
              <strong>ZaakiyV3RSE</strong>
              <small>CONTEXT / CORRELATION / OUTCOME</small>
            </div>
            <div className="zr-zaakiy-nodes"><span>01 / SIGNALS</span><span>02 / CONTEXT</span><span>03 / VERIFICATION</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferenceEngagement() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const options = [
    {
      num: "01",
      title: join(ar, "Architecture & Technical Review", "مراجعة العمارة والتقنيات"),
      desc: join(ar, "For teams seeking a clear technical direction before committing to a larger implementation.", "للفرق التي تحتاج إلى توجه تقني واضح قبل الالتزام بالتنفيذ."),
      points: ["System assessment", "Architecture decisions", "Risks & trade-offs", "Delivery recommendations"],
    },
    {
      num: "02",
      title: join(ar, "Platform & Integration Delivery", "تطوير المنصات والتكامل"),
      desc: join(ar, "For scoped engineering engagements spanning integration, cloud and full-stack systems.", "لمشاريع هندسية محددة النطاق تشمل التكامل والسحابة والمنصات."),
      points: ["API & backend design", "Cloud & deployment", "Enterprise integrations", "Delivery & handover"],
    },
  ];
  return (
    <section id="engagement" className="zr-section zr-engagement">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "WORKING TOGETHER", "العمل معاً")}</p>
          <h2>{join(ar, "Simple & Transparent Engagements", "طرق تعاون واضحة ومباشرة")}</h2>
          <p>{join(ar, "Defined scope and a clear technical outcome. Pricing is agreed after requirements are reviewed.", "نطاق واضح ومخرجات تقنية محددة، مع الاتفاق على التكلفة بعد مراجعة المتطلبات.")}</p>
        </header>
        <div className="zr-engagement-box">
          <div className="zr-engagement-options">
            {options.map(option => (
              <article className="zr-engagement-option" key={option.num}>
                <div className="zr-engagement-option-top"><span>{option.num} / {join(ar, "ENGAGEMENT", "التعاون")}</span><Code2 size={20} aria-hidden="true" /></div>
                <h3>{option.title}</h3>
                <p>{option.desc}</p>
                <ul>{option.points.map(point => <li key={point}>{point}</li>)}</ul>
                <a href="#contact">{join(ar, "Discuss scope", "ناقش النطاق")} <ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            ))}
          </div>
          <aside className="zr-engagement-note">
            <span className="zr-kicker">{join(ar, "SCOPE FIRST", "النطاق أولاً")}</span>
            <h3>{join(ar, "A realistic plan starts with understanding the problem.", "تبدأ الخطة الواقعية بفهم المشكلة.")}</h3>
            <p>{join(ar, "Share the business context, constraints, and timeline. I'll help clarify a sensible next step before any commitment.", "شارك سياق العمل والقيود والجدول الزمني لنحدد الخطوة المناسبة قبل أي التزام.")}</p>
            <a className="zr-gradient-link" href="#contact">{join(ar, "Start a conversation", "ابدأ المحادثة")} <ArrowUpRight size={18} aria-hidden="true" /></a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const steps = [
    [join(ar, "Discovery", "الاستكشاف"), join(ar, "Understand the business problem and operating constraints.", "فهم مشكلة العمل والقيود التشغيلية.")],
    [join(ar, "System Mapping", "تحليل الأنظمة"), join(ar, "Identify boundaries, dependencies and data ownership.", "تحديد حدود الأنظمة وتبعياتها وملكية البيانات.")],
    [join(ar, "Architecture", "التصميم المعماري"), join(ar, "Make deliberate design decisions and agree the trade-offs.", "اتخاذ قرارات معمارية واضحة والاتفاق على المفاضلات.")],
    [join(ar, "Delivery", "التنفيذ"), join(ar, "Build, integrate and validate the solution in small steps.", "بناء الحل وتكامله والتحقق منه تدريجياً.")],
    [join(ar, "Operate & Evolve", "التشغيل والتطوير"), join(ar, "Observe production behavior and iterate where it matters.", "رصد سلوك الإنتاج وتطوير ما يحقق القيمة.")],
  ];
  return (
    <section id="process" className="zr-section zr-process">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "HOW I WORK", "كيف أعمل")}</p>
          <h2>{join(ar, "My Engineering Process", "منهجي في الهندسة")}</h2>
          <p>{join(ar, "A practical route from complex requirements to reliable systems.", "خطوات عملية لتحويل المتطلبات المعقدة إلى أنظمة موثوقة.")}</p>
        </header>
        <ol className="zr-process-steps">
          {steps.map(([title,desc],i) => (
            <li key={title} className={"zr-process-step zr-process-step-" + (i + 1)}>
              <span className="zr-process-marker">0{i+1}</span>
              <div><h3>{title}</h3><p>{desc}</p></div>
              <span className="zr-process-icon" aria-hidden="true">{i === 0 ? <Boxes /> : i === 1 ? <GitBranch /> : i === 2 ? <CircuitBoard /> : i === 3 ? <Code2 /> : <Cloud />}</span>
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
    <section id="about" className="zr-section zr-about">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading">
          <p className="zr-kicker">{join(ar, "A LITTLE CONTEXT", "نبذة")}</p>
          <h2>{join(ar, "A little about how I think", "نبذة عن طريقة تفكيري")}</h2>
        </header>
        <div className="zr-about-panel">
          <div className="zr-about-avatar"><MediaPlaceholder kind="portrait" /></div>
          <div className="zr-about-copy">
            <span className="zr-kicker">SANU KHAN / ARCHITECT & ENGINEER</span>
            <blockquote>{join(ar,
              "“Good systems aren't just built. They're understood, operated and evolved.”",
              "«الأنظمة الجيدة لا تُبنى فقط، بل تُفهم وتُشغّل وتتطور.»"
            )}</blockquote>
            <p>{join(ar,
              "I started closer to infrastructure than application architecture. Working with networks and systems taught me to look at software from the outside in: what it depends on, what can fail and how each decision affects the whole.",
              "بدأت بالقرب من البنية التحتية أكثر من عمارة التطبيقات. علمني العمل مع الشبكات والأنظمة النظر إلى البرمجيات من الخارج إلى الداخل: تبعياتها ومواطن فشلها وتأثير القرارات على المنظومة."
            )}</p>
            <Link to="/about" className="zr-text-action">{join(ar, "More about me", "المزيد عني")} <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const faqs = [
    [join(ar,"What services does Sanu Khan provide?","ما الخدمات التي يقدمها سانو خان؟"),join(ar,"I provide architecture consulting, full-stack engineering, API integrations, and cloud modernization for event-driven and enterprise-grade platforms.","أقدم استشارات هندسة الحلول وتطوير البرمجيات المتكامل وتكامل الواجهات البرمجية وتحديث الأنظمة السحابية.")],
    [join(ar,"Do you work with UAE and remote clients?","هل تعمل مع عملاء الإمارات وعن بُعد؟"),join(ar,"Yes. I work with teams in the UAE and globally across discovery, architecture, delivery, and optimization phases.","نعم. أعمل مع فرق في الإمارات وحول العالم من الاستكشاف والتصميم إلى التنفيذ والتحسين.")],
    [join(ar,"Which technologies are part of your core stack?","ما التقنيات الأساسية التي تستخدمها؟"),join(ar,"I work with React, Node.js, TypeScript, Java, Spring Boot, Azure, AWS, Kubernetes, Kafka, and enterprise integration ecosystems.","أعمل باستخدام React وNode.js وTypeScript وJava وSpring Boot وAzure وAWS وKubernetes وKafka وأنظمة التكامل المؤسسية.")],
    [join(ar,"How can I contact you for a project?","كيف يمكنني التواصل بشأن مشروع؟"),join(ar,"Use the contact section on the homepage or send an email to hello@sanukhan.dev with your scope and timeline.","استخدم قسم التواصل في الصفحة الرئيسية أو أرسل رسالة إلى hello@sanukhan.dev تتضمن النطاق والجدول الزمني.")],
  ];
  return (
    <section id="faq" className="zr-section zr-faq">
      <div className="zr-shell">
        <header className="zr-section-heading zr-centered-heading"><p className="zr-kicker">FAQ</p><h2>{join(ar,"Frequently Asked Questions","أسئلة شائعة")}</h2></header>
        <div className="zr-faq-list">
          {faqs.map(([question,answer],i)=>(
            <details className="zr-faq-item" key={question}>
              <summary><span>{String(i+1).padStart(2,"0")}.</span>{question}<ChevronDown size={19} aria-hidden="true" /></summary>
              <p>{answer}</p>
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
  const [form, setForm] = useState({name:"",email:"",subject:"",message:""});
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = form.subject.trim() || "Project inquiry from sanukhan.dev";
    const body = ["Name: "+form.name, "Email: "+form.email, "", form.message].join("\n");
    window.location.href = "mailto:hello@sanukhan.dev?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  };
  return (
    <section id="contact" className="zr-contact">
      <div className="zr-shell">
        <div className="zr-contact-gradient">
          <div className="zr-contact-heading">
            <span className="zr-kicker">{join(ar,"LET'S WORK TOGETHER","لنعمل معاً")}</span>
            <h2>{join(ar,"Let's Build Something Exceptional","لنبنِ شيئاً استثنائياً")}</h2>
            <p>{join(ar,"Tell me a little about the system, platform or problem you're working on.","أخبرني عن النظام أو المنصة أو المشكلة التي تعمل عليها.")}</p>
          </div>
          <form onSubmit={send} className="zr-contact-form">
            <label>{join(ar,"Name","الاسم")}<input name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={join(ar,"Your name","اسمك")} /></label>
            <label>{join(ar,"Email","البريد الإلكتروني")}<input name="email" type="email" autoComplete="email" required maxLength={240} value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com" /></label>
            <label>{join(ar,"Project / Subject","المشروع / الموضوع")}<input name="subject" required maxLength={160} value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder={join(ar,"What are you working on?","ما الذي تعمل عليه؟")} /></label>
            <label>{join(ar,"Project details","تفاصيل المشروع")}<textarea name="message" rows={5} required maxLength={5000} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder={join(ar,"Scope, timeline, and context...","النطاق والجدول الزمني والسياق...")} /></label>
            <button className="zr-contact-submit" type="submit">{join(ar,"Compose inquiry email","إعداد رسالة الاستفسار")} <ArrowUpRight size={18} aria-hidden="true" /></button>
            <small>{join(ar,"Opens your email app with the details filled in. Nothing is submitted to a server.","يُفتح تطبيق البريد الإلكتروني مع تعبئة التفاصيل. لا يتم إرسال شيء إلى خادم.")}</small>
          </form>
        </div>
      </div>
    </section>
  );
}

export function ReferenceFooter() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return (
    <footer className="zr-footer">
      <div className="zr-shell zr-footer-layout">
        <div>
          <a href="#home" className="zr-footer-brand">SanuKhan<span>.dev</span></a>
          <p>{join(ar,"Solution Architect · Platform Engineering | Dubai, UAE","معماري حلول · هندسة المنصات | دبي، الإمارات")}</p>
        </div>
        <nav aria-label={join(ar,"Footer navigation","روابط التذييل")}>
          <a href="#services">{join(ar,"Services","الخدمات")}</a>
          <a href="#work">{join(ar,"Work","الأعمال")}</a>
          <a href="#expertise">{join(ar,"Expertise","الخبرات")}</a>
          <a href="#about">{join(ar,"About","عني")}</a>
        </nav>
        <div className="zr-footer-links">
          <a href="https://github.com/sanukhandev" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/sanukhandev/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="mailto:hello@sanukhan.dev"><Mail size={14} aria-hidden="true" /> Email</a>
        </div>
      </div>
      <div className="zr-shell zr-footer-bottom"><span>© {new Date().getFullYear()} Sanu Khan.</span><span><MapPin size={12} aria-hidden="true" /> Dubai, UAE</span></div>
    </footer>
  );
}
