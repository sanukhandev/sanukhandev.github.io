import { memo, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { buildBreadcrumbListSchema, buildProfilePageSchema } from "@/lib/schema";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedPageSeo } from "@/lib/seo";

export function AboutPage() {
  const { locale } = useLocale();
  const ar = locale === "ar";
  const seo = getLocalizedPageSeo("about", locale);

  const achievements = [
    {
      symbol: "⌘",
      title: ar ? "تكامل أنظمة تجارة التجزئة المؤسسية" : "ENTERPRISE RETAIL INTEGRATION",
      desc: ar
        ? "مزامنة البيانات بين أنظمة متعددة وتنسيق عمليات التجارة عبر الأسواق الإقليمية."
        : "Multi-system data synchronization and commerce orchestration across regional markets.",
    },
    {
      symbol: "◎",
      title: ar ? "منصات متعددة المستأجرين" : "MULTI-TENANT PLATFORM SYSTEMS",
      desc: ar
        ? "بنية سحابية أصلية تركز على عزل البيانات وسهولة النشر والاستقلالية التشغيلية."
        : "Cloud-native architecture emphasizing isolation and deployability.",
    },
    {
      symbol: "↗",
      title: ar ? "توزيع حجوزات ومحتوى الطيران B2B" : "AIRLINE B2B CONTENT & BOOKING",
      desc: ar
        ? "تكامل معايير NDC وبناء قنوات توزيع سفر عالية التوسع والتوافر."
        : "NDC-led integration and scalable travel distribution pipelines.",
    },
    {
      symbol: "✳",
      title: ar ? "مبادرة ZAAKIY V3RSE" : "ZAAKIY V3RSE INITIATIVE",
      desc: ar
        ? "الذكاء التشغيلي والأتمتة المتقدمة وتطوير أدوات هندسية مبتكرة."
        : "Operational intelligence, automation and product experimentation.",
    },
  ];

  const milestones = [
    {
      era: "2022 — PRESENT",
      title: ar ? "قائد تقني وخبير حلول" : "TECH LEAD & SOLUTION EXPERT",
      desc: ar
        ? "عمارة تجارة المؤسسات، وتدفق الأحداث، والتكاملات السحابية، والقيادة الهندسية للفرق."
        : "Enterprise commerce architecture, event streaming, integrations and technical leadership.",
    },
    {
      era: "2021 — 2022",
      title: ar ? "مهندس منصات وتطوير شامل" : "FULL STACK & PLATFORM ENGINEER",
      desc: ar
        ? "أنظمة ERP، وتجارب أسواق شركات الطيران، والأنظمة الخلفية عالية التحمل."
        : "ERP systems, airline marketplace experiences and resilient backends.",
    },
    {
      era: "2016 — 2020",
      title: ar ? "مهندس بحث وتطوير R&D" : "R&D ENGINEER",
      desc: ar
        ? "أدوات التعاون بالفيديو، وسير عمل المؤسسات، والتطبيقات الحديثة، والأتمتة."
        : "Video collaboration, enterprise workflows, applications and automation.",
    },
    {
      era: "2010 — PRESENT",
      title: ar ? "مستشار حلول مستقل" : "INDEPENDENT SOLUTION CONSULTANT",
      desc: ar
        ? "استشارات البرمجيات كخدمة SaaS، وأدوات الذكاء الاصطناعي، وتصميم المنصات، والاستشارات التقنية الشاملة."
        : "SaaS, AI tooling, platform design and full-stack technology consulting.",
    },
  ];

  const visions = [
    {
      title: ar ? "الأنظمة قبل الشاشات" : "SYSTEMS BEFORE SCREENS",
      desc: ar
        ? "فهم سير عمل الأعمال الشامل قبل الانشغال بتحسين الواجهات السطحية."
        : "Understand the end-to-end business workflow before optimizing an interface.",
    },
    {
      title: ar ? "المتانة من البداية" : "RESILIENCE BY DESIGN",
      desc: ar
        ? "التصميم تحسباً للأعطال، مع وضوح ملكية البيانات، والمراقبة المستمرة، وسهولة الصيانة."
        : "Design for failure, data ownership, monitoring and maintainability.",
    },
    {
      title: ar ? "الأشخاص يصنعون نجاح التقنية" : "PEOPLE MAKE TECHNOLOGY WORK",
      desc: ar
        ? "القيادة بالوضوح، وشرح المفاضلات الهندسية، وتمكين فرق العمل من التسليم بثقة."
        : "Lead with clarity, communicate trade-offs and enable delivery teams.",
    },
  ];

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`About Page Enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`);
    window.location.href = `mailto:hello@sanukhan.dev?subject=${subject}&body=${body}`;
  };

  return (
    <div className="editorial-content min-h-screen">
      <SeoMeta
        title={seo.title}
        description={seo.description}
        canonicalPath={seo.canonicalPath}
        keywords={seo.keywords}
        kind="profile"
        schema={[
          buildProfilePageSchema({
            name: seo.title,
            description: seo.description,
            path: "/about",
          }),
          buildBreadcrumbListSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "نبذة عني" : "About", path: "/about" },
          ]),
        ]}
      />

      <Navbar />

      <main id="main-content">
        <header className="intro shell">
          <div className="eyebrow">SANU KHAN ®</div>
          <div className="overline">
            <h1>
              {ar ? "نبذة " : "ABOUT "}
              <span style={{ color: "#f04913" }}>{ar ? "عني." : "ME."}</span>
            </h1>
            <div className="crumb">
              ©2026 [{ar ? "مرر للاستكشاف" : "Scroll to explore"}]
              <br />
              {ar ? "نبذة / المسيرة" : "ABOUT / STORY"}
            </div>
          </div>
        </header>

        <div className="photo-strip">
          <img alt="Architecture systems" decoding="async" loading="lazy" src="/assets/architecture.jpg" />
          <img alt="AI workflow automation" decoding="async" loading="lazy" src="/assets/ai.jpg" />
          <img alt="Commerce orchestration" decoding="async" loading="lazy" src="/assets/commerce.jpg" />
          <img alt="Enterprise system integration" decoding="async" loading="lazy" src="/assets/integration.jpg" />
        </div>

        <section className="section shell">
          <div className="two">
            <div>
              <div className="labelrow">
                <span className="spark">✳</span>
                <span className="eyebrow">{ar ? "نبذة عن سانو" : "ABOUT SANU"}</span>
              </div>
              <h2 className="section-heading">
                {ar ? (
                  <>
                    أؤمن بأن
                    <br />
                    الهندسة المعمارية
                    <br />
                    تصنع <span className="muted">الوضوح.</span>
                  </>
                ) : (
                  <>
                    I BELIEVE
                    <br />
                    ARCHITECTURE
                    <br />
                    CREATES <span className="muted">CLARITY.</span>
                  </>
                )}
              </h2>
            </div>
            <div>
              <p className="lead">
                {ar
                  ? "أنا سانو خان — قائد تقني، وخبير حلول معمارية، ومطور لمنصات الإنتاج، مقيم في دبي. يمتد نطاق عملي عبر تكاملات المؤسسات، والعمارة السحابية، والتطوير المتكامل، والأتمتة الذكية."
                  : "I’m Sanu Khan — a tech lead, solutions expert and builder of production platforms, based in Dubai. My work spans enterprise integrations, cloud architecture, full-stack engineering and intelligent automation."}
              </p>
              <div className="three" style={{ marginTop: "55px", gap: "5px" }}>
                <div className="stat">
                  <strong>13+</strong>
                  <small>{ar ? "سنوات خبرة" : "Years"}</small>
                </div>
                <div className="stat">
                  <strong>100+</strong>
                  <small>{ar ? "حلول منجزة" : "Solutions"}</small>
                </div>
                <div className="stat">
                  <strong>9</strong>
                  <small>{ar ? "أسواق إقليمية" : "Markets"}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark-zone">
          <div className="shell">
            <div className="labelrow">
              <span className="spark">✳</span>
              <span className="eyebrow">{ar ? "العمارة / الإنجازات" : "ARCHITECTURE / ACHIEVEMENTS"}</span>
            </div>
            <div className="splithead">
              <h2 className="section-heading">
                {ar ? (
                  <>
                    ما ساهمت
                    <br />
                    في <span className="light-orange">إنجازه.</span>
                  </>
                ) : (
                  <>
                    WHAT I’VE
                    <br />
                    HELPED <span className="light-orange">DELIVER.</span>
                  </>
                )}
              </h2>
              <p className="lead right" style={{ color: "#aaa" }}>
                {ar
                  ? "منصات واقعية. قيود عملية. نتائج تشغيلية حقيقية."
                  : "Real platforms. Real constraints. Real operational outcomes."}
              </p>
            </div>
            <div className="two" style={{ marginTop: "53px" }}>
              {achievements.map((ach) => (
                <div key={ach.title} className="achievement">
                  <div className="symbol">{ach.symbol}</div>
                  <h4>{ach.title}</h4>
                  <p>{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell">
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">{ar ? "التطور المهني" : "CAREER PROGRESSION"}</span>
          </div>
          <h2 className="section-heading">
            {ar ? (
              <>
                خبرات هادفة
                <br />
                في <span className="muted">الهندسة التقنية.</span>
              </>
            ) : (
              <>
                PURPOSE-DRIVEN
                <br />
                <span className="muted">ENGINEERING EXPERIENCE.</span>
              </>
            )}
          </h2>
          <div className="two" style={{ marginTop: "45px" }}>
            <img
              alt="Enterprise engineering"
              decoding="async"
              loading="lazy"
              src="/assets/enterprise.jpg"
              style={{ height: "340px", width: "100%", objectFit: "cover" }}
            />
            <img
              alt="Backend systems"
              decoding="async"
              loading="lazy"
              src="/assets/backend.jpg"
              style={{ height: "340px", width: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ marginTop: "60px" }}>
            {milestones.map((m) => (
              <div key={m.era} className="experience-item">
                <span className="eyebrow orange">{m.era}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section shell">
          <div className="labelrow">
            <span className="spark">✳</span>
            <span className="eyebrow">{ar ? "القيم والمبادئ" : "VALUES"}</span>
          </div>
          <h2 className="section-heading">
            {ar ? (
              <>
                كيف أفكر
                <br />
                في <span className="muted">الأنظمة.</span>
              </>
            ) : (
              <>
                HOW I THINK
                <br />
                <span className="muted">ABOUT SYSTEMS.</span>
              </>
            )}
          </h2>
          <div className="three" style={{ marginTop: "40px" }}>
            {visions.map((v) => (
              <div key={v.title} className="vision">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
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

        <section className="section shell">
          <div className="footer-cta">
            <form aria-label="Quick enquiry" className="contact-box" onSubmit={handleContactSubmit}>
              <h4>SANU KHAN ®</h4>
              <p className="tiny">{ar ? "هل لديك مشروع في بالك؟" : "HAVE A PROJECT IN MIND?"}</p>
              <div className="formrow">
                <label htmlFor="quick-about-name">{ar ? "الاسم" : "Your Name"}</label>
                <input id="quick-about-name" name="name" placeholder="Jane Smith" required type="text" />
              </div>
              <div className="formrow">
                <label htmlFor="quick-about-email">{ar ? "البريد المهني" : "Work Email"}</label>
                <input id="quick-about-email" name="email" placeholder="jane@company.com" required type="email" />
              </div>
              <div className="formrow">
                <label htmlFor="quick-about-message">{ar ? "تفاصيل المشروع" : "Project Context"}</label>
                <textarea
                  id="quick-about-message"
                  name="message"
                  placeholder={ar ? "أخبرني عما تقوم ببنائه..." : "Tell me what you're building..."}
                  required
                />
              </div>
              <button className="button dark" type="submit" style={{ justifyContent: "space-between", width: "100%" }}>
                {ar ? "إرسال رسالة" : "SEND AN EMAIL"} <span className="arrow">↗</span>
              </button>
            </form>
            <div>
              <div className="labelrow">
                <span className="spark">✳</span>
                <span className="eyebrow">{ar ? "ما وراء الموجز" : "BEYOND THE BRIEF"}</span>
              </div>
              <h2>
                {ar ? (
                  <>
                    لنبنِ معاً
                    <br />
                    ما <span className="light-orange">يدوم.</span>
                  </>
                ) : (
                  <>
                    LET'S BUILD
                    <br />
                    SOMETHING
                    <br />
                    THAT <span className="light-orange">LASTS.</span>
                  </>
                )}
              </h2>
              <p className="lead" style={{ maxWidth: "430px" }}>
                {ar
                  ? "العمارة الهندسية والتطوير والتسليم. حوار بناء في كل خطوة."
                  : "Architecture, engineering and delivery. One thoughtful conversation at a time."}
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default memo(AboutPage);
