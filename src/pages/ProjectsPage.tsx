import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { works } from "@/data/siteData";
import { pageSeo } from "@/lib/seo";
import {
  buildBreadcrumbListSchema,
  buildCreativeWorkSchema,
  buildTechArticleSchema,
} from "@/lib/schema";

export default function ProjectsPage() {
  const schemas = [
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
    buildCreativeWorkSchema({
      title: "Projects and Case Studies",
      description: pageSeo.projects.description,
      path: "/projects",
      technologies: ["Azure", "AWS", "Node.js", "React", "Kafka"],
    }),
    buildTechArticleSchema({
      title: "Enterprise Architecture Case Studies",
      description: pageSeo.projects.description,
      path: "/projects",
    }),
  ];

  return (
    <>
      <SeoMeta
        title={pageSeo.projects.title}
        description={pageSeo.projects.description}
        canonicalPath={pageSeo.projects.canonicalPath}
        keywords={[
          "project case studies",
          "enterprise architecture",
          "integration delivery",
          "distributed systems",
        ]}
        schema={schemas}
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">Projects & Case Studies</h1>
          <p className="mt-4 max-w-4xl text-[15px] text-secondary">
            A curated view of architecture delivery across commerce, integration,
            platform engineering, and operational intelligence programs.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {works.map((work) => (
              <article key={work.title} className="premium-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {work.scope}
                </p>
                <h2 className="mt-2 text-[20px] font-bold text-primary">{work.title}</h2>
                <p className="mt-3 text-[14px] text-secondary">
                  <span className="font-semibold text-primary">Outcome:</span> {work.outcome}
                </p>
                <p className="mt-2 text-[14px] text-secondary">{work.tags.join(" • ")}</p>
              </article>
            ))}
          </div>

          <nav className="mt-10 flex flex-wrap gap-4" aria-label="Projects links">
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/api-integration-services">
              API Integration Services
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/full-stack-consultant-uae">
              Full Stack Consulting
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/contact">
              Start a Project Discussion
            </Link>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
