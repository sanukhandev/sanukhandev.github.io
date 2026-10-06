import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

interface BlueprintNode {
  id: string;
  tag: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  connected: string[];
}

export function ArchitectureInPractice() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const [activeNodeId, setActiveNodeId] = useState<string>("integration-api");

  const nodes: Record<string, BlueprintNode> = {
    "consumer-platform": {
      id: "consumer-platform",
      tag: "EDGE_01",
      name: "Consumer Platform",
      nameAr: "منصات المستهلك والعملاء",
      role: "Client entry points including Web, Mobile apps, Dealership kiosks, and Partner portals.",
      roleAr: "نقاط وصول العملاء التي تشمل الويب وتطبيقات الهاتف وأجهزة نقاط البيع وبوابات الشركاء.",
      connected: ["consumer-platform", "experience-layer", "integration-api"],
    },
    "experience-layer": {
      id: "experience-layer",
      tag: "BFF_02",
      name: "Experience Layer",
      nameAr: "طبقة تجربة المستخدم (BFF)",
      role: "Aggregated BFF endpoints shaping domain responses for specific channel view requirements.",
      roleAr: "واجهات BFF تخصص استجابات النطاق وفقاً لمتطلبات القناة وتدير التخزين المؤقت للواجهات.",
      connected: ["consumer-platform", "experience-layer", "integration-api", "auth"],
    },
    "integration-api": {
      id: "integration-api",
      tag: "GATEWAY_03",
      name: "Integration API",
      nameAr: "واجهة تكامل الأنظمة (API)",
      role: "Validation, contract enforcement, request transformation, and synchronous orchestration.",
      roleAr: "التحقق من صحة العقود، تحويل الحمولات، وتنسيق تدفقات الطلبات المتزامنة بين المنصات.",
      connected: [
        "experience-layer",
        "integration-api",
        "transformation-layer",
        "event-bus",
        "erp",
        "crm-third-party",
      ],
    },
    "transformation-layer": {
      id: "transformation-layer",
      tag: "XFORM_04",
      name: "Integration / Transformation",
      nameAr: "طبقة التحويل والتوحيد المعياري",
      role: "Decouples protocol dialects and canonical data schemas before persistence or publishing.",
      roleAr: "تفصل بين بروتوكولات الأنظمة المختلفة وتطبع نماذج البيانات المعيارية قبل النشر أو الحفظ.",
      connected: [
        "integration-api",
        "transformation-layer",
        "auth",
        "event-bus",
        "monitoring",
      ],
    },
    auth: {
      id: "auth",
      tag: "SEC_05",
      name: "Auth & Security",
      nameAr: "التوثيق والأمان",
      role: "Central token verification, rate limiting, and RBAC policy enforcement.",
      roleAr: "التحقق المركزي من الرموز وإدارة حدود الطلبات وفرض سياسات الصلاحيات على مستوى الفروع.",
      connected: ["integration-api", "transformation-layer", "auth", "erp"],
    },
    "event-bus": {
      id: "event-bus",
      tag: "PUB_SUB_06",
      name: "Event Bus",
      nameAr: "ناقل الأحداث (Event Bus)",
      role: "Durable asynchronous messaging, ordered event partitions, idempotency keys, and replayability.",
      roleAr: "مراسلة غير متزامنة ومستقرة مع ضمان ترتيب الأحداث وتكافؤ القوة ومسارات إعادة المحاولة الآمنة.",
      connected: [
        "integration-api",
        "transformation-layer",
        "event-bus",
        "erp",
        "inventory",
        "crm-third-party",
      ],
    },
    monitoring: {
      id: "monitoring",
      tag: "TELEMETRY_07",
      name: "Monitoring & Observability",
      nameAr: "المراقبة والقابلية للملاحظة",
      role: "Distributed tracing, telemetry spans, SLA alerting, and failure correlation.",
      roleAr: "التتبع الموزع ومقاييس الأداء والتنبيه المبكر عند تأخر المعالجة أو ظهور أخطاء في التبعيات.",
      connected: [
        "transformation-layer",
        "event-bus",
        "monitoring",
        "erp",
        "inventory",
        "crm-third-party",
      ],
    },
    erp: {
      id: "erp",
      tag: "RECORD_08",
      name: "ERP (Core SAP)",
      nameAr: "نظام ERP (SAP / النواة)",
      role: "Authoritative financial system of record, transactional ledger, and master catalog origin.",
      roleAr: "المصدر المالي المعتمد وسجل المعاملات المحاسبية ومصدر الكتالوج الرئيسي للشركات.",
      connected: ["integration-api", "transformation-layer", "event-bus", "erp"],
    },
    inventory: {
      id: "inventory",
      tag: "STOCK_09",
      name: "Inventory Engine",
      nameAr: "محرك المخزون اللحظي",
      role: "High-throughput stock ledger, optimistic reservation locks, and multi-location availability.",
      roleAr: "سجل حركات المخزون عالي الإنتاجية مع أقفال حجز متفائلة وتتبع الأرصدة عبر الفروع.",
      connected: ["event-bus", "inventory"],
    },
    "crm-third-party": {
      id: "crm-third-party",
      tag: "EXT_10",
      name: "CRM / Third Party",
      nameAr: "إدارة علاقات العملاء والشركاء",
      role: "External carrier APIs, logistics hooks, payment gateways, and customer profiles.",
      roleAr: "واجهات شركات الطيران وبوابات الدفع ومزودي الشحن وخدمات العملاء الخارجية.",
      connected: ["integration-api", "event-bus", "crm-third-party"],
    },
  };

  const activeNode = nodes[activeNodeId] || nodes["integration-api"];
  const highlightedSet = new Set(activeNode.connected);

  const getNodeClasses = (id: string) => {
    const isSelf = id === activeNodeId;
    const isConnected = highlightedSet.has(id);

    if (isSelf) {
      return "border-accent bg-accent/15 text-accent font-semibold ring-1 ring-accent/40 shadow-xs";
    }
    if (isConnected) {
      return "border-accent/50 bg-accent/5 text-primary font-medium";
    }
    return "border-border/80 bg-surface/80 text-muted-foreground hover:border-border hover:text-primary";
  };

  return (
    <section id="architecture" className="py-10 sm:py-12 md:py-14 lg:py-16 scroll-mt-20 border-b border-border/60">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="text-[11.5px] sm:text-[12px] font-mono uppercase text-accent font-semibold tracking-[0.08em]">
              {isArabic ? "الهندسة المعمارية في التطبيق" : "ARCHITECTURE IN PRACTICE"}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-[10px] text-muted-foreground border border-dashed border-border px-1.5 py-0.2 rounded transform -rotate-1 select-none"
            >
              [SCHEMATIC_04]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-primary tracking-[-0.035em] leading-[1.08] mb-4">
            {isArabic ? (
              "نموذج مبسط لكيفية تحليلي للأنظمة كثيفة التكامل."
            ) : (
              <>
                A simplified example of how I <br className="hidden sm:inline" />
                reason about integration-heavy systems.
              </>
            )}
          </h2>
          <p className="text-[15.5px] sm:text-[16.5px] text-secondary leading-relaxed font-normal">
            {isArabic
              ? "انقر أو مرر الفأرة فوق أي عقدة في المخطط لتسليط الضوء على الأنظمة المتصلة بها ورؤية قرارات التصميم التشغيلي الخاصة بها."
              : "Hover or tap any node in the system blueprint to highlight connected nodes and inspect the architectural reasoning behind that boundary."}
          </p>
        </div>

        {/* Blueprint Layout: 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT 7 COLS: The System Blueprint Diagram */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 font-mono text-xs relative select-none">
            {/* Corner Drafting Marks (Architectural Notebook Crosshairs) */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-2 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-2 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute bottom-2 right-2 font-mono text-[11px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>

            {/* Blueprint Grid Texture */}
            <div className="absolute inset-0 system-grid pointer-events-none opacity-20" aria-hidden="true" />

            {/* Blueprint Title Block */}
            <div className="relative z-10 w-full flex items-center justify-between border-b border-dashed border-border/80 pb-3 mb-6 font-mono text-[10px] text-muted-foreground tracking-wider">
              <div className="flex items-center gap-1.5">
                <span className="text-accent font-semibold">FIG. 04</span>
                <span>//</span>
                <span>RUNTIME_TOPOLOGY</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-dashed border-border/90 bg-background/60">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span>CANONICAL EVENT BUS</span>
              </div>
              <span className="text-muted-foreground">SCALE: 1:1</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3.5 max-w-lg mx-auto">
              {/* Level 1: Consumer Platform */}
              <button
                type="button"
                onMouseEnter={() => setActiveNodeId("consumer-platform")}
                onClick={() => setActiveNodeId("consumer-platform")}
                className={cn(
                  "w-full max-w-[280px] rounded-lg border py-2.5 px-4 text-center text-xs transition-all duration-200 flex items-center justify-between",
                  getNodeClasses("consumer-platform")
                )}
              >
                <span>{isArabic ? nodes["consumer-platform"].nameAr : nodes["consumer-platform"].name}</span>
                <span className="text-[9.5px] opacity-60 font-mono">[EDGE_01]</span>
              </button>

              {/* Vertical connector */}
              <div className="h-4 w-px border-l border-dashed border-border/90" />

              {/* Level 2: Experience Layer */}
              <button
                type="button"
                onMouseEnter={() => setActiveNodeId("experience-layer")}
                onClick={() => setActiveNodeId("experience-layer")}
                className={cn(
                  "w-full max-w-[280px] rounded-lg border py-2.5 px-4 text-center text-xs transition-all duration-200 flex items-center justify-between",
                  getNodeClasses("experience-layer")
                )}
              >
                <span>{isArabic ? nodes["experience-layer"].nameAr : nodes["experience-layer"].name}</span>
                <span className="text-[9.5px] opacity-60 font-mono">[BFF_02]</span>
              </button>

              {/* Vertical connector */}
              <div className="h-4 w-px border-l border-dashed border-border/90" />

              {/* Level 3: Integration API */}
              <button
                type="button"
                onMouseEnter={() => setActiveNodeId("integration-api")}
                onClick={() => setActiveNodeId("integration-api")}
                className={cn(
                  "w-full max-w-[320px] rounded-lg border py-3 px-4 text-center text-[12.5px] transition-all duration-200 flex items-center justify-between",
                  getNodeClasses("integration-api")
                )}
              >
                <span>{isArabic ? nodes["integration-api"].nameAr : nodes["integration-api"].name}</span>
                <span className="text-[9.5px] opacity-60 font-mono">[API_GATEWAY]</span>
              </button>

              {/* Vertical connector */}
              <div className="h-4 w-px border-l border-dashed border-border/90" />

              {/* Level 4: Integration / Transformation */}
              <button
                type="button"
                onMouseEnter={() => setActiveNodeId("transformation-layer")}
                onClick={() => setActiveNodeId("transformation-layer")}
                className={cn(
                  "w-full max-w-[320px] rounded-lg border py-2.5 px-4 text-center text-xs transition-all duration-200 flex items-center justify-between",
                  getNodeClasses("transformation-layer")
                )}
              >
                <span>{isArabic ? nodes["transformation-layer"].nameAr : nodes["transformation-layer"].name}</span>
                <span className="text-[9.5px] opacity-60 font-mono">[XFORM_PIPE]</span>
              </button>

              {/* Bus connector bar */}
              <div className="w-full max-w-[420px] flex items-center justify-center relative my-1">
                <div className="h-px w-full border-t border-dashed border-accent/60" />
                <span className="absolute bg-background/90 px-2 font-mono text-[9px] text-accent tracking-wider uppercase border border-border/60 rounded">
                  ASYNCHRONOUS CANONICAL EVENT BUS
                </span>
              </div>

              {/* Level 5: Middle Services (Auth, Event Bus, Monitoring) */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[440px] pt-1">
                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("auth")}
                  onClick={() => setActiveNodeId("auth")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11px] truncate transition-all duration-200",
                    getNodeClasses("auth")
                  )}
                >
                  {isArabic ? nodes["auth"].nameAr : nodes["auth"].name}
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("event-bus")}
                  onClick={() => setActiveNodeId("event-bus")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11.5px] truncate transition-all duration-200",
                    getNodeClasses("event-bus")
                  )}
                >
                  {isArabic ? nodes["event-bus"].nameAr : nodes["event-bus"].name}
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("monitoring")}
                  onClick={() => setActiveNodeId("monitoring")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11px] truncate transition-all duration-200",
                    getNodeClasses("monitoring")
                  )}
                >
                  {isArabic ? nodes["monitoring"].nameAr : nodes["monitoring"].name}
                </button>
              </div>

              {/* Vertical connectors down */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[440px] place-items-center">
                <div className="h-3 w-px border-l border-dashed border-border/90" />
                <div className="h-3 w-px border-l border-dashed border-border/90" />
                <div className="h-3 w-px border-l border-dashed border-border/90" />
              </div>

              {/* Level 6: Core Backends (ERP, Inventory, CRM/3rd Party) */}
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[440px]">
                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("erp")}
                  onClick={() => setActiveNodeId("erp")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11px] truncate transition-all duration-200",
                    getNodeClasses("erp")
                  )}
                >
                  {isArabic ? nodes["erp"].nameAr : nodes["erp"].name}
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("inventory")}
                  onClick={() => setActiveNodeId("inventory")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11px] truncate transition-all duration-200",
                    getNodeClasses("inventory")
                  )}
                >
                  {isArabic ? nodes["inventory"].nameAr : nodes["inventory"].name}
                </button>

                <button
                  type="button"
                  onMouseEnter={() => setActiveNodeId("crm-third-party")}
                  onClick={() => setActiveNodeId("crm-third-party")}
                  className={cn(
                    "rounded-lg border py-2.5 px-2 text-center text-[11px] truncate transition-all duration-200",
                    getNodeClasses("crm-third-party")
                  )}
                >
                  {isArabic ? nodes["crm-third-party"].nameAr : nodes["crm-third-party"].name}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Explanation Panel for Active Node (Field Audit Sheet Style) */}
          <div className="lg:col-span-5 rounded-2xl border border-border/80 bg-surface/90 p-6 sm:p-8 flex flex-col justify-between relative">
            {/* Subtle Drafting Crosshair */}
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent/40 select-none pointer-events-none"
            >
              +
            </span>

            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-dashed border-border/70">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                  <Info className="h-3.5 w-3.5" />
                  <span>{isArabic ? "تفاصيل العقدة النشطة" : "SPEC // BOUNDARY_AUDIT"}</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground px-2 py-0.5 rounded border border-border bg-background">
                  {activeNode.tag}
                </span>
              </div>

              <h3 className="text-[22px] font-semibold text-primary mb-3">
                {isArabic ? activeNode.nameAr : activeNode.name}
              </h3>

              <p className="text-[15px] text-secondary leading-relaxed mb-6 font-normal">
                {isArabic ? activeNode.roleAr : activeNode.role}
              </p>

              {/* Connected Boundaries indicator */}
              <div className="pt-4 border-t border-dashed border-border/70">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[12px] font-mono font-semibold text-muted-foreground uppercase tracking-wider block">
                    {isArabic ? "الحدود المتصلة بهذه العقدة:" : "Connected boundaries in flow:"}
                  </span>
                  <span className="text-[10px] font-mono text-accent">
                    {activeNode.connected.length} NODES
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {activeNode.connected.map((connId) => {
                    const c = nodes[connId];
                    if (!c) return null;
                    return (
                      <span
                        key={connId}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-[11px] font-mono",
                          connId === activeNodeId
                            ? "border-accent/60 bg-accent/15 text-accent font-semibold"
                            : "border-border/80 bg-background text-secondary"
                        )}
                      >
                        {isArabic ? c.nameAr : c.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Architecture note link & telemetry stamp */}
            <div className="pt-6 mt-6 border-t border-dashed border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent hover:underline"
              >
                <span>{isArabic ? "المزيد من الملاحظات المعمارية" : "See more architecture notes"}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
              </Link>
              <span className="font-mono text-[10px] text-muted-foreground">
                STATUS: ISOLATED_CONTEXT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ArchitectureInPractice);
