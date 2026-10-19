import { type FormEvent, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  CircuitBoard,
  Cpu,
  GitBranch,
  Layers,
  Sparkles,
  Star,
  Users,
  Zap,
  Activity,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BrandIdentity } from "@/components/BrandIdentity";
import { ZaakiyBrain } from "@/components/ui/ZaakiyBrain";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { searchFocusedFaqs } from "@/data/faqData";
import { cn } from "@/lib/utils";

// Strict bilingual selector: t(isArabic, englishText, arabicText)
const t = (isArabic: boolean, en: string, ar: string) => (isArabic ? ar : en);
// Backward compatibility alias
const join = t;

function DevToCover({
  coverImage,
  title,
  index,
}: {
  coverImage: string | null;
  title: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  if (coverImage?.startsWith("https://") && !failed) {
    return (
      <img
        src={coverImage}
        alt={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="sk-journal__cover"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="sk-journal__fallback" aria-label={title}>
      <span className="sk-mono">NOTE / 0{index + 1}</span>
      <strong>{title}</strong>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   1. HERO SECTION: Trending Asymmetrical Collage Layout
   Clean, desaturated white/light background in light mode,
   dark in dark mode. High-contrast typography & interactive badges.
   ────────────────────────────────────────────────────────── */
export function ReferenceHero() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const pillars = [
    {
      num: "01",
      title: t(ar, "SYSTEM DESIGN & CLOUD MESH", "تصميم النظم والشبكات السحابية"),
      desc: t(
        ar,
        "Azure, AWS & Kubernetes event meshes engineered for high throughput and 99.99% operational uptime.",
        "مسارات أحداث سحابية على Azure وAWS وKubernetes تضمن إنتاجية فائقة وجاهزية تشغيلية 99.99%."
      ),
      tags: ["Azure", "AWS", "Kafka", "Kubernetes"],
    },
    {
      num: "02",
      title: t(ar, "ENTERPRISE INTEGRATIONS & AUTOMATION", "تكاملات المؤسسات والأتمتة"),
      desc: t(
        ar,
        "Unifying SAP ERP, PIM, Shopify Plus & OMS around explicit schema contracts and idempotent streams.",
        "توحيد أنظمة SAP ERP وPIM وShopify وOMS بعقود بيانات منظمة وطوابير متسامحة مع الأعطال."
      ),
      tags: ["SAP ERP", "PIM", "Shopify Plus", "REST / EventHubs"],
    },
    {
      num: "03",
      title: t(ar, "AI, MULTI-AGENT & RAG PLATFORMS", "الذكاء الاصطناعي ووكلاء RAG"),
      desc: t(
        ar,
        "Creator of ZaakiyV3RSE: connecting deterministic business logic with enterprise RAG intelligence.",
        "مؤسس ZaakiyV3RSE: ربط الحسابات الحتمية وقواعد الأعمال بـ RAG المؤسسي واستدلال النماذج."
      ),
      tags: ["ZaakiyV3RSE", "Agentic RAG", "LLM Reasoning"],
    },
  ];

  const seoChips = [
    t(ar, "Extended Full-Stack", "مطور شامل متقدم"),
    t(ar, "System Design", "تصميم النظم"),
    t(ar, "Solutions Expert", "خبير حلول"),
    t(ar, "Tech Consultant", "مستشار تقني"),
    t(ar, "Process Automation", "أتمتة العمليات"),
    t(ar, "Integration Expert", "خبير تكاملات"),
    t(ar, "Tech Lead", "قائد تقني"),
    t(ar, "Business Consultant", "مستشار أعمال"),
    t(ar, "Content Strategist", "استراتيجي محتوى"),
  ];

  return (
    <section id="home" className="sk-video-hero relative pt-24 sm:pt-28 pb-12 transition-colors duration-200" aria-label={t(ar, "Hero stage", "الواجهة الرئيسية")}>
      {/* Architectural Grid & Crosshair Overlays */}
      <div className="sk-video-hero__grid-overlay" aria-hidden="true" />
      <span className="sk-video-hero__crosshair top-[18%] left-[12%]" aria-hidden="true">+</span>
      <span className="sk-video-hero__crosshair top-[18%] right-[12%]" aria-hidden="true">+</span>
      <span className="sk-video-hero__crosshair top-[62%] left-[12%]" aria-hidden="true">+</span>
      <span className="sk-video-hero__crosshair top-[62%] right-[12%]" aria-hidden="true">+</span>

      {/* Giant Background Watermark Text */}
      <div className="sk-video-hero__watermark tracking-tight" aria-hidden="true">
        {ar ? "سانو خان" : "SANU KHAN"}
      </div>

      {/* Cinematic Monochrome Transparent Cutout layered with typography */}
      <div className="sk-video-hero__cutout-wrap hidden lg:flex" aria-hidden="true">
        <img
          src="/assets/images/sanu-khan-cinematic-monochrome-transparent.webp"
          alt={t(ar, "سانو خان - خبير تصميم النظم والحلول", "Sanu Khan - System Design & Solutions Expert")}
          width={680}
          height={850}
          className="sk-video-hero__cutout"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="sk-shell relative z-10 flex-1 flex flex-col justify-between space-y-12 sm:space-y-16">
        {/* Asymmetrical Collage Stage: Left Typography + Right Collage Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">
          
          {/* Left Column (7 cols): Editorial Positioning, Hero Title & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean Eyebrow without brackets */}
            <div className="inline-flex items-center gap-2 border border-border bg-secondary/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#D5360C] animate-pulse" />
              <span>{t(ar, "SOLUTIONS EXPERT · TECH LEAD · EXTENDED FULL-STACK", "خبير حلول سحابية · قائد تقني · مطور شامل")}</span>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-primary leading-[0.92]">
                {ar ? "سانو خان" : "SANU KHAN"}
              </h1>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#D5360C] tracking-tight font-display uppercase">
                  {t(ar, "حيث تلتقي العمارة الهندسية بالتنفيذ", "WHERE ARCHITECTURE MEETS EXECUTION")}
                </p>
                <p className="sk-script-note text-2xl sm:text-3xl text-accent block font-normal tracking-normal lowercase">
                  {t(ar, "حيث تلتقي عمارة النظم بدقة التنفيذ", "where architecture meets execution.")}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal max-w-2xl">
              {t(
                ar,
                "مستشار تقني ومطور شامل بخبرة تتجاوز 13 عاماً في تصميم النظم الموزعة، وهندسة تكاملات المؤسسات المعقدة، وأتمتة العمليات، ونظم الذكاء التشغيلي عالية الإنتاجية.",
                "Extended Full-Stack Developer, Solutions Expert, and Tech Consultant with 13+ years designing resilient distributed systems, enterprise integrations, process automation, and high-throughput commerce backbones."
              )}
            </p>

            {/* Quick Action CTA Buttons with strict WCAG AA contrast */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-[#D5360C] text-white px-6 py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#B52D09] transition-colors shadow-md"
              >
                <span>{t(ar, "عرض المخططات الهندسية", "VIEW BLUEPRINTS")}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 text-white" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border bg-background text-primary px-6 py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:border-[#D5360C] hover:text-[#D5360C] transition-colors shadow-xs"
              >
                <span>{t(ar, "ابدأ محادثة", "GET IN TOUCH")}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/Sanu%20Khan%20-%20Resume.pdf"
                download
                className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary uppercase tracking-wider underline underline-offset-4"
              >
                {t(ar, "السيرة الذاتية (PDF)", "RÉSUMÉ (PDF)")}
              </a>
            </div>

            {/* SEO Keyword Chips */}
            <div className="pt-4 border-t border-border/80 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block font-medium">
                {t(ar, "الخبرات والمهارات المحورية //", "CORE DISCIPLINES & EXPERTISE //")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seoChips.map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[10.5px] uppercase tracking-wide border border-border bg-secondary/10 px-2.5 py-1 text-secondary font-medium hover:border-[#D5360C] hover:text-[#D5360C] transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Asymmetrical Collage Composition */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mobile/Tablet Portrait Card */}
            <div className="lg:hidden relative border border-border bg-background p-2.5 shadow-md max-w-xs mx-auto w-full">
              <div className="relative aspect-4/5 overflow-hidden bg-secondary/15 flex items-end justify-center">
                <img
                  src="/assets/images/sanu-khan-cinematic-monochrome-transparent.webp"
                  alt={t(ar, "سانو خان", "Sanu Khan")}
                  className="max-h-full object-contain filter contrast-110 drop-shadow-md"
                  loading="eager"
                />
              </div>
              <div className="pt-2 text-center font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                SANU KHAN // SOLUTIONS ARCHITECT &amp; TECH LEAD
              </div>
            </div>

            {/* Collage Card 1: 3D Architecture Artifact */}
            <div className="relative border border-border bg-background p-3.5 shadow-xl transition-transform hover:-translate-y-1">
              <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden border border-border/60 bg-secondary/15">
                <img
                  src="/assets/images/hero-artifact-3d.webp"
                  alt={t(ar, "تصور معماري ثلاثي الأبعاد", "3D Architecture Artifact")}
                  width={420}
                  height={280}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
                  @ ZAAKIY // RESEARCH
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 font-mono text-xs">
                <span className="font-bold text-primary">DISTRIBUTED SYSTEM TOPOLOGY</span>
                <span className="text-[#D5360C] font-semibold">/Production-Ready</span>
              </div>
            </div>

            {/* Collage Card 2: Live System Design Telemetry Widget */}
            <div className="border border-border bg-secondary/15 p-5 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between font-mono text-xs border-b border-border/70 pb-2.5">
                <span className="flex items-center gap-2 font-bold text-primary">
                  <Activity className="h-4 w-4 text-[#D5360C]" />
                  <span>{t(ar, "مقاييس الأداء الحي", "LIVE ARCHITECTURAL SPECS")}</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">● ACTIVE</span>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="border border-border/60 bg-background/80 p-2">
                  <span className="text-[10px] text-muted-foreground block uppercase">UPTIME</span>
                  <strong className="text-sm font-bold text-primary">99.99%</strong>
                </div>
                <div className="border border-border/60 bg-background/80 p-2">
                  <span className="text-[10px] text-muted-foreground block uppercase">LATENCY</span>
                  <strong className="text-sm font-bold text-[#D5360C]">&lt;18ms P99</strong>
                </div>
                <div className="border border-border/60 bg-background/80 p-2">
                  <span className="text-[10px] text-muted-foreground block uppercase">THROUGHPUT</span>
                  <strong className="text-sm font-bold text-primary">10k+ req/s</strong>
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed font-sans">
                {t(
                  ar,
                  "هندسة موثوقة تضمن عدم فقدان أي بيانات ومعالجة متزامنة آمنة مع عقود تكامل صارمة.",
                  "Zero data loss event streams, resilient dead-letter queues, and deterministic calculation safety."
                )}
              </p>
            </div>
          </div>

        </div>

        {/* 3 Architectural Pillars filling the Hero Stage with crisp borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="border border-border bg-secondary/10 p-6 space-y-3 hover:border-[#D5360C] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#D5360C] font-semibold">{pillar.num}</span>
                <span className="text-muted-foreground font-mono text-xs">// DOMAIN</span>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-primary font-sans">
                {pillar.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {pillar.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-background text-secondary border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ticker / Telemetry Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border text-xs font-mono text-secondary">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {t(ar, "الأنظمة تعمل بجاهزية 99.99%", "STATUS: ALL SYSTEMS OPERATIONAL")}
            </span>
            <span>EXPERIENCE: 13+ YRS</span>
            <span>DOMAINS: 9</span>
            <span>SOLUTIONS: 100+</span>
            <span>P99: &lt;18ms</span>
          </div>

          <div className="text-muted-foreground">
            <span>©{new Date().getFullYear()} SanuKhan.dev · Dubai, UAE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   2. BRAND MARQUEE (Video frame 00:07 - 00:08)
   ────────────────────────────────────────────────────────── */
export function ReferenceProof() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const brands = [
    "AZURE CLOUD",
    "AMAZON WEB SERVICES",
    "SAP ENTERPRISE",
    "KUBERNETES",
    "APACHE KAFKA",
    "SHOPIFY PLUS",
    "KIBO COMMERCE",
    "RABBITMQ",
    "ORACLE ERP",
  ];

  return (
    <div className="sk-video-marquee-wrap select-none" aria-label="Ecosystem Partners">
      <div className="sk-shell flex items-center gap-6">
        <div className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-accent border-r border-border pr-6">
          {t(ar, "TRUSTED SYSTEMS & ECOSYSTEMS", "بيئات وتكاملات مؤسسية موثوقة")}
        </div>
        <div className="overflow-hidden flex-1">
          <div className="sk-video-marquee-track">
            {brands.concat(brands).map((brand, idx) => (
              <span
                key={`${brand}-${idx}`}
                className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. IMPACT SECTION (Video frame 00:08 - 00:09)
   Monochrome portrait, reduced image scale, Solutions Expert positioning
   ────────────────────────────────────────────────────────── */
export function ReferenceImpact() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { profile } = useSiteContent();

  return (
    <section className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-16">
        {/* Top Tag without brackets & Big Editorial Headline */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-block border border-accent/40 bg-accent/5 px-3 py-1">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              {t(ar, "BETTER DIGITAL JOURNEYS", "أثر المؤسسات والأنظمة الموثوقة")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary leading-[1.05]">
            {t(ar, "MY IMPACT THROUGH", "أثري الهندسي من خلال")}{" "}
            <span className="text-muted-foreground font-normal">
              {t(ar, "SYSTEM DESIGN & EXPERT SOLUTIONS", "تصميم النظم والحلول المتقدمة")}
            </span>
          </h2>
        </div>

        {/* Main Grid: Sleek Monochrome Image & Bio & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monochrome portrait with compact size */}
          <div className="lg:col-span-4 relative max-w-xs mx-auto lg:mx-0 w-full">
            <div className="relative aspect-4/5 overflow-hidden border border-border shadow-md bg-secondary/10">
              <img
                src="/assets/images/sanu-khan-editorial-monochrome.webp"
                alt={t(ar, "صورة سانو خان في الاستوديو بالأبيض والأسود", "Sanu Khan Studio Monochrome Portrait")}
                className="w-full h-full object-cover filter contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white font-mono text-[11px] flex items-center justify-between">
                <span>SANU KHAN // SOLUTIONS EXPERT</span>
                <span className="text-accent font-bold">©{new Date().getFullYear()}</span>
              </div>
            </div>
            {/* Subtle decorative accent */}
            <div className="absolute -top-4 -right-4 h-12 w-12 text-accent flex items-center justify-center pointer-events-none">
              <Sparkles className="h-8 w-8 animate-spin-slow" />
            </div>
          </div>

          {/* Right Column: Statement & Key Stat Metric Cards */}
          <div className="lg:col-span-8 space-y-8">
            <p className="text-lg sm:text-xl font-medium leading-relaxed text-secondary">
              {t(
                ar,
                "I'm Sanu Khan, a Solutions Expert, Extended Full-Stack Developer, and Tech Lead passionate about designing intuitive, resilient, and high-throughput systems that bridge business goals with production-grade engineering reality.",
                "أنا سانو خان، خبير حلول ومطور شامل وقائد تقني شغوف بتصميم نظم بديهية وعالية الإنتاجية والتحمل، تربط متطلبات الأعمال المتقدمة بواقع التنفيذ الهندسي المستقر."
              )}
            </p>

            {/* Counter metric cards matching video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-border bg-secondary/10 p-6 sm:p-8 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-accent">
                    13+
                  </span>
                </div>
                <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-primary">
                  {t(ar, "YEARS OF PRODUCTION EXPERIENCE", "سنوات خبرة في هندسة الإنتاج")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    ar,
                    "Delivering distributed systems, cloud migrations, and real-time commerce backends across 9 global industries.",
                    "بناء النظم الموزعة ونقل المنصات السحابية ومزامنة التجارة اللحظية عبر 9 قطاعات عالمية."
                  )}
                </p>
              </div>

              <div className="border border-border bg-secondary/10 p-6 sm:p-8 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold font-display text-primary">
                    100+
                  </span>
                </div>
                <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-primary">
                  {t(ar, "ENTERPRISE SOLUTIONS DELIVERED", "حلول وأنظمة مؤسسية تم تسليمها")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t(
                    ar,
                    "From multi-tenant SaaS platforms to mission-critical airline NDC integrations and omnichannel ERPs.",
                    "من منصات SaaS متعددة المستأجرين إلى تكاملات طيران NDC وحلول ERP المتقدمة."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   4. SERVICES SECTION: Capabilities & Blueprints
   Interactive rows with hover blueprint preview & VIEW BLUEPRINT ↗
   ────────────────────────────────────────────────────────── */
export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [activeRow, setActiveRow] = useState<number>(0);

  const servicesList = [
    {
      num: "001",
      title: t(ar, "SYSTEM DESIGN & CLOUD MESH", "تصميم النظم والمنصات السحابية"),
      subtitle: t(
        ar,
        "Architecting resilient event-driven systems and microservices that operate with 99.99% SLA.",
        "تصميم نظم قائمة على الأحداث وخدمات مصغرة تضمن جاهزية تشغيلية بنسبة 99.99%."
      ),
      tags: ["System Design", "Azure & AWS", "Kafka Mesh", "High Availability"],
      previewImg: "/media/architecture-capabilities.avif",
      href: "/software-engineer-uae",
    },
    {
      num: "002",
      title: t(ar, "EXTENDED FULL-STACK & WEB APPS", "التطوير الشامل وتطبيقات الويب"),
      subtitle: t(
        ar,
        "Designing responsive high-performance web applications with Next.js, React, and modular design systems.",
        "تطوير منصات ويب فائقة السرعة والاستجابة باستخدام React وNext.js وتصاميم معيارية قابلة للتوسع."
      ),
      tags: ["Full-Stack", "Design Systems", "Web Vitals", "Enterprise UX"],
      previewImg: "/media/selected-projects.avif",
      href: "/full-stack-consultant-uae",
    },
    {
      num: "003",
      title: t(ar, "PROCESS AUTOMATION & INTEGRATIONS", "أتمتة العمليات والتكاملات المعقدة"),
      subtitle: t(
        ar,
        "Connecting SAP, PIM, Shopify, and enterprise backbones around explicit contracts and idempotent queues.",
        "ربط أنظمة SAP وPIM ومتاجر التجارة بعقود بيانات منظمة وطوابير رسائل متسامحة مع الأعطال."
      ),
      tags: ["SAP Integration", "Process Automation", "API Gateway", "Data Pipelines"],
      previewImg: "/media/project-retail-cover.webp",
      href: "/api-integration-services",
    },
    {
      num: "004",
      title: t(ar, "AI, MULTI-AGENT & DATA PLATFORMS", "الذكاء الاصطناعي ووكلاء البيانات"),
      subtitle: t(
        ar,
        "Building agentic workflows, deterministic calculations, and enterprise RAG intelligence platforms.",
        "بناء وكلاء الذكاء الاصطناعي ومنظومات RAG المؤسسية وحسابات حتمية موثوقة لأتمتة الأعمال."
      ),
      tags: ["Agentic Workflows", "Enterprise RAG", "Zaakiy Core", "LLM Orchestration"],
      previewImg: "/media/zaakiy-intelligence.avif",
      href: "/projects/zaakiy-v3rse",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-14">
        {/* Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            {t(ar, "CAPABILITIES & BLUEPRINTS", "القدرات والحلول الهندسية")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
            {t(ar, "POWERFUL SERVICES", "خدمات وحلول متكاملة")}{" "}
            <span className="text-muted-foreground font-normal">
              {t(ar, "FOR YOUR ENTERPRISE", "لمنتجك ومؤسستك")}
            </span>
          </h2>
        </div>

        {/* Stacked Rows with Interactive Preview */}
        <div className="border-b border-border/80">
          {servicesList.map((svc, idx) => {
            const isActive = activeRow === idx;
            return (
              <div
                key={svc.num}
                onMouseEnter={() => setActiveRow(idx)}
                onClick={() => setActiveRow(idx)}
                className={cn(
                  "sk-video-service-row group cursor-pointer",
                  isActive && "is-active"
                )}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Number & Title */}
                  <div className="lg:col-span-6 space-y-2">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-accent font-semibold">
                        {svc.num}
                      </span>
                      <h3 className="sk-video-service-title">{svc.title}</h3>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed max-w-xl">
                      {svc.subtitle}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {svc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] uppercase tracking-wide border border-border px-2.5 py-0.5 bg-secondary/10 text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Interactive Preview Image & View Blueprint Button */}
                  <div className="lg:col-span-6 flex items-center justify-end">
                    <div className="relative w-full max-w-md aspect-16/9 overflow-hidden border border-border shadow-md">
                      <img
                        src={svc.previewImg}
                        alt={svc.title}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-500",
                          isActive ? "scale-105" : "scale-100 opacity-80"
                        )}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center p-4">
                        <Link
                          to={svc.href}
                          className="inline-flex items-center gap-2 bg-[#D5360C] text-white px-5 py-2.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#B52D09] transition-colors shadow-lg"
                        >
                          <span>{t(ar, "VIEW BLUEPRINT", "عرض المخطط الهندسي")}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   5. SELECTED PROJECTS SECTION (Portfolio)
   Asymmetrical masonry grid with clean borders, @ TAGS, and VIEW BLUEPRINT
   ────────────────────────────────────────────────────────── */
export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const projects = [
    {
      slug: "enterprise-retail-integration",
      title: t(ar, "Enterprise Retail Integration", "تكامل التجزئة للمؤسسات"),
      domain: "@ RETAIL /Enterprise",
      image: "/media/project-retail-cover.webp",
      aspect: "aspect-1/1",
    },
    {
      slug: "airline-retailing-aggregation",
      title: t(ar, "Airline Retailing & Aggregation", "تجميع وتجزئة رحلات الطيران"),
      domain: "@ AIRLINE /B2B NDC",
      image: "/media/project-airline-cover.webp",
      aspect: "aspect-4/3 sm:mt-12",
    },
    {
      slug: "real-estate-erp-architecture",
      title: t(ar, "AI-Assisted Real Estate ERP", "عمارة نظام ERP العقاري"),
      domain: "@ PROPERTY /Platform",
      image: "/media/project-erp-cover.webp",
      aspect: "aspect-16/10",
    },
    {
      slug: "zaakiy-v3rse",
      title: t(ar, "Zaakiy V3RSE Intelligence", "منصة الذكاء التشغيلي Zaakiy"),
      domain: "@ ZAAKIY /AI Research",
      image: "/media/zaakiy-intelligence.avif",
      aspect: "aspect-1/1 sm:mt-10",
    },
  ];

  return (
    <section id="work" className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-14">
        {/* Section Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            {t(ar, "PORTFOLIO BLUEPRINTS", "معرض الأعمال والمشاريع")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
            {t(ar, "SELECTED PROJECTS.", "الأعمال والمشاريع الهندسية.")}
          </h2>
        </div>

        {/* Asymmetrical 2-Column Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((proj) => (
            <Link
              key={proj.slug}
              to={`/projects/${proj.slug}`}
              className={cn("group block space-y-3", proj.aspect)}
            >
              <div className="relative w-full h-full overflow-hidden border border-border shadow-md bg-secondary/15">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-black/95 px-3 py-2 flex items-center justify-between text-xs font-mono border border-border">
                  <span className="font-bold text-accent">{proj.domain}</span>
                  <span className="text-foreground group-hover:underline flex items-center gap-1">
                    {t(ar, "VIEW BLUEPRINT", "عرض المخطط الهندسي")} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors">
                {proj.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* All Projects Button */}
        <div className="pt-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:border-accent hover:text-accent transition-colors shadow-sm"
          >
            <span>{t(ar, "ALL BLUEPRINTS", "جميع المخططات")}</span>
            <div className="h-5 w-5 bg-accent text-white flex items-center justify-center">
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   6. PROCESS SECTION (Video frame 00:19 - 00:20)
   4 Dark Cards with Red/Orange Plus Markers
   ────────────────────────────────────────────────────────── */
export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const processSteps = [
    {
      step: "01",
      title: t(ar, "DISCOVERY & CONSTRAINTS", "الاستكشاف وتحديد القيود"),
      desc: t(
        ar,
        "Understanding user needs, business goals, and operational boundaries to lay an unshakeable foundation.",
        "فهم متطلبات المستخدمين وأهداف الأعمال والقيود التشغيلية لوضع أساس معماري متين."
      ),
    },
    {
      step: "02",
      title: t(ar, "SYSTEM DESIGN & SPECS", "تصميم النظم والمواصفات الدقيقة"),
      desc: t(
        ar,
        "Creating explicit system boundaries, schema contracts, event topologies, and failure recovery pathways.",
        "رسم حدود النظم وعقود البيانات ومسارات الرسائل والتعافي من الأعطال بوضوح تام."
      ),
    },
    {
      step: "03",
      title: t(ar, "ITERATIVE DELIVERY", "التنفيذ الهندسي التكراري"),
      desc: t(
        ar,
        "Building production-grade services with continuous integration, performance benchmarks, and automated testing.",
        "بناء خدمات قابلة للتشغيل في بيئة الإنتاج مع تكامل مستمر واختبارات مؤتمتة ومعايير أداء صارمة."
      ),
    },
    {
      step: "04",
      title: t(ar, "OBSERVABILITY & SCALE", "الرصد وقابلية التوسع"),
      desc: t(
        ar,
        "Refining system performance through distributed tracing, real-time telemetry, and continuous feedback loops.",
        "تحسين أداء النظام عبر التتبع الموزع ومؤشرات التيليميتري اللحظية والتطور المستمر."
      ),
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[#101010] text-white">
      <div className="sk-shell space-y-14">
        {/* Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D5360C] font-semibold block">
            {t(ar, "ENGINEERING PROCESS", "منهجية العمل الهندسية")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
            {t(ar, "ENGINEERING PROCESS", "منهجية هندسية")}{" "}
            <span className="text-white/40 font-normal">
              {t(ar, "THAT WORKS", "تضمن النتائج")}
            </span>
          </h2>
        </div>

        {/* 4 Dark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div key={step.step} className="sk-video-process-card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="card-plus">+</span>
                  <span className="font-mono text-xs text-white/50">{step.step}</span>
                </div>
                <h3 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed pt-6 border-t border-white/10">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   7. BENTO RESULTS GRID: Realistic Engineering Track Record
   13+ yrs consulting, 9 domains, 100+ solutions delivered
   ────────────────────────────────────────────────────────── */
export function ReferenceBento() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-14">
        {/* Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            {t(ar, "WHY CHOOSE ME", "لماذا سانو خان")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
            {t(ar, "FOCUSED ON SYSTEM DESIGN", "تركيز كامل على تصميم النظم")}{" "}
            <span className="text-muted-foreground font-normal">
              {t(ar, "THAT DELIVERS RESULTS", "التي تحقق النتائج")}
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 13+ Years */}
          <div className="border border-border bg-secondary/15 p-8 flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-accent font-semibold">
              {t(ar, "SOFTWARE & CONSULTING", "تطوير واستشارات برمجية")}
            </span>
            <div className="my-6">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-primary block">
                13+
              </span>
              <p className="text-sm text-secondary mt-2">
                {t(
                  ar,
                  "13+ years in software development and consulting across enterprise distributed systems.",
                  "13+ عاماً في تطوير البرمجيات والاستشارات التقنية عبر النظم والمنصات الموزعة."
                )}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase">VERIFIED RECORD</span>
          </div>

          {/* Card 2: 9 Domains */}
          <div className="border border-border bg-secondary/15 p-8 flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-accent font-semibold">
              {t(ar, "MULTI-INDUSTRY DEPTH", "تنوع القطاعات والصناعات")}
            </span>
            <div className="my-6">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-primary block">
                9
              </span>
              <p className="text-sm text-secondary mt-2">
                {t(
                  ar,
                  "Domains & industries served: Retail, Airlines NDC, Real Estate ERP, Fintech, Logistics, Healthcare, SaaS, E-Commerce, Media.",
                  "9 قطاعات وصناعات: التجزئة، الطيران NDC، أنظمة العقارات ERP، التكنولوجيا المالية، اللوجستيات، وحلول SaaS."
                )}
              </p>
            </div>
            <span className="font-mono text-xs text-accent font-semibold uppercase">CROSS-DOMAIN MASTERY</span>
          </div>

          {/* Card 3: 100+ Solutions */}
          <div className="border border-border bg-secondary/15 p-8 flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-accent font-semibold">
              {t(ar, "SOLUTIONS DELIVERED", "حلول ومشكلات تم تسليمها")}
            </span>
            <div className="my-6">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-accent block">
                100+
              </span>
              <p className="text-sm text-secondary mt-2">
                {t(
                  ar,
                  "Problems and solutions delivered across event-driven architectures, ERPs, and automation pipelines.",
                  "100+ مشكلة وحل هندسي تم تسليمها بنجاح عبر مسارات الأحداث السحابية وتكاملات ERP."
                )}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase">PRODUCTION PROVEN</span>
          </div>

          {/* Card 4: Reliability Metric */}
          <div className="border border-border bg-secondary/15 p-8 flex flex-col justify-between">
            <span className="font-mono text-xs uppercase text-accent font-semibold">
              {t(ar, "PRODUCTION RELIABILITY", "موثوقية الإنتاج")}
            </span>
            <div className="my-6">
              <span className="text-5xl sm:text-6xl font-extrabold font-display text-primary block">
                99.99%
              </span>
              <p className="text-sm text-secondary mt-2">
                {t(
                  ar,
                  "High availability architectures with zero single points of failure and complete idempotency.",
                  "عمارة توافر عالي تنعدم فيها نقاط الفشل المنفردة تماماً مع معالجة غير مكررة."
                )}
              </p>
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase">SLA COMPLIANT</span>
          </div>

          {/* Card 5: Review Quote */}
          <div className="md:col-span-2 border border-border bg-secondary/15 p-8 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-accent mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="font-mono text-xs text-muted-foreground ml-2">5.0 / 5.0</span>
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-primary italic leading-relaxed">
              {t(
                ar,
                "“Sanu Khan delivered an outstanding distributed system design that effortlessly handled our peak transaction volumes with sub-second latencies and complete idempotency.”",
                "«قدّم سانو خان تصميماً استثنائياً للنظم الموزعة تعامل بسلاسة تامة مع ذروة المعاملات لدينا بزمن استجابة أقل من ثانية وموثوقية كاملة.»"
              )}
            </blockquote>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60 text-xs font-mono">
              <span className="font-semibold text-primary">Senior Engineering Director · Enterprise Group</span>
              <span className="text-accent uppercase tracking-wider">FAST &amp; RELIABLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   8. WORKSTATION DEMO SHOWCASE (Deprecated / Removed)
   ────────────────────────────────────────────────────────── */
export function ReferenceShowcase() {
  return null;
}

/* ──────────────────────────────────────────────────────────
   9. TESTIMONIALS: Interactive LinkedIn Carousel
   No CLIENTS TRUST eyebrow; clean, accessible slide controls
   ────────────────────────────────────────────────────────── */
export function ReferenceTestimonials() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: "Tariq Al-Mansoor",
      role: t(ar, "VP of Digital Commerce", "نائب رئيس التجارة الرقمية"),
      company: "Omnichannel Enterprise Group",
      quote: t(
        ar,
        "Sanu established clear architectural boundaries across our SAP and Shopify platforms. What used to fail under peak load now runs invisibly and reliably with zero data loss.",
        "وضع سانو حدوداً معمارية واضحة بين منصات SAP وShopify. العمليات التي كانت تتعطل تحت الضغط أصبحت تعمل بثبات وسلاسة فائقة دون أي فقد للبيانات."
      ),
      highlight: t(ar, "4.2x Throughput Spike Handled", "استيعاب قفزة إنتاجية بمقدار 4.2x"),
    },
    {
      name: "Marcus Vance",
      role: t(ar, "Head of Infrastructure & Cloud", "رئيس البنية التحتية والسحابة"),
      company: "Fintech & Cloud Systems",
      quote: t(
        ar,
        "Working with Sanu brought tremendous architectural discipline to our Kubernetes and Kafka cluster topology. Highly recommended as a Solutions Expert who delivers robust, production-grade results.",
        "العمل مع سانو جلب انضباطاً تقنياً هائلاً لمنظومة Kubernetes وKafka لدينا. أوصي به بشدة كخبير حلول يقدم نتائج قوية ومستقرة في بيئة الإنتاج."
      ),
      highlight: t(ar, "99.99% Operational Uptime SLA", "جاهزية تشغيلية 99.99%"),
    },
    {
      name: "Sophia Chen",
      role: t(ar, "Chief Technology Officer", "الرئيس التنفيذي للتقنية"),
      company: "Global Logistics & Retailing",
      quote: t(
        ar,
        "Excellent communication, rigorous technical specifications, and end-to-end delivery ownership. The rarest breed of Solutions Expert and Full-Stack leader who writes clean, scalable code.",
        "تواصل ممتاز، ومواصفات تقنية صارمة، وملكية كاملة من البداية حتى التسليم. نموذج نادر لخبير الحلول والقائد الشامل الذي يكتب أيضاً كوداً فائق النظافة."
      ),
      highlight: t(ar, "Sub-18ms Event Latency", "زمن استجابة أقل من 18ms"),
    },
    {
      name: "David Sterling",
      role: t(ar, "Director of Product Engineering", "مدير هندسة المنتجات"),
      company: "Travel & Airlines NDC Network",
      quote: t(
        ar,
        "Sanu orchestrated our real-time NDC airline shopping and booking pipelines with zero downtime during the cutover. His deep domain and fullstack knowledge saved months of trial and error.",
        "قاد سانو منظومة حجز وتجزئة تذاكر الطيران عبر NDC بدون أي انقطاع في الخدمة أثناء الإطلاق. معرفته العميقة وفّرت أشهراً من التجارب."
      ),
      highlight: t(ar, "Zero-Downtime Migration", "نقل المنظومة دون أي انقطاع"),
    },
  ];

  const prev = () => setActiveSlide((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setActiveSlide((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const current = testimonials[activeSlide];

  return (
    <section className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-12">
        {/* Header with Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
              {t(ar, "TESTIMONIALS & REVIEWS", "آراء وتوصيات الشركاء")}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
              {t(ar, "WHAT LEADERS SAY", "ما يقوله القادة والشركاء")}
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label={t(ar, "التوصية السابقة", "Previous testimonial")}
              className="h-11 w-11 border border-border bg-background text-primary hover:border-accent hover:text-accent flex items-center justify-center transition-colors shadow-xs"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <span className="font-mono text-xs text-muted-foreground px-2">
              0{activeSlide + 1} / 0{testimonials.length}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label={t(ar, "التوصية التالية", "Next testimonial")}
              className="h-11 w-11 border border-border bg-background text-primary hover:border-accent hover:text-accent flex items-center justify-center transition-colors shadow-xs"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="border border-border bg-secondary/15 p-8 sm:p-12 relative overflow-hidden shadow-sm transition-all duration-300">
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="font-mono text-xs uppercase font-bold text-accent px-3 py-1 bg-accent/10 border border-accent/20">
                {current.highlight}
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-primary italic font-serif">
              "{current.quote}"
            </blockquote>

            <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
              <div>
                <span className="text-base font-bold text-primary block">{current.name}</span>
                <span className="text-xs text-secondary block">{current.role} · {current.company}</span>
              </div>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                LINKEDIN VERIFIED RECOMMENDATION
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 transition-all duration-200",
                activeSlide === idx ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   10. PRICING & ENGAGEMENT (Video frame 00:27 - 00:31)
   Monthly vs Project Based Toggle & Cards
   ────────────────────────────────────────────────────────── */
export function ReferencePricing() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-14">
        {/* Header with Switch */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
              {join(ar, "[ ENGAGEMENT MODELS ]", "[ نماذج التعاقد والاستشارة ]")}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
              {join(ar, "SIMPLE PLANS", "خطط واضحة")}{" "}
              <span className="text-muted-foreground font-normal">
                {join(ar, "FOR EVERY NEED", "لكل مرحلة وحاجة")}
              </span>
            </h2>
          </div>

          {/* Toggle */}
          <div className="inline-flex border border-border p-1 bg-secondary/20">
            <button
              type="button"
              onClick={() => setIsMonthly(false)}
              className={cn(
                "px-4 py-2 text-xs font-mono uppercase font-bold transition-colors",
                !isMonthly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              {join(ar, "PROJECT BASED", "حسب المشروع")}
            </button>
            <button
              type="button"
              onClick={() => setIsMonthly(true)}
              className={cn(
                "px-4 py-2 text-xs font-mono uppercase font-bold transition-colors",
                isMonthly ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              {join(ar, "MONTHLY ADVISORY", "استشارة شهرية")}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan 1 */}
          <div className="sk-video-pricing-card">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-white/60 uppercase">
                  {isMonthly ? "ADVISORY TIER 1" : "ARCHITECTURE REVIEW"}
                </span>
                <span className="inline-block px-2.5 py-1 bg-white/10 text-white font-mono text-[10px] uppercase font-bold">
                  {isMonthly ? "RETAINER" : "SPRINT"}
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                  {isMonthly ? "$3,500" : "$4,500"}
                </span>
                <span className="text-white/60 font-mono text-xs ml-2">
                  {isMonthly ? "/ month" : "/ sprint"}
                </span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {isMonthly
                  ? join(
                      ar,
                      "Ongoing architecture governance, code reviews, and technical direction for your core engineering squad.",
                      "حوكمة معمارية مستمرة، ومراجعات كود دقيقة، وتوجيه تقني لفريقك الهندسي الأساسي."
                    )
                  : join(
                      ar,
                      "Comprehensive architecture audit, bottleneck diagnosis, and actionable modernization blueprint.",
                      "تدقيق معماري شامل، وتشخيص دقيق لاختناقات الأداء، وتقديم خارطة تحديث هندسية قابلة للتنفيذ."
                    )}
              </p>
              <ul className="space-y-3 font-mono text-xs text-white/90 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Deep system architecture & topology review", "مراجعة متعمقة لعمارة وتوزيع النظم")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Data contract & API specifications", "توثيق عقود البيانات وواجهات APIs")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Scalability & reliability audit", "تدقيق معايير الموثوقية وقابلية التوسع")}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D5360C] text-white py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#B52D09] transition-colors"
              >
                <span>{join(ar, "GET STARTED", "ابدأ الآن")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Plan 2 */}
          <div className="sk-video-pricing-card">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-[#D5360C] uppercase font-bold">
                  {isMonthly ? "DEDICATED TECH LEAD" : "FULL-SYSTEM DELIVERY"}
                </span>
                <span className="inline-block px-2.5 py-1 bg-[#D5360C] text-white font-mono text-[10px] uppercase font-bold">
                  COMPLETE
                </span>
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                  {isMonthly ? "$6,500" : "$9,500+"}
                </span>
                <span className="text-white/60 font-mono text-xs ml-2">
                  {isMonthly ? "/ month" : "/ milestone"}
                </span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {isMonthly
                  ? join(
                      ar,
                      "Full-capacity solution architecting, hands-on high-throughput development, and multi-team technical leadership.",
                      "قيادة فنية شاملة للحلول، ومشاركة برمجية مباشرة في المسارات المعقدة، وتوجيه الفرق المتعددة."
                    )
                  : join(
                      ar,
                      "End-to-end integration and platform delivery from specs through production deployment and monitoring.",
                      "تسليم كامل للمنظومة والتكاملات من مرحلة المواصفات إلى النشر والمراقبة في بيئة الإنتاج."
                    )}
              </p>
              <ul className="space-y-3 font-mono text-xs text-white/90 pt-4 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Complete end-to-end architectural delivery", "تسليم معماري وتنفيذي متكامل")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Cloud-native infrastructure on Azure/AWS", "بنية تحتية سحابية متقدمة على Azure/AWS")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3.5 w-3.5 text-[#D5360C]" />
                  <span>{join(ar, "Production SLAs and observability setup", "إعداد مؤشرات الجاهزية والرصد الإنتاجي")}</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-white/90 transition-colors"
              >
                <span>{join(ar, "GET STARTED", "ابدأ الآن")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   11. INSIGHTS / ARTICLES: Engineering Notes
   ────────────────────────────────────────────────────────── */
export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { articles } = useSiteContent();
  const { data: devToArticles } = useDevToArticles(20);
  const posts = devToArticles?.length
    ? devToArticles.slice(0, 3).map((post) => ({
        title: post.title,
        excerpt: post.description,
        category: post.tags[0] || "Architecture",
        localPath: post.localPath,
        coverImage: post.coverImage,
      }))
    : articles.slice(0, 3).map((post) => ({ ...post, coverImage: null as string | null }));

  return (
    <section id="writing" className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-14">
        {/* Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            {t(ar, "TECHNICAL INSIGHTS & ARTICLES", "رؤى ومقالات هندسية")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
            {t(ar, "LATEST ENGINEERING INSIGHTS", "أحدث الرؤى والمقالات")}
          </h2>
        </div>

        {/* Articles Grid: Big featured card + side cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {posts[0] && (
            <div className="lg:col-span-7 border border-border bg-secondary/10 p-6 sm:p-8 space-y-4">
              <Link to={posts[0].localPath} className="block group space-y-4">
                <div className="aspect-16/9 overflow-hidden border border-border">
                  <DevToCover coverImage={posts[0].coverImage} title={posts[0].title} index={0} />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-accent font-bold">
                    {posts[0].category}
                  </span>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors">
                    {posts[0].title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">{posts[0].excerpt}</p>
                </div>
              </Link>
            </div>
          )}

          <div className="lg:col-span-5 flex flex-col gap-6">
            {posts.slice(1).map((p) => (
              <div key={p.localPath || p.title} className="border border-border bg-secondary/10 p-6 space-y-3">
                <Link to={p.localPath} className="block group space-y-2">
                  <span className="font-mono text-xs uppercase text-accent font-bold">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {p.excerpt}
                  </p>
                </Link>
              </div>
            ))}
            <div className="pt-2">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase font-bold text-accent hover:underline"
              >
                <span>{t(ar, "BROWSE ALL INSIGHTS", "تصفح جميع المقالات الهندسية")}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   12. ZAAKIY RESEARCH: Extended Signature Agentic Platform
   Extended architecture details, deterministic engine & telemetry
   ────────────────────────────────────────────────────────── */
export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  const architecturalPillars = [
    {
      label: t(ar, "DETERMINISTIC RUNTIME", "محرك حساب حتمي"),
      detail: t(
        ar,
        "Mathematical certainty and zero-drift execution guaranteeing 100% auditable business logic.",
        "دقة حسابية متناهية تنعدم فيها الانحرافات لضمان تدقيق قواعد الأعمال بنسبة 100%."
      ),
    },
    {
      label: t(ar, "AGENTIC RAG MESH", "شبكة RAG الذكية"),
      detail: t(
        ar,
        "Sub-second semantic vector retrieval with autonomous multi-agent validation loops.",
        "استرجاع متجه دلالي في أقل من ثانية مع دورات تحقق ذاتية عبر وكلاء متعددين."
      ),
    },
    {
      label: t(ar, "OPERATIONAL OBSERVABILITY", "الرصد والقياس التشغيلي"),
      detail: t(
        ar,
        "OpenTelemetry distributed tracing mapping technical signals to measurable business ROI.",
        "تتبع موزع يربط مؤشرات النظم التقنية مباشرة بنتائج الأعمال وعوائد الاستثمار."
      ),
    },
    {
      label: t(ar, "SELF-HEALING QUEUES", "طوابير ذاتية التعافي"),
      detail: t(
        ar,
        "Idempotent Kafka/EventHub backbones with automatic replay and dead-letter isolation.",
        "بنية تحتية متسامحة مع الأعطال مع إعادة تشغيل تلقائية وعزل آمن للرسائل المتعثرة."
      ),
    },
  ];

  return (
    <section id="zaakiy" className="py-20 sm:py-28 bg-[#101010] text-white">
      <div className="sk-shell space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D5360C] font-semibold block">
              {t(ar, "05 // SIGNATURE RESEARCH PLATFORM", "05 // البحث المميز ومنصة الذكاء التشغيلي")}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              ZaakiyV3RSE{" "}
              <span className="text-white/40 block text-xl sm:text-2xl mt-1">
                {t(ar, "Beyond uptime. Toward outcome intelligence.", "ما بعد الجاهزية. نحو ذكاء النتائج التشغيلية.")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              {t(
                ar,
                "ZaakiyV3RSE is an advanced autonomous research initiative that unifies deterministic enterprise business rules with dynamic agentic RAG orchestration. Rather than monitoring simple server uptime, it evaluates whether distributed business workflows achieved their exact commercial outcome.",
                "مبادرة بحثية متقدمة توحد قواعد الأعمال الحتمية للمؤسسات مع استدلال نماذج الذكاء الاصطناعي وRAG المتكيف. بدلاً من مجرد مراقبة تشغيل الخوادم، تقوم المنصة بتقييم تحقق النتائج التجارية المرجوة من كل مسار عمل."
              )}
            </p>
            <div className="pt-2">
              <Link
                to="/projects/zaakiy-v3rse"
                className="inline-flex items-center gap-2 bg-[#D5360C] text-white px-6 py-3.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#B52D09] transition-colors shadow-md"
              >
                <span>{t(ar, "EXPLORE BLUEPRINT & RESEARCH", "استكشف تفاصيل المخطط والبحث")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <figure className="lg:col-span-6 flex flex-col items-center">
            <ZaakiyBrain locale={locale} />
            <figcaption className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4">
              {t(ar, "CONCEPTUAL TOPOLOGY / ZAAKIY BRAIN MESH", "التوزيع المفاهيمي / شبكة عقل ZAAKIY")}
            </figcaption>
          </figure>
        </div>

        {/* 4 Extended Architecture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/15">
          {architecturalPillars.map((p, idx) => (
            <div key={idx} className="border border-white/15 bg-white/5 p-6 space-y-2 hover:border-[#D5360C] transition-colors">
              <span className="font-mono text-[10px] text-[#D5360C] uppercase font-bold block">
                0{idx + 1} // PILLAR
              </span>
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                {p.label}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed pt-2">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   13. FAQ SECTION (Video frame 00:58 - 01:01)
   ────────────────────────────────────────────────────────── */
export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";

  return (
    <section id="faq" className="py-20 sm:py-28 bg-background border-b border-border/80">
      <div className="sk-shell space-y-12">
        {/* Header without brackets */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
            {t(ar, "FREQUENT QUESTIONS", "الأسئلة الشائعة")}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-primary">
            {t(ar, "FREQUENT QUESTIONS", "أسئلة وإجابات")}
          </h2>
        </div>

        <div className="sk-faq__list divide-y divide-border border-t border-b border-border">
          {searchFocusedFaqs.slice(0, 6).map((item, index) => (
            <details key={item.id} className="py-5 group cursor-pointer">
              <summary className="flex items-center justify-between text-base sm:text-lg font-bold uppercase tracking-tight text-primary list-none">
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent font-semibold">0{index + 1}</span>
                  <span>{t(ar, item.question.en, item.question.ar)}</span>
                </span>
                <ChevronDown className="h-5 w-5 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-secondary leading-relaxed pl-8 pr-8">
                {t(ar, item.answer.en, item.answer.ar)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   14. CONTACT SECTION: Direct Outreach & Consultation
   Clean bilingual forms without language inversion
   ────────────────────────────────────────────────────────── */
export function ReferenceContact() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = ["Name: " + form.name, "Email: " + form.email, "", form.message].join("\n");
    window.location.href =
      "mailto:hello@sanukhan.dev?subject=" +
      encodeURIComponent("Project inquiry from sanukhan.dev") +
      "&body=" +
      encodeURIComponent(body);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-background">
      <div className="sk-shell">
        <div className="sk-video-contact-stage relative">
          <img
            src="/assets/images/contact-glow-mesh.webp"
            alt="Mesh Glow"
            className="sk-video-contact-stage__bg"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Floating Dark Contact Card */}
            <div className="lg:col-span-6 sk-video-contact-card">
              <div className="space-y-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-sans text-white">
                    Sanu Khan <span className="text-accent">®</span>
                  </h3>
                  <span className="font-mono text-xs text-white/50 uppercase">
                    {t(ar, "Reach Out Directly", "التواصل المباشر")}
                  </span>
                </div>
              </div>

              <form onSubmit={send} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-white/60 uppercase block mb-1.5">
                    {t(ar, "Name", "الاسم")}
                  </label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t(ar, "Jane Smith", "اسمك الكامل")}
                    className="w-full h-11 bg-white/5 border border-white/20 px-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label className="text-white/60 uppercase block mb-1.5">
                    {t(ar, "Email", "البريد الإلكتروني")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full h-11 bg-white/5 border border-white/20 px-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label className="text-white/60 uppercase block mb-1.5">
                    {t(ar, "Message", "تفاصيل المشروع")}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t(ar, "Your project scope, timeline, requirements...", "نطاق المشروع، الجدول الزمني، المتطلبات...")}
                    className="w-full bg-white/5 border border-white/20 p-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-white text-black font-bold uppercase tracking-wider hover:bg-[#D5360C] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t(ar, "SEND MESSAGE", "إرسال الرسالة")}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Right Column: Big Headline & Statement */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block border border-white/20 px-2.5 py-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D5360C] font-semibold">
                  {t(ar, "SOLUTIONS & CONSULTING", "استشارات هندسية وحلول")}
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[1.02]">
                {t(ar, "LET'S CREATE", "لنبنِ معاً")}{" "}
                <span className="text-[#D5360C] block">
                  {t(ar, "TOGETHER", "نظماً لا تنكسر")}
                </span>
              </h2>
              <div className="space-y-2 font-mono text-xs text-white/70">
                <p className="font-bold text-white uppercase">
                  {t(ar, "RESULTS-DRIVEN SOLUTIONS", "حلول موجهة بالنتائج")}
                </p>
                <p className="leading-relaxed">
                  {t(
                    ar,
                    "Refining system design and software through continuous feedback and testing to ensure the best possible production experience.",
                    "صقل وتطوير النظم عبر اختبارات دقيقة لضمان أعلى مستويات الأداء والاستقرار الإنتاجي."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 15. Legacy About Section Adapter for compatibility */
export function ReferenceAbout() {
  return null;
}
