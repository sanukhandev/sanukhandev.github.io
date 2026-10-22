import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedCaseStudy, getLocalizedCaseStudies } from "@/data/caseStudies";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Cpu, GitBranch, Terminal, Sparkles, BookOpen } from "lucide-react";
import { buildBreadcrumbListSchema, buildCreativeWorkSchema, buildTechArticleSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

const CASE_STUDY_IMAGES: Record<string, string> = {
  "zaakiy-v3rse": "/assets/systems.jpg",
  "enterprise-retail-integration": "/assets/commerce.jpg",
  "automotive-omnichannel-platform": "/assets/platform.jpg",
  "airline-retailing-aggregation": "/assets/observability.jpg",
  "real-estate-erp-architecture": "/assets/architecture.jpg",
  "garage-management-and-diagnostics": "/assets/automation.jpg",
  "headless-healthcare-digital-experience": "/assets/integration.jpg",
};

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const [viewMode, setViewMode] = useState<"overview" | "architecture">("overview");

  // Instantly scroll to top when opening or switching case studies
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [slug]);

  const caseStudy = getLocalizedCaseStudy(slug || "", locale);
  const allCaseStudies = getLocalizedCaseStudies(locale);

  if (!caseStudy) {
    return <Navigate to="/projects" replace />;
  }

  const currentIndex = allCaseStudies.findIndex((cs) => cs.slug === slug);
  const nextCaseStudy = allCaseStudies[(currentIndex + 1) % allCaseStudies.length];

  const caseStudyKeywords = [
    ...caseStudy.themes,
    ...caseStudy.systemsInvolved,
    caseStudy.domain,
    caseStudy.title,
    "Sanu Khan",
    "Solution Architect Dubai",
    "Architecture Case Study",
  ];

  return (
    <>
      <SeoMeta
        title={`${caseStudy.title} — ${isArabic ? "دراسة حالة معمارية" : "Architecture Case Study"} | Sanu Khan`}
        description={caseStudy.summary}
        canonicalPath={`/projects/${caseStudy.slug}`}
        kind="article"
        keywords={caseStudyKeywords}
        schema={[
          buildBreadcrumbListSchema([
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "الأعمال" : "Projects", path: "/projects" },
            { name: caseStudy.title, path: `/projects/${caseStudy.slug}` },
          ]),
          buildTechArticleSchema({
            title: `${caseStudy.title} — Architecture Case Study`,
            description: caseStudy.summary,
            path: `/projects/${caseStudy.slug}`,
          }),
          buildCreativeWorkSchema({
            title: caseStudy.title,
            description: caseStudy.summary,
            path: `/projects/${caseStudy.slug}`,
            technologies: caseStudy.systemsInvolved,
          }),
        ]}
      />
      <Navbar />

      <main className="reference-subpage reference-case-study-page min-h-screen bg-background pt-24 pb-16 text-foreground">
        <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {isArabic ? "العودة إلى الأعمال المعمارية المختارة" : "Back to Selected Architecture Work"}
          </Link>

          {/* Header */}
          <header className="border-b border-border/60 pb-6">
            <div className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-mono uppercase text-accent font-semibold mb-3">
              {caseStudy.domain}
            </div>

            <h1
              style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)", lineHeight: 1.25 }}
              className="font-bold tracking-tight text-primary"
            >
              {caseStudy.title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-secondary leading-relaxed font-normal max-w-3xl">
              {caseStudy.subtitle}
            </p>

            {/* Architecture Themes */}
            <div className="mt-5 flex flex-wrap gap-2">
              {caseStudy.themes.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-0.5 text-xs font-mono text-secondary"
                >
                  {theme}
                </span>
              ))}
            </div>
          </header>

          {/* Dual-Mode Segmented Control (Overview vs Deep Dive Architecture) */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
            <div className="inline-flex rounded-lg border border-border/80 bg-black/[0.03] dark:bg-white/[0.04] p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setViewMode("overview")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 font-bold transition-all ${
                  viewMode === "overview"
                    ? "bg-[#D5360C] text-white shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
                aria-pressed={viewMode === "overview"}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isArabic ? "نظرة عامة (TL;DR)" : "Overview (TL;DR)"}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("architecture")}
                className={`flex items-center gap-2 rounded-md px-4 py-2 font-bold transition-all ${
                  viewMode === "architecture"
                    ? "bg-[#D5360C] text-white shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
                aria-pressed={viewMode === "architecture"}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{isArabic ? "الهندسة المعمارية (10 محاور)" : "Architecture (Deep Dive)"}</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
              {viewMode === "overview"
                ? (isArabic ? "ملخص تنفيذي · قراءة في 60 ثانية" : "Executive Snapshot · 60-Sec Read")
                : (isArabic ? "دراسة معمارية شاملة · 10 محاور تقنية" : "Full Architectural Analysis · 10 Points")}
            </span>
          </div>

          {/* Cover Media Slot */}
          <div className="mt-8 mb-10 overflow-hidden rounded-2xl bg-zinc-950 border border-border/80 shadow-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <ResponsiveImage
              src={CASE_STUDY_IMAGES[caseStudy.slug] || "/assets/systems.jpg"}
              alt={caseStudy.title}
              className="w-full aspect-[16/9] object-cover"
              priority
            />
          </div>

          {viewMode === "overview" ? (
            /* ── Dual-Mode Option 1: Executive Overview (TL;DR) ── */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Snapshot Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem & Context */}
                <div className="relative rounded-xl border border-border/80 bg-black/[0.02] dark:bg-white/[0.02] p-6 shadow-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>
                  <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>

                  <span className="text-xs font-mono font-bold text-[#D5360C] uppercase tracking-wider block mb-2">
                    {isArabic ? "// السياق والتحدي" : "// CONTEXT & CHALLENGE"}
                  </span>
                  <p className="text-sm leading-relaxed text-secondary mb-4">{caseStudy.context}</p>
                  <p className="text-sm leading-relaxed text-primary font-medium">{caseStudy.problem}</p>
                </div>

                {/* Role & Core Systems */}
                <div className="relative rounded-xl border border-border/80 bg-black/[0.02] dark:bg-white/[0.02] p-6 shadow-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>
                  <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>

                  <span className="text-xs font-mono font-bold text-[#D5360C] uppercase tracking-wider block mb-2">
                    {isArabic ? "// دوري الهندسي" : "// ARCHITECTURE ROLE"}
                  </span>
                  <p className="text-sm leading-relaxed text-secondary mb-4">{caseStudy.role}</p>

                  <div className="pt-4 border-t border-border/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                      {isArabic ? "الأنظمة المعنية:" : "Systems Involved:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.systemsInvolved.map((sys) => (
                        <span key={sys} className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-border/60 text-primary">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Outcomes Highlight */}
              <div className="relative rounded-xl border border-[#D5360C]/20 bg-[#D5360C]/[0.03] p-6 sm:p-8">
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-[#D5360C]/40 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-[#D5360C]/40 select-none">+</div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#D5360C] text-sm">✳</span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D5360C]">
                    {isArabic ? "النتائج المحققة والموثقة" : "VERIFIED PRODUCTION OUTCOMES"}
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {caseStudy.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base">
                      <span className="text-[#D5360C] font-bold shrink-0">✓</span>
                      <span className="text-primary">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Decisions Preview */}
              <div className="rounded-xl border border-border/80 bg-black/[0.02] dark:bg-white/[0.02] p-6 sm:p-8">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  {isArabic ? "القرارات المعمارية الرئيسية" : "ARCHITECTURAL DECISIONS OVERVIEW"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.keyDecisions.map((kd, idx) => (
                    <div key={kd.title} className="p-4 rounded-lg bg-background border border-border/80">
                      <h4 className="text-sm font-bold text-primary mb-1 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#D5360C] shrink-0" />
                        <span className="tabular-nums font-mono">{idx + 1}.</span> {kd.title}
                      </h4>
                      <p className="text-xs text-secondary leading-relaxed">{kd.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs text-secondary font-mono">
                    {isArabic ? "تريد الاطلاع على المخططات الهندسية والنموذج الفني؟" : "Want to review failure domains and engineering schematics?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode("architecture")}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
                  >
                    <span>{isArabic ? "عرض التحليل المعماري الكامل (10 محاور)" : "VIEW FULL 10-POINT ANALYSIS"}</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── Dual-Mode Option 2: 10-Point Architectural Structure (Deep Dive) ── */
            <div className="mt-12 space-y-12 text-secondary animate-in fade-in duration-300">
              {/* 01 — Context */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "01 — السياق" : "01 — Context"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {isArabic ? "ماذا كان يحدث في الأعمال؟" : "What was happening in the business?"}
                </h3>
                <p className="text-base leading-relaxed">{caseStudy.context}</p>
              </section>

              {/* 02 — Problem */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "02 — المشكلة" : "02 — Problem"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {isArabic ? "ما الذي جعل النظام صعباً؟" : "What made the system difficult?"}
                </h3>
                <p className="text-base leading-relaxed">{caseStudy.problem}</p>
              </section>

              {/* 03 — Constraints */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "03 — القيود" : "03 — Constraints"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {isArabic ? "ما هي القيود التي شكلت العمارة؟" : "What constraints shaped the architecture?"}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {caseStudy.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base">
                      <span className="font-mono text-xs text-[#D5360C] font-bold mt-1 tabular-nums">[{i + 1}]</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 04 — Architecture Diagram */}
              <section className="relative rounded-xl border border-border bg-black/[0.02] dark:bg-white/[0.02] p-6 sm:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>

                <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold flex items-center gap-2 tabular-nums">
                    <Terminal className="h-4 w-4" />
                    {isArabic ? "04 — مخطط العمارة المعمارية" : "04 — Architecture Schematic"}
                  </h2>
                  <span className="text-xs font-mono text-muted-foreground">
                    {isArabic ? "مخطط هندسي" : "Engineering Schematic"}
                  </span>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-primary leading-relaxed overflow-x-auto p-4 rounded-lg bg-background border border-border/50">
                  {caseStudy.architectureDiagramText.trim()}
                </pre>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-primary">
                    {isArabic ? "الأنظمة المعنية:" : "Systems Involved:"}
                  </span>
                  {caseStudy.systemsInvolved.join(" · ")}
                </div>
              </section>

              {/* 05 — Key Decisions */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "05 — القرارات المعمارية الرئيسية" : "05 — Key Decisions"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {isArabic ? "ما هي القرارات المعمارية المؤثرة؟" : "What architectural decisions mattered?"}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {caseStudy.keyDecisions.map((kd, idx) => (
                    <div key={kd.title} className="rounded-lg border border-border/80 bg-background/60 p-4">
                      <h4 className="text-sm font-bold text-primary mb-1 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#D5360C] shrink-0" />
                        <span className="tabular-nums font-mono">{idx + 1}.</span> {kd.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-secondary">{kd.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 06 — Failure Model */}
              <section className="relative rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-amber-500/40 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-amber-500/40 select-none">+</div>

                <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2 flex items-center gap-2 tabular-nums">
                  <ShieldAlert className="h-4 w-4" />
                  {isArabic ? "06 — نموذج التعامل مع الأعطال" : "06 — Failure Model"}
                </h2>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {isArabic ? "ماذا يحدث عند تعطل التبعيات؟" : "What happens when dependencies fail?"}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-secondary">{caseStudy.failureModel}</p>
              </section>

              {/* 07 — My Role */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "07 — دوري" : "07 — My Role"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {isArabic ? "ما ساهمت به بدقة" : "Exactly what I contributed"}
                </h3>
                <p className="text-base leading-relaxed">{caseStudy.role}</p>
              </section>

              {/* 08 — Outcome */}
              <section className="border-l-2 border-[#D5360C]/60 pl-6 rtl:pl-0 rtl:pr-6 py-1">
                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 tabular-nums">
                  {isArabic ? "08 — النتائج" : "08 — Outcome"}
                </h2>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {isArabic ? "نتائج النظام المحققة" : "Verified System Outcomes"}
                </h3>
                <ul className="space-y-2">
                  {caseStudy.outcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base">
                      <span className="text-[#D5360C] font-bold">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 09 — What I Learned */}
              <section className="relative rounded-xl border border-[#D5360C]/30 bg-[#D5360C]/5 p-6">
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-[#D5360C]/40 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-[#D5360C]/40 select-none">+</div>

                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 flex items-center gap-2 tabular-nums">
                  <Cpu className="h-4 w-4" />
                  {isArabic ? "09 — ما تعلمته" : "09 — What I Learned"}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed italic text-primary font-medium">
                  "{caseStudy.lessons}"
                </p>
              </section>

              {/* 10 — What I Would Revisit Today */}
              <section className="relative rounded-xl border border-border bg-black/[0.02] dark:bg-white/[0.02] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                <div aria-hidden="true" className="absolute top-2.5 start-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>
                <div aria-hidden="true" className="absolute top-2.5 end-3 text-[10px] font-mono text-zinc-400/30 select-none">+</div>

                <h2 className="text-xs font-mono uppercase tracking-widest text-[#D5360C] font-bold mb-2 flex items-center gap-2 tabular-nums">
                  <GitBranch className="h-4 w-4" />
                  {isArabic ? "10 — ما قد أغيره اليوم" : "10 — What I Would Revisit Today"}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-secondary">{caseStudy.wouldRevisitToday}</p>
              </section>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-border/60 flex items-center justify-between">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {isArabic ? "كل الأعمال المعمارية" : "All Architecture Work"}
            </Link>

            <Link
              to={`/projects/${nextCaseStudy.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              {isArabic ? `التالي: ${nextCaseStudy.title}` : `Next: ${nextCaseStudy.title}`}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
