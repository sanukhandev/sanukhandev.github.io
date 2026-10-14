import { type FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Boxes, ChevronDown, Cloud, Code2, CircuitBoard, Download, GitBranch, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandIdentity } from "@/components/BrandIdentity";
import { BrushRevealPortrait } from "@/components/ui/BrushRevealPortrait";
import { MatrixScrambleWord } from "@/components/ui/MatrixScrambleWord";
import { ZaakiyBrain } from "@/components/ui/ZaakiyBrain";
import { useDevToArticles } from "@/hooks/use-devto-articles";
import { useLocale } from "@/hooks/use-locale";
import { useSiteContent } from "@/data/siteContent";
import { getLocalizedCaseStudy } from "@/data/caseStudies";

const join = (isArabic: boolean, en: string, ar: string) => (isArabic ? ar : en);
const HERO_MATRIX_WORDS_EN = ["clarity", "structure", "resilience", "reliability"];
const HERO_MATRIX_WORDS_AR = ["الوضوح", "البنية", "المرونة", "الموثوقية"];

function DevToCover({ coverImage, title, index }: { coverImage: string | null; title: string; index: number }) {
  const [failed, setFailed] = useState(false);
  if (coverImage?.startsWith("https://") && !failed) {
    return <img src={coverImage} alt={title} loading="lazy" referrerPolicy="no-referrer" className="sk-journal__cover" onError={() => setFailed(true)} />;
  }
  return <div className="sk-journal__fallback" aria-label={title}><span className="sk-mono">NOTE / 0{index + 1}</span><strong>{title}</strong></div>;
}

function SectionHeading({ eyebrow, title, intro, isArabic }: { eyebrow: string; title: string; intro?: string; isArabic: boolean }) {
  return <header className="sk-section-heading"><p className="sk-eyebrow"><span aria-hidden="true">/</span>{eyebrow}</p><h2>{title}</h2>{intro && <p className="sk-section-heading__intro">{intro}</p>}<span className="sk-heading-rule" aria-hidden="true" /><span className="sr-only">{isArabic ? "قسم من الصفحة الرئيسية" : "Homepage section"}</span></header>;
}

