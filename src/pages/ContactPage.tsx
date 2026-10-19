import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";
import { ArrowUpRight, ChevronDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { searchFocusedFaqs } from "@/data/faqData";

export default function ContactPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const seo = getLocalizedPageSeo("contact", locale);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = ["Name: " + form.name, "Email: " + form.email, "", form.message].join("\n");
    window.location.href =
      "mailto:hello@sanukhan.dev?subject=" +
      encodeURIComponent("Direct Project Inquiry — sanukhan.dev") +
      "&body=" +
      encodeURIComponent(body);
    setSubmitted(true);
  };

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

      <main className="min-h-screen bg-background text-foreground pt-20">
        {/* Top Header Banner matching video frame 01:37 */}
        <section className="border-b border-border/80 py-16 sm:py-24 bg-background">
          <div className="sk-shell space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground uppercase">
              <span>Sanu Khan ®</span>
              <span>©2026 [Scroll to Explore]</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-primary">
              {isAr ? "تواصل معي" : "CONTACT ME"}
            </h1>
          </div>
        </section>

        {/* Info Grid (Video frame 01:38): Get In Touch, Address, Hours */}
        <section className="border-b border-border/80 py-14 bg-secondary/15">
          <div className="sk-shell">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Box 1: Get in touch */}
              <div className="border border-border bg-background p-8 space-y-4">
                <span className="font-mono text-xs uppercase text-accent font-semibold block">
                  {isAr ? "جاهز للبدء؟" : "READY TO START?"}
                </span>
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-primary">
                  {isAr ? "لنتحدث مباشرة" : "GET IN TOUCH"}
                </h2>
                <a
                  href="mailto:hello@sanukhan.dev"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-accent hover:underline pt-2"
                >
                  <span>{isAr ? "احجز استشارة معمارية" : "BOOK AN ARCHITECTURE CALL"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* Box 2: Address */}
              <div className="border border-border bg-background p-8 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{isAr ? "الموقع الجغرافي" : "Address"}</span>
                </div>
                <p className="text-lg font-bold text-primary font-sans">
                  Dubai Silicon Oasis &amp; Downtown
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  Dubai, United Arab Emirates
                </p>
              </div>

              {/* Box 3: Open Hours & Contact */}
              <div className="border border-border bg-background p-8 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{isAr ? "أوقات التوفر" : "Open Hours"}</span>
                </div>
                <p className="text-lg font-bold text-primary font-sans">
                  DAILY: 09:00 AM – 06:00 PM GST
                </p>
                <div className="pt-2 flex flex-col gap-1 font-mono text-xs text-secondary">
                  <span>hello@sanukhan.dev</span>
                  <span>+971 (Direct Advisory by Request)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dark Contact Form (Video frame 01:40) */}
        <section className="py-20 sm:py-28 bg-[#101010] text-white">
          <div className="sk-shell max-w-4xl space-y-12">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D5360C] font-semibold block">
                {isAr ? "[ إرسال استفسار ]" : "[ DIRECT INQUIRY ]"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                SANU <span className="text-[#D5360C]">®</span> ARCHITECTURE ADVISORY
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/60 uppercase block mb-2">
                    @FIRST NAME *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full h-12 bg-white/5 border border-white/20 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>
                <div>
                  <label className="text-white/60 uppercase block mb-2">
                    @EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full h-12 bg-white/5 border border-white/20 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 uppercase block mb-2">
                  @MESSAGE &amp; PROJECT CONTEXT *
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={isAr ? "نطاق المشروع، الأنظمة المستهدفة، الجدول الزمني..." : "Describe the system scope, constraints, and timeline..."}
                  className="w-full bg-white/5 border border-white/20 p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D5360C]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-[#D5360C] text-white px-8 py-4 text-xs font-mono uppercase font-bold tracking-wider hover:bg-[#B52D09] transition-colors shadow-lg"
              >
                <span>{isAr ? "إرسال الاستفسار الآن" : "SUBMIT NOW"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              {submitted && (
                <p className="text-xs text-accent pt-2">
                  {isAr ? "يتم الآن فتح تطبيق البريد الخاص بك مع تفاصيل الاستفسار." : "Opening your email client with the message pre-filled."}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="sk-shell max-w-4xl space-y-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-primary">
              {isAr ? "الأسئلة المتكررة" : "FREQUENT QUESTIONS"}
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {searchFocusedFaqs.slice(0, 4).map((item) => (
                <details key={item.id} className="py-4 group cursor-pointer">
                  <summary className="flex items-center justify-between text-base font-bold uppercase tracking-tight text-primary list-none">
                    <span>{isAr ? item.question.ar : item.question.en}</span>
                    <ChevronDown className="h-4 w-4 text-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm text-secondary leading-relaxed">
                    {isAr ? item.answer.ar : item.answer.en}
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
