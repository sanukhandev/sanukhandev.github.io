import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Code2,
  Cpu,
  FlaskConical,
  Globe,
  Layers,
  LayoutDashboard,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface UtilityCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
  href: string;
}

interface CapabilityCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag: string;
}

interface FoundationItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LatestTool {
  title: string;
  description: string;
  tag: string;
  isNew: boolean;
}

const utilityCards: UtilityCard[] = [
  {
    icon: <Braces className="h-4 w-4" />,
    title: "JSON Formatter",
    description: "Validate, clean, and structure payloads instantly.",
    tag: "Data Tools",
    href: "https://aruvix.com/json-formatter",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: "API Client",
    description: "Inspect and test APIs with precision-focused workflows.",
    tag: "API & Testing",
    href: "https://aruvix.com/api-client",
  },
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "Frontend Tools",
    description: "Optimize UI engineering and design-to-code workflows.",
    tag: "Frontend Systems",
    href: "https://aruvix.com",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "QA Utilities",
    description: "Generate assertions, validate payloads, and debug faster.",
    tag: "Stability Engineering",
    href: "https://aruvix.com",
  },
];

const utilityCardsAr: UtilityCard[] = [
  {
    icon: <Braces className="h-4 w-4" />,
    title: "منسق JSON",
    description: "تحقق من البيانات ونظّمها بسرعة ودقة.",
    tag: "أدوات البيانات",
    href: "https://aruvix.com/json-formatter",
  },
  {
    icon: <Globe className="h-4 w-4" />,
    title: "عميل API",
    description: "اختبر واجهات API وراقب الاستجابات بسير عمل عملي.",
    tag: "واجهات واختبار",
    href: "https://aruvix.com/api-client",
  },
  {
    icon: <LayoutDashboard className="h-4 w-4" />,
    title: "أدوات الواجهة",
    description: "تحسين تطوير الواجهات وربط التصميم بالكود بكفاءة.",
    tag: "أنظمة الواجهة",
    href: "https://aruvix.com",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "أدوات الجودة",
    description: "أنشئ اختبارات تحقق، وافحص البيانات، واكتشف الأخطاء أسرع.",
    tag: "هندسة الاستقرار",
    href: "https://aruvix.com",
  },
];

const capabilities: CapabilityCard[] = [
  {
    icon: <Code2 className="h-4 w-4" />,
    title: "For Developers",
    description:
      "Providing robust utilities to simplify complex full-stack integration across modern runtimes and API layers.",
    tag: "Integration Utilities",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "For QA & Testing",
    description:
      "Building automated and manual testing helpers to ensure product stability, regression coverage, and release confidence.",
    tag: "Stability Engineering",
  },
  {
    icon: <Layers className="h-4 w-4" />,
    title: "For Frontend Specialists",
    description:
      "Enhancing UI/UX workflows with streamlined components and design-to-code bridges for high-fidelity delivery.",
    tag: "Component Systems",
  },
];

const capabilitiesAr: CapabilityCard[] = [
  {
    icon: <Code2 className="h-4 w-4" />,
    title: "للمطورين",
    description:
      "نوفر أدوات قوية لتبسيط التكاملات المعقدة بين الواجهات، والخدمات، وطبقات الأنظمة الحديثة.",
    tag: "أدوات التكامل",
  },
  {
    icon: <FlaskConical className="h-4 w-4" />,
    title: "للفرق والجودة",
    description:
      "نبني أدوات للاختبار اليدوي والآلي لضمان ثبات المنتج وتغطية الانحدارات بثقة إصدار أعلى.",
    tag: "هندسة الاستقرار",
  },
  {
    icon: <Layers className="h-4 w-4" />,
    title: "لمتخصصي الواجهة",
    description:
      "تحسين سير عمل UI/UX عبر مكونات عملية وجسور تصميم-إلى-كود لتسليم دقيق وسريع.",
    tag: "أنظمة المكونات",
  },
];