export function ReferenceHero() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const reducedMotion = useReducedMotion();
  const enter = (delay: number, y = 18) => ({ initial: reducedMotion ? false : { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.62, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } });

  return <section id="home" className="sk-hero" aria-labelledby="sk-hero-title"><div className="sk-shell sk-hero__grid">
    <div className="sk-hero__intro"><motion.p className="sk-eyebrow" {...enter(0.02)}><span aria-hidden="true">01</span>{join(ar, "INTRODUCTION", "مقدمة")}</motion.p><motion.h1 id="sk-hero-title" {...enter(0.14)}><span className="sk-hero__word">{join(ar, "Engineering", "أهندس")}</span><br /><span className="sk-hero__matrix-line"><MatrixScrambleWord words={ar ? HERO_MATRIX_WORDS_AR : HERO_MATRIX_WORDS_EN} isArabic={ar} interval={3400} className="sk-hero__matrix-word" /></span><br />{join(ar, "into complex", "في الأنظمة")}<br /><span>{join(ar, "systems.", "المعقدة.")}</span></motion.h1><motion.p className="sk-hero__lead" {...enter(0.28)}>{join(ar, "I connect business problems, architecture and delivery across enterprise systems, integrations and cloud platforms.", "أربط بين مشكلات الأعمال والعمارة والتنفيذ عبر الأنظمة المؤسسية والتكاملات والمنصات السحابية.")}</motion.p><motion.div className="sk-hero__actions" {...enter(0.38)}><a className="sk-button sk-button--accent" href="#work">{join(ar, "View selected work", "استعرض الأعمال المختارة")} <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" /></a><a className="sk-text-link" href="mailto:hello@sanukhan.dev">{join(ar, "Start a conversation", "ابدأ محادثة")} <ArrowUpRight size={17} aria-hidden="true" /></a></motion.div><motion.a className="sk-hero__resume" href="/Sanu%20Khan%20-%20Resume.pdf" download {...enter(0.44)}><Download size={14} aria-hidden="true" /> {join(ar, "Download résumé", "تحميل السيرة الذاتية")}</motion.a><motion.p className="sk-script-note" {...enter(0.48)}>{join(ar, "Make the invisible legible.", "اجعل ما لا يُرى واضحاً.")}</motion.p></div>
    <motion.figure className="sk-hero__portrait" {...enter(0.18, 26)}><BrushRevealPortrait alt={join(ar, "Portrait of Sanu Khan wearing a beige blazer", "صورة سانو خان بسترة بيج")} ariaLabel={join(ar, "Portrait. Move your pointer to reveal the original colors, or focus to reveal the full-color image.", "صورة. حرّك المؤشر لإظهار الألوان الأصلية أو استخدم التركيز لإظهار الصورة الملونة.")} /></motion.figure>
    <motion.aside className="sk-hero__identity" aria-label={join(ar, "Professional identity", "الهوية المهنية")} {...enter(0.25)}><div className="sk-hero__identity-block"><span className="sk-eyebrow"><span aria-hidden="true">/</span>{join(ar, "POSITION", "المجال")}</span><h2>{join(ar, "Tech Lead · Solution Architect", "قائد تقني · معماري حلول")}</h2><p>{join(ar, "Architecture-to-delivery ownership for systems that have to work in the real world.", "ملكية كاملة من العمارة إلى التنفيذ لأنظمة يجب أن تعمل في الواقع.")}</p></div><dl className="sk-hero__facts"><div><dt>{join(ar, "BASED IN", "الموقع")}</dt><dd><MapPin size={15} aria-hidden="true" /> Dubai, UAE</dd></div><div><dt>{join(ar, "FOCUS", "التركيز")}</dt><dd>{join(ar, "Integration · Platforms · Reliability", "التكامل · المنصات · الموثوقية")}</dd></div><div><dt>{join(ar, "SIGNATURE RESEARCH", "البحث المميز")}</dt><dd>ZaakiyV3RSE</dd></div></dl></motion.aside>
  </div></section>;
}

