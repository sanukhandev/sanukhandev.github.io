import { memo, useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export function ContactPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("contact", locale);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = `${form.firstName} ${form.lastName}`.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${form.email}\n\nProject details:\n${form.message}`
    );
    window.location.href = `mailto:hello@sanukhan.dev?subject=${subject}&body=${body}`;
  };

  return (
    <div className="editorial-content min-h-screen">
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

      <main id="main-content">
        <header className="intro shell">
          <div className="eyebrow">SANU KHAN ®</div>
          <div className="overline">
            <h1>
              {ar ? "تواصل " : "CONTACT "}
              <span style={{ color: "#f04913" }}>{ar ? "معي." : "ME."}</span>
            </h1>
            <div className="crumb">
              ©2026 [{ar ? "مرر للاستكشاف" : "Scroll to explore"}]
              <br />
              {ar ? "تواصل / محادثة" : "CONTACT / CONVERSATION"}
            </div>
          </div>
        </header>

        <section className="section shell" style={{ paddingTop: "15px" }}>
          <div className="two" style={{ alignItems: "start" }}>
            <div>
              <div className="labelrow">
                <span className="spark">✳</span>
                <span className="eyebrow">{ar ? "جاهز للتواصل؟" : "READY TO CONNECT?"}</span>
              </div>
              <h2 className="section-heading">
                {ar ? (
                  <>
                    لنبقَ على
                    <br />
                    تواصل.
                  </>
                ) : (
                  <>
                    GET IN
                    <br />
                    TOUCH.
                  </>
                )}
              </h2>
              <p className="lead" style={{ maxWidth: "420px", margin: "24px 0" }}>
                {ar
                  ? "تحدٍ في تصميم النظم، أو منصة تحتاج للبناء، أو فريق يحتاج لقيادة تقنية؟ لنبدأ محادثة مثمرة."
                  : "An architecture challenge, a platform to build or a team to lead? Start a conversation."}
              </p>
              <a className="button" href="mailto:hello@sanukhan.dev">
                {ar ? "راسل سانو" : "EMAIL SANU"} <span className="arrow">↗</span>
              </a>
            </div>

            <div className="contact-cards">
              <div className="info-card">
                <span className="cap">{ar ? "المقر" : "BASED IN"}</span>
                <strong>
                  {ar ? (
                    <>
                      دبي،
                      <br />
                      الإمارات العربية المتحدة
                    </>
                  ) : (
                    <>
                      DUBAI,
                      <br />
                      UNITED ARAB EMIRATES
                    </>
                  )}
                </strong>
              </div>
              <div className="info-card">
                <span className="cap">{ar ? "أسلوب التعاون" : "COLLABORATION"}</span>
                <strong>
                  {ar ? (
                    <>
                      عن بُعد
                      <br />
                      وحضورياً
                    </>
                  ) : (
                    <>
                      REMOTE
                      <br />
                      &amp; ON-SITE
                    </>
                  )}
                </strong>
              </div>
              <div className="info-card">
                <span className="cap">{ar ? "الهاتف" : "PHONE"}</span>
                <strong dir="ltr">+971 56 386 0850</strong>
              </div>
              <div className="info-card">
                <span className="cap">{ar ? "البريد الإلكتروني" : "EMAIL"}</span>
                <strong>hello@sanukhan.dev</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark-zone">
          <div className="shell">
            <div className="labelrow">
              <span className="spark">✳</span>
              <span className="eyebrow">{ar ? "استفسارات المشاريع" : "PROJECT ENQUIRIES"}</span>
            </div>
            <div className="two">
              <h2 className="section-heading">
                {ar ? (
                  <>
                    لنتحدث عن
                    <br />
                    نظامك <span className="light-orange">القادم.</span>
                  </>
                ) : (
                  <>
                    LET’S TALK
                    <br />
                    ABOUT YOUR
                    <br />
                    <span className="light-orange">NEXT SYSTEM.</span>
                  </>
                )}
              </h2>
              <p className="lead" style={{ maxWidth: "480px", color: "#ccc", alignSelf: "end" }}>
                {ar
                  ? "شارك متطلبات مشروعك، وتحدياتك التقنية، أو فكرة التعاون. وسيفتح النموذج رسالة مباشرة إلى البريد الرسمي."
                  : "Share your requirements, technical challenges, or collaboration idea. Use the verified contact email for a real enquiry."}
              </p>
            </div>

            <form
              aria-label="Contact enquiry"
              className="form-dark"
              onSubmit={handleSubmit}
              style={{ marginTop: "50px" }}
            >
              <div className="two">
                <div>
                  <label htmlFor="contact-firstName">{ar ? "01 / الاسم الأول" : "01 / FIRST NAME"}</label>
                  <input
                    id="contact-firstName"
                    name="firstName"
                    placeholder="Jane"
                    required
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-lastName">{ar ? "02 / اسم العائلة" : "02 / LAST NAME"}</label>
                  <input
                    id="contact-lastName"
                    name="lastName"
                    placeholder="Smith"
                    required
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>

              <label htmlFor="contact-email">{ar ? "03 / البريد المهني" : "03 / WORK EMAIL"}</label>
              <input
                id="contact-email"
                name="email"
                placeholder="jane@company.com"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <label htmlFor="contact-message">{ar ? "04 / تفاصيل المشروع" : "04 / PROJECT CONTEXT"}</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={ar ? "ما الذي تقوم ببنائه أو تطويره؟" : "What are you building or improving?"}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <button className="button" type="submit">
                {ar ? "بدء المحادثة" : "START A CONVERSATION"} <span className="arrow">↗</span>
              </button>

              <p className="tiny" style={{ color: "#aaa", marginTop: "12px" }}>
                {ar
                  ? "يفتح إرسال النموذج برنامج البريد الإلكتروني المثبت لديك. لا يتم تخزين أي بيانات شخصية على هذا الموقع."
                  : "Submission opens your configured email client. No personal data is stored on this site."}
              </p>
            </form>
          </div>
        </section>

        <section className="section shell">
          <div className="qa">
            <div>
              <div className="labelrow">
                <span className="spark">✳</span>
                <span className="eyebrow">FAQ</span>
              </div>
              <h2 className="section-heading">
                {ar ? (
                  <>
                    الأسئلة
                    <br />
                    الشائعة
                  </>
                ) : (
                  <>
                    FREQUENT
                    <br />
                    QUESTIONS
                  </>
                )}
              </h2>
            </div>
            <div>
              <details className="faqrow faq-details">
                <summary>01. {ar ? "ما الذي يمكنك مساعدة فريقنا في تسليمه؟" : "What can you help our team deliver?"}</summary>
                <p>
                  {ar
                    ? "أعمل مع الفرق على عمارة الحلول، المنصات المتكاملة، تكاملات المؤسسات، الأتمتة بالذكاء الاصطناعي، والقيادة التقنية."
                    : "I work with teams on solution architecture, full-stack platforms, enterprise integrations, AI-assisted automation, and technical leadership."}
                </p>
              </details>
              <details className="faqrow faq-details">
                <summary>02. {ar ? "هل تتعاون مع فرق المنتجات الحالية؟" : "Do you collaborate with existing product teams?"}</summary>
                <p>
                  {ar
                    ? "نعم. أتكامل مع فرق المنتج والهندسة والأعمال الحالية، موائماً القرارات مع نتائج التسليم والقيود التشغيلية."
                    : "Yes. I integrate with existing product, engineering and business teams, aligning decisions with delivery outcomes and operational constraints."}
                </p>
              </details>
              <details className="faqrow faq-details">
                <summary>03. {ar ? "ما هي الأنظمة والمنصات التي تعمل معها؟" : "Which systems and platforms do you work with?"}</summary>
                <p>
                  {ar
                    ? "توثق محفظتي العمل مع Azure و AWS و Kafka و Node.js و React و Java و SAP و PIM وتكاملات API و Kubernetes."
                    : "The repository documents work with Azure, AWS, Kafka, Node.js, React, Java, SAP, PIM, API integration and Kubernetes."}
                </p>
              </details>
              <details className="faqrow faq-details">
                <summary>04. {ar ? "هل يمكنك المساعدة في تحديث منصة قائمة؟" : "Can you help modernize an existing platform?"}</summary>
                <p>
                  {ar
                    ? "نعم. يمكنني تقييم التبعيات القديمة واقتراح تحديث تدريجي مدعوم بمراحل انتقال خاضعة للمراقبة."
                    : "Yes. I can assess legacy dependencies and recommend incremental modernization backed by observable migration milestones."}
                </p>
              </details>
              <details className="faqrow faq-details">
                <summary>05. {ar ? "هل تعمل عن بُعد وعبر المناطق؟" : "Do you work remotely and across regions?"}</summary>
                <p>
                  {ar
                    ? "نعم. توثق محفظتي تسليم مشاريع في تسعة أسواق، من دبي ومع فرق عمل موزعة عالمياً."
                    : "Yes. My portfolio documents delivery across nine markets, from Dubai and with distributed teams."}
                </p>
              </details>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default memo(ContactPage);
