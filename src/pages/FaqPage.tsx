import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
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
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-28 pb-20 text-foreground">
        <section className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="border-b border-foreground/10 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent">02 / Questions</span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl text-base text-foreground/70 sm:text-lg">
              Answers about technical consulting, platform delivery, and engagement style.
            </p>
          </div>

          <div className="mt-10 divide-y divide-foreground/15 border-y border-foreground/15">
            {faqs.map((faq, idx) => (
              <article key={faq.question} className="py-8">
                <span className="font-mono text-xs text-foreground/40">0{idx + 1}</span>
                <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                  {faq.question}
                </h2>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/80">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4 border-t border-foreground/10 pt-8 text-sm">
            <Link
              className="font-medium text-accent hover:underline"
              to="/"
            >
              &larr; Back to Portfolio
            </Link>
            <span className="text-foreground/30">•</span>
            <Link
              className="font-medium text-foreground/70 hover:text-foreground hover:underline"
              to="/blog"
            >
              Explore Blog Articles
            </Link>
            <span className="text-foreground/30">•</span>
            <Link
              className="font-medium text-foreground/70 hover:text-foreground hover:underline"
              to="/contact"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
