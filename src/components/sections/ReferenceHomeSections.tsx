import { type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ZaakiyBrain } from "@/components/ui/ZaakiyBrain";
import { useLocale } from "@/hooks/use-locale";

// Strict bilingual selector: t(isArabic, englishText, arabicText)
const t = (isArabic: boolean, en: string, ar: string) => (isArabic ? ar : en);

/* ──────────────────────────────────────────────────────────
   1. HERO SECTION: Editorial Home Hero matching editorial-site
   ────────────────────────────────────────────────────────── */
export function ReferenceHero() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="home" className="home-hero">
      <div className="hero-bgtext">ENGINEERING FIRST.</div>
      <div className="hero-kicker">
        <span className="eyebrow">{t(ar, "TECH LEAD / SOLUTION ARCHITECT", "قائد تقني / مهندس حلول")}</span>
        <p>
          {t(
            ar,
            "Architecting connected systems. Turning difficult technical challenges into dependable outcomes.",
            "أصمم أنظمة مترابطة، وأحوّل التحديات التقنية المعقدة إلى حلول يمكن الاعتماد عليها."
          )}
        </p>
        <Link className="button white" to="/about">
          <span>{t(ar, "EXPLORE MY STORY", "اكتشف مسيرتي")}</span> <span className="arrow">↗</span>
        </Link>
      </div>
      <img
        alt={t(ar, "Sanu Khan — monochrome portrait from the portfolio repository", "سانو خان — صورة بورتريه أحادية اللون")}
        className="hero-portrait"
        data-fallback="/assets/portrait-placeholder.png"
        decoding="async"
        fetchPriority="high"
        loading="eager"
        src="/assets/images/hero_avatar.png"
      />
      <div className="hero-proj">
        <img alt="Architecture concept" decoding="async" loading="lazy" src="/assets/architecture.jpg" />
        <div className="card-caption">
          <span>{t(ar, "ARCHITECTURE / 01", "هندسة الحلول / 01")}</span>
          <span>↗</span>
        </div>
      </div>
      <div className="hero-title">
        {ar ? <>سانو<br />خان</> : <>SANU<br />KHAN</>}
        <span style={{ fontSize: ".2em", verticalAlign: "top" }}>®</span>
      </div>
      <div className="hero-bottom">
        <span>{t(ar, "BASED IN DUBAI · WORKING ACROSS BORDERS", "مقيم في دبي · أعمل عبر الحدود")}</span>
        <span>{t(ar, "SCROLL TO EXPLORE ↓", "مرّر للاستكشاف ↓")}</span>
        <span>EN / AR · LIGHT / DARK</span>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   2. PROOF / MARQUEE TICKER
   ────────────────────────────────────────────────────────── */