export function ReferenceProof() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { profile } = useSiteContent();
  return <section className="sk-proof" aria-label={join(ar, "Selected impact", "أثر مختار")}><div className="sk-shell sk-proof__layout"><div className="sk-proof__intro"><p className="sk-eyebrow"><span aria-hidden="true">02</span>{join(ar, "SELECTED IMPACT", "أثر مختار")}</p><p>{join(ar, "Verified signals from the work behind the systems.", "مؤشرات موثقة من العمل خلف هذه الأنظمة.")}</p></div><div className="sk-proof__metrics">{profile.impactMetrics.map((metric) => <div className="sk-proof__metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="sk-proof__platforms"><span className="sk-mono">ECOSYSTEMS</span><span>Azure</span><span>AWS</span><span>Kubernetes</span><span>Kafka</span><span>ERP / PIM</span><span>Power Platform</span></div></div></section>;
}

export function ReferenceServices() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const capabilities = [["01", join(ar, "Enterprise Architecture & Governance", "العمارة المؤسسية والحوكمة"), join(ar, "Make system boundaries, ownership and trade-offs explicit before complexity becomes operational risk.", "تحديد حدود الأنظمة وملكيتها ومفاضلاتها قبل أن يتحول التعقيد إلى مخاطرة تشغيلية.")], ["02", join(ar, "Cloud & Platform Strategy", "استراتيجية السحابة والمنصات"), join(ar, "Choose an operating model that balances reliability, scale, cost and the team's ability to own it.", "اختيار نموذج تشغيل يوازن بين الموثوقية والتوسع والتكلفة وقدرة الفريق على امتلاكه.")], ["03", join(ar, "Systems Integration & Modernization", "تكامل الأنظمة والتحديث"), join(ar, "Connect enterprise systems around explicit contracts, data ownership and recoverable workflows.", "ربط الأنظمة المؤسسية بعقود واضحة وملكية بيانات ومسارات قابلة للتعافي.")], ["04", join(ar, "Technical Leadership & Delivery", "القيادة التقنية والتنفيذ"), join(ar, "Align teams and delivery decisions with observable production behavior and a practical path forward.", "مواءمة الفرق وقرارات التنفيذ مع سلوك إنتاج قابل للرصد ومسار عملي إلى الأمام.")]];
  return <section id="architecture" className="sk-section sk-capabilities"><span id="services" className="sk-anchor" aria-hidden="true" /><div className="sk-shell"><SectionHeading isArabic={ar} eyebrow={join(ar, "WHAT I SOLVE", "ما أتعامل معه")} title={join(ar, "Where architecture meets execution.", "حيث تلتقي العمارة بالتنفيذ.")} intro={join(ar, "The discipline is not choosing more technology. It is creating a system the business and the engineering team can understand, operate and evolve.", "الممارسة ليست اختيار المزيد من التقنيات، بل بناء نظام يمكن للأعمال والفريق الهندسي فهمه وتشغيله وتطويره.")} /><div className="sk-capabilities__list">{capabilities.map(([number, title, description]) => <article className="sk-capability" key={number}><span className="sk-capability__number sk-mono">{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="sk-capability__arrow" size={20} aria-hidden="true" /></article>)}</div><div className="sk-system-line" aria-hidden="true"><span>CONTEXT</span><i /><span>ARCHITECTURE</span><i /><span>DELIVERY</span><i /><span>OUTCOMES</span></div></div></section>;
}

export function ReferenceExpertise() { return null; }

export function ReferenceProjects() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const ids = ["enterprise-retail-integration", "airline-retailing-aggregation", "automotive-omnichannel-platform", "real-estate-erp-architecture", "zaakiy-v3rse"];
  const projects = ids.map((slug) => getLocalizedCaseStudy(slug, locale)).filter(Boolean);
  const visuals = ["/media/project-retail-cover.webp", "/media/project-airline-cover.webp", "/media/project-automotive-cover.webp", "/media/project-erp-cover.webp", "/media/project-zaakiy-cover.webp"];
  return <section id="work" className="sk-section sk-work"><div className="sk-shell"><SectionHeading isArabic={ar} eyebrow={join(ar, "SELECTED WORK", "أعمال مختارة")} title={join(ar, "Systems I've helped shape.", "أنظمة ساهمت في تشكيلها.")} intro={join(ar, "Case studies grounded in integration challenges, operating constraints and architectural decisions.", "دراسات حالة تستند إلى تحديات التكامل والقيود التشغيلية والقرارات المعمارية.")} /><div className="sk-work__grid">{projects.map((project, index) => { const isFeatured = index === 0; const isCompact = index > 2; return <Link to={`/projects/${project.slug}`} key={project.slug} className={`sk-project ${isFeatured ? "sk-project--featured" : ""} ${isCompact ? "sk-project--compact" : "sk-project--supporting"}`}><div className="sk-project__media"><img src={visuals[index]} alt={join(ar, `Conceptual architecture visual for ${project.title}`, `تصور معماري لـ ${project.title}`)} loading={isFeatured ? "eager" : "lazy"} width={960} height={640} /><span className="sk-project__index sk-mono">0{index + 1}</span></div><div className="sk-project__copy"><span className="sk-mono">{project.domain}</span><h3>{project.title}</h3><p>{project.subtitle}</p><span className="sk-text-link">{join(ar, "Read case study", "اقرأ دراسة الحالة")} <ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>; })}</div><div className="sk-section__footer"><Link to="/projects" className="sk-text-link">{join(ar, "View all architecture work", "عرض جميع الأعمال المعمارية")} <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" /></Link></div></div></section>;
}

