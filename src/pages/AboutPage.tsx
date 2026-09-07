import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { ArrowRight, Download, FileText } from "lucide-react";

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

  return (
    <>
      <SeoMeta
        title={isArabic ? "نبذة عن سانو خان — معماري حلول ومهندس منصات" : "About Sanu Khan — Solution Architect & Platform Engineer"}
        description={isArabic ? "الخلفية الشخصية، التطور المهني، والقيم التقنية لسانو خان — معماري حلول يمتلك 13+ عاماً في تصميم أنظمة المؤسسات." : "Personal background, career progression, and technical values of Sanu Khan — Solution Architect with 13+ years designing enterprise systems."}
        canonicalPath={seo.canonicalPath}
        kind="profile"
        keywords={[
          "About Sanu Khan",
          "Solution Architect Dubai",
          "Platform Engineering Lead",
          "Enterprise Systems Architect"
        ]}
        schema={buildBreadcrumbListSchema([
          { name: isArabic ? "الرئيسية" : "Home", path: "/" },
          { name: isArabic ? "نبذة عني" : "About", path: "/about" }
        ])}
      />

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 text-foreground">
        <article className="container-narrow max-w-4xl space-y-12">
          {/* Header */}
          <header className="border-b border-border/60 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-semibold mb-3">
              <span>{isArabic ? "نبذة عني ومسيرتي المهنية" : "About & Career Reflection"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
              {isArabic ? "سانو خان" : "Sanu Khan"}
            </h1>
            <p className="mt-3 text-lg text-secondary font-medium">
              {isArabic ? "معماري حلول · قائد هندسة المنصات · دبي، الإمارات" : "Solution Architect · Platform Engineering Lead · Dubai, UAE"}
            </p>
          </header>

          {/* 1. Personal Introduction */}
          <section className="space-y-4 text-base text-secondary leading-relaxed font-normal">
            <h2 className="text-xl font-bold text-primary mb-2">
              {isArabic ? "النظر إلى البرمجيات من الخارج إلى الداخل" : "Looking at software from the outside in"}
            </h2>
            <p>
              {isArabic
                ? "بدأت بالقرب من البنية التحتية أكثر من عمارة التطبيقات. العمل مع الشبكات والأنظمة أعطاني عادة لم أفقدها أبداً: أميل إلى النظر إلى البرمجيات من الخارج إلى الداخل."
                : "I started closer to infrastructure than application architecture. Working with networks and systems gave me a habit I've never really lost: I tend to look at software from the outside in."}
            </p>
            <div className="rounded-xl border border-border bg-secondary/20 p-5 font-mono text-xs sm:text-sm text-primary space-y-1.5">
              <div className="text-accent font-bold mb-2">
                {isArabic ? "// الأسئلة التي أبدأ بها:" : "// The questions I start with:"}
              </div>
              <div>• {isArabic ? "على ماذا يعتمد هذا النظام؟" : "What does it depend on?"}</div>
              <div>• {isArabic ? "ما الذي يعتمد عليه؟" : "What depends on it?"}</div>
              <div>• {isArabic ? "من يمتلك البيانات؟" : "Who owns the data?"}</div>
              <div>• {isArabic ? "ماذا يحدث عند حدوث عطل؟" : "What happens when something fails?"}</div>
              <div>• {isArabic ? "كيف يعرف المشغل أن العملية نجحت بالفعل؟" : "How does someone know the process actually worked?"}</div>
            </div>
            <p>
              {isArabic
                ? "هذا التفكير رافقني عبر هندسة التطبيقات وتجزئة الطيران وتجارة المؤسسات ومنصات السيارات وبيئات التكامل الضخمة. اليوم يقع معظم عملي بين عمارة الحلول وهندسة المنصات والقيادة التقنية."
                : "That thinking followed me through application engineering, airline retailing, enterprise commerce, automotive platforms and large integration environments. Today most of my work sits somewhere between solution architecture, platform engineering and technical leadership."}
            </p>
          </section>

          {/* 2. Career Progression */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-primary">
              {isArabic ? "التطور المهني" : "Career Progression"}
            </h2>
            <div className="space-y-4 divide-y divide-border/60">
              {careerMilestones.map((m) => (
                <div key={m.title} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                  <span className="text-xs font-mono font-bold text-accent shrink-0 sm:w-28">
                    {m.era}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-primary">{m.title}</h3>
                    <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-1">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Technical Principles */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-primary">
              {isArabic ? "ما أهتم به تقنياً" : "What I care about technically"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-secondary/20 p-5">
                <h3 className="text-sm font-bold text-primary mb-1">
                  {isArabic ? "ملكية بيانات واضحة" : "Clear Data Ownership"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isArabic
                    ? "مصدر واحد للحقيقة. إذا ادعى نظامان السلطة على الكيان نفسه دون قواعد مزامنة صريحة، فإن تلف البيانات أمر حتمي."
                    : "Single sources of truth. If two systems claim authority over the same entity without explicit synchronization rules, data corruption is inevitable."}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/20 p-5">
                <h3 className="text-sm font-bold text-primary mb-1">
                  {isArabic ? "أنماط أعطال صريحة" : "Explicit Failure Modes"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isArabic
                    ? "التصميم لأوقات انتهاء مهلة APIs أو تراكم الطوابير. التشغيل المتدهور أفضل بكثير من الانهيار المتتالي."
                    : "Designing for when APIs time out, queues back up, or endpoints return malformed payloads. Degraded operation beats cascading collapse."}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/20 p-5">
                <h3 className="text-sm font-bold text-primary mb-1">
                  {isArabic ? "العقود أولاً لـ APIs" : "Contract-First APIs"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isArabic
                    ? "عقود مخططات صارمة عند الحدود حتى يتمكن المستهلكون والمزودون من التطور بشكل مستقل دون كسر التكاملات."
                    : "Strict schema contracts at boundaries so consumers and producers can evolve independently without breaking integrations."}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/20 p-5">
                <h3 className="text-sm font-bold text-primary mb-1">
                  {isArabic ? "القابلية للتشغيل والقياس" : "Operability & Telemetry"}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {isArabic
                    ? "يجب على الأنظمة شرح حالتها للمشغلين. السجلات والتتبع ولوحات القياس يجب أن تعكس نجاح عمليات الأعمال، وليس فقط رموز HTTP."
                    : "Systems must explain their state to operators. Logging, tracing, and metric dashboards should reflect business process success, not just HTTP codes."}
                </p>
              </div>
            </div>
          </section>

          {/* 4. Problems Enjoyed */}
          <section className="space-y-3 border-t border-border/60 pt-8">
            <h2 className="text-xl font-bold text-primary">
              {isArabic ? "نوع المشكلات التي أستمتع بحلها" : "What kind of problems I enjoy"}
            </h2>
            <p className="text-sm sm:text-base text-secondary leading-relaxed">
              {isArabic
                ? "أكون أكثر فاعلية عند فك تشابك تكاملات الأنظمة القديمة المعقدة، أو إنشاء حدود معمارية واضحة لتوسيع المنصات، أو مساعدة الفرق الهندسية على التحول من تسليم الميزات إلى تفكير المنصات."
                : "I'm most effective when untangling complex legacy integrations, establishing clear architecture boundaries for scaling platforms, or helping engineering teams shift from feature delivery to platform thinking."}
            </p>
          </section>

          {/* 5. Resume Download CTA */}
          <section className="rounded-xl border border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-primary">
                {isArabic ? "السيرة الذاتية التفصيلية" : "Detailed Resume"}
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                {isArabic
                  ? "تحميل نظرة عامة كاملة عن المناصب المهنية والأنظمة المسلمة والقدرات التقنية."
                  : "Download a complete overview of professional positions, delivered systems, and technical capabilities."}
              </p>
            </div>

            <a
              href="/Sanu Khan - Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-accent/90 shrink-0"
            >
              <Download className="h-4 w-4" />
              {isArabic ? "تحميل السيرة الذاتية (PDF)" : "Download Resume (PDF)"}
            </a>
          </section>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6 pt-4 border-t border-border/60 text-xs font-mono">
            <Link to="/projects" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "أعمال معمارية مختارة" : "Selected Architecture Work"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
            <Link to="/blog" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "ملاحظات هندسية" : "Engineering Notes"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
            <Link to="/contact" className="text-accent hover:underline flex items-center gap-1">
              {isArabic ? "التواصل" : "Contact"} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
            </Link>
          </nav>
        </article>
      </main>

      <Footer />
    </>
  );
}
