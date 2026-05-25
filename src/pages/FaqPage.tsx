import { Link } from "react-router-dom";
import SeoMeta from "@/components/SeoMeta";
import { pageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema, buildFaqSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What services does Sanu Khan provide?",
    answer:
      "I provide architecture consulting, full-stack engineering, API integrations, and cloud modernization for event-driven and enterprise-grade platforms.",
  },
  {
    question: "Do you work with UAE and remote clients?",
    answer:
      "Yes. I work with teams in the UAE and globally across discovery, architecture, delivery, and optimization phases.",
  },
  {
    question: "Which technologies are part of your core stack?",
    answer:
      "I work with React, Node.js, TypeScript, Java, Spring Boot, Azure, AWS, Kubernetes, Kafka, and enterprise integration ecosystems.",
  },
  {
    question: "How can I contact you for a project?",
    answer:
      "Use the contact section on the homepage or send an email to hello@sanukhan.dev with your scope and timeline.",
  },
];

const faqSchema = buildFaqSchema(
  faqs.map((item) => ({ q: item.question, a: item.answer })),
);

const faqBreadcrumb = buildBreadcrumbListSchema([
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
]);

export default function FaqPage() {
  return (
    <>
      <SeoMeta
        title={pageSeo.faq.title}
        description={pageSeo.faq.description}
        canonicalPath={pageSeo.faq.canonicalPath}
        schema={[faqSchema, faqBreadcrumb]}
        keywords={[
          "sanu khan faq",
          "technical consulting faq",
          "full stack architect faq",
        ]}
      />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-3xl text-[15px] text-secondary">
            Answers about technical consulting, platform delivery, and
            engagement style.
          </p>

          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <article key={faq.question} className="premium-card p-5">
                <h2 className="text-[20px] font-bold text-primary">
                  {faq.question}
                </h2>
                <p className="mt-2 text-[14px] text-secondary">{faq.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="text-[14px] font-semibold text-accent hover:underline"
              to="/"
            >
              Back to Portfolio
            </Link>
            <Link
              className="text-[14px] font-semibold text-accent hover:underline"
              to="/blog"
            >
              Explore Blog Articles
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
