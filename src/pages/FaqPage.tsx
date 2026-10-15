import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { getLocalizedPageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema, buildFaqSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { searchFocusedFaqs } from "@/data/faqData";

export default function FaqPage() {
  const { locale } = useLocale();
  const isArabic = locale === "ar";
  const seo = getLocalizedPageSeo("faq", locale);

  const faqSchema = buildFaqSchema(
    searchFocusedFaqs.map((item) => ({
      q: isArabic ? item.question.ar : item.question.en,
      a: isArabic ? item.answer.ar : item.answer.en,
    })),
  );

  const faqBreadcrumb = buildBreadcrumbListSchema([
    { name: isArabic ? "الرئيسية" : "Home", path: "/" },
    { name: isArabic ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
  ]);

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        schema={[faqSchema, faqBreadcrumb]}
        keywords={
          isArabic
            ? [
                "أسئلة شائعة سانو خان",
                "عمارة حلول المؤسسات دبي",
                "استشارات تقنية الإمارات",
                "تصميم الأنظمة وقابلية التوسع",
                "هندسة واجهات البرمجة",
                "التحديث السحابي",
              ]
            : [
                "sanu khan faq",
                "solution architecture faq",
                "technical leadership consulting",
                "system scalability architecture",
                "contract first api design",
                "enterprise cloud modernization",
                "dubai software engineer faq",
              ]
        }
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-28 pb-20 text-foreground">
        <section className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-b border-foreground/10 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {isArabic ? "٠٢ / الأسئلة والاستفسارات" : "02 / Questions & Advisory"}
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {isArabic ? "الأسئلة التقنية الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              {isArabic
                ? "إجابات متعمقة حول عمارة الحلول، القيادة التقنية، تصميم الأنظمة عالية التوسع، واستشارات المنصات المؤسسية."
                : "In-depth insights into enterprise solution architecture, technical leadership, high-throughput scalability, and advisory services."}
            </p>
          </div>

          <div className="mt-10 divide-y divide-foreground/15 border-y border-foreground/15">
            {searchFocusedFaqs.map((faq, idx) => (
              <article key={faq.id} className="py-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-foreground/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-accent uppercase">
                    {isArabic ? faq.category.ar : faq.category.en}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                  {isArabic ? faq.question.ar : faq.question.en}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
                  {isArabic ? faq.answer.ar : faq.answer.en}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-foreground/10 pt-8 text-sm">
            <Link className="font-medium text-accent hover:underline" to="/">
              {isArabic ? "← العودة إلى الصفحة الرئيسية" : "← Back to Portfolio"}
            </Link>
            <span className="text-foreground/30">•</span>
            <Link
              className="font-medium text-foreground/70 hover:text-foreground hover:underline"
              to="/blog"
            >
              {isArabic ? "استكشف المقالات التقنية" : "Explore Technical Writeups"}
            </Link>
            <span className="text-foreground/30">•</span>
            <Link
              className="font-medium text-foreground/70 hover:text-foreground hover:underline"
              to="/contact"
            >
              {isArabic ? "تواصل معي" : "Get in Touch"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