export function ReferenceProof() {
  return (
    <div className="marquee shell">
      <span>AZURE &amp; AWS</span>
      <span>EVENT-DRIVEN SYSTEMS</span>
      <span>FULL STACK</span>
      <span>PLATFORM ENGINEERING</span>
      <span>AI AUTOMATION</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. IMPACT: 01 / INTRODUCTION
   ────────────────────────────────────────────────────────── */
export function ReferenceImpact() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "01 / INTRODUCTION", "01 / مقدمة")}</span>
      </div>
      <div className="impact-grid">
        <div>
          <h2>
            {ar ? (
              <>
                أثري
                <br />
                من خلال
                <br />
                <span className="muted">الهندسة.</span>
              </>
            ) : (
              <>
                MY IMPACT
                <br />
                THROUGH
                <br />
                <span className="muted">ENGINEERING.</span>
              </>
            )}
          </h2>
          <p className="lead" style={{ maxWidth: "490px", marginTop: "35px" }}>
            {t(
              ar,
              "I connect architecture with execution — designing resilient platforms, leading teams and delivering solutions across enterprise ecosystems.",
              "أربط التصميم المعماري بالتنفيذ من خلال بناء منصات موثوقة وقيادة الفرق وتسليم حلول للمؤسسات."
            )}
          </p>
          <img
            alt={t(ar, "Conceptual illustration of an engineering discipline or system", "رسم توضيحي لمنظومة هندسية")}
            className="impact-img"
            decoding="async"
            loading="lazy"
            src="/assets/platform.jpg"
            style={{ height: "250px", width: "70%", margin: "30px 0 0 12%" }}
          />
        </div>
        <div>
          <img
            alt={t(ar, "Conceptual illustration of an engineering discipline or system", "رسم توضيحي لمنظومة هندسية")}
            className="impact-img"
            decoding="async"
            loading="lazy"
            src="/assets/enterprise.jpg"
          />
          <div className="impact-details">
            <div className="impact-number">
              <strong>13+</strong>
              <span>{t(ar, "YEARS OF EXPERIENCE", "سنوات خبرة")}</span>
            </div>
            <div className="impact-number">
              <strong>100+</strong>
              <span>{t(ar, "SOLUTIONS DELIVERED", "حلول تم تسليمها")}</span>
            </div>
            <div className="impact-number">
              <strong>9</strong>
              <span>{t(ar, "REGIONAL MARKETS", "أسواق إقليمية")}</span>
            </div>
            <div className="impact-number">
              <strong>1M+</strong>
              <span>{t(ar, "PRODUCT SCALE SYSTEMS", "أنظمة واسعة النطاق")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   4. SERVICES: 02 / WHAT I SOLVE
   ────────────────────────────────────────────────────────── */
export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="services" className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "02 / WHAT I SOLVE", "02 / المشكلات التي أعالجها")}</span>
      </div>
      <div className="splithead">
        <h2 className="section-heading">
          {ar ? (
            <>
              هندسة
              <br />
              تدفع <span className="muted">عجلة</span>
              <br />
              الأعمال للأمام.
            </>
          ) : (
            <>
              ENGINEERING
              <br />
              THAT <span className="muted">MOVES</span>
              <br />
              BUSINESS FORWARD.
            </>
          )}
        </h2>
        <div className="right">
          <p className="lead">
            {t(ar, "From technical direction to production delivery.", "من التخطيط التقني إلى التسليم في بيئة الإنتاج.")}
          </p>
          <Link className="button dark" to="/services">
            {t(ar, "ALL CAPABILITIES", "جميع الخدمات")} <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "55px" }}>
        <div className="service-row">
          <span className="number">01 ✳</span>
          <h3>{t(ar, "SOLUTIONS ARCHITECTURE", "هندسة الحلول")}</h3>
          <p>
            {t(
              ar,
              "Systems thinking, platform boundaries, design decisions and scalable foundations.",
              "تصميم الأنظمة وحدود المنصات والقرارات المعمارية وأسس التوسع."
            )}
          </p>
          <img alt="Solutions Architecture" decoding="async" loading="lazy" src="/assets/architecture.jpg" />
        </div>
        <div className="service-row">
          <span className="number">02 ✳</span>
          <h3>{t(ar, "FULL-STACK ENGINEERING", "التطوير المتكامل")}</h3>
          <p>
            {t(
              ar,
              "Modern digital experiences backed by resilient services and dependable APIs.",
              "تجارب رقمية حديثة تدعمها خدمات مرنة وواجهات برمجة موثوقة."
            )}
          </p>
          <img alt="Full-Stack Engineering" decoding="async" loading="lazy" src="/assets/frontend.jpg" />
        </div>
        <div className="service-row">
          <span className="number">03 ✳</span>
          <h3>{t(ar, "ENTERPRISE INTEGRATION", "تكامل أنظمة المؤسسات")}</h3>
          <p>
            {t(
              ar,
              "ERP, PIM, storefront and event-streaming systems working as one.",
              "ربط أنظمة ERP وPIM والمتاجر وتدفقات الأحداث في منظومة واحدة."
            )}
          </p>
          <img alt="Enterprise Integration" decoding="async" loading="lazy" src="/assets/integration.jpg" />
        </div>
        <div className="service-row">
          <span className="number">04 ✳</span>
          <h3>{t(ar, "AI & PROCESS AUTOMATION", "الذكاء الاصطناعي وأتمتة العمليات")}</h3>
          <p>
            {t(
              ar,
              "Intelligent workflows that reduce operational friction and improve coordination.",
              "سير عمل ذكي يقلّل التعقيد التشغيلي ويحسّن التنسيق."
            )}
          </p>
          <img alt="AI & Process Automation" decoding="async" loading="lazy" src="/assets/automation.jpg" />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   5. PROJECTS: 03 / SELECTED WORK (12-col asymmetric masonry)
   ────────────────────────────────────────────────────────── */