const foundationItems: FoundationItem[] = [
  {
    icon: <Cpu className="h-4 w-4" />,
    title: "Local-first Processing",
    description:
      "Most tools run directly in your browser — no server round-trips, no data exposure, no latency.",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "Developer-Centric UX",
    description:
      "Minimal interfaces engineered for efficiency and deep focus. No noise, no clutter.",
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    title: "Unified Workflow System",
    description:
      "Move between formatting, inspection, conversion, and debugging without context switching.",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "Extensible Foundation",
    description:
      "Built with scalability and future tooling expansion in mind — architecture-first by design.",
  },
];

const foundationItemsAr: FoundationItem[] = [
  {
    icon: <Cpu className="h-4 w-4" />,
    title: "معالجة محلية أولاً",
    description:
      "معظم الأدوات تعمل داخل المتصفح مباشرة دون إرسال بيانات أو انتظار إضافي.",
  },
  {
    icon: <Zap className="h-4 w-4" />,
    title: "تجربة موجهة للمطور",
    description:
      "واجهات بسيطة مصممة للتركيز والإنتاجية العالية بدون ضوضاء.",
  },
  {
    icon: <RefreshCw className="h-4 w-4" />,
    title: "سير عمل موحّد",
    description:
      "تنقل بين التنسيق، والفحص، والتحويل، والتصحيح دون كسر السياق.",
  },
  {
    icon: <Shield className="h-4 w-4" />,
    title: "أساس قابل للتوسع",
    description:
      "بنية مصممة للتطوير المستقبلي وإضافة أدوات جديدة بسهولة.",
  },
];

const latestTools: LatestTool[] = [
  {
    title: "CSS Variables Extractor",
    description: "Extract and audit CSS custom properties from any stylesheet.",
    tag: "Frontend",
    isNew: true,
  },
  {
    title: "SVG Optimizer",
    description: "Clean and compress SVG assets for production-ready output.",
    tag: "Asset Tools",
    isNew: true,
  },
  {
    title: "API Assertion Generator",
    description: "Auto-generate test assertions from live API response shapes.",
    tag: "QA & Testing",
    isNew: true,
  },
];

const latestToolsAr: LatestTool[] = [
  {
    title: "مستخرج متغيرات CSS",
    description: "استخرج وراجع متغيرات CSS من أي ملف أنماط.",
    tag: "واجهة أمامية",
    isNew: true,
  },
  {
    title: "محسّن SVG",
    description: "نظّف ملفات SVG واضغطها لمخرجات جاهزة للإنتاج.",
    tag: "أدوات الأصول",
    isNew: true,
  },
  {
    title: "مولد Assertions للـ API",
    description: "أنشئ Assertions تلقائياً من هياكل استجابات API الحية.",
    tag: "جودة واختبار",
    isNew: true,
  },
];

const trustPills = [
  { label: "Browser-Local Processing", icon: <Shield className="h-3 w-3" /> },
  { label: "Privacy First", icon: <CheckCircle2 className="h-3 w-3" /> },
  { label: "Developer Focused", icon: <Code2 className="h-3 w-3" /> },
  { label: "No Sign-Up Required", icon: <Zap className="h-3 w-3" /> },
  { label: "Fast Parsing Engine", icon: <Cpu className="h-3 w-3" /> },
];

const trustPillsAr = [
  { label: "معالجة محلية داخل المتصفح", icon: <Shield className="h-3 w-3" /> },
  { label: "الخصوصية أولاً", icon: <CheckCircle2 className="h-3 w-3" /> },
  { label: "موجّه للمطور", icon: <Code2 className="h-3 w-3" /> },
  { label: "بدون تسجيل", icon: <Zap className="h-3 w-3" /> },
  { label: "محرك تحليل سريع", icon: <Cpu className="h-3 w-3" /> },
];