export function ReferenceWriting() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const { articles } = useSiteContent();
  const { data: devToArticles } = useDevToArticles(20);
  const posts = devToArticles?.length ? devToArticles.slice(0, 3).map((post) => ({ title: post.title, excerpt: post.description, category: post.tags[0] || "Engineering", localPath: post.localPath, coverImage: post.coverImage })) : articles.slice(0, 3).map((post) => ({ ...post, coverImage: null as string | null }));
  return <section id="writing" className="sk-section sk-journal"><div className="sk-shell"><SectionHeading isArabic={ar} eyebrow={join(ar, "ENGINEERING JOURNAL", "الملاحظات الهندسية")} title={join(ar, "Notes from the architecture desk.", "ملاحظات من مكتب العمارة.")} intro={join(ar, "Field notes on architecture, technical trade-offs and operating real systems.", "ملاحظات عملية حول العمارة والمفاضلات التقنية وتشغيل الأنظمة الحقيقية.")} /><div className="sk-journal__grid">{posts.map((post, index) => <article className={`sk-journal__item ${index === 0 ? "sk-journal__item--featured" : ""}`} key={post.localPath || post.title}><Link to={post.localPath} aria-label={post.title}><DevToCover coverImage={post.coverImage} title={post.title} index={index} /></Link><div className="sk-journal__copy"><span className="sk-mono">{post.category} / 0{index + 1}</span><h3><Link to={post.localPath}>{post.title}</Link></h3><p>{post.excerpt}</p><Link to={post.localPath} className="sk-text-link">{join(ar, "Read article", "اقرأ المقال")} <ArrowUpRight size={16} aria-hidden="true" /></Link></div></article>)}</div><div className="sk-section__footer"><Link to="/blog" className="sk-text-link">{join(ar, "Browse all notes", "تصفح جميع الملاحظات")} <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" /></Link></div></div></section>;
}

export function ReferenceZaakiy() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return <section id="zaakiy" className="sk-zaakiy"><div className="sk-shell sk-zaakiy__grid"><div className="sk-zaakiy__copy"><p className="sk-eyebrow"><span aria-hidden="true">05</span>{join(ar, "SIGNATURE RESEARCH / OPERATIONS INTELLIGENCE", "البحث المميز / الذكاء التشغيلي")}</p><div className="brand-zaakiy sk-zaakiy__wordmark">ZaakiyV3RSE</div><h2>{join(ar, "Beyond uptime. Toward outcome intelligence.", "ما بعد الجاهزية. نحو ذكاء النتائج.")}</h2><p>{join(ar, "ZaakiyV3RSE explores how systems can connect technical signals to operational context and reason about whether a workflow delivered its intended outcome.", "يستكشف ZaakiyV3RSE كيف يمكن للأنظمة ربط الإشارات التقنية بالسياق التشغيلي والتفكير في تحقق النتيجة المقصودة من سير العمل.")}</p><Link to="/projects/zaakiy-v3rse" className="sk-button sk-button--light">{join(ar, "Explore the research", "استكشف البحث")} <ArrowUpRight size={17} aria-hidden="true" /></Link></div><figure className="sk-zaakiy__visual"><ZaakiyBrain locale={locale} /><figcaption className="sk-mono">{join(ar, "CONCEPTUAL VISUAL / NOT A LIVE SYSTEM", "تصور مفاهيمي / ليس نظاماً حياً")}</figcaption></figure></div></section>;
}

export function ReferenceEngagement() { return null; }

