import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/schema";

import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export default function ContactPage() {
  const { locale } = useLocale();
  const seo = getLocalizedPageSeo("contact", locale);

  return (
    <>
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={[
          "contact sanu khan",
          "architecture consulting contact",
          "technical strategy dubai",
        ]}
        schema={[
          buildContactPageSchema(),
          buildBreadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">Contact</h1>
          <p className="mt-4 max-w-3xl text-[15px] text-secondary">
            Reach out for architecture consulting, API integration programs,
            SaaS platform strategy, or enterprise engineering leadership.
          </p>

          <article className="premium-card mt-8 max-w-2xl p-6">
            <h2 className="text-[22px] font-bold text-primary">Work Inquiries</h2>
            <p className="mt-3 text-[15px] text-secondary">
              Email project scope, timeline, and business context to:
            </p>
            <a
              href="mailto:hello@sanukhan.dev?subject=Project%20Inquiry%20from%20sanukhan.dev"
              className="mt-4 inline-flex rounded-lg border border-accent px-4 py-2 text-[15px] font-semibold text-accent hover:bg-accent hover:text-on-accent"
            >
              hello@sanukhan.dev
            </a>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