export default function AruvixSection() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const sectionUtilityCards = isArabic ? utilityCardsAr : utilityCards;
  const sectionCapabilities = isArabic ? capabilitiesAr : capabilities;
  const sectionFoundationItems = isArabic ? foundationItemsAr : foundationItems;
  const sectionLatestTools = isArabic ? latestToolsAr : latestTools;
  const sectionTrustPills = isArabic ? trustPillsAr : trustPills;

  return (
    <section id="aruvix" className="surface-2 relative overflow-hidden">
      {/* Subtle dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.022]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BLOCK 1 — SECTION HEADER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="pt-12 sm:pt-16">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {isArabic ? "منصة أدوات هندسية" : "Engineering Toolkit Platform"}
            </p>
            <h2 className="text-[clamp(1.85rem,3.8vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-primary">
              {isArabic ? (
                <>
                  اجعل سير عملك
                  <span className="text-accent"> أسرع.</span>
                </>
              ) : (
                <>
                  Let your workflows <span className="text-accent">move faster.</span>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.8] text-secondary">
              {isArabic ? "كمساهم في " : "As a contributor to "}
              <a
                href="https://aruvix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                Aruvix.com
              </a>
              {isArabic
                ? "، أعمل على بناء مجموعة أدوات مركزة للمطورين وفرق الجودة ومتخصصي الواجهة لتبسيط التحقق، والتصحيح، والتنسيق، وسير العمل الهندسي الحديث."
                : ", I help build a focused toolkit for developers, QA teams, and frontend specialists — designed to simplify validation, debugging, formatting, and modern development workflows."}
            </p>

            {/* Trust pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {sectionTrustPills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-default bg-secondary/50 px-3 py-1 text-[11px] font-medium text-secondary"
                >
                  <span className="text-accent opacity-70">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BLOCK 2 — CORE ENGINEERING UTILITIES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-8">
        <div className="container-narrow">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-secondary opacity-60">
                {isArabic ? "الأدوات" : "Utilities"}
              </p>
              <h3 className="text-[18px] font-bold tracking-tight text-primary">
                {isArabic ? "أدوات هندسية أساسية" : "Core Engineering Utilities"}
              </h3>
            </div>
            <a
              href="https://aruvix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[12px] font-semibold text-accent hover:underline"
            >
              {isArabic ? "عرض الكل ←" : "View all →"}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectionUtilityCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-[18px] border border-default bg-secondary/30 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:bg-secondary/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-default bg-secondary text-accent transition-colors duration-200 group-hover:border-accent-soft">
                    {card.icon}
                  </span>
                  <span className="rounded-full border border-default bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-secondary">
                    {card.tag}
                  </span>
                </div>
                <h4 className="mb-1.5 text-[13px] font-semibold text-primary">
                  {card.title}
                </h4>
                <p className="text-[12px] leading-[1.65] text-secondary">
                  {card.description}
                </p>
                <div className="mt-auto pt-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {isArabic ? "فتح الأداة" : "Open tool"} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BLOCK 3 — TECHNICAL FOUNDATION (split)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-8">
        <div className="container-narrow">
          {/* Section border separator */}
          <div className="mb-8 h-px bg-border opacity-40" />

          <div className="grid gap-8 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">
            {/* LEFT */}
            <div className="flex flex-col justify-center lg:pr-12 xl:pr-16">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                {isArabic ? "الأساس التقني" : "Technical Foundation"}
              </p>
              <h2
                className="text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-[1.1] tracking-tight text-primary"
                style={{ maxWidth: "22ch" }}
              >
                {isArabic
                  ? "مجموعة أدوات متقدمة لفرق الأداء العالي."
                  : "The extended toolkit for high-performance teams."}
              </h2>
              <p className="mt-4 max-w-[440px] text-[14px] leading-[1.85] text-secondary">
                {isArabic
                  ? "تخدم Aruvix المتخصصين عبر كامل طبقات الهندسة: من أدوات التكامل وبيئات التصحيح إلى خطوط الجودة وأنظمة الواجهة."
                  : "Aruvix serves professionals across the full engineering stack — from integration utilities and debugging environments to QA pipelines and frontend systems."}
              </p>

              {/* Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  isArabic ? "أدوات Full-Stack" : "Full-Stack Tooling",
                  isArabic ? "أتمتة الجودة" : "QA Automation",
                  isArabic ? "أنظمة الواجهة" : "Frontend Systems",
                  isArabic ? "هندسة سير العمل" : "Workflow Engineering",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 rounded-full border border-default bg-secondary/50 px-3 py-1 text-[11px] font-medium text-secondary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-60" />
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="h-px w-8 bg-accent opacity-40" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary opacity-50">
                  {isArabic ? "منظومة هندسية" : "Engineering Ecosystem"}
                </p>
              </div>
            </div>

            {/* Vertical divider */}
            <div
              aria-hidden
              className="hidden w-px self-stretch lg:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)",
              }}
            />

            {/* RIGHT — capability rows */}
            <div className="flex flex-col gap-0 lg:pl-12 xl:pl-16">
              {sectionCapabilities.map((cap, i) => (
                <article
                  key={i}
                  className="group relative flex gap-4 border-b border-default py-5 last:border-b-0"
                >
                  <div className="flex w-8 shrink-0 flex-col items-center pt-0.5">
                    <span className="text-[11px] font-bold tabular-nums text-accent opacity-40 transition-opacity duration-200 group-hover:opacity-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < capabilities.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-border opacity-20" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-default bg-secondary/80 text-accent transition-colors duration-200 group-hover:border-accent-soft">
                        {cap.icon}
                      </span>
                      <h3 className="text-[14px] font-semibold text-primary">
                        {cap.title}
                      </h3>
                      <span className="ml-auto shrink-0 rounded-full border border-default bg-secondary/40 px-2 py-0.5 text-[10px] font-medium text-secondary">
                        {cap.tag}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.7] text-secondary">
                      {cap.description}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -left-[1px] top-0 hidden h-full w-0.5 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-50 lg:block"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BLOCK 4 — WHY ARUVIX EXISTS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-8">
        <div className="container-narrow">
          <div className="mb-6 h-px bg-border opacity-40" />

          <div className="mb-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              {isArabic ? "الفلسفة" : "Philosophy"}
            </p>
            <h3 className="text-[clamp(1.3rem,2.5vw,1.9rem)] font-extrabold tracking-tight text-primary">
              {isArabic
                ? "مبنية لسير عمل هندسي مركز."
                : "Built for focused engineering workflows."}
            </h3>
            <p className="mt-2.5 max-w-[560px] text-[14px] leading-[1.8] text-secondary">
              {isArabic
                ? "تم تصميم Aruvix لتقليل الاحتكاك في سير العمل عبر التصحيح، والتنسيق، والاختبار، وفحص الـ API، ومهام التكامل المعقدة."
                : "Aruvix was designed to reduce workflow friction across debugging, formatting, testing, API inspection, and integration-heavy engineering tasks."}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectionFoundationItems.map((item, i) => (
              <div
                key={i}
                className="group rounded-[18px] border border-default bg-secondary/20 p-5 transition-all duration-200 hover:border-accent-soft hover:bg-secondary/40"
              >
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-default bg-secondary text-accent transition-colors duration-200 group-hover:border-accent-soft">
                  {item.icon}
                </span>
                <h4 className="mb-1.5 text-[13px] font-semibold text-primary">
                  {item.title}
                </h4>
                <p className="text-[12px] leading-[1.65] text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BLOCK 5 — LATEST ADDITIONS + CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="mt-8 pb-12 sm:pb-16">
        <div className="container-narrow">
          <div className="mb-5 h-px bg-border opacity-40" />

          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="text-[15px] font-bold text-primary">
              {isArabic ? "أحدث الإضافات" : "Latest Additions"}
            </h3>
            <a
              href="https://aruvix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-accent hover:underline"
            >
              {isArabic ? "كل الأدوات ←" : "All tools →"}
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {sectionLatestTools.map((tool, i) => (
              <a
                key={i}
                href="https://aruvix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-[16px] border border-default bg-secondary/20 px-4 py-3.5 transition-all duration-200 hover:border-accent-soft hover:bg-secondary/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                      {tool.title}
                    </span>
                    {tool.isNew && (
                      <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                        {isArabic ? "جديد" : "NEW"}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] leading-[1.6] text-secondary">
                    {tool.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-md border border-default bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-secondary">
                  {tool.tag}
                </span>
              </a>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="https://aruvix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent-soft bg-accent/10 px-5 py-2.5 text-[13px] font-semibold text-accent transition-all duration-200 hover:bg-accent/20"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {isArabic ? "استكشف Aruvix.com" : "Explore Aruvix.com"}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
            </a>
            <p className="text-[12px] text-secondary opacity-60">
              {isArabic
                ? "مجموعة أدوات هندسية متنامية — تُبنى بشفافية."
                : "A growing engineering toolkit — built in the open."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