export function ReferenceProcess() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const steps = [[join(ar, "Understand", "افهم"), join(ar, "Start with the business problem and operating constraints.", "ابدأ بمشكلة العمل والقيود التشغيلية.")], [join(ar, "Architect", "صمّم"), join(ar, "Map boundaries, dependencies, ownership and failure paths.", "ارسم الحدود والتبعيات والملكية ومسارات الفشل.")], [join(ar, "Align", "وائم"), join(ar, "Make trade-offs legible to decision-makers and delivery teams.", "اجعل المفاضلات واضحة لصنّاع القرار وفرق التنفيذ.")], [join(ar, "Deliver", "نفّذ"), join(ar, "Build, integrate and validate the smallest useful path.", "ابنِ وادمج وتحقق من أصغر مسار مفيد.")], [join(ar, "Evolve", "طوّر"), join(ar, "Observe production behavior and improve what matters.", "راقب سلوك الإنتاج وطوّر ما يحقق القيمة.")]];
  const icons = [<Boxes />, <GitBranch />, <CircuitBoard />, <Code2 />, <Cloud />];
  return <section id="process" className="sk-section sk-process"><div className="sk-shell"><SectionHeading isArabic={ar} eyebrow={join(ar, "APPROACH & LEADERSHIP", "المنهجية والقيادة")} title={join(ar, "From complexity to a workable plan.", "من التعقيد إلى خطة قابلة للتنفيذ.")} intro={join(ar, "A clear sequence keeps architecture connected to the work of delivering and operating a real system.", "تُبقي الخطوات الواضحة العمارة متصلة بعمل تنفيذ وتشغيل النظام الحقيقي.")} /><ol className="sk-process__timeline">{steps.map(([title, description], index) => <li key={title}><span className="sk-process__number sk-mono">0{index + 1}</span><span className="sk-process__icon" aria-hidden="true">{icons[index]}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></section>;
}

export function ReferenceAbout() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return <section id="about" className="sk-section sk-about"><div className="sk-shell sk-about__grid"><div className="sk-about__portrait"><img src="/hero-avatar-cutout.avif" alt={join(ar, "Portrait of Sanu Khan", "صورة سانو خان")} width={400} height={400} loading="lazy" /></div><div className="sk-about__copy"><p className="sk-eyebrow"><span aria-hidden="true">07</span>{join(ar, "PERSONAL PERSPECTIVE", "رؤية شخصية")}</p><BrandIdentity compact /><blockquote>{join(ar, "“Good systems aren't just built. They're understood, operated and evolved.”", "«الأنظمة الجيدة لا تُبنى فقط، بل تُفهم وتُشغّل وتتطور.»")}</blockquote><p>{join(ar, "I started closer to infrastructure than application architecture. That shaped how I work today: look at software from the outside in, understand what it depends on, what can fail and how each decision affects the whole.", "بدأت بالقرب من البنية التحتية أكثر من عمارة التطبيقات. شكّل ذلك منهجي اليوم: النظر إلى البرمجيات من الخارج إلى الداخل وفهم تبعياتها ومواطن فشلها وتأثير كل قرار على المنظومة.")}</p><Link to="/about" className="sk-text-link">{join(ar, "More about my work", "المزيد عن عملي")} <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div></section>;
}

