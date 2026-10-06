import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedCaseStudy, getLocalizedCaseStudies } from "@/data/caseStudies";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Cpu, GitBranch, Terminal } from "lucide-react";
import { buildBreadcrumbListSchema, buildCreativeWorkSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const isArabic = locale === "ar";

  const caseStudy = getLocalizedCaseStudy(slug || "", locale);
  const allCaseStudies = getLocalizedCaseStudies(locale);

  if (!caseStudy) {
    return <Navigate to="/projects" replace />;
  }

  const currentIndex = allCaseStudies.findIndex((cs) => cs.slug === slug);
  const nextCaseStudy = allCaseStudies[(currentIndex + 1) % allCaseStudies.length];

  return (
    <>
      <SeoMeta
        title={`${caseStudy.title} — ${isArabic ? "دراسة حالة" : "Case Study"} | Sanu Khan`}
        description={caseStudy.summary}
        canonicalPath={`/projects/${caseStudy.slug}`}
        kind="article"
        keywords={caseStudy.themes}
        schema={[
          buildBreadcrumbListSchema([
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "الأعمال" : "Projects", path: "/projects" },
            { name: caseStudy.title, path: `/projects/${caseStudy.slug}` },
          ]),
          buildCreativeWorkSchema({
            title: caseStudy.title,
            description: caseStudy.summary,
            path: `/projects/${caseStudy.slug}`,
            technologies: caseStudy.systemsInvolved,
          }),
        ]}
      />
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 text-foreground">
        <article className="container-narrow max-w-4xl">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            {isArabic ? "العودة إلى الأعمال المعمارية المختارة" : "Back to Selected Architecture Work"}
          </Link>

          {/* Header */}
          <header className="border-b border-border/60 pb-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono uppercase text-accent font-semibold mb-4">
              {caseStudy.domain}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
              {caseStudy.title}
            </h1>

            <p className="mt-4 text-lg text-secondary leading-relaxed font-medium">
              {caseStudy.subtitle}
            </p>

            {/* Architecture Themes */}
            <div className="mt-6 flex flex-wrap gap-2">
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

          {/* 10-Point Architectural Structure */}
          <div className="mt-12 space-y-12 text-secondary">
            {/* 01 — Context */}
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "01 — السياق" : "01 — Context"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-3">
                {isArabic ? "ماذا كان يحدث في الأعمال؟" : "What was happening in the business?"}
              </h3>
              <p className="text-base leading-relaxed">{caseStudy.context}</p>
            </section>

            {/* 02 — Problem */}
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "02 — المشكلة" : "02 — Problem"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-3">
                {isArabic ? "ما الذي جعل النظام صعباً؟" : "What made the system difficult?"}
              </h3>
              <p className="text-base leading-relaxed">{caseStudy.problem}</p>
            </section>

            {/* 03 — Constraints */}
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "03 — القيود" : "03 — Constraints"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-3">
                {isArabic ? "ما هي القيود التي شكلت العمارة؟" : "What constraints shaped the architecture?"}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {caseStudy.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <span className="font-mono text-xs text-accent font-bold mt-1">[{i + 1}]</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 04 — Architecture Diagram */}
            <section className="rounded-xl border border-border bg-secondary/30 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
                <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold flex items-center gap-2">
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
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "05 — القرارات المعمارية الرئيسية" : "05 — Key Decisions"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-4">
                {isArabic ? "ما هي القرارات المعمارية المؤثرة؟" : "What architectural decisions mattered?"}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {caseStudy.keyDecisions.map((kd, idx) => (
                  <div key={kd.title} className="rounded-lg border border-border/80 bg-background/60 p-4">
                    <h4 className="text-sm font-bold text-primary mb-1 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      {idx + 1}. {kd.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-secondary">{kd.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06 — Failure Model */}
            <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" />
                {isArabic ? "06 — نموذج التعامل مع الأعطال" : "06 — Failure Model"}
              </h2>
              <h3 className="text-lg font-bold text-primary mb-2">
                {isArabic ? "ماذا يحدث عند تعطل التبعيات؟" : "What happens when dependencies fail?"}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-secondary">{caseStudy.failureModel}</p>
            </section>

            {/* 07 — My Role */}
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "07 — دوري" : "07 — My Role"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-2">
                {isArabic ? "ما ساهمت به بدقة" : "Exactly what I contributed"}
              </h3>
              <p className="text-base leading-relaxed">{caseStudy.role}</p>
            </section>

            {/* 08 — Outcome */}
            <section className="border-l-2 border-accent/40 pl-6 rtl:pl-0 rtl:pr-6 py-1">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2">
                {isArabic ? "08 — النتائج" : "08 — Outcome"}
              </h2>
              <h3 className="text-xl font-bold text-primary mb-3">
                {isArabic ? "نتائج النظام المحققة" : "Verified System Outcomes"}
              </h3>
              <ul className="space-y-2">
                {caseStudy.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base">
                    <span className="text-accent font-bold">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 09 — What I Learned */}
            <section className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                {isArabic ? "09 — ما تعلمته" : "09 — What I Learned"}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed italic text-primary font-medium">
                "{caseStudy.lessons}"
              </p>
            </section>

            {/* 10 — What I Would Revisit Today */}
            <section className="rounded-xl border border-border bg-secondary/20 p-6">
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-2 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                {isArabic ? "10 — ما قد أغيره اليوم" : "10 — What I Would Revisit Today"}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-secondary">{caseStudy.wouldRevisitToday}</p>
            </section>
          </div>

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

