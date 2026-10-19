import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildProfilePageSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { ArrowRight, Award, ChevronDown, Download, Sparkles, Terminal } from "lucide-react";
import { searchFocusedFaqs } from "@/data/faqData";

export default function AboutPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("about", locale);

  const careerMilestones = isArabic
    ? [
        {
          era: "2010 – 2016",
          title: "هندسة الشبكات والأنظمة",
          detail: "إدارة البنية التحتية الفيزيائية وخوادم Linux والتوجيه وموثوقية الشبكة. بناء رؤية من الخارج إلى الداخل لموثوقية البرمجيات."
        },
        {
          era: "2016 – 2020",
          title: "هندسة التطبيقات والبحث والتطوير",
          detail: "تطوير تطبيقات الويب الكاملة وأدوات الوسائط اللحظية وتطبيقات Android وحلول أتمتة المؤسسات الداخلية."
        },
        {
          era: "2021",
          title: "تقنيات السفر ومنصات التجميع",
          detail: "بناء محولات تكامل NDC لشركات الطيران وسير عمل الحجز ومحركات توزيع السفر B2B تحت قيود التوافر العالي."
        },
        {
          era: "2022 – حتى الآن",
          title: "عمارة الحلول والقيادة التقنية",
          detail: "تصميم تكاملات المؤسسات عبر SAP ERP و PIM ومتاجر التجارة ومنظومات OMS على المنصات السحابية."
        }
      ]
    : [
        {
          era: "2010 – 2016",
          title: "Network & Systems Engineering",
          detail: "Managed physical infrastructure, Linux servers, routing, and network reliability. Built an outside-in view of software reliability."
        },
        {
          era: "2016 – 2020",
          title: "Application & R&D Engineering",
          detail: "Developed full-stack web applications, real-time media tools, Android apps, and internal enterprise automation solutions."
        },
        {
          era: "2021",
          title: "Travel Tech & Aggregation Platforms",
          detail: "Built airline NDC integration adapters, booking sagas, and B2B travel distribution engines with high-availability constraints."
        },
        {
          era: "2022 – Present",
          title: "Solution Architecture & Technical Leadership",
          detail: "Architecting enterprise integrations across SAP ERP, PIM, commerce storefronts, and OMS ecosystems on cloud platforms."
        }
      ];

  const achievements = [
    {
      title: isArabic ? "قيادة تكاملات التجارة متعددة القنوات" : "Enterprise Omnichannel Architect",
      subtitle: isArabic ? "إنجاز معمارية" : "Architecture Milestone",
      year: "2023 - 2024",
      icon: <Award className="h-6 w-6 text-accent" />,
      desc: isArabic
        ? "تصميم مسارات المزامنة اللحظية للأسعار والكتالوج عبر علامات عالمية في 9 أسواق."
        : "Engineered real-time price & catalog sync pipelines across 9 global regional markets.",
    },
    {
      title: isArabic ? "مؤسس منصة ZaakiyV3RSE" : "Creator of ZaakiyV3RSE",
      subtitle: isArabic ? "بحث مميز" : "Signature Research",
      year: "2024 - 2026",
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      desc: isArabic
        ? "تصميم وتطوير منصة وكلاء الذكاء التشغيلي التي تجمع بين الحسابات الحتمية وRAG المؤسسي."
        : "Architected multi-tenant operational intelligence platform combining deterministic reasoning and enterprise RAG.",
    },
    {
      title: isArabic ? "محرك تجميع وتوزيع رحلات الطيران" : "Airline NDC Retailing Engine",
      subtitle: isArabic ? "هندسة النظم الموزعة" : "Distributed Systems",
      year: "2021 - 2022",
      icon: <Terminal className="h-6 w-6 text-accent" />,
      desc: isArabic
        ? "بناء محولات تكامل NDC لشركات الطيران مع التسامح التام مع تأخيرات استجابة الموردين."
        : "High-throughput NDC travel aggregation adapters with sub-second resilience under peak loads.",
    },
    {
      title: isArabic ? "الريادة السحابية والشهادات المهنية" : "Cloud Native & Microservices Mastery",
      subtitle: isArabic ? "اعتماد تقني" : "Cloud Leadership",
      year: "2020 - Present",
      icon: <Award className="h-6 w-6 text-accent" />,
      desc: isArabic
        ? "تنفيذ معمارية السحابة على Azure وAWS وKubernetes لخدمة ملايين المستخدمين والعمليات."
        : "Cloud-native architectures delivered on Azure, AWS & Kubernetes for millions of enterprise operations.",
    },
  ];

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        kind="profile"
        keywords={seo.keywords}
        schema={[
          buildProfilePageSchema({
            name: seo.title,
            description: seo.description,
            path: "/about",
          }),
          buildBreadcrumbListSchema([
            { name: isArabic ? "الرئيسية" : "Home", path: "/" },
            { name: isArabic ? "نبذة عني" : "About", path: "/about" }
          ]),
        ]}
      />

      <Navbar />

      <main className="min-h-screen bg-background text-foreground pt-20">
        {/* Top Video-Matching Hero Banner */}
        <section className="border-b border-border/80 py-16 sm:py-24 bg-background">
          <div className="sk-shell space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase">
              <span>Sanu Khan ®</span>
              <span>©2026 [Scroll to Explore]</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-primary">
                {isArabic ? "نبذة عن سانو خان" : "ABOUT SANU KHAN"}
              </h1>
              <p className="sk-script-note text-2xl sm:text-3xl text-accent block font-normal tracking-normal lowercase">
                {isArabic ? "حيث تلتقي العمارة الهندسية بدقة التنفيذ" : "where architecture meets execution."}
              </p>
            </div>
          </div>
        </section>

        {/* Horizontal Photo Reel (Video frame 00:41) */}
        <section className="py-6 border-b border-border/80 overflow-hidden bg-secondary/15">
          <div className="sk-shell">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-3/4 overflow-hidden border border-border bg-secondary/20">
                <img
                  src="/assets/images/sanu-khan-editorial-monochrome.webp"
                  alt={isArabic ? "صورة سانو خان السينمائية بالأبيض والأسود" : "Sanu Khan Editorial Monochrome Portrait"}
                  className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-3/4 overflow-hidden border border-border">
                <img
                  src="/media/architecture-capabilities.avif"
                  alt="Architecture Design"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-3/4 overflow-hidden border border-border">
                <img
                  src="/assets/images/sanu-workstation.webp"
                  alt="Engineering Workstation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-3/4 overflow-hidden border border-border">
                <img
                  src="/media/zaakiy-intelligence.avif"
                  alt="AI Intelligence Systems"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Belief Statement (Video frame 00:42) */}
        <section className="py-16 sm:py-24 border-b border-border/80">
          <div className="sk-shell space-y-10 max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
              {isArabic ? "[ الرؤية والمنهجية ]" : "[ CORE BELIEF ]"}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-primary leading-tight">
              {isArabic
                ? "عمارة برمجية تربط الرؤية الاستراتيجية بالواقع التشغيلي الموثوق."
                : "ARCHITECTURE THAT BRIDGES BUSINESS VISION AND OPERATIONAL REALITY."}
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              {isArabic
                ? "كل منصة مصممة للقضاء على نقاط الفشل المنفردة، ورفع الجاهزية إلى 99.99%، وتقديم أداء سريع الاستجابة يدعم العمليات التجارية الكبرى دون انقطاع."
                : "Every system is architected to eliminate failure cascades, maximize uptime, and deliver clean, scalable throughput that powers high-volume business operations."}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-accent block">
                  100+
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground mt-1 block">
                  {isArabic ? "أنظمة تم تسليمها" : "Successful Systems"}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary block">
                  13+
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground mt-1 block">
                  {isArabic ? "سنوات خبرة" : "Years Experience"}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-primary block">
                  9
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground mt-1 block">
                  {isArabic ? "أسواق عالمية" : "Global Markets"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section (Video frame 00:44 - 00:48) */}
        <section className="py-20 sm:py-28 bg-[#101010] text-white">
          <div className="sk-shell space-y-14">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D5360C] font-semibold block">
                {isArabic ? "[ الإنجازات والاعتمادات ]" : "[ HONORS & ACHIEVEMENTS ]"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                SANU <span className="text-[#D5360C]">®</span> ACHIEVEMENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="border border-white/15 bg-white/5 p-8 flex flex-col justify-between space-y-6 hover:border-[#D5360C] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>{item.icon}</div>
                    <span className="font-mono text-xs text-white/50">{item.year}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase text-[#D5360C] block font-semibold">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed pt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Progression Timeline */}
        <section className="py-20 sm:py-28 border-b border-border/80">
          <div className="sk-shell space-y-12 max-w-4xl">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block">
                {isArabic ? "[ المسيرة المهنية ]" : "[ CAREER PROGRESSION ]"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-primary">
                {isArabic ? "التطور المهني المستمر" : "PURPOSE-DRIVEN EXPERIENCES"}
              </h2>
            </div>

            <div className="space-y-6 divide-y divide-border">
              {careerMilestones.map((m) => (
                <div key={m.title} className="pt-6 first:pt-0 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                  <span className="text-xs font-mono font-bold text-accent shrink-0 sm:w-32">
                    {m.era}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-primary">{m.title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="/Sanu%20Khan%20-%20Resume.pdf"
                download
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-xs font-mono uppercase font-semibold text-primary hover:border-accent hover:text-accent transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>{isArabic ? "تحميل السيرة الذاتية (PDF)" : "Download Full Résumé (PDF)"}</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section on About page */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="sk-shell space-y-12 max-w-4xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-primary">
              {isArabic ? "أسئلة متكررة حول التعاون" : "FREQUENT QUESTIONS"}
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {searchFocusedFaqs.slice(0, 4).map((item) => (
                <details key={item.id} className="py-4 group cursor-pointer">
                  <summary className="flex items-center justify-between text-base font-bold uppercase tracking-tight text-primary list-none">
                    <span>{isArabic ? item.question.ar : item.question.en}</span>
                    <ChevronDown className="h-4 w-4 text-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm text-secondary leading-relaxed">
                    {isArabic ? item.answer.ar : item.answer.en}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
