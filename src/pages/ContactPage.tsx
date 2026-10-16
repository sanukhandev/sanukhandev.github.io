import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/schema";

import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export default function ContactPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const seo = getLocalizedPageSeo("contact", locale);

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={[
          buildContactPageSchema(),
          buildBreadcrumbListSchema([
            { name: isAr ? "الرئيسية" : "Home", path: "/" },
            { name: isAr ? "التواصل" : "Contact", path: "/contact" },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-28 pb-20 text-foreground">
        <section className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-b border-foreground/10 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              {isAr ? "٠٣ / التواصل" : "03 / Contact"}
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {isAr ? "لنتحدث عن مشروعك" : "Let's Build Something Resilient"}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              {isAr
                ? "متاح للاستشارات المعمارية، تكامل واجهات برمجة التطبيقات، وتطوير منصات المؤسسات."
                : "Available for enterprise architecture consulting, mission-critical API platforms, and full-stack technical leadership."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="border border-foreground/15 bg-background p-6 sm:p-8">
              <span className="font-mono text-xs text-foreground/40">{isAr ? "البريد الإلكتروني" : "DIRECT EMAIL"}</span>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                hello@sanukhan.dev
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {isAr
                  ? "أرسل تفاصيل نطاق المشروع والجدول الزمني وسأرد خلال 24 ساعة."
                  : "Send your project scope, timeline, and architectural requirements. Response within 24 hours."}
              </p>
              <a
                href="mailto:hello@sanukhan.dev?subject=Project%20Inquiry%20from%20sanukhan.dev"
                className="mt-6 inline-flex rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-95"
              >
                {isAr ? "إرسال رسالة" : "Send Email"}
              </a>
            </article>

            <article className="border border-foreground/15 bg-background p-6 sm:p-8">
              <span className="font-mono text-xs text-foreground/40">{isAr ? "الموقع والتوفر" : "LOCATION & AVAILABILITY"}</span>
              <h2 className="mt-2 text-2xl font-bold text-foreground">
                {isAr ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {isAr
                  ? "التعاقد متاح محلياً في دبي وعالمياً عبر العمل عن بُعد مع فرق تقنية رائدة."
                  : "Engagements available on-site in UAE and remotely worldwide across architectural advisory, design reviews, and hands-on delivery."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-foreground/60">
                <span className="border border-foreground/15 px-2.5 py-1">Timezone: GST (UTC+4)</span>
                <span className="border border-foreground/15 px-2.5 py-1">Consulting & Full-Stack</span>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