export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="work" className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "03 / SELECTED WORK", "03 / أعمال مختارة")}</span>
      </div>
      <div className="splithead">
        <h2 className="section-heading">
          {ar ? (
            <>
              أنظمة ساهمت
              <br />
              <span className="muted">في بنائها.</span>
            </>
          ) : (
            <>
              SYSTEMS I’VE
              <br />
              <span className="muted">HELPED SHAPE.</span>
            </>
          )}
        </h2>
        <p className="lead right">
          {t(
            ar,
            "A selection of complex platforms, integration fabrics and automation systems.",
            "نماذج من المنصات المعقدة وأنظمة التكامل والأتمتة."
          )}
        </p>
      </div>
      <div className="grid-gallery" style={{ marginTop: "80px" }}>
        <div className="project-card p1">
          <img
            alt="Operational Intelligence Ecosystem"
            className="project-image"
            decoding="async"
            loading="lazy"
            src="/assets/systems.jpg"
          />
          <div className="card-caption">
            <Link aria-label="View portfolio project gallery item 1" to="/projects/zaakiy-v3rse">
              <span>{t(ar, "OPERATIONAL INTELLIGENCE ECOSYSTEM", "منظومة الذكاء التشغيلي")}</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="tiny muted">{t(ar, "AI WORKFLOWS / ENTERPRISE", "سير عمل ذكي / مؤسسي")}</div>
        </div>
        <div className="project-card p2">
          <img
            alt="Retail Event Processing Network"
            className="project-image"
            decoding="async"
            loading="lazy"
            src="/assets/commerce.jpg"
          />
          <div className="card-caption">
            <Link aria-label="View portfolio project gallery item 2" to="/projects/enterprise-retail-integration">
              <span>{t(ar, "RETAIL EVENT PROCESSING NETWORK", "شبكة معالجة أحداث تجارة التجزئة")}</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="tiny muted">{t(ar, "EVENT STREAMING / COMMERCE", "تدفق الأحداث / التجارة")}</div>
        </div>
        <div className="project-card p3">
          <img
            alt="Enterprise Integration Fabric"
            className="project-image"
            decoding="async"
            loading="lazy"
            src="/assets/integration.jpg"
          />
          <div className="card-caption">
            <Link aria-label="View portfolio project gallery item 3" to="/projects/enterprise-retail-integration">
              <span>{t(ar, "ENTERPRISE INTEGRATION FABRIC", "منصة تكامل الأنظمة المؤسسية")}</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="tiny muted">{t(ar, "AZURE / SERVERLESS", "سحابي / معالجة بدون خوادم")}</div>
        </div>
        <div className="project-card p4">
          <img
            alt="Multi-Tenant Platform Infrastructure"
            className="project-image"
            decoding="async"
            loading="lazy"
            src="/assets/platform.jpg"
          />
          <div className="card-caption">
            <Link aria-label="View portfolio project gallery item 4" to="/projects/automotive-omnichannel-platform">
              <span>{t(ar, "MULTI-TENANT PLATFORM INFRASTRUCTURE", "بنية المنصات متعددة المستأجرين")}</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="tiny muted">{t(ar, "SaaS / CLOUD NATIVE", "برمجيات كخدمة / سحابية")}</div>
        </div>
        <div className="project-card p5">
          <img
            alt="AI-Assisted Workflow Automation"
            className="project-image"
            decoding="async"
            loading="lazy"
            src="/assets/automation.jpg"
          />
          <div className="card-caption">
            <Link aria-label="View portfolio project gallery item 5" to="/projects/zaakiy-v3rse">
              <span>{t(ar, "AI-ASSISTED WORKFLOW AUTOMATION", "أتمتة سير العمل بمساعدة الذكاء الاصطناعي")}</span>
              <span>↗</span>
            </Link>
          </div>
          <div className="tiny muted">{t(ar, "INTELLIGENT AUTOMATION", "أتمتة ذكية")}</div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "70px" }}>
        <Link className="button dark" to="/projects">
          {t(ar, "EXPLORE ALL WORK", "استكشف جميع الأعمال")} <span className="arrow">↗</span>
        </Link>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   6. APPROACH: 04 / APPROACH
   ────────────────────────────────────────────────────────── */
