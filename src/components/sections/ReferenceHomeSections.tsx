import { type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Layers, Bot, Workflow, Cpu } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { useLocale } from "@/hooks/use-locale";
import { GlassCard, GlassBadge } from "@/components/ui/glass-card";

// Strict bilingual selector: t(isArabic, englishText, arabicText)
const t = (isArabic: boolean, en: string, ar: string) => (isArabic ? ar : en);

/* ──────────────────────────────────────────────────────────
   1. HERO SECTION (Fallback if directly referenced)
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
      <div className="hero-statement">
        <div className="hero-statement-text">
          {t(ar, "Engineering Clarity into Business Systems.", "هندسة الوضوح في منظومات الأعمال.")}
        </div>
      </div>
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
   2. PROOF / MARQUEE TICKER: Refined Technical Strip
   ────────────────────────────────────────────────────────── */
export function ReferenceProof() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const ROLES = [
    { en: "SYSTEM ARCHITECTURE", ar: "معمارية النظم" },
    { en: "ENTERPRISE INTEGRATION", ar: "تكامل الأنظمة المؤسسية" },
    { en: "FULL-STACK ENGINEERING", ar: "الهندسة المتكاملة" },
    { en: "AI AGENTS", ar: "وكلاء الذكاء الاصطناعي" },
    { en: "WORKFLOW AUTOMATION", ar: "أتمتة مسارات العمل" },
    { en: "CLOUD & PLATFORM ENGINEERING", ar: "هندسة السحابة والمنصات" },
  ];

  const items = [...ROLES, ...ROLES, ...ROLES];

  return (
    <div
      className="w-full overflow-hidden border-b border-black/[0.08] dark:border-white/10 bg-[#F7F7F5]/80 dark:bg-[#101010]/80 backdrop-blur-md py-4 sm:py-5"
      aria-label={t(ar, "Technical Capabilities Marquee", "مجالات الخبرة الهندسية")}
    >
      <div className="proof-ticker-track flex items-center whitespace-nowrap">
        {items.map((role, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0 px-4">
            <span className="font-extrabold uppercase text-xs sm:text-[13.5px] tracking-wider text-[#101010] dark:text-[#f7f7f5]">
              {ar ? role.ar : role.en}
            </span>
            <span className="text-[#D5360C] text-xs select-none">✳</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. ABOUT / BEYOND CODE: Built for Impact
   ────────────────────────────────────────────────────────── */
export function ReferenceImpact() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={t(ar, "About Me — Beyond Code", "عني — ما وراء الشيفرة")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#D5360C] text-sm">✳</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
            {t(ar, "01 / ABOUT ME — BEYOND CODE", "01 / حولي — ما وراء الشيفرة")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Left Column (7 cols): Editorial Narrative ── */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  ما وراء الشيفرة.
                  <br />
                  <span className="text-[#D5360C]">مبني لصنع الأثر.</span>
                </>
              ) : (
                <>
                  BEYOND CODE.
                  <br />
                  <span className="text-[#D5360C]">BUILT FOR IMPACT.</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#2a2723] dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                {t(ar, "I'm a Dubai-based Tech Lead and Solution Architect with 13+ years of experience building and integrating digital platforms.", "أنا قائد تقني ومهندس حلول معمارية مقيم في دبي بخبرة تزيد عن 13 عاماً في بناء وتكامل المنصات الرقمية.")}
              </p>
              <p>
                {t(ar, "I work across architecture, full-stack engineering, cloud infrastructure, and automation—turning difficult business requirements into systems that teams can confidently operate and evolve.", "أعمل عبر هندسة المعمارية، والتطوير الشامل، والبنية السحابية، والأتمتة — محولاً متطلبات الأعمال المعقدة إلى أنظمة تعتمد عليها الفرق بثقة وتطورها باستمرار.")}
              </p>
              <p className="font-semibold text-[#101010] dark:text-white">
                {t(ar, "My approach combines technical ownership, practical execution, and collaboration across engineering and business teams.", "يجمع أسلوبي بين الملكية التقنية، والتنفيذ العملي المتقن، والتعاون الوثيق بين فرق الهندسة والأعمال.")}
              </p>
            </div>

            {/* Core Capabilities Chips */}
            <div className="pt-4 border-t border-black/[0.08] dark:border-white/10">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                {t(ar, "CORE CAPABILITIES", "القدرات الهندسية الأساسية")}
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { en: "System Architecture", ar: "معمارية النظم" },
                  { en: "AI Agents", ar: "وكلاء الذكاء الاصطناعي" },
                  { en: "Enterprise Integrations", ar: "تكامل الأنظمة المؤسسية" },
                  { en: "Workflow Automation", ar: "أتمتة مسارات العمل" },
                  { en: "Technical Leadership", ar: "القيادة التقنية" },
                ].map((cap) => (
                  <GlassBadge key={cap.en} variant="light">
                    {ar ? cap.ar : cap.en}
                  </GlassBadge>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-5">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#101010] dark:text-white hover:text-[#D5360C] transition-colors"
              >
                <span className="border-b-2 border-current pb-0.5">
                  {t(ar, "EXPLORE SELECTED WORK", "استكشف أعمالي")}
                </span>
                <span className="text-[#D5360C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#101010] dark:text-white hover:text-[#D5360C] transition-colors"
              >
                <span className="border-b-2 border-current pb-0.5">
                  {t(ar, "LET'S CONNECT", "لنتواصل معاً")}
                </span>
                <span className="text-[#D5360C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* ── Right Column (5 cols): Authentic Portrait & "How I Work" Glass Card ── */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <GlassCard variant="light" className="p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <img
                  alt={t(ar, "Sanu Khan — Tech Lead & Solution Architect", "صورة سانو خان الهندسية")}
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] transition-transform duration-500 hover:scale-[1.02]"
                  decoding="async"
                  loading="lazy"
                  src="/assets/images/sanu-khan-editorial-monochrome.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs font-mono text-white/95 px-3 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                  <span>SANU KHAN // DUBAI</span>
                  <span className="text-[#E6D5BD]">TECH LEAD</span>
                </div>
              </div>
            </GlassCard>

            {/* "How I Work" Glass Statement */}
            <GlassCard variant="light" className="p-5 sm:p-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#D5360C] mb-2">
                {t(ar, "// HOW I WORK", "// فلسفة العمل")}
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#2a2723] dark:text-zinc-300 leading-relaxed font-normal">
                {t(ar, "Clear architecture boundaries, pragmatic engineering standards, and direct cross-functional collaboration. Making technology deliver predictable business outcomes.", "أصمم الأنظمة بوضوح كافٍ للتطور، وبمتانة تضمن الثقة في أصعب ظروف الإنتاج. الاستراتيجية تصبح ذات معنى حقيقي فقط عندما تعمل بنجاح مع مستخدمين فعليين.")}
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   4. SERVICES: 02 / Engineering That Moves Business Forward
   ────────────────────────────────────────────────────────── */
export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const services = [
    {
      num: "01",
      title: { en: "Solution Architecture", ar: "هندسة معمارية الحلول" },
      desc: {
        en: "Designing scalable systems, defining technical direction, and turning complex requirements into executable architecture.",
        ar: "تصميم أنظمة قابلة للتوسع، وتحديد التوجه التقني، وتحويل متطلبات الأعمال المعقدة إلى معمارية تنفيذية واضحة.",
      },
      image: "/assets/architecture.jpg",
      icon: Cpu,
    },
    {
      num: "02",
      title: { en: "Full-Stack Engineering", ar: "التطوير الهندسي الشامل" },
      desc: {
        en: "Building production-ready applications, APIs, and platforms with a focus on maintainability, performance, and usability.",
        ar: "بناء تطبيقات وواجهات برمجية ومنصات متكاملة جاهزة للإنتاج مع التركيز على سهولة الصيانة والأداء وتجربة الاستخدام.",
      },
      image: "/assets/frontend.jpg",
      icon: Layers,
    },
    {
      num: "03",
      title: { en: "Enterprise Integration", ar: "تكامل الأنظمة المؤسسية" },
      desc: {
        en: "Connecting ERP, PIM, commerce, and distributed systems through reliable APIs, event-driven architecture, and automation.",
        ar: "ربط أنظمة ERP وPIM والتجارة والأنظمة الموزعة من خلال واجهات برمجية موثوقة وبنية قائمة على الأحداث.",
      },
      image: "/assets/integration.jpg",
      icon: Workflow,
    },
    {
      num: "04",
      title: { en: "AI & Process Automation", ar: "الذكاء الاصطناعي وأتمتة العمليات" },
      desc: {
        en: "Designing intelligent agents, enterprise knowledge workflows, and automated business processes with appropriate human oversight.",
        ar: "تصميم وكلاء أذكياء، ومسارات استرجاع المعرفة المؤسسية، وأتمتة العمليات مع إشراف بشري مسؤول.",
      },
      image: "/assets/automation.jpg",
      icon: Bot,
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={t(ar, "Engineering Services", "الخدمات الهندسية")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {t(ar, "02 / WHAT I SOLVE", "02 / الخدمات الهندسية")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  هندسة تدفع
                  <br />
                  <span className="text-[#D5360C]">الأعمال للأمام.</span>
                </>
              ) : (
                <>
                  ENGINEERING THAT
                  <br />
                  <span className="text-[#D5360C]">MOVES BUSINESS FORWARD.</span>
                </>
              )}
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {t(ar, "From architecture decisions to production delivery, I help teams connect platforms, simplify complexity, and build reliable digital systems.", "من القرارات المعمارية والتخطيط التقني إلى تسليم بيئات الإنتاج، أساعد الفرق على ربط المنصات وبناء أنظمة رقمية موثوقة.")}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{t(ar, "VIEW ALL SERVICES", "استكشف جميع الخدمات")}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* 4 Distinct Glass Capability Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          {services.map((item) => (
            <GlassCard key={item.num} variant="light" className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06] dark:border-white/10">
                  <span className="text-xs font-mono font-bold text-[#D5360C] tracking-widest">
                    {item.num} ✳
                  </span>
                  <item.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                </div>

                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-5">
                  <img
                    alt={item.title[locale]}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={item.image}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2.5">
                  {item.title[locale]}
                </h3>

                <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                  {item.desc[locale]}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#D5360C]">
                <span>{t(ar, "ENTERPRISE-GRADE", "معايير إنتاجية معتمدة")}</span>
                <span>↗</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   5. SELECTED WORK: 03 / Systems I've Helped Shape
   ────────────────────────────────────────────────────────── */
export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  // 3 Primary Curated Featured Case Studies + 1 Multi-Tenant Platform
  const projects = [
    {
      id: "p1",
      slug: "/projects/enterprise-retail-integration",
      image: "/assets/commerce.jpg",
      index: "01 ↗",
      tag: t(ar, "ENTERPRISE COMMERCE // EVENT STREAMING", "التجارة المؤسسية // تدفق الأحداث"),
      title: t(ar, "Enterprise Retail Integration", "شبكة تكامل التجارة الإقليمية"),
      desc: t(ar, "High-throughput distributed event streaming backbone orchestrating multi-region order workflows, inventory sync, and peak-scale resilience across 9 markets.", "بنية تحتية موزعة عالية الإنتاجية لمزامنة الطلبات والكتالوجات وتنسيق المخزون في الوقت الفعلي عبر 9 أسواق إقليمية."),
      stack: ["APACHE KAFKA", "SAP ERP", "MICROSERVICES"],
    },
    {
      id: "p2",
      slug: "/projects/airline-retailing-aggregation",
      image: "/assets/systems.jpg",
      index: "02 ↗",
      tag: t(ar, "AIRLINE NDC // WORKFLOW FABRIC", "توزيع الطيران // معمارية B2B"),
      title: t(ar, "Airline Retailing & Aggregation", "منصة تجميع حجوزات الطيران"),
      desc: t(ar, "Connected travel distribution workflows, low-latency multi-supplier flight aggregation, and resilient B2B booking services.", "بنية توزيع طيران متعددة الموردين تربط بروتوكول NDC بحجوزات المؤسسات مع زمن استجابة منخفض وموثوقية عالية."),
      stack: ["SYSTEMS ARCHITECTURE", "NDC PROTOCOL", "AZURE CLOUD"],
    },
    {
      id: "p3",
      slug: "/projects/zaakiy-v3rse",
      image: "/assets/observability.jpg",
      index: "03 ↗",
      tag: t(ar, "OPERATIONAL INTELLIGENCE // AI AGENTS", "ذكاء تشغيلي // وكلاء RAG"),
      title: t(ar, "Zaakiy V3RSE Architecture", "منظومة Zaakiy V3RSE للذكاء التشغيلي"),
      desc: t(ar, "An exploration of how AI agents, enterprise knowledge, and connected systems turn operational signals into contextual decisions and verifiable outcomes.", "استكشاف تطبيقي لكيفية توظيف وكلاء الذكاء الاصطناعي والمعرفة المؤسسية لتحويل الإشارات التشغيلية إلى قرارات واعية ونتائج قابلة للتحقق."),
      stack: ["ENTERPRISE RAG", "AI AGENTS", "TELEMETRY"],
    },
  ];

  return (
    <section
      id="work"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={t(ar, "Selected Work", "أعمال مختارة")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {t(ar, "03 / SELECTED WORK", "03 / أعمال مختارة")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  أنظمة ساهمت
                  <br />
                  <span className="text-[#D5360C]">في بنائها.</span>
                </>
              ) : (
                <>
                  SYSTEMS I'VE
                  <br />
                  <span className="text-[#D5360C]">HELPED SHAPE.</span>
                </>
              )}
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {t(ar, "Selected work across enterprise commerce, distributed platforms, integration architecture, and intelligent automation.", "أعمال مختارة عبر التجارة المؤسسية، والمنصات الموزعة، وهندسة التكامل، والذكاء الاصطناعي التشغيلي.")}
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{t(ar, "VIEW ALL CASE STUDIES", "جميع المشاريع وحالات الدراسة")}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* Curated 3 Primary Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
          {projects.map((proj) => (
            <GlassCard key={proj.id} variant="light" className="flex flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06] dark:border-white/10">
                  <span className="text-[11px] font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider truncate max-w-[200px]">
                    {proj.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#D5360C] shrink-0">
                    {proj.index}
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-5">
                  <img
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={proj.image}
                  />
                </div>

                <h3 className="text-xl sm:text-[22px] font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2.5">
                  <Link to={proj.slug} className="hover:text-[#D5360C] transition-colors">
                    {proj.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                  {proj.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/10 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  to={proj.slug}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
                >
                  <span>{t(ar, "View Case Study", "عرض حالة الدراسة")}</span>
                  <span>↗</span>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   6. APPROACH: 04 / A Process Built to Work
   ────────────────────────────────────────────────────────── */
export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const steps = [
    {
      num: "01",
      title: { en: "Discover", ar: "الاستكشاف" },
      desc: {
        en: "Understand business goals, operational constraints, and the real problem to solve.",
        ar: "فهم أهداف الأعمال والقيود التشغيلية والمشكلة الحقيقية المراد حلها.",
      },
    },
    {
      num: "02",
      title: { en: "Architect", ar: "التصميم المعماري" },
      desc: {
        en: "Design the system boundaries, integration contracts, and implementation strategy.",
        ar: "تحديد حدود النظام والعقود البرمجية واستراتيجية التنفيذ العملية والمفاضلات.",
      },
    },
    {
      num: "03",
      title: { en: "Build", ar: "التنفيذ المتين" },
      desc: {
        en: "Translate architecture into production-ready software with iterative validation.",
        ar: "تحويل التصميم إلى برمجيات جاهزة للإنتاج مع التحقق المتكرر والمسؤولية الهندسية.",
      },
    },
    {
      num: "04",
      title: { en: "Evolve", ar: "التطوير والاعتمادية" },
      desc: {
        en: "Measure results, improve reliability, and refine systems as requirements change.",
        ar: "قياس النتائج وتحسين الموثوقية وتطوير الأنظمة مع نمو تعقيد الأعمال.",
      },
    },
  ];

  return (
    <section
      id="process"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={t(ar, "Engineering Approach", "منهجية العمل")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[#D5360C] text-sm">✳</span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
              {t(ar, "04 / APPROACH", "04 / منهجية العمل")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
            {ar ? (
              <>
                منهجية
                <br />
                <span className="text-[#D5360C]">صممت للنجاح.</span>
              </>
            ) : (
              <>
                A PROCESS
                <br />
                <span className="text-[#D5360C]">BUILT TO WORK.</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            {t(ar, "A practical approach that connects business context, technical decisions, and production outcomes.", "نهج عملي يربط سياق الأعمال بالقرارات التقنية ونتائج بيئات الإنتاج الحقيقية.")}
          </p>
        </div>

        {/* 4 Connected Light Glass Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => (
            <GlassCard key={step.num} variant="light" className="flex flex-col justify-between p-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#D5360C] tracking-widest block mb-4">
                  {step.num} / 04 ✳
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2">
                  {step.title[locale]}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                  {step.desc[locale]}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-black/[0.06] dark:border-white/10">
                <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  STAGE VERIFICATION
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   7. PROOF OVER PROMISES: Compact Evidence Band
   ────────────────────────────────────────────────────────── */
export function ReferenceBento() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="relative w-full py-16 sm:py-20 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard variant="light" className="p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {t(ar, "05 / PROOF OVER PROMISES", "05 / نتائج مثبتة")}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#101010] dark:text-white">
              {ar
                ? "أدلة في الأنظمة، وليست مجرد وعود."
                : "PROOF IN THE SYSTEMS. NOT JUST THE PROMISES."}
            </h3>
            <p className="max-w-xl text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {ar
                ? "تسليم منصات حيوية للأعمال وتكاملات موثوقة عبر 9 أسواق إقليمية، مبنية وفق أعلى معايير الاستقرار الهندسي."
                : "Real platform outcomes: high-availability commerce integrations, multi-market catalog synchronization, and low-latency API networks."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-s border-black/[0.08] dark:border-white/10 lg:ps-8">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">13+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {t(ar, "Years Experience", "سنوات خبرة")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">100+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {t(ar, "Delivered Systems", "أنظمة إنتاجية")}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">9</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {t(ar, "Regional Markets", "أسواق مدعومة")}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   8. LEADERSHIP: 06 / Technical Ownership & Shared Success
   ────────────────────────────────────────────────────────── */
export function ReferenceTestimonials() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const pillars = [
    {
      title: { en: "Architecture Ownership", ar: "ملكية المعمارية" },
      desc: {
        en: "Make system boundaries, risks, and technical decisions understandable and actionable across teams.",
        ar: "توضيح حدود الأنظمة والمخاطر والقرارات المعمارية لتكون مفهومة وقابلة للتنفيذ عبر الفرق.",
      },
    },
    {
      title: { en: "Engineering Leadership", ar: "القيادة الهندسية" },
      desc: {
        en: "Support teams through clear direction, collaborative problem-solving, and pragmatic technical standards.",
        ar: "دعم الفرق من خلال التوجيه الواضح، وحل المشكلات التشاركي، والمعايير الهندسية العملية.",
      },
    },
    {
      title: { en: "Business Alignment", ar: "المواءمة مع الأعمال" },
      desc: {
        en: "Connect engineering investments with operational value, delivery priorities, and long-term maintainability.",
        ar: "ربط الاستثمارات الهندسية بالقيمة التشغيلية وأولويات التسليم وسهولة الصيانة على المدى الطويل.",
      },
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {t(ar, "06 / TECHNICAL LEADERSHIP", "06 / المسؤولية المشتركة")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  الملكية التقنية.
                  <br />
                  <span className="text-[#D5360C]">النجاح المشترك.</span>
                </>
              ) : (
                <>
                  TECHNICAL OWNERSHIP.
                  <br />
                  <span className="text-[#D5360C]">SHARED SUCCESS.</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {t(ar, "Strong engineering is not only about designing better systems. It's about making decisions clear, enabling teams, and ensuring solutions survive beyond deployment.", "الهندسة القوية لا تقتصر على تصميم أنظمة أفضل فحسب؛ بل تجعل القرارات واضحة وتضمن استدامة الحلول.")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {pillars.map((pillar, i) => (
            <GlassCard key={i} variant="light" className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#D5360C] block mb-3">
                  0{i + 1} // PRINCIPLE
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2.5">
                  {pillar.title[locale]}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {pillar.desc[locale]}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   9. WRITING: 07 / Notes From The Engineering Desk
   ────────────────────────────────────────────────────────── */
export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const articles = [
    {
      slug: "/blog/api-gateway-the-bouncer-your-microservices-didnt-know-they-needed-1j0e",
      title: "API Gateway: The Bouncer Your Microservices Didn’t Know They Needed",
      tag: "ARCHITECTURE",
      image: "/assets/backend.jpg",
      desc: t(ar, "A practical look at secure, observable API entry points.", "نظرة عملية على تأمين ومراقبة بوابات واجهات البرمجة."),
      date: "OCT 2026",
    },
    {
      slug: "/blog/duckdb-the-sqlite-of-analytics-you-didnt-know-you-needed-579m",
      title: "DuckDB: The SQLite of Analytics You Didn’t Know You Needed",
      tag: "DATA ENGINEERING",
      image: "/assets/ai.jpg",
      desc: t(ar, "Fast local analytics without infrastructure overhead.", "تحليلات محلية سريعة دون أعباء إدارة البنية التحتية."),
      date: "SEP 2026",
    },
    {
      slug: "/blog/unmasking-javascript-proxies-the-secret-agents-of-your-objects-4eac",
      title: "JavaScript Proxy Explained: The Secret Agents of Your Objects",
      tag: "JAVASCRIPT",
      image: "/assets/frontend.jpg",
      desc: t(ar, "Dynamic object handling, validation, and reactivity.", "التعامل الديناميكي مع الكائنات، والتحقق، والتفاعلية."),
      date: "AUG 2026",
    },
  ];

  return (
    <section
      id="writing"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={t(ar, "Engineering Notes", "مقالات وملاحظات هندسية")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {t(ar, "07 / WRITING", "07 / مقالات وملاحظات")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  ملاحظات من
                  <br />
                  <span className="text-[#D5360C]">المكتب الهندسي.</span>
                </>
              ) : (
                <>
                  NOTES FROM THE
                  <br />
                  <span className="text-[#D5360C]">ENGINEERING DESK.</span>
                </>
              )}
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {t(ar, "Practical thinking on software architecture, engineering trade-offs, automation, and the systems behind modern digital products.", "تفكير معماري، ومفاضلات تقنية، ودروس مستفادة من بناء وإدارة الأنظمة الرقمية الحديثة.")}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{t(ar, "VIEW ALL WRITING", "قراءة جميع المقالات على DEV.TO")}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* 3 Curated Light Glass Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {articles.map((art) => (
            <GlassCard key={art.slug} variant="light" className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06] dark:border-white/10">
                  <span className="text-[11px] font-mono font-bold text-[#D5360C] uppercase tracking-wider">
                    {art.tag}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    {art.date}
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <img
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={art.image}
                  />
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[#101010] dark:text-white mb-2 leading-snug">
                  <Link to={art.slug} className="hover:text-[#D5360C] transition-colors">
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                  {art.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-black/[0.06] dark:border-white/10">
                <Link
                  to={art.slug}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
                >
                  <span>{t(ar, "Read Article", "اقرأ المقال")}</span>
                  <span>↗</span>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   10. SIGNATURE RESEARCH: 08 / Zaakiy V3RSE (Lamp Experience)
   ────────────────────────────────────────────────────────── */
export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const capabilities = ar
    ? [
        "استرجاع مؤسسي (RAG)",
        "وكلاء ذكاء اصطناعي",
        "تكامل حي للأنظمة",
        "ذكاء مسارات العمل",
      ]
    : [
        "Enterprise RAG",
        "AI Agents",
        "Live Integrations",
        "Workflow Intelligence",
      ];

  return (
    <section
      id="zaakiy"
      className="relative w-full"
      aria-label={t(ar, "SIGNATURE RESEARCH / OPERATIONAL INTELLIGENCE", "أبحاث مميزة // الذكاء التشغيلي")}
    >
      <LampContainer
        colorVariant="orange"
        className="bg-[#0b0b0c] text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
        contentClassName="max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Row 1: Full-width Centered Identity & Lamp-illuminated Headline */}
        <div className="w-full text-center flex flex-col items-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md mb-3.5">
            <span className="text-[#D5360C] text-xs">✳</span>
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E6D5BD]">
              {t(
                ar,
                "SIGNATURE RESEARCH / OPERATIONAL INTELLIGENCE",
                "أبحاث مميزة // الذكاء التشغيلي"
              )}
            </span>
          </div>

          <div
            dir="ltr"
            className="inline-flex items-baseline justify-center gap-1 text-2xl sm:text-3xl md:text-4xl tracking-tight mb-3 select-none"
          >
            <span className="font-normal text-[#F7F7F5]">Zaakiy</span>
            <span className="font-extrabold text-[#EF470D] drop-shadow-[0_2px_14px_rgba(239,71,13,0.4)]">
              V3RSE
            </span>
          </div>

          <h2 className="bg-gradient-to-b from-white via-[#f7f7f5] to-[#c8c8c4] py-1 bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent max-w-5xl leading-[1.06]">
            {t(
              ar,
              "Beyond uptime. Toward outcome intelligence.",
              "أبعد من مجرد استقرار الأنظمة. نحو ذكاء يحقق النتائج."
            )}
          </h2>
        </div>

        {/* Row 2: 1/2 Split (Side 1: Text & Capabilities, Side 2: Observability Architecture Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
          {/* Side 1: Text */}
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D5360C] mb-4">
              <span>//</span>
              <span>{t(ar, "AUTONOMOUS SYSTEM TELEMETRY", "القياس عن بُعد للأنظمة الذاتية")}</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-[#d4d4d0] leading-relaxed font-normal">
              {t(
                ar,
                "Zaakiy V3RSE explores how AI agents, enterprise knowledge, and connected systems can turn operational signals into contextual decisions and verifiable outcomes.",
                "استكشاف تطبيقي لكيفية توظيف وكلاء الذكاء الاصطناعي والمعرفة المؤسسية والأنظمة المتصلة لتحويل الإشارات التشغيلية إلى قرارات واعية ونتائج قابلة للتحقق."
              )}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-6">
              {capabilities.map((label) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-[#E6D5BD]"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/projects/zaakiy-v3rse"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#D5360C] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#AD2A09] transition-all rounded-sm shadow-lg shadow-orange-950/40"
              >
                <span>{t(ar, "EXPLORE ZAAKIY V3RSE", "استكشف ZAAKIY V3RSE")}</span>
                <span className="text-base">↗</span>
              </Link>
            </div>
          </div>

          {/* Side 2: Observability Dashboard & Telemetry Visual */}
          <div className="w-full">
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] shadow-2xl">
              {/* Terminal HUD Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="ms-2 text-xs tracking-wider text-zinc-300 inline-flex items-center" dir="ltr">
                    <span className="font-normal text-zinc-100">Zaakiy</span>
                    <span className="font-bold text-[#EF470D]">V3RSE</span>
                    <span className="text-zinc-500 mx-1.5 font-mono">//</span>
                    <span className="text-[11px] font-mono uppercase text-zinc-400">Observability Hub</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D5360C] animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {t(ar, "LIVE TELEMETRY", "عرض حي")}
                  </span>
                </div>
              </div>

              {/* Image with Controlled Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  alt="ZaakiyV3RSE Observability and Intelligence Dashboard"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  decoding="async"
                  loading="lazy"
                  src="/assets/observability.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Conceptual Demonstration Overlay Badge (No unsubstantiated claims) */}
                <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded border border-white/10">
                  <span className="text-zinc-300">AGENT ORCHESTRATION</span>
                  <span className="text-[#D5360C] font-bold">RESEARCH PROTOTYPE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LampContainer>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   11. FAQ: 09 / Frequently Asked Questions
   ────────────────────────────────────────────────────────── */
export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const faqs = [
    {
      q: t(ar, "What kind of technology challenges do you help solve?", "ما هي التحديات التقنية التي تساعد الفرق في حلها؟"),
      a: t(
        ar,
        "I work with teams on solution architecture, full-stack platforms, enterprise integrations, AI-assisted automation, and technical leadership.",
        "أعمل مع الفرق على عمارة الحلول، والمنصات المتكاملة، وتكاملات الأنظمة المؤسسية، والأتمتة بالذكاء الاصطناعي، والقيادة الهندسية."
      ),
    },
    {
      q: t(ar, "Do you collaborate with existing product and engineering teams?", "هل تتعاون مع فرق المنتجات والهندسة الحالية؟"),
      a: t(
        ar,
        "Yes. I integrate with existing product, engineering and business teams, aligning architectural decisions with delivery outcomes and operational constraints.",
        "نعم. أتكامل مع فرق المنتج والهندسة والأعمال الحالية، موائماً القرارات المعمارية مع نتائج التسليم والقيود التشغيلية."
      ),
    },
    {
      q: t(ar, "Which systems and platforms do you work with?", "ما هي الأنظمة والمنصات التي تعمل معها؟"),
      a: t(
        ar,
        "The portfolio documents work with Azure Cloud, AWS, Kafka event streaming, Node.js, React, Java, SAP ERP, PIM platforms, and Kubernetes.",
        "توثق محفظتي العمل مع سحابة Azure وAWS، وتدفق أحداث Kafka، وNode.js، وReact، وJava، وSAP ERP، ومنصات PIM، وKubernetes."
      ),
    },
    {
      q: t(ar, "Can you help modernize an existing legacy platform?", "هل يمكنك المساعدة في تحديث منصة قديمة قائمة؟"),
      a: t(
        ar,
        "Yes. I assess legacy dependencies and recommend incremental modernization backed by observable migration milestones without disrupting live business.",
        "نعم. أقوم بتقييم التبعيات القديمة واقتراح تحديث تدريجي مدعوم بمراحل انتقال خاضعة للمراقبة دون تعطيل الأعمال الحية."
      ),
    },
    {
      q: t(ar, "Do you work remotely and across regions?", "هل تعمل عن بُعد وعبر الأسواق الإقليمية؟"),
      a: t(
        ar,
        "Yes. My portfolio documents successful production deliveries across nine regional markets, from Dubai and with distributed engineering teams.",
        "نعم. توثق محفظتي تسليم مشاريع ناجحة في تسعة أسواق إقليمية، انطلاقاً من دبي ومع فرق عمل هندسية موزعة عالمياً."
      ),
    },
  ];

  return (
    <section id="faq" className="relative w-full py-20 sm:py-24" aria-label="FAQ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {ar ? (
                <>
                  الأسئلة
                  <br />
                  <span className="text-[#D5360C]">الشائعة.</span>
                </>
              ) : (
                <>
                  FREQUENT
                  <br />
                  <span className="text-[#D5360C]">QUESTIONS.</span>
                </>
              )}
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} variant="light" className="p-5 sm:p-6">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-base sm:text-lg font-bold text-[#101010] dark:text-white list-none">
                    <span>
                      0{i + 1}. {faq.q}
                    </span>
                    <span className="text-[#D5360C] font-mono text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-xs sm:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                    {faq.a}
                  </p>
                </details>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   12. CONTACT: Let's Build Something That Lasts
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
    <section id="contact" className="relative w-full py-20 sm:py-24 md:py-28" aria-label="Contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="dark"
          className="bg-gradient-to-br from-[#121214] to-[#1c120f] border border-white/15 p-8 sm:p-12 md:p-16 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Form */}
            <div className="lg:col-span-6">
              <form aria-label="Quick enquiry" onSubmit={handleContactSubmit} className="space-y-4">
                <div className="mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#D5360C] uppercase block mb-1">
                    SANU KHAN ®
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    {t(ar, "HAVE A PROJECT IN MIND?", "هل لديك مشروع أو تحدٍ تقني؟")}
                  </h3>
                </div>

                <div>
                  <label htmlFor="quick-index-name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {t(ar, "Your Name", "الاسم")}
                  </label>
                  <input
                    id="quick-index-name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                    type="text"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor="quick-index-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {t(ar, "Work Email", "البريد المهني")}
                  </label>
                  <input
                    id="quick-index-email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                    type="email"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor="quick-index-message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {t(ar, "Project Context", "تفاصيل المشروع")}
                  </label>
                  <textarea
                    id="quick-index-message"
                    name="message"
                    rows={4}
                    placeholder={t(ar, "Tell me what you're building...", "أخبرني عما تقوم ببنائه...")}
                    required
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-between rounded-lg bg-[#D5360C] px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:bg-[#AD2A09] transition-all"
                >
                  <span>{t(ar, "SEND AN EMAIL", "إرسال رسالة بريد إلكتروني")}</span>
                  <span className="text-base">↗</span>
                </button>
              </form>
            </div>

            {/* Narrative / Callout */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-[#D5360C] text-sm">✳</span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6D5BD]">
                  {t(ar, "BEYOND THE BRIEF", "ما وراء الموجز")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.02] text-white">
                {ar ? (
                  <>
                    لنبنِ معاً
                    <br />
                    ما <span className="text-[#D5360C]">يدوم.</span>
                  </>
                ) : (
                  <>
                    LET'S BUILD
                    <br />
                    SOMETHING
                    <br />
                    THAT <span className="text-[#D5360C]">LASTS.</span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {t(ar, "From complex integrations to intelligent platforms, let's turn your next technical challenge into a solution that works.", "من التكاملات المعقدة إلى المنصات الذكية، لنحول تحديك التقني القادم إلى حل هندسي موثوق يعمل بكفاءة.")}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="text-[#D5360C]">DIRECT:</span>
                <a href="mailto:hello@sanukhan.dev" className="text-white hover:text-[#D5360C] underline">
                  hello@sanukhan.dev
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