export function ReferenceFaq() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const faqs = [[join(ar, "What services does Sanu Khan provide?", "ما الخدمات التي يقدمها سانو خان؟"), join(ar, "Architecture consulting, full-stack engineering, API integrations and cloud modernization for enterprise-grade platforms.", "استشارات هندسة الحلول وتطوير البرمجيات وتكامل الواجهات البرمجية وتحديث الأنظمة السحابية للمنصات المؤسسية.")], [join(ar, "Do you work with UAE and remote teams?", "هل تعمل مع فرق في الإمارات وعن بُعد؟"), join(ar, "Yes. Work can span discovery, architecture, delivery and optimization with teams in the UAE and globally.", "نعم. يمكن أن يشمل العمل الاستكشاف والعمارة والتنفيذ والتحسين مع فرق في الإمارات وحول العالم.")], [join(ar, "How can I start a conversation?", "كيف أبدأ محادثة؟"), join(ar, "Use the contact section below or email hello@sanukhan.dev with your context, scope and timeline.", "استخدم قسم التواصل أدناه أو أرسل رسالة إلى hello@sanukhan.dev تتضمن السياق والنطاق والجدول الزمني.")]];
  return <section id="faq" className="sk-section sk-faq"><div className="sk-shell"><SectionHeading isArabic={ar} eyebrow="FAQ" title={join(ar, "A few useful answers.", "بعض الإجابات المفيدة.")} /><div className="sk-faq__list">{faqs.map(([question, answer], index) => <details key={question}><summary><span className="sk-mono">0{index + 1}</span>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>;
}

export function ReferenceContact() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const send = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const body = ["Name: " + form.name, "Email: " + form.email, "", form.message].join("\n"); window.location.href = "mailto:hello@sanukhan.dev?subject=" + encodeURIComponent("Project inquiry from sanukhan.dev") + "&body=" + encodeURIComponent(body); };
  return <section id="contact" className="sk-contact"><div className="sk-shell sk-contact__grid"><div className="sk-contact__intro"><p className="sk-eyebrow"><span aria-hidden="true">08</span>{join(ar, "CONTACT / NEXT STEP", "التواصل / الخطوة التالية")}</p><h2>{join(ar, "Have a complex system to untangle?", "هل لديك نظام معقّد يحتاج إلى حل؟")}</h2><p>{join(ar, "Bring the context, constraints and the decision in front of you. We can start with clarity before commitment.", "شارك السياق والقيود والقرار الذي تواجهه. يمكننا البدء بالوضوح قبل الالتزام.")}</p><div className="sk-contact__paths"><div><span className="sk-mono">01 / REVIEW</span><strong>{join(ar, "Architecture & technical review", "مراجعة العمارة والتقنيات")}</strong></div><div><span className="sk-mono">02 / DELIVERY</span><strong>{join(ar, "Platform & integration delivery", "تطوير المنصات والتكامل")}</strong></div></div></div><form onSubmit={send} className="sk-contact__form"><label>{join(ar, "Name", "الاسم")}<input name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={join(ar, "Your name", "اسمك")} /></label><label>{join(ar, "Email", "البريد الإلكتروني")}<input name="email" type="email" autoComplete="email" required maxLength={240} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label><label>{join(ar, "Project details", "تفاصيل المشروع")}<textarea name="message" rows={5} required maxLength={5000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={join(ar, "Scope, timeline and context...", "النطاق والجدول الزمني والسياق...")} /></label><button className="sk-button sk-button--accent" type="submit">{join(ar, "Compose inquiry email", "إعداد رسالة الاستفسار")} <ArrowUpRight size={17} aria-hidden="true" /></button><small>{join(ar, "Opens your email app. Nothing is submitted to a server.", "يُفتح تطبيق البريد الإلكتروني. لا يتم إرسال شيء إلى خادم.")}</small></form></div></section>;
}

export function ReferenceFooter() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  return <footer className="sk-footer"><div className="sk-shell sk-footer__grid"><div><a href="#home" aria-label="Sanu Khan home"><BrandIdentity /></a><p>{join(ar, "Tech Lead · Solution Architect | Dubai, UAE", "قائد تقني · معماري حلول | دبي، الإمارات")}</p></div><nav aria-label={join(ar, "Footer navigation", "روابط التذييل")}><a href="#architecture">{join(ar, "Capabilities", "القدرات")}</a><a href="#work">{join(ar, "Work", "الأعمال")}</a><a href="#writing">{join(ar, "Notes", "الملاحظات")}</a><a href="#about">{join(ar, "About", "عني")}</a></nav><div className="sk-footer__links"><a href="https://github.com/sanukhandev" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a><a href="https://www.linkedin.com/in/sanukhandev/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a><a href="mailto:hello@sanukhan.dev"><Mail size={14} aria-hidden="true" /> Email</a></div></div><div className="sk-shell sk-footer__bottom"><span>© {new Date().getFullYear()} Sanu Khan.</span><span><MapPin size={12} aria-hidden="true" /> Dubai, UAE</span></div></footer>;
}