export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="section shell">
      <div className="center">
        <div className="labelrow" style={{ justifyContent: "center" }}>
          <span className="spark">✳</span>
          <span className="eyebrow">{t(ar, "04 / APPROACH", "04 / منهجية")}</span>
        </div>
        <h2 className="section-heading">
          {ar ? (
            <>
              منهجية
              <br />
              <span className="muted">صممت للنجاح.</span>
            </>
          ) : (
            <>
              A PROCESS
              <br />
              <span className="muted">BUILT TO WORK.</span>
            </>
          )}
        </h2>
      </div>
      <div className="four" style={{ marginTop: "45px" }}>
        <div className="processcard">
          <span className="step">01 / 04</span>
          <h3>{t(ar, "DISCOVER", "الاستكشاف")}</h3>
          <p>{t(ar, "Understand the system, users, constraints and real business problem.", "فهم النظام والمستخدمين والقيود والمشكلة التجارية الفعلية.")}</p>
        </div>
        <div className="processcard">
          <span className="step">02 / 04</span>
          <h3>{t(ar, "ARCHITECT", "التصميم المعماري")}</h3>
          <p>{t(ar, "Choose boundaries, contracts, operating model and pragmatic trade-offs.", "تحديد الحدود والعقود التقنية ونموذج التشغيل والمفاضلات العملية.")}</p>
        </div>
        <div className="processcard">
          <span className="step">03 / 04</span>
          <h3>{t(ar, "BUILD", "التنفيذ")}</h3>
          <p>{t(ar, "Ship maintainable systems with feedback and clear engineering ownership.", "تسليم أنظمة قابلة للصيانة مع ملاحظات مستمرة ومسؤولية هندسية واضحة.")}</p>
        </div>
        <div className="processcard">
          <span className="step">04 / 04</span>
          <h3>{t(ar, "EVOLVE", "التطوير المستمر")}</h3>
          <p>{t(ar, "Measure, iterate and improve reliability as complexity grows.", "القياس والتحسين المستمر ورفع الاعتمادية مع نمو التعقيد.")}</p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   7. PROOF OVER PROMISES: 05 / PROOF OVER PROMISES
   ────────────────────────────────────────────────────────── */
export function ReferenceBento() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "05 / PROOF OVER PROMISES", "05 / نتائج ملموسة")}</span>
      </div>
      <h2 className="section-heading">
        {ar ? (
          <>
            التركيز على هندسة
            <br />
            تنتج <span className="muted">نتائج.</span>
          </>
        ) : (
          <>
            FOCUSED ON
            <br />
            ENGINEERING THAT
            <br />
            <span className="muted">DELIVERS RESULTS.</span>
          </>
        )}
      </h2>
      <div className="three" style={{ marginTop: "50px" }}>
        <div className="resultblock">
          <div className="huge">13+</div>
          <p>{t(ar, "YEARS BUILDING BUSINESS-CRITICAL PLATFORMS", "سنوات في بناء منصات الأعمال الحيوية")}</p>
          <hr style={{ margin: "20px 0", borderColor: "var(--line)" }} />
          <div className="huge">9</div>
          <p>{t(ar, "MARKETS SUPPORTED IN ENTERPRISE COMMERCE", "أسواق إقليمية مدعومة في التجارة المؤسسية")}</p>
        </div>
        <img
          alt="SaaS platform engineering"
          decoding="async"
          loading="lazy"
          src="/assets/saas.jpg"
          style={{ width: "100%", height: "420px", objectFit: "cover" }}
        />
        <img
          alt="AI systems integration"
          decoding="async"
          loading="lazy"
          src="/assets/ai.jpg"
          style={{ width: "100%", height: "420px", objectFit: "cover" }}
        />
      </div>
      <img
        alt="Backend distributed infrastructure"
        className="wide-image"
        decoding="async"
        loading="lazy"
        src="/assets/backend.jpg"
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   8. THE WAY I WORK: 06 / THE WAY I WORK
   ────────────────────────────────────────────────────────── */
