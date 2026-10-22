import { type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Layers, Bot, Workflow, Cpu } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";
import { useLocale } from "@/hooks/use-locale";
import { GlassCard, GlassBadge } from "@/components/ui/glass-card";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useSectionData } from "@/lib/i18n";

/* ──────────────────────────────────────────────────────────
   1. PROOF / MARQUEE TICKER: Refined Technical Strip
   ────────────────────────────────────────────────────────── */
export function ReferenceProof() {
  const proof = useSectionData("proof");
  const items = [...proof.roles, ...proof.roles, ...proof.roles];

  return (
    <div
      className="w-full overflow-hidden border-b border-black/[0.08] dark:border-white/10 bg-[#F7F7F5]/80 dark:bg-[#101010]/80 backdrop-blur-md py-4 sm:py-5"
      aria-label={proof.ariaLabel}
    >
      <div className="proof-ticker-track flex items-center whitespace-nowrap">
        {items.map((role, idx) => (
          <div key={idx} className="flex items-center gap-6 shrink-0 px-4">
            <span className="font-extrabold uppercase text-xs sm:text-[13.5px] tracking-wider text-[#101010] dark:text-[#f7f7f5]">
              {role}
            </span>
            <span className="text-[#D5360C] text-xs select-none">✳</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   3. ABOUT / IMPACT: Built for Impact
   ────────────────────────────────────────────────────────── */
export function ReferenceImpact() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const impact = useSectionData("impact");

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={impact.heading1}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#D5360C] text-sm">✳</span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
            {impact.eyebrow}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── Left Column (7 cols): Editorial Narrative ── */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {impact.heading1}
              <br />
              <span className="text-[#D5360C]">{impact.heading2}</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#2a2723] dark:text-zinc-300 leading-relaxed font-normal">
              <p>{impact.bio1}</p>
              <p>{impact.bio2}</p>
              <p className="font-semibold text-[#101010] dark:text-white">
                {impact.bio3}
              </p>
            </div>

            {/* Core Capabilities Chips */}
            <div className="pt-4 border-t border-black/[0.08] dark:border-white/10">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                {impact.capabilitiesLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {impact.capabilities.map((cap) => (
                  <GlassBadge key={cap} variant="light">
                    {cap}
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
                  {ar ? "استكشف أعمالي" : "EXPLORE SELECTED WORK"}
                </span>
                <span className="text-[#D5360C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90">
                  ↗
                </span>
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider text-[#101010] dark:text-white hover:text-[#D5360C] transition-colors"
              >
                <span className="border-b-2 border-current pb-0.5">
                  {ar ? "لنتواصل معاً" : "LET'S CONNECT"}
                </span>
                <span className="text-[#D5360C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* ── Right Column (5 cols): Authentic Portrait & "How I Work" Glass Card ── */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <GlassCard variant="light" className="p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                <ResponsiveImage
                  alt={impact.portraitAlt}
                  src="/assets/images/sanu-khan-editorial-monochrome.webp"
                  className="w-full h-full object-cover object-top filter grayscale contrast-[1.08] transition-transform duration-500 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs font-mono text-white/95 px-3 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                  <span>{impact.portraitLocation}</span>
                  <span className="text-[#E6D5BD]">{impact.portraitRole}</span>
                </div>
              </div>
            </GlassCard>

            {/* "How I Work" Glass Statement */}
            <GlassCard variant="light" className="p-5 sm:p-6">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#D5360C] mb-2">
                {ar ? "// فلسفة العمل" : "// HOW I WORK"}
              </div>
              <p className="text-xs sm:text-[13.5px] text-[#2a2723] dark:text-zinc-300 leading-relaxed font-normal">
                {ar
                  ? "أصمم الأنظمة بوضوح كافٍ للتطور، وبمتانة تضمن الثقة في أصعب ظروف الإنتاج. الاستراتيجية تصبح ذات معنى حقيقي فقط عندما تعمل بنجاح مع مستخدمين فعليين."
                  : "Clear architecture boundaries, pragmatic engineering standards, and direct cross-functional collaboration. Making technology deliver predictable business outcomes."}
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
  const servicesData = useSectionData("services");

  const serviceImages = [
    "/assets/architecture.jpg",
    "/assets/frontend.jpg",
    "/assets/integration.jpg",
    "/assets/automation.jpg",
  ];
  const serviceIcons = [Cpu, Layers, Workflow, Bot];

  return (
    <section
      id="services"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={servicesData.heading1}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {servicesData.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {servicesData.heading1}
              <br />
              <span className="text-[#D5360C]">{servicesData.heading2}</span>
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {servicesData.lead}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{ar ? "استكشف جميع الخدمات" : "VIEW ALL SERVICES"}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* 4 Distinct Glass Capability Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          {servicesData.items.map((item, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            const img = serviceImages[index % serviceImages.length];

            return (
              <GlassCard key={item.id} variant="light" className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/[0.06] dark:border-white/10">
                    <span className="text-xs font-mono font-bold text-[#D5360C] tracking-widest">
                      {item.num}
                    </span>
                    <Icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </div>

                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-5">
                    <ResponsiveImage
                      alt={item.title}
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#D5360C]">
                  <span>{ar ? "معايير إنتاجية معتمدة" : "ENTERPRISE-GRADE"}</span>
                  <span>↗</span>
                </div>
              </GlassCard>
            );
          })}
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
  const projectsData = useSectionData("projects");

  return (
    <section
      id="work"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={projectsData.heading1}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {projectsData.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {projectsData.heading1}
              <br />
              <span className="text-[#D5360C]">{projectsData.heading2}</span>
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {projectsData.lead}
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{projectsData.cta}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* Curated Primary Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
          {projectsData.items.map((proj) => (
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
                  <ResponsiveImage
                    alt={proj.title}
                    src={proj.image}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                  <span>{ar ? "عرض دراسة الحالة" : "View Case Study"}</span>
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
   6. APPROACH: 04 / Discovery to Production
   ────────────────────────────────────────────────────────── */
export function ReferenceProcess() {
  const processData = useSectionData("process");

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {processData.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {processData.heading1}
              <br />
              <span className="text-[#D5360C]">{processData.heading2}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {processData.lead}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {processData.steps.map((step) => (
            <GlassCard key={step.num} variant="light" className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#D5360C] block mb-3">
                  {step.tag}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#101010] dark:text-white mb-2">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {step.desc}
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
   7. BENTO / PROOF: Engineering Rigor & Scale
   ────────────────────────────────────────────────────────── */
export function ReferenceBento() {
  const bento = useSectionData("bento");

  return (
    <section className="relative w-full py-16 sm:py-20 bg-black/[0.02] dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard variant="light" className="p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {bento.badge}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#101010] dark:text-white">
              {bento.heading1} <span className="text-[#D5360C]">{bento.heading2}</span>
            </h3>
            <p className="max-w-xl text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              {bento.lead}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-s border-black/[0.08] dark:border-white/10 lg:ps-8">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">
                {bento.blocks.throughput.metric}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {bento.blocks.throughput.metricLabel}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">9</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {bento.blocks.footprint.title}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#D5360C]">99.9%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#101010] dark:text-white mt-1">
                {bento.blocks.production.title}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   8. TESTIMONIALS / LEADERSHIP: Technical Ownership
   ────────────────────────────────────────────────────────── */
export function ReferenceTestimonials() {
  const testimonials = useSectionData("testimonials");

  return (
    <section className="relative w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {testimonials.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {testimonials.heading1}
              <br />
              <span className="text-[#D5360C]">{testimonials.heading2}</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {testimonials.lead}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          {testimonials.quotes.map((quote, i) => (
            <GlassCard key={i} variant="light" className="p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#D5360C] block mb-3">
                  0{i + 1} // PRINCIPLE
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#101010] dark:text-white mb-2.5">
                  {quote.title}
                </h3>
                <p className="text-xs sm:text-[13.5px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {quote.text}
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
  const writing = useSectionData("writing");
  const articleImages = ["/assets/backend.jpg", "/assets/ai.jpg", "/assets/frontend.jpg"];

  return (
    <section
      id="writing"
      className="relative w-full py-20 sm:py-24 md:py-28"
      aria-label={writing.heading1}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {writing.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {writing.heading1}
              <br />
              <span className="text-[#D5360C]">{writing.heading2}</span>
            </h2>
          </div>
          <div className="max-w-md flex flex-col items-start gap-4">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {writing.lead}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
            >
              <span>{writing.viewAll}</span>
              <span>↗</span>
            </Link>
          </div>
        </header>

        {/* 3 Curated Light Glass Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {writing.articles.map((art, index) => {
            const articleUrl = `/blog/${art.slug}`;
            const img = articleImages[index % articleImages.length];

            return (
              <GlassCard key={art.slug} variant="light" className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06] dark:border-white/10">
                    <span className="text-[11px] font-mono font-bold text-[#D5360C] uppercase tracking-wider">
                      {art.tag}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      2026
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 mb-4">
                    <ResponsiveImage
                      alt={art.title}
                      src={img}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-[#101010] dark:text-white mb-2 leading-snug">
                    <Link to={articleUrl} className="hover:text-[#D5360C] transition-colors">
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-black/[0.06] dark:border-white/10">
                  <Link
                    to={articleUrl}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D5360C] hover:underline"
                  >
                    <span>{writing.readArticle}</span>
                    <span>↗</span>
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   10. SIGNATURE RESEARCH: Zaakiy V3RSE (Lamp Experience)
   ────────────────────────────────────────────────────────── */
export function ReferenceZaakiy() {
  const zaakiy = useSectionData("zaakiy");

  return (
    <section
      id="zaakiy"
      className="relative w-full"
      aria-label={zaakiy.badge}
    >
      <LampContainer
        colorVariant="orange"
        className="bg-[#0b0b0c] text-white pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
        contentClassName="max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Row 1: Full-width Centered Identity & Lamp-illuminated Headline */}
        <div className="w-full text-center flex flex-col items-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 backdrop-blur-md mb-4 sm:mb-5">
            <span className="text-[#D5360C] text-xs">✳</span>
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#E6D5BD]">
              {zaakiy.badge}
            </span>
          </div>

          <h2 className="bg-gradient-to-b from-white via-[#f7f7f5] to-[#c8c8c4] py-1 bg-clip-text text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent max-w-5xl leading-[1.06]">
            {zaakiy.heading}
          </h2>

          <div
            dir="ltr"
            className="inline-flex items-baseline justify-center gap-1 text-2xl sm:text-3xl md:text-4xl font-anta font-bold tracking-wider mt-4 sm:mt-5 select-none"
          >
            <span className="text-white">{zaakiy.wordmark.zaakiy}</span>
            <span className="text-[#EF470D] drop-shadow-[0_2px_14px_rgba(239,71,13,0.4)]">
              {zaakiy.wordmark.v3rse}
            </span>
          </div>
        </div>

        {/* Row 2: Split (Side 1: Text & Chips, Side 2: Observability Architecture Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
          {/* Side 1: Text */}
          <div className="flex flex-col items-start text-start">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D5360C] mb-4">
              <span>//</span>
              <span>{zaakiy.telemetryTag}</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-[#d4d4d0] leading-relaxed font-normal">
              {zaakiy.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-6">
              {zaakiy.chips.map((label) => (
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
                <span>{zaakiy.exploreCta}</span>
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
                  <span className="ms-2 text-xs tracking-wider text-zinc-300 inline-flex items-center font-anta font-bold" dir="ltr">
                    <span className="text-white">{zaakiy.wordmark.zaakiy}</span>
                    <span className="text-[#EF470D]">{zaakiy.wordmark.v3rse}</span>
                    <span className="text-zinc-500 mx-1.5 font-mono font-normal">//</span>
                    <span className="text-[11px] font-mono font-normal uppercase text-zinc-400">
                      {zaakiy.hud.title}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D5360C] animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {zaakiy.hud.telemetryStatus}
                  </span>
                </div>
              </div>

              {/* Image with Controlled Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <ResponsiveImage
                  alt="ZaakiyV3RSE Observability and Intelligence Dashboard"
                  src="/assets/observability.jpg"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Conceptual Demonstration Overlay Badge */}
                <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded border border-white/10">
                  <span className="text-zinc-300">{zaakiy.hud.orchestrationBadge}</span>
                  <span className="text-[#D5360C] font-bold">{zaakiy.hud.prototypeBadge}</span>
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
   11. FAQ: 08 / Frequently Asked Questions
   ────────────────────────────────────────────────────────── */
export function ReferenceFaq() {
  const faq = useSectionData("faq");

  return (
    <section id="faq" className="relative w-full py-20 sm:py-24" aria-label={faq.heading1}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[#D5360C] text-sm">✳</span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
                {faq.badge}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05] text-[#101010] dark:text-white">
              {faq.heading1}
              <br />
              <span className="text-[#D5360C]">{faq.heading2}</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {faq.items.map((item, i) => (
              <GlassCard key={i} variant="light" className="p-5 sm:p-6">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-base sm:text-lg font-bold text-[#101010] dark:text-white list-none">
                    <span>
                      0{i + 1}. {item.q}
                    </span>
                    <span className="text-[#D5360C] font-mono text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-xs sm:text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
                    {item.a}
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
  const contact = useSectionData("contact");

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`${contact.emailSubjectPrefix} ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:hello@sanukhan.dev?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-24 md:py-28" aria-label={contact.heading1}>
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
                    {contact.boxTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                    {contact.boxSubtitle}
                  </h3>
                </div>

                <div>
                  <label htmlFor="quick-index-name" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.nameLabel}
                  </label>
                  <input
                    id="quick-index-name"
                    name="name"
                    placeholder={contact.namePlaceholder}
                    required
                    type="text"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor="quick-index-email" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.emailLabel}
                  </label>
                  <input
                    id="quick-index-email"
                    name="email"
                    placeholder={contact.emailPlaceholder}
                    required
                    type="email"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>

                <div>
                  <label htmlFor="quick-index-message" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    {contact.messageLabel}
                  </label>
                  <textarea
                    id="quick-index-message"
                    name="message"
                    rows={4}
                    placeholder={contact.messagePlaceholder}
                    required
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D5360C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-between rounded-lg bg-[#D5360C] px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:bg-[#AD2A09] transition-all"
                >
                  <span>{contact.submitButton}</span>
                  <span className="text-base rtl:rotate-180">↗</span>
                </button>
              </form>
            </div>

            {/* Narrative / Callout */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-[#D5360C] text-sm">✳</span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E6D5BD]">
                  {contact.badge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.02] text-white">
                {contact.heading1}
                <br />
                {contact.heading2}
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {contact.lead}
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
