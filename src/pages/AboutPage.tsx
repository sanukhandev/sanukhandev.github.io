import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import SeoMeta from "@/components/SeoMeta";
import { profile, skills } from "@/data/siteData";
import { pageSeo } from "@/lib/seo";
import { buildBreadcrumbListSchema } from "@/lib/schema";

export default function AboutPage() {
  return (
    <>
      <SeoMeta
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        canonicalPath={pageSeo.about.canonicalPath}
        kind="profile"
        keywords={[
          "about sanu khan",
          "solutions architect dubai",
          "cloud architect uae",
          "enterprise engineering leader",
        ]}
        schema={buildBreadcrumbListSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-20 text-foreground">
        <section className="container-narrow section-pad">
          <h1 className="text-[38px] font-extrabold text-primary">About Sanu Khan</h1>
          <p className="mt-4 max-w-4xl text-[16px] leading-7 text-secondary">
            {profile.statement}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="premium-card p-6">
              <h2 className="text-[22px] font-bold text-primary">Engineering Focus</h2>
              <p className="mt-3 text-[15px] text-secondary">
                CTO-level execution across cloud architecture, AI operations, API platforms,
                and enterprise systems with measurable product outcomes.
              </p>
            </article>
            <article className="premium-card p-6">
              <h2 className="text-[22px] font-bold text-primary">Core Capabilities</h2>
              <ul className="mt-3 space-y-2 text-[15px] text-secondary">
                {profile.meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8">
            <h2 className="text-[26px] font-bold text-primary">Technology Clusters</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {skills.clusters.map((cluster) => (
                <article key={cluster.title} className="premium-card p-5">
                  <h3 className="text-[18px] font-semibold text-primary">{cluster.title}</h3>
                  <p className="mt-2 text-[14px] text-secondary">{cluster.tags.join(" • ")}</p>
                </article>
              ))}
            </div>
          </div>

          <nav className="mt-10 flex flex-wrap gap-4" aria-label="About page links">
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/projects">
              Explore Projects
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/contact">
              Contact Sanu Khan
            </Link>
            <Link className="text-[14px] font-semibold text-accent hover:underline" to="/blog">
              Read Technical WriteUps
            </Link>
          </nav>
        </section>
      </main>
      <Footer />
    </>
  );
}