export function ReferenceTestimonials() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "06 / THE WAY I WORK", "06 / طريقة عملي")}</span>
      </div>
      <div className="splithead">
        <h2 className="section-heading">
          {ar ? (
            <>
              المسؤولية.
              <br />
              الوضوح. <span className="muted">روح الفريق.</span>
            </>
          ) : (
            <>
              OWNERSHIP.
              <br />
              CLARITY. <span className="muted">TEAMWORK.</span>
            </>
          )}
        </h2>
        <p className="lead right">
          {t(
            ar,
            "The qualities I value in every delivery team and technical partnership.",
            "القيم التي ألتزم بها في كل فريق عمل وشراكة تقنية."
          )}
        </p>
      </div>
      <div className="quotes" style={{ marginTop: "45px" }}>
        <div className="quote">
          <b>✳ {t(ar, "ARCHITECTURE WITH INTENT", "عمارة هادفة")}</b>
          <p>
            {t(
              ar,
              "Systems should be clear enough to evolve and resilient enough to trust.",
              "يجب أن تكون الأنظمة واضحة بما يكفي للتطور وقوية بما يكفي للثقة بها."
            )}
          </p>
        </div>
        <div className="quote">
          <b>✳ {t(ar, "DELIVERY OVER THEATRE", "التسليم الحقيقي فوق الاستعراض")}</b>
          <p>
            {t(
              ar,
              "Good strategy is meaningful only when it reaches real users and production.",
              "الاستراتيجية الجيدة تكتسب معناها فقط حين تصل إلى المستخدمين الفعليين وبيئة الإنتاج."
            )}
          </p>
        </div>
        <div className="quote">
          <b>✳ {t(ar, "ALL-TEAM THINKING", "تفكير الفريق المتكامل")}</b>
          <p>
            {t(
              ar,
              "Effective technical leadership makes complex work collaborative.",
              "القيادة التقنية الفعالة تحول العمل المعقد إلى إنجاز جماعي متعاون."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   9. WRITING: 07 / WRITING
   ────────────────────────────────────────────────────────── */
export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="writing" className="section shell">
      <div className="labelrow">
        <span className="spark">✳</span>
        <span className="eyebrow">{t(ar, "07 / WRITING", "07 / مقالات وملاحظات")}</span>
      </div>
      <div className="splithead">
        <h2 className="section-heading">
          {ar ? (
            <>
              أحدث
              <br />
              <span className="muted">ملاحظات هندسية.</span>
            </>
          ) : (
            <>
              LATEST
              <br />
              <span className="muted">ENGINEERING NOTES.</span>
            </>
          )}
        </h2>
        <p className="lead right">
          {t(
            ar,
            "Systems thinking, architecture decisions, and practical lessons from the field.",
            "تأملات في تصميم الأنظمة والقرارات المعمارية ودروس عملية من الميدان."
          )}
        </p>
      </div>
      <div className="three" style={{ marginTop: "45px" }}>
        <div className="article-card" data-article="true">
          <h3>
            <Link to="/blog/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e">
              API Gateway: The Bouncer Your Microservices Didn’t Know They Needed
            </Link>
          </h3>
          <span className="tag">ARCHITECTURE</span>
          <img alt="API Gateway editorial" decoding="async" loading="lazy" src="/assets/backend.jpg" />
          <p>{t(ar, "A practical look at secure, observable API entry points.", "نظرة عملية على تأمين ومراقبة بوابات واجهات البرمجة.")}</p>
          <div className="meta">
            <span>WRITTEN BY<br /><b>Sanu Khan</b></span>
            <span>TECHNICAL NOTES<br /><b>DEV.TO / SANUKHAN</b></span>
          </div>
          <Link className="read-more" to="/blog/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e">
            {t(ar, "READ ARTICLE ↗", "اقرأ المقال ↗")}
          </Link>
        </div>
        <div className="article-card" data-article="true">
          <h3>
            <Link to="/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m">
              DuckDB: The SQLite of Analytics You Didn’t Know You Needed
            </Link>
          </h3>
          <span className="tag">DATA ENGINEERING</span>
          <img alt="DuckDB editorial" decoding="async" loading="lazy" src="/assets/ai.jpg" />
          <p>{t(ar, "Fast local analytics without infrastructure overhead.", "تحليلات محلية سريعة دون أعباء إدارة البنية التحتية.")}</p>
          <div className="meta">
            <span>WRITTEN BY<br /><b>Sanu Khan</b></span>
            <span>TECHNICAL NOTES<br /><b>DEV.TO / SANUKHAN</b></span>
          </div>
          <Link className="read-more" to="/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m">
            {t(ar, "READ ARTICLE ↗", "اقرأ المقال ↗")}
          </Link>
        </div>
        <div className="article-card" data-article="true">
          <h3>
            <Link to="/blog/unmasking-javascript-proxies-the-secret-agents-of-your-objects-4eac">
              JavaScript Proxy Explained
            </Link>
          </h3>
          <span className="tag">JAVASCRIPT</span>
          <img alt="JavaScript Proxy editorial" decoding="async" loading="lazy" src="/assets/frontend.jpg" />
          <p>{t(ar, "Dynamic object handling, validation and reactivity.", "التعامل الديناميكي مع الكائنات، والتحقق، والتفاعلية.")}</p>
          <div className="meta">
            <span>WRITTEN BY<br /><b>Sanu Khan</b></span>
            <span>TECHNICAL NOTES<br /><b>DEV.TO / SANUKHAN</b></span>
          </div>
          <Link className="read-more" to="/blog/unmasking-javascript-proxies-the-secret-agents-of-your-objects-4eac">
            {t(ar, "READ ARTICLE ↗", "اقرأ المقال ↗")}
          </Link>
        </div>
      </div>
      <div style={{ marginTop: "38px" }}>
        <Link className="button dark" to="/blog">
          {t(ar, "READ ALL ARTICLES", "قراءة جميع المقالات")} <span className="arrow">↗</span>
        </Link>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   10. INDEPENDENT INITIATIVE: 08 / ZAAKIYV3RSE
   ────────────────────────────────────────────────────────── */
export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="zaakiy" className="workbench">
      <div className="shell">
        <div className="splithead">
          <div>
            <div className="labelrow">
              <span className="spark">✳</span>
              <span className="eyebrow">{t(ar, "08 / INDEPENDENT INITIATIVE", "08 / مبادرة مستقلة")}</span>
            </div>
            <h2>
              MEET <span className="light-orange">ZAAKIY</span>
              <br />
              V3RSE.
            </h2>
          </div>
          <p className="lead right">
            {t(
              ar,
              "An exploration of operational intelligence, automation and connected digital experiences.",
              "استكشاف للذكاء التشغيلي والأتمتة والتجارب الرقمية المتصلة."
            )}
          </p>
        </div>
        <div className="my-8">
          <ZaakiyBrain locale={locale} />
        </div>
        <img
          alt="ZaakiyV3RSE Observability"
          className="wide-image"
          decoding="async"
          loading="lazy"
          src="/assets/observability.jpg"
        />
        <p className="tiny" style={{ marginTop: "15px", color: "#aaa" }}>
          {t(ar, "FOUNDER / PRODUCT THINKING / INTELLIGENT SYSTEMS", "مؤسس / تفكير منتج / أنظمة ذكية")}
        </p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   11. FAQ: 09 / FAQ
   ────────────────────────────────────────────────────────── */
export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="faq" className="section shell">
      <div className="qa">
        <div>
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">FAQ</span>
          </div>
          <h2 className="section-heading">
            {ar ? (
              <>
                الأسئلة
                <br />
                الشائعة
              </>
            ) : (
              <>
                FREQUENT
                <br />
                QUESTIONS
              </>
            )}
          </h2>
        </div>
        <div>
          <details className="faqrow faq-details">
            <summary>01. {t(ar, "What can you help our team deliver?", "ما الذي يمكنك مساعدة فريقنا في تسليمه؟")}</summary>
            <p>
              {t(
                ar,
                "I work with teams on solution architecture, full-stack platforms, enterprise integrations, AI-assisted automation, and technical leadership.",
                "أعمل مع الفرق على عمارة الحلول، المنصات المتكاملة، تكاملات المؤسسات، الأتمتة بالذكاء الاصطناعي، والقيادة التقنية."
              )}
            </p>
          </details>
          <details className="faqrow faq-details">
            <summary>02. {t(ar, "Do you collaborate with existing product teams?", "هل تتعاون مع فرق المنتجات الحالية؟")}</summary>
            <p>
              {t(
                ar,
                "Yes. I integrate with existing product, engineering and business teams, aligning decisions with delivery outcomes and operational constraints.",
                "نعم. أتكامل مع فرق المنتج والهندسة والأعمال الحالية، موائماً القرارات مع نتائج التسليم والقيود التشغيلية."
              )}
            </p>
          </details>
          <details className="faqrow faq-details">
            <summary>03. {t(ar, "Which systems and platforms do you work with?", "ما هي الأنظمة والمنصات التي تعمل معها؟")}</summary>
            <p>
              {t(
                ar,
                "The repository documents work with Azure, AWS, Kafka, Node.js, React, Java, SAP, PIM, API integration and Kubernetes.",
                "توثق محفظتي العمل مع Azure و AWS و Kafka و Node.js و React و Java و SAP و PIM وتكاملات API و Kubernetes."
              )}
            </p>
          </details>
          <details className="faqrow faq-details">
            <summary>04. {t(ar, "Can you help modernize an existing platform?", "هل يمكنك المساعدة في تحديث منصة قائمة؟")}</summary>
            <p>
              {t(
                ar,
                "Yes. I can assess legacy dependencies and recommend incremental modernization backed by observable migration milestones.",
                "نعم. يمكنني تقييم التبعيات القديمة واقتراح تحديث تدريجي مدعوم بمراحل انتقال خاضعة للمراقبة."
              )}
            </p>
          </details>
          <details className="faqrow faq-details">
            <summary>05. {t(ar, "Do you work remotely and across regions?", "هل تعمل عن بُعد وعبر المناطق؟")}</summary>
            <p>
              {t(
                ar,
                "Yes. My portfolio documents delivery across nine markets, from Dubai and with distributed teams.",
                "نعم. توثق محفظتي تسليم مشاريع في تسعة أسواق، من دبي ومع فرق عمل موزعة عالمياً."
              )}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   12. CONTACT: BEYOND THE BRIEF / FOOTER CTA
   ────────────────────────────────────────────────────────── */
export function ReferenceContact() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:hello@sanukhan.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section shell">
      <div className="footer-cta">
        <form aria-label="Quick enquiry" className="contact-box" onSubmit={handleContactSubmit}>
          <h4>SANU KHAN ®</h4>
          <p className="tiny">{t(ar, "HAVE A PROJECT IN MIND?", "هل لديك مشروع في بالك؟")}</p>
          <div className="formrow">
            <label htmlFor="quick-index-name">{t(ar, "Your Name", "الاسم")}</label>
            <input id="quick-index-name" name="name" placeholder="Jane Smith" required type="text" />
          </div>
          <div className="formrow">
            <label htmlFor="quick-index-email">{t(ar, "Work Email", "البريد المهني")}</label>
            <input id="quick-index-email" name="email" placeholder="jane@company.com" required type="email" />
          </div>
          <div className="formrow">
            <label htmlFor="quick-index-message">{t(ar, "Project Context", "تفاصيل المشروع")}</label>
            <textarea
              id="quick-index-message"
              name="message"
              placeholder={t(ar, "Tell me what you're building...", "أخبرني عما تقوم ببنائه...")}
              required
            />
          </div>
          <button className="button dark" type="submit" style={{ justifyContent: "space-between", width: "100%" }}>
            {t(ar, "SEND AN EMAIL", "إرسال رسالة")} <span className="arrow">↗</span>
          </button>
        </form>
        <div>
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">{t(ar, "BEYOND THE BRIEF", "ما وراء الموجز")}</span>
          </div>
          <h2>
            {ar ? (
              <>
                لنبنِ معاً
                <br />
                ما <span className="light-orange">يدوم.</span>
              </>
            ) : (
              <>
                LET'S BUILD
                <br />
                SOMETHING
                <br />
                THAT <span className="light-orange">LASTS.</span>
              </>
            )}
          </h2>
          <p className="lead" style={{ maxWidth: "430px" }}>
            {t(
              ar,
              "Architecture, engineering and delivery. One thoughtful conversation at a time.",
              "العمارة الهندسية والتطوير والتسليم. حوار بناء في كل خطوة."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
