import { memo } from "react";
import { Mail, Phone, MapPin, Clock, Linkedin, Github, ExternalLink, Sparkles, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ContactSection from "@/components/sections/ContactSection";
import SeoMeta from "@/components/SeoMeta";
import { GlassCard } from "@/components/ui/glass-card";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export function ContactPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("contact", locale);

  const contactChannels = [
    {
      icon: Mail,
      label: ar ? "البريد الإلكتروني المباشر" : "DIRECT EMAIL",
      value: "hello@sanukhan.dev",
      href: "mailto:hello@sanukhan.dev",
      note: ar ? "استفسارات المشاريع، الاستشارات، والفرص الهندسية" : "Project enquiries, technical advisory & architecture",
      action: ar ? "إرسال بريد ↗" : "Send Email ↗",
      primary: true,
    },
    {
      icon: Phone,
      label: ar ? "الاتصال المباشر" : "DIRECT CALL",
      value: "+971 56 386 0850",
      href: "tel:+971563860850",
      note: ar ? "مكالمات مهنية مباشرة خلال ساعات العمل في الإمارات (GST)" : "Direct telephone inquiries during UAE business hours (GST)",
      action: ar ? "اتصال مباشر ↗" : "Call Direct ↗",
      primary: false,
    },
    {
      icon: MapPin,
      label: ar ? "الموقع الجغرافي" : "LOCATION & BASE",
      value: ar ? "دبي، الإمارات العربية المتحدة" : "Dubai, United Arab Emirates",
      href: "https://maps.google.com/?q=Dubai,+United+Arab+Emirates",
      note: ar ? "حضورياً في الإمارات والخليج · وعن بُعد عالمياً" : "On-site across UAE & GCC · Remote worldwide",
      action: ar ? "عرض الموقع ↗" : "View Region ↗",
      primary: false,
    },
    {
      icon: Clock,
      label: ar ? "نموذج التعاون" : "COLLABORATION MODEL",
      value: ar ? "عن بُعد وحضورياً" : "Remote & On-Site",
      href: "#enquiry-form",
      note: ar ? "استشارات معمارية، قيادة تقنية، ومراجعات تصميم الأنظمة" : "Architecture advisory, technical leadership & system reviews",
      action: ar ? "استعراض التفاصيل ↗" : "Explore Scope ↗",
      primary: false,
    },
  ];

  const socialChannels = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "/in/sanukhandev",
      url: "https://www.linkedin.com/in/sanukhandev/",
      description: ar ? "المسار المهني، الإنجازات وشبكة الأعمال" : "Career updates, leadership notes & professional network",
    },
    {
      icon: Github,
      name: "GitHub",
      handle: "@sanukhandev",
      url: "https://github.com/sanukhandev",
      description: ar ? "المستودعات البرمجية المفتوحة والأدوات" : "Open source systems, reference architectures & tools",
    },
    {
      icon: ExternalLink,
      name: "DEV.to",
      handle: "@sanukhandev",
      url: "https://dev.to/sanukhandev",
      description: ar ? "المقالات الهندسية المتعمقة وتجارب الإنتاج" : "Production case studies, architecture deep-dives & tutorials",
    },
  ];

  const faqs = [
    {
      q: ar ? "ما هي الخدمات الهندسية والمعمارية التي تقدمها؟" : "What architecture & engineering services do you provide?",
      a: ar
        ? "أقود تصميم المنصات الموزعة، وهندسة تكامل النظم المؤسسية (SAP, ERP, POS)، وتدفق الأحداث عالي الكثافة عبر Kafka، والاستشارات السحابية على Azure و AWS، والقيادة التقنية للفرق."
        : "I lead distributed systems design, enterprise integration architecture (SAP, ERP, POS), peak event streaming with Kafka, cloud migrations on Azure/AWS, and technical leadership for delivery teams.",
    },
    {
      q: ar ? "كيف تبدأ مرحلة التعاون واستكشاف المشروع؟" : "How does an engagement typically start?",
      a: ar
        ? "نبدأ بجلسة استكشافية لفهم المتطلبات والأهداف والقيود الفنية، يليها تحليل أولي وتوصية معمارية واضحة ومسار تسليم محدد المراحل."
        : "Engagements start with a technical discovery call to review constraints, scale requirements, and business goals, followed by an architectural roadmap and staged milestones.",
    },
    {
      q: ar ? "هل تقدم استشارات حضورية داخل دولة الإمارات؟" : "Are you available for on-site consulting in Dubai & GCC?",
      a: ar
        ? "نعم، أقيم في دبي ومتاح للاجتماعات المعمارية الحضورية وورش العمل التقنية داخل دولة الإمارات ودول مجلس التعاون الخليجي، بالإضافة إلى العمل عن بعد عالمياً."
        : "Yes, I am based in Dubai and available for on-site architecture workshops, steering sessions, and delivery syncs across the UAE & GCC, alongside remote global collaboration.",
    },
    {
      q: ar ? "هل تتاح خيارات الاستشارات الجزئية أو القيادة التقنية المؤقتة (Fractional Lead)؟" : "Do you offer fractional CTO / technical advisory engagements?",
      a: ar
        ? "نعم، أعمل مع الشركات كمستشار معماري جزئي أو قائد تقني للمبادرات الاستراتيجية المعقدة وعمليات إعادة بناء النظم القديمة."
        : "Yes, I work with select organizations on a fractional architecture advisory or technical leadership basis for high-stakes migrations, system rewrites, and platform modernization.",
    },
  ];

  return (
    <div className="editorial-content min-h-screen bg-[#FAF8F5] dark:bg-[#09090B] text-[#141413] dark:text-[#FAFAFA] transition-colors">
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        schema={[
          buildContactPageSchema(),
          buildBreadcrumbListSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "التواصل" : "Contact", path: "/contact" },
          ]),
        ]}
      />

      <Navbar />

      <main id="main-content" className="pt-24 sm:pt-28 lg:pt-32">
        {/* Dedicated Contact Header */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD]">
              {ar ? "سانو خان // قنوات التواصل المباشر" : "SANU KHAN // DIRECT ENGAGEMENT"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#141413] dark:text-white leading-[0.98]">
            {ar ? (
              <>
                تواصل <span className="text-[#D5360C]">معي.</span>
              </>
            ) : (
              <>
                GET IN <span className="text-[#D5360C]">TOUCH.</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-3xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            {ar
              ? "متاح لاستشارات عمارة الحلول، قيادة المنصات السحابية الموزعة، ومراجعات تكامل الأنظمة المؤسسية. اختر القناة الأنسب لبدء محادثتنا الهندسية."
              : "Available for enterprise solution architecture, high-throughput distributed platform leadership, and critical system integration advisory across Dubai, GCC & global markets."}
          </p>
        </header>

        {/* Primary Contact Channels Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <GlassCard
                  key={channel.label}
                  variant={channel.primary ? "dark" : "light"}
                  className={`relative p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    channel.primary
                      ? "bg-gradient-to-br from-[#141417] to-[#201511] text-white border-white/15 shadow-xl"
                      : "border-black/[0.08] dark:border-white/10 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          channel.primary
                            ? "bg-[#D5360C] text-white"
                            : "bg-black/[0.04] dark:bg-white/[0.06] text-[#D5360C]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                        {channel.label}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-bold tracking-tight mb-2 font-mono break-words">
                      {channel.value}
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        channel.primary ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {channel.note}
                    </p>
                  </div>

                  <a
                    href={channel.href}
                    className={`mt-6 inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                      channel.primary
                        ? "!text-[#E6D5BD] hover:!text-white"
                        : "text-[#AD2A09] dark:text-[#E6D5BD] hover:underline"
                    }`}
                  >
                    <span>{channel.action}</span>
                  </a>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Professional Profiles / Ecosystem */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD] block mb-1">
              {ar ? "الملفات المهنية والشبكات" : "PROFESSIONAL FOOTPRINT"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141413] dark:text-white">
              {ar ? "منصات العمل والتوثيق المفتوح" : "PUBLIC VERIFICATION & CODE"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialChannels.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-[#D5360C] transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-5 h-5 text-[#D5360C]" />
                      <span className="font-bold text-sm text-[#141413] dark:text-white">{soc.name}</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-[#AD2A09] dark:group-hover:text-[#E6D5BD] transition-colors">
                      {soc.handle} ↗
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {soc.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* 09 / GET IN TOUCH Unified Form & Narrative Section */}
        <ContactSection id="enquiry-form" />

        {/* Engagement FAQs Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AD2A09] dark:text-[#E6D5BD] block mb-1">
                {ar ? "الأسئلة الشائعة" : "ENGAGEMENT FAQ"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#141413] dark:text-white">
                {ar ? "تفاصيل بدء التعاون" : "COMMISSIONING & COLLABORATION"}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {ar
                  ? "إجابات مباشرة حول أسلوب العمل المعماري، النطاق الزمني، ونماذج الشراكة الهندسية."
                  : "Direct answers regarding architecture advisory scope, working models, and timeline commitments."}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {faqs.map((faq, idx) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-black/[0.08] dark:border-white/10 bg-white/40 dark:bg-zinc-900/30 p-4 sm:p-5 transition-colors open:bg-white/80 dark:open:bg-zinc-900/60"
                >
                  <summary className="cursor-pointer font-bold text-sm sm:text-base text-[#141413] dark:text-white flex items-center justify-between list-none">
                    <span>
                      <span className="text-[#AD2A09] dark:text-[#E6D5BD] font-mono text-xs me-2">0{idx + 1}.</span>
                      {faq.q}
                    </span>
                    <span className="text-[#AD2A09] dark:text-[#E6D5BD] font-mono text-base transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal ps-6">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Unified Editorial Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default memo(ContactPage);
